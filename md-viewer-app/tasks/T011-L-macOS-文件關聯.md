---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/102
title: "[T011-L] macOS 文件關聯（雙擊 .md 用 md-viewer 開啟）"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
---

## 目標

讓 macOS 認識 md-viewer.app 能開啟 `.md` / `.markdown` / `.txt` 檔案，支援 Finder 雙擊、右鍵「開啟方式」、拖放到 Dock icon。

## 目前問題

`Info.plist` 缺少 `CFBundleDocumentTypes` 宣告，macOS 不知道此 app 能處理哪些文件類型。

## 修改檔案

### 1. `Info.plist` — 宣告文件類型

新增 `CFBundleDocumentTypes`：

```xml
<key>CFBundleDocumentTypes</key>
<array>
    <dict>
        <key>CFBundleTypeName</key>
        <string>Markdown Document</string>
        <key>CFBundleTypeRole</key>
        <string>Viewer</string>
        <key>LSHandlerRank</key>
        <string>Alternate</string>
        <key>LSItemContentTypes</key>
        <array>
            <string>net.daringfireball.markdown</string>
            <string>com.apple.plain-text</string>
        </array>
        <key>CFBundleTypeExtensions</key>
        <array>
            <string>md</string>
            <string>markdown</string>
            <string>txt</string>
        </array>
    </dict>
</array>
```

- `LSHandlerRank: Alternate` — 不搶成預設開啟方式（保留讓用戶手動選擇）
- `net.daringfireball.markdown` — macOS 原生 Markdown UTI
- `com.apple.plain-text` — 純文字 UTI

### 2. `menu.m` — 處理 `application:openFile:` 回調

在 `MDAppDelegate` 中新增：

```objc
- (BOOL)application:(NSApplication *)sender openFile:(NSString *)filename {
    goMenuCallback(3); // MenuOpen = 3
    // 需要將 filename 傳給 Go — 用全域變數 + goMenuCallback 擴充，或新增 C bridge
    return YES;
}
```

**注意**：現有 `goMenuCallback` 只傳 ID，不傳路徑。需要擴充機制傳遞檔案路徑。

#### 方案：新增 `goOpenFileWithPath` C bridge

```objc
// menu.m 新增
extern void goOpenFileWithPath(const char *path);

- (BOOL)application:(NSApplication *)sender openFile:(NSString *)filename {
    goOpenFileWithPath([filename UTF8String]);
    return YES;
}
```

### 3. `menu.go` — 新增 Go export function

```go
//export goOpenFileWithPath
func goOpenFileWithPath(path *C.char) {
    filePath := C.GoString(path)
    if currentWV != nil && filePath != "" {
        currentWV.Dispatch(func() { loadFile(filePath) })
    }
}
```

⚠️ `loadFile` 和 `currentWV` 定義在 `main.go`，`menu.go` 是同一 package 所以可直接呼叫。確認編譯順序無問題即可。

### 4. 註冊到 macOS Launch Services

app 安裝到 `/Applications` 後執行一次：

```bash
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -f /Applications/md-viewer.app
```

開發期間也可用 `open -a` 測試：

```bash
open -a /Users/claw/Projects/md-viewer-webview/md-viewer.app test.md
```

## 驗收標準

- [ ] `go build` 成功無錯誤
- [ ] Finder 右鍵 .md → 開啟方式 → md-viewer 出現在選項中
- [ ] 雙擊 .md 能用 md-viewer 開啟（需先手動設定為預設或用右鍵選）
- [ ] `open -a md-viewer.app test.md` 正確開啟檔案
- [ ] 拖放 .md 到 Dock icon（或 app icon）能開啟

---

*建立時間：2026-04-25 by 寶寶*