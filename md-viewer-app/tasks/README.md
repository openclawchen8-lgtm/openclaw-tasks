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
| **T010** | **支援拖拉開啟 md 檔案** | **📋 pending** | **新增** |
| **T011** | **Menubar Touchpad 靈敏度設定** | **📋 pending** | **新增** |

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

*最後更新：2026-04-24 by 寶寶*
