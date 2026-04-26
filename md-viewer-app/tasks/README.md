# md-viewer-app 任務追蹤

## 📢 重大更新（2026-04-24）

本專案已**分裂為兩個平行實作**，以便評估不同技術棧：

| 專案 | 技術棧 | 位置 | 狀態 |
|------|--------|------|------|
| **md-viewer-webview** | Go + webview/webview_go + goldmark | `~/Projects/md-viewer-webview/` | ✅ T001-T007 全部完成 |
| **md-viewer-fyne** | Go + Fyne UI + goldmark | `~/Projects/md-viewer-fyne/` | ✅ T001-T007 全部完成 |

原始碼已從 `~/Tasks/md-viewer-app/` 移至 `~/Projects/`，本目錄僅保留任務追蹤文件。

---

## 專案對比報告

詳見 `~/Projects/COMPARISON.md`

| 特性 | webview | fyne |
|------|---------|------|
| 二進位大小 | 5.1 MB | 33 MB |
| 縮放功能 | ✅ CSS zoom | ✅ Window resize |
| 原生選單 | ✅ Native Menu | ❌ 快捷鍵 |
| 圖片顯示 | ✅ 正常 | ⚠️ 開啟 .md 會跳瀏覽器 |
| Icon 設定 | ⚠️ 需手動 | ⚠️ 需手動 |

---

## 開發方向

**主力開發**：`md-viewer-webview`（體積小、效能好、原生體驗）

## 任務清單（本目錄）

| 編號 | 任務 | 狀態 | 備註 |
|------|------|------|------|
| T001 | 評估 Fyne 環境 | ✅ done | 原始規劃，已歸檔 |
| T002 | 建立 Go 骨架與 Window | ✅ done | 原始規劃，已歸檔 |
| T003 | 實作 Markdown 解析與 WebView 渲染 | ✅ done | 已拆分為 webview/fyne 兩版本 |
| T004 | 實作側邊欄檔案列表 | ✅ done | 兩版本皆完成 |
| T005 | 實作深色模式支援 | ✅ done | 兩版本皆完成 |
| T006 | Build 與測試 macOS app | ✅ done | 兩版本皆完成 |
| T007 | 縮放功能（⌘+/⌘-） | ✅ done | 兩版本皆完成 |
| T008 | 專案分裂與對比評估 | ✅ done | 建立 COMPARISON.md |
| T009 | Icon 設定完成 | ⏭️ skip | 需手動設定，無法自動化 |
| T010 | 支援拖拉開啟 md 檔案 | ✅ done | WebView Drag & Drop |
| **T011** | **Menubar 設定面板 縮放持久化** | **📋 進行中** | **新增** |
| ├ T011-A | Native NSMenu 骨架 | 📋 pending | 碼農2號 |
| ├ T011-B | 選單結構與 shortcut 綁定 | 📋 pending | 依賴 A |
| ├ T011-C | Preferences ⌘, 觸發設定面板 | 📋 pending | 依賴 A |
| ├ T011-D | Config 持久化 | 📋 pending | 依賴 A |
| ├ T011-E | 設定結構與預設值 | 📋 pending | 依賴 D |
| ├ T011-F | Settings Panel UI | 📋 pending | 依賴 C,D |
| ├ T011-G | Zoom step 動態套用 | ✅ done | |
| ├ T011-H | Zoom Level 持久化 | ✅ done | |
| ├ T011-I | 字型 + 字型大小持久化 | ✅ done | |
| ├ T011-J | 語言切換 + i18n UI + NSMenu i18n | ✅ done | |
| ├ T011-K | 視窗全螢幕/正常化 ⌘F | ✅ done | |
| ├ T011-L | macOS 文件關聯（雙擊 .md 開啟） | 📋 pending | |
| ├ T011-FIX-01 | zoom 永遠用舊值 | 📋 in-progress | 碼農1號 |
| ├ T011-FIX-02 | i18n 語系切換不生效 | 📋 pending | 最複雜，FIX-01/03 完成後做 |
| ├ T011-FIX-03 | menubar 預設顯示英文 | 📋 pending | 依賴 FIX-01，FIX-01 完成後由碼農2號接 |
| └ T011-FIX-04 | ⌘F 全螢幕無實現 | ✅ done | Bug 修復 |
| T012 | 極速渲染引擎 | 📋 pending | 新增 |
| T013 | 檔案變動監控 | 📋 pending | 新增 |
| T014 | 多主題切換 | 📋 pending | 新增 |
| T015 | Quick Look 插件 | 📋 pending | 新增 |
| T016 | 自動大綱 (TOC) | 📋 pending | 新增 |
| T017 | 語法高亮 (Code) | 📋 pending | 新增 |
| T018 | 置頂小窗模式 | 📋 pending | 新增 |
| T019 | PDF/HTML 匯出 | 📋 pending | 新增 |
| T020 | 數學公式 | 📋 pending | 新增 |
| T021 | Mermaid 圖表 | 📋 pending | 新增 |

---

## 原始碼位置

```
~/Projects/
├── md-viewer-webview/     ← webview 版本（5.1MB）
│   ├── main.go
│   ├── core/renderer.go
│   └── md-viewer.app/
├── md-viewer-fyne/        ← Fyne 版本（33MB）
│   ├── main.go
│   ├── ui/
│   └── md-viewer.app/
└── COMPARISON.md          ← 詳細對比報告
```

---

*最後更新：2026-04-25 by 寶寶*
