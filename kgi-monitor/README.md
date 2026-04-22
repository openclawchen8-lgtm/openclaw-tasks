# kgi-monitor - 凱基股股漲 YouTube 標題監控系統

## 專案目標
自動化監控凱基投顧 YouTube 頻道「凱基股股漲」的每日影片標題，篩選 AI 供應鏈相關熱門股，推送至 Telegram。

## 資料來源
- **YouTube 頻道**：@KGISIA.channel（已驗證，18 萬訂閱）
- **更新頻率**：每個交易日一集
- **播出時間**：週一~週五 每晚 21:00 首播
- **影片長度**：10~20 分鐘

## 技術架構
- **抓取引擎**：yt-dlp（YouTube Data CLI）
- **關鍵詞過濾**：AI 供應鏈相關詞庫
- **通知通道**：Telegram Bot API
- **執行方式**：Cron Job（每日 21:30，首播後 30 分鐘）

## 任務列表

| 任務 | 標題 | 狀態 | 負責人 |
|------|------|------|--------|
| T001 | 環境建置 - 安裝 yt-dlp | 📋 pending | 碼農1號 |
| T002 | 核心功能開發 - 抓取與過濾 | 📋 pending | 碼農1號 |
| T003 | 時間範圍配置 | 📋 pending | 碼農1號 |
| T004 | Telegram 通知整合 | 📋 pending | 碼農1號 |
| T005 | Cron 定時執行 | 📋 pending | 寶寶 |
| T006 | 驗證與測試 | 📋 pending | 樂樂 |

## 腳本位置
- 主腳本：`/Users/claw/scripts/kgi_monitor.py`
- 歷史記錄：`~/.qclaw/kgi_monitor_history.json`

## 使用方式
```bash
# 抓取今日影片（預設）
python3 /Users/claw/scripts/kgi_monitor.py

# 抓取近三日
python3 /Users/claw/scripts/kgi_monitor.py --range 3d

# 抓取近一週
python3 /Users/claw/scripts/kgi_monitor.py --range 7d

# 單日指定日期
python3 /Users/claw/scripts/kgi_monitor.py --range 1d --date 20260422

# 發送 Telegram 通知
python3 /Users/claw/scripts/kgi_monitor.py --telegram

# 組合
python3 /Users/claw/scripts/kgi_monitor.py --range 3d --telegram
```

## AI 供應鏈關鍵詞庫
```python
AI_KEYWORDS = [
    "AI", "半導體", "封裝", "台積", "矽光子", "三五族",
    "記憶體", "HBM", "測試", "光通訊", "CPO", "功率半導體",
    "先進製程", "伺服器", "PCB", "機器人", "AI5",
    "NVIDIA", "輝達", "聯發科", "AMD", "Intel",
    "光電共封裝", "CoWoS", "先進封裝", "轉單",
]
```

## 相關文件
- howto: `/Users/claw/howto/kgi-monitor.md`
- Cron Job ID: `agent:main:cron:kgi-monitor`
- Telegram 配置：復用 `~/.qclaw/gold_monitor_config.json`

## 建立日期
2026-04-22
