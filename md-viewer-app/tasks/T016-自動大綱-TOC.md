---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/100
title: "[T016] 自動大綱 TOC"
status: skip
type: Feature
assignee: —
created: 2026-04-24
updated: 2026-04-28
---

# T016 - 自動大綱 TOC

- **Status**: skip
- **Type**: Feature
- **Assignee**: —
- **Created**: 2026-04-24
- **Updated**: 2026-04-28

## 目標（原始）

解析 H1-H6 標題層級，生成遞迴大綱列表，點擊項目後平滑捲動到對應位置。

## 判定：Skip

md-viewer-webview 從未實作 TOC。Swift-markdown 輸出的 HTML 無內建錨點 ID，側邊大綱 UI 也從未建立。

### 實作缺口
- ❌ 無 TOC 解析邏輯（Go 端或 JS 端皆無）
- ❌ 無 HTML 錨點 ID 生成
- ❌ 無側邊大綱 UI

### 若日後要實作
1. Go 端：解析 Markdown 標題，生成 TOC JSON，注入 JS
2. Swift-markdown 自定義 Renderer：給標題加上 `id` 屬性
3. WebView JS：渲染 TOC 側邊欄 + `scrollIntoView()` 跳轉
4. 可設定開關（config.json 新增 `showTOC` 欄位）
