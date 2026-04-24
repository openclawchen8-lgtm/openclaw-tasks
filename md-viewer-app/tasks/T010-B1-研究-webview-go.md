# T010-B1: 研究 webview_go 是否暴露 NSWindow

## 結論：✅ 可以！

webview_go 已有 `Window()` 方法：
```go
func (w *webview) Window() unsafe.Pointer
```

在 macOS 上，這會回傳 NSWindow pointer。

**參考來源**：
- `/Users/claw/go/pkg/mod/github.com/webview/webview_go@v0.0.0-20240831120633-6173450d4dd6/webview.go` 第 77 行
- 文件註解："When using Cocoa backend the pointer is NSWindow pointer"

## 下一步
- T010-B2: 用 CGO + Objective-C 實作 NSDraggingDestination

---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/97
*2026-04-24 17:20*