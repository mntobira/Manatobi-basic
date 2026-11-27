#!/usr/bin/env python3
"""
v7 アルティメット品質ベクター図版ジェネレータ (public/juken_figs/v7/*.svg)
- 数学3組（6枚）：ma2_1 (0またぎ放物線), ma3_4 (直角三角形垂線相似・作図), ma4_2 (ヒストグラム＆累積相対度数)
- 理科5組（10枚）：sc1_1 (BTB光合成対照実験), sc1_2 (心臓4室と循環), sc3_1 (気体3捕集法), sc3_2 (ダニエル電池), sc4_1 (柱状図と鍵層)
- 社会6枚        ：so1_3 (世界6州比較), so1_4 (日本工業帯グラフ), so2_1 (土地制度変遷), so2_4 (東アジア外交年表), so3_1 (三権分立), so3_3 (社会保障4柱)
"""
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "juken_figs", "v7")
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
# 数学① ma2_1: y = 1/2 x^2 の変域 (-2 <= x <= 4) 0またぎの罠
# 原点 O=(230, 245), scale: x 1unit=38px, y 1unit=22px
# x=-2 -> (154, 201), x=0 -> (230, 245), x=4 -> (382, 69)
# =========================================================================
pts = []
for i in range(-32, 46):
    xv = i / 10.0
    yv = 0.5 * xv * xv
    px = 230 + xv * 38
    py = 245 - yv * 22
    if 35 <= py <= 260:
        pts.append(f"{px:.1f},{py:.1f}")
parabola_poly = " ".join(pts)

pts_dom = []
for i in range(-20, 41):
    xv = i / 10.0
    yv = 0.5 * xv * xv
    pts_dom.append(f"{230 + xv * 38:.1f},{245 - yv * 22:.1f}")
dom_poly = " ".join(pts_dom)

for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = f'''
  <rect x="154" y="69" width="228" height="176" fill="#fef2f2" opacity="0.55" stroke="#fca5a5" stroke-dasharray="4,3"/>
  <polyline fill="none" stroke="#dc2626" stroke-width="4.2" points="{dom_poly}"/>
  <!-- 最小値 原点(0,0) -->
  <circle cx="230" cy="245" r="6.5" fill="#dc2626"/>
  <rect x="70" y="252" width="195" height="36" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="167" y="268" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">⚠️ xが0をまたぐ ⇒ 最小値は y＝0！</text>
  <text x="167" y="282" font-size="10.5" font-weight="700" fill="#991b1b" text-anchor="middle">（端点の y＝2 を最小にしない！）</text>
  <!-- 最大値 (4,8) -->
  <line x1="230" y1="69" x2="382" y2="69" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="4,3"/>
  <circle cx="382" cy="69" r="6" fill="#2563eb"/>
  <text x="218" y="73" font-size="12" font-weight="800" fill="#1d4ed8" text-anchor="end">8</text>
  <rect x="332" y="28" width="192" height="34" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="1.5"/>
  <text x="428" y="49" font-size="11.5" font-weight="800" fill="#1e40af" text-anchor="middle">最大値は x＝4 で y＝8 ⇒ 0≦y≦8</text>
  <!-- 左端 (-2,2) -->
  <line x1="154" y1="201" x2="230" y2="201" stroke="#64748b" stroke-width="1.4" stroke-dasharray="3,3"/>
  <circle cx="154" cy="201" r="5" fill="#64748b"/>
  <text x="242" y="205" font-size="11" font-weight="700" fill="#475569">2</text>
'''
    save(f"math_parabola_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">関数 y＝(1/2)x² （変域 −2 ≦ x ≦ 4）と変化の割合</text>
  <line x1="60" y1="245" x2="465" y2="245" stroke="#334155" stroke-width="1.8" marker-end="url(#arr-slate)"/>
  <line x1="230" y1="275" x2="230" y2="32" stroke="#334155" stroke-width="1.8" marker-end="url(#arr-slate)"/>
  <text x="472" y="249" font-size="12" font-weight="800" fill="#334155">x</text>
  <text x="238" y="40" font-size="12" font-weight="800" fill="#334155">y</text>
  <text x="218" y="260" font-size="11.5" font-weight="700" fill="#334155">O</text>
  <!-- x目盛り -2, 4 -->
  <line x1="154" y1="241" x2="154" y2="249" stroke="#334155" stroke-width="1.8"/>
  <text x="154" y="263" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">−2</text>
  <line x1="382" y1="241" x2="382" y2="249" stroke="#334155" stroke-width="1.8"/>
  <text x="382" y="263" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">4</text>
  <polyline fill="none" stroke="#0f172a" stroke-width="2.4" points="{parabola_poly}"/>
  {ann}
''')

# =========================================================================
# 数学② ma3_4: 直角三角形 ABC (∠A=90°, AB=6, AC=8, BC=10) と垂線 AH
# B=(75, 235), C=(355, 235) => BC=280 (10cm -> 28px/cm)
# BH = 3.6cm -> 100.8px => H=(175.8, 235), AH = 4.8cm -> 134.4px => A=(175.8, 100.6)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 角度印: ●と×で相似を示す -->
  <text x="108" y="227" font-size="12" font-weight="800" fill="#dc2626">●</text>
  <text x="163" y="136" font-size="12" font-weight="800" fill="#2563eb">×</text>
  <text x="183" y="136" font-size="12" font-weight="800" fill="#dc2626">●</text>
  <text x="315" y="227" font-size="12" font-weight="800" fill="#2563eb">×</text>
  <!-- 解説カード -->
  <rect x="350" y="52" width="176" height="145" rx="10" fill="#f8fafc" stroke="#2563eb" stroke-width="1.6"/>
  <text x="438" y="72" font-size="11.5" font-weight="800" fill="#1e40af" text-anchor="middle">3つの直角三角形がすべて相似！</text>
  <text x="360" y="92" font-size="11" font-weight="700" fill="#0f172a">△ABC ∽ △HBA ∽ △HAC</text>
  <text x="360" y="112" font-size="11" font-weight="700" fill="#dc2626">① 面積逆算で AH 一発：</text>
  <text x="366" y="128" font-size="11" font-weight="800" fill="#dc2626">6×8 ＝ 10×AH ⇒ AH＝4.8cm</text>
  <text x="360" y="149" font-size="11" font-weight="700" fill="#2563eb">② 相似比で BH：</text>
  <text x="366" y="165" font-size="11" font-weight="800" fill="#2563eb">AB²＝BH×BC ⇒ 36＝10BH</text>
  <text x="366" y="182" font-size="11" font-weight="800" fill="#15803d">∴ BH＝3.6cm, CH＝6.4cm</text>
  <text x="192" y="178" font-size="12" font-weight="800" fill="#dc2626">4.8cm</text>
'''
    save(f"math_rt_sim_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">直角三角形の頂点Aから斜辺BCにおろした垂線AH（3重相似）</text>
  <polygon points="176,101 75,235 355,235" fill="#f8fafc" stroke="#0f172a" stroke-width="2.5"/>
  <line x1="176" y1="101" x2="176" y2="235" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="5,3"/>
  <!-- 直角マーク A と H -->
  <polyline points="166,114 179,124 189,111" fill="none" stroke="#0f172a" stroke-width="1.6"/>
  <polyline points="176,223 188,223 188,235" fill="none" stroke="#dc2626" stroke-width="1.6"/>
  <text x="176" y="91" font-size="13" font-weight="800" fill="#0f172a" text-anchor="middle">A (90°)</text>
  <text x="60" y="242" font-size="13" font-weight="800" fill="#0f172a">B</text>
  <text x="364" y="242" font-size="13" font-weight="800" fill="#0f172a">C</text>
  <text x="176" y="253" font-size="12.5" font-weight="800" fill="#dc2626" text-anchor="middle">H</text>
  <text x="108" y="162" font-size="12" font-weight="800" fill="#334155">6 cm</text>
  <text x="275" y="160" font-size="12" font-weight="800" fill="#334155">8 cm</text>
  <text x="215" y="274" font-size="12" font-weight="800" fill="#334155" text-anchor="middle">BC ＝ 10 cm</text>
  {ann}
''')

# =========================================================================
# 数学③ ma4_2: 度数分布ヒストグラム（全20人）と中央値・累積相対度数
# 階級: 0-10(2人), 10-20(5人), 20-30(7人), 30-40(4人), 40-50(2人) 計20人
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        # 累積相対度数: 2/20=0.10, 7/20=0.35, 14/20=0.70, 18/20=0.90, 20/20=1.00
        # 右軸 0.0 -> y=235, 1.0 -> y=65 (height 170)
        # x右端: 10->150, 20->220, 30->290, 40->360, 50->430
        ann = '''
  <!-- 中央値が含まれる20〜30分階級をハイライト -->
  <rect x="220" y="95" width="70" height="140" fill="#fde68a" opacity="0.65" stroke="#d97706" stroke-width="2.4"/>
  <!-- 累積相対度数折れ線 -->
  <polyline fill="none" stroke="#dc2626" stroke-width="3" points="80,235 150,218 220,175.5 290,116 360,82 430,65"/>
  <circle cx="150" cy="218" r="4.5" fill="#dc2626"/>
  <circle cx="220" cy="175.5" r="4.5" fill="#dc2626"/>
  <circle cx="290" cy="116" r="5.5" fill="#dc2626"/>
  <circle cx="360" cy="82" r="4.5" fill="#dc2626"/>
  <circle cx="430" cy="65" r="4.5" fill="#dc2626"/>
  <text x="292" y="106" font-size="11" font-weight="800" fill="#dc2626" text-anchor="middle">累積 14/20＝0.70</text>
  <rect x="155" y="34" width="365" height="40" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
  <text x="337" y="51" font-size="11" font-weight="800" fill="#92400e" text-anchor="middle">全20人の中央値＝【10番目と11番目の平均】</text>
  <text x="337" y="67" font-size="10.5" font-weight="700" fill="#b45309" text-anchor="middle">累積：2人 → 7人 → 14人 なので10・11番目は【20〜30分】階級！（階級値25分）</text>
'''
    save(f"math_hist_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">生徒20人の通学時間のヒストグラム（度数分布）</text>
  <!-- 軸 -->
  <line x1="80" y1="235" x2="460" y2="235" stroke="#334155" stroke-width="1.8"/>
  <line x1="80" y1="235" x2="80" y2="55" stroke="#334155" stroke-width="1.8"/>
  <!-- 横グリッド (1人=20px: 2人=40, 4人=80, 6人=120, 8人=160) -->
  <line x1="80" y1="195" x2="445" y2="195" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="155" x2="445" y2="155" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="115" x2="445" y2="115" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="80" y1="75" x2="445" y2="75" stroke="#e2e8f0" stroke-width="1"/>
  <text x="70" y="239" font-size="11" fill="#475569" text-anchor="end">0</text>
  <text x="70" y="199" font-size="11" fill="#475569" text-anchor="end">2</text>
  <text x="70" y="159" font-size="11" fill="#475569" text-anchor="end">4</text>
  <text x="70" y="119" font-size="11" fill="#475569" text-anchor="end">6</text>
  <text x="70" y="79" font-size="11" fill="#475569" text-anchor="end">8(人)</text>
  <!-- 棒: 2, 5, 7, 4, 2 -->
  <rect x="80" y="195" width="70" height="40" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.6"/>
  <rect x="150" y="135" width="70" height="100" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.6"/>
  <rect x="220" y="95" width="70" height="140" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.6"/>
  <rect x="290" y="155" width="70" height="80" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.6"/>
  <rect x="360" y="195" width="70" height="40" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.6"/>
  <text x="115" y="189" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">2人</text>
  <text x="185" y="129" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">5人</text>
  <text x="255" y="89" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">7人</text>
  <text x="325" y="149" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">4人</text>
  <text x="395" y="189" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">2人</text>
  <!-- xラベル -->
  <text x="80" y="253" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">0</text>
  <text x="150" y="253" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">10</text>
  <text x="220" y="253" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">20</text>
  <text x="290" y="253" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">30</text>
  <text x="360" y="253" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">40</text>
  <text x="430" y="253" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">50(分)</text>
  <text x="260" y="280" font-size="11.5" font-weight="700" fill="#475569" text-anchor="middle">階級（以上〜未満） ／ 合計 20人</text>
  {ann}
''')

# =========================================================================
# 理科① sc1_1: 光合成と呼吸のBTB液4本対照実験（緑色スタート）
# A: オオカナダモ＋光, B: 光のみ(対照), C: オオカナダモ＋アルミ箔, D: アルミ箔のみ
# =========================================================================
for mode in ("q", "ans"):
    tubes_svg = ""
    specs = [
        ("A", 85, "水草あり", "光あり☀️", "#bae6fd" if mode == "ans" else "#bbf7d0", "青色(アルカリ)" if mode == "ans" else "開始:緑色"),
        ("B", 205, "水草なし", "光あり☀️", "#bbf7d0", "緑色のまま(対照)" if mode == "ans" else "開始:緑色"),
        ("C", 325, "水草あり", "アルミ箔🌑", "#fef08a" if mode == "ans" else "#bbf7d0", "黄色(酸性)" if mode == "ans" else "開始:緑色"),
        ("D", 445, "水草なし", "アルミ箔🌑", "#bbf7d0", "緑色のまま(対照)" if mode == "ans" else "開始:緑色"),
    ]
    for label, cx, leaf, light, liq_color, res_txt in specs:
        foil = f'<rect x="{cx-26}" y="72" width="52" height="128" rx="6" fill="#94a3b8" opacity="0.45" stroke="#475569" stroke-width="2" stroke-dasharray="4,2"/>' if "アルミ" in light else ""
        plant = f'<path d="M{cx},188 Q{cx-8},155 {cx+5},125 Q{cx-6},145 {cx+9},165" fill="none" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>' if "あり" in leaf else ""
        tubes_svg += f'''
  <text x="{cx}" y="58" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">試験管 {label}</text>
  <rect x="{cx-22}" y="75" width="44" height="122" rx="18" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
  <rect x="{cx-20}" y="102" width="40" height="93" rx="15" fill="{liq_color}"/>
  <rect x="{cx-16}" y="66" width="32" height="12" rx="3" fill="#78350f"/>
  {plant}
  {foil}
  <text x="{cx}" y="216" font-size="11" font-weight="800" fill="#1e293b" text-anchor="middle">{leaf}</text>
  <text x="{cx}" y="232" font-size="11" font-weight="700" fill="#475569" text-anchor="middle">{light}</text>
  <text x="{cx}" y="252" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">{res_txt}</text>
'''
    ann = ""
    if mode == "ans":
        ann = '''
  <rect x="25" y="262" width="490" height="30" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
  <text x="270" y="281" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">A：光合成＞呼吸でCO₂減 ⇒ 青色！ ／ C：呼吸のみでCO₂増 ⇒ 黄色！ ／ B・D：水草以外の影響否定（対照実験）</text>
'''
    save(f"sci_btb_{mode}.svg", f'''
  <text x="18" y="26" font-size="13" font-weight="800" fill="#0f172a">息を吹き込んで【緑色】にしたBTB液とオオカナダモの対照実験</text>
  {tubes_svg}
  {ann}
''')

# =========================================================================
# 理科② sc1_2: ヒトの心臓4室と肺循環・体循環・小腸→肝門脈→肝臓・腎臓
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <rect x="18" y="246" width="504" height="44" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.4"/>
  <text x="270" y="264" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">⚠️ 最重要ひっかけ：【肺静脈（B）】＝酸素最多の動脈血！ ／ 【肺動脈（A）】＝静脈血！</text>
  <text x="270" y="281" font-size="10.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">食後養分最多＝【小腸→肝臓（肝門脈 E）】 ／ 尿素最少＝【腎臓を出た直後の静脈】</text>
'''
    col_art = "#ef4444" if mode == "ans" else "#64748b"
    col_vein = "#3b82f6" if mode == "ans" else "#64748b"
    save(f"sci_heart_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">ヒトの血液循環（肺・心臓の4つの部屋・小腸・肝臓・腎臓）</text>
  <!-- 肺 -->
  <rect x="205" y="38" width="130" height="36" rx="14" fill="#fce7f3" stroke="#db2777" stroke-width="2"/>
  <text x="270" y="61" font-size="12.5" font-weight="800" fill="#9d174d" text-anchor="middle">肺（肺胞）</text>
  <!-- 心臓 (正面から見た図: 左側が右心房・右心室、右側が左心房・左心室) -->
  <rect x="195" y="102" width="150" height="84" rx="14" fill="#fff1f2" stroke="#e11d48" stroke-width="2.2"/>
  <line x1="270" y1="102" x2="270" y2="186" stroke="#e11d48" stroke-width="2"/>
  <line x1="195" y1="144" x2="345" y2="144" stroke="#e11d48" stroke-width="1.6" stroke-dasharray="3,2"/>
  <text x="232" y="128" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">右心房</text>
  <text x="232" y="170" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">右心室</text>
  <text x="308" y="128" font-size="11.5" font-weight="800" fill="#991b1b" text-anchor="middle">左心房</text>
  <text x="308" y="170" font-size="11.5" font-weight="800" fill="#991b1b" text-anchor="middle">左心室</text>
  <!-- 肺動脈 A (右心室->肺) & 肺静脈 B (肺->左心房) -->
  <path d="M215,155 L145,155 L145,56 L202,56" fill="none" stroke="{col_vein}" stroke-width="3" marker-end="url(#arr-blue)"/>
  <text x="112" y="96" font-size="11.5" font-weight="800" fill="#1e40af">血管A(肺動脈)</text>
  <path d="M338,56 L395,56 L395,122 L348,122" fill="none" stroke="{col_art}" stroke-width="3" marker-end="url(#arr-red)"/>
  <text x="405" y="96" font-size="11.5" font-weight="800" fill="#b91c1c">血管B(肺静脈)</text>
  <!-- 大動脈 C (左心室->全身) & 大静脈 D (全身->右心房) -->
  <path d="M328,186 L328,215 L455,215 L455,155" fill="none" stroke="{col_art}" stroke-width="3"/>
  <text x="408" y="232" font-size="11.5" font-weight="800" fill="#b91c1c">C(大動脈)</text>
  <path d="M90,155 L90,215 L195,215 L212,186" fill="none" stroke="{col_vein}" stroke-width="3"/>
  <text x="95" y="232" font-size="11.5" font-weight="800" fill="#1e40af">D(大静脈)</text>
  <!-- 小腸 -> 肝門脈 E -> 肝臓 / 腎臓 -->
  <rect x="420" y="128" width="95" height="28" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>
  <text x="467" y="146" font-size="11" font-weight="800" fill="#92400e" text-anchor="middle">小腸→E→肝臓</text>
  <rect x="35" y="128" width="88" height="28" rx="7" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.6"/>
  <text x="79" y="146" font-size="11" font-weight="800" fill="#3730a3" text-anchor="middle">腎臓(尿素こし)</text>
  {ann}
''')

# =========================================================================
# 理科③ sc3_1: 気体の捕集法3種類（ア 水上置換 / イ 上方置換 / ウ 下方置換）
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <text x="95" y="235" font-size="11" font-weight="800" fill="#0369a1" text-anchor="middle">【ア 水上置換法】</text>
  <text x="95" y="252" font-size="10.5" font-weight="700" fill="#0f172a" text-anchor="middle">水に溶けにくい気体</text>
  <text x="95" y="268" font-size="11" font-weight="800" fill="#dc2626" text-anchor="middle">O₂・H₂・N₂（純度最高！）</text>

  <text x="275" y="235" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle">【イ 上方置換法】</text>
  <text x="275" y="252" font-size="10.5" font-weight="700" fill="#0f172a" text-anchor="middle">水に非常に溶け＋空気より軽い</text>
  <text x="275" y="268" font-size="11" font-weight="800" fill="#dc2626" text-anchor="middle">アンモニア NH₃ 唯一！</text>

  <text x="450" y="235" font-size="11" font-weight="800" fill="#b45309" text-anchor="middle">【ウ 下方置換法】</text>
  <text x="450" y="252" font-size="10.5" font-weight="700" fill="#0f172a" text-anchor="middle">水に溶けやすく＋空気より重い</text>
  <text x="450" y="268" font-size="11" font-weight="800" fill="#dc2626" text-anchor="middle">Cl₂・HCl・(CO₂も可)</text>
'''
    save(f"sci_gas_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">気体の集め方3種類（ア・イ・ウ）とガラス管の位置</text>
  <!-- ア 水上置換 -->
  <text x="95" y="52" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">ア</text>
  <rect x="42" y="145" width="106" height="65" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <rect x="73" y="78" width="44" height="92" rx="6" fill="#ffffff" stroke="#334155" stroke-width="2"/>
  <rect x="75" y="135" width="40" height="34" fill="#bae6fd"/>
  <polyline points="35,190 95,190 95,162" fill="none" stroke="#dc2626" stroke-width="3"/>
  <circle cx="95" cy="148" r="3.5" fill="#ffffff" stroke="#0284c7"/>
  <circle cx="99" cy="130" r="4" fill="#ffffff" stroke="#0284c7"/>

  <!-- イ 上方置換 (逆さまびん奥まで) -->
  <text x="275" y="52" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">イ</text>
  <rect x="250" y="75" width="50" height="95" rx="6" fill="#f0fdf4" stroke="#15803d" stroke-width="2"/>
  <line x1="250" y1="170" x2="300" y2="170" stroke="#ffffff" stroke-width="4"/>
  <polyline points="225,200 275,200 275,88" fill="none" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)"/>

  <!-- ウ 下方置換 (上向きびん底まで) -->
  <text x="450" y="52" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">ウ</text>
  <rect x="425" y="110" width="50" height="95" rx="6" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
  <line x1="425" y1="110" x2="475" y2="110" stroke="#ffffff" stroke-width="4"/>
  <polyline points="400,82 450,82 450,192" fill="none" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)"/>
  {ann}
''')

# =========================================================================
# 理科④ sc3_2: ダニエル電池（亜鉛板＋硫酸亜鉛水溶液 ｜素焼き｜ 銅板＋硫酸銅水溶液）
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 電子 e- の流れ Zn -> Cu -->
  <path d="M165,58 L375,58" fill="none" stroke="#dc2626" stroke-width="3.2" marker-end="url(#arr-red)"/>
  <text x="270" y="48" font-size="12" font-weight="800" fill="#dc2626" text-anchor="middle">電子 e⁻ の向き（亜鉛 −極 → 銅 ＋極）</text>
  <text x="155" y="92" font-size="12.5" font-weight="900" fill="#2563eb" text-anchor="middle">−極</text>
  <text x="385" y="92" font-size="12.5" font-weight="900" fill="#dc2626" text-anchor="middle">＋極</text>
  <!-- 反応式ラベル -->
  <rect x="36" y="246" width="222" height="42" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>
  <text x="147" y="263" font-size="10.5" font-weight="800" fill="#1e40af" text-anchor="middle">−極：Zn → Zn²⁺ ＋ 2e⁻（溶けてボロボロ）</text>
  <text x="147" y="280" font-size="10.5" font-weight="700" fill="#1e3a8a" text-anchor="middle">SO₄²⁻ が素焼きを通って左へ移動</text>
  <rect x="278" y="246" width="232" height="42" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="394" y="263" font-size="10.5" font-weight="800" fill="#b91c1c" text-anchor="middle">＋極：Cu²⁺ ＋ 2e⁻ → Cu（赤色の銅が付着！）</text>
  <text x="394" y="280" font-size="10.5" font-weight="700" fill="#991b1b" text-anchor="middle">Cu²⁺ が減るため青色がうすくなる</text>
'''
    save(f"sci_daniel_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">ダニエル電池のしくみ（亜鉛板・銅板・素焼きの容器）</text>
  <!-- 水槽 -->
  <rect x="95" y="112" width="350" height="122" rx="8" fill="#f8fafc" stroke="#334155" stroke-width="2.2"/>
  <!-- 左液: ZnSO4 (無色) / 右液: CuSO4 (青色) -->
  <rect x="97" y="135" width="171" height="97" fill="#f1f5f9"/>
  <rect x="272" y="135" width="171" height="97" fill="#93c5fd"/>
  <!-- 素焼きの仕切り -->
  <line x1="270" y1="115" x2="270" y2="234" stroke="#a16207" stroke-width="6" stroke-dasharray="6,3"/>
  <text x="270" y="128" font-size="10.5" font-weight="800" fill="#854d0e" text-anchor="middle">素焼き板</text>
  <!-- 亜鉛板 Zn & 銅板 Cu -->
  <rect x="142" y="98" width="26" height="112" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
  <text x="155" y="162" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">Zn</text>
  <rect x="372" y="98" width="26" height="112" fill="#fdba74" stroke="#c2410c" stroke-width="2"/>
  <text x="385" y="162" font-size="11.5" font-weight="800" fill="#7c2d12" text-anchor="middle">Cu</text>
  <!-- 導線と電子オルゴール M -->
  <polyline points="155,98 155,68 245,68" fill="none" stroke="#334155" stroke-width="2"/>
  <polyline points="295,68 385,68 385,98" fill="none" stroke="#334155" stroke-width="2"/>
  <circle cx="270" cy="68" r="18" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
  <text x="270" y="73" font-size="12" font-weight="800" fill="#854d0e" text-anchor="middle">M</text>
  <text x="180" y="224" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">硫酸亜鉛水溶液</text>
  <text x="360" y="224" font-size="11" font-weight="700" fill="#1e3a8a" text-anchor="middle">硫酸銅水溶液(青)</text>
  {ann}
''')

# =========================================================================
# 理科⑤ sc4_1: 3地点（A・B・C）のボーリング柱状図と火山灰（鍵層）の対比
# A(標高40m): 凝灰岩が深さ10〜15m => 標高25〜30m
# B(標高50m): 凝灰岩が深さ20〜25m => 標高25〜30m（東西は水平！）
# C(標高30m、Aの南): 凝灰岩が深さ15〜20m => 標高10〜15m（南へ15m低くなる！）
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 鍵層の対比ライン -->
  <line x1="138" y1="115" x2="252" y2="145" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="4,3"/>
  <line x1="298" y1="145" x2="412" y2="130" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="4,3"/>
  <rect x="22" y="236" width="496" height="54" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="270" y="254" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">鉄則：【地表からの深さ】ではなく【標高＝地表標高 − 深さ】に直して鍵層（凝灰岩）を比べる！</text>
  <text x="270" y="272" font-size="10.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">凝灰岩上面の標高 ⇒ A：40−10＝30m ／ B(東)：50−20＝30m ／ C(南)：30−15＝15m ∴【南へ低くなる】！</text>
'''
    def col_draw(cx, title, elev, tuff_top_m):
        # 1m = 3px, height 30m = 90px, top y=85
        ty = 85 + tuff_top_m * 3
        return f'''
  <text x="{cx}" y="54" font-size="12.5" font-weight="800" fill="#0f172a" text-anchor="middle">{title}</text>
  <text x="{cx}" y="71" font-size="11" font-weight="800" fill="#2563eb" text-anchor="middle">地表標高 {elev}m</text>
  <rect x="{cx-23}" y="85" width="46" height="120" fill="#fefce8" stroke="#334155" stroke-width="2"/>
  <rect x="{cx-23}" y="85" width="46" height="{tuff_top_m*3}" fill="#fde68a" stroke="#334155" stroke-width="1.2"/>
  <rect x="{cx-23}" y="{ty}" width="46" height="15" fill="#fca5a5" stroke="#dc2626" stroke-width="1.8"/>
  <rect x="{cx-23}" y="{ty+15}" width="46" height="{120 - tuff_top_m*3 - 15}" fill="#cbd5e1" stroke="#334155" stroke-width="1.2"/>
  <text x="{cx+30}" y="89" font-size="10" fill="#475569">0m</text>
  <text x="{cx+30}" y="{ty+4}" font-size="10.5" font-weight="800" fill="#dc2626">{tuff_top_m}m</text>
  <text x="{cx+30}" y="{ty+19}" font-size="10" font-weight="700" fill="#dc2626">{tuff_top_m+5}m</text>
  <text x="{cx}" y="{ty+11}" font-size="9.5" font-weight="800" fill="#7f1d1d" text-anchor="middle">凝灰岩</text>
'''
    save(f"sci_strata_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">3地点A・B(Aの真東)・C(Aの真南)の柱状図（深さ目盛り）</text>
  {col_draw(115, "A地点(基準)", 40, 10)}
  {col_draw(275, "B地点(Aの東)", 50, 20)}
  {col_draw(435, "C地点(Aの南)", 30, 15)}
  <text x="270" y="224" font-size="11" font-weight="700" fill="#475569" text-anchor="middle">凡例：上層＝砂岩（黄） ／ 赤帯＝凝灰岩（火山灰・鍵層：厚さ5m） ／ 下層＝泥岩（灰）</text>
  {ann}
''')

# =========================================================================
# 社会スライド図版6枚 (so1_3, so1_4, so2_1, so2_4, so3_1, so3_3)
# =========================================================================
# 1. so1_3: 世界6州の人口シェアと特徴マトリクス
save("soc_world6.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】世界6州の人口割合（約80億人）と最重要キーワード</text>
  <!-- 帯グラフ (x=30..510, width=480) アジア59%(283), アフリカ18%(86), 欧州9%(43), 南米+中米8%(38), 北米5%(24), オセアニア1%(6) -->
  <rect x="30" y="45" width="283" height="44" fill="#fb7185" stroke="#ffffff" stroke-width="1.5"/>
  <rect x="313" y="45" width="86" height="44" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5"/>
  <rect x="399" y="45" width="43" height="44" fill="#60a5fa" stroke="#ffffff" stroke-width="1.5"/>
  <rect x="442" y="45" width="38" height="44" fill="#34d399" stroke="#ffffff" stroke-width="1.5"/>
  <rect x="480" y="45" width="24" height="44" fill="#a78bfa" stroke="#ffffff" stroke-width="1.5"/>
  <rect x="504" y="45" width="6" height="44" fill="#94a3b8" stroke="#ffffff" stroke-width="1"/>
  <text x="171" y="72" font-size="12.5" font-weight="900" fill="#ffffff" text-anchor="middle">アジア州 約59%（中国・インド等）</text>
  <text x="356" y="72" font-size="11" font-weight="900" fill="#78350f" text-anchor="middle">アフリカ18%</text>
  <text x="420" y="72" font-size="10" font-weight="800" fill="#1e3a8a" text-anchor="middle">欧9%</text>
  <!-- 6州カード -->
  <rect x="26" y="106" width="236" height="54" rx="8" fill="#fff1f2" stroke="#f43f5e"/>
  <text x="36" y="125" font-size="11.5" font-weight="800" fill="#9f1239">アジア：モンスーン稲作・ASEAN・インドIT</text>
  <text x="36" y="145" font-size="10.5" fill="#4c0519">西アジア＝ペルシャ湾原油・イスラム教</text>

  <rect x="276" y="106" width="238" height="54" rx="8" fill="#fffbeb" stroke="#f59e0b"/>
  <text x="286" y="125" font-size="11.5" font-weight="800" fill="#92400e">アフリカ：モノカルチャー経済・レアメタル</text>
  <text x="286" y="145" font-size="10.5" fill="#451a03">カカオ(コートジボワール/ガーナ)・植民地国境</text>

  <rect x="26" y="170" width="236" height="54" rx="8" fill="#eff6ff" stroke="#3b82f6"/>
  <text x="36" y="189" font-size="11.5" font-weight="800" fill="#1e40af">欧州：EU単一通貨ユーロ・混合/地中海式農業</text>
  <text x="36" y="209" font-size="10.5" fill="#172554">偏西風＋北大西洋海流で高緯度でも温暖！</text>

  <rect x="276" y="170" width="238" height="54" rx="8" fill="#f5f3ff" stroke="#8b5cf6"/>
  <text x="286" y="189" font-size="11.5" font-weight="800" fill="#5b21b6">北米：適地適作・アグリビジネス・シリコンバレー</text>
  <text x="286" y="209" font-size="10.5" fill="#2e1065">西経100度線（年降水量500mm）が農業境界！</text>

  <rect x="26" y="234" width="236" height="52" rx="8" fill="#ecfdf5" stroke="#10b981"/>
  <text x="36" y="253" font-size="11.5" font-weight="800" fill="#065f46">南米：アマゾン熱帯林・バイオエタノール・鉄鉱石</text>
  <text x="36" y="272" font-size="10.5" fill="#022c22">アンデス高地（インカ文明・リャマ/ジャガイモ）</text>

  <rect x="276" y="234" width="238" height="52" rx="8" fill="#f8fafc" stroke="#64748b"/>
  <text x="286" y="253" font-size="11.5" font-weight="800" fill="#334155">オセアニア：鉄鉱石(西)・石炭(東)露天掘り</text>
  <text x="286" y="272" font-size="10.5" fill="#0f172a">白豪主義撤廃→多文化社会・APECアジア結びつき</text>
''')

# 2. so1_4: 日本の主要工業地帯・地域の出荷額内訳比較（機械・化学・食料品）
save("soc_industry_jp.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】日本の主な工業地帯・地域の製造品出荷額内訳の特徴</text>
  <text x="18" y="45" font-size="11" font-weight="700" fill="#475569">凡例：■青＝機械工業 ／ ■橙＝化学工業 ／ ■黄＝金属工業 ／ ■緑＝食料品・その他</text>
  <!-- ア 中京 (機械約68%・全国1位) -->
  <text x="24" y="84" font-size="12" font-weight="800" fill="#0f172a">ア（出荷額1位）</text>
  <rect x="135" y="67" width="258" height="26" fill="#2563eb"/><rect x="393" y="67" width="35" height="26" fill="#f97316"/><rect x="428" y="67" width="42" height="26" fill="#eab308"/><rect x="470" y="67" width="45" height="26" fill="#22c55e"/>
  <text x="264" y="85" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">機械 約68%（自動車：豊田市）</text>

  <!-- イ 阪神 (金属・化学バランス) -->
  <text x="24" y="132" font-size="12" font-weight="800" fill="#0f172a">イ（中小工場多）</text>
  <rect x="135" y="115" width="145" height="26" fill="#2563eb"/><rect x="280" y="115" width="65" height="26" fill="#f97316"/><rect x="345" y="115" width="88" height="26" fill="#eab308"/><rect x="433" y="115" width="82" height="26" fill="#22c55e"/>
  <text x="207" y="133" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">機械 38%</text><text x="389" y="133" font-size="11" font-weight="800" fill="#713f12" text-anchor="middle">金属 23%</text>

  <!-- ウ 京葉・瀬戸内 (化学割合高い) -->
  <text x="24" y="180" font-size="12" font-weight="800" fill="#0f172a">ウ（臨海コンビナート）</text>
  <rect x="135" y="163" width="95" height="26" fill="#2563eb"/><rect x="230" y="163" width="145" height="26" fill="#f97316"/><rect x="375" y="163" width="65" height="26" fill="#eab308"/><rect x="440" y="163" width="75" height="26" fill="#22c55e"/>
  <text x="302" y="181" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">石油化学 約38%突出！</text>

  <!-- エ 北海道 (食料品突出) -->
  <text x="24" y="228" font-size="12" font-weight="800" fill="#0f172a">エ（酪農・畑作圏）</text>
  <rect x="135" y="211" width="60" height="26" fill="#2563eb"/><rect x="195" y="211" width="42" height="26" fill="#f97316"/><rect x="237" y="211" width="48" height="26" fill="#eab308"/><rect x="285" y="211" width="230" height="26" fill="#22c55e"/>
  <text x="400" y="229" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">食料品 約42%突出！</text>

  <rect x="24" y="252" width="492" height="36" rx="8" fill="#eff6ff" stroke="#2563eb"/>
  <text x="270" y="275" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">見分けの鉄則：機械7割＆総額1位＝【中京】／ 化学大＝【京葉・瀬戸内】／ 印刷大＝【京浜】／ 食料品大＝【北海道・九州】</text>
''')

# 3. so2_1: 古代〜近世 土地制度の変遷フロー
save("soc_land_history.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】日本の土地制度の変遷（公地公民 → 荘園 → 太閤検地 → 地租改正）</text>
  <!-- 5ステップフロー -->
  <rect x="20" y="55" width="150" height="86" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="95" y="76" font-size="12" font-weight="900" fill="#1e40af" text-anchor="middle">① 飛鳥・奈良前半</text>
  <text x="95" y="96" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">大化の改新(645)→班田収授法</text>
  <text x="95" y="115" font-size="10.5" fill="#334155" text-anchor="middle">【公地公民】6歳以上に口分田</text>
  <text x="95" y="131" font-size="10.5" fill="#dc2626" font-weight="700" text-anchor="middle">租・調・庸の税負担で逃亡増</text>

  <line x1="172" y1="98" x2="193" y2="98" stroke="#334155" stroke-width="2.4" marker-end="url(#arr-slate)"/>

  <rect x="195" y="55" width="150" height="86" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="270" y="76" font-size="12" font-weight="900" fill="#92400e" text-anchor="middle">② 743年〜平安</text>
  <text x="270" y="96" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">墾田永年私財法(743)</text>
  <text x="270" y="115" font-size="10.5" fill="#334155" text-anchor="middle">開墾地の永久私有を公認！</text>
  <text x="270" y="131" font-size="10.5" fill="#dc2626" font-weight="700" text-anchor="middle">⇒ 貴族・寺社の【荘園】拡大</text>

  <line x1="347" y1="98" x2="368" y2="98" stroke="#334155" stroke-width="2.4" marker-end="url(#arr-slate)"/>

  <rect x="370" y="55" width="150" height="86" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <text x="445" y="76" font-size="12" font-weight="900" fill="#065f46" text-anchor="middle">③ 鎌倉〜室町</text>
  <text x="445" y="96" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">国ごとに守護・荘園に地頭</text>
  <text x="445" y="115" font-size="10.5" fill="#334155" text-anchor="middle">1185年 源頼朝が全国設置</text>
  <text x="445" y="131" font-size="10.5" fill="#065f46" font-weight="700" text-anchor="middle">御恩（新恩給与）と奉公</text>

  <rect x="75" y="172" width="185" height="96" rx="10" fill="#fff1f2" stroke="#e11d48" stroke-width="2"/>
  <text x="167" y="194" font-size="12" font-weight="900" fill="#9f1239" text-anchor="middle">④ 安土桃山（豊臣秀吉）</text>
  <text x="167" y="214" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">太閤検地 ＆ 刀狩(1588)</text>
  <text x="167" y="233" font-size="10.5" fill="#334155" text-anchor="middle">全国統一基準【石高】で測量</text>
  <text x="167" y="252" font-size="11" font-weight="800" fill="#dc2626" text-anchor="middle">【荘園制が完全消滅】＋兵農分離！</text>

  <line x1="262" y1="220" x2="288" y2="220" stroke="#334155" stroke-width="2.4" marker-end="url(#arr-slate)"/>

  <rect x="292" y="172" width="185" height="96" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="2"/>
  <text x="384" y="194" font-size="12" font-weight="900" fill="#5b21b6" text-anchor="middle">⑤ 明治維新（1873年）</text>
  <text x="384" y="214" font-size="11.5" font-weight="800" fill="#0f172a" text-anchor="middle">地租改正（地券交付）</text>
  <text x="384" y="233" font-size="10.5" fill="#334155" text-anchor="middle">収穫高→【地価の3%】を【現金】で</text>
  <text x="384" y="252" font-size="11" font-weight="800" fill="#5b21b6" text-anchor="middle">土地所有者（地主）が納税！</text>
''')

# 4. so2_4: 日中・東アジア外交2000年タイムライン
save("soc_diplomacy_tl.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】日本と中国・朝鮮半島の外交2000年タイムライン</text>
  <line x1="30" y1="145" x2="510" y2="145" stroke="#1e293b" stroke-width="3" marker-end="url(#arr-slate)"/>
  <!-- 上段マーカー -->
  <circle cx="65" cy="145" r="6" fill="#2563eb"/><line x1="65" y1="145" x2="65" y2="85" stroke="#2563eb" stroke-width="1.8"/>
  <rect x="20" y="45" width="95" height="42" rx="6" fill="#eff6ff" stroke="#2563eb"/>
  <text x="67" y="62" font-size="10.5" font-weight="800" fill="#1e40af" text-anchor="middle">57年 漢委奴国王金印</text>
  <text x="67" y="78" font-size="10" fill="#334155" text-anchor="middle">239年 卑弥呼→魏</text>

  <circle cx="165" cy="145" r="6" fill="#dc2626"/><line x1="165" y1="145" x2="165" y2="195" stroke="#dc2626" stroke-width="1.8"/>
  <rect x="112" y="195" width="110" height="46" rx="6" fill="#fef2f2" stroke="#dc2626"/>
  <text x="167" y="213" font-size="10.5" font-weight="800" fill="#b91c1c" text-anchor="middle">607 遣隋使(小野妹子)</text>
  <text x="167" y="230" font-size="10" fill="#334155" text-anchor="middle">630〜894 遣唐使(菅原道真)</text>

  <circle cx="265" cy="145" r="6" fill="#d97706"/><line x1="265" y1="145" x2="265" y2="85" stroke="#d97706" stroke-width="1.8"/>
  <rect x="205" y="45" width="122" height="42" rx="6" fill="#fffbeb" stroke="#d97706"/>
  <text x="266" y="62" font-size="10.5" font-weight="800" fill="#92400e" text-anchor="middle">平清盛：日宋貿易(大輪田泊)</text>
  <text x="266" y="78" font-size="10" fill="#334155" text-anchor="middle">足利義満：勘合貿易(明)</text>

  <circle cx="365" cy="145" r="6" fill="#059669"/><line x1="365" y1="145" x2="365" y2="195" stroke="#059669" stroke-width="1.8"/>
  <rect x="308" y="195" width="118" height="46" rx="6" fill="#ecfdf5" stroke="#059669"/>
  <text x="367" y="213" font-size="10.5" font-weight="800" fill="#065f46" text-anchor="middle">江戸4つの窓口</text>
  <text x="367" y="230" font-size="9.8" fill="#0f172a" text-anchor="middle">長崎(オ・中)/対馬/薩摩/松前</text>

  <circle cx="465" cy="145" r="6" fill="#7c3aed"/><line x1="465" y1="145" x2="465" y2="85" stroke="#7c3aed" stroke-width="1.8"/>
  <rect x="398" y="45" width="126" height="42" rx="6" fill="#f5f3ff" stroke="#7c3aed"/>
  <text x="461" y="62" font-size="10.5" font-weight="800" fill="#5b21b6" text-anchor="middle">1972 日中共同声明(田中角栄)</text>
  <text x="461" y="78" font-size="10" fill="#334155" text-anchor="middle">1978 日中平和友好条約</text>

  <text x="270" y="275" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">⚠️ 1965年＝日韓基本条約（佐藤栄作） ／ 1972年＝日中共同声明（国交正常化） ／ 1978年＝日中平和友好条約！</text>
''')

# 5. so3_1: 三権分立（国会・内閣・裁判所の抑制と均衡）
save("soc_three_powers.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】三権分立と抑制・均衡（チェック・アンド・バランス）</text>
  <!-- 国会(上) -->
  <rect x="195" y="42" width="150" height="52" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2.2"/>
  <text x="270" y="64" font-size="13" font-weight="900" fill="#1e40af" text-anchor="middle">国会（立法権）</text>
  <text x="270" y="82" font-size="10.5" font-weight="700" fill="#334155" text-anchor="middle">国権の最高機関・唯一の立法機関</text>
  <!-- 内閣(左下) -->
  <rect x="36" y="182" width="160" height="54" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2.2"/>
  <text x="116" y="204" font-size="13" font-weight="900" fill="#065f46" text-anchor="middle">内閣（行政権）</text>
  <text x="116" y="223" font-size="10.5" font-weight="700" fill="#334155" text-anchor="middle">議院内閣制（国会に連帯責任）</text>
  <!-- 裁判所(右下) -->
  <rect x="344" y="182" width="160" height="54" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2.2"/>
  <text x="424" y="204" font-size="13" font-weight="900" fill="#991b1b" text-anchor="middle">裁判所（司法権）</text>
  <text x="424" y="223" font-size="10.5" font-weight="700" fill="#334155" text-anchor="middle">憲法の番人（違憲審査権）</text>

  <!-- 矢印: 国会 <-> 内閣 -->
  <line x1="205" y1="95" x2="115" y2="178" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-blue)"/>
  <text x="102" y="128" font-size="10.5" font-weight="800" fill="#1d4ed8" text-anchor="middle">首相の指名</text>
  <text x="102" y="142" font-size="10.5" font-weight="800" fill="#1d4ed8" text-anchor="middle">内閣不信任決議(衆のみ)</text>
  <line x1="145" y1="180" x2="232" y2="97" stroke="#16a34a" stroke-width="2.2" marker-end="url(#arr-green)"/>
  <text x="220" y="156" font-size="10.5" font-weight="800" fill="#15803d" text-anchor="middle">衆議院の解散</text>

  <!-- 矢印: 国会 <-> 裁判所 -->
  <line x1="335" y1="95" x2="422" y2="178" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-blue)"/>
  <text x="438" y="130" font-size="10.5" font-weight="800" fill="#1d4ed8" text-anchor="middle">弾劾裁判所の設置</text>
  <line x1="395" y1="180" x2="308" y2="97" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arr-red)"/>
  <text x="326" y="156" font-size="10.5" font-weight="800" fill="#b91c1c" text-anchor="middle">法律の違憲審査</text>

  <!-- 矢印: 内閣 <-> 裁判所 -->
  <line x1="200" y1="202" x2="340" y2="202" stroke="#16a34a" stroke-width="2.2" marker-end="url(#arr-green)"/>
  <text x="270" y="195" font-size="10.5" font-weight="800" fill="#15803d" text-anchor="middle">最高裁長官の指名・他裁判官の任命</text>
  <line x1="340" y1="220" x2="200" y2="220" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arr-red)"/>
  <text x="270" y="236" font-size="10.5" font-weight="800" fill="#b91c1c" text-anchor="middle">命令・処分の違憲・違法審査</text>

  <text x="270" y="276" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">主権者＝国民（選挙 ／ 最高裁裁判官の国民審査 ／ 憲法改正の国民投票）</text>
''')

# 6. so3_3: 日本の社会保障の4つの柱と給付費割合
save("soc_welfare4.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">【資料1】日本の社会保障制度「4つの柱」と少子高齢化の課題</text>
  <rect x="24" y="48" width="236" height="92" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="142" y="70" font-size="12.5" font-weight="900" fill="#1e40af" text-anchor="middle">① 社会保険（給付費の約9割！）</text>
  <text x="142" y="91" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">医療・年金・雇用・労災・【介護保険】</text>
  <text x="142" y="110" font-size="10.5" fill="#334155" text-anchor="middle">国民皆保険・国民皆年金</text>
  <text x="142" y="128" font-size="10.5" font-weight="800" fill="#dc2626" text-anchor="middle">※介護保険＝40歳以上が保険料負担！</text>

  <rect x="278" y="48" width="238" height="92" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
  <text x="397" y="70" font-size="12.5" font-weight="900" fill="#991b1b" text-anchor="middle">② 公的扶助（憲法25条 生存権）</text>
  <text x="397" y="91" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">生活困窮者に最低限度の生活を保障</text>
  <text x="397" y="110" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">代表例：【生活保護制度】（全額税金）</text>
  <text x="397" y="128" font-size="10.5" fill="#334155" text-anchor="middle">健康で文化的な最低限度の生活</text>

  <rect x="24" y="154" width="236" height="84" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <text x="142" y="176" font-size="12.5" font-weight="900" fill="#065f46" text-anchor="middle">③ 社会福祉</text>
  <text x="142" y="197" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">高齢者・障がい者・児童への支援</text>
  <text x="142" y="216" font-size="10.5" fill="#334155" text-anchor="middle">バリアフリー・ユニバーサルデザイン</text>

  <rect x="278" y="154" width="238" height="84" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="2"/>
  <text x="397" y="176" font-size="12.5" font-weight="900" fill="#92400e" text-anchor="middle">④ 公衆衛生</text>
  <text x="397" y="197" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">感染症予防・上下水道整備・食品衛生</text>
  <text x="397" y="216" font-size="10.5" fill="#334155" text-anchor="middle">代表機関：【保健所】・予防接種</text>

  <rect x="24" y="248" width="492" height="38" rx="8" fill="#f8fafc" stroke="#475569"/>
  <text x="270" y="272" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">社会保障給付費の内訳順位：1位【年金】（約半分） ＞ 2位【医療】 ＞ 3位【福祉その他（介護含む）】</text>
''')

print("Generated 22 SVG files in", OUT_DIR)
