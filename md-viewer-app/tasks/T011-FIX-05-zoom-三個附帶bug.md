---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/98
title: "[T011-FIX-05] 修復 zoom 修復後三個附帶問題"
type: subtask
status: done
done_time: 2026-04-26
assignee: 碼農1號
parent: T011
created: 2026-04-26
updated: 2026-04-26
---

## 目標

修復 T011-FIX-01 修復 zoom 後意外造成的三個問題。

## 問題描述

### Bug 1：底部 bar zoom % 顯示異常
- **現象**：底部 bar 顯示 `100%`，但 zoom 操作後 1.5 秒內會變回固定文字
- **根因**：`showZoomIndicator()` 內有 `setTimeout` 讓浮層 fade-out，fade-out 時把 `keyboardHint` 文字重設回固定字串（不含 %）
- **修復**：`showZoomIndicator` 更新 `keyboardHint` 時也用 `%` 動態文字，並移除 fade-out 對 `keyboardHint` 的覆蓋
  - `showZoomIndicator` 內更新 `keyboardHint` 改為完整重建含 % 的文字
  - `keyboardHint` 初始化也改為 `⌘O Open | ⇧⌘R Reset | ⌘+/⌘- Zoom | ⌘S | ⌘Q Quit`（含 % 預留位）

### Bug 2：⌘+S 無法關閉設定面板
- **根因**：`window.showSettingsPanel` 在 IIFE 內定義但**未掛上 `window.`**，⌘+S handler 在 IIFE 內呼叫不到
- **修復**：將 `showSettingsPanel` / `hideSettingsPanel` 宣告時直接賦值給 `window.`

### Bug 3：⌘+S label 顯示「⌘S Settings」而非「⌘S」
- **根因**：`htmlTemplate` 中 `keyboard-hint` div 的文字內容寫死
- **修復**：將 `⌘S Settings` 改為 `⌘S`

## 修改檔案

### `main.go` — JS 區段

**修正 1**：`htmlTemplate` 中的 `keyboard-hint` div
```js
// 修正前
<div class="keyboard-hint" id="keyboardHint">⌘O Open | ⇧⌘R Reset | ⌘+/⌘- Zoom | ⌘S Settings | ⌘Q Quit</div>
// 修正後
<div class="keyboard-hint" id="keyboardHint">⌘O Open | ⇧⌘R Reset | ⌘+/⌘- Zoom | ⌘S | ⌘Q Quit</div>
```

**修正 2**：`window.showSettingsPanel` / `window.hideSettingsPanel` 移到 IIFE 內直接賦值給 window（原本在 IIFE 外面第二段）

**修正 3**：`showZoomIndicator` 內更新 `keyboardHint` 的文字也使用動態 % 版

**修正 4**：移除 IIFE 外重複的 `window.showSettingsPanel` 定義，換成註釋標記

## 驗收標準

- [ ] 底部 bar 正確顯示當前 zoom %（如 `120%`），zoom 操作後保持顯示
- [ ] ⌘+S 開啟設定面板，再按 ⌘+S / Esc / 點 × 可關閉
- [ ] 底部 bar 顯示 `⌘S` 而非 `⌘S Settings`
- [ ] `go build` 無錯誤

## 實作摘要

已執行，build 成功。

---

*建立時間：2026-04-26 by 碼農1號*
