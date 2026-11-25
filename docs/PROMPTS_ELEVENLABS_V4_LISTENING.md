# ElevenLabs v4 リスニング音源生成プロンプト＆放送台本集（マナトビ 高校入試）

公立高校入試の英語リスニング（大問1・配点20〜33%前後）の本番音源を **ElevenLabs v4（`elevenlabs/v4-tts`）** で高品質・自然な対話間合い（ポーズ・抑揚・放送速度 約115〜130 wpm）のまま生成するための**専用マルチスピーカー台本＆設定テンプレート集**です。

---

## 1. ElevenLabs v4 推奨設定（公立高校入試標準スピード・明瞭発音）

| 項目 | 推奨設定値 | 理由・ポイント |
| :--- | :--- | :--- |
| **モデル** | `elevenlabs/v4-tts`（Eleven v4 Multilingual / Dialogue） | `Speaker 1:` / `Speaker 2:` の複数話者掛け合いと `[calm]` `[thoughtful]` 等のインライン表現制御にネイティブ対応 |
| **推奨ボイスペア** | **Speaker 1 (Male student / Teacher)**: 北米標準英語の明瞭な男性声（例: *Liam* / *Josh* 系）<br/>**Speaker 2 (Female student / ALT)**: 北米標準英語の明るい女性声（例: *Rachel* / *Jessica* 系） | 公立入試で最も標準的な北米クリア発音・声質差がはっきりして聞き分けやすい組み合わせ |
| **話す速さ (Pace)** | `0.90x 〜 0.95x`（約 120 wpm） | 都立・大阪府立・神奈川県立・三重県立などの本番リスニング放送速度（115〜130 wpm）に一致 |
| **間合い（ポーズ）** | 文間は句点＋改行、設問前のチャイム・シンキングタイムは `...` または別トラック結合で **5秒〜10秒** 確保 | 1回読み県（埼玉・千葉の一部・大阪C問題等）と2回読み県の両方に対応可能 |
| **注意事項** | キャラ名を読ませないよう `Speaker 1:` / `Speaker 2:` 形式を守る（ElevenLabs v4 マルチスピーカー仕様） | 都道府県別に「2回繰り返し」を作る場合は音声編集または同一ブロックを2回連結するだけでOK |

---

## 2. 【第1部：対話応答・場所と時刻の変更（全国最頻出パターン）】

### ElevenLabs v4 生成用クエリ（そのままコピーして使用）
```text
Speaker 1: [polite, clear pace] Excuse me, Ms. Green. Will the science club meet in the first science lab after school today?
Speaker 2: [friendly, slightly apologetic] Oh, hi Ken. Actually, the third-year students are using that lab until four thirty today, so we moved our meeting to the library on the second floor.
Speaker 1: [understanding] I see! Should I bring my tablet and notebook?
Speaker 2: [encouraging] Yes, please. Question: Where will the science club meet after school today?
```

- **Voice Requirements 指定文**:
  `Clear North American English for a Japanese junior high school entrance exam listening test, moderate pace around 120 words per minute, crisp articulation of numbers and place names. Speaker 1 is a polite teenage boy; Speaker 2 is a warm female English teacher.`
- **正解**: `In the library on the second floor.`（最初の `first science lab` に飛びつかず `Actually, ... moved our meeting to ~` を聞き取る問題）

---

## 3. 【第2部：数値・待ち合わせ時刻の逆算（時刻計算トラップ）】

### ElevenLabs v4 生成用クエリ
```text
Speaker 1: [casual, clear pace] Yuki, how will we get to the city art museum tomorrow morning? Should we take a bus?
Speaker 2: [thoughtful, moderate pace] Well, the bus stops right in front of the museum, but it takes forty minutes because the roads are crowded on Saturdays. If we take the nine-ten train, it takes only fifteen minutes.
Speaker 1: [brightly] Great, let's take the train then! Let's meet at the station ticket gate ten minutes before the train leaves.
Speaker 2: [cheerful] Sounds good! Don't be late. Question: What time will they meet at the station ticket gate tomorrow?
```

- **正解**: `At 9:00.`（`nine-ten train`＝9:10発の `ten minutes before`＝10分前なので **9:00**）

---

## 4. 【第3部：買い物・割引計算リスニング（金額比較パターン）】

### ElevenLabs v4 生成用クエリ
```text
Speaker 1: [friendly, store clerk tone] Welcome to Green Stationary Shop. Can I help you?
Speaker 2: [polite teenage girl] Yes, I'm looking for a birthday present for my younger brother. How much is this blue notebook?
Speaker 1: [clear, deliberate pace on numbers] That notebook is four hundred yen, and these color pens are three hundred yen a set. Today, if you buy both of them together, you can get a one-hundred-yen discount.
Speaker 2: [happy] Oh, really? Then I'll take one blue notebook and one set of color pens, please. Question: How much will the girl pay in total?
```

- **正解**: `600 yen.`（$400 + 300 - 100 = 600$ 円）

---

## 5. 【第4部：生徒会アンケート・グラフ読み取り対話（思考力・図表連携）】

### ElevenLabs v4 生成用クエリ
```text
Speaker 1: [calm, analytical pace] Look at the results of our student council survey, Miki. We asked two hundred students what they want for our school festival.
Speaker 2: [interested] Let's see. Forty-five percent of the students chose a music concert in the gym. That's the highest!
Speaker 1: [clear pace] Yes, and twenty-eight percent chose an international food booth. Making a class movie came in third at seventeen percent.
Speaker 2: [enthusiastic] Why don't we propose the top two ideas to the principal this Friday? Question: Which idea got twenty-eight percent in the survey?
```

- **正解**: `An international food booth.`

---

## 6. 【第5部：ALTの先生によるスピーチ独白（モノローグ＋内容一致2問・上位校/C問題対応）】

### ElevenLabs v4 生成用クエリ（シングルスピーカー・スピーチ形式）
```text
Speaker 1: [warm, clear announcements tone, slightly slower pace around 115 wpm] Hello, everyone. Next Tuesday, our sister school students from Australia will visit our school for the first time in three years. In the morning, they will join your English and music classes. During lunch break, please bring your lunch boxes to the school courtyard so we can eat together under the cherry trees. However, if it rains on Tuesday morning, we will eat lunch in the gymnasium instead. In the afternoon, three students from each grade will introduce famous places and traditional foods in our city using slides. If you want to help guide our guests from the station at eight twenty in the morning, please tell Ms. Sato in the teachers' room by this Thursday. Thank you.
```

- **Voice Requirements 指定文**:
  `Single female native English speaker (ALT teacher in Japan), warm and articulate announcement style at 115-120 wpm, natural pauses between sentences for junior high school EFL listeners.`
- **設問例1**: `Where will the students eat lunch if it rains on Tuesday morning?` → **正解**: `In the gymnasium.`
- **設問例2**: `When should students tell Ms. Sato if they want to help guide the guests?` → **正解**: `By this Thursday.`

---

## 7. 【第6部：英語で自分の意見を書く「リスニング＋英作文融合型」（千葉・神奈川・三重・大阪C対策）】

### ElevenLabs v4 生成用クエリ
```text
Speaker 1: [clear, friendly teacher tone] Now, listen to Tom's opinion and write your own answer in English in twenty-five to thirty-five words. Hi, I'm Tom. In my school, some students say we should study with tablets, and others say paper textbooks are better. I prefer paper textbooks because I can write notes easily and my eyes don't get tired. Question: Which do you prefer, studying with tablets or studying with paper textbooks, and why?
```

- **模範英作文解答例（31語）**:
  `I prefer studying with tablets. First, we do not have to carry heavy books every day. Second, we can watch videos and listen to English sounds easily at home.`
