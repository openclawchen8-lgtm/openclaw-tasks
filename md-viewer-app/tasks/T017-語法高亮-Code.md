# T017 - 語法高亮 Code

- **Status**: done
- **Type**: Development
- **Assignee**: gemini-3-flash-preview
- **Created**: 2026-04-24
- **Completed**: 2026-04-28
- **Updated**: 2026-04-28（review 更新）

## 目標

整合 highlight.js 為程式碼區塊提供語法高亮，並加上「一鍵複製」按鈕。

## 實際實作

### highlight.js CDN（main.go htmlTemplate）
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css" id="hljsLight">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css" id="hljsDark" disabled>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
```

### 主題同步
- light 模式 → `github.min.css` 啟用
- dark/sepia/solarized/nord 模式 → `github-dark.min.css` 啟用
- 主題切換時 JS 同步切換高亮樣式

### 一鍵複製按鈕（JS initCodeBlocks）
```javascript
window.initCodeBlocks = function() {
  document.querySelectorAll('pre').forEach(function(pre) {
    var btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.onclick = function() {
      navigator.clipboard.writeText(code.textContent).then(function() {
        btn.classList.add('copied');
        btn.innerText = 'Copied!';
        setTimeout(function() { /* reset */ }, 2000);
      });
    };
    pre.appendChild(btn);
  });
};
```

### 行號顯示（JS applyLineNumbers）
- 設定面板可開關「顯示行號」
- 開啟時 `<code>` 改為 CSS Grid 佈局（行號 + 內容分欄）
- 行號本身無語法高亮，純視覺輔助

### 驗收條件（達成）
- [x] 程式碼區塊有語法高亮（190+ 語言）
- [x] 深色/淺色模式高亮主題正確切換
- [x] 右上角有複製按鈕（hover 時顯示）
- [x] 點擊複製成功顯示「Copied!」回饋
- [x] 行號顯示功能正常（設定面板開關）

---

github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/101

*任務完成：gemini-3-flash-preview | 2026-04-28（review 更新）*