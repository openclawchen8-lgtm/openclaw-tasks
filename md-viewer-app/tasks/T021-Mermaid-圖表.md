---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/105
title: "[T021] Mermaid 圖表"
status: skip
type: Feature
assignee: —
created: 2026-04-24
updated: 2026-04-28
---

# T021 - Mermaid 圖表

- **Status**: skip
- **Type**: Feature
- **Assignee**: —
- **Created**: 2026-04-24
- **Updated**: 2026-04-28

## 目標（原始）

整合 mermaid.js，支援在 Markdown 中繪製流程圖、圓餅圖、甘特圖等。

## 判定：Skip

md-viewer-webview 從未整合 mermaid.js。htmlTemplate 中無 mermaid CDN 載入，也無 `mermaid` code block 的特殊處理。

### 若日後要實作

在 main.go htmlTemplate head 中加入：

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>
  mermaid.initialize({ startOnLoad: true, theme: "default" });
</script>
```

Swift-markdown 需將 `mermaid ` code block 加上 `class="mermaid"` 讓 mermaid 自動渲染。
