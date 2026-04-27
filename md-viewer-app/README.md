# md-viewer-app

**純 Markdown 預覽 macOS App，用 Go 開發。**

> 動機：MacDown 無法預設只開預覽，需要一個乾淨的 Markdown 閱讀工具。

---

## 🎯 專案目標

建立一個 macOS 原生 App，功能：
- 📂 拖放 / 開啟 .md 檔，純預覽（零編輯區）
- 🗂️ 側邊欄檔案列表
- 🌙 深色模式（跟隨系統）
- 🔖 書籤 / 捷徑
- 📁 支援拖放資料夾，掃描所有 .md

---

## ⚙️ 可行方案分析

以下為 2026-04-23 評估結果：

| 方案 | 技術棧 | 複雜度 | UI 品質 | 優點 | 缺點 |
|------|--------|--------|---------|------|------|
| **Fyne** | Go GUI 框架 + WebView | ★★☆ | ★★★ | 純 Go，不需要 Node.js/Xcode GUI，可直接 build 成 `.app` | WebView 渲染取決於系統版本，部分 CSS 可能不支援 |
| **Wails** | Go + WebView（Electron 底層） | ★★☆ | ★★★★ | 功能完整，支援系統通知、系統 tray | 需要另外安裝 npm/wails CLI，學習曲線稍高 |
| **Cocoa + Go** | Go + Objective-C 綁定 | ★★★★ | ★★★★★ | 原生 Cocoa 體驗，最佳 UI | 需要 Objective-C bridging，CocoaPods 環境複雜，Xcode GUI 依賴高 |
| **go-astilectron** | Go + Chromium (Electron) | ★★★ | ★★★★ | 豐富的前端生態，UI 靈活 | 依賴 Chromium binary，App bundle 體積大（>100MB） |
| **HTML/CLI 預覽器** | Python/Go CLI + 瀏覽器 | ★☆☆ | ★★★ | 最快實作，無需 GUI | 不是原生 App，需要終端操作 |

### 🏆 最終判斷：優先選 **Fyne**，其次 **Wails**

**理由（Fyne）：**
1. 純 Go，从代码编写到最终构建都是同一种语言，开发体验一致
2. 包含 WebView 支持，可以用现代 HTML/CSS 做渲染，UI 好看
3. 可直接 build 成 macOS `.app`，不需要 Xcode GUI 打包
4. 已有成功案例（Fyne 本身是知名开源项目）
5. Go 生态中有 goldmark 做 Markdown 解析，质量高

**风险点：**
- Fyne WebView 性能取决于 macOS 系统 WebKit 版本
- 需要确认 `fyne bundle` / `fyne package` 能生成可用 .app

**次選（Wails）：**
- 如果 Fyne WebView 体验不佳，可以切到 Wails
- Wails 用真实 Chromium，UI 一致性更好

---

## 📦 技術棧（目前規劃）

- **語言**：Go 1.21+
- **Markdown 解析**：github.com/yuin/goldmark
- **GUI 框架**：Fyne 2.x（含 WebView）
- **構建工具**：go build + fyne 命令
- **目標平台**：macOS（.app bundle）

---

## 📁 專案結構

### 原始碼（已移至 ~/Projects/）

```
~/Projects/
├── md-viewer-webview/     ← webview 版本（5.1MB）⭐ 推薦
├── md-viewer-fyne/        ← Fyne 版本（33MB）
└── COMPARISON.md          ← 詳細對比報告
```

### 任務追蹤（本目錄）

```
md-viewer-app/
├── README.md          ← 你現在看的
├── SPEC.md            ← 詳細需求規格
├── AGENTS.md          ← 團隊協作規範
└── tasks/             ← 任務追蹤
    ├── README.md                           ← 總覽
    ├── T001-評估-Fyne-環境.md
    ├── T002-建立-Go-骨架與-Window.md
    ├── T003-實作-Markdown-解析與-WebView-渲染.md
    ├── T004-實作-側邊欄-檔案列表.md
    ├── T005-實作-深色模式支援.md
    ├── T006-Build-與-測試-macOS-app.md
    ├── T007-自動化測試快捷鍵與縮放.md
    ├── T008-專案分裂與對比評估.md      ← 新增
    ├── T009-Icon-設定.md                  ← 新增
    ├── T010-支援拖拉開啟-md-檔案.md       ← 新增
    ├── T011-Menubar-Touchpad-靈敏度設定.md ← 新增
    │   ├── T011-A-Native-NSMenu-骨架.md
    │   ├── T011-B-選單結構與shortcut綁定.md
    │   ├── T011-C-Preferences觸發設定面板.md
    │   ├── T011-D-Config持久化.md
    │   ├── T011-E-設定結構與預設值.md
    │   ├── T011-F-Settings-Panel-UI.md
    │   └── T011-G-Zoom-step動態套用.md
    └── ...
```

---

## 🔗 關聯專案

| 專案 | 關係 |
|------|------|
| `/Users/claw/Projects/md-viewer` | CLI 版本的 Markdown 預覽器（Go + goldmark），本專案的技術參考 |

---

## ✅ 當前狀態（2026-04-25）

### 已完成
| 任務 | 狀態 | 備註 |
|------|------|------|
| T001-T007 | ✅ 全部完成 | 兩個版本皆完成 |
| T008 專案分裂 | ✅ 完成 | 已建立 COMPARISON.md |
| T009 Icon 設定 | ✅ 完成 | 需手動設定 |
| T010 拖拉開啟 md | ✅ 完成 | WebView Drag & Drop |
| T012 極速渲染引擎 | ✅ done | 異步渲染，大檔案分段載入 |
| T014 多主題切換 | ✅ done | GitHub/夜間/學術/極簡 |
| T017 語法高亮 | ✅ done | highlight.js + 一鍵複製 |
 T011 | 📋 進行中 | Menubar + 設定面板 + 縮放靈敏度持久化 |
| ├ T011-A | ✅ done | Native NSMenu 骨架 |
| ├ T011-B | ✅ done | 選單結構與 shortcut 綁定 |
| ├ T011-C | ✅ done | Preferences ⌘, 觸發設定面板 |
| ├ T011-D | ✅ done | Config 持久化 |
| ├ T011-E | ✅ done | 設定結構與預設值 |
| ├ T011-F | ✅ done | Settings Panel UI |
| ├ T011-G | ✅ done | Zoom step 動態套用 |
| ├ T011-H | ✅ done | Zoom Level 持久化 |
| ├ T011-I | ✅ done | 字型 + 字型大小持久化 |
| ├ T011-J | ✅ done | 語言切換 + i18n UI + NSMenu i18n |
| ├ T011-K | ✅ done | 視窗全螢幕/正常化 ⌘F |
| ├ T011-FIX-01 | ✅ done | zoom 永遠用舊值 |
| ├ T011-FIX-02 | ✅ done | i18n 語系切換不生效 |
| ├ T011-FIX-03 | ✅ done | menubar 預設顯示英文 |
| └ T011-FIX-04 | ✅ done | ⌘F 全螢幕無實現 |
| T013 檔案變動監控 | ✅ 完成 | 自動同步編輯器存檔 |
| T019 PDF/HTML 匯出 | ✅ 完成 | 匯出精美報告 |

### 待開發（主力：md-viewer-webview）
| 任務 | 狀態 | 說明 |
|------|------|------|
| T011 | 📋 進行中 | Menubar + 設定面板 + 縮放靈敏度持久化 |
| ├ T011-L | 📋 pending | macOS 文件關聯（雙擊 .md 開啟） |
| T015 Quick Look 插件 | 📋 pending | Finder 空白鍵預覽 |
| T016 自動大綱 TOC | 📋 pending | 側邊欄目錄，點擊跳轉 |
| T018 置頂小窗模式 | 📋 pending | 視窗置頂 + 透明度 |
| T020 數學公式 | 📋 pending | MathJax/KaTeX 支援 |
| T021 Mermaid 圖表 | 📋 pending | 流程圖/甘特圖 |

**推薦使用**：`~/Projects/md-viewer-webview/`（體積小、效能好、原生體驗）

---

*建立時間：2026-04-23 by 寶寶*  
*最後更新：2026-04-25*
