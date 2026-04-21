/**
 * Session Logger Plugin v2
 *
 * Hooks into OpenClaw events to capture and persist session data.
 * Uses actual OpenClaw hooks: message:received, message:sent, agent:bootstrap, etc.
 */
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
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
declare const sessionLoggerPlugin: {
    id: string;
    name: string;
    description: string;
    configSchema: {
        parse(value: unknown): SessionLoggerConfig;
    };
    register(api: OpenClawPluginApi): void;
};
export default sessionLoggerPlugin;
