# agent-config

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T1 | OpenRouter API key 配置問題排查 | 未指派 | 中 | ✅ done |
| T2 | QClaw agent 配置修改建議 | 未指派 | 中 | ✅ done |
| T3 | 快速切換 OpenRouter model 方案 | 未指派 | 中 | ✅ done |
| T4 | QClaw 環境下 openclaw CLI 使用方式 | 未指派 | 中 | ✅ done |
| T5 | ClawSec 安全建議分析 | 未指派 | 中 | ✅ done |
| T6 | Tasks 備份腳本 + 排程 | 未指派 | 中 | ✅ done |
| T7 | QClaw 用量限制解決方案 | 未指派 | 中 | ✅ done |
| T8 | 安安 agent fallback 機制驗證 | 未指派 | 中 | ✅ done |
| T8-1 | 解決 T001 API key 問題 | 未指派 | 中 | ✅ done |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-18 20:32
