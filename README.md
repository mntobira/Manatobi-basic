# マナトビ 高校入試（mntb-juken）

中学3年分の5教科を、1単元4問ずつスキマ時間に解いて積み上げる高校入試対策アプリ。
「マナトビ英検」「マナトビリスニング」と同じUI（デザイントークン・カード・丸ゴシック・44pxタップ領域）を引き継いでいます。

## できること

- **5教科 × 5単元 × 4問 = 100問**（英語・数学・国語・理科・社会）
- 全問に **解説** と **要点**（間違えた理由がその場で分かる）
- **今日のゴール**（既定12問）と達成度バー
- **れんぞく日数**（学習した日が続くとカウント）／直近7日グラフ
- **教科別の正答率**と単元ごとの進捗
- **まちがえた問題をもう一度**（誤答だけを単元横断で復習／正解すると自動で外れる）
- キーボード操作（`1`〜`4` または `a`〜`d` で回答、`Enter`/`→` で次へ）
- 学習履歴はブラウザ内（localStorage）に保存。ログイン不要・通信は問題取得のみ

## 画面とURL

| 画面 | ハッシュ | 内容 |
| --- | --- | --- |
| タイトル | `#/` | 起動画面。ホームへ |
| ホーム | `#/home` | 今日のゴール・5教科カード・復習導線 |
| 単元一覧 | `#/subject/:key` | 例 `#/subject/math`。単元ごとの進捗 |
| 演習 | `#/unit/:unitId` | 例 `#/unit/english-3`。4問を1問ずつ |
| 結果 | `#/result` | 正答数・かかった時間・解説の振り返り |
| きろく | `#/record` | れんぞく日数・7日グラフ・教科別・苦手単元 |
| せってい | `#/settings` | ニックネーム・1日の目標問題数・記録リセット |

`:key` は `english` / `math` / `japanese` / `science` / `social`。
`:unitId` は `english-1` 〜 `social-5`。

### API

| メソッド | パス | 返すもの |
| --- | --- | --- |
| GET | `/api/health` | 稼働確認と件数 |
| GET | `/api/catalog` | 軽量インデックス（問題文を含まない一覧＋進捗計算用の件数） |
| GET | `/api/subjects/:key` | 1教科の単元一覧 |
| GET | `/api/units?subject=:key` | 教科で絞った単元一覧 |
| GET | `/api/units/:unitId` | 単元の全問題（本文・選択肢・正解・解説・要点） |

一覧系は問題文を返さず、単元を開いたときだけ `/api/units/:unitId` を取得する**軽量インデックス方式**です。

## データ構造

```ts
Question { id, prompt, passage?, choices[4], answer(index), explanation, point?, level(1|2|3) }
Unit     { id, subject, name, grade, description, questions[] }
Subject  { key, name, en, tone, tagline, units[] }
```

- 問題データは `src/data/{english,math,japanese,science,social}.ts` の静的データ（DBなし）
- 学習履歴は端末内のみ：`mntb-juken:progress:v1` / `mntb-juken:daily:v1` / `mntb-juken:settings:v1`
- 進捗は `{ ok, tries, last, lastOk }`、日次は `{ answered, ok, sec }`

## 使い方

1. ホームで教科を選ぶ
2. 単元を選び、4問を解く（選ぶとすぐ◯×と解説が出ます）
3. 4問終わると結果画面。まちがえた問題は自動で復習リストへ
4. 「きろく」でれんぞく日数と苦手単元を確認
5. 「せってい」でニックネームと1日の目標を変更

## 開発

```bash
npm run build                  # dist を作成
pm2 start ecosystem.config.cjs # http://localhost:3000
node scripts/validate-data.mjs # 問題データの健全性チェック（件数・id連番・選択肢4個・正解位置の偏り・解説の有無）
```

## これから

- 問題の追加（現状100問 → 各単元8問以上）
- ランダム出題順／制限時間モード
- 誤答の復習を「同じ単元だけ」以外のまとめ方（教科横断の弱点ドリル）
- 記録の書き出し（学習レポート）
- 正解位置の分散（現在1〜2番目に偏り気味）

## 状態

- 技術構成：Hono + Cloudflare Pages（Workers）＋ 依存なしの Vanilla JS SPA
- データ保存：静的データ＋localStorage（D1/R2/KV 未使用）
- ビルド：`dist/_worker.js` 約75KB（gzip 約28KB）
- 最終更新：2026-11-21
