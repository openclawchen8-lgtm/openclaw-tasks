# gold-analysis-improve

## 任務狀態

| Task | 標題 | 負責人 | 優先順序 | 狀態 |
|------|------|--------|---------|------|
| T001 | 修正 gold-analysis 單位錯誤 | 未指派 | 中 | ✅ done |
| T002 | TradingView 概要分頁 | 碼農2號 | 中 | ✅ done |
| T003 | TradingView 新聞分頁 | 碼農2號 | 中 | ✅ done |
| T004 | TradingView 技術分析分頁 | 未指派 | 中 | ✅ done |
| T005 | TradingView 遠期曲線分頁 | 未指派 | 中 | ✅ done |
| T006 | TradingView 季節性分頁 | 未指派 | 中 | ✅ done |
| T007 | TradingView 合約分頁 | 未指派 | 中 | ✅ done |
| T008 | 接 Yahoo Finance 歷史黃金報價，補足技術分析所需數據 | 寶寶 | high | ✅ done |
| T009 | 統一 SQLite 資料來源 + 台灣銀行 1 年歷史數據 | 寶寶 | high | ✅ done |
| T010 | gold_bot_history.py 重構：DB自動建立 + gap-filling | 寶寶 | high | ✅ done |
| T011 | gold_bot_history.py 月份 URL 支援 | 寶寶 | 中 | ✅ done |
| T012 | gold_monitor_pro 架構重構：移除 SQLite 寫入，改用 tmp file 即時檢查 | 寶寶 | high | ✅ done |

## 更新規範

每次狀態變更時，**同時更新** T*.md 與本檔案：

**pending → in-progress**：T*.md 改 `status: in-progress`，README 改 `⬜ pending` → `🔄 in-progress`

**in-progress → done**：T*.md 改 `status: done`，README 改 `🔄 in-progress` → `✅ done`

- 更新 T*.md 時一併更新 `updated` 欄位
- 完成後同步 GitHub Issue 狀態（`--sync-state`）

> 自動生成於 2026-04-19（T001-T012 完整補入）
