# member-tasks

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T1 | 建立安安（DocWriter）workspace | 未指派 | 中 | ✅ done |
| T2 | 建立樂樂（Reviewer）workspace | 未指派 | 中 | ✅ done |
| T3 | 建立碼農2號（Coder 2）workspace | 未指派 | 中 | ✅ done |
| T4 | 註冊所有成員到 openclaw.json + gateway 重啟 | 未指派 | 中 | ✅ done |
| T5 | 產出 howto 文檔 | 未指派 | 中 | ✅ done |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-16 19:02
