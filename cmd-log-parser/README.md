# cmd-log-parser

## 概覽
解析 OpenClaw session JSONL，提取完整 exec 命令記錄，供審計與學習用。

## 📁 產出檔案（可查看）
| 檔案 | 說明 |
|------|------|
| `/Users/claw/scripts/cmd-log-parser.py` | 解析腳本 |
| `/Users/claw/logs/cmd-log-YYYY-MM-DD.md` | 每日命令日誌存檔 |

## 📋 任務狀態
**進度**: 1/3 完成

| ID | 任務 | 負責人 | 狀態 |
|----|------|--------|------|
| T001 | 腳本開發 | - | ✅ done |
| T002 | Cron 自動化 | - | ⬜ pending |
| T003 | Howto 文件 | - | ⬜ pending |

## 目標
- 擺脫 Telegram 介面截斷限制，讓用戶看見完整的命令語法
- 建立每日命令日誌存檔