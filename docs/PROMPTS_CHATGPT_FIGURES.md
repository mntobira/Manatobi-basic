# ChatGPT 図版・グラフ生成プロンプト集（マナトビ 高校入試）

高校入試問題・まとめプリント・予想問題PDFに追加の図版（関数グラフ・平面/空間図形・理科実験装置・雨温図・リスニング選択イラスト等）を作成する際、**ChatGPT（GPT Image / Python Code Interpreter / SVG出力）にそのまま貼り付けて一発で教材品質の図版を出せるプロンプト集**です。

> **文字化けゼロの鉄則**
> - **数式・座標・雨温図・箱ひげ図**は画像生成AIに直接描かせるよりも、ChatGPTに **「Python (matplotlib) または単体SVGコードで厳密な数値で作図してPNG出力して」** と指示するプロンプト（下記A方式）を使うと、数値ズレ・日本語文字化けが **100%ゼロ** になります。
> - **英語リスニングの場面イラスト・理科の観察スケッチ**は画像生成プロンプト（下記B方式：テキストなし白背景線画指定）を使うと日本の公立入試冊子そのままのクリーンな線画になります。

---

## 1. 【数学】放物線 $y = ax^2$ と直線 $\text{AB}$・$\triangle\text{OAB}$ 面積二等分（Python厳密作図プロンプト）

```text
あなたは日本の公立高校入試の数学図版デザイナーです。Python (matplotlib) を実行して、白背景・黒線ベース（アクセントは濃紺 #1E40AF と赤 #DC2626 のみ）の印刷用高解像度PNG（300dpi, 1200x900px）を生成し、ダウンロードリンクを出してください。

【作図仕様】
1. 座標軸: x軸 (-4.5 〜 5.5), y軸 (-1.5 〜 10.5)、原点 O にラベル "O"、軸端に矢印と "x", "y"（斜体セリフ体）を描画。目盛り線は入れずすっきりさせる。
2. 放物線: y = (1/2)x^2 を滑らかな濃紺実線（太さ2.4pt）で描き、右上に "y = (1/2)x²" と表記。
3. 直線AB: y = x + 4 を黒実線（太さ1.8pt）で描き、交点 A(-2, 2), B(4, 8)、y切片 C(0, 4) に黒丸ドットとラベル "A(-2, 2)", "B(4, 8)", "C(0, 4)" を重ならない位置に配置。
4. △OAB の内部を薄い水色 (#DBEAFE, alpha=0.55) で塗りつぶす。
5. 原点Oを通り△OABの面積を二等分する直線（ABの中点 M(1, 5) を通る y = 5x）を赤破線で描き、点 M(1, 5) を赤丸で示す。
余白は最小限にし、日本語フォント不要（英数字記号のみ）で文字化けを完全に防いでください。
```

---

## 2. 【数学】円周角の定理・接線と相似証明（SVGベクター作図プロンプト）

```text
日本の公立高校入試（数学・大問4平面図形）に掲載するクリーンな白黒ベクター図を SVG コードで出力してください（viewBox="0 0 520 420"、白背景 #FFFFFF、主線 #0F172A）。

【幾何条件（座標を三角関数で厳密計算して配置すること）】
- 中心 O(260, 210), 半径 R = 150 の円を描く。
- 直径 AB を水平に引く: A(110, 210), B(410, 210)、中心 O に黒点とラベル "O"。
- 円周上の点 C を角度 125° 付近、点 D を角度 50° 付近にとり、弦 AC, BC, AD, BD, CD を結ぶ（∠ACB = 90° の直角マークを点Cに小さく描く）。
- 点 B における円の接線 l を垂直に引き、直線 AC の延長と接線 l の交点を E とする。
- 頂点ラベル A, B, C, D, E, O は線と重ならない外側に Times New Roman Italic 20px で配置すること。
```

---

## 3. 【数学】空間図形・立方体の3点切断と体積比（SVG/Python作図プロンプト）

```text
1辺 6cm の立方体 ABCD-EFGH（上面 ABCD、下面 EFGH、Aの真下がE）の見取り図（斜投影図）と、3点 A, C, F を通る平面で切断した切り口 △ACF を示す高校入試数学用の図を Python (matplotlib) で 1200x900px PNG として作成してください。

【作図ルール】
- 手前の見える辺は黒実線（2.0pt）、奥の隠れる辺（AD, DC, DH）は黒破線（1.2pt）。
- 切り口 △ACF の辺 AC, CF, AF は赤実線（2.5pt）で結び、切り口内部を薄い赤 (#FEE2E2, alpha=0.5) で塗る。
- 頂点ラベル A〜H を英語大文字で外側に配置し、辺 EF の下に "6 cm" と寸法を入れる。
```

---

## 4. 【数学】データの活用・4クラスの箱ひげ図比較（Python厳密作図プロンプト）

```text
公立高校入試「データの活用（箱ひげ図の正誤判定）」問題用の図を Python (matplotlib) で出力してください（1200x720px, 300dpi, 白背景）。

【データ仕様（生徒35人ずつの小テスト得点・0〜20点満点）】
- Group A: 最小値 4, 第1四分位数 8, 中央値 11, 第3四分位数 15, 最大値 19（平均値 11.4 を "+" マークで記入）
- Group B: 最小値 6, 第1四分位数 9, 中央値 13, 第3四分位数 16, 最大値 18（平均値 12.6 を "+" マークで記入）
- Group C: 最小値 3, 第1四分位数 7, 中央値 12, 第3四分位数 14, 最大値 20（平均値 11.2 を "+" マークで記入）
横軸は 0〜20（1点刻みの薄い縦グリッド線、5点ごとに太線）、箱は白塗り黒枠（1.8pt）にして印刷時に最も見やすいスタイルにしてください。
```

---

## 5. 【理科】光合成と呼吸の対照実験（試験管A〜D・BTB溶液／アルミ箔）イラストプロンプト

```text
Create a clean, black-and-white Japanese junior high school science exam diagram on a pure white background (#FFFFFF), flat vector textbook line-art style, NO text gibberish.

Subject: Four identical glass test tubes labeled ONLY with bold capital letters "A", "B", "C", "D" below each tube, standing in a rack:
- Tube A: contains liquid, a green aquatic plant (Elodea) submerged, closed with a rubber stopper, exposed to light.
- Tube B: contains liquid, a green aquatic plant submerged, closed with a rubber stopper, completely wrapped in silver/gray aluminum foil shading cover so light cannot enter.
- Tube C: contains liquid only (no plant), closed with a rubber stopper, exposed to light.
- Tube D: contains liquid only (no plant), wrapped in aluminum foil.
Crisp uniform black outlines, subtle scientific stippling/shading, high contrast, suitable for A4 monochrome exam printing. Do not include any other words or Japanese characters inside the image.
```

---

## 6. 【理科】オームの法則・直列回路と並列回路の電流計・電圧計配置図（SVGプロンプト）

```text
中学理科（電流とその利用）の入試問題用に、JIS旧・現行の電気用図記号に準拠した「2つの電熱線 R1(20Ω), R2(30Ω) の並列回路」のSVG図コードを作成してください（viewBox="0 0 560 320"、白背景）。

【回路構成】
- 上部に直流電源（長い縦線＝＋極、短い太縦線＝−極）とスイッチS。
- 分岐後に上段枝に抵抗 R1（長方形記号・中に "R1 (20Ω)"）、下段枝に抵抗 R2（長方形記号・中に "R2 (30Ω)"）。
- R1 に並列に電圧計 V（丸にV）、合流後の幹線の−極側に電流計 A（丸にA）を直列に配置。
- 線幅 2px の明瞭な黒線で描画すること。
```

---

## 7. 【理科】中和反応（塩酸＋水酸化ナトリウム水溶液）のイオン数変化グラフ（Python作図プロンプト）

```text
中学3年理科「酸・アルカリとイオン」の頻出入試図版として、一定量のうすい塩酸にうすい水酸化ナトリウム水溶液を 0, 5, 10, 15, 20 cm³ 加えたときのビーカー内の4種類のイオン（H+, Cl-, Na+, OH-）の個数変化を表す4枚並びのミニ折れ線グラフ（①〜④）を Python (matplotlib) で 1400x420px PNG として作成してください。
- 中和点は 10 cm³ とする。
- Graph (1): Cl-（最初から最後まで一定＝水平線）
- Graph (2): H+（10 cm³ まで直線的に減少し、10 cm³ 以降は 0 のまま）
- Graph (3): Na+（0 から原点を通る直線で右肩上がりに増え続ける）
- Graph (4): OH-（10 cm³ までは 0 のまま、10 cm³ から右肩上がりに増える）
軸ラベルは英語・数字のみ（Volume [cm³], Number of ions, (1)〜(4)）とし、生徒がどのグラフがどのイオンかを選ぶ問題にそのまま使えるようにしてください。
```

---

## 8. 【理科】天体・太陽のまわりを公転する金星の位置（A〜H）と見え方（SVG/Pythonプロンプト）

```text
中学3年理科「地球と宇宙（金星の満ち欠けと視直径の変化）」の入試図版を Python (matplotlib) で 1100x900px PNG として作成してください。

【配置】
- 中央に太陽 "Sun"（黄色丸）、外側の円軌道（半径 2.6）の真下 (0, -2.6) に地球 "Earth"（自転の向き＝反時計回りの小矢印と、昼半分＝上側を明るく、夜半分＝下側をグレーに塗る）。
- 内側の円軌道（半径 1.85）上に等間隔または特徴位置で金星の位置 "A"（外合付近の左上）, "B"（西方最大離角付近・明けの明星）, "C"（内合手前の三日月型）, "D"（東方最大離角付近・宵の明星）, "E"（外合手前）を配置し、それぞれの金星も太陽側（中央向き半分）を白、反対側半分を黒く塗り分けること。
```

---

## 9. 【社会・地理】日本の4気候区（太平洋側・日本海側・瀬戸内・中央高地）の雨温図4枚比較（Pythonプロンプト）

```text
公立高校入試（社会・地理）の雨温図判別問題用に、都市名を伏せた「都市A〜都市D」の4つの雨温図を横1列（1600x480px, 300dpi, 白背景）で Python (matplotlib) により描画してください。

【左軸: 気温 (-10℃ 〜 35℃, 折れ線・赤丸) ／ 右軸: 降水量 (0 〜 400mm, 青棒グラフ) ／ 下部に年平均気温と年降水量を数値表示】
- City A (金沢型・日本海側): 12月・1月・2月の降水棒が 260〜310mm と突出して高い。年平均 15.0℃, 2400mm。
- City B (高松型・瀬戸内): 1年を通して降水量が少なく年降水量 1080mm, 年平均 16.5℃。
- City C (松本型・中央高地): 冬の気温が 0℃ 近くまで下がり年較差が大きく、年降水量も 1050mm と少ない。年平均 12.2℃。
- City D (静岡・高知型・太平洋側): 6〜9月の降水量が 300mm 前後と多く、12〜1月は 50mm 以下と乾燥。年平均 16.8℃, 2350mm。
ラベルは "City A", "City B", "City C", "City D", 月番号 "1..12", "°C", "mm" のみで文字化けゼロにしてください。
```

---

## 10. 【英語リスニング・英作文】イラスト4択問題（A〜D）＆アンケート円グラフ・棒グラフ生成プロンプト

### (A) リスニング第1部・場面イラスト4択（画像生成プロンプト）
```text
Create a 2x2 grid of four clean black-and-white line-art illustrations labeled ONLY "A", "B", "C", "D" in the top-left corner of each panel, on a pure white background, Japanese public high school English listening exam style:
- Panel A: A boy and a girl studying together at a library table with books and a tablet.
- Panel B: A boy playing soccer on a school field while a girl watches from a bench.
- Panel C: A boy and a girl cooking curry together in a home economics classroom.
- Panel D: A boy buying a train ticket at a station ticket machine while a girl holds an umbrella.
Simple, clear textbook pen-and-ink outlines, friendly junior high school characters, zero speech bubbles, zero extra text.
```

### (B) 条件英作文・資料読み取り棒グラフ（Pythonプロンプト）
```text
公立高校入試「図表読み取り型・条件英作文」問題用に、中学生200人に聞いた『休日に最もよくすること（What Junior High School Students Like Doing on Weekends）』の横棒グラフを Python (matplotlib) で英語ラベルのみ・白黒印刷対応グレースケール＋青アクセントで出力してください（1000x520px）。
項目と割合：
1. Watching videos / listening to music: 42%
2. Playing sports outdoors: 26%
3. Reading books or comics: 18%
4. Cooking or shopping with family: 14%
(n = 200, multiple answers not allowed)
```
