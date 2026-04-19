# gold-analysis-improve

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T004 | Technicals 分頁重建 | 寶寶 | 高 | ✅ done |
| T005 | Forward Curve 分頁 | 寶寶 | 高 | ✅ done |
| T006 | Seasonality 分頁 | 寶寶 | 高 | ✅ done |
| T007 | Contracts 分頁 | 寶寶 | 高 | ✅ done |
| T008 | Yahoo Finance 歷史黃金報價 | 寶寶 | 高 | ✅ done |
| T009 | 統一 SQLite 資料來源 + 台灣銀行 1年歷史 | 寶寶 | 高 | ✅ done |
| T010 | gold_bot_history.py 重構：DB自動建立 + gap-filling | 寶寶 | 高 | ⬜ pending |
| T011 | gold_bot_history.py 月份 URL 支援：YYYY-MM/TWD | 寶寶 | 高 | ⬜ pending |
| T012 | gold_monitor_pro 重構：移除 SQLite 寫入 + tmp file 即時檢查 | 寶寶 | 高 | ⬜ pending |

## 更新規範

每次狀態變更時，**同時更新** T\*.md 與本檔案：

**pending → in-progress**：T\*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T\*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T\*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-18 21:48
