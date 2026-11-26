#!/usr/bin/env python3
"""
v6.5 高品質ベクター図版ジェネレータ (public/juken_figs/v65/*.svg)
- 理科6組（12枚）：問題図 (q) ⇔ ✏️書き込み解説図 (ans)
- 数学3組（6枚） ：問題図 (q) ⇔ ✏️書き込み解説図 (ans)
- 社会4枚        ：第6問B式スライド資料カルーセル用グラフ・タイムライン・帯グラフ
"""
import os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "juken_figs", "v65")
os.makedirs(OUT_DIR, exist_ok=True)

FONT = "'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif"

def save(name: str, body: str, w: int = 520, h: int = 290):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" font-family="{FONT}">
  <defs>
    <marker id="arr-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626"/>
    </marker>
    <marker id="arr-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#2563eb"/>
    </marker>
    <marker id="arr-slate" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="#334155"/>
    </marker>
  </defs>
  <rect width="{w}" height="{h}" rx="14" fill="#ffffff"/>
{body}
</svg>
'''
    path = os.path.join(OUT_DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)

# =========================================================================
# 1. 理科① 凸レンズの実像作図 (sci_lens_q / sci_lens_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 光線① 平行→焦点F -->
  <line x1="120" y1="85" x2="260" y2="85" stroke="#dc2626" stroke-width="2.6" marker-end="url(#arr-red)"/>
  <line x1="260" y1="85" x2="435" y2="232" stroke="#dc2626" stroke-width="2.6" marker-end="url(#arr-red)"/>
  <!-- 光線② 中心Oを直進 -->
  <line x1="120" y1="85" x2="435" y2="232" stroke="#2563eb" stroke-width="2.6" marker-end="url(#arr-blue)"/>
  <!-- 倒立実像（2f = 400 の位置で同じ大きさ） -->
  <line x1="400" y1="155" x2="400" y2="218" stroke="#16a34a" stroke-width="4.5"/>
  <polygon points="400,225 393,213 407,213" fill="#16a34a"/>
  <rect x="330" y="242" width="175" height="36" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="417" y="258" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle">2f（20cm）で同じ大きさの</text>
  <text x="417" y="273" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle">倒立実像（上下・左右逆！）</text>
  <text x="190" y="75" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle">①光軸に平行 → 焦点Fへ</text>
  <text x="200" y="138" font-size="11" font-weight="700" fill="#2563eb" transform="rotate(22 200 138)">②中心Oはそのまま直進</text>
'''
    save(f"sci_lens_{mode}.svg", f'''
  <text x="18" y="26" font-size="13" font-weight="800" fill="#0f172a">凸レンズ（焦点距離 f＝10cm）と物体の位置</text>
  <!-- 方眼目盛り -->
  <line x1="30" y1="155" x2="490" y2="155" stroke="#475569" stroke-width="1.8"/>
  <!-- 凸レンズ -->
  <ellipse cx="260" cy="155" rx="11" ry="95" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
  <line x1="260" y1="52" x2="260" y2="258" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4,3"/>
  <text x="260" y="45" font-size="12" font-weight="800" fill="#0369a1" text-anchor="middle">凸レンズ O</text>
  <!-- 焦点 F(190, 330) と 2f(120, 400) -->
  <circle cx="190" cy="155" r="4" fill="#0f172a"/><text x="190" y="174" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">F(10cm)</text>
  <circle cx="120" cy="155" r="4" fill="#0f172a"/><text x="120" y="174" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">2f(20cm)</text>
  <circle cx="330" cy="155" r="4" fill="#0f172a"/><text x="330" y="174" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">F(10cm)</text>
  <circle cx="400" cy="155" r="4" fill="#0f172a"/><text x="400" y="174" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">2f(20cm)</text>
  <!-- 物体（ろうそく矢印）at x=120 (2f) -->
  <line x1="120" y1="155" x2="120" y2="92" stroke="#ea580c" stroke-width="4.5"/>
  <polygon points="120,85 113,97 127,97" fill="#ea580c"/>
  <text x="82" y="115" font-size="12" font-weight="800" fill="#c2410c" text-anchor="middle">物体</text>
  {ann}
''')

# =========================================================================
# 2. 理科② 並列回路の電圧・枝電流・合成抵抗 (sci_parallel_q / sci_parallel_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 電圧等しい帯 -->
  <rect x="172" y="66" width="176" height="22" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.4"/>
  <text x="260" y="81" font-size="11.5" font-weight="800" fill="#dc2626" text-anchor="middle">上枝も6V！ I₁＝6÷20＝0.3A →</text>
  <rect x="172" y="156" width="176" height="22" rx="6" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
  <text x="260" y="171" font-size="11.5" font-weight="800" fill="#2563eb" text-anchor="middle">下枝も6V！ I₂＝6÷30＝0.2A →</text>
  <!-- 合流電流と合成抵抗 -->
  <rect x="366" y="120" width="138" height="48" rx="8" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.8"/>
  <text x="435" y="139" font-size="12" font-weight="800" fill="#15803d" text-anchor="middle">全体 I＝0.3＋0.2＝0.5A</text>
  <text x="435" y="158" font-size="12" font-weight="800" fill="#15803d" text-anchor="middle">合成 R＝6÷0.5＝12Ω</text>
'''
    save(f"sci_parallel_{mode}.svg", f'''
  <text x="18" y="26" font-size="13" font-weight="800" fill="#0f172a">並列回路（電源 6.0V・電熱線R₁＝20Ω / R₂＝30Ω）</text>
  <!-- 外周導線 -->
  <rect x="75" y="105" width="280" height="145" fill="none" stroke="#334155" stroke-width="2.5"/>
  <!-- 並列の上段・中段 -->
  <line x1="140" y1="105" x2="140" y2="195" stroke="#334155" stroke-width="2.5"/>
  <line x1="355" y1="105" x2="355" y2="195" stroke="#334155" stroke-width="2.5"/>
  <line x1="140" y1="195" x2="355" y2="195" stroke="#334155" stroke-width="2.5"/>
  <circle cx="140" cy="105" r="4" fill="#0f172a"/><circle cx="355" cy="105" r="4" fill="#0f172a"/>
  <!-- 抵抗 R1 (top: y=105) -->
  <rect x="205" y="92" width="100" height="26" fill="#ffffff" stroke="#0f172a" stroke-width="2.2"/>
  <text x="255" y="110" font-size="13" font-weight="800" fill="#0f172a" text-anchor="middle">R₁ ＝ 20Ω</text>
  <!-- 抵抗 R2 (mid: y=195) -->
  <rect x="205" y="182" width="100" height="26" fill="#ffffff" stroke="#0f172a" stroke-width="2.2"/>
  <text x="255" y="200" font-size="13" font-weight="800" fill="#0f172a" text-anchor="middle">R₂ ＝ 30Ω</text>
  <!-- 電源 (bottom: y=250) -->
  <rect x="205" y="236" width="52" height="28" fill="#ffffff"/>
  <line x1="224" y1="234" x2="224" y2="266" stroke="#0f172a" stroke-width="3.2"/>
  <line x1="238" y1="241" x2="238" y2="259" stroke="#0f172a" stroke-width="5"/>
  <text x="231" y="282" font-size="13" font-weight="800" fill="#b91c1c" text-anchor="middle">電源 6.0V</text>
  <!-- 電流計A -->
  <circle cx="75" cy="178" r="16" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.2"/>
  <text x="75" y="183" font-size="14" font-weight="800" fill="#854d0e" text-anchor="middle">A</text>
  {ann}
''')

# =========================================================================
# 3. 理科③ 動滑車と仕事の原理 (sci_pulley_q / sci_pulley_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 左右2本の張力 -->
  <line x1="158" y1="145" x2="158" y2="85" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)"/>
  <line x1="222" y1="145" x2="222" y2="85" stroke="#dc2626" stroke-width="3" marker-end="url(#arr-red)"/>
  <text x="112" y="112" font-size="12" font-weight="800" fill="#dc2626" text-anchor="middle">左ひも 10N</text>
  <text x="282" y="112" font-size="12" font-weight="800" fill="#dc2626" text-anchor="middle">右ひも F＝10N</text>
  <!-- 右パネルまとめ -->
  <rect x="305" y="65" width="198" height="165" rx="10" fill="#f8fafc" stroke="#2563eb" stroke-width="2"/>
  <text x="404" y="90" font-size="12.5" font-weight="800" fill="#1e40af" text-anchor="middle">✏️ 動滑車の鉄則（摩擦・重さなし）</text>
  <text x="318" y="118" font-size="12" font-weight="700" fill="#dc2626">① 引く力 F ＝ 半分（20÷2＝10N）</text>
  <text x="318" y="146" font-size="12" font-weight="700" fill="#2563eb">② 引く距離 ＝ 2倍（0.5×2＝1.0m）</text>
  <text x="318" y="176" font-size="12" font-weight="800" fill="#15803d">③ 仕事 W ＝ 10N × 1.0m ＝ 10J</text>
  <text x="318" y="200" font-size="11" font-weight="700" fill="#475569">（直接持ち上げる 20N×0.5m＝10J</text>
  <text x="318" y="216" font-size="11" font-weight="700" fill="#475569">　と【仕事の原理】で完全に等しい！）</text>
'''
    save(f"sci_pulley_{mode}.svg", f'''
  <text x="18" y="26" font-size="13" font-weight="800" fill="#0f172a">動滑車を使って重さ 20N の物体を 0.5m 引き上げる実験</text>
  <!-- 天井 -->
  <rect x="85" y="42" width="190" height="10" fill="#cbd5e1"/>
  <line x1="85" y1="52" x2="275" y2="52" stroke="#334155" stroke-width="2.5"/>
  <!-- 左ひも・右ひも -->
  <line x1="158" y1="52" x2="158" y2="162" stroke="#475569" stroke-width="2.5"/>
  <line x1="222" y1="62" x2="222" y2="162" stroke="#475569" stroke-width="2.5"/>
  <!-- 手で引く矢印 -->
  <line x1="222" y1="78" x2="222" y2="56" stroke="#0f172a" stroke-width="2.5" marker-end="url(#arr-slate)"/>
  <text x="252" y="68" font-size="12" font-weight="800" fill="#0f172a">手で引く F</text>
  <!-- 動滑車 -->
  <circle cx="190" cy="162" r="32" fill="#e2e8f0" stroke="#334155" stroke-width="3"/>
  <circle cx="190" cy="162" r="6" fill="#334155"/>
  <line x1="190" y1="162" x2="190" y2="215" stroke="#334155" stroke-width="3"/>
  <!-- 物体 20N -->
  <rect x="150" y="215" width="80" height="50" rx="6" fill="#fed7aa" stroke="#c2410c" stroke-width="2.4"/>
  <text x="190" y="238" font-size="13" font-weight="800" fill="#9a3412" text-anchor="middle">物体 20N</text>
  <text x="190" y="256" font-size="11" font-weight="700" fill="#9a3412" text-anchor="middle">↑ 0.5m 上昇</text>
  {ann}
''')

# =========================================================================
# 4. 理科④ 中和のイオン数変化グラフ (sci_neutral_q / sci_neutral_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 中和点の縦破線 -->
  <line x1="250" y1="52" x2="250" y2="235" stroke="#16a34a" stroke-width="2.2" stroke-dasharray="5,4"/>
  <rect x="195" y="36" width="110" height="22" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.5"/>
  <text x="250" y="51" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle">★ちょうど中和点</text>
  <!-- 各イオン名ラベル -->
  <text x="155" y="178" font-size="12" font-weight="800" fill="#dc2626">ア：H⁺（中和で0へ減少）</text>
  <text x="355" y="108" font-size="12" font-weight="800" fill="#0f172a">イ：Cl⁻（ずっと一定！）</text>
  <text x="342" y="68" font-size="12" font-weight="800" fill="#2563eb">ウ：Na⁺（最初から比例増加）</text>
  <text x="345" y="185" font-size="12" font-weight="800" fill="#9333ea">エ：OH⁻（中和後から増加！）</text>
'''
    else:
        ann = '''
  <text x="165" y="178" font-size="13" font-weight="800" fill="#dc2626">グラフ ア</text>
  <text x="380" y="108" font-size="13" font-weight="800" fill="#0f172a">グラフ イ</text>
  <text x="350" y="68" font-size="13" font-weight="800" fill="#2563eb">グラフ ウ</text>
  <text x="380" y="185" font-size="13" font-weight="800" fill="#9333ea">グラフ エ</text>
'''
    save(f"sci_neutral_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">うすい塩酸に水酸化ナトリウム水溶液を加えたときのイオン数の変化</text>
  <!-- 軸 -->
  <line x1="70" y1="235" x2="475" y2="235" stroke="#334155" stroke-width="2.2" marker-end="url(#arr-slate)"/>
  <line x1="70" y1="235" x2="70" y2="48" stroke="#334155" stroke-width="2.2" marker-end="url(#arr-slate)"/>
  <text x="275" y="272" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">加えた水酸化ナトリウム水溶液の体積 (cm³)</text>
  <text x="32" y="145" font-size="12" font-weight="700" fill="#334155" text-anchor="middle" transform="rotate(-90 32 145)">イオンの数</text>
  <text x="60" y="248" font-size="12" font-weight="700" fill="#334155">0</text>
  <text x="250" y="253" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">10</text>
  <text x="430" y="253" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">20</text>
  <!-- イ: Cl- (constant at y=118) -->
  <line x1="70" y1="118" x2="450" y2="118" stroke="#0f172a" stroke-width="2.8" stroke-dasharray="7,4"/>
  <!-- ア: H+ (70,122 -> 250,235 -> 450,235) -->
  <polyline points="70,122 250,235 450,235" fill="none" stroke="#dc2626" stroke-width="3"/>
  <!-- ウ: Na+ (70,235 -> 250,118 -> 430,52) -->
  <line x1="70" y1="235" x2="415" y2="55" stroke="#2563eb" stroke-width="2.8"/>
  <!-- エ: OH- (70,235 -> 250,235 -> 430,122) -->
  <polyline points="70,235 250,235 430,122" fill="none" stroke="#9333ea" stroke-width="3"/>
  {ann}
''')

# =========================================================================
# 5. 理科⑤ 金星の公転軌道と満ち欠け・見え方 (sci_venus_q / sci_venus_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 地球から見た西（夕方）と東（明け方）の視線 -->
  <line x1="260" y1="242" x2="155" y2="165" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="5,3" marker-end="url(#arr-red)"/>
  <line x1="260" y1="242" x2="365" y2="165" stroke="#2563eb" stroke-width="2.2" stroke-dasharray="5,3" marker-end="url(#arr-blue)"/>
  <rect x="14" y="60" width="142" height="86" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="85" y="80" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">明け方・東の空</text>
  <text x="85" y="97" font-size="11" font-weight="700" fill="#991b1b" text-anchor="middle">（明けの明星：A・B側）</text>
  <text x="85" y="116" font-size="10.5" font-weight="700" fill="#7f1d1d" text-anchor="middle">Aは近くて大きく三日月形</text>
  <text x="85" y="133" font-size="10.5" font-weight="700" fill="#7f1d1d" text-anchor="middle">左側（太陽側）が光る！</text>

  <rect x="364" y="60" width="142" height="86" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
  <text x="435" y="80" font-size="11.5" font-weight="800" fill="#1d4ed8" text-anchor="middle">夕方・西の空</text>
  <text x="435" y="97" font-size="11" font-weight="700" fill="#1e40af" text-anchor="middle">（よいの明星：C・D側）</text>
  <text x="435" y="116" font-size="10.5" font-weight="700" fill="#1e3a8a" text-anchor="middle">Dは近くて大きく三日月形</text>
  <text x="435" y="133" font-size="10.5" font-weight="700" fill="#1e3a8a" text-anchor="middle">右側（太陽側）が光る！</text>
  <text x="260" y="282" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle">地球は反時計回り自転 → 左側が朝（東）・右側が夕方（西）！</text>
'''
    save(f"sci_venus_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">北極側から見た太陽・金星の軌道（A〜D）・地球の位置関係</text>
  <!-- 地球軌道の一部 -->
  <path d="M 105,230 A 165,165 0 0,0 415,230" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="5,4"/>
  <!-- 金星軌道 -->
  <circle cx="260" cy="128" r="72" fill="none" stroke="#64748b" stroke-width="1.8"/>
  <!-- 太陽 -->
  <circle cx="260" cy="128" r="20" fill="#fde047" stroke="#eab308" stroke-width="2.5"/>
  <text x="260" y="133" font-size="12" font-weight="800" fill="#854d0e" text-anchor="middle">太陽</text>
  <!-- 金星 A(左下:地球に近い東側), B(左上:太陽の奥東側), C(右上:太陽の奥西側), D(右下:地球に近い西側) -->
  <circle cx="204" cy="173" r="9" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/><text x="186" y="182" font-size="13" font-weight="800" fill="#9a3412">A</text>
  <circle cx="204" cy="83" r="9" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/><text x="186" y="84" font-size="13" font-weight="800" fill="#9a3412">B</text>
  <circle cx="316" cy="83" r="9" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/><text x="330" y="84" font-size="13" font-weight="800" fill="#9a3412">C</text>
  <circle cx="316" cy="173" r="9" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/><text x="330" y="182" font-size="13" font-weight="800" fill="#9a3412">D</text>
  <!-- 地球（昼側＝上半分、夜側＝下半分） -->
  <circle cx="260" cy="242" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
  <path d="M 242,242 A 18,18 0 0,1 278,242 Z" fill="#38bdf8"/>
  <text x="260" y="220" font-size="11.5" font-weight="800" fill="#0369a1" text-anchor="middle">地球</text>
  {ann}
''')

# =========================================================================
# 6. 理科⑥ 寒冷前線と温暖前線の断面図 (sci_fronts_q / sci_fronts_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <rect x="28" y="42" width="215" height="58" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>
  <text x="135" y="60" font-size="11.5" font-weight="800" fill="#1d4ed8" text-anchor="middle">寒冷前線（左：寒気が潜り込む急斜面）</text>
  <text x="135" y="77" font-size="10.5" font-weight="700" fill="#1e3a8a" text-anchor="middle">・積乱雲（縦に発達）→ 狭い範囲に強雨</text>
  <text x="135" y="92" font-size="10.5" font-weight="700" fill="#dc2626" text-anchor="middle">・通過後：北寄りの風に変わり気温急降下！</text>

  <rect x="272" y="42" width="222" height="58" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="383" y="60" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">温暖前線（右：暖気がはい上がる緩斜面）</text>
  <text x="383" y="77" font-size="10.5" font-weight="700" fill="#991b1b" text-anchor="middle">・乱層雲（横に広がる）→ 広い範囲に長雨</text>
  <text x="383" y="92" font-size="10.5" font-weight="700" fill="#15803d" text-anchor="middle">・通過後：南寄りの風になり気温上昇！</text>
'''
    save(f"sci_fronts_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">温帯低気圧に伴う前線A・前線Bの断面模式図（西 → 東）</text>
  <!-- 地面 -->
  <rect x="25" y="245" width="470" height="18" fill="#d6d3d1"/>
  <line x1="25" y1="245" x2="495" y2="245" stroke="#44403c" stroke-width="2.5"/>
  <!-- 左側寒気・前線A（急斜面） -->
  <path d="M 25,155 L 135,165 Q 185,180 198,245 L 25,245 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
  <text x="95" y="218" font-size="13" font-weight="800" fill="#1e40af">寒気</text>
  <text x="195" y="278" font-size="12.5" font-weight="800" fill="#0f172a" text-anchor="middle">前線A</text>
  <!-- 右側寒気・前線B（緩斜面） -->
  <path d="M 335,245 L 495,155 L 495,245 Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
  <text x="448" y="225" font-size="13" font-weight="800" fill="#1e40af">寒気</text>
  <text x="335" y="278" font-size="12.5" font-weight="800" fill="#0f172a" text-anchor="middle">前線B</text>
  <!-- 中央暖気上昇 -->
  <text x="265" y="215" font-size="13" font-weight="800" fill="#dc2626" text-anchor="middle">暖気</text>
  <line x1="210" y1="210" x2="188" y2="145" stroke="#dc2626" stroke-width="2.4" marker-end="url(#arr-red)"/>
  <line x1="320" y1="215" x2="415" y2="155" stroke="#dc2626" stroke-width="2.4" marker-end="url(#arr-red)"/>
  <!-- 雲X(積乱雲) & 雲Y(乱層雲) -->
  <rect x="155" y="108" width="46" height="82" rx="18" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="178" y="152" font-size="12" font-weight="800" fill="#1e293b" text-anchor="middle">雲X</text>
  <ellipse cx="405" cy="152" rx="68" ry="20" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
  <text x="405" y="156" font-size="12" font-weight="800" fill="#1e293b" text-anchor="middle">雲Y</text>
  <!-- 雨 -->
  <line x1="168" y1="195" x2="164" y2="242" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="4,3"/>
  <line x1="184" y1="195" x2="180" y2="242" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="4,3"/>
  <line x1="365" y1="174" x2="360" y2="242" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="395" y1="174" x2="390" y2="242" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="425" y1="174" x2="420" y2="242" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="4,3"/>
  {ann}
''')

# =========================================================================
# 7. 数学① 長方形の動点Pと面積変化グラフ (math_moving_pt_q / math_moving_pt_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 左図の高さ書き込み -->
  <polygon points="45,80 185,80 125,200" fill="#dcfce7" fill-opacity="0.65" stroke="#16a34a" stroke-width="2.2"/>
  <line x1="125" y1="80" x2="125" y2="200" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="4,3"/>
  <text x="115" y="145" font-size="11.5" font-weight="800" fill="#dc2626" text-anchor="end">高さ6cm一定！</text>
  <!-- 右グラフの3区間式書き込み -->
  <text x="275" y="140" font-size="11" font-weight="800" fill="#2563eb">① y＝4x</text>
  <rect x="330" y="64" width="102" height="24" rx="6" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
  <text x="381" y="80" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle">② y＝24（一定）</text>
  <rect x="382" y="172" width="122" height="38" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.4"/>
  <text x="443" y="188" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">③ 残りPD＝20−x</text>
  <text x="443" y="203" font-size="11.5" font-weight="800" fill="#dc2626" text-anchor="middle">y＝−4x＋80</text>
'''
    save(f"math_moving_pt_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">長方形ABCD上の動点P（毎秒1cm：A→B→C→D）と △APDの面積y</text>
  <!-- 左：長方形 A(45,80), D(185,80), B(45,200), C(185,200) -->
  <rect x="45" y="80" width="140" height="120" fill="#f8fafc" stroke="#0f172a" stroke-width="2.4"/>
  <text x="35" y="76" font-size="13" font-weight="800" fill="#0f172a">A</text>
  <text x="190" y="76" font-size="13" font-weight="800" fill="#0f172a">D</text>
  <text x="35" y="216" font-size="13" font-weight="800" fill="#0f172a">B</text>
  <text x="190" y="216" font-size="13" font-weight="800" fill="#0f172a">C</text>
  <text x="115" y="72" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">8cm</text>
  <text x="24" y="145" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">6cm</text>
  <circle cx="45" cy="145" r="5" fill="#2563eb"/>
  <text x="56" y="150" font-size="12" font-weight="800" fill="#2563eb">P ↓</text>
  <!-- 右：面積グラフ (origin 265,225) -->
  <line x1="265" y1="225" x2="495" y2="225" stroke="#334155" stroke-width="2" marker-end="url(#arr-slate)"/>
  <line x1="265" y1="225" x2="265" y2="55" stroke="#334155" stroke-width="2" marker-end="url(#arr-slate)"/>
  <polyline points="265,225 325,95 415,95 475,225" fill="none" stroke="#0f172a" stroke-width="2.8"/>
  <text x="255" y="100" font-size="11.5" font-weight="700" fill="#334155" text-anchor="end">24</text>
  <text x="265" y="242" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">0</text>
  <text x="325" y="242" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">6</text>
  <text x="415" y="242" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">14</text>
  <text x="475" y="242" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">20(秒)</text>
  {ann}
''')

# =========================================================================
# 8. 数学② 円錐・球・円柱の体積比 1:2:3 (math_archimedes_q / math_archimedes_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <rect x="270" y="55" width="232" height="185" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="386" y="80" font-size="13" font-weight="800" fill="#1e40af" text-anchor="middle">✏️ アルキメデスの体積比 1：2：3</text>
  <text x="284" y="110" font-size="12" font-weight="700" fill="#15803d">・円錐 ＝ ⅓ × πr² × 2r ＝ ⅔πr³ 【1】</text>
  <text x="284" y="140" font-size="12" font-weight="800" fill="#dc2626">・球　 ＝ ⁴⁄₃πr³　　　　　　 【2】</text>
  <text x="284" y="170" font-size="12" font-weight="700" fill="#0f172a">・円柱 ＝ πr² × 2r ＝ 2πr³　 【3】</text>
  <rect x="284" y="188" width="204" height="38" rx="6" fill="#fef2f2" stroke="#dc2626" stroke-width="1.4"/>
  <text x="386" y="205" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">球は円柱のちょうど 2/3 倍！</text>
  <text x="386" y="220" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">すき間の水 ＝ 3−2 ＝ 円柱の 1/3！</text>
'''
    save(f"math_archimedes_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">底面の半径 r・高さ 2r の円柱にぴったり入る球と円錐</text>
  <!-- 円柱 -->
  <ellipse cx="145" cy="70" rx="70" ry="18" fill="#f1f5f9" stroke="#334155" stroke-width="2.2"/>
  <line x1="75" y1="70" x2="75" y2="210" stroke="#334155" stroke-width="2.2"/>
  <line x1="215" y1="70" x2="215" y2="210" stroke="#334155" stroke-width="2.2"/>
  <ellipse cx="145" cy="210" rx="70" ry="18" fill="#e2e8f0" stroke="#334155" stroke-width="2.2"/>
  <!-- 球 -->
  <circle cx="145" cy="140" r="70" fill="#fee2e2" fill-opacity="0.55" stroke="#dc2626" stroke-width="2.4"/>
  <!-- 円錐 -->
  <polygon points="145,70 75,210 215,210" fill="#dcfce7" fill-opacity="0.45" stroke="#16a34a" stroke-width="2" stroke-dasharray="5,3"/>
  <!-- 寸法 -->
  <line x1="145" y1="140" x2="215" y2="140" stroke="#0f172a" stroke-width="1.8"/>
  <text x="180" y="134" font-size="12.5" font-weight="800" fill="#0f172a" text-anchor="middle">r</text>
  <line x1="48" y1="70" x2="48" y2="210" stroke="#475569" stroke-width="1.8"/>
  <text x="32" y="145" font-size="12.5" font-weight="800" fill="#334155" text-anchor="middle">2r</text>
  {ann}
''')

# =========================================================================
# 9. 数学③ 平行線と等積変形（四角形ABCD → △ABE） (math_equal_quad_q / math_equal_quad_ans)
# =========================================================================
for mode in ("q", "ans"):
    ann = ""
    if mode == "ans":
        ann = '''
  <!-- 対角線 AC とそれに平行な DE -->
  <line x1="150" y1="62" x2="285" y2="225" stroke="#2563eb" stroke-width="2.4"/>
  <line x1="335" y1="92" x2="445" y2="225" stroke="#dc2626" stroke-width="2.6" stroke-dasharray="6,4"/>
  <polygon points="150,62 90,225 445,225" fill="#dcfce7" fill-opacity="0.45" stroke="#16a34a" stroke-width="2.5"/>
  <circle cx="445" cy="225" r="5" fill="#dc2626"/>
  <text x="445" y="246" font-size="13" font-weight="800" fill="#dc2626" text-anchor="middle">E</text>
  <rect x="275" y="38" width="228" height="46" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>
  <text x="389" y="57" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">AC ∥ DE を引くと △ACD＝△ACE！</text>
  <text x="389" y="75" font-size="11.5" font-weight="800" fill="#15803d" text-anchor="middle">よって 四角形ABCD ＝ △ABE に一発変形！</text>
'''
    save(f"math_equal_quad_{mode}.svg", f'''
  <text x="18" y="24" font-size="13" font-weight="800" fill="#0f172a">四角形ABCDの面積を変えずに △ABE に等積変形する作図</text>
  <!-- 直線 BC の延長 -->
  <line x1="55" y1="225" x2="485" y2="225" stroke="#64748b" stroke-width="1.8"/>
  <!-- 四角形 ABCD: A(150,62), B(90,225), C(285,225), D(335,92) -->
  <polygon points="150,62 90,225 285,225 335,92" fill="#f8fafc" stroke="#0f172a" stroke-width="2.6"/>
  <text x="142" y="54" font-size="13" font-weight="800" fill="#0f172a">A</text>
  <text x="82" y="246" font-size="13" font-weight="800" fill="#0f172a">B</text>
  <text x="285" y="246" font-size="13" font-weight="800" fill="#0f172a" text-anchor="middle">C</text>
  <text x="346" y="92" font-size="13" font-weight="800" fill="#0f172a">D</text>
  {ann}
''')

# =========================================================================
# 10. 社会スライド資料SVG 4種
# =========================================================================
# 10-A: 促成栽培・抑制栽培の出荷時期グラフ (soc_agri_calendar_v65.svg)
save("soc_agri_calendar_v65.svg", '''
  <text x="18" y="26" font-size="13.5" font-weight="800" fill="#0f172a">きゅうり・レタス等の県別・月別出荷割合モデル（栽培方法の比較）</text>
  <!-- 月ヘッダー -->
  <rect x="115" y="44" width="380" height="28" rx="6" fill="#f1f5f9"/>
  <text x="147" y="63" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">1〜3月(冬春)</text>
  <text x="242" y="63" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">4〜6月(春)</text>
  <text x="337" y="63" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">7〜9月(真夏)</text>
  <text x="432" y="63" font-size="11.5" font-weight="700" fill="#334155" text-anchor="middle">10〜12月(秋冬)</text>
  <!-- 産地X（促成：高知・宮崎） -->
  <text x="62" y="112" font-size="13" font-weight="800" fill="#dc2626" text-anchor="middle">産地X</text>
  <rect x="120" y="92" width="145" height="30" rx="6" fill="#fca5a5" stroke="#dc2626" stroke-width="2"/>
  <text x="192" y="112" font-size="11.5" font-weight="800" fill="#7f1d1d" text-anchor="middle">冬〜春に集中出荷！</text>
  <rect x="405" y="92" width="80" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
  <!-- 産地Y（普通・近郊：千葉・埼玉） -->
  <text x="62" y="168" font-size="13" font-weight="800" fill="#16a34a" text-anchor="middle">産地Y</text>
  <rect x="200" y="148" width="120" height="30" rx="6" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
  <text x="260" y="168" font-size="11.5" font-weight="800" fill="#14532d" text-anchor="middle">初夏・秋に出荷</text>
  <!-- 産地Z（抑制・高冷地：長野・群馬） -->
  <text x="62" y="224" font-size="13" font-weight="800" fill="#2563eb" text-anchor="middle">産地Z</text>
  <rect x="290" y="204" width="115" height="30" rx="6" fill="#93c5fd" stroke="#2563eb" stroke-width="2"/>
  <text x="347" y="224" font-size="11.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">真夏(7〜9月)に集中！</text>
  <text x="260" y="268" font-size="11.5" font-weight="700" fill="#475569" text-anchor="middle">※他の産地の出荷が少ない時期を狙って高値で出荷する工夫に注目！</text>
''')

# 10-B: 江戸の政治改革タイムライン (soc_edo_reforms_v65.svg)
save("soc_edo_reforms_v65.svg", '''
  <text x="18" y="26" font-size="13.5" font-weight="800" fill="#0f172a">江戸時代中〜後期の幕政改革タイムライン（時期A〜D）</text>
  <line x1="35" y1="145" x2="490" y2="145" stroke="#334155" stroke-width="3" marker-end="url(#arr-slate)"/>
  <!-- A: 享保(1716) -->
  <rect x="26" y="55" width="104" height="72" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
  <text x="78" y="75" font-size="12" font-weight="800" fill="#1d4ed8" text-anchor="middle">改革A (1716〜)</text>
  <text x="78" y="95" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">上げ米の制</text>
  <text x="78" y="113" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">公事方御定書</text>
  <!-- B: 田沼(1772) -->
  <rect x="144" y="165" width="104" height="72" rx="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
  <text x="196" y="185" font-size="12" font-weight="800" fill="#854d0e" text-anchor="middle">政治B (1772〜)</text>
  <text x="196" y="205" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">株仲間の奨励</text>
  <text x="196" y="223" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">長崎貿易の拡大</text>
  <!-- C: 寛政(1787) -->
  <rect x="262" y="55" width="104" height="72" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="314" y="75" font-size="12" font-weight="800" fill="#15803d" text-anchor="middle">改革C (1787〜)</text>
  <text x="314" y="95" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">旧里帰農令</text>
  <text x="314" y="113" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">棄捐令・囲米</text>
  <!-- D: 天保(1841) -->
  <rect x="380" y="165" width="108" height="72" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
  <text x="434" y="185" font-size="12" font-weight="800" fill="#b91c1c" text-anchor="middle">改革D (1841〜)</text>
  <text x="434" y="205" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">株仲間の解散</text>
  <text x="434" y="223" font-size="11" font-weight="700" fill="#1e293b" text-anchor="middle">人返し令・上知令</text>
''')

# 10-C: 戦後日本の実質経済成長率推移 (soc_postwar_gdp_v65.svg)
save("soc_postwar_gdp_v65.svg", '''
  <text x="18" y="26" font-size="13.5" font-weight="800" fill="#0f172a">戦後日本の実質経済成長率の推移と転換点（1955〜2000年頃）</text>
  <!-- 0%ライン -->
  <line x1="60" y1="205" x2="485" y2="205" stroke="#475569" stroke-width="2"/>
  <line x1="60" y1="50" x2="60" y2="245" stroke="#334155" stroke-width="2"/>
  <text x="48" y="90" font-size="11" font-weight="700" fill="#334155" text-anchor="end">10%</text>
  <line x1="60" y1="86" x2="485" y2="86" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="4,4"/>
  <text x="48" y="148" font-size="11" font-weight="700" fill="#334155" text-anchor="end">5%</text>
  <text x="48" y="210" font-size="11" font-weight="700" fill="#334155" text-anchor="end">0%</text>
  <!-- 高度経済成長ハイライト -->
  <rect x="70" y="55" width="160" height="150" fill="#dbeafe" fill-opacity="0.5"/>
  <text x="150" y="72" font-size="12" font-weight="800" fill="#1d4ed8" text-anchor="middle">期間P（年平均10%前後）</text>
  <!-- 折れ線 -->
  <polyline points="75,95 110,78 150,88 190,68 225,92 252,218 285,152 330,156 375,142 415,198 460,195" fill="none" stroke="#dc2626" stroke-width="3"/>
  <!-- 1974マイナス成長丸印 -->
  <circle cx="252" cy="218" r="6" fill="#dc2626"/>
  <text x="252" y="242" font-size="11.5" font-weight="800" fill="#b91c1c" text-anchor="middle">出来事Q(1973-74)</text>
  <text x="252" y="256" font-size="10.5" font-weight="700" fill="#b91c1c" text-anchor="middle">戦後初のマイナス成長！</text>
  <text x="80" y="272" font-size="11" font-weight="700" fill="#475569">1955</text>
  <text x="235" y="272" font-size="11" font-weight="700" fill="#475569">1973</text>
  <text x="380" y="272" font-size="11" font-weight="700" fill="#475569">1991</text>
''')

# 10-D: 日本の一般会計歳入・歳出の構成帯グラフ (soc_fiscal_budget_v65.svg)
save("soc_fiscal_budget_v65.svg", '''
  <text x="18" y="26" font-size="13.5" font-weight="800" fill="#0f172a">日本の国の一般会計予算（歳入・歳出の主な内訳モデル）</text>
  <!-- 歳入バー -->
  <text x="24" y="82" font-size="13" font-weight="800" fill="#0f172a">歳入（収入）</text>
  <rect x="24" y="92" width="285" height="44" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.8"/>
  <text x="166" y="119" font-size="12" font-weight="800" fill="#1e3a8a" text-anchor="middle">租税・印紙収入（約6〜7割）</text>
  <rect x="309" y="92" width="150" height="44" fill="#fca5a5" stroke="#dc2626" stroke-width="1.8"/>
  <text x="384" y="119" font-size="12" font-weight="800" fill="#7f1d1d" text-anchor="middle">項目X（約3割）</text>
  <rect x="459" y="92" width="38" height="44" fill="#e2e8f0" stroke="#64748b" stroke-width="1.8"/>
  <!-- 歳出バー -->
  <text x="24" y="176" font-size="13" font-weight="800" fill="#0f172a">歳出（支出）</text>
  <rect x="24" y="186" width="165" height="44" fill="#86efac" stroke="#15803d" stroke-width="1.8"/>
  <text x="106" y="213" font-size="12" font-weight="800" fill="#14532d" text-anchor="middle">項目Y（最大の約1/3）</text>
  <rect x="189" y="186" width="112" height="44" fill="#fde047" stroke="#ca8a04" stroke-width="1.8"/>
  <text x="245" y="213" font-size="11.5" font-weight="800" fill="#713f12" text-anchor="middle">国債費（約2割強）</text>
  <rect x="301" y="186" width="80" height="44" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.8"/>
  <text x="341" y="213" font-size="11" font-weight="800" fill="#4c1d95" text-anchor="middle">地方交付税</text>
  <rect x="381" y="186" width="116" height="44" fill="#f1f5f9" stroke="#64748b" stroke-width="1.8"/>
  <text x="439" y="213" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">公共事業・文教・防衛等</text>
  <text x="260" y="264" font-size="11.5" font-weight="700" fill="#475569" text-anchor="middle">※少子高齢化で膨らむ歳出最大の項目Yと、国の借金にあたる歳入項目Xに注目！</text>
''')

print("Generated 22 v6.5 high-precision SVGs successfully in", OUT_DIR)
