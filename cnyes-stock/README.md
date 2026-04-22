# cnyes-stock - 鉅亨網台股新聞自動抓取系統

## 專案目標
自動化抓取鉅亨網（https://news.cnyes.com/news/cat/tw_stock）的台股新聞，每日推送當日新增新聞至 Telegram。

## 技術架構
- **抓取引擎**: Playwright（Python）+ 系統 Chrome（`/Applications/Google Chrome.app`）
- **通知通道**: Telegram Bot API
- **執行方式**: Cron Job（每交易日 08:30，Asia/Taipei）
- **關鍵技術**: URL `?date=YYYY-MM-DD` 過濾日期，DOM 解析過濾「台股」分類

## 任務列表

| 任務 | 標題 | 狀態 | 負責人 |
|------|------|------|--------|
| T001 | 環境建置 - 安裝 Playwright | ✅ done | 寶寶 |
| T002 | 核心功能開發 - 新聞列表抓取與解析 | ✅ done | 寶寶 |
| T003 | 增量比對邏輯 | ✅ done | 寶寶 |
| T004 | Telegram 通知整合 | ✅ done | 寶寶 |
| T005 | Cron 定時執行 | ✅ done | 寶寶 |
| T006 | 驗證與測試 | ✅ done | 樂樂 |

## 網站結構研究（2026-04-22）

### URL 格式
```
https://news.cnyes.com/news/cat/tw_stock?date=YYYY-MM-DD
```
- `?date=2026-04-22`：過濾為指定日期的新聞
- 參數有效，測試通過

### 文章結構
每則新聞連結格式：`/news/id/{numeric_id}`

典型內容：
```
台股
17:05
盤後速報 - 長廣(7795)次交易(23)日除息2.15元，參考價418.85元
```

### 分類過濾
- 頁面包含多個分類的新聞（台股、區塊鏈、區塊鏈、美股等）
- 需過濾只取「台股」分類的新聞
- 實測：2026-04-22 共 19 篇台股新聞

### 滾動載入
- 頁面為無盡滾動（Infinite Scroll）
- 需多次滾動觸發載入，確保抓到完整列表

### 無需登入
- 所有新聞標題/時間/摘要公開可見
- 無登入牆、無付費牆

## 腳本位置
- 主腳本：`/Users/claw/scripts/cnyes_stock_scraper.py`
- 歷史記錄：`~/.qclaw/cnyes_stock_history.json`

## 使用方式
```bash
# 手動執行（測試）
python3 /Users/claw/scripts/cnyes_stock_scraper.py

# 發送 Telegram 通知
python3 /Users/claw/scripts/cnyes_stock_scraper.py --telegram

# 指定日期
python3 /Users/claw/scripts/cnyes_stock_scraper.py --date 2026-04-22 --telegram
```

## 實測結果（2026-04-22）
- ✅ 日期過濾 `?date=2026-04-22` 正常
- ✅ 可抓到 19 篇台股新聞
- ✅ 時間、分類、標題可解析
- ⚠️ 無盡滾動需多次 scroll 觸發載入

## 維護備註
- 若網站改版、DOM 結構變化，需更新解析邏輯
- 新聞連結格式：`/news/id/{id}`，需拼接完整 URL
- 滾動次數可根據文章總數動態調整

## 建立日期
2026-04-22
