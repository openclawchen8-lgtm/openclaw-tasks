---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/101
title: 語法高亮 (Code)
status: done
assignee: gemini-3-flash-preview
created: 2026-04-24
updated: 2026-04-28
depends: [T006]
---

## 目標

整合 Prism.js 或 highlight.js，為程式碼區塊提供語法高亮，並加上「一鍵複製」按鈕。

## 功能規格 (Technical Specs)

### 核心需求
1. **語法高亮**：支援 Swift, Python, JSON, JavaScript, Go, Rust 等常用語言
2. **一鍵複製**：程式碼區塊右上角顯示複製按鈕
3. **行號顯示**：可選擇顯示行號
4. **主題整合**：高亮主題與文件主題一致

### 技術實作

**方案 A：highlight.js（推薦）**
- 載入 highlight.js CDN 或本地 bundle
- 自動偵測語言
- 支援 190+ 語言
- 檔案較大（~500KB）

**方案 B：Prism.js**
- 載入 Prism.js CDN
- 需手動指定語言
- 輕量（~20KB core）
- 支援外掛擴展

**方案 C：Chroma（Go 原生）**
- 使用 `github.com/alecthomas/chroma`
- 純 Go 實作，無需 JS
- 效能佳
- 輸出 HTML 或 CSS class

### 推薦方案

**使用方案 A**（highlight.js）：

```html
<!-- template.html -->
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
```

**一鍵複製按鈕**：
```javascript
// 為每個 code block 加上複製按鈕
document.querySelectorAll('pre code').forEach((block) => {
    const button = document.createElement('button');
    button.textContent = '📋';
    button.onclick = () => {
        navigator.clipboard.writeText(block.textContent);
        button.textContent = '✅';
        setTimeout(() => button.textContent = '📋', 1000);
    };
    block.parentElement.appendChild(button);
});
```

## 使用說明 (User Guide)

程式碼區塊會自動著色，並在右上角顯示「一鍵複製」按鈕，方便快速提取程式碼。

## 子任務

### T017-A — highlight.js 整合
- 載入 highlight.js（CDN 或本地）
- 設定高亮主題
- 呼叫 `hljs.highlightAll()`

### T017-B — 語言支援優化
- 確認 Swift, Python, JSON, JavaScript, Go, Rust 支援
- 測試各語言高亮效果
- 處理未知語言情況

### T017-C — 一鍵複製按鈕
- 為每個 code block 加上複製按鈕
- 複製成功顯示回饋
- 按鈕樣式整合

### T017-D — 行號顯示（可選）
- 支援顯示行號
- 可在設定中開關
- 樣式整合

### T017-E — 主題整合
- 深色主題使用深色高亮主題
- 淺色主題使用淺色高亮主題
- 主題切換時同步更新

## 產出

- `assets/template.html` 更新（highlight.js 載入）
- `assets/markdown.css` 更新（code block 樣式）
- `assets/js/copy-button.js` 新增（複製按鈕邏輯）

## 驗收標準

- [x] 程式碼區塊有語法高亮
- [x] 支援 Swift, Python, JSON, JavaScript, Go, Rust
- [x] 右上角有複製按鈕
- [x] 點擊複製按鈕可複製程式碼
- [x] 深色/淺色主題高亮樣式正確

---

*建立時間：2026-04-24 by 寶寶*
