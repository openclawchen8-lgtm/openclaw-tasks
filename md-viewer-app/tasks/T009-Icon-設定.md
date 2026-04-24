---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/93
title: Icon 設定
status: skip
assignee: 寶寶
created: 2026-04-24
updated: 2026-04-24
---

## 目標

為 md-viewer-webview 和 md-viewer-fyne 的 .app bundle 設定可愛的自訂 icon。

## 執行過程

### 1. Icon 生成 ✅

已生成 1024x1024 PNG → 轉換為 icns（116KB）：
- `~/Projects/md-viewer-webview/md-viewer.app/Contents/Resources/AppIcon.icns`
- `~/Projects/md-viewer-fyne/md-viewer.app/Contents/Resources/AppIcon.icns`

Icon 設計：軟藍色漸層背景、圓角文件、微笑表情、腮紅、折角。

### 2. Info.plist 更新 ✅

已加入：
```xml
<key>CFBundleIconFile</key>
<string>AppIcon</string>
```

### 3. Bundle Bit 設定 ❌

**問題**：macOS 需要 `com.apple.FinderInfo` xattr 中的 bundle bit 才能識別 .app 為應用程式。

**嘗試過的方法**：
- `SetFile -a B` — 無效（無 sudo）
- `SetFile -a C` — 無效（無 sudo）
- `xattr` 直接寫入 — 無效（無 sudo）
- 移動 .app 到不同位置 — 無效

**根本原因**：macOS 系統權限限制，非 sudo 用戶無法設定 bundle bit。

## 手動解法（不需要 sudo）

### 步驟 1：開啟 Finder
前往：`/Users/claw/Projects/md-viewer-webview/`

### 步驟 2：顯示簡介
對 `md-viewer.app` 按右鍵 → 「顯示簡介」（或按 ⌘I）

### 步驟 3：複製 Icon
開另一個 Finder 視窗，前往：
`/Users/claw/Projects/md-viewer-webview/md-viewer.app/Contents/Resources/`

點一下 `AppIcon.icns`，按 ⌘C 複製

### 步驟 4：貼上 Icon
回到「顯示簡介」視窗，點一下左上角的 **小 icon**（現在應該是資料夾圖案），按 ⌘V 貼上

### 步驟 5：對 fyne 版本重複
同樣步驟套用至 `/Users/claw/Projects/md-viewer-fyne/md-viewer.app/`

## 狀態

- Icon 檔案：✅ 已生成
- 自動設定：❌ 無法完成（權限限制）
- 手動設定：⏭️ 等待用戶操作

## 決定

標記為 **skip** — 功能已完成（icon 生成 + plist 設定），但最後一步需手動操作，無法自動化。

---

*建立時間：2026-04-24 by 寶寶*
