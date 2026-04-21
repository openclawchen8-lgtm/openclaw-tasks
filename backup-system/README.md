# backup-system

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T1 | ClawHub Skills 備份至 GitHub | 寶寶 | 中 | ✅ done |
| T2 | Howto 文檔備份至 GitHub | 寶寶 | 中 | ✅ done |
| T3 | 自動備份腳本 sync_all.sh | 寶寶 | 中 | ✅ done |
| T4 | 排程設定備份確認 | 寶寶 | 中 | ✅ done |
| T5 | 備份大小優化（排除 .git/ node_modules/） | 寶寶 | 中 | ✅ done |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-21 16:35
