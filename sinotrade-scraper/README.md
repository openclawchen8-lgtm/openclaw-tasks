# sinotrade-scraper - 永豐投顧台股報告自動抓取系統

## 專案目標
自動化抓取永豐投顧（https://scm.sinotrade.com.tw/）的台股報告，每日推送新增報告至 Telegram。

## 技術架構
- **抓取引擎**: Playwright（Python）+ 系統 Chrome（`/Applications/Google Chrome.app`）
- **通知通道**: Telegram Bot API
- **執行方式**: Cron Job（每交易日 08:30，Asia/Taipei）
- **關鍵技術**: 首頁 hover「研究報告」觸發 SPA dropdown，無需登入即可抓取

## 任務列表

| 任務 | 標題 | 狀態 | 負責人 |
|------|------|------|--------|
| T001 | 環境建置 - 安裝 Playwright | ✅ done | 碼農1號 |
| T002 | 核心功能開發 - 報告列表抓取與解析 | ✅ done | 碼農1號 |
| T003 | 增量比對邏輯 | ✅ done | 碼農1號 |


| T004 | Telegram 通知整合 | ✅ done | 碼農1號 |
| T005 | Cron 定時執行 | ✅ done | 寶寶 |
| T006 | 驗證與測試 | ✅ done | 樂樂 |
| T007 | 抓取報告公開預覽內容（第一段摘要） | ⏳ pending | 碼農1號 |
| T008 | 完整報告內容讀取（需登入，等待帳號申請） | ⏳ pending | N/A |

## 腳本位置
- 主腳本：`/Users/claw/scripts/sinotrade_scraper.py`
- 歷史記錄：`~/.qclaw/sinotrade_history.json`

## 使用方式
```bash
# 手動執行（測試）
python3 /Users/claw/scripts/sinotrade_scraper.py

# 發送 Telegram 通知
python3 /Users/claw/scripts/sinotrade_scraper.py --telegram

# 時間範圍（目前固定抓今日，--date 預留）
python3 /Users/claw/scripts/sinotrade_scraper.py --telegram
```

## 實測結果（2026-04-22）
- ✅ 抓取 6 篇台股個股報告（上銀、大銀微系統、奇鋐、弘塑、矽力*-KY、保瑞）
- ✅ 增量比對正常（第二次執行：0 篇新增，已去重）
- ✅ Telegram 通知發送成功

## Cron Job
- Job ID: `bbca5563-675d-40a1-8309-09cc814c5e00`
- 排程：每週一～五 08:30（Asia/Taipei）
- Payload：`python3 /Users/claw/scripts/sinotrade_scraper.py --telegram`

## 維護備註
- 若網站改版、dropdown 結構變化，需更新 `STOCK_REPORT_PATTERN` 正規表達式
- 報告 URL 格式：`/Article/Inner/{uuid}`，直接可存取，無需登入

## 建立日期
2026-04-22
