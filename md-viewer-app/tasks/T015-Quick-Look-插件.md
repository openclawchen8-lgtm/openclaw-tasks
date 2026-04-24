---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/99
title: Quick Look 插件
status: pending
assignee: 碼農2號
created: 2026-04-24
updated: 2026-04-24
depends: [T006]
---

## 目標

實作 macOS Quick Look 插件，讓 Finder 可以直接預覽 .md 檔案。

## 功能規格 (Technical Specs)

### 核心需求
1. **QLPreviewingController**：實作 Quick Look 協定
2. **Markdown → HTML**：將 .md 轉換為 HTML 供 Quick Look 顯示
3. **樣式整合**：使用與主 app 相同的 CSS 樣式
4. **效能**：快速生成預覽（<100ms）

### 技術實作方向

**方案 A：Swift Quick Look Extension（推薦）**
- 建立 Quick Look Extension target
- 實作 `QLPreviewingController`
- 使用 swift-markdown 解析
- 優點：原生 macOS，效能最佳
- 缺點：需要 Swift，建置複雜

**方案 B：Go + qlmanage**
- 生成 HTML 檔案供 Quick Look 使用
- 使用 `qlmanage` 註冊
- 優點：純 Go
- 缺點：功能受限，非真正 plugin

**方案 C：獨立 Helper App**
- 建立 Helper App 處理 Quick Look 請求
- 透過 XPC 與系統通訊
- 優點：可復用主 app 邏輯
- 缺點：建置複雜

### 推薦方案

**使用方案 A**（Swift Quick Look Extension）：

1. 建立 Swift Quick Look Extension target
2. 實作 `QLPreviewingController`：
```swift
class MarkdownPreviewProvider: QLPreviewingController {
    func preparePreviewOfFile(at url: URL,
                              completionHandler handler: @escaping (Error?) -> Void) {
        // 讀取 .md 檔案
        // 使用 swift-markdown 解析
        // 生成 HTML
        // 設定預覽內容
        handler(nil)
    }
}
```

3. 整合主 app 的 CSS 樣式
4. 打包為 `.qlgenerator` bundle

## 使用說明 (User Guide)

在 Finder 選中 .md 檔案，按下空白鍵即可直接在彈出視窗看到美化後的預覽，無需開啟主 App。

## 子任務

### T015-A — Quick Look Extension 專案建立
- 建立 Swift Quick Look Extension target
- 設定 `Info.plist`（支援 .md 檔案類型）
- 整合到主 app 的 Xcode 專案

### T015-B — Markdown 解析整合
- 使用 swift-markdown 或 goldmark
- 將 .md 轉換為 HTML
- 載入 CSS 樣式

### T015-C — 預覽生成
- 實作 `preparePreviewOfFile`
- 生成 HTML 預覽
- 處理錯誤情況

### T015-D — 安裝與測試
- 打包 `.qlgenerator`
- 安裝到 `~/Library/QuickLook/`
- 測試 Finder Quick Look 功能

## 產出

- `QuickLookExtension/` 新增（Swift 專案）
- `md-viewer.qlgenerator` 新增（Quick Look plugin）
- 安裝腳本

## 驗收標準

- [ ] Finder 選中 .md 按空白鍵可預覽
- [ ] 預覽樣式與主 app 一致
- [ ] 預覽生成 < 100ms
- [ ] 支援表格、程式碼區塊等 GFM 語法

## 備註

- Quick Look Extension 需要使用 Swift
- 可能需要調整建置流程（加入 Xcode）
- 若不想引入 Swift，可標記為「未來增強」

---

*建立時間：2026-04-24 by 寶寶*
