# gold-monitor-issue

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T1 | 修復歷史資料與固定基準比較邏輯（state file → history["daily"]） | 未指派 | 中 | ✅ done |
| T2 | 三日觀察驗證（Day1-Day3 比對線上價位） | 未指派 | 中 | ✅ done |
| T3 | 更新 TASK 格式及 HOWTO 文件，彙整完成進度 | 未指派 | 中 | ✅ done |
| T4 | 實時顯示黃金存摺買入/賣出雙價格 | 未指派 | 中 | ✅ done |
| T5 | 請檢查及修正 黃金存摺價格監控 的問題（見 T001） | 未指派 | 中 | ⏭️ skip |
| T6 | 更新為同時抓取及顯示 黃金存摺 賣出 買入 價格（見 T004） | 未指派 | 中 | ⏭️ skip |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-16 22:10
