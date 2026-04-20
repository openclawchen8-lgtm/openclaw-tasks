/**
 * Session Logger Plugin
 * 
 * Hooks into OpenClaw events to capture and persist session data.
 */
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

// Type definitions for our plugin config
interface SessionLoggerConfig {
  enabled: boolean;
  outputDir: string;
  filenameFormat: string;
  retentionDays: number;
  maxFileSizeMb: number;
  includeThinking: boolean;
  includeToolCalls: boolean;
  rollingType: "session" | "daily" | "size";
}

// Helper to expand ~ in paths
function expandPath(p: string): string {
  if (p.startsWith("~/") || p === "~") {
    return path.join(os.homedir(), p.slice(1));
  }
  return p;
}

// Format filename with placeholders
function formatFilename(format: string, data: Record<string, string>): string {
  let result = format;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  return result;
}

// Ensure output directory exists
function ensureOutputDir(dir: string): void {
  const expanded = expandPath(dir);
  if (!fs.existsSync(expanded)) {
    fs.mkdirSync(expanded, { recursive: true });
  }
}

// Get file size in MB
function getFileSizeMb(filepath: string): number {
  try {
    const stats = fs.statSync(filepath);
    return stats.size / (1024 * 1024);
  } catch {
    return 0;
  }
}

// Default configuration
const defaultConfig: SessionLoggerConfig = {
  enabled: true,
  outputDir: "~/sessions",
  filenameFormat: "{date}_{sessionKey}.jsonl",
  retentionDays: 30,
  maxFileSizeMb: 10,
  includeThinking: true,
  includeToolCalls: true,
  rollingType: "session",
};

// Plugin definition
const sessionLoggerPlugin = {
  id: "session-logger",
  name: "Session Logger",
  description: "Auto-save complete session logs with thinking process and tool calls",

  configSchema: {
    parse(value: unknown) {
      const raw =
        value && typeof value === "object" && !Array.isArray(value)
          ? (value as Record<string, unknown>)
          : {};
      return { ...defaultConfig, ...raw } as SessionLoggerConfig;
    },
  },

  register(api: OpenClawPluginApi) {
    // Get runtime config (merged with defaults)
    const config = sessionLoggerPlugin.configSchema.parse(api.config);

    if (!config.enabled) {
      api.logger.info("Session Logger plugin disabled");
      return;
    }

    api.logger.info("Session Logger plugin starting", { config });

    // Track current session file handle
    let currentSessionFile: fs.WriteStream | null = null;
    let currentSessionKey: string | null = null;
    let currentFilePath: string | null = null;
    let currentDate: string | null = null;

    // Helper to get current date string
    const getDateStr = () => new Date().toISOString().split("T")[0];

    // Helper to create session file
    const createSessionFile = (sessionKey: string, forceNew: boolean = false): string => {
      const dateStr = getDateStr();
      const filename = formatFilename(config.filenameFormat, {
        date: dateStr,
        sessionKey: sessionKey,
        sessionId: sessionKey,
        agentId: "unknown",
      });
      const filepath = path.join(expandPath(config.outputDir), filename);
      ensureOutputDir(config.outputDir);

      // Check if we need to roll based on size
      if (config.rollingType === "size" && !forceNew && currentFilePath) {
        const size = getFileSizeMb(currentFilePath);
        if (size >= config.maxFileSizeMb) {
          // Roll to new file with sequence number
          const ext = path.extname(filename);
          const base = path.basename(filename, ext);
          const seq = Date.now();
          const newFilename = `${base}_${seq}${ext}`;
          api.logger.info("Rolling file due to size", { 
            oldSize: size, 
            maxSize: config.maxFileSizeMb,
            newFile: newFilename 
          });
          return path.join(expandPath(config.outputDir), newFilename);
        }
      }

      return filepath;
    };

    // Helper to write log entry
    const writeLog = (sessionKey: string, entry: object): void => {
      if (!config.enabled) return;

      // Determine if we need a new file based on rolling type
      let shouldRotate = false;
      
      if (config.rollingType === "session") {
        shouldRotate = currentSessionKey !== sessionKey;
      } else if (config.rollingType === "daily") {
        const dateStr = getDateStr();
        shouldRotate = currentDate !== dateStr;
      }

      if (shouldRotate) {
        if (currentSessionFile) {
          currentSessionFile.end();
        }
        currentSessionKey = sessionKey;
        currentDate = getDateStr();
        currentFilePath = createSessionFile(sessionKey, true);
        currentSessionFile = fs.createWriteStream(currentFilePath, { flags: "a" });
        api.logger.info("Session log started", { sessionKey, filepath: currentFilePath });
      }

      // Check size-based rolling during write
      if (config.rollingType === "size" && currentFilePath && currentSessionFile) {
        const size = getFileSizeMb(currentFilePath);
        if (size >= config.maxFileSizeMb) {
          // Force rotate
          currentSessionFile.end();
          currentFilePath = createSessionFile(sessionKey, true);
          currentSessionFile = fs.createWriteStream(currentFilePath, { flags: "a" });
          api.logger.info("Size-based rotation", { size, maxSize: config.maxFileSizeMb });
        }
      }

      if (currentSessionFile) {
        const logLine = JSON.stringify({
          ...entry,
          timestamp: new Date().toISOString(),
          sessionKey,
        }) + "\n";
        currentSessionFile.write(logLine);
      }
    };

    // Cleanup old files based on retention days
    const cleanupOldFiles = (): void => {
      if (config.retentionDays <= 0) return;

      const outputDir = expandPath(config.outputDir);
      if (!fs.existsSync(outputDir)) return;

      const cutoffTime = Date.now() - config.retentionDays * 24 * 60 * 60 * 1000;
      const files = fs.readdirSync(outputDir);
      let deletedCount = 0;

      for (const file of files) {
        const filepath = path.join(outputDir, file);
        try {
          const stats = fs.statSync(filepath);
          if (stats.mtimeMs < cutoffTime) {
            fs.unlinkSync(filepath);
            deletedCount++;
            api.logger.info("Deleted old session log", { file, age: stats.mtimeMs });
          }
        } catch (e) {
          // Skip files we can't access
        }
      }

      if (deletedCount > 0) {
        api.logger.info("Retention cleanup complete", { deletedCount, keptDays: config.retentionDays });
      }
    };

    // Run cleanup on startup
    cleanupOldFiles();

    // Hook: session created
    api.registerHook({
      name: "session_created",
      handler: async (event: { sessionKey: string; sessionId: string; agentId?: string }) => {
        api.logger.info("Session created hook triggered", event);
        writeLog(event.sessionKey, {
          type: "session_start",
          sessionId: event.sessionId,
          agentId: event.agentId || "unknown",
        });
        return { block: false };
      },
    });

    // Hook: message sending (before message is sent)
    api.registerHook({
      name: "message_sending",
      handler: async (event: { 
        sessionKey: string; 
        message: { role: string; content?: string; thinking?: string };
      }) => {
        const { sessionKey, message } = event;
        
        const logEntry: Record<string, unknown> = {
          type: "message",
          role: message.role,
        };

        if (message.content) {
          logEntry.content = message.content;
        }

        if (config.includeThinking && message.thinking) {
          logEntry.thinking = message.thinking;
        }

        writeLog(sessionKey, logEntry);
        
        return { cancel: false };
      },
    });

    // Hook: tool call
    if (config.includeToolCalls) {
      api.registerHook({
        name: "tool_call",
        handler: async (event: {
          sessionKey: string;
          toolName: string;
          params: object;
          result?: unknown;
        }) => {
          writeLog(event.sessionKey, {
            type: "tool_call",
            toolName: event.toolName,
            params: event.params,
            result: event.result,
          });
          return { block: false };
        },
      });
    }

    // Hook: session ended
    api.registerHook({
      name: "session_ended",
      handler: async (event: { sessionKey: string; sessionId: string }) => {
        api.logger.info("Session ended hook triggered", event);
        writeLog(event.sessionKey, {
          type: "session_end",
          sessionId: event.sessionId,
        });

        // Close current file
        if (currentSessionKey === event.sessionKey && currentSessionFile) {
          currentSessionFile.end();
          currentSessionFile = null;
          currentSessionKey = null;
          currentFilePath = null;
        }

        return { block: false };
      },
    });

    api.logger.info("Session Logger hooks registered");
  },
};

export default sessionLoggerPlugin;
