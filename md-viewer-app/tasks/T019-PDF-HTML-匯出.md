---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/103
title: PDF/HTML 匯出
status: done
assignee: gemini-3-flash-preview
created: 2026-04-24
updated: 2026-04-28
depends: [T006]
---

## 目標

支援將 Markdown 匯出為 PDF 或獨立 HTML 檔案，方便分享與列印。

## 功能規格 (Technical Specs)

### 核心需求
1. **PDF 匯出**：將渲染結果轉為 PDF
2. **HTML 匯出**：生成內嵌 CSS 的獨立 HTML
3. **分享選單**：整合 macOS 分享選單
4. **檔名建議**：使用原檔名，副檔名改為 .pdf/.html

### 技術實作

**方案 A：WKWebView.createPDF()（推薦）**
- 使用 WebView 的 PDF 匯出功能
- 保持完整樣式
- 原生 macOS 體驗

**方案 B：Go PDF 套件**
- 使用 `github.com/jung-kurt/gofpdf`
- 或 `github.com/signintech/gopdf`
- 需要重新排版
- 樣式可能不一致

**方案 C：wkhtmltopdf**
- 呼叫外部工具
- 效果好但依賴外部

### 推薦方案

**PDF 匯出**：使用 WebView JavaScript：
```javascript
// 在 WebView 中執行
async function exportPDF() {
    // 使用 print() 觸發 PDF 匯出
    window.print();
}
```

或使用 macOS 列印對話框的「儲存為 PDF」功能。

**HTML 匯出**：
```go
func exportHTML(markdown string, css string) string {
    // 生成完整 HTML
    html := fmt.Sprintf(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>%s</style>
</head>
<body>
    %s
</body>
</html>
    `, css, renderedMarkdown)
    return html
}
```

## 使用說明 (User Guide)

點擊「分享」或「匯出」，可將筆記轉換為精美的 PDF 報告，適合列印或發送給沒有 MD 閱讀器的朋友。

## 子任務

### T019-A — HTML 匯出
- 生成內嵌 CSS 的獨立 HTML
- 包含所有樣式
- 儲存為 .html 檔案

### T019-B — PDF 匯出
- 使用 WebView print() 功能
- 或使用 macOS 列印對話框
- 儲存為 .pdf 檔案

### T019-C — 匯出選單
- 選單新增「匯出」子選單
- 「匯出為 HTML...」
- 「匯出為 PDF...」

### T019-D — 檔案對話框
- 顯示儲存對話框
- 建議檔名（原檔名改副檔名）
- 選擇儲存位置

### T019-E — 分享選單（可選）
- 整合 macOS 分享選單
- 支援 AirDrop、郵件等

## 產出

- `export/html.go` 新增
- `export/pdf.go` 新增
- `main.go` 更新（匯出選單）

## 驗收標準

- [x] 可匯出為 HTML
- [x] 可匯出為 PDF
- [x] HTML 內嵌完整 CSS
- [x] PDF 保持原樣式
- [x] 檔名建議正確
- [x] 匯出選單正常運作

---

*建立時間：2026-04-24 by 寶寶*
