# Gold Monitor Pro v4 重構計畫

## 目標

重構 `gold_monitor_pro.py` 的資料來源邏輯與變動監控邏輯，解決以下問題：
1. 黃金存摺 day page 價格有時錯誤
2. 銀/鉑金台銀不提供，但錯誤顯示 N/A
3. 存摺 vs 國際報價混在同一物件，誤導人
4. 變動監控依賴 SQLite（應完全獨立）
5. 週一特殊邏輯（取上週五收盤）

---

## 程式架構

```
/Users/claw/Projects/gold-monitor-pro-v4/
├── gold_local_monitor.py     ← 📊黃金存摺（台銀 + 玉山交叉驗證）
└── gold_intl_monitor.py      ← 🌐國際金屬（gold/silver/platinum）
```

---

## 任務狀態

| Task | 標題 | 狀態 |
|------|------|------|
| T001 | 分離監控物件（存摺 vs 國際分開） | ✅ done |
| T002 | 重寫 gold_local 監控邏輯 | ✅ done |
| T003 | 重寫國際報價監控邏輯 | ✅ done |
| T004 | 交叉驗證機制（台銀 vs 玉山銀行） | ✅ done |
| T005 | 更新 config.json schema + 閾值設定 | ✅ done |
| T006 | 銀/鉑金的 BOTAdapter 移除 | ✅ done |
| T007 | 快取清理 + 基準取得失敗 alert | ✅ done |
| T008 | 整合測試（比對官網報價） | 🔄 待驗證 |

---

## 監控物件

| 物件ID | 名稱 | 程式 | 來源 | 閾值 |
|--------|------|------|------|------|
| `gold_local` | 📊台銀黃金存摺 | gold_local_monitor.py | 台銀 day page + 玉山交叉驗證 | 30 NTD |
| `gold_intl` | 🌐國際黃金現貨 | gold_intl_monitor.py | Yahoo Finance（AV 備用） | 25 USD |
| `silver_intl` | 🌐國際白銀現貨 | gold_intl_monitor.py | Yahoo Finance（AV 備用） | 20 USD |
| `platinum_intl` | 🌐國際鉑金現貨 | gold_intl_monitor.py | Yahoo Finance（AV 備用） | 15 USD |

---

## 比對邏輯（統一）

### gold_local

| 情境 | 條件 | previous 來源 | 行為 |
|------|------|-------------|------|
| 快取新鮮 | 快取 timestamp 在今日近 10 分鐘內 | 快取的 `now` | 比對，>= 閾值 → 交叉驗證 → alert |
| 快取太舊 + day page >= 2 rows | 快取超過 10 分鐘或非今日 | day page 倒數第二筆 | 比對，>= 閾值 → 交叉驗證 → alert |
| 快取太舊 + day page 只有 1 row | 同上 | 前一營業日 day page 最後一筆 | 比對，>= 閾值 → 交叉驗證 → alert |
| 都拿不到 | 快取太舊 + rows < 2 + 前一營業日也抓不到 | 無 | 發 alert（基準取得失敗） |

### gold_intl

| 情境 | 條件 | previous 來源 | 行為 |
|------|------|-------------|------|
| 快取新鮮 | 快取 timestamp 在今日近 60 分鐘內 | 快取的 `price` | 比對，>= 閾值 → alert |
| 快取太舊 | 快取超過 60 分鐘或非今日 | Yahoo Finance 前一小時收盤價 | 比對，>= 閾值 → alert |
| 都拿不到 | 快取太舊 + 前一小時也抓不到 | 無 | 發 alert（基準取得失敗） |

### 交叉驗證（gold_local only）

| 情境 | 行為 |
|------|------|
| 台銀 vs 玉山 差 <= 5 元 | 通過，正常 alert |
| 台銀 vs 玉山 差 > 5 元 | 發「資料異常」警告，不 alert |
| 玉山抓取失敗 | 不阻斷，跳過驗證，正常 alert |

### 快取管理

| 項目 | 規則 |
|------|------|
| 有效期限 | local: 10 分鐘 / intl: 60 分鐘 |
| 保留天數 | 7 天（`_cleanup_old_cache`） |
| 清理時機 | 每次寫入快取時檢查 |
| history 快取 | 不需要（已移除） |
| `--daily` 模式 | 不需要（已移除） |

---

## 黃金存摺取值方式

```
主來源：台灣銀行 day page
驗證來源：玉山銀行（交叉驗證，只在 alert 前觸發）
```

---

## 國際報價資料來源

```
優先 1：Yahoo Finance（GC=F / SI=F / PL=F）
優先 2：Alpha Vantage（備用）
歷史價格：Yahoo Finance v8 chart API（interval=1h）
匯率：Yahoo Finance（USDTWD=X）
```

---

## 閾值配置（config.json）

```json
{
  "thresholds": {
    "gold_local": 30,
    "gold_intl": 25,
    "silver_intl": 20,
    "platinum_intl": 15
  }
}
```

---

## 快取檔案

| 檔案 | 用途 |
|------|------|
| `/tmp/gold_monitor_local_baseline.json` | gold_local 的快取 |
| `/tmp/gold_monitor_intl_{metal}.json` | 國際報價快取 |

---

## 替換方式（由豪執行）

```bash
# 1. 備份原檔
cp /Users/claw/scripts/gold_monitor_pro.py /Users/claw/scripts/gold_monitor_pro.py.bak

# 2. 複製兩支新程式
cp /Users/claw/Projects/gold-monitor-pro-v4/gold_local_monitor.py /Users/claw/scripts/
cp /Users/claw/Projects/gold-monitor-pro-v4/gold_intl_monitor.py /Users/claw/scripts/

# 3. 驗證
python3 /Users/claw/scripts/gold_local_monitor.py --check
python3 /Users/claw/scripts/gold_intl_monitor.py --check

# 4. 確認無誤後，刪除備份（可選）
# rm /Users/claw/scripts/gold_monitor_pro.py.bak
```

---

*規格建立：2026-05-01 01:14 | 更新：2026-05-01 03:23*
