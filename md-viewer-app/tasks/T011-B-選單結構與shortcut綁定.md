---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/95
title: "[T011-B] 選單結構與 shortcut 綁定"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
depends: [T011-A]
---

## 目標

在 T011-A 基礎上，完成完整選單結構與 keyboard shortcut 綁定。

## 修改的檔案

### `menu.m`（擴充 T011-A）
- 完整建立所有 NSMenuItem，設定 title、action、keyEquivalent、keyEquivalentModifierMask
- About md-viewer → 使用 `orderFrontStandardAboutPanel:`
- Quit → `terminate:`
- Open/Reload → 呼叫 `goMenuCallback`
- Zoom In/Out/Reset → 呼叫 `goMenuCallback`
- Toggle Sidebar → 呼叫 `goMenuCallback`
- Preferences → 呼叫 `goMenuCallback`（ID=2）

### `menu.go`（擴充 T011-A）
- 匯出 `SetupMainMenuWithShortcuts()`
- 選單 ID 定義：
```go
const (
    MenuAbout        = 1
    MenuPreferences  = 2
    MenuOpen         = 3
    MenuReload       = 4
    MenuQuit         = 5
    MenuZoomIn       = 6
    MenuZoomOut      = 7
    MenuZoomReset    = 8
    MenuToggleSidebar = 9
    MenuAboutHelp    = 10
)
```

## 驗收標準
- [ ] 所有 menu item 出現且可見
- [ ] keyboard shortcut 正常觸發（如 ⌘O 開檔、⌘Q 離開）
- [ ] Quit 正常關閉 app

---

*建立時間：2026-04-25 by 寶寶*
