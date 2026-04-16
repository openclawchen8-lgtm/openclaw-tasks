# tasks-executor

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T1 | 設計 tasks-executor 規格 | 未指派 | 中 | ✅ done |
| T2 | 實作 tasks-executor 核心 | 未指派 | 中 | ✅ done |
| T3 | 實作 lifecycle.py 狀態管理 | 未指派 | 中 | ✅ done |
| T4 | 驗證任務執行器 | 未指派 | 中 | ✅ done |
| T5 | 建立 Cron 自動化排程 | 未指派 | 中 | ✅ done |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-16 19:02
