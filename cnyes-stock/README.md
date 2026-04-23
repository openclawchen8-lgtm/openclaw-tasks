# cnyes-stock - 鉅亨網台股新聞自動抓取系統

## 專案目標
自動化抓取鉅亨網（https://news.cnyes.com/news/cat/tw_stock）的台股新聞，每日推送當日新增新聞至 Telegram。

## 技術架構
- **抓取引擎**: Playwright（venv）+ 系統 Chrome（`/Applications/Google Chrome.app`）
- **虛擬環境**: `/Users/claw/Projects/cnyes-stock/.venv/`
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
| T007 | 新增 Trending 頁面台股區塊抓取 | ✅ done | 寶寶 |
| T008 | 重構為虛擬環境（venv）規範 | ✅ done | 寶寶 |

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
- **venv**：`/Users/claw/Projects/cnyes-stock/.venv/`
- 主腳本：`/Users/claw/scripts/cnyes_stock_scraper.py`（shebang 指向 venv）
- 歷史記錄：`~/.qclaw/cnyes_stock_history.json`

## 使用方式
```bash
# 使用 venv python（推薦）
/Users/claw/Projects/cnyes-stock/.venv/bin/python3 /Users/claw/scripts/cnyes_stock_scraper.py

# 抓取並存檔
/Users/claw/Projects/cnyes-stock/.venv/bin/python3 /Users/claw/scripts/cnyes_stock_scraper.py

# 發送 Telegram 通知
/Users/claw/Projects/cnyes-stock/.venv/bin/python3 /Users/claw/scripts/cnyes_stock_scraper.py --telegram

# 指定日期
python3 /Users/claw/scripts/cnyes_stock_scraper.py --date 2026-04-22 --telegram

# 抓取 Trending 頁面台股區塊（10筆頭條）
python3 /Users/claw/scripts/cnyes_stock_scraper.py --trending

# Trending + Telegram 通知
python3 /Users/claw/scripts/cnyes_stock_scraper.py --trending --telegram

# 使用系統 Chrome（預設使用 Playwright 內建 Chromium）
python3 /Users/claw/scripts/cnyes_stock_scraper.py --system-chrome
```

## 瀏覽器配置
- **預設**：Playwright 內建 Chromium（headless，無需額外安裝）
- **系統 Chrome**：`--system-chrome` 參數切換
- **系統 Chrome 路徑**：`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

## 實測結果（2026-04-22）
- ✅ 日期過濾 `?date=2026-04-22` 正常
- ✅ 可抓到 19 篇台股新聞
- ✅ 時間、分類、標題可解析
- ⚠️ 無盡滾動需多次 scroll 觸發載入

## 維護備註
- 若網站改版、DOM 結構變化，需更新解析邏輯
- 新聞連結格式：`/news/id/{id}`，需拼接完整 URL
- 滾動次數可根據文章總數動態調整

## Trending 台股區塊抓取（T007）

### 功能說明
從 trending 頁面的「台股」區塊抓取 10 筆頭條新聞，與分類頁面抓取互補。

### 使用方式
```bash
python3 /Users/claw/scripts/cnyes_stock_scraper.py --trending
python3 /Users/claw/scripts/cnyes_stock_scraper.py --trending --telegram
```

### 實作邏輯
- 開啟 `https://news.cnyes.com/trending?exp=a`
- 定位「台股」區塊（第 2 個編號區塊）
- 抓取 10 筆新聞（rank 1-10）
- 輸出格式包含 rank、title、url

### 實測結果（2026-04-23）
- ✅ 正確抓到「台股」區塊（非「總覽」區塊）
- ✅ 10 筆頭條新聞完整抓取
- ✅ Telegram 通知格式正確

## 建立日期
2026-04-22
