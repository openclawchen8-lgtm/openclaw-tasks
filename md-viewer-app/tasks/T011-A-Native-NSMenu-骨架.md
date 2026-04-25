---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/95
title: "[T011-A] Native NSMenu 骨架"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
---

## 目標

建立 Native macOS NSMenu 的 CGO 橋接骨架，讓 Go 能在 app 啟動時建立原生 menubar。

## 修改的檔案

### `menu.m`（新）
- Objective-C 程式碼
- 建立應用程式 level NSMenu（`NSApp.mainMenu`）
- 結構：
  - App menu（About、Preferences ⌘,）
  - File menu（Open ⌘O、Reload ⌘R、Quit ⌘Q）
  - View menu（Zoom +/−/0、Toggle Sidebar ⌘B）
  - Help menu（About md-viewer）
- 每個 menu item 的 action 對應一個 ObjC selector
- Selector 呼叫 `goMenuCallback(callbackID)` C 函數

### `menu.go`（新）
```go
/*
#cgo darwin CXXFLAGS: -DWEBVIEW_COCOA -std=c++11 -x objective-c++ -fobjc-arc
#cgo darwin LDFLAGS: -framework AppKit

#include <stdlib.h>
void goMenuCallback(int menuID);
*/
import "C"
import "unsafe"

//export goMenuCallback
func goMenuCallback(menuID C.int) {
    if menuCallback != nil {
        menuCallback(int(menuID))
    }
}

var menuCallback func(int)

func SetupMenu(callback func(int)) {
    menuCallback = callback
    C.SetupMainMenu()
}
```

## 驗收標準
- [ ] `go build` 成功，無 CGO 錯誤
- [ ] App 啟動時 menubar 出現（NSApp.mainMenu 已設定）
- [ ] 點擊各 menu item 有 callback（可在 log 確認 menuID）

## Menu Item ID 對照表

| ID | Menu | Item | Shortcut |
|----|------|------|----------|
| 1 | App | About | - |
| 2 | App | Preferences | ⌘, |
| 3 | File | Open | ⌘O |
| 4 | File | Reload | ⌘R |
| 5 | File | Quit | ⌘Q |
| 6 | View | Zoom In | ⌘+ |
| 7 | View | Zoom Out | ⌘- |
| 8 | View | Zoom Reset | ⌘0 |
| 9 | View | Toggle Sidebar | ⌘B |
| 10 | Help | About | - |

---

*建立時間：2026-04-25 by 寶寶*
