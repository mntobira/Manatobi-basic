#!/usr/bin/env python3
"""
v8.0 アルティメット視覚網羅ベクター図版ジェネレータ (public/juken_figs/v8/*.svg)
- 数学3組（6枚）：ma1_1 (平方根の数直線挟み撃ち), ma1_2 (食塩水＆速さ線分図), ma1_3 (マッチ棒規則性 3n+1)
- 理科4組（8枚）：sc1_3 (光の屈折・虚像浮き上がり), sc2_3 (溶解度曲線と再結晶), sc3_3 (脊髄反射と大脳経路), sc4_3 (月の公転と満ち欠け)
- 英語2枚        ：en4_1 (アンケートグラフ＆案内), en4_2 (図書館リニューアル案内図)
- 国語2枚        ：ja2_1 (読書メディア統計グラフ), ja3_2 (漢文返り点・置き字ステップ図)
"""
import os
import math

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "juken_figs", "v8")
os.makedirs(OUT_DIR, exist_ok=True)

FONT = "'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif"

def save(name: str, body: str, w: int = 540, h: int = 300):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" font-family="{FONT}">
  <defs>
    <marker id="arr-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626"/>
    </marker>
    <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#2563eb"/>
    </marker>
    <marker id="arr-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#16a34a"/>
    </marker>
    <marker id="arr-slate" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="#334155"/>
    </marker>
  </defs>
  <rect width="{w}" height="{h}" rx="14" fill="#ffffff"/>
{body}
</svg>
'''
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(svg)

# =========================================================================
# 数学① ma1_1: 数直線上の平方根 3√5 (=√45) の位置と整数部分・小数部分
# 目盛り 4..8: x = 60 + (val - 4) * 105  => 4:60, 5:165, 6:270, 7:375, 8:480
# √45 ≈ 6.708 => x = 60 + 2.708 * 105 = 344.3
# =========================================================================
ticks = ""
for v in range(4, 9):
    tx = 60 + (v - 4) * 105
    ticks += f'''
  <line x1="{tx}" y1="128" x2="{tx}" y2="148" stroke="#0f172a" stroke-width="2.4"/>
  <text x="{tx}" y="170" font-size="14" font-weight="800" fill="#0f172a" text-anchor="middle">{v}</text>
'''
    if v < 8:
        mx = tx + 52.5
        ticks += f'<line x1="{mx}" y1="133" x2="{mx}" y2="143" stroke="#64748b" stroke-width="1.5"/>'

for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 平方数ラベル √16 .. √64 -->
  <text x="60" y="115" font-size="11.5" font-weight="800" fill="#2563eb" text-anchor="middle">√16</text>
  <text x="165" y="115" font-size="11.5" font-weight="800" fill="#2563eb" text-anchor="middle">√25</text>
  <text x="270" y="115" font-size="12" font-weight="900" fill="#dc2626" text-anchor="middle">√36</text>
  <text x="375" y="115" font-size="12" font-weight="900" fill="#dc2626" text-anchor="middle">√49</text>
  <text x="480" y="115" font-size="11.5" font-weight="800" fill="#2563eb" text-anchor="middle">√64</text>
  <!-- 区間 C をハイライト -->
  <rect x="270" y="126" width="105" height="24" rx="4" fill="#fee2e2" opacity="0.65"/>
  <circle cx="344" cy="138" r="6.5" fill="#dc2626"/>
  <line x1="344" y1="132" x2="344" y2="76" stroke="#dc2626" stroke-width="2.2"/>
  <rect x="235" y="44" width="220" height="32" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="345" y="64" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">3√5 ＝ √(9×5) ＝ √45 （区間ウ！）</text>
  <rect x="42" y="218" width="456" height="62" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="270" y="240" font-size="11.5" font-weight="800" fill="#1e40af" text-anchor="middle">鉄則：外の数を2乗してルートの中へ！ 3√5 ＝ √45</text>
  <text x="270" y="262" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">√36(＝6) ＜ √45 ＜ √49(＝7) ⇒ 整数部分 a＝6、小数部分 b＝3√5 − 6！</text>
'''
    save(f"math_sqrt_line_{mode}.svg", f'''
  <text x="18" y="25" font-size="13" font-weight="800" fill="#0f172a">数直線上の区間 ア〜エ と 3√5 の大きさ・整数部分</text>
  <line x1="35" y1="138" x2="508" y2="138" stroke="#0f172a" stroke-width="2.4" marker-end="url(#arr-slate)"/>
  {ticks}
  <!-- 区間ラベル ア(4-5), イ(5-6), ウ(6-7), エ(7-8) -->
  <text x="112" y="196" font-size="13" font-weight="800" fill="#475569" text-anchor="middle">区間ア</text>
  <text x="217" y="196" font-size="13" font-weight="800" fill="#475569" text-anchor="middle">区間イ</text>
  <text x="322" y="196" font-size="13" font-weight="800" fill="#475569" text-anchor="middle">区間ウ</text>
  <text x="427" y="196" font-size="13" font-weight="800" fill="#475569" text-anchor="middle">区間エ</text>
  {ann}
''')

# =========================================================================
# 数学② ma1_2: 連立方程式（8%食塩水 x g ＋ 15%食塩水 y g ＝ 10%食塩水 350g）
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <rect x="28" y="196" width="484" height="88" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="270" y="217" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">連立2本の式：①全体の重さ x ＋ y ＝ 350 ／ ②食塩の重さ 0.08x ＋ 0.15y ＝ 35</text>
  <text x="270" y="239" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">②×100：8x ＋ 15y ＝ 3500、①×8：8x ＋ 8y ＝ 2800 ⇒ 7y ＝ 700 ∴ y＝100g, x＝250g！</text>
  <text x="270" y="261" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle">★面積図・てんびん裏ワザ：濃度の差(10−8):(15−10)＝2:5 の逆比 ⇒ x : y ＝ 5 : 2 ＝ 250g : 100g！</text>
'''
    save(f"math_salt_speed_{mode}.svg", f'''
  <text x="18" y="25" font-size="13" font-weight="800" fill="#0f172a">連立方程式の食塩水混合モデル（全体の質量と溶けている食塩の質量）</text>
  <!-- ビーカーA -->
  <rect x="48" y="58" width="110" height="118" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2"/>
  <rect x="50" y="92" width="106" height="82" rx="6" fill="#bfdbfe"/>
  <text x="103" y="80" font-size="13" font-weight="900" fill="#1e40af" text-anchor="middle">食塩水 A (8%)</text>
  <text x="103" y="126" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">x g</text>
  <text x="103" y="152" font-size="11" font-weight="700" fill="#1e3a8a" text-anchor="middle">食塩: 0.08x g</text>

  <text x="184" y="125" font-size="22" font-weight="900" fill="#334155" text-anchor="middle">＋</text>

  <!-- ビーカーB -->
  <rect x="210" y="58" width="110" height="118" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="2.2"/>
  <rect x="212" y="92" width="106" height="82" rx="6" fill="#fde68a"/>
  <text x="265" y="80" font-size="13" font-weight="900" fill="#92400e" text-anchor="middle">食塩水 B (15%)</text>
  <text x="265" y="126" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">y g</text>
  <text x="265" y="152" font-size="11" font-weight="700" fill="#78350f" text-anchor="middle">食塩: 0.15y g</text>

  <text x="348" y="125" font-size="22" font-weight="900" fill="#334155" text-anchor="middle">＝</text>

  <!-- 完成ビーカー -->
  <rect x="376" y="48" width="128" height="128" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="2.4"/>
  <rect x="378" y="82" width="124" height="92" rx="6" fill="#bbf7d0"/>
  <text x="440" y="70" font-size="13" font-weight="900" fill="#15803d" text-anchor="middle">混合後 (10%)</text>
  <text x="440" y="122" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">350 g</text>
  <text x="440" y="150" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">食塩: 350×0.10＝35g</text>
  {ann}
''')

# =========================================================================
# 数学③ ma1_3: 正方形を横につなぐマッチ棒の規則性 (1 + 3n 本)
# 4個の正方形を並べて描画
# =========================================================================
for mode in ("q", "ans"):
    squares = ""
    for k in range(4):
        sx = 85 + k * 75
        sy = 78
        col = "#dc2626" if (mode == "ans" and k >= 0) else "#334155"
        # 上・下・右のコの字3本
        squares += f'''
  <line x1="{sx+4}" y1="{sy}" x2="{sx+71}" y2="{sy}" stroke="{col}" stroke-width="5" stroke-linecap="round"/>
  <line x1="{sx+4}" y1="{sy+75}" x2="{sx+71}" y2="{sy+75}" stroke="{col}" stroke-width="5" stroke-linecap="round"/>
  <line x1="{sx+75}" y1="{sy+4}" x2="{sx+75}" y2="{sy+71}" stroke="{col}" stroke-width="5" stroke-linecap="round"/>
'''
        if mode == "ans":
            squares += f'<rect x="{sx+8}" y="{sy-12}" width="73" height="99" rx="8" fill="none" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4,3"/>'
            squares += f'<text x="{sx+44}" y="{sy+43}" font-size="12" font-weight="800" fill="#dc2626" text-anchor="middle">＋3本</text>'
        else:
            squares += f'<text x="{sx+38}" y="{sy+43}" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">{k+1}個目</text>'
    left_col = "#2563eb" if mode == "ans" else "#334155"
    left_stick = f'<line x1="85" y1="82" x2="85" y2="149" stroke="{left_col}" stroke-width="6" stroke-linecap="round"/>'
    ann = ""
    if mode == "ans":
        ann = '''
  <text x="52" y="118" font-size="11.5" font-weight="900" fill="#2563eb" text-anchor="middle">最初の1本</text>
  <rect x="28" y="196" width="484" height="86" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
  <text x="270" y="218" font-size="12" font-weight="900" fill="#1e40af" text-anchor="middle">規則性の最強解法：【最初の左端1本】＋【コの字（3本）× nセット】＝ 3n ＋ 1（本）！</text>
  <text x="270" y="242" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">別解：最初の正方形4本 ＋ 2個目以降3本ずつ (n−1)回 ⇒ 4 ＋ 3(n − 1) ＝ 3n ＋ 1（一致！）</text>
  <text x="270" y="264" font-size="11" font-weight="800" fill="#dc2626" text-anchor="middle">⚠️ 「4n本」にすると重なる縦棒 (n−1)本を二重カウントしてしまうので 4n − (n − 1) ＝ 3n ＋ 1！</text>
'''
    save(f"math_tile_rule_{mode}.svg", f'''
  <text x="18" y="25" font-size="13" font-weight="800" fill="#0f172a">同じ長さのマッチ棒を並べて正方形を横に n 個つくる規則性（n＝4の例）</text>
  {left_stick}
  {squares}
  <text x="435" y="120" font-size="16" font-weight="900" fill="#475569">・・・</text>
  {ann}
''')

# =========================================================================
# 理科① sc1_3: 水中から空気へ出る光の屈折・全反射とコインが浮き上がって見える虚像
# 水面 y=145, 法線 x=250, 水中コイン C=(160, 235) -> 水面入射点 P=(250, 145) (45度)
# 空気中では屈折角 > 入射角 (例: 65度方向 -> 右上 (395, 77))
# 目の位置 (395, 77) から逆延長すると C'=(160, 187) に浮き上がって見える！
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 水中から水面への入射光 C(160,235) -> P(250,145) -->
  <line x1="160" y1="235" x2="250" y2="145" stroke="#2563eb" stroke-width="2.8" marker-end="url(#arr-blue)"/>
  <!-- 水面から目への屈折光 P(250,145) -> Eye(395,77) -->
  <line x1="250" y1="145" x2="388" y2="80" stroke="#dc2626" stroke-width="2.8" marker-end="url(#arr-red)"/>
  <!-- 目からの逆延長線（点線）P(250,145) -> C'(160,187) -->
  <line x1="250" y1="145" x2="160" y2="187" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,3"/>
  <ellipse cx="160" cy="187" rx="20" ry="7" fill="#fde047" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="92" y="191" font-size="11.5" font-weight="900" fill="#dc2626" text-anchor="middle">浮き上がった像</text>
  <text x="234" y="182" font-size="10.5" font-weight="800" fill="#2563eb" text-anchor="end">入射角 i</text>
  <text x="266" y="112" font-size="10.5" font-weight="900" fill="#dc2626">屈折角 r（i＜r！）</text>
  <rect x="235" y="205" width="286" height="76" rx="8" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
  <text x="378" y="225" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">① 水→空気は【屈折角 ＞ 入射角】（水面側へ折れる）</text>
  <text x="378" y="245" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">② 目は光が直進してきたと錯覚 ⇒ 浅い位置に虚像！</text>
  <text x="378" y="265" font-size="10.5" font-weight="800" fill="#15803d" text-anchor="middle">③ さらに斜めにすると100%跳ね返る【全反射】（光ファイバー）</text>
'''
    save(f"sci_refract_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">水中のコインから出た光が空気中の目にとどくときの屈折</text>
  <!-- 水領域 -->
  <rect x="30" y="145" width="480" height="142" rx="6" fill="#e0f2fe"/>
  <line x1="30" y1="145" x2="510" y2="145" stroke="#0284c7" stroke-width="2.5"/>
  <text x="58" y="135" font-size="12" font-weight="800" fill="#475569">空気</text>
  <text x="58" y="168" font-size="12" font-weight="800" fill="#0369a1">水</text>
  <!-- 法線 -->
  <line x1="250" y1="52" x2="250" y2="255" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,3"/>
  <!-- 実物のコイン -->
  <ellipse cx="160" cy="235" rx="20" ry="7" fill="#facc15" stroke="#a16207" stroke-width="2"/>
  <text x="160" y="260" font-size="11.5" font-weight="800" fill="#713f12" text-anchor="middle">実際のコイン</text>
  <!-- 目のイラスト -->
  <ellipse cx="405" cy="74" rx="16" ry="10" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
  <circle cx="400" cy="74" r="5" fill="#0f172a"/>
  <text x="438" y="78" font-size="12" font-weight="800" fill="#0f172a">目</text>
  {ann}
''')

# =========================================================================
# 理科② sc2_3: 硝酸カリウムと塩化ナトリウムの溶解度曲線（水100g）
# 温度: 20℃(KNO3=32g, NaCl=36g), 40℃(KNO3=64g), 60℃(KNO3=109g, NaCl=37g)
# x: 0℃=85, 20℃=195, 40℃=305, 60℃=415, 80℃=485
# y: 0g=240, 50g=165, 100g=90, 120g=60 (1g = 1.5px)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        # 60℃で水100gに80g溶かした点 (415, 240 - 120 = 120) -> 20℃(溶解度32g: y=240-48=192)まで冷却！
        ann = '''
  <!-- 60℃ 80g 点 -> 20℃へ冷却 -->
  <circle cx="415" cy="120" r="5.5" fill="#2563eb"/>
  <line x1="415" y1="120" x2="195" y2="120" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,3"/>
  <!-- 20℃で溶け残る 80 - 32 = 48g の縦矢印 (y=120 .. 192) -->
  <line x1="195" y1="120" x2="195" y2="192" stroke="#dc2626" stroke-width="4.5"/>
  <circle cx="195" cy="192" r="5.5" fill="#dc2626"/>
  <rect x="88" y="42" width="295" height="62" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="235" y="61" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">例：60℃の水100gに硝酸カリウム80gを溶かし20℃へ冷却</text>
  <text x="235" y="79" font-size="11.5" font-weight="900" fill="#dc2626" text-anchor="middle">析出量 ＝ 溶かした80g − 20℃の溶解度32g ＝ 【48g】！</text>
  <text x="235" y="96" font-size="10.5" font-weight="700" fill="#1e40af" text-anchor="middle">※食塩は温度を下げてもほとんど出ない ⇒ 水を蒸発させる！</text>
'''
    save(f"sci_solubility_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">水100gに溶ける物質の限度（溶解度曲線：硝酸カリウム・塩化ナトリウム）</text>
  <line x1="85" y1="240" x2="495" y2="240" stroke="#334155" stroke-width="1.8"/>
  <line x1="85" y1="240" x2="85" y2="45" stroke="#334155" stroke-width="1.8"/>
  <!-- 横線 50g(165), 100g(90) -->
  <line x1="85" y1="165" x2="485" y2="165" stroke="#e2e8f0" stroke-width="1.2"/>
  <line x1="85" y1="90" x2="485" y2="90" stroke="#e2e8f0" stroke-width="1.2"/>
  <text x="76" y="244" font-size="11" fill="#475569" text-anchor="end">0</text>
  <text x="76" y="169" font-size="11" fill="#475569" text-anchor="end">50g</text>
  <text x="76" y="94" font-size="11" fill="#475569" text-anchor="end">100g</text>
  <!-- 温度目盛り -->
  <text x="85" y="258" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">0℃</text>
  <text x="195" y="258" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">20℃(32g)</text>
  <text x="305" y="258" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">40℃(64g)</text>
  <text x="415" y="258" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">60℃(109g)</text>
  <!-- KNO3 曲線: (85,220) -> (195,192) -> (305,144) -> (415,76.5) -->
  <path d="M85,220 Q235,188 305,144 T432,54" fill="none" stroke="#dc2626" stroke-width="3"/>
  <text x="442" y="64" font-size="11.5" font-weight="800" fill="#dc2626">硝酸カリウム</text>
  <!-- NaCl ほぼ水平線: (85,186) -> (465,183) -->
  <line x1="85" y1="186" x2="465" y2="183" stroke="#0284c7" stroke-width="2.8"/>
  <text x="435" y="202" font-size="11.5" font-weight="800" fill="#0369a1" text-anchor="middle">塩化ナトリウム(約36〜37g)</text>
  <text x="285" y="284" font-size="11" font-weight="700" fill="#475569" text-anchor="middle">水の温度（水 100g あたりの溶解度）</text>
  {ann}
''')

# =========================================================================
# 理科③ sc3_3: 刺激と反応（意識的な反応 vs 脊髄反射の経路）
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 反射のショートカット赤太線 -->
  <path d="M118,108 L238,142 L118,198" fill="none" stroke="#dc2626" stroke-width="4" marker-end="url(#arr-red)"/>
  <rect x="24" y="236" width="492" height="52" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="270" y="255" font-size="11.5" font-weight="900" fill="#b91c1c" text-anchor="middle">【反射】＝ 大脳を通らず【感覚器官 → 感覚神経(A) → せきずい → 運動神経(D) → 筋肉】！</text>
  <text x="270" y="274" font-size="10.5" font-weight="800" fill="#1e40af" text-anchor="middle">通常の意識的反応は A→B→【大脳】→C→D（経路が長い分時間がかかる） ／ 反射は危険から素早く身を守る！</text>
'''
    save(f"sci_reflex_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">ヒトの神経系における信号の伝わり方（皮膚・せきずい・大脳・筋肉）</text>
  <!-- 感覚器官（皮膚） -->
  <rect x="30" y="86" width="90" height="42" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="75" y="112" font-size="12" font-weight="800" fill="#92400e" text-anchor="middle">皮膚(感覚器官)</text>
  <!-- 筋肉（運動器官） -->
  <rect x="30" y="182" width="90" height="42" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="75" y="208" font-size="12" font-weight="800" fill="#166534" text-anchor="middle">手の筋肉</text>
  <!-- せきずい -->
  <rect x="235" y="122" width="95" height="58" rx="12" fill="#e0e7ff" stroke="#4f46e5" stroke-width="2.2"/>
  <text x="282" y="156" font-size="13" font-weight="900" fill="#3730a3" text-anchor="middle">せきずい</text>
  <!-- 大脳 -->
  <ellipse cx="445" cy="150" rx="62" ry="48" fill="#fce7f3" stroke="#db2777" stroke-width="2.2"/>
  <text x="445" y="155" font-size="14" font-weight="900" fill="#9d174d" text-anchor="middle">大脳</text>

  <!-- 神経 A, B, C, D -->
  <line x1="120" y1="107" x2="233" y2="138" stroke="#2563eb" stroke-width="2.4" marker-end="url(#arr-blue)"/>
  <text x="178" y="112" font-size="11.5" font-weight="800" fill="#1e40af" text-anchor="middle">神経A</text>

  <line x1="330" y1="138" x2="382" y2="138" stroke="#2563eb" stroke-width="2.4" marker-end="url(#arr-blue)"/>
  <text x="356" y="128" font-size="11.5" font-weight="800" fill="#1e40af" text-anchor="middle">経路B</text>

  <line x1="382" y1="164" x2="332" y2="164" stroke="#16a34a" stroke-width="2.4" marker-end="url(#arr-green)"/>
  <text x="356" y="182" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle">経路C</text>

  <line x1="235" y1="165" x2="122" y2="200" stroke="#16a34a" stroke-width="2.4" marker-end="url(#arr-green)"/>
  <text x="182" y="198" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle">神経D</text>
  {ann}
''')

# =========================================================================
# 理科④ sc4_3: 太陽の光（右から）と月の公転軌道（ア新月・イ上弦・ウ満月・エ下弦）
# 地球中心 E=(230, 142), 軌道半径 r=78
# 太陽は右側 -> ア(右:308,142 新月), イ(上:230,64 上弦), ウ(左:152,142 満月), エ(下:230,220 下弦)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <text x="308" y="114" font-size="11" font-weight="900" fill="#dc2626" text-anchor="middle">ア：新月(日食側)</text>
  <text x="230" y="34" font-size="11" font-weight="900" fill="#1e40af" text-anchor="middle">イ：上弦の月（右半分光る・夕方18時南中）</text>
  <text x="86" y="146" font-size="11" font-weight="900" fill="#dc2626" text-anchor="middle">ウ：満月(月食)</text>
  <text x="230" y="254" font-size="11" font-weight="900" fill="#15803d" text-anchor="middle">エ：下弦の月（左半分光る・明け方6時南中）</text>
  <rect x="20" y="262" width="500" height="30" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
  <text x="270" y="281" font-size="10.8" font-weight="800" fill="#1e40af" text-anchor="middle">地球の時刻配置（反時計回り自転）：右(昼12時)→上(夕方18時)→左(真夜中0時)→下(朝6時)！</text>
'''
    def half_moon(cx, cy, label, lx, ly):
        # 右側が太陽光で明るく(黄)、左側が影(濃紺)
        return f'''
  <circle cx="{cx}" cy="{cy}" r="14" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>
  <path d="M{cx},{cy-14} A14,14 0 0,1 {cx},{cy+14} Z" fill="#fde047"/>
  <text x="{lx}" y="{ly}" font-size="12.5" font-weight="900" fill="#0f172a" text-anchor="middle">{label}</text>
'''
    save(f"sci_moon_{mode}.svg", f'''
  <text x="18" y="22" font-size="13" font-weight="800" fill="#0f172a">北極側から見た地球と月の公転軌道（右から太陽の光）</text>
  <!-- 太陽光矢印 -->
  <line x1="515" y1="85" x2="435" y2="85" stroke="#f59e0b" stroke-width="3" marker-end="url(#arr-red)"/>
  <line x1="515" y1="142" x2="435" y2="142" stroke="#f59e0b" stroke-width="3" marker-end="url(#arr-red)"/>
  <line x1="515" y1="199" x2="435" y2="199" stroke="#f59e0b" stroke-width="3" marker-end="url(#arr-red)"/>
  <text x="478" y="68" font-size="12" font-weight="800" fill="#d97706" text-anchor="middle">太陽の光☀️</text>

  <!-- 公転軌道 -->
  <circle cx="230" cy="142" r="78" fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <!-- 地球 -->
  <circle cx="230" cy="142" r="22" fill="#3b82f6" stroke="#1e3a8a" stroke-width="2"/>
  <path d="M230,120 A22,22 0 0,0 230,164 Z" fill="#1e293b" opacity="0.7"/>
  <text x="230" y="146" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">地球</text>

  {half_moon(308, 142, "ア", 334, 147)}
  {half_moon(230, 64, "イ", 254, 68)}
  {half_moon(152, 142, "ウ", 126, 147)}
  {half_moon(230, 220, "エ", 254, 226)}
  {ann}
''')

# =========================================================================
# 英語スライド① en4_1: 中学生200人アンケートグラフ（What do you want to do using English?）
# =========================================================================
save("eng_survey_chart.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">Survey: What Do Students Want to Do Using English? (200 Students)</text>
  <text x="18" y="45" font-size="11" fill="#475569">Midori Junior High School — 3rd Grade Survey Results</text>
  <!-- 横棒グラフ (100% = 340px) -->
  <!-- 1. Travel abroad: 45% (90 students) -> 153px -->
  <text x="22" y="84" font-size="12" font-weight="800" fill="#0f172a">Travel abroad</text>
  <rect x="185" y="67" width="225" height="24" rx="5" fill="#2563eb"/>
  <text x="418" y="84" font-size="12" font-weight="800" fill="#1e40af">45% (90)</text>

  <!-- 2. Watch movies / music: 25% (50 students) -> 125px -->
  <text x="22" y="128" font-size="12" font-weight="800" fill="#0f172a">Enjoy movies &amp; music</text>
  <rect x="185" y="111" width="125" height="24" rx="5" fill="#10b981"/>
  <text x="318" y="128" font-size="12" font-weight="800" fill="#065f46">25% (50)</text>

  <!-- 3. Help foreign visitors: 20% (40 students) -> 100px -->
  <text x="22" y="172" font-size="12" font-weight="800" fill="#0f172a">Help foreign visitors</text>
  <rect x="185" y="155" width="100" height="24" rx="5" fill="#f59e0b"/>
  <text x="293" y="172" font-size="12" font-weight="800" fill="#92400e">20% (40)</text>

  <!-- 4. Study abroad: 10% (20 students) -> 50px -->
  <text x="22" y="216" font-size="12" font-weight="800" fill="#0f172a">Study abroad</text>
  <rect x="185" y="199" width="50" height="24" rx="5" fill="#8b5cf6"/>
  <text x="243" y="216" font-size="12" font-weight="800" fill="#5b21b6">10% (20)</text>

  <rect x="22" y="244" width="496" height="40" rx="8" fill="#eff6ff" stroke="#2563eb"/>
  <text x="270" y="269" font-size="11.5" font-weight="800" fill="#1e40af" text-anchor="middle">Key Point: "Travel abroad" (45%) is more than twice as popular as "Help foreign visitors" (20%).</text>
''')

# =========================================================================
# 英語スライド② en4_2: 市立図書館リニューアル案内フロア＆イベントスケジュール図
# =========================================================================
save("eng_library_map.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">Green City Library — New Floor Guide &amp; Rules</text>
  <!-- 1st Floor -->
  <rect x="24" y="48" width="236" height="175" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <text x="142" y="72" font-size="13" font-weight="900" fill="#065f46" text-anchor="middle">1st Floor (Talking OK Area)</text>
  <rect x="40" y="86" width="204" height="36" rx="6" fill="#ffffff" stroke="#10b981"/>
  <text x="142" y="109" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">Book Cafe (Drinks with lids OK)</text>
  <rect x="40" y="132" width="204" height="36" rx="6" fill="#ffffff" stroke="#10b981"/>
  <text x="142" y="155" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">Children's Room (Story Time)</text>
  <text x="142" y="198" font-size="11" font-weight="700" fill="#065f46" text-anchor="middle">Open: Tue–Sun 9:00–19:00</text>
  <text x="142" y="214" font-size="10.5" font-weight="800" fill="#dc2626" text-anchor="middle">Closed: Every Monday</text>

  <!-- 2nd Floor -->
  <rect x="280" y="48" width="236" height="175" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="398" y="72" font-size="13" font-weight="900" fill="#1e40af" text-anchor="middle">2nd Floor (Quiet Zone)</text>
  <rect x="296" y="86" width="204" height="36" rx="6" fill="#ffffff" stroke="#2563eb"/>
  <text x="398" y="109" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">Silent Study Room (40 seats)</text>
  <rect x="296" y="132" width="204" height="36" rx="6" fill="#ffffff" stroke="#2563eb"/>
  <text x="398" y="155" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">PC &amp; History Archive Corner</text>
  <text x="398" y="198" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">No Talking / No Food on 2F</text>
  <text x="398" y="214" font-size="10.5" font-weight="700" fill="#1e40af" text-anchor="middle">Borrow up to 8 books for 2 weeks</text>

  <rect x="24" y="238" width="492" height="46" rx="8" fill="#fef3c7" stroke="#d97706"/>
  <text x="270" y="258" font-size="11.5" font-weight="800" fill="#92400e" text-anchor="middle">Special Saturday Event: English Picture Book Reading (14:00–14:45, 1F Children's Room)</text>
  <text x="270" y="276" font-size="11" font-weight="700" fill="#78350f" text-anchor="middle">Sign up at the 1F counter by 13:30 on the day! (Free for all students)</text>
''')

# =========================================================================
# 国語スライド① ja2_1: 複数資料統合読解（中学生の読書形態と目的アンケートグラフ）
# =========================================================================
save("jpn_reading_stats.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】中学生が「紙の本」と「電子書籍」を使い分ける場面（複数回答）</text>
  <text x="18" y="46" font-size="11" font-weight="700" fill="#475569">凡例：■青＝紙の本を選びたい割合 ／ ■橙＝電子書籍を選びたい割合</text>
  <!-- 項目1: じっくり内容を理解し記憶に残したいとき -->
  <text x="24" y="84" font-size="11.5" font-weight="800" fill="#0f172a">内容を深く理解し記憶に残す</text>
  <rect x="195" y="68" width="248" height="22" rx="4" fill="#2563eb"/>
  <text x="450" y="84" font-size="11.5" font-weight="800" fill="#1e40af">紙 78%</text>
  <rect x="195" y="93" width="70" height="16" rx="4" fill="#f97316"/>
  <text x="272" y="106" font-size="10.5" font-weight="800" fill="#c2410c">電子 22%</text>

  <!-- 項目2: 移動中や外出先で手軽に読みたいとき -->
  <text x="24" y="142" font-size="11.5" font-weight="800" fill="#0f172a">移動中や外出先で手軽に読む</text>
  <rect x="195" y="126" width="80" height="16" rx="4" fill="#2563eb"/>
  <text x="282" y="139" font-size="10.5" font-weight="800" fill="#1e40af">紙 25%</text>
  <rect x="195" y="145" width="238" height="22" rx="4" fill="#f97316"/>
  <text x="440" y="161" font-size="11.5" font-weight="800" fill="#c2410c">電子 75%</text>

  <!-- 項目3: わからない語句をすぐ検索しながら読む -->
  <text x="24" y="202" font-size="11.5" font-weight="800" fill="#0f172a">語句をすぐ検索しながら読む</text>
  <rect x="195" y="186" width="60" height="16" rx="4" fill="#2563eb"/>
  <text x="262" y="199" font-size="10.5" font-weight="800" fill="#1e40af">紙 19%</text>
  <rect x="195" y="205" width="258" height="22" rx="4" fill="#f97316"/>
  <text x="460" y="221" font-size="11.5" font-weight="800" fill="#c2410c">電子 81%</text>

  <rect x="24" y="242" width="492" height="42" rx="8" fill="#f8fafc" stroke="#475569"/>
  <text x="270" y="261" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">読み取りの急所：どちらか一方がすべて優れているのではなく、</text>
  <text x="270" y="278" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">【精読・記憶定着＝紙の本】、【携帯性・即時検索＝電子書籍】と目的に応じた使い分けが進んでいる！</text>
''')

# =========================================================================
# 国語スライド② ja3_2: 漢文訓読の返り点（レ点・一二点）と置き字（而・於・矣）
# =========================================================================
save("jpn_kanbun_order.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】漢文訓読の鉄則：「温故而知新」と「不覚暁」の返り点・置き字</text>
  <!-- 左枠: 温故而知新 -->
  <rect x="24" y="46" width="238" height="190" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="143" y="68" font-size="12" font-weight="900" fill="#1e40af" text-anchor="middle">例①『論語』：故きを温ねて新しきを知る</text>
  <!-- 縦書き漢字 -->
  <text x="143" y="96" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">温</text>
  <text x="122" y="106" font-size="11" font-weight="900" fill="#dc2626">レ</text>
  <text x="180" y="96" font-size="11" font-weight="800" fill="#2563eb">②たずねて</text>

  <text x="143" y="126" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">故</text>
  <text x="180" y="126" font-size="11" font-weight="800" fill="#dc2626">①ふるきを</text>

  <rect x="126" y="136" width="34" height="26" rx="5" fill="#fef2f2" stroke="#dc2626" stroke-dasharray="3,2"/>
  <text x="143" y="156" font-size="18" font-weight="900" fill="#dc2626" text-anchor="middle">而</text>
  <text x="196" y="154" font-size="10.5" font-weight="900" fill="#b91c1c">※置き字(読まない！)</text>

  <text x="143" y="186" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">知</text>
  <text x="122" y="196" font-size="11" font-weight="900" fill="#dc2626">レ</text>
  <text x="180" y="186" font-size="11" font-weight="800" fill="#2563eb">④しる</text>

  <text x="143" y="218" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">新</text>
  <text x="185" y="218" font-size="11" font-weight="800" fill="#dc2626">③あたらしきを</text>

  <!-- 右枠: 不遠千里 (一二点＋レ点の代表例：千里を遠しとせず) -->
  <rect x="278" y="46" width="238" height="190" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <text x="397" y="68" font-size="11.5" font-weight="900" fill="#065f46" text-anchor="middle">例②『孟子』：千里を遠しとせず（一二点＋レ）</text>
  <text x="376" y="100" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">不</text>
  <text x="352" y="108" font-size="11.5" font-weight="900" fill="#dc2626">二</text>
  <text x="430" y="100" font-size="11" font-weight="800" fill="#065f46">④〜ず(打消)</text>

  <text x="376" y="136" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">遠</text>
  <text x="430" y="136" font-size="11" font-weight="800" fill="#2563eb">①とほしとせ</text>

  <text x="376" y="174" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">千</text>
  <text x="352" y="182" font-size="11.5" font-weight="900" fill="#dc2626">一</text>
  <text x="430" y="174" font-size="11" font-weight="800" fill="#dc2626">②せん(二字熟語)</text>

  <text x="376" y="212" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">里</text>
  <text x="430" y="212" font-size="11" font-weight="800" fill="#dc2626">③りを ⇒ 一から二へ！</text>

  <rect x="24" y="248" width="492" height="38" rx="8" fill="#fef3c7" stroke="#d97706"/>
  <text x="270" y="272" font-size="11" font-weight="800" fill="#92400e" text-anchor="middle">書き下し文の鉄則：漢字＋送り仮名で書き、【置き字（而・於・矣・乎など）は書き下し文に絶対書かない】！</text>
''')

print("Generated 18 v8 SVG files in", OUT_DIR)
