---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/95
title: "[T011-D] Config 持久化"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
depends: [T011-A]
---

## 目標

建立 `~/.md-viewer/config.json` 的讀寫邏輯。

## 修改的檔案

### `config.go`（新）
- `loadConfig()`：啟動時讀取，不存在則建立預設值
- `saveConfig()`：變更時寫回
- `GetZoomSensitivity()` / `SetZoomSensitivity()`
- `GetTheme()` / `SetTheme()`

### `config.json` 結構
```json
{
  "zoomSensitivity": 2,
  "theme": "auto"
}
```

## 驗收標準
- [ ] app 啟動時 config 檔案存在（自動建立）
- [ ] 設定變更時寫回磁碟
- [ ] 重開 app 後設定保留

---

*建立時間：2026-04-25 by 寶寶*
