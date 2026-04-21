# ideas2tasks

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T1 | 設計流程架構 | 寶寶 | 中 | ✅ done |
| T2 | 實作掃描和分類模組 | 碼農 1 號 | 中 | ✅ done |
| T3 | 撰寫規格書 | 安安 | 中 | ✅ done |
| T4 | Scrum 團隊分工機制 | 寶寶 | 中 | ✅ done |
| T5 | Lifecycle 狀態機 | 碼農 2 號 | 中 | ✅ done |
| T6 | 重構 executor.py — GitHub sync 完全讀 T*.md | 寶寶 | 高 | ✅ done |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-21 16:35
