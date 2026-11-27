#!/usr/bin/env python3
"""
v9.0 全国47都道府県 ご当地必出パターン完全補完ベクター図版ジェネレータ (public/juken_figs/v9/*.svg)
- 数学2組（4枚）：
  1) ma3_2: 投影図（立面図・平面図）から見抜く円錐＋円柱の複合回転体＆表面積・体積 (math_proj_rot_{q,ans}.svg)
  2) ma2_3: 放物線 y = (1/2)x² と直線で囲まれた領域内の格子点の個数 (math_lattice_parabola_{q,ans}.svg)
- 理科3組（6枚）：
  3) sc2_2: 定滑車・動滑車・輪軸の仕事の原理と効率 (sci_pulley_work_{q,ans}.svg)
  4) sc3_1: 酸化銅＋炭素の酸化・還元反応と石灰水・逆流防止操作 (sci_redox_cuo_{q,ans}.svg)
  5) sc4_2: 日本海側の湿った風→山越えフェーン現象＋緊急地震速報 (sci_foehn_quake_{q,ans}.svg)
- 国語1枚：
  6) ja1_3: 書写（楷書と行書の点画の連続・筆順変化の比較）(jpn_calligraphy_gyosho.svg)
- 社会2枚：
  7) so1_2: 2万5千分の1地形図（等高線の尾根と谷・果樹園/広葉樹林・扇状地）(soc_topo_contour.svg)
  8) so3_2: 国の一般会計歳入・歳出とプライマリーバランス・三審制構造図 (soc_fiscal_courts.svg)
"""
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "juken_figs", "v9")
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
# 1. 数学 ma3_2: 投影図（立面図・平面図）と複合回転体（円錐＋円柱）
# 半径 r=3cm(底面直径6cm), 円柱高さ 5cm, 円錐高さ 4cm => 母線 l = √(3²+4²) = 5cm
# =========================================================================
for mode in ("q", "ans"):
    right_panel = '''
  <rect x="292" y="42" width="228" height="236" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="406" y="66" font-size="12.5" font-weight="800" fill="#334155" text-anchor="middle">どんな立体を表す投影図？</text>
  <text x="406" y="138" font-size="34" font-weight="900" fill="#94a3b8" text-anchor="middle">？</text>
  <text x="406" y="176" font-size="11.5" font-weight="700" fill="#64748b" text-anchor="middle">立面図（正面から見た形）と</text>
  <text x="406" y="195" font-size="11.5" font-weight="700" fill="#64748b" text-anchor="middle">平面図（真上から見た円）を合成！</text>
'''
    if mode == "ans":
        right_panel = '''
  <rect x="284" y="38" width="240" height="246" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="404" y="58" font-size="12" font-weight="900" fill="#b91c1c" text-anchor="middle">正体：上＝円錐(r=3,h=4)＋下＝円柱(r=3,h=5)</text>
  <!-- 3D 見取り図 -->
  <polygon points="404,72 350,126 458,126" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <rect x="350" y="126" width="108" height="62" fill="#e0f2fe" stroke="#1d4ed8" stroke-width="2"/>
  <ellipse cx="404" cy="126" rx="54" ry="13" fill="none" stroke="#1d4ed8" stroke-width="1.6" stroke-dasharray="4 3"/>
  <ellipse cx="404" cy="188" rx="54" ry="13" fill="#bae6fd" stroke="#1d4ed8" stroke-width="2"/>
  <!-- 補助線（高さ4・半径3・母線5） -->
  <line x1="404" y1="72" x2="404" y2="126" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/>
  <line x1="404" y1="126" x2="458" y2="126" stroke="#dc2626" stroke-width="2"/>
  <text x="394" y="106" font-size="11" font-weight="900" fill="#dc2626" text-anchor="end">4</text>
  <text x="431" y="121" font-size="11" font-weight="900" fill="#dc2626" text-anchor="middle">r=3</text>
  <text x="444" y="98" font-size="11.5" font-weight="900" fill="#b91c1c">母線 5cm！</text>
  <text x="474" y="160" font-size="11" font-weight="800" fill="#1e40af">h=5</text>
  <!-- 公式まとめ -->
  <text x="404" y="220" font-size="10.8" font-weight="800" fill="#0f172a" text-anchor="middle">体積 ＝ 円錐(1/3×9π×4=12π)＋円柱(9π×5=45π)＝57π cm³</text>
  <text x="404" y="240" font-size="10.8" font-weight="800" fill="#b91c1c" text-anchor="middle">表面積 ＝ 円錐側面(πrl=15π)＋円柱側面(6π×5=30π)＋底面1枚(9π)</text>
  <text x="404" y="259" font-size="11" font-weight="900" fill="#15803d" text-anchor="middle">＝ 54π cm²！（※接合面の9πは外に出ていないので足さない！）</text>
'''
    save(f"math_proj_rot_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">投影図（立面図・平面図）から読み取る立体の体積と表面積</text>
  <!-- 立面図 -->
  <text x="34" y="54" font-size="11.5" font-weight="800" fill="#334155">【立面図】</text>
  <polygon points="145,48 91,98 199,98" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.2"/>
  <rect x="91" y="98" width="108" height="62" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.2"/>
  <!-- 寸法 -->
  <line x1="214" y1="48" x2="214" y2="98" stroke="#2563eb" stroke-width="1.6"/>
  <text x="236" y="77" font-size="11.5" font-weight="800" fill="#2563eb" text-anchor="middle">4cm</text>
  <line x1="214" y1="98" x2="214" y2="160" stroke="#2563eb" stroke-width="1.6"/>
  <text x="236" y="133" font-size="11.5" font-weight="800" fill="#2563eb" text-anchor="middle">5cm</text>
  <!-- 投影線 X-Y -->
  <line x1="26" y1="176" x2="266" y2="176" stroke="#64748b" stroke-width="1.6"/>
  <line x1="91" y1="160" x2="91" y2="236" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="199" y1="160" x2="199" y2="236" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <line x1="145" y1="48" x2="145" y2="236" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
  <!-- 平面図 -->
  <text x="34" y="202" font-size="11.5" font-weight="800" fill="#334155">【平面図】</text>
  <circle cx="145" cy="236" r="46" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.2"/>
  <circle cx="145" cy="236" r="3.5" fill="#0f172a"/>
  <text x="145" y="294" font-size="11.5" font-weight="800" fill="#2563eb" text-anchor="middle">直径 6cm（半径 3cm）</text>
  {right_panel}
''')


# =========================================================================
# 2. 数学 ma2_3: 放物線 y=(1/2)x² と直線 y=4 で囲まれた領域(周上含む)の格子点
# 原点 (270, 232), 1目盛り x:42px, y:34px
# x=-3..3, y=0..5
# =========================================================================
grid_svg = ""
for gx in range(-4, 5):
    px = 270 + gx * 42
    grid_svg += f'<line x1="{px}" y1="45" x2="{px}" y2="255" stroke="#e2e8f0" stroke-width="1.2"/>'
    if gx != 0:
        grid_svg += f'<text x="{px}" y="248" font-size="10.5" font-weight="700" fill="#475569" text-anchor="middle">{gx}</text>'
for gy in range(0, 6):
    py = 232 - gy * 34
    grid_svg += f'<line x1="85" y1="{py}" x2="455" y2="{py}" stroke="#e2e8f0" stroke-width="1.2"/>'
    if gy > 0:
        grid_svg += f'<text x="258" y="{py+4}" font-size="10.5" font-weight="700" fill="#475569" text-anchor="end">{gy}</text>'

pts_poly = []
for i in range(-32, 33):
    xv = i / 10.0
    yv = 0.5 * xv * xv
    if yv <= 5.2:
        pts_poly.append(f"{270 + xv*42:.1f},{232 - yv*34:.1f}")
parabola_str = " ".join(pts_poly)

for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        dots = ""
        # 0.5*x^2 <= y <= 4 (周上を含む)
        # x=0: y=0,1,2,3,4 (5個)
        # x=±1: 0.5 <= y <= 4 -> y=1,2,3,4 (各4個)
        # x=±2: 2 <= y <= 4 -> y=2,3,4 (各3個)
        # x=±3: 4.5 <= y <= 4 -> 0個！
        for xv in (-2, -1, 0, 1, 2):
            ymin = 0 if xv == 0 else (1 if abs(xv) == 1 else 2)
            for yv in range(ymin, 5):
                cx = 270 + xv * 42
                cy = 232 - yv * 34
                dots += f'<circle cx="{cx}" cy="{cy}" r="5.2" fill="#dc2626" stroke="#ffffff" stroke-width="1.5"/>'
        ann = f'''
  {dots}
  <rect x="26" y="256" width="488" height="36" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.5"/>
  <text x="270" y="278" font-size="11.2" font-weight="800" fill="#b91c1c" text-anchor="middle">縦の列ごとに数える鉄則！ x=0(5個) ＋ x=±1(4×2=8個) ＋ x=±2(3×2=6個) ＝ 計 19個！（x=±3はy≧4.5で0個）</text>
'''
    save(f"math_lattice_parabola_{mode}.svg", f'''
  <text x="18" y="24" font-size="12.8" font-weight="800" fill="#0f172a">放物線 y ＝ (1/2)x² と直線 y ＝ 4 で囲まれた領域（周上を含む）の格子点</text>
  {grid_svg}
  <line x1="80" y1="232" x2="462" y2="232" stroke="#0f172a" stroke-width="2" marker-end="url(#arr-slate)"/>
  <line x1="270" y1="255" x2="270" y2="38" stroke="#0f172a" stroke-width="2" marker-end="url(#arr-slate)"/>
  <text x="260" y="247" font-size="11" font-weight="800" fill="#0f172a">O</text>
  <!-- y = 4 -->
  <line x1="90" y1="96" x2="450" y2="96" stroke="#16a34a" stroke-width="2.4"/>
  <text x="454" y="100" font-size="12" font-weight="800" fill="#15803d">y ＝ 4</text>
  <!-- y = (1/2)x^2 -->
  <polyline points="{parabola_str}" fill="none" stroke="#2563eb" stroke-width="2.6"/>
  <text x="412" y="66" font-size="12" font-weight="800" fill="#1d4ed8">y ＝ (1/2)x²</text>
  {ann}
''')


# =========================================================================
# 3. 理科 sc2_2: 定滑車と動滑車（質量12kg＝120Nの物体を0.5m持ち上げる）
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 動滑車の2本のひもで半分ずつ支える書き込み -->
  <text x="316" y="114" font-size="11.5" font-weight="900" fill="#dc2626" text-anchor="end">60N</text>
  <text x="386" y="114" font-size="11.5" font-weight="900" fill="#dc2626">60N</text>
  <rect x="24" y="216" width="492" height="72" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="270" y="237" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">【仕事の原理】道具を使っても仕事の大きさ W ＝ 120N × 0.5m ＝ 60J は変わらない！</text>
  <text x="270" y="257" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">定滑車A：力 120N・引く長さ 0.5m ／ 動滑車B（摩擦・滑車重さ無視）：力 60N（半分）・引く長さ 1.0m（2倍）！</text>
  <text x="270" y="276" font-size="10.8" font-weight="800" fill="#15803d" text-anchor="middle">※動滑車自身が重さ 20N をもつ応用問題では：必要な力 ＝ (120＋20)÷2 ＝ 70N！（仕事の効率＝60J/70J）</text>
'''
    save(f"sci_pulley_work_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">定滑車A・動滑車Bで 120N（12kg）の物体を 0.5m 引き上げる実験</text>
  <!-- 天井 -->
  <line x1="40" y1="48" x2="230" y2="48" stroke="#334155" stroke-width="4"/>
  <line x1="280" y1="48" x2="490" y2="48" stroke="#334155" stroke-width="4"/>
  <!-- 定滑車 A -->
  <text x="68" y="70" font-size="12" font-weight="900" fill="#1e293b">装置A（定滑車）</text>
  <line x1="135" y1="48" x2="135" y2="82" stroke="#334155" stroke-width="3"/>
  <circle cx="135" cy="96" r="22" fill="#e2e8f0" stroke="#0f172a" stroke-width="2.2"/>
  <circle cx="135" cy="96" r="4" fill="#0f172a"/>
  <line x1="113" y1="96" x2="113" y2="156" stroke="#2563eb" stroke-width="2.4"/>
  <line x1="157" y1="96" x2="157" y2="168" stroke="#dc2626" stroke-width="2.4" marker-end="url(#arr-red)"/>
  <text x="192" y="156" font-size="11.5" font-weight="800" fill="#dc2626">引く力 F₁</text>
  <rect x="91" y="156" width="44" height="36" rx="5" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
  <text x="113" y="179" font-size="11.5" font-weight="900" fill="#92400e" text-anchor="middle">120N</text>

  <!-- 動滑車 B -->
  <text x="398" y="70" font-size="12" font-weight="900" fill="#1e293b">装置B（動滑車）</text>
  <line x1="328" y1="48" x2="328" y2="134" stroke="#2563eb" stroke-width="2.4"/>
  <line x1="372" y1="134" x2="372" y2="66" stroke="#dc2626" stroke-width="2.4" marker-end="url(#arr-red)"/>
  <text x="415" y="92" font-size="11.5" font-weight="800" fill="#dc2626">引く力 F₂</text>
  <circle cx="350" cy="134" r="22" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.2"/>
  <circle cx="350" cy="134" r="4" fill="#1d4ed8"/>
  <line x1="350" y1="134" x2="350" y2="164" stroke="#334155" stroke-width="2.6"/>
  <rect x="328" y="164" width="44" height="36" rx="5" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
  <text x="350" y="187" font-size="11.5" font-weight="900" fill="#92400e" text-anchor="middle">120N</text>
  {ann}
''')


# =========================================================================
# 4. 理科 sc3_1: 酸化銅(黒)＋炭素粉末の加熱（酸化と還元・逆流防止）
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <rect x="20" y="196" width="500" height="92" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="270" y="216" font-size="11.5" font-weight="900" fill="#b91c1c" text-anchor="middle">化学反応式： 2CuO ＋ C → 2Cu（赤茶色・還元された！） ＋ CO₂（炭素が酸化された！）</text>
  <text x="270" y="237" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">①酸化銅から酸素が奪われる＝【還元】 ／ ②炭素が酸素と結びつく＝【酸化】（常に同時に起こる！）</text>
  <text x="270" y="257" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">③火を消す前に【必ずガラス管を石灰水から抜く】理由：試験管内の気体が冷えて収縮し石灰水が逆流して割れるのを防ぐため！</text>
  <text x="270" y="276" font-size="10.8" font-weight="800" fill="#15803d" text-anchor="middle">④反応後にピンチコックを閉じて冷ます理由：熱い銅が空気中の酸素と再び結びついて酸化銅に戻るのを防ぐため！</text>
'''
    save(f"sci_redox_cuo_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">酸化銅と炭素粉末の混合物を加熱する実験（酸化と還元）</text>
  <!-- 加熱試験管（少し口を下げる） -->
  <g transform="rotate(7, 170, 105)">
    <rect x="85" y="88" width="165" height="28" rx="12" fill="#f8fafc" stroke="#0f172a" stroke-width="2.2"/>
    <ellipse cx="115" cy="102" rx="22" ry="9" fill="#1e293b"/>
    <rect x="244" y="89" width="12" height="26" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/>
  </g>
  <text x="122" y="74" font-size="11" font-weight="800" fill="#1e293b" text-anchor="middle">酸化銅(黒)＋炭素粉末</text>
  <!-- ガスバーナーの炎 -->
  <polygon points="108,142 118,118 128,142" fill="#f97316"/>
  <rect x="112" y="142" width="12" height="36" fill="#64748b"/>
  <text x="118" y="190" font-size="10.5" font-weight="700" fill="#475569" text-anchor="middle">ガスバーナー</text>

  <!-- ゴム管＆ピンチコック＆ガラス管 -->
  <polyline points="256,112 315,112 385,112 385,165" fill="none" stroke="#2563eb" stroke-width="3"/>
  <rect x="296" y="101" width="18" height="22" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="1.8"/>
  <text x="305" y="95" font-size="10.5" font-weight="800" fill="#a16207" text-anchor="middle">ピンチコック</text>

  <!-- 石灰水試験管 -->
  <rect x="363" y="118" width="44" height="68" rx="10" fill="#eff6ff" stroke="#0f172a" stroke-width="2.2"/>
  <rect x="365" y="142" width="40" height="42" rx="8" fill="#dbeafe"/>
  <circle cx="385" cy="158" r="3" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
  <circle cx="391" cy="149" r="3.5" fill="#ffffff" stroke="#2563eb" stroke-width="1.2"/>
  <text x="448" y="156" font-size="11.5" font-weight="800" fill="#1e40af" text-anchor="middle">石灰水</text>
  <text x="448" y="173" font-size="10.5" font-weight="700" fill="#475569" text-anchor="middle">（白くにごる）</text>
  {ann}
''')


# =========================================================================
# 5. 理科 sc4_2: 山越えのフェーン現象（湿潤0.5℃/100m vs 乾燥1.0℃/100m）
# 標高0mのA地点(22℃, 露点14℃) → 標高2000mの山頂 → 標高0mのB地点(何℃？)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 雲発生ライン 800m -->
  <line x1="80" y1="146" x2="290" y2="146" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="4 3"/>
  <text x="128" y="140" font-size="10.5" font-weight="900" fill="#1d4ed8">標高800mで露点14℃に達し雲発生！</text>
  <text x="270" y="54" font-size="11.5" font-weight="900" fill="#1d4ed8" text-anchor="middle">山頂(2000m)：14 − 0.5×12 ＝ 8℃！</text>
  <text x="452" y="174" font-size="12.5" font-weight="900" fill="#dc2626" text-anchor="middle">B地点：8 ＋ 1.0×20 ＝ 28℃！</text>
  <rect x="20" y="216" width="500" height="72" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="270" y="236" font-size="11.2" font-weight="900" fill="#b91c1c" text-anchor="middle">フェーン現象3ステップ：①雲ができるまで 100mにつき 1.0℃低下（22℃→14℃は800m上昇！）</text>
  <text x="270" y="256" font-size="11" font-weight="800" fill="#1e40af" text-anchor="middle">②雲の中（800m→2000mの1200m）は凝結熱が出るため 100mにつき 0.5℃低下 ⇒ 山頂は 14 − 6 ＝ 8℃！</text>
  <text x="270" y="275" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle">③山を吹き下りる側（2000m→0m）は乾いた空気なので 100mにつき 1.0℃上昇 ⇒ 8 ＋ 20 ＝ 28℃の高温乾燥風！</text>
'''
    save(f"sci_foehn_quake_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">山脈を越える風とフェーン現象（雲なし1.0℃/100m・雲の中0.5℃/100m）</text>
  <!-- 地面と山(2000m) -->
  <polygon points="40,196 175,196 270,68 380,196 500,196" fill="#dcfce7" stroke="#15803d" stroke-width="2.4"/>
  <line x1="30" y1="196" x2="510" y2="196" stroke="#334155" stroke-width="2"/>
  <text x="270" y="88" font-size="11" font-weight="800" fill="#14532d" text-anchor="middle">標高 2000m</text>
  <!-- 雲 -->
  <ellipse cx="205" cy="112" rx="34" ry="16" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
  <text x="205" y="116" font-size="10.5" font-weight="800" fill="#334155" text-anchor="middle">雲・雨</text>
  <!-- 風の矢印 -->
  <line x1="65" y1="182" x2="160" y2="182" stroke="#2563eb" stroke-width="2.6" marker-end="url(#arr-blue)"/>
  <line x1="175" y1="168" x2="245" y2="82" stroke="#2563eb" stroke-width="2.6" marker-end="url(#arr-blue)"/>
  <line x1="295" y1="82" x2="375" y2="176" stroke="#dc2626" stroke-width="2.6" marker-end="url(#arr-red)"/>
  <!-- A地点・B地点 -->
  <text x="98" y="168" font-size="11.5" font-weight="900" fill="#1e3a8a" text-anchor="middle">A地点(標高0m)</text>
  <text x="98" y="211" font-size="10.8" font-weight="800" fill="#1e3a8a" text-anchor="middle">気温22℃・露点14℃</text>
  <text x="448" y="191" font-size="11.5" font-weight="900" fill="#991b1b" text-anchor="middle">B地点(標高0m)</text>
  {ann}
''')


# =========================================================================
# 6. 国語 ja1_3: 書写（楷書と行書の5大違い・筆順が変化する字）
# =========================================================================
save("jpn_calligraphy_gyosho.svg", '''
  <text x="18" y="25" font-size="13.5" font-weight="800" fill="#0f172a">公立国語で頻出！書写「楷書」と「行書」の特徴＆筆順が変化する代表字</text>
  <!-- 左カード：楷書 -->
  <rect x="22" y="42" width="238" height="162" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.8"/>
  <rect x="34" y="52" width="76" height="22" rx="6" fill="#334155"/>
  <text x="72" y="67" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">楷書（かいしょ）</text>
  <text x="141" y="128" font-size="52" font-weight="700" fill="#0f172a" text-anchor="middle">春・右</text>
  <text x="36" y="162" font-size="11" font-weight="700" fill="#334155">・点画を1画ずつ離して正確に書く</text>
  <text x="36" y="180" font-size="11" font-weight="700" fill="#334155">・折れや止めが角ばり、直線的</text>
  <text x="36" y="196" font-size="11" font-weight="700" fill="#2563eb">・「右」の1画目は【左はらい（ノ）】</text>

  <!-- 右カード：行書 -->
  <rect x="280" y="42" width="238" height="162" rx="12" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>
  <rect x="292" y="52" width="76" height="22" rx="6" fill="#dc2626"/>
  <text x="330" y="67" font-size="11.5" font-weight="800" fill="#ffffff" text-anchor="middle">行書（ぎょうしょ）</text>
  <!-- 行書の気持ちのつながり（気脈）の赤い点線 -->
  <text x="399" y="128" font-size="50" font-style="italic" font-weight="600" fill="#7f1d1d" text-anchor="middle">春・右</text>
  <path d="M 358 95 C 382 102, 412 96, 434 114" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3 2"/>
  <text x="294" y="162" font-size="11" font-weight="800" fill="#991b1b">①点画の連続・省略・丸み（曲線化）</text>
  <text x="294" y="180" font-size="11" font-weight="800" fill="#991b1b">②次の画へ向かう「気脈（きみゃく）」</text>
  <text x="294" y="196" font-size="11" font-weight="900" fill="#dc2626">③筆順変化：「右・布・有」は横画が先！</text>

  <!-- 下部まとめ帯 -->
  <rect x="22" y="216" width="496" height="70" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
  <text x="270" y="238" font-size="11.5" font-weight="900" fill="#92400e" text-anchor="middle">入試必出！楷書と行書で【筆順（書き順）が変わる字】トップ4</text>
  <text x="270" y="258" font-size="11" font-weight="800" fill="#1e293b" text-anchor="middle">・「右」「布」「有」：楷書は【ノ→一】だが、行書は【一→ノ】 ／ ・「道」「遠」（しんにょう）：最後にはらわず止めることも</text>
  <text x="270" y="276" font-size="10.8" font-weight="800" fill="#b45309" text-anchor="middle">・「馬」「無」のれっか（灬）：行書では4つの点が連続して1本の横線のように省略される！</text>
''')


# =========================================================================
# 7. 社会 so1_2: 2万5千分の1地形図（尾根と谷・等高線間隔・地図記号）
# =========================================================================
save("soc_topo_contour.svg", '''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">2万5千分の1地形図の読み取り（等高線の尾根・谷・縮尺・地図記号）</text>
  <rect x="22" y="38" width="305" height="244" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.6"/>
  <!-- 山頂 ▲312m -->
  <polygon points="88,152 81,164 95,164" fill="#0f172a"/>
  <text x="88" y="180" font-size="11" font-weight="900" fill="#0f172a" text-anchor="middle">312</text>
  <text x="64" y="144" font-size="10.5" font-weight="800" fill="#dc2626">山頂(高)</text>

  <!-- 等高線：上半分＝尾根(低い方へ張り出す)、下半分＝谷(高い方へ食い込む＋川) -->
  <!-- 250m 計曲線 -->
  <path d="M 62,82 Q 165,95 148,142 Q 112,175 152,226" fill="none" stroke="#92400e" stroke-width="2.2"/>
  <text x="155" y="92" font-size="10" font-weight="800" fill="#92400e">250m</text>
  <!-- 200m 計曲線 -->
  <path d="M 95,62 Q 218,82 190,142 Q 145,176 198,244" fill="none" stroke="#92400e" stroke-width="2.2"/>
  <text x="208" y="78" font-size="10" font-weight="800" fill="#92400e">200m</text>
  <!-- 150m 計曲線 -->
  <path d="M 135,48 Q 268,72 232,144 Q 182,178 242,262" fill="none" stroke="#92400e" stroke-width="2.2"/>
  <text x="256" y="66" font-size="10" font-weight="800" fill="#92400e">150m</text>

  <!-- 尾根ライン P・谷ライン Q(河川) -->
  <line x1="96" y1="125" x2="256" y2="95" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3"/>
  <text x="268" y="96" font-size="11.5" font-weight="900" fill="#dc2626">線P(尾根)</text>
  <path d="M 122,176 Q 195,184 312,196" fill="none" stroke="#2563eb" stroke-width="2.8"/>
  <text x="275" y="185" font-size="11.5" font-weight="900" fill="#1d4ed8">線Q(谷・川)</text>

  <!-- 扇状地の果樹園記号 ○に縦線 -->
  <circle cx="282" cy="138" r="6" fill="none" stroke="#15803d" stroke-width="1.8"/>
  <line x1="282" y1="127" x2="282" y2="132" stroke="#15803d" stroke-width="1.8"/>
  <circle cx="302" cy="148" r="6" fill="none" stroke="#15803d" stroke-width="1.8"/>
  <line x1="302" y1="137" x2="302" y2="142" stroke="#15803d" stroke-width="1.8"/>
  <text x="286" y="166" font-size="10" font-weight="800" fill="#15803d" text-anchor="middle">記号X(果樹園)</text>

  <!-- 右側ルール整理カード -->
  <rect x="338" y="38" width="184" height="244" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>
  <text x="430" y="60" font-size="12" font-weight="900" fill="#92400e" text-anchor="middle">2万5千分の1 鉄板数値</text>
  <text x="348" y="84" font-size="10.8" font-weight="800" fill="#1e293b">・地図上 1cm ＝ 実際 250m</text>
  <text x="348" y="103" font-size="10.8" font-weight="800" fill="#1e293b">・地図上 4cm ＝ 実際 1km！</text>
  <text x="348" y="124" font-size="10.8" font-weight="800" fill="#92400e">・主曲線：10mごと</text>
  <text x="348" y="143" font-size="10.8" font-weight="800" fill="#92400e">・計曲線(太線)：50mごと</text>
  <line x1="348" y1="156" x2="512" y2="156" stroke="#fde68a" stroke-width="1.5"/>
  <text x="348" y="176" font-size="10.6" font-weight="900" fill="#dc2626">★尾根と谷の見分け方</text>
  <text x="348" y="194" font-size="10.2" font-weight="700" fill="#334155">・低い方へ張り出す＝【尾根】</text>
  <text x="348" y="211" font-size="10.2" font-weight="700" fill="#334155">・山頂(高)へ食い込む＝【谷】</text>
  <text x="348" y="232" font-size="10.6" font-weight="900" fill="#15803d">★扇状地の土地利用</text>
  <text x="348" y="250" font-size="10.2" font-weight="700" fill="#334155">水はけが良い ⇒ 果樹園・桑畑</text>
  <text x="348" y="267" font-size="10.2" font-weight="700" fill="#334155">（三角州＝水田と対比！）</text>
''')


# =========================================================================
# 8. 社会 so3_2: 国の一般会計（歳入・歳出・プライマリーバランス）＆三審制
# =========================================================================
save("soc_fiscal_courts.svg", '''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">日本の一般会計（歳入・歳出・基礎的財政収支）と裁判の三審制</text>
  <!-- 左：歳入と歳出 -->
  <rect x="20" y="38" width="256" height="244" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
  <text x="148" y="58" font-size="12" font-weight="900" fill="#1e40af" text-anchor="middle">国の一般会計予算（約110兆円規模）</text>
  <!-- 歳入バー -->
  <text x="78" y="78" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">【歳入】</text>
  <rect x="44" y="86" width="68" height="106" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="78" y="136" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">租税・印紙</text>
  <text x="78" y="151" font-size="10" font-weight="700" fill="#dbeafe" text-anchor="middle">(約6割強)</text>
  <rect x="44" y="192" width="68" height="56" fill="#f87171" stroke="#dc2626" stroke-width="1.5"/>
  <text x="78" y="220" font-size="10.5" font-weight="900" fill="#ffffff" text-anchor="middle">公債金(国債)</text>
  <text x="78" y="235" font-size="10" font-weight="800" fill="#fee2e2" text-anchor="middle">(約3割＝借金)</text>

  <!-- 歳出バー -->
  <text x="208" y="78" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">【歳出】</text>
  <rect x="174" y="86" width="68" height="58" fill="#10b981" stroke="#047857" stroke-width="1.5"/>
  <text x="208" y="114" font-size="10.2" font-weight="900" fill="#ffffff" text-anchor="middle">社会保障関係費</text>
  <text x="208" y="129" font-size="9.8" font-weight="800" fill="#d1fae5" text-anchor="middle">(最大・約1/3！)</text>
  <rect x="174" y="144" width="68" height="44" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
  <text x="208" y="169" font-size="10.2" font-weight="900" fill="#ffffff" text-anchor="middle">国債費(元利払)</text>
  <rect x="174" y="188" width="68" height="32" fill="#6366f1" stroke="#4338ca" stroke-width="1.5"/>
  <text x="208" y="208" font-size="9.8" font-weight="800" fill="#ffffff" text-anchor="middle">地方交付税交付金</text>
  <rect x="174" y="220" width="68" height="28" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
  <text x="208" y="238" font-size="9.8" font-weight="800" fill="#ffffff" text-anchor="middle">公共事業・文教等</text>

  <text x="148" y="270" font-size="9.8" font-weight="900" fill="#b91c1c" text-anchor="middle">PB(基礎的財政収支)＝「税収等」と「国債費を除く歳出」の差！</text>

  <!-- 右：三審制（控訴・上告） -->
  <rect x="290" y="38" width="230" height="244" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="405" y="58" font-size="12" font-weight="900" fill="#991b1b" text-anchor="middle">人権を守る「三審制」の流れ</text>
  <rect x="335" y="72" width="140" height="36" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.8"/>
  <text x="405" y="94" font-size="12" font-weight="900" fill="#991b1b" text-anchor="middle">最高裁判所（終審・違憲審査）</text>

  <line x1="390" y1="146" x2="390" y2="112" stroke="#dc2626" stroke-width="2.2" marker-end="url(#arr-red)"/>
  <text x="434" y="134" font-size="11" font-weight="900" fill="#dc2626">上告（じょうこく）</text>

  <rect x="335" y="148" width="140" height="36" rx="8" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>
  <text x="405" y="170" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle">高等裁判所</text>

  <line x1="390" y1="222" x2="390" y2="188" stroke="#2563eb" stroke-width="2.2" marker-end="url(#arr-blue)"/>
  <text x="434" y="210" font-size="11" font-weight="900" fill="#1d4ed8">控訴（こうそ）</text>

  <rect x="306" y="224" width="198" height="44" rx="8" fill="#ffffff" stroke="#334155" stroke-width="1.8"/>
  <text x="405" y="243" font-size="11" font-weight="800" fill="#0f172a" text-anchor="middle">地方裁判所・家庭裁判所・簡易裁判所</text>
  <text x="405" y="259" font-size="9.8" font-weight="800" fill="#b45309" text-anchor="middle">※裁判員制度は【重大な刑事事件の第一審（地裁）】のみ！</text>
''')

print("Generated 13 SVGs in", OUT_DIR)
