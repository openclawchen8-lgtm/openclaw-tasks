---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/100
title: "[T011-FIX-03] 修復 menubar 預設語系顯示英文"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
---

## 目標

修復 NSMenu 在 app 啟動時顯示英文而非繁中的問題。

## 問題描述

預設語系為 zhTW，但 menubar 始終顯示英文。

## 根因分析

三個可能疊加原因（需逐一驗證）：

1. **webview 覆蓋 menu**：`SetupMainMenu` 在 `dispatch_once` 中用 zhTW 建好 menu，但 `wv.Run()` 啟動 event loop 時 webview framework 可能重建 main menu（預設英文），而 `dispatch_once` 阻止第二次 `SetupMainMenu`
2. **top-level menu item 無 title**：`[[NSMenuItem alloc] init]` 後未呼叫 `setTitle:`，macOS 可能 fallback 顯示英文或空白
3. **啟動時未呼叫 `UpdateMenuLanguage`**：Go 端 `SetupMenu` 前未用 config language 初始化 `currentMenuLang`，`SetupMainMenu` 的 `currentMenuLang` 始終是 `@""`（雖然有 fallback zhTW，但若 webview 先設了英文 menu，後面的 `UpdateMenuLanguageTitles` 才是修正途徑）

## 修改檔案

### `menu.m`

#### 修正 1：top-level menu item 加 title

```objc
// 修正前
NSMenuItem *fileItem = [[NSMenuItem alloc] init];
// 修正後
NSMenuItem *fileItem = [[NSMenuItem alloc] initWithTitle:t(@"fileMenu") action:nil keyEquivalent:@""];
```

需要在 `tr` dictionary 中新增：

```objc
@"fileMenu":     @[@"File", @"檔案", @"文件", @"ファイル", @"파일"],
@"viewMenu":     @[@"View", @"顯示", @"视图", @"表示", @"보기"],
@"helpMenu":     @[@"Help", @"輔助說明", @"帮助", @"ヘルプ", @"도움말"],
```

對 `appItem`、`helpItem` 同樣處理。

#### 修正 2：移除 `dispatch_once`，改為可重複呼叫

`dispatch_once` 導致 menu 只能建一次，被覆蓋後無法重建：

```objc
// 修正前
void SetupMainMenu(void) {
    static dispatch_once_t once;
    dispatch_once(&once, ^{ ... });
}

// 修正後
void SetupMainMenu(void) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (!_sharedDelegate) {
            _sharedDelegate = [[MDAppDelegate alloc] init];
            [NSApp setDelegate:_sharedDelegate];
        }
        NSString *lang = currentMenuLang.length > 0 ? currentMenuLang : @"zhTW";
        [(MDAppDelegate *)_sharedDelegate setupMenuWithLang:lang];
    });
}
```

注意：`dispatch_async` 確保在 main thread 執行。若 `wv.Run()` 之後 webview 覆蓋 menu，可在 Go 端延遲呼叫 `UpdateMenuLanguage` 重建。

### `menu.go`

#### 修正：啟動時從 config 初始化 menu 語言

在 `main.go` 的 `SetupMenu` 呼叫前：

```go
UpdateMenuLanguage(currentConfig.Language)
SetupMenu(func(menuID int) { ... })
```

### `main.go`（Go bind）

#### 新增延遲重建機制

在 `SetupMenu` callback 內或 `wv.Run()` 之前，用 `dispatch_after` 延遲重建 menu（確保 webview 初始化完成後）：

Go 端可在 `wv.Run()` 前加：

```go
// 延遲 0.5 秒重建 menu，確保 webview 不會再覆蓋
time.AfterFunc(500*time.Millisecond, func() {
    UpdateMenuLanguage(currentConfig.Language)
})
```

## 驗證步驟

1. `go build` 確認無 CGO 錯誤
2. 啟動 app → menubar 應顯示繁中（檔案、顯示、輔助說明）
3. 設定面板切換語言 → menubar 應同步切換
4. 重開 app → menubar 保持上次語言

## 驗收標準

- [ ] app 啟動時 menubar 顯示繁中（或 config 中設定的語言）
- [ ] top-level menu item 顯示正確語言 title
- [ ] 語言切換後 menubar 即時更新
- [ ] `dispatch_once` 問題已修正（menu 可重複重建）

---

*建立時間：2026-04-25 by 寶寶*