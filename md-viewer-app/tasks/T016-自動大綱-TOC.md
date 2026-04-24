---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/100
title: 自動大綱 (TOC)
status: pending
assignee: 碼農2號
created: 2026-04-24
updated: 2026-04-24
depends: [T006]
---

## 目標

解析 H1-H6 標題層級，生成遞歸大綱列表，點擊項目後平滑捲動到對應位置。

## 功能規格 (Technical Specs)

### 核心需求
1. **標題解析**：解析 Markdown 中的 H1-H6 標題
2. **遞歸結構**：保持標題層級關係（H1 > H2 > H3...）
3. **側邊欄顯示**：在側邊欄顯示大綱
4. **點擊跳轉**：點擊項目 → 平滑捲動到對應位置
5. **即時更新**：檔案變動時自動更新大綱

### 技術實作

**標題解析**：
- 使用 goldmark 的 AST walker
- 或使用正則表達式：`/^#{1,6}\s+(.+)$/m`
- 記錄標題層級、文字、錨點 ID

**遞歸結構**：
```go
type TOCItem struct {
    Level   int        // 1-6
    Text    string     // 標題文字
    ID      string     // HTML 錨點 ID
    Children []TOCItem // 子標題
}
```

**HTML 錨點生成**：
- goldmark 自動生成 `id="user-content-標題"`
- 或手動生成 slug：`標題文字 → 標題文字`

**捲動實作**：
```javascript
// WebView 內
function scrollToHeading(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
```

## 使用說明 (User Guide)

側邊欄自動顯示文件目錄。點擊目錄中的章節名稱，畫面會平滑捲動到對應的內容位置。

## 子任務

### T016-A — 標題解析器
- 建立 `core/toc.go`
- 解析 Markdown 標題
- 生成 TOCItem 結構

### T016-B — 遞歸結構生成
- 將扁平標題列表轉為遞歸樹
- 處理層級跳躍（H1 → H3）

### T016-C — 側邊欄 UI
- 在側邊欄顯示大綱
- 縮排顯示層級關係
- 支援展開/收合

### T016-D — 點擊跳轉
- 點擊項目 → 呼叫 JS `scrollToHeading`
- 平滑捲動效果
- 高亮當前標題

### T016-E — 即時更新
- 檔案變動時重新解析標題
- 更新側邊欄大綱

## 產出

- `core/toc.go` 新增
- `assets/template.html` 更新（側邊欄大綱區）
- `assets/markdown.css` 更新（大綱樣式）
- `main.go` 更新（TOC 整合）

## 驗收標準

- [ ] 側邊欄顯示文件大綱
- [ ] 層級關係正確（縮排）
- [ ] 點擊項目平滑捲動到對應位置
- [ ] 檔案變動時大綱自動更新
- [ ] 支援 H1-H6 所有層級

---

*建立時間：2026-04-24 by 寶寶*
