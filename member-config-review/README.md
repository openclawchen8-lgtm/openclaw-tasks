# Member Config Review｜成員設定檔全面 Review

## 目標
對所有 7 位成員的配置檔（AGENTS.md、SOUL.md、IDENTITY.md、TOOLS.md、HEARTBEAT.md、BOOTSTRAP.md、USER.md、MEMORY.md）進行全面 review，產出修改建議，並輸出乾淨版設定檔至 `/Users/clawq/claw-conf/` 各成員目錄。

## 產出目錄結構
```
/Users/clawq/claw-conf/
├── workspace/           → 寶寶（main）
├── workspace-ann/       → 安安（agent-ann）
├── workspace-coder1/    → 碼農1號（agent-f937014d）
├── workspace-coder2/    → 碼農2號（agent-coder2）
├── workspace-lele/      → 樂樂（agent-lele）
├── workspace-researcher/ → 研研（agent-researcher）
└── workspace-zhuzhu/   → 豬豬（agent-zhuzhu）
```

## 每次 Review 須檢查的檔案（共 8 個）
1. `AGENTS.md` — 工作空間說明、對話規則
2. `SOUL.md` — 人格、經歷、擅長領域
3. `IDENTITY.md` — 名稱、角色、vibe、emoji
4. `TOOLS.md` — 工具設定（TTS、Whisper、其他）
5. `HEARTBEAT.md` — 心跳檢查清單
6. `BOOTSTRAP.md` — 首次啟動引導
7. `USER.md` — 服務對象資訊
8. `MEMORY.md` — 長期記憶

## 審查維度
- 格式一致性（frontmatter、標題層級、編碼）
- 內容完整性（必要欄位是否都有）
- 角色定位清晰度（與其他成員是否有重疊或衝突）
- 資訊過時與否（時間戳、版本號是否正確）
- 安全考量（是否有不該出現在 workspace 的敏感資訊）

## 任務清單

| # | 任務 | 負責 | 狀態 |
|---|------|------|------|
| T001 | Review 寶寶（main）設定檔 → 輸出修改版至 `/claw-conf/workspace/` | 寶寶 | ✅ done |
| T002 | Review 安安（agent-ann）設定檔 → 輸出修改版至 `/claw-conf/workspace-ann/` | 寶寶 | ✅ done |
| T003 | Review 碼農1號（agent-f937014d）設定檔 → 輸出修改版至 `/claw-conf/workspace-coder1/` | 寶寶 | ✅ done |
| T004 | Review 碼農2號（agent-coder2）設定檔 → 輸出修改版至 `/claw-conf/workspace-coder2/` | 寶寶 | ✅ done |
| T005 | Review 樂樂（agent-lele）設定檔 → 輸出修改版至 `/claw-conf/workspace-lele/` | 寶寶 | ✅ done |
| T006 | Review 研研（agent-researcher）設定檔 → 輸出修改版至 `/claw-conf/workspace-researcher/` | 寶寶 | ✅ done |
| T007 | Review 豬豬（agent-zhuzhu）設定檔 → 輸出修改版至 `/claw-conf/workspace-zhuzhu/`（全部標記停用） | 寶寶 | ✅ done |

## 最新進度

### 2026-04-19
- 專案建立，T001-T007 拆分完成
- 尚未開始執行 review
