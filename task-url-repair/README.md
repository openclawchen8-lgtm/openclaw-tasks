# task-url-repair

## 目的
修補本地 task 檔案缺少 GitHub Issue URL 的問題，確保 `sync_issues_cron.py` 能正常同步狀態。

## 背景
2026-04-20 除錯 `sync_issues_cron.py` 時發現：本地 task 標記 done/skip，但對應 GitHub Issue 未自動關閉。
根本原因是 task 檔案內容中沒有 GitHub Issue URL（URL 只寫在 GitHub Issue 上，未同步回本地檔）。

## 修復記錄

### ✅ 已完成
- session-logger-plugin: T002→#21, T003→#22, T004→#23
- gold-analysis-improve: T001→#33, T002→#34, T003→#47, T004→#48, T005→#49, T006→#50
- gold-monitor-issue: T001→#28, T002→#29, T003→#30, T004→#31
- openclaw: T001→#6, T003→#8, T004→#9, T005→#10, T006→#11
- openclaw-scrum: T003→#38
- read: T001→#45, T002→#46
- working-issue: T001→#43, T002→#44
- github-data-review: T001→#1, T007→#18（新建 stub）

### 📌 預防機制
1. **task template 更新** — 新建 task 時 frontmatter 內建 `github:` 欄位（ideas2tasks template 已修改）
2. **sync_issues_cron.py 內嵌 URL 預警** — `--check-url-missing` 模式，URL 漏填時主動通知
3. 建議新建 task 後即填入 GitHub Issue URL

## 腳本修正
- `state_sync.py` — `read_task_status()` 現在會去除 `#` 行內註解再比對 status 值
- `sync_issues_cron.py` — done/skip 但找不到 Issue URL 的 task 會列進通知

## Status
T001（對照表）完成，此專案關閉。
