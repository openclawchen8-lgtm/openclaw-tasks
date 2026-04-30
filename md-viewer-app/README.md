# md-viewer-app

**md-viewer** 是一款專為 macOS 打造的高效能 Markdown 閱讀器。

## 專案組成

| 專案 | 技術棧 | 狀態 |
|------|---------|------|
| `md-viewer-webview/` | Go + webview_go + Swift-markdown（CGO） | ✅ **主線** |
| `md-viewer-fyne/` | Go + Fyne | 對比保留 |

最終選定 **webview 方案**，見 [T008 對比評估](tasks/T008-專案分裂與對比評估.md)。

## 已實作功能

| 功能 | Task |
|------|-------|
| Swift-markdown 解析引擎 | T003 |
| 6 主題即時切換 | T005、T014 |
| highlight.js 語法高亮 + 複製按鈕 | T017 |
| 設定面板（縮放/字型/語言/行號） | T011-C~G、T011-FIX |
| NSMenu 原生選單 | T011-A、T011-B |
| i18n（繁中/簡中/英/日/韓） | T011-FIX-02、T011-FIX-03 |
| 拖拉開啟 .md 檔案 | T010 |
| 檔案監控自動重載（含 reload flash） | T013 |
| macOS 文件關聯（雙擊 .md 開啟） | T011-L |
| HTML / PDF 匯出 | T019 |
| 全螢幕（⌘F） | T011-FIX-04 |
| Zoom 持久化（跨 reload/重開保留） | T011-FIX-01、T011-FIX-05 |

## Skip 項目

| Task | 說明 |
|------|------|
| T004 | 側邊欄檔案列表（產品定位為純閱讀器） |
| T009 | Icon Bundle bit（需 sudo） |
| T015 | Quick Look 插件（需 Swift + Xcode .qlgenerator） |
| T016 | 自動大綱 TOC（無 TOC 解析邏輯） |
| T018 | 置頂小窗模式（webview_go 未暴露 setWindowLevel） |
| T020 | 數學公式（未整合 MathJax/KaTeX） |
| T021 | Mermaid 圖表（未整合 mermaid.js） |

## 新功能待實作

| Task | 名稱 | 說明 |
|------|------|------|
| T022 | 搜尋文件內容 | ⌘F 搜尋 + 上一個/下一個導航 |
| T023 | 滾動位置保持 | reload 後保持當前滾動位置 |
| T024 | 視窗大小/位置記憶 | 關閉後重開自動還原視窗 frame |
| T025 | 最近開啟的檔案 | NSMenu → File 子選單最多 10 筆 |
| T026 | 專注模式 | ⌘\ 淡化非焦點段落 |
| T027 | 連結懸停預覽 | 滑鼠懸停本地 .md 連結 500ms 顯示預覽 |

## Task 列表

| # | 名稱 | 狀態 |
|---|------|------|
| T001 | 評估 Fyne 環境 | ✅ done |
| T002 | 建立 Go 骨架與 Window | ✅ done |
| T003 | Markdown 解析與 WebView 渲染 | ✅ done |
| T004 | 側邊欄檔案列表 | ⚠️ skip |
| T005 | 深色模式支援 | ✅ done |
| T006 | Build 與測試 macOS App | ✅ done |
| T007 | 自動化測試快捷鍵 | ⏳ re-check |
| T008 | 專案分裂與對比評估 | ✅ done |
| T009 | Icon 設定 | ⚠️ skip |
| T010 | 支援拖拉開啟 md 檔案 | ✅ done |
| T010-B1 | 研究 webview_go NSWindow | ✅ done |
| T011-A~G | NSMenu / 設定面板系列 | ✅ done |
| T011-FIX-01~05 | Zoom/i18n/menubar 修復 | ✅ done |
| T011-L | macOS 文件關聯 | ✅ done |
| T011-Menubar | Touchpad 靈敏度設定 | ✅ done |
| T012 | 極速渲染引擎 | ✅ done |
| T013 | 檔案變動監控 | ✅ done |
| T014 | 多主題切換 | ✅ done |
| T015 | Quick Look 插件 | ⚠️ skip |
| T016 | 自動大綱 TOC | ⚠️ skip |
| T017 | 語法高亮 Code | ✅ done |
| T018 | 置頂小窗模式 | ⚠️ skip |
| T019 | PDF/HTML 匯出 | ✅ done |
| T020 | 數學公式 | ⚠️ skip |
| T021 | Mermaid 圖表 | ⚠️ skip |
| T022 | 搜尋文件內容 | 📋 pending |
| T023 | 滾動位置保持 | 📋 pending |
| T024 | 視窗大小/位置記憶 | ✅ done |
| T025 | 最近開啟的檔案 | ✅ done |
| T026 | 專注模式 | 📋 pending |
| T027 | 連結懸停預覽 | 📋 pending |

**✅ done: 15 | ⚠️ skip: 7 | ⏳ re-check: 1 | 📋 pending: 6**
