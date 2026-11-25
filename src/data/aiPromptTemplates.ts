export interface AiPromptTemplate {
  id: string;
  kind: 'chatgpt_figure' | 'elevenlabs_v4';
  subjectTag: string;
  title: string;
  targetUse: string;
  settingsNote: string;
  prompt: string;
  answerOrCheck?: string;
}

export const AI_PROMPT_TEMPLATES: readonly AiPromptTemplate[] = [
  // === ChatGPT 図版・グラフ生成プロンプト ===
  {
    id: 'fig_math_parabola',
    kind: 'chatgpt_figure',
    subjectTag: '数学｜関数y=ax²',
    title: '放物線 y=(1/2)x² と直線AB・△OAB面積二等分線の厳密作図',
    targetUse: 'ChatGPT（Python作図実行）で文字化けゼロ・300dpi印刷用PNGを出力',
    settingsNote: 'ChatGPTにそのまま貼り付けると Python (matplotlib) が自動実行され、数値ズレ・文字化けゼロのPNGが出力されます。',
    prompt: `あなたは日本の公立高校入試の数学図版デザイナーです。Python (matplotlib) を実行して、白背景・黒線ベース（アクセントは濃紺 #1E40AF と赤 #DC2626 のみ）の印刷用高解像度PNG（300dpi, 1200x900px）を生成し、ダウンロードリンクを出してください。

【作図仕様】
1. 座標軸: x軸 (-4.5 〜 5.5), y軸 (-1.5 〜 10.5)、原点 O にラベル "O"、軸端に矢印と "x", "y"（斜体セリフ体）を描画。目盛り線は入れない。
2. 放物線: y = (1/2)x^2 を滑らかな濃紺実線（太さ2.4pt）で描き、右上に "y = (1/2)x²" と表記。
3. 直線AB: y = x + 4 を黒実線（太さ1.8pt）で描き、交点 A(-2, 2), B(4, 8)、y切片 C(0, 4) に黒丸ドットとラベル "A(-2, 2)", "B(4, 8)", "C(0, 4)" を重ならない外側に配置。
4. △OAB の内部を薄い水色 (#DBEAFE, alpha=0.55) で塗る。
5. 原点Oを通り△OABの面積を二等分する直線（ABの中点 M(1, 5) を通る y = 5x）を赤破線で描き、点 M(1, 5) を赤丸で示す。`,
    answerOrCheck: '交点直線 y = a(p+q)x - apq ⇒ y = x + 4 ／ △OAB = 12 ／ 二等分線 y = 5x',
  },
  {
    id: 'fig_math_circle_sim',
    kind: 'chatgpt_figure',
    subjectTag: '数学｜平面図形',
    title: '円周角の定理・直径ABと接線・相似証明用のSVGベクター作図',
    targetUse: 'ChatGPTに単体SVGコードを出力させ、そのままWeb/PDFに埋め込み可能',
    settingsNote: '三角関数で円周上の点を厳密計算させる指定が入っているため、角度や接線が狂いません。',
    prompt: `日本の公立高校入試（数学・大問4平面図形）に掲載するクリーンな白黒ベクター図を単体 SVG コードで出力してください（viewBox="0 0 520 420"、白背景 #FFFFFF、主線 #0F172A）。

【幾何条件（座標を三角関数で厳密計算して配置すること）】
- 中心 O(260, 210), 半径 R = 150 の円を描く。
- 直径 AB を水平に引く: A(110, 210), B(410, 210)、中心 O に黒点とラベル "O"。
- 円周上の点 C を角度 125° 付近、点 D を角度 50° 付近にとり、弦 AC, BC, AD, BD, CD を結ぶ（∠ACB = 90° の直角マークを点Cに描く）。
- 点 B における円の接線 l を垂直に引き、直線 AC の延長と接線 l の交点を E とする。
- 頂点ラベル A, B, C, D, E, O は線と重ならない外側に Times New Roman Italic 20px で配置すること。`,
    answerOrCheck: '△ABC ∽ △AEB（∠ACB = ∠ABE = 90°, ∠BAC共通）の証明問題に直結',
  },
  {
    id: 'fig_math_boxplot',
    kind: 'chatgpt_figure',
    subjectTag: '数学｜データの活用',
    title: '3クラスの箱ひげ図（四分位範囲・中央値・平均値＋印）比較図',
    targetUse: '箱ひげ図の正誤判定問題用・高解像度PNG生成',
    settingsNote: '英語・数字ラベル限定指定により日本語フォント欠けを防止します。',
    prompt: `公立高校入試「データの活用（箱ひげ図の正誤判定）」問題用の図を Python (matplotlib) で出力してください（1200x720px, 300dpi, 白背景）。
- Group A: min 4, Q1 8, median 11, Q3 15, max 19 (mean 11.4 を "+" で表示)
- Group B: min 6, Q1 9, median 13, Q3 16, max 18 (mean 12.6 を "+" で表示)
- Group C: min 3, Q1 7, median 12, Q3 14, max 20 (mean 11.2 を "+" で表示)
横軸は 0〜20（1点刻みの薄い縦破線、5点ごとに実線）、箱は白塗り黒枠（1.8pt）で印刷向けに描画してください。`,
  },
  {
    id: 'fig_sci_photosynthesis',
    kind: 'chatgpt_figure',
    subjectTag: '理科｜生物実験',
    title: '光合成と呼吸の対照実験（試験管A〜D・オオカナダモ・アルミ箔）線画',
    targetUse: 'GPT Image（画像生成）で教科書風モノクロ実験イラストを生成',
    settingsNote: '画像内に不要な文字を出させないため "labeled ONLY A, B, C, D" と指定しています。',
    prompt: `Create a clean, black-and-white Japanese junior high school science exam diagram on a pure white background (#FFFFFF), flat vector textbook line-art style, NO text gibberish.
Four identical glass test tubes standing in a rack, labeled ONLY with bold capital letters "A", "B", "C", "D" below each tube:
- Tube A: liquid + green aquatic plant submerged, rubber stopper, exposed to light.
- Tube B: liquid + green aquatic plant submerged, rubber stopper, wrapped in aluminum foil shading cover.
- Tube C: liquid only (no plant), rubber stopper, exposed to light.
- Tube D: liquid only (no plant), wrapped in aluminum foil.
Crisp uniform black outlines, suitable for A4 monochrome exam printing. No other text.`,
    answerOrCheck: 'BTB溶液（緑色スタート）：A＝青色、B＝黄色、C・D＝緑色のまま（対照実験）',
  },
  {
    id: 'fig_sci_ions',
    kind: 'chatgpt_figure',
    subjectTag: '理科｜化学イオン',
    title: '中和反応（HCl＋NaOH）の4種イオン数変化ミニグラフ①〜④',
    targetUse: 'ChatGPT（Python作図）でイオン数グラフ4択図版を一発生成',
    settingsNote: '中和点 10cm³ を境に折れ曲がる H+ / OH- と直線変化の Cl- / Na+ を正確に描画します。',
    prompt: `中学3年理科「酸・アルカリとイオン」の入試図版として、一定量の塩酸に水酸化ナトリウム水溶液を 0〜20 cm³ 加えたときの4種類のイオンの個数変化を表す横1列4枚のミニ折れ線グラフ (1)〜(4) を Python (matplotlib) で 1400x420px PNG として作成してください（中和点＝10 cm³）。
- (1): 最初から最後まで一定（水平線＝Cl-）
- (2): 10 cm³ まで直線減少し以降は 0（H+）
- (3): 原点から右肩上がりに直線増加（Na+）
- (4): 10 cm³ まで 0 で、10 cm³ から右肩上がりに直線増加（OH-）
ラベルは英語と数字のみ（Volume [cm³], Ions, (1)..(4)）で文字化けゼロにしてください。`,
  },
  {
    id: 'fig_soc_hythergraph',
    kind: 'chatgpt_figure',
    subjectTag: '社会｜地理雨温図',
    title: '日本の4気候区（日本海側・瀬戸内・中央高地・太平洋側）雨温図4枚比較',
    targetUse: 'ChatGPT（Python作図）で入試本番そのままの雨温図4枚セットを生成',
    settingsNote: '都市名を City A〜D に伏せて出力するため、そのまま4択判別問題に使えます。',
    prompt: `公立高校入試（社会・地理）の雨温図判別問題用に、都市名を伏せた "City A"〜"City D" の4つの雨温図を横1列（1600x480px, 300dpi, 白背景）で Python (matplotlib) により描画してください。左軸＝気温(-10〜35°C, 赤折れ線)、右軸＝降水量(0〜400mm, 青棒グラフ)、上部に年平均気温と年降水量を記載。
- City A (日本海側): 12〜2月の降水量が280mm前後と突出。15.0°C, 2400mm
- City B (瀬戸内): 年中少雨。16.5°C, 1080mm
- City C (中央高地): 冬の気温が氷点下近く年較差大・少雨。12.2°C, 1050mm
- City D (太平洋側): 6〜9月に多雨、冬は乾燥。16.8°C, 2350mm`,
  },
  {
    id: 'fig_eng_listening_panels',
    kind: 'chatgpt_figure',
    subjectTag: '英語｜リスニング絵4択',
    title: '英語リスニング第1問用・場面イラスト4コマ（A〜D）モノクロ線画',
    targetUse: 'GPT Image で公立入試大問1そっくりの白黒ペン画4択パネルを生成',
    settingsNote: '吹き出し・英語テキスト禁止指定により、純粋なイラスト選択肢になります。',
    prompt: `Create a 2x2 grid of four clean black-and-white line-art illustrations labeled ONLY "A", "B", "C", "D" in the top-left corner of each panel, pure white background, Japanese public high school English listening exam style:
- Panel A: A boy and a girl studying together at a library table with books and a tablet.
- Panel B: A boy playing soccer on a school field while a girl watches from a bench.
- Panel C: A boy and a girl cooking curry together in a home economics classroom.
- Panel D: A boy buying a train ticket at a station ticket machine while a girl holds an umbrella.
Simple textbook pen-and-ink outlines, zero speech bubbles, zero extra text.`,
  },

  // === ElevenLabs v4 リスニング音源生成プロンプト ===
  {
    id: 'el_v4_place_change',
    kind: 'elevenlabs_v4',
    subjectTag: 'ElevenLabs v4｜対話①',
    title: '【場所変更トラップ】科学部の放課後ミーティング場所（全国最頻出型）',
    targetUse: 'elevenlabs/v4-tts マルチスピーカー対話音源（約120 wpm）',
    settingsNote: '推奨Voice: Speaker 1 = 明瞭な北米男性生徒 (Liam系) / Speaker 2 = 穏やかな女性教師 (Rachel系)・Pace 0.92x',
    prompt: `Speaker 1: [polite, clear pace] Excuse me, Ms. Green. Will the science club meet in the first science lab after school today?
Speaker 2: [friendly, slightly apologetic] Oh, hi Ken. Actually, the third-year students are using that lab until four thirty today, so we moved our meeting to the library on the second floor.
Speaker 1: [understanding] I see! Should I bring my tablet and notebook?
Speaker 2: [encouraging] Yes, please. Question: Where will the science club meet after school today?`,
    answerOrCheck: '正解：In the library on the second floor.（Actually 以下の変更先を聞き取る鉄板問題）',
  },
  {
    id: 'el_v4_time_calc',
    kind: 'elevenlabs_v4',
    subjectTag: 'ElevenLabs v4｜対話②',
    title: '【時刻逆算トラップ】美術館への電車時刻と改札集合時刻（数値計算型）',
    targetUse: 'elevenlabs/v4-tts マルチスピーカー対話音源（数字・時刻強調）',
    settingsNote: '推奨Voice: Speaker 1 = 男子中学生 / Speaker 2 = 女子中学生・Pace 0.92x',
    prompt: `Speaker 1: [casual, clear pace] Yuki, how will we get to the city art museum tomorrow morning? Should we take a bus?
Speaker 2: [thoughtful, moderate pace] Well, the bus stops right in front of the museum, but it takes forty minutes because the roads are crowded on Saturdays. If we take the nine-ten train, it takes only fifteen minutes.
Speaker 1: [brightly] Great, let's take the train then! Let's meet at the station ticket gate ten minutes before the train leaves.
Speaker 2: [cheerful] Sounds good! Don't be late. Question: What time will they meet at the station ticket gate tomorrow?`,
    answerOrCheck: '正解：At 9:00.（9:10発の10分前＝9:00）',
  },
  {
    id: 'el_v4_shopping_discount',
    kind: 'elevenlabs_v4',
    subjectTag: 'ElevenLabs v4｜対話③',
    title: '【買い物・セット割引計算】文房具店での合計支払い金額',
    targetUse: 'elevenlabs/v4-tts マルチスピーカー対話音源（店員＋買い物客）',
    settingsNote: '金額部分を [clear, deliberate pace on numbers] タグで明瞭に発音させます。',
    prompt: `Speaker 1: [friendly, store clerk tone] Welcome to Green Stationary Shop. Can I help you?
Speaker 2: [polite teenage girl] Yes, I'm looking for a birthday present for my younger brother. How much is this blue notebook?
Speaker 1: [clear, deliberate pace on numbers] That notebook is four hundred yen, and these color pens are three hundred yen a set. Today, if you buy both of them together, you can get a one-hundred-yen discount.
Speaker 2: [happy] Oh, really? Then I'll take one blue notebook and one set of color pens, please. Question: How much will the girl pay in total?`,
    answerOrCheck: '正解：600 yen.（400 + 300 - 100 = 600円）',
  },
  {
    id: 'el_v4_alt_monologue',
    kind: 'elevenlabs_v4',
    subjectTag: 'ElevenLabs v4｜独白④',
    title: '【ALTスピーチ独白】オーストラリア姉妹校訪問の案内（条件分岐つき長文）',
    targetUse: 'elevenlabs/v4-tts シングルスピーカー放送（約115 wpm・上位校/C問題対応）',
    settingsNote: '雨天時の場所変更（if it rains -> gymnasium）と締切曜日（by this Thursday）の2問セットに対応。',
    prompt: `Speaker 1: [warm, clear announcements tone, slightly slower pace around 115 wpm] Hello, everyone. Next Tuesday, our sister school students from Australia will visit our school for the first time in three years. In the morning, they will join your English and music classes. During lunch break, please bring your lunch boxes to the school courtyard so we can eat together under the cherry trees. However, if it rains on Tuesday morning, we will eat lunch in the gymnasium instead. In the afternoon, three students from each grade will introduce famous places and traditional foods in our city using slides. If you want to help guide our guests from the station at eight twenty in the morning, please tell Ms. Sato in the teachers' room by this Thursday. Thank you.`,
    answerOrCheck: '設問1（雨天時の昼食場所）：In the gymnasium. ／ 設問2（案内係の申出期限）：By this Thursday.',
  },
  {
    id: 'el_v4_listening_writing',
    kind: 'elevenlabs_v4',
    subjectTag: 'ElevenLabs v4｜英作融合⑤',
    title: '【リスニング＋条件英作文融合】タブレット学習 vs 紙の教科書（意見25〜35語）',
    targetUse: '千葉・神奈川・三重・大阪C問題などの「英語を聞いて英語で書く」融合問題用',
    settingsNote: '放送を1〜2回流したあと、英作文道場と同じ25〜35語タイマーで記述練習させるのに最適です。',
    prompt: `Speaker 1: [clear, friendly teacher tone] Now, listen to Tom's opinion and write your own answer in English in twenty-five to thirty-five words. Hi, I'm Tom. In my school, some students say we should study with tablets, and others say paper textbooks are better. I prefer paper textbooks because I can write notes easily and my eyes don't get tired. Question: Which do you prefer, studying with tablets or studying with paper textbooks, and why?`,
    answerOrCheck: '模範解答例（31語）：I prefer studying with tablets. First, we do not have to carry heavy books every day. Second, we can watch videos and listen to English sounds easily at home.',
  },
];
