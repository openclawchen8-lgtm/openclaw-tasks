---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/95
title: Menubar Touchpad 靈敏度設定
status: pending
assignee: 碼農2號
created: 2026-04-24
updated: 2026-04-24
depends: [T006]
---

## 目標

在 menubar 中新增 Touchpad 靈敏度設定，使用拖拉滑桿調整。

## 需求

### 功能描述
1. 在 menubar 選單中新增「設定」子選單
2. 包含「Touchpad 靈敏度」選項
3. 點擊後顯示滑桿（slider），可拖拉調整
4. 靈敏度範圍：1-10（預設 5）
5. 設定值持久化（儲存到 `~/.md-viewer/config.json`）

### 技術實作方向

**方案 A：macOS Native Menu + NSMenuItem**
- 使用 `golang.org/x/macosx` 或 CGO 呼叫 Objective-C
- 建立 `NSMenu` + `NSMenuItem` + `NSSlider`
- 優點：原生體驗
- 缺點：需要 CGO，複雜度高

**方案 B：WebView 內嵌設定面板**
- 在 webview 中建立設定 overlay
- 使用 HTML `<input type="range">` 滑桿
- 透過 `webview.Bind` 同步設定值到 Go
- 優點：實作簡單，跨平台
- 缺點：非原生 UI

**方案 C：獨立設定視窗**
- 開啟新的小視窗顯示設定面板
- 使用 webview 渲染設定 UI
- 優點：不干擾主視窗
- 缺點：需要管理多視窗

### 推薦方案

**使用方案 B**（WebView 內嵌設定面板）：
1. Menubar 新增「設定...」選單項目
2. 點擊後在 webview 中顯示設定 overlay
3. 使用 HTML range slider 調整靈敏度
4. 透過 `webview.Bind` 儲存設定

## 子任務

### T011-A — Menubar 新增設定選單
- 在現有選單中加入「設定...」項目
- 快捷鍵：⌘,

### T011-B — 設定面板 UI
- 建立 settings overlay（半透明遮罩 + 設定面板）
- 包含：Touchpad 靈敏度滑桿（1-10）
- 滑桿旁顯示當前數值

### T011-C — 設定持久化
- 建立 `~/.md-viewer/config.json`
- 結構：`{"touchpad_sensitivity": 5, "theme": "auto"}`
- 啟動時載入，變更時儲存

### T011-D — 靈敏度效果實作
- 將靈敏度值對應到實際行為（例如縮放速度、滾動速度）
- 需確認 touchpad 靈敏度對 webview 的影響方式

## 產出

- `main.go` 更新（新增設定選單、config 載入/儲存）
- `assets/template.html` 更新（settings overlay）
- `assets/markdown.css` 更新（設定面板樣式）
- `~/.md-viewer/config.json`（設定檔）

## 驗收標準

- [ ] Menubar 有「設定...」選單項目
- [ ] 點擊後顯示設定面板
- [ ] 滑桿可拖拉調整靈敏度（1-10）
- [ ] 設定值會儲存，重開 app 後保留
- [ ] 快捷鍵 ⌘, 可開啟設定

## 備註

- Touchpad 靈敏度的實際效果需進一步研究
- 可能需要對應到 webview 的滾動速度或縮放速度
- 若無法直接控制 touchpad，可改為「滾動速度」或「縮放靈敏度」

---

*建立時間：2026-04-24 by 寶寶*
