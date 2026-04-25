---
github_issue: https://github.com/openclawchen8-lgtm/openclaw-tasks/issues/95
title: "[T011-F] Settings Panel UI"
type: subtask
status: pending
assignee: 碼農2號
parent: T011
created: 2026-04-25
updated: 2026-04-25
depends: [T011-C, T011-D]
---

## 目標

在 WebView 內建立 Settings Panel UI（HTML overlay + range slider）。

## 修改的檔案

### `main.go`（htmlTemplate + JS）
- Settings overlay HTML（半透明遮罩 + 設定面板）
- `showSettingsPanel()` / `hideSettingsPanel()`
- Range slider：1-3（低/中/高），對應 step 值
- Theme selector：auto / light / dark
- 關閉按鈕（×）
- 透過 `window.saveConfig(key, value)` binding 儲存

### CSS
- 設定面板置中，半徑 12px，陰影
- 滑桿用 `--color-accent-fg`
- 響應式寬度（max 400px）

## 驗收標準
- [ ] 設定面板有視覺美感（與 app 主題一致）
- [ ] 滑桿可正常拖動
- [ ] 關閉按鈕（×）可關閉面板
- [ ] ESC 鍵可關閉面板

---

*建立時間：2026-04-25 by 寶寶*
