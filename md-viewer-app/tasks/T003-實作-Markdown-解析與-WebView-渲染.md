---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/91
title: 實作 Markdown 解析與 WebView 渲染
status: done
assignee: 碼農2號
created: 2026-04-23
updated: 2026-04-24
depends: [T002]
---

## ⚠️ 更新（2026-04-24）

本任務已**拆分為兩個平行實作**：

| 版本 | 技術棧 | 位置 | 狀態 |
|------|--------|------|------|
| webview | webview/webview_go + goldmark | `~/Projects/md-viewer-webview/` | ✅ 全部完成 |
| fyne | Fyne UI + goldmark | `~/Projects/md-viewer-fyne/` | ✅ 全部完成 |

以下為原始規劃文件，僅供參考。

---

## 目標
使用 **zserge/webview** 取代 Fyne 內建 Markdown widget，實現真正的 HTML/CSS 渲染，達到接近 GitHub 官方 Markdown 樣式的精緻效果。

## 為什麼用 zserge/webview

| 方案 | 渲染品質 | 實作複雜度 | 深色模式 | 結論 |
|------|----------|-----------|---------|------|
| Fyne NewRichTextFromMarkdown | ★★☆ | 低 | Fyne 主題 | 樣式受限 |
| **zserge/webview + goldmark + CSS** | **★★★★★** | **中** | **CSS 變數** | **MVP 最優** |

zserge/webview 在 macOS 底層使用 WebKit，真正支援完整 CSS（GFM 樣式、程式碼區塊語法高亮、滾動條、::selection 等）。

---

## 子任務拆解

### T003-A — goldmark Markdown → HTML 核心（⭐ 起點）
- **負責人**：寶寶（規劃）/ 碼農2號（實作）
- **內容**：在 `core/markdown.go` 建立 goldmark 渲染器，支援 GFM（表格、任務清單、刪除線、連結自動轉換）
- **產出**：`core/markdown.go`
- **驗收**：讀入任意 .md 檔，輸出完整 HTML 字串

### T003-B — HTML 模板與 CSS 樣式（⭐ 核心）
- **負責人**：碼農2號
- **內容**：
  - `assets/markdown.css` — GitHub 風格 CSS，含深色模式（`@media (prefers-color-scheme: dark)`）
  - `assets/template.html` — HTML 殼，注入 goldmark 輸出的 HTML + CSS
  - 支援：程式碼區塊（monospace + 背景）、表格、GFM 任務清單、blockquote、預覽區最大寬度 800px 居中
- **產出**：`assets/markdown.css`、`assets/template.html`
- **驗收**：用 curl 打開 HTML 檔，外觀跟 GitHub 文件網站一致

### T003-C — zserge/webview 整合（⭐ 核心）
- **負責人**：碼農2號
- **內容**：
  - `ui/webview.go` — 包裝 webview.WebView，支援：
    - `LoadHTML(html string)` — 動態更新內容
    - `SetTheme(dark bool)` — 動態切換深色模式
  - `ui/app.go` — 主程式重構：
    - 開啟 .md 檔 → 讀取 → goldmark → HTML → 注入 template → webview.LoadHTML
    - 選單（⌘O / ⌘⇧O / ⌘W / ⌘B）
    - 深色模式偵測（`osascript -e 'tell app "System Events" to get dark mode of appearance preferences'` 或 CSS prefers-color-scheme）
- **產出**：`ui/webview.go`、`ui/app.go`（重構 main.go）
- **驗收**：雙擊 .md 檔，WebView 正確渲染完整 GFM 樣式

### T003-D — 樣式細節與微調（⭐ 加分）
- **負責人**：碼農2號
- **內容**（達到★★★★★的關鍵）：
  - 程式碼區塊語法高亮：嵌入 highlight.js CDN（或本地 bundle）
  - 區塊引用左側彩色邊線
  - 任務清單 checkbox 互動（唯讀，點擊不放）
  - 圖片自適應最大寬度
  - 平滑滾動與選文字反白樣式
- **產出**：更新 `assets/markdown.css`、`assets/template.html`
- **驗收**：肉眼對比 GitHub 官網 README 相似度 > 85%

### T003-E — Build 與驗證
- **負責人**：碼農2號
- **內容**：
  - `go build -o md-viewer .`
  - `fyne package --os darwin --app-id com.mdviewer.app`（仍用 Fyne 打包，但 main.go 只做 webview 初始化）
  - 測試：開啟一個複雜 .md（表格 + 程式碼 + 任務清單 + 圖片）
- **產出**：可運行的 .app
- **驗收**：與 GitHub 官網 README 渲染外觀高度一致

---

## 技術路線圖

```
.md file
  ↓
core/markdown.go          goldmark → HTML（含 GFM）
  ↓
assets/template.html      包裹 HTML + 載入 CSS
  ↓
assets/markdown.css       GitHub 風格（含深色模式）
  ↓
ui/webview.go             zserge/webview 顯示
  ↓
macOS WebKit 渲染         ★★★★★ 視覺效果
```

## 依賴

```go
require (
    github.com/zserge/webview v0.0.0
    github.com/yuin/goldmark v1.7.4
    github.com/yuin/goldmark/extension v1.7.4
    github.com/yuin/goldmark/extension/table v1.7.4
    github.com/yuin/goldmark/parser v1.7.4
    github.com/yuin/goldmark/renderer/html v1.7.4
)
```

## 檔案結構（更新後）

```
md-viewer-app/
├── main.go              ← 入口（重構，只做 webview 初始化）
├── go.mod / go.sum
├── FyneApp.toml
├── assets/
│   ├── template.html    ← HTML 殼
│   └── markdown.css     ← GitHub 風格（含深色模式）
├── ui/
│   ├── app.go          ← 主程式（整合所有功能）
│   ├── sidebar.go      ← 側邊欄（保留自 T002）
│   └── webview.go      ← zserge/webview 包裝
└── core/
    ├── markdown.go      ← goldmark 渲染器
    └── file_tree.go    ← 資料夾掃描
```

## 備註

- **zserge/webview vs Fyne WebView**：zserge 更輕量，直接控制 HTML/CSS；Fyne 內建 widget 無法注入自訂 CSS
- **macOS 打包**：仍用 `fyne package` 打包成 .app（只取 Fyne 打包工具，不使用 Fyne UI 元件）
- **dark mode 偵測**：macOS 有 `defaults read -g AppleInterfaceStyle` 可查；也支援 CSS `prefers-color-scheme: dark`

---

*規劃：寶寶 | 2026-04-23*
