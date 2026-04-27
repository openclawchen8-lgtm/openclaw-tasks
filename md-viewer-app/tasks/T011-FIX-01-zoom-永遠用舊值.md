---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/98
title: "[T011-FIX-01] 修復 zoomIn/zoomOut 永遠用舊值"
type: subtask
status: done
assignee: gemini-3-flash-preview
done_time: 2026-04-27
parent: T011
created: 2026-04-25
updated: 2026-04-27
---

## 目標

修復三個導致 zoom 狀態錯誤的問題：function 缺失、命名不一致、zoom 在 loadFile 後丟失。

## 問題描述

1. `window.applyZoomLevel` 從未定義 → `loadFile` 後 zoom 永遠 reset 到 1.0
2. `window._setZoomLevel` 名稱錯誤 → 應為 `window.saveZoomLevel`（Go bind 的名稱）→ zoom 變化從未持久化
3. `window._savedZoom` 在 `SetHtml` 前設定，但 `SetHtml` 重建頁面後丟失 → 無法跨 reload 保留 zoom

## 修改檔案

### `main.go` JS 區段

#### 修正 1：新增 `applyZoomLevel` function

在 IIFE 內新增（`zoomReset` 之後）：

```js
function applyZoomLevel(level) { applyZoom(level); }
window.applyZoomLevel = applyZoomLevel;
```

#### 修正 2：修正 `applyZoom` 內的持久化呼叫

```js
// 修正前
if (window._setZoomLevel) window._setZoomLevel(level);
// 修正後
if (window.saveZoomLevel) window.saveZoomLevel(level);
```

#### 修正 3：移除 `_savedZoom` 機制，改用 `window.mdConfig.zoomLevel`

Go `loadFile()` 中的 `_savedZoom` 邏輯無效（`SetHtml` 重建頁面），移除之。改為：
- `applyZoomLevel` 同步呼叫 `saveZoomLevel` 持久化
- `SetHtml` 後靠 `getConfigJS()` 注入 `window.mdConfig.zoomLevel`，再呼叫 `applyZoomLevel` 還原

修正 Go `loadFile()`：

```go
func loadFile(path string) {
    data, err := os.ReadFile(path)
    if err != nil {
        if currentWV != nil {
            currentWV.SetHtml(renderError("Cannot read: " + err.Error()))
            currentWV.Eval(getConfigJS())
            currentWV.Eval("if(window.mdConfig && window.mdConfig.zoomLevel) window.applyZoomLevel && window.applyZoomLevel(window.mdConfig.zoomLevel)")
        }
        return
    }
    currentFile = path
    if currentWV != nil {
        currentWV.SetTitle(filepath.Base(path) + " - md-viewer")
        currentWV.SetHtml(renderMD(string(data)))
        currentWV.Eval(getConfigJS())
        // zoomLevel 已在 IIFE init 時透過 window.mdConfig 還原
    }
}
```

同步修正 `loadFileContent` bind、error 路徑。

## 驗收標準

- [x] ⌘+ / ⌘- 正確遞增遞減（讀取 config zoomSensitivity）
- [x] 切換檔案後 zoom 保持當前比例
- [x] 關閉重開 app 後 zoom 保持上次比例
- [x] 設定面板的縮放靈敏度改後立即生效

---

*建立時間：2026-04-25 by 寶寶*
