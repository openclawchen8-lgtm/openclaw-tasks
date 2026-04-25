---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/95
title: "[T011-G] Zoom step 動態套用"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
depends: [T011-F]
---

## 目標

讓 JS zoom step 讀取 `window.config.zoomSensitivity` 動態生效。

## 修改的檔案

### `main.go`
- 啟動時：`wv.Eval("applyZoomSensitivity(config.zoomSensitivity)")`
- `loadConfig` 回傳 JSON 注入 JS：`window.config = {zoomSensitivity: X, theme: Y}`

### `main.go`（JS 部分）
```javascript
var step = 0.1; // default
window.applyZoomSensitivity = function(level) {
    step = [0, 0.05, 0.1, 0.2][level] || 0.1;
};
// 初始化時套用
window.applyZoomSensitivity(window.config && window.config.zoomSensitivity || 2);
```

## Zoom Sensitivity 等級對照

| 等級 | 名稱 | step |
|------|------|------|
| 1 | 低 | 0.05 |
| 2 | 中（預設） | 0.10 |
| 3 | 高 | 0.20 |

## 驗收標準
- [ ] 縮放靈敏度設定後立即生效
- [ ] ⌘+ / ⌘- 行為符合設定等級
- [ ] 重開 app 後等級保留

---

*建立時間：2026-04-25 by 寶寶*
