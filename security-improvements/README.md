# security-improvements

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T1 | API Key 改用環境變數 | 未指派 | 中 | ✅ done |
| T2 | 確認 .gitignore 設定 | 未指派 | 中 | ✅ done |
| T3 | 鎖定敏感檔案 | 未指派 | 中 | ✅ done |
| T4 | 設定 tools.allow/deny | 未指派 | 中 | ✅ done |
| T5 | 設定用量報告 cron | 未指派 | 中 | ✅ done |
| T6 | 檢查 GitHub token 權限 | 未指派 | 中 | ✅ done |
| T7 | 評估 LLM spending limit | 未指派 | 中 | ✅ done |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-18 20:32
