---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/95
title: "[T011-C] Preferences ⌘, 觸發設定面板"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
depends: [T011-A]
---

## 目標

讓 ⌘, 觸發設定面板（WebView HTML overlay）開啟。

## 修改的檔案

### `main.go`
- 接收 `MenuPreferences`（ID=2）callback
- callback 執行 `wv.Eval("showSettingsPanel()")`
- JS `showSettingsPanel()` 函數：顯示 settings overlay div

## 驗收標準
- [ ] ⌘, 開啟設定面板
- [ ] 其他 menu item 也正確觸發（Zoom、Open 等）

---

*建立時間：2026-04-25 by 寶寶*
