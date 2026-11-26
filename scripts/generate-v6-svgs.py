#!/usr/bin/env python3
"""
Generate crisp, mobile-legible SVG diagrams for Manatobi Juken v6:
- Math: Problem SVGs (*_q.svg) + Annotated Solution SVGs (*_ans.svg) with auxiliary lines,
  shaded area/volume breakdowns, coordinates, and step callouts.
- Social Studies: Multi-slide reference SVGs (climographs, industrial regions, historical trade,
  exchange rate & BOJ monetary policy diagrams).
"""
from pathlib import Path

OUT = Path("/home/user/webapp/public/juken_figs/v6")
OUT.mkdir(parents=True, exist_ok=True)

FONT = "system-ui, -apple-system, 'Noto Sans JP', sans-serif"


def wrap_svg(body: str, w: int = 520, h: int = 320) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
        f'style="font-family:{FONT};background:#ffffff">\n{body}\n</svg>\n'
    )


# 1. Parabola y = 1/2 x^2 and line AB: A(-2,2), B(4,8), C(0,4)
# Map math (x in [-4,5], y in [-1,9.5]) -> svg
def px_para(x: float) -> float:
    return 190 + x * 46


def py_para(y: float) -> float:
    return 276 - y * 27


def build_parabola_split():
    pts = " ".join(f"{px_para(x/10):.1f},{py_para(0.5*(x/10)**2):.1f}" for x in range(-42, 45, 2))
    ax, ay = px_para(-2), py_para(2)
    bx, by = px_para(4), py_para(8)
    ox, oy = px_para(0), py_para(0)
    cx, cy = px_para(0), py_para(4)

    base = f"""
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155"/>
    </marker>
    <marker id="arrRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626"/>
    </marker>
  </defs>
  <!-- Grid -->
  <g stroke="#f1f5f9" stroke-width="1">
    {''.join(f'<line x1="{px_para(i):.1f}" y1="16" x2="{px_para(i):.1f}" y2="295"/>' for i in range(-3, 6))}
    {''.join(f'<line x1="25" y1="{py_para(j):.1f}" x2="455" y2="{py_para(j):.1f}"/>' for j in range(1, 10))}
  </g>
  <!-- Axes -->
  <line x1="25" y1="{oy:.1f}" x2="462" y2="{oy:.1f}" stroke="#334155" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="{ox:.1f}" y1="302" x2="{ox:.1f}" y2="16" stroke="#334155" stroke-width="2" marker-end="url(#arr)"/>
  <text x="468" y="{oy+5:.1f}" font-size="15" font-weight="800" fill="#1e293b">x</text>
  <text x="{ox+8:.1f}" y="22" font-size="15" font-weight="800" fill="#1e293b">y</text>
  <text x="{ox-16:.1f}" y="{oy+18:.1f}" font-size="14" font-weight="800" fill="#1e293b">O</text>
"""
    q_body = (
        base
        + f"""
  <polygon points="{ox:.1f},{oy:.1f} {ax:.1f},{ay:.1f} {bx:.1f},{by:.1f}" fill="#dbeafe" fill-opacity="0.45" stroke="#2563eb" stroke-width="1.5"/>
  <polyline points="{pts}" fill="none" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="{px_para(-3.2):.1f}" y1="{py_para(0.8):.1f}" x2="{px_para(4.5):.1f}" y2="{py_para(8.5):.1f}" stroke="#1d4ed8" stroke-width="2.2"/>
  <circle cx="{ax:.1f}" cy="{ay:.1f}" r="4.5" fill="#1e293b"/>
  <circle cx="{bx:.1f}" cy="{by:.1f}" r="4.5" fill="#1e293b"/>
  <text x="{ax-58:.1f}" y="{ay-8:.1f}" font-size="14" font-weight="800" fill="#1e293b">A(-2, a)</text>
  <text x="{bx+8:.1f}" y="{by+5:.1f}" font-size="14" font-weight="800" fill="#1e293b">B(4, 8)</text>
  <text x="28" y="38" font-size="14" font-weight="800" fill="#0f172a">y = ½x²</text>
"""
    )

    ans_body = (
        base
        + f"""
  <!-- Shaded split triangles OAC (left, rose) + OBC (right, sky) -->
  <polygon points="{ox:.1f},{oy:.1f} {ax:.1f},{ay:.1f} {cx:.1f},{cy:.1f}" fill="#fecdd3" fill-opacity="0.65"/>
  <polygon points="{ox:.1f},{oy:.1f} {bx:.1f},{by:.1f} {cx:.1f},{cy:.1f}" fill="#bae6fd" fill-opacity="0.65"/>
  <polyline points="{pts}" fill="none" stroke="#1e293b" stroke-width="2.3"/>
  <line x1="{px_para(-3.2):.1f}" y1="{py_para(0.8):.1f}" x2="{px_para(4.5):.1f}" y2="{py_para(8.5):.1f}" stroke="#1d4ed8" stroke-width="2.2"/>
  <!-- Red base OC on y-axis -->
  <line x1="{ox:.1f}" y1="{oy:.1f}" x2="{cx:.1f}" y2="{cy:.1f}" stroke="#dc2626" stroke-width="4.5"/>
  <!-- Dashed heights from A and B to y-axis -->
  <line x1="{ax:.1f}" y1="{ay:.1f}" x2="{ox:.1f}" y2="{ay:.1f}" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>
  <line x1="{bx:.1f}" y1="{by:.1f}" x2="{ox:.1f}" y2="{by:.1f}" stroke="#0284c7" stroke-width="2" stroke-dasharray="5,4"/>
  <circle cx="{ax:.1f}" cy="{ay:.1f}" r="5" fill="#dc2626"/>
  <circle cx="{bx:.1f}" cy="{by:.1f}" r="5" fill="#0284c7"/>
  <circle cx="{cx:.1f}" cy="{cy:.1f}" r="5.5" fill="#dc2626"/>
  <text x="{ax-64:.1f}" y="{ay-8:.1f}" font-size="13.5" font-weight="800" fill="#991b1b">A(-2, 2)</text>
  <text x="{bx+8:.1f}" y="{by+16:.1f}" font-size="13.5" font-weight="800" fill="#075985">B(4, 8)</text>
  <text x="{cx+8:.1f}" y="{cy+4:.1f}" font-size="14" font-weight="900" fill="#dc2626">切片 C(0, 4)</text>
  <text x="{(ax+ox)/2-22:.1f}" y="{ay+16:.1f}" font-size="12.5" font-weight="900" fill="#dc2626">高さ2</text>
  <text x="{(bx+ox)/2-18:.1f}" y="{by-6:.1f}" font-size="12.5" font-weight="900" fill="#0369a1">高さ4</text>
  <text x="{ox+6:.1f}" y="{(oy+cy)/2+6:.1f}" font-size="12.5" font-weight="900" fill="#dc2626">共通底辺 OC=4</text>
  <!-- Formula callout box -->
  <rect x="262" y="196" width="244" height="74" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.8"/>
  <text x="273" y="217" font-size="12.5" font-weight="900" fill="#92400e">✏️ y軸の切片Cで左右に2分割！</text>
  <text x="273" y="238" font-size="12.5" font-weight="800" fill="#1e293b">△OAB = ½ × 底辺4 × (2 + 4)</text>
  <text x="273" y="258" font-size="13.5" font-weight="900" fill="#dc2626">　　　= ½ × 4 × 6 = 12</text>
"""
    )
    (OUT / "math_parabola_split_q.svg").write_text(wrap_svg(q_body), encoding="utf-8")
    (OUT / "math_parabola_split_ans.svg").write_text(wrap_svg(ans_body), encoding="utf-8")


# 2. Equal-area transformation on parabola (parallel line through O / P)
def build_parabola_equal_area():
    pts = " ".join(f"{px_para(x/10):.1f},{py_para(0.5*(x/10)**2):.1f}" for x in range(-42, 45, 2))
    ax, ay = px_para(-2), py_para(2)
    bx, by = px_para(4), py_para(8)
    ox, oy = px_para(0), py_para(0)
    px, py = px_para(2), py_para(2)

    q_body = f"""
  <line x1="25" y1="{oy:.1f}" x2="462" y2="{oy:.1f}" stroke="#334155" stroke-width="2"/>
  <line x1="{ox:.1f}" y1="300" x2="{ox:.1f}" y2="18" stroke="#334155" stroke-width="2"/>
  <polygon points="{ox:.1f},{oy:.1f} {ax:.1f},{ay:.1f} {bx:.1f},{by:.1f}" fill="#e0e7ff" fill-opacity="0.55" stroke="#4338ca" stroke-width="1.8"/>
  <polyline points="{pts}" fill="none" stroke="#1e293b" stroke-width="2.4"/>
  <line x1="{px_para(-3):.1f}" y1="{py_para(1):.1f}" x2="{px_para(4.4):.1f}" y2="{py_para(8.4):.1f}" stroke="#1d4ed8" stroke-width="2"/>
  <circle cx="{ax:.1f}" cy="{ay:.1f}" r="4.5" fill="#1e293b"/>
  <circle cx="{bx:.1f}" cy="{by:.1f}" r="4.5" fill="#1e293b"/>
  <circle cx="{px:.1f}" cy="{py:.1f}" r="5" fill="#7c3aed"/>
  <text x="{ax-58:.1f}" y="{ay-8:.1f}" font-size="14" font-weight="800" fill="#1e293b">A(-2, 2)</text>
  <text x="{bx+8:.1f}" y="{by+5:.1f}" font-size="14" font-weight="800" fill="#1e293b">B(4, 8)</text>
  <text x="{px+10:.1f}" y="{py+16:.1f}" font-size="14" font-weight="900" fill="#6d28d9">点P (x&gt;0)</text>
  <text x="{ox-16:.1f}" y="{oy+18:.1f}" font-size="14" font-weight="800" fill="#1e293b">O</text>
  <text x="32" y="38" font-size="14" font-weight="800" fill="#1e293b">y = ½x²（△PAB = △OAB となる点P）</text>
"""
    ans_body = (
        q_body
        + f"""
  <!-- Parallel line through O with slope 1: y = x => intersects y=1/2 x^2 at P(2,2) -->
  <polygon points="{px:.1f},{py:.1f} {ax:.1f},{ay:.1f} {bx:.1f},{by:.1f}" fill="#bbf7d0" fill-opacity="0.55" stroke="#16a34a" stroke-width="2.2"/>
  <line x1="{px_para(-1.2):.1f}" y1="{py_para(-1.2):.1f}" x2="{px_para(4.2):.1f}" y2="{py_para(4.2):.1f}" stroke="#dc2626" stroke-width="2.6" stroke-dasharray="6,4"/>
  <text x="278" y="216" font-size="12.5" font-weight="900" fill="#dc2626">✏️ 等積変形：Oを通りAB(傾き1)に平行！</text>
  <rect x="262" y="226" width="246" height="62" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="1.6"/>
  <text x="272" y="247" font-size="12.5" font-weight="800" fill="#1e293b">平行線の式 y = x と y = ½x² を連立</text>
  <text x="272" y="269" font-size="13.5" font-weight="900" fill="#dc2626">½x² = x ⇒ x = 2 ⇒ P(2, 2)</text>
"""
    )
    (OUT / "math_parabola_equal_area_q.svg").write_text(wrap_svg(q_body), encoding="utf-8")
    (OUT / "math_parabola_equal_area_ans.svg").write_text(wrap_svg(ans_body), encoding="utf-8")


# 3. Cone shortest string around lateral surface
def build_cone_shortest():
    q_body = """
  <!-- 3D Cone on left -->
  <ellipse cx="145" cy="242" rx="58" ry="20" fill="#f8fafc" stroke="#1e293b" stroke-width="2" stroke-dasharray="5,4"/>
  <path d="M 87 242 A 58 20 0 0 0 203 242" fill="none" stroke="#1e293b" stroke-width="2.4"/>
  <line x1="145" y1="48" x2="87" y2="242" stroke="#1e293b" stroke-width="2.4"/>
  <line x1="145" y1="48" x2="203" y2="242" stroke="#1e293b" stroke-width="2.4"/>
  <line x1="145" y1="242" x2="203" y2="242" stroke="#0284c7" stroke-width="2"/>
  <path d="M 203 242 Q 130 190 99 182 Q 145 162 203 242" fill="none" stroke="#7c3aed" stroke-width="2.5"/>
  <text x="139" y="38" font-size="15" font-weight="900" fill="#1e293b">O</text>
  <text x="210" y="248" font-size="15" font-weight="900" fill="#1e293b">A</text>
  <text x="162" y="236" font-size="13" font-weight="800" fill="#0369a1">r=2cm</text>
  <text x="184" y="142" font-size="13.5" font-weight="800" fill="#1e293b">母線 6cm</text>
  <rect x="255" y="78" width="240" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.6"/>
  <text x="272" y="108" font-size="14" font-weight="900" fill="#1e293b">【問題】円錐の側面の最短距離</text>
  <text x="272" y="134" font-size="13" font-weight="700" fill="#334155">底面の半径 2cm、母線 6cm の円錐で</text>
  <text x="272" y="156" font-size="13" font-weight="700" fill="#334155">点Aから側面を1周して点Aに戻る</text>
  <text x="272" y="178" font-size="13" font-weight="800" fill="#6d28d9">ひもの長さが最も短くなるときは？</text>
"""
    # Unfolded sector with R=6 (scaled 28 -> 168px), angle 120 deg (-60 to +60 from down? Let's place O at (250, 56), A at (-60deg), A' at (+60deg))
    # O=(250,52), R=175: A=(250 - 151.5, 52 + 87.5)=(98.5, 139.5), A'=(401.5, 139.5), arc bottom at y=227
    ans_body = """
  <!-- Unfolded sector O-A-A' (120 deg) -->
  <path d="M 250 48 L 98.4 135.5 A 175 175 0 0 0 401.6 135.5 Z" fill="#eff6ff" stroke="#1e293b" stroke-width="2.3"/>
  <!-- Shortest straight chord AA' -->
  <line x1="98.4" y1="135.5" x2="401.6" y2="135.5" stroke="#dc2626" stroke-width="3.6"/>
  <!-- Perpendicular bisector OM -->
  <line x1="250" y1="48" x2="250" y2="135.5" stroke="#0284c7" stroke-width="2.2" stroke-dasharray="5,4"/>
  <rect x="250" y="125.5" width="10" height="10" fill="none" stroke="#0284c7" stroke-width="1.6"/>
  <!-- Angle labels -->
  <path d="M 224 63 A 30 30 0 0 0 276 63" fill="none" stroke="#d97706" stroke-width="2"/>
  <text x="206" y="84" font-size="12.5" font-weight="900" fill="#b45309">60°</text>
  <text x="262" y="84" font-size="12.5" font-weight="900" fill="#b45309">60°</text>
  <text x="244" y="38" font-size="15" font-weight="900" fill="#1e293b">O（中心角 360°×2/6 = 120°）</text>
  <text x="72" y="140" font-size="15" font-weight="900" fill="#dc2626">A</text>
  <text x="410" y="140" font-size="15" font-weight="900" fill="#dc2626">A'</text>
  <text x="255" y="152" font-size="13" font-weight="900" fill="#0284c7">M</text>
  <text x="142" y="86" font-size="13.5" font-weight="800" fill="#1e293b">母線 6cm</text>
  <text x="155" y="130" font-size="13.5" font-weight="900" fill="#dc2626">AM = 3√3 cm</text>
  <text x="282" y="130" font-size="13.5" font-weight="900" fill="#dc2626">MA' = 3√3 cm</text>
  <!-- Bottom summary -->
  <rect x="44" y="236" width="432" height="68" rx="12" fill="#fef2f2" stroke="#ef4444" stroke-width="1.8"/>
  <text x="60" y="259" font-size="13" font-weight="900" fill="#991b1b">✏️ 展開図のおうぎ形で A と A' を一直線に結ぶ！</text>
  <text x="60" y="284" font-size="13.5" font-weight="900" fill="#1e293b">1:2:√3 の直角三角形より AA' = 3√3 × 2 = 6√3 cm</text>
"""
    (OUT / "math_cone_shortest_q.svg").write_text(wrap_svg(q_body), encoding="utf-8")
    (OUT / "math_cone_shortest_ans.svg").write_text(wrap_svg(ans_body), encoding="utf-8")


# 4. Cube 3-vertex cross section (tetrahedron A-BDE in 6cm cube)
def build_cube_cut():
    # Front face E(100,250)-F(240,250)-B(240,110)-A(100,110)? Wait standard top ABCD, bottom EFGH:
    # A(110,95), B(250,95), C(310,50), D(170,50)
    # E(110,235), F(250,235), G(310,190), H(170,190)
    cube_lines = """
  <!-- Hidden edges -->
  <line x1="170" y1="50" x2="170" y2="190" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <line x1="110" y1="235" x2="170" y2="190" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <line x1="310" y1="190" x2="170" y2="190" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <!-- Visible edges -->
  <polygon points="110,95 250,95 250,235 110,235" fill="none" stroke="#1e293b" stroke-width="2.3"/>
  <line x1="110" y1="95" x2="170" y2="50" stroke="#1e293b" stroke-width="2.3"/>
  <line x1="250" y1="95" x2="310" y2="50" stroke="#1e293b" stroke-width="2.3"/>
  <line x1="250" y1="235" x2="310" y2="190" stroke="#1e293b" stroke-width="2.3"/>
  <line x1="170" y1="50" x2="310" y2="50" stroke="#1e293b" stroke-width="2.3"/>
  <line x1="310" y1="50" x2="310" y2="190" stroke="#1e293b" stroke-width="2.3"/>
  <text x="90" y="96" font-size="14" font-weight="900" fill="#1e293b">A</text>
  <text x="255" y="96" font-size="14" font-weight="900" fill="#1e293b">B</text>
  <text x="316" y="54" font-size="14" font-weight="900" fill="#1e293b">C</text>
  <text x="158" y="42" font-size="14" font-weight="900" fill="#1e293b">D</text>
  <text x="90" y="244" font-size="14" font-weight="900" fill="#1e293b">E</text>
  <text x="255" y="246" font-size="14" font-weight="900" fill="#1e293b">F</text>
  <text x="316" y="196" font-size="14" font-weight="900" fill="#1e293b">G</text>
  <text x="155" y="186" font-size="13" font-weight="800" fill="#64748b">H</text>
"""
    q_body = (
        cube_lines
        + """
  <circle cx="250" cy="95" r="4.5" fill="#2563eb"/>
  <circle cx="170" cy="50" r="4.5" fill="#2563eb"/>
  <circle cx="110" cy="235" r="4.5" fill="#2563eb"/>
  <text x="165" y="266" font-size="13.5" font-weight="800" fill="#1e293b">1辺 6cm の立方体 ABCD-EFGH</text>
  <rect x="336" y="74" width="168" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="348" y="102" font-size="13" font-weight="900" fill="#1e293b">3頂点 B, D, E を通る</text>
  <text x="348" y="124" font-size="13" font-weight="900" fill="#1e293b">平面で切断したときの</text>
  <text x="348" y="148" font-size="13" font-weight="800" fill="#2563eb">① 切り口の図形</text>
  <text x="348" y="170" font-size="13" font-weight="800" fill="#2563eb">② 三角錐A-BDEの体積</text>
"""
    )
    ans_body = (
        cube_lines
        + """
  <!-- Shaded top base ABD (blue) & Cross-section BDE (red) -->
  <polygon points="110,95 250,95 170,50" fill="#bae6fd" fill-opacity="0.55"/>
  <polygon points="250,95 170,50 110,235" fill="#fecdd3" fill-opacity="0.68" stroke="#dc2626" stroke-width="2.8"/>
  <!-- Highlight 3 perpendicular edges at A -->
  <line x1="110" y1="95" x2="250" y2="95" stroke="#0284c7" stroke-width="3.4"/>
  <line x1="110" y1="95" x2="170" y2="50" stroke="#0284c7" stroke-width="3.4"/>
  <line x1="110" y1="95" x2="110" y2="235" stroke="#16a34a" stroke-width="3.6"/>
  <text x="52" y="170" font-size="12.5" font-weight="900" fill="#15803d">高さ AE=6</text>
  <rect x="332" y="54" width="176" height="214" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.8"/>
  <text x="343" y="78" font-size="12.5" font-weight="900" fill="#92400e">✏️ 頂点Aに集まる3辺は垂直！</text>
  <text x="343" y="102" font-size="12" font-weight="800" fill="#0369a1">底面 △ABD = ½×6×6 = 18 cm²</text>
  <text x="343" y="124" font-size="12" font-weight="800" fill="#15803d">高さ AE = 6 cm</text>
  <text x="343" y="148" font-size="13" font-weight="900" fill="#dc2626">体積 V = ⅓×18×6 = 36 cm³</text>
  <line x1="343" y1="162" x2="496" y2="162" stroke="#fcd34d" stroke-width="1.5"/>
  <text x="343" y="182" font-size="11.5" font-weight="800" fill="#991b1b">切り口 △BDE は1辺 6√2 の</text>
  <text x="343" y="200" font-size="11.5" font-weight="900" fill="#991b1b">正三角形（面積 18√3 cm²）</text>
  <text x="343" y="222" font-size="11.5" font-weight="800" fill="#1e293b">Aから切り口への垂線 h も</text>
  <text x="343" y="242" font-size="12" font-weight="900" fill="#dc2626">⅓×18√3×h=36 ⇒ h=2√3 cm</text>
"""
    )
    (OUT / "math_cube_cut_q.svg").write_text(wrap_svg(q_body), encoding="utf-8")
    (OUT / "math_cube_cut_ans.svg").write_text(wrap_svg(ans_body), encoding="utf-8")


# 5. Annotated counterpart for existing /juken_figs/math_circle_similarity.svg + trapezoid area ratio
def build_trapezoid_area_ratio():
    # Trapezoid ABCD with AD // BC, AD:BC = 2:3, diagonals AC and BD intersect at O
    q_body = """
  <polygon points="155,62 315,62 395,246 75,246" fill="#f8fafc" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="155" y1="62" x2="395" y2="246" stroke="#334155" stroke-width="2"/>
  <line x1="315" y1="62" x2="75" y2="246" stroke="#334155" stroke-width="2"/>
  <circle cx="247" cy="132.5" r="4.5" fill="#1e293b"/>
  <text x="138" y="54" font-size="15" font-weight="900" fill="#1e293b">A</text>
  <text x="322" y="54" font-size="15" font-weight="900" fill="#1e293b">D</text>
  <text x="54" y="254" font-size="15" font-weight="900" fill="#1e293b">B</text>
  <text x="404" y="254" font-size="15" font-weight="900" fill="#1e293b">C</text>
  <text x="254" y="128" font-size="15" font-weight="900" fill="#1e293b">O</text>
  <text x="212" y="52" font-size="13.5" font-weight="800" fill="#2563eb">AD = 4 cm</text>
  <text x="212" y="268" font-size="13.5" font-weight="800" fill="#2563eb">BC = 6 cm（AD // BC）</text>
"""
    ans_body = """
  <!-- 4 regions colored with area ratio a^2 : ab : ab : b^2 = 4 : 6 : 6 : 9 -->
  <polygon points="155,62 315,62 247,132.5" fill="#fecdd3" fill-opacity="0.72"/>
  <polygon points="75,246 395,246 247,132.5" fill="#bae6fd" fill-opacity="0.72"/>
  <polygon points="155,62 75,246 247,132.5" fill="#fef08a" fill-opacity="0.65"/>
  <polygon points="315,62 395,246 247,132.5" fill="#fef08a" fill-opacity="0.65"/>
  <polygon points="155,62 315,62 395,246 75,246" fill="none" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="155" y1="62" x2="395" y2="246" stroke="#dc2626" stroke-width="2.2"/>
  <line x1="315" y1="62" x2="75" y2="246" stroke="#0284c7" stroke-width="2.2"/>
  <circle cx="247" cy="132.5" r="5" fill="#1e293b"/>
  <text x="138" y="54" font-size="15" font-weight="900" fill="#1e293b">A</text>
  <text x="322" y="54" font-size="15" font-weight="900" fill="#1e293b">D</text>
  <text x="54" y="254" font-size="15" font-weight="900" fill="#1e293b">B</text>
  <text x="404" y="254" font-size="15" font-weight="900" fill="#1e293b">C</text>
  <text x="225" y="98" font-size="15" font-weight="900" fill="#991b1b">④ (2²)</text>
  <text x="218" y="206" font-size="16" font-weight="900" fill="#075985">⑨ (3²)</text>
  <text x="148" y="156" font-size="15" font-weight="900" fill="#854d0e">⑥</text>
  <text x="306" y="156" font-size="15" font-weight="900" fill="#854d0e">⑥</text>
  <text x="190" y="48" font-size="13" font-weight="900" fill="#dc2626">相似比 AD:BC = 2 : 3</text>
  <rect x="64" y="262" width="392" height="46" rx="10" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.6"/>
  <text x="78" y="282" font-size="12.5" font-weight="900" fill="#92400e">✏️ 砂時計相似(2²:3²=4:9) ＋ 頂点共有の高さ等しい比(2:3=4:6)！</text>
  <text x="78" y="300" font-size="12.5" font-weight="900" fill="#1e293b">面積比 上:横:横:下 = 4 : 6 : 6 : 9（台形全体は 25）</text>
"""
    (OUT / "math_trapezoid_ratio_q.svg").write_text(wrap_svg(q_body), encoding="utf-8")
    (OUT / "math_trapezoid_ratio_ans.svg").write_text(wrap_svg(ans_body), encoding="utf-8")


# 6. Regular Square Pyramid O-ABCD height & volume
def build_pyramid_height():
    base = """
  <!-- Base ABCD -->
  <line x1="165" y1="186" x2="325" y2="186" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <line x1="105" y1="246" x2="165" y2="186" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <line x1="105" y1="246" x2="265" y2="246" stroke="#1e293b" stroke-width="2.4"/>
  <line x1="265" y1="246" x2="325" y2="186" stroke="#1e293b" stroke-width="2.4"/>
  <!-- Apex O(215, 48) -->
  <line x1="215" y1="48" x2="165" y2="186" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="5,4"/>
  <line x1="215" y1="48" x2="105" y2="246" stroke="#1e293b" stroke-width="2.4"/>
  <line x1="215" y1="48" x2="265" y2="246" stroke="#1e293b" stroke-width="2.4"/>
  <line x1="215" y1="48" x2="325" y2="186" stroke="#1e293b" stroke-width="2.4"/>
  <text x="208" y="38" font-size="15" font-weight="900" fill="#1e293b">O</text>
  <text x="86" y="254" font-size="14" font-weight="900" fill="#1e293b">A</text>
  <text x="270" y="256" font-size="14" font-weight="900" fill="#1e293b">B</text>
  <text x="332" y="190" font-size="14" font-weight="900" fill="#1e293b">C</text>
  <text x="148" y="182" font-size="14" font-weight="800" fill="#64748b">D</text>
"""
    q_body = (
        base
        + """
  <text x="155" y="268" font-size="13.5" font-weight="800" fill="#2563eb">底面1辺 6cm の正方形</text>
  <text x="278" y="116" font-size="13.5" font-weight="800" fill="#2563eb">側面の辺 OC = 5cm</text>
  <rect x="352" y="76" width="154" height="110" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="364" y="104" font-size="13" font-weight="900" fill="#1e293b">正四角錐 O-ABCD</text>
  <text x="364" y="130" font-size="12.5" font-weight="700" fill="#334155">① 高さ OH の長さ</text>
  <text x="364" y="154" font-size="12.5" font-weight="700" fill="#334155">② 正四角錐の体積</text>
"""
    )
    # H = midpoint of A(105,246) and C(325,186) = (215, 216)
    ans_body = (
        base
        + """
  <!-- Shaded right triangle O-H-A -->
  <polygon points="215,48 215,216 105,246" fill="#fecdd3" fill-opacity="0.65" stroke="#dc2626" stroke-width="2.4"/>
  <!-- Diagonal AC -->
  <line x1="105" y1="246" x2="325" y2="186" stroke="#0284c7" stroke-width="2" stroke-dasharray="5,4"/>
  <rect x="205" y="206" width="10" height="10" fill="none" stroke="#dc2626" stroke-width="1.6"/>
  <circle cx="215" cy="216" r="4.5" fill="#dc2626"/>
  <text x="222" y="224" font-size="14" font-weight="900" fill="#dc2626">H</text>
  <text x="221" y="142" font-size="13.5" font-weight="900" fill="#dc2626">OH = √7</text>
  <text x="128" y="232" font-size="12.5" font-weight="900" fill="#0369a1">AH = 3√2</text>
  <rect x="342" y="56" width="166" height="198" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.8"/>
  <text x="352" y="80" font-size="12.5" font-weight="900" fill="#92400e">✏️ 直角△OAHを取り出す！</text>
  <text x="352" y="104" font-size="12" font-weight="800" fill="#0369a1">対角線 AC = 6√2 cm</text>
  <text x="352" y="124" font-size="12" font-weight="800" fill="#0369a1">⇒ 半分 AH = 3√2 cm</text>
  <text x="352" y="148" font-size="12" font-weight="800" fill="#1e293b">OH² = 5² - (3√2)²</text>
  <text x="352" y="168" font-size="12.5" font-weight="900" fill="#dc2626">　　= 25 - 18 = 7 ⇒ √7</text>
  <line x1="352" y1="182" x2="496" y2="182" stroke="#fcd34d" stroke-width="1.5"/>
  <text x="352" y="204" font-size="12" font-weight="800" fill="#1e293b">体積 = ⅓ × 6² × √7</text>
  <text x="352" y="228" font-size="13" font-weight="900" fill="#dc2626">　　 = 12√7 cm³</text>
"""
    )
    (OUT / "math_pyramid_height_q.svg").write_text(wrap_svg(q_body), encoding="utf-8")
    (OUT / "math_pyramid_height_ans.svg").write_text(wrap_svg(ans_body), encoding="utf-8")


# 7. Linear function motion diagram (meeting / speed) + Annotated solution
def build_linear_diagram():
    # x: 0..20 min -> x=65..455 (19.5px/min), y: 0..1200 m -> y=268..44 (0.1867px/m)
    def dx(t: float) -> float:
        return 65 + t * 19.5

    def dy(m: float) -> float:
        return 268 - m * (224 / 1200)

    axes = f"""
  <g stroke="#f1f5f9" stroke-width="1">
    {''.join(f'<line x1="{dx(t):.1f}" y1="44" x2="{dx(t):.1f}" y2="268"/>' for t in range(0, 21, 5))}
    {''.join(f'<line x1="65" y1="{dy(m):.1f}" x2="455" y2="{dy(m):.1f}"/>' for m in range(0, 1201, 300))}
  </g>
  <line x1="65" y1="268" x2="472" y2="268" stroke="#334155" stroke-width="2"/>
  <line x1="65" y1="268" x2="65" y2="32" stroke="#334155" stroke-width="2"/>
  <text x="462" y="288" font-size="12.5" font-weight="800" fill="#1e293b">x (分)</text>
  <text x="20" y="34" font-size="12.5" font-weight="800" fill="#1e293b">y (m)</text>
  {''.join(f'<text x="{dx(t)-6:.1f}" y="286" font-size="12" font-weight="700" fill="#475569">{t}</text>' for t in [0, 5, 10, 15, 20])}
  {''.join(f'<text x="22" y="{dy(m)+4:.1f}" font-size="12" font-weight="700" fill="#475569">{m}</text>' for m in [0, 300, 600, 900, 1200])}
"""
    # Person A walks from home (0,0) to station (20, 1200): y = 60x
    # Person B leaves station at x=5 toward home at 120 m/min: (5,1200) -> (15,0): y = -120x + 1800
    # Intersection: 60x = -120x + 1800 => 180x = 1800 => x = 10, y = 600!
    q_body = (
        axes
        + f"""
  <line x1="{dx(0):.1f}" y1="{dy(0):.1f}" x2="{dx(20):.1f}" y2="{dy(1200):.1f}" stroke="#1d4ed8" stroke-width="2.8"/>
  <line x1="{dx(5):.1f}" y1="{dy(1200):.1f}" x2="{dx(15):.1f}" y2="{dy(0):.1f}" stroke="#0f766e" stroke-width="2.8"/>
  <text x="{dx(15.5):.1f}" y="{dy(1020):.1f}" font-size="13" font-weight="900" fill="#1d4ed8">兄（家→駅）</text>
  <text x="{dx(6.2):.1f}" y="{dy(1130):.1f}" font-size="13" font-weight="900" fill="#0f766e">姉（駅→家）</text>
"""
    )
    ans_body = (
        q_body
        + f"""
  <circle cx="{dx(10):.1f}" cy="{dy(600):.1f}" r="6" fill="#dc2626"/>
  <line x1="{dx(10):.1f}" y1="{dy(600):.1f}" x2="{dx(10):.1f}" y2="268" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>
  <line x1="{dx(10):.1f}" y1="{dy(600):.1f}" x2="65" y2="{dy(600):.1f}" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>
  <rect x="252" y="166" width="246" height="86" rx="10" fill="#fef2f2" stroke="#ef4444" stroke-width="1.7"/>
  <text x="262" y="188" font-size="12" font-weight="900" fill="#991b1b">✏️ 2直線の交点＝すれ違った時刻と地点！</text>
  <text x="262" y="209" font-size="12" font-weight="800" fill="#1d4ed8">兄：y = 60x ／ 姉：y = -120x + 1800</text>
  <text x="262" y="232" font-size="13" font-weight="900" fill="#dc2626">連立して x = 10分後、家から 600m！</text>
"""
    )
    (OUT / "math_linear_diagram_q.svg").write_text(wrap_svg(q_body), encoding="utf-8")
    (OUT / "math_linear_diagram_ans.svg").write_text(wrap_svg(ans_body), encoding="utf-8")


# 8. Annotated solution for /juken_figs/math_circle_similarity.svg & /juken_figs/math_boxplot_compare.svg
def build_existing_math_annotated():
    # Annotated circle similarity (diameter AB -> ∠ACB=90, chord CD, ∠ACD=∠ABD inscribed angles)
    circ_ans = """
  <circle cx="175" cy="160" r="108" fill="#f8fafc" stroke="#1e293b" stroke-width="2.4"/>
  <polygon points="67,160 283,160 229,66.5" fill="#bae6fd" fill-opacity="0.45"/>
  <line x1="67" y1="160" x2="283" y2="160" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="67" y1="160" x2="229" y2="66.5" stroke="#dc2626" stroke-width="2.4"/>
  <line x1="283" y1="160" x2="229" y2="66.5" stroke="#dc2626" stroke-width="2.4"/>
  <line x1="229" y1="66.5" x2="121" y2="253.5" stroke="#0284c7" stroke-width="2.2"/>
  <line x1="67" y1="160" x2="121" y2="253.5" stroke="#0284c7" stroke-width="2"/>
  <circle cx="175" cy="160" r="4" fill="#1e293b"/>
  <text x="48" y="165" font-size="15" font-weight="900" fill="#1e293b">A</text>
  <text x="290" y="165" font-size="15" font-weight="900" fill="#1e293b">B</text>
  <text x="232" y="58" font-size="15" font-weight="900" fill="#dc2626">C(90°!)</text>
  <text x="104" y="272" font-size="15" font-weight="900" fill="#0369a1">D</text>
  <text x="172" y="180" font-size="13" font-weight="800" fill="#1e293b">O</text>
  <rect x="312" y="54" width="194" height="206" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.8"/>
  <text x="322" y="79" font-size="12.5" font-weight="900" fill="#92400e">✏️ 円と相似 2大チェック！</text>
  <text x="322" y="105" font-size="12" font-weight="900" fill="#dc2626">① 直径ABに対する円周角</text>
  <text x="322" y="124" font-size="12" font-weight="800" fill="#1e293b">　⇒ ∠ACB = 90° を即記入！</text>
  <text x="322" y="154" font-size="12" font-weight="900" fill="#0369a1">② 同じ弧に対する円周角</text>
  <text x="322" y="173" font-size="12" font-weight="800" fill="#1e293b">　⇒ 弧ADの円周角が等しい</text>
  <text x="322" y="198" font-size="12" font-weight="900" fill="#15803d">③ 対頂角と合わせて2組の角が</text>
  <text x="322" y="217" font-size="12" font-weight="900" fill="#15803d">　等しい ⇒ 砂時計型の相似！</text>
"""
    (OUT / "math_circle_sim_ans.svg").write_text(wrap_svg(circ_ans), encoding="utf-8")

    # Annotated boxplot comparison (25% per section + IQR arrows)
    box_ans = """
  <line x1="60" y1="245" x2="480" y2="245" stroke="#334155" stroke-width="2"/>
  <text x="54" y="266" font-size="12" font-weight="700" fill="#475569">0</text>
  <text x="134" y="266" font-size="12" font-weight="700" fill="#475569">20</text>
  <text x="218" y="266" font-size="12" font-weight="700" fill="#475569">40</text>
  <text x="302" y="266" font-size="12" font-weight="700" fill="#475569">60</text>
  <text x="386" y="266" font-size="12" font-weight="700" fill="#475569">80</text>
  <text x="466" y="266" font-size="12" font-weight="700" fill="#475569">100(点)</text>
  <!-- Boxplot A (top) -->
  <text x="16" y="92" font-size="14" font-weight="900" fill="#1e293b">A組</text>
  <line x1="118" y1="86" x2="185" y2="86" stroke="#1e293b" stroke-width="2.2"/>
  <rect x="185" y="64" width="142" height="44" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2.4"/>
  <line x1="256" y1="64" x2="256" y2="108" stroke="#dc2626" stroke-width="3.2"/>
  <line x1="327" y1="86" x2="424" y2="86" stroke="#1e293b" stroke-width="2.2"/>
  <!-- 25% labels -->
  <text x="134" y="56" font-size="11.5" font-weight="900" fill="#0369a1">約25%</text>
  <text x="205" y="56" font-size="11.5" font-weight="900" fill="#0369a1">約25%</text>
  <text x="276" y="56" font-size="11.5" font-weight="900" fill="#0369a1">約25%</text>
  <text x="358" y="56" font-size="11.5" font-weight="900" fill="#0369a1">約25%</text>
  <!-- IQR double arrow -->
  <line x1="185" y1="126" x2="327" y2="126" stroke="#dc2626" stroke-width="2.5"/>
  <text x="192" y="143" font-size="12" font-weight="900" fill="#dc2626">四分位範囲 = Q3 - Q1（箱の横幅！）</text>
  <!-- Boxplot B (bottom) -->
  <text x="16" y="196" font-size="14" font-weight="900" fill="#1e293b">B組</text>
  <line x1="142" y1="190" x2="222" y2="190" stroke="#1e293b" stroke-width="2.2"/>
  <rect x="222" y="168" width="96" height="44" fill="#dcfce7" stroke="#15803d" stroke-width="2.4"/>
  <line x1="278" y1="168" x2="278" y2="212" stroke="#dc2626" stroke-width="3.2"/>
  <line x1="318" y1="190" x2="408" y2="190" stroke="#1e293b" stroke-width="2.2"/>
  <text x="242" y="229" font-size="11.5" font-weight="900" fill="#dc2626">中央値(第2四分位数)</text>
  <rect x="56" y="276" width="424" height="34" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.4"/>
  <text x="70" y="298" font-size="12" font-weight="900" fill="#991b1b">⚠️ 箱ひげ図だけでは「平均値」や「最頻値」は断定できない！（超頻出ひっかけ）</text>
"""
    (OUT / "math_boxplot_compare_ans.svg").write_text(wrap_svg(box_ans), encoding="utf-8")


# 9. Social Studies SVGs for Multi-Slide Carousels
def build_social_svgs():
    # Slide SVG 1: 3 Climographs (Mediterranean, Marine West Coast, Tropical Savanna)
    climo = """
  <text x="18" y="26" font-size="14" font-weight="900" fill="#0f172a">3都市（ア・イ・ウ）の月別気温と降水量</text>
  <!-- Panel ア: Mediterranean (Rome) - Summer dry! -->
  <rect x="18" y="40" width="152" height="256" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="58" y="62" font-size="13.5" font-weight="900" fill="#0f766e">都市 ア</text>
  <polyline points="32,175 56,162 80,128 104,96 128,125 152,170" fill="none" stroke="#dc2626" stroke-width="2.6"/>
  <!-- Bars: winter wet, summer very low -->
  <rect x="28" y="224" width="12" height="44" fill="#38bdf8"/><rect x="52" y="232" width="12" height="36" fill="#38bdf8"/>
  <rect x="76" y="252" width="12" height="16" fill="#38bdf8"/><rect x="100" y="258" width="12" height="10" fill="#38bdf8"/>
  <rect x="124" y="212" width="12" height="56" fill="#38bdf8"/><rect x="148" y="220" width="12" height="48" fill="#38bdf8"/>
  <text x="28" y="286" font-size="11" font-weight="800" fill="#334155">年平均15.7℃ / 798mm</text>

  <!-- Panel イ: Marine West Coast (London) - Mild winter >0C, even rain -->
  <rect x="184" y="40" width="152" height="256" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="224" y="62" font-size="13.5" font-weight="900" fill="#1d4ed8">都市 イ</text>
  <polyline points="198,192 222,182 246,154 270,136 294,158 318,188" fill="none" stroke="#dc2626" stroke-width="2.6"/>
  <rect x="194" y="240" width="12" height="28" fill="#38bdf8"/><rect x="218" y="244" width="12" height="24" fill="#38bdf8"/>
  <rect x="242" y="242" width="12" height="26" fill="#38bdf8"/><rect x="266" y="240" width="12" height="28" fill="#38bdf8"/>
  <rect x="290" y="236" width="12" height="32" fill="#38bdf8"/><rect x="314" y="238" width="12" height="30" fill="#38bdf8"/>
  <text x="194" y="286" font-size="11" font-weight="800" fill="#334155">年平均11.3℃ / 602mm</text>

  <!-- Panel ウ: Southern Hemisphere Temperate (Sydney) - Dip in July! -->
  <rect x="350" y="40" width="152" height="256" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
  <text x="390" y="62" font-size="13.5" font-weight="900" fill="#9a3412">都市 ウ</text>
  <polyline points="364,108 388,128 412,166 436,178 460,145 484,112" fill="none" stroke="#dc2626" stroke-width="2.6"/>
  <rect x="360" y="218" width="12" height="50" fill="#38bdf8"/><rect x="384" y="212" width="12" height="56" fill="#38bdf8"/>
  <rect x="408" y="220" width="12" height="48" fill="#38bdf8"/><rect x="432" y="234" width="12" height="34" fill="#38bdf8"/>
  <rect x="456" y="230" width="12" height="38" fill="#38bdf8"/><rect x="480" y="224" width="12" height="44" fill="#38bdf8"/>
  <text x="358" y="286" font-size="11" font-weight="800" fill="#334155">年平均18.2℃ / 1150mm</text>
"""
    (OUT / "soc_world_climographs_v6.svg").write_text(wrap_svg(climo), encoding="utf-8")

    # Slide SVG 2: Japan Industrial Regions Breakdown Bar Chart
    ind = """
  <text x="20" y="28" font-size="14" font-weight="900" fill="#0f172a">日本の主な工業地帯・地域の出荷額内訳（割合）</text>
  <!-- Bars X (Chukyo - Machinery ~70%), Y (Keihin/Setouchi - Chemical high), Z (Hanshin - Metal + Misc) -->
  <g font-size="12.5" font-weight="800">
    <!-- X -->
    <text x="20" y="86" fill="#1e293b">地域 X</text>
    <rect x="82" y="64" width="272" height="32" fill="#2563eb"/><text x="182" y="85" fill="#fff">機械 68%</text>
    <rect x="354" y="64" width="44" height="32" fill="#64748b"/>
    <rect x="398" y="64" width="36" height="32" fill="#f59e0b"/>
    <rect x="434" y="64" width="56" height="32" fill="#94a3b8"/>

    <!-- Y -->
    <text x="20" y="156" fill="#1e293b">地域 Y</text>
    <rect x="82" y="134" width="144" height="32" fill="#2563eb"/><text x="122" y="155" fill="#fff">機械 36%</text>
    <rect x="226" y="134" width="60" height="32" fill="#64748b"/><text x="234" y="155" fill="#fff">金属15%</text>
    <rect x="286" y="134" width="120" height="32" fill="#f59e0b"/><text x="314" y="155" fill="#fff">化学 30%</text>
    <rect x="406" y="134" width="84" height="32" fill="#94a3b8"/><text x="424" y="155" fill="#fff">他19%</text>

    <!-- Z -->
    <text x="20" y="226" fill="#1e293b">地域 Z</text>
    <rect x="82" y="204" width="160" height="32" fill="#2563eb"/><text x="130" y="225" fill="#fff">機械 40%</text>
    <rect x="242" y="204" width="84" height="32" fill="#64748b"/><text x="256" y="225" fill="#fff">金属21%</text>
    <rect x="326" y="204" width="68" height="32" fill="#f59e0b"/><text x="336" y="225" fill="#fff">化学17%</text>
    <rect x="394" y="204" width="96" height="32" fill="#10b981"/><text x="404" y="225" fill="#fff">食料・他22%</text>
  </g>
  <text x="82" y="276" font-size="12" font-weight="800" fill="#475569">凡例：■青＝機械　■灰＝金属　■橙＝化学　■緑/薄灰＝食料品・その他</text>
"""
    (OUT / "soc_japan_ind_regions_v6.svg").write_text(wrap_svg(ind), encoding="utf-8")

    # Slide SVG 3: Exchange Rate (Yen Appreciation vs Depreciation) & BOJ Policy
    econ = """
  <text x="20" y="28" font-size="14" font-weight="900" fill="#0f172a">為替レートの変動（1ドル＝150円 → A：120円 ／ B：160円）</text>
  <rect x="22" y="52" width="224" height="196" rx="14" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.8"/>
  <text x="44" y="80" font-size="14" font-weight="900" fill="#1d4ed8">変動 A：1ドル ＝ 120円</text>
  <text x="44" y="108" font-size="12.5" font-weight="800" fill="#1e293b">・1ドルの品物が150円→120円で買える</text>
  <text x="44" y="132" font-size="12.5" font-weight="800" fill="#1e293b">・円の価値が上がった状態</text>
  <text x="44" y="160" font-size="12.5" font-weight="900" fill="#0369a1">⇒ 輸入企業・海外旅行に【有利】</text>
  <text x="44" y="184" font-size="12.5" font-weight="900" fill="#b91c1c">⇒ 輸出企業の価格競争力は【不利】</text>

  <rect x="272" y="52" width="226" height="196" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.8"/>
  <text x="292" y="80" font-size="14" font-weight="900" fill="#b45309">変動 B：1ドル ＝ 160円</text>
  <text x="292" y="108" font-size="12.5" font-weight="800" fill="#1e293b">・1ドルの品物に160円必要になる</text>
  <text x="292" y="132" font-size="12.5" font-weight="800" fill="#1e293b">・円の価値が下がった状態</text>
  <text x="292" y="160" font-size="12.5" font-weight="900" fill="#15803d">⇒ 輸出企業・訪日外国人観光に【有利】</text>
  <text x="292" y="184" font-size="12.5" font-weight="900" fill="#b91c1c">⇒ 原油や食料の輸入価格は【上昇】</text>
  <text x="26" y="282" font-size="12" font-weight="800" fill="#475569">※資料2（日銀の公開市場操作・財政政策の表）と組み合わせて考えよう！</text>
"""
    (OUT / "soc_econ_exchange_boj_v6.svg").write_text(wrap_svg(econ), encoding="utf-8")


if __name__ == "__main__":
    build_parabola_split()
    build_parabola_equal_area()
    build_cone_shortest()
    build_cube_cut()
    build_trapezoid_area_ratio()
    build_pyramid_height()
    build_linear_diagram()
    build_existing_math_annotated()
    build_social_svgs()
    print(f"Generated {len(list(OUT.glob('*.svg')))} SVGs in {OUT}")
