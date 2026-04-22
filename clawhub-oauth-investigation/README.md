# ClawHub OAuth Investigation

## Tasks

| # | Task | Status |
|---|------|--------|
| T001 | Issues 調查報告（10 issues + 3 PRs） | ✅ done |
| T002 | 本地診斷與修復方案 | 🔄 in-progress |

## 摘要

本地問題定位為 **P0（#1717 服務端崩潰）+ Token 失效**的複合問題。
服務端 `/api/auth/signin/github` 回 HTTP 500，無法取得新 token，形成死循環。
