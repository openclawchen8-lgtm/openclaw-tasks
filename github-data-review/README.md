# github-data-review

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T3 | 任務 T003 | 未指派 | 中 | ✅ done |
| T4 | 任務 T004 | 未指派 | 中 | ✅ done |
| T5 | 任務 T005 | 未指派 | 中 | ✅ done |
| T6 | 任務 T006 | 未指派 | 中 | ✅ done |
| T8 | 任務 T008 | 未指派 | 中 | ⬜ pending |
| T9 | 任務 T009 | 未指派 | 中 | ⬜ pending |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-16 19:02
