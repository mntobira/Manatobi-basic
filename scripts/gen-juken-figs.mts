import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, '../public/juken_figs');
mkdirSync(OUT_DIR, { recursive: true });

const head = (w: number, h: number, title: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="Hiragino Sans, Noto Sans JP, sans-serif">\n  <title>${title}</title>\n  <rect width="${w}" height="${h}" fill="#ffffff"/>`;

// 正確な放物線パス y = (1/2)x^2, 原点(220,255), scaleX=30, scaleY=25
const parabolaPts: string[] = [];
for (let x = -3.4; x <= 4.3; x += 0.1) {
  const px = (220 + x * 30).toFixed(1);
  const py = (255 - 0.5 * x * x * 25).toFixed(1);
  parabolaPts.push(`${px},${py}`);
}

const figs: Record<string, string> = {
  'math_parabola_oab.svg': `${head(480, 310, '放物線 y=ax² と直線ABおよび△OAB')}
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="40" y1="255" x2="440" y2="255"/>
    <line x1="220" y1="20" x2="220" y2="290"/>
  </g>
  <line x1="40" y1="255" x2="445" y2="255" stroke="#1e293b" stroke-width="2"/>
  <polygon points="445,255 436,250 436,260" fill="#1e293b"/>
  <text x="434" y="277" font-size="15" font-weight="bold" fill="#1e293b">x</text>
  <line x1="220" y1="290" x2="220" y2="20" stroke="#1e293b" stroke-width="2"/>
  <polygon points="220,18 215,27 225,27" fill="#1e293b"/>
  <text x="230" y="32" font-size="15" font-weight="bold" fill="#1e293b">y</text>
  <text x="202" y="274" font-size="14" font-weight="bold" fill="#1e293b">O</text>
  <polygon points="220,255 160,205 340,55" fill="#dbeafe" fill-opacity="0.7" stroke="#2563eb" stroke-width="1.6"/>
  <polyline points="${parabolaPts.join(' ')}" fill="none" stroke="#1e293b" stroke-width="2.5"/>
  <line x1="112" y1="245" x2="364" y2="35" stroke="#dc2626" stroke-width="2.2"/>
  <circle cx="160" cy="205" r="4.5" fill="#1d4ed8"/>
  <text x="95" y="200" font-size="14" font-weight="bold" fill="#1d4ed8">A(-2, 2)</text>
  <line x1="160" y1="205" x2="160" y2="255" stroke="#94a3b8" stroke-dasharray="4 3"/>
  <text x="150" y="273" font-size="13" fill="#475569">-2</text>
  <circle cx="340" cy="55" r="4.5" fill="#1d4ed8"/>
  <text x="348" y="60" font-size="14" font-weight="bold" fill="#1d4ed8">B(4, 8)</text>
  <line x1="340" y1="55" x2="340" y2="255" stroke="#94a3b8" stroke-dasharray="4 3"/>
  <text x="335" y="273" font-size="13" fill="#475569">4</text>
  <circle cx="220" cy="155" r="4.5" fill="#dc2626"/>
  <text x="228" y="162" font-size="13" font-weight="bold" fill="#dc2626">切片C(0, 4)</text>
  <text x="352" y="152" font-size="14" font-weight="bold" fill="#1e293b">y = ax²</text>
</svg>`,

  'math_cone_net.svg': `${head(500, 270, '円錐の見取り図と側面展開図')}
  <g transform="translate(20,15)">
    <text x="58" y="18" font-size="14" font-weight="bold" fill="#1e293b">【円錐の見取り図】</text>
    <polygon points="115,38 50,200 180,200" fill="#f8fafc" stroke="#1e293b" stroke-width="2"/>
    <ellipse cx="115" cy="200" rx="65" ry="18" fill="#e2e8f0" stroke="#1e293b" stroke-width="2"/>
    <line x1="115" y1="38" x2="115" y2="200" stroke="#64748b" stroke-dasharray="4 3" stroke-width="1.5"/>
    <line x1="115" y1="200" x2="180" y2="200" stroke="#dc2626" stroke-width="2"/>
    <text x="128" y="194" font-size="13" font-weight="bold" fill="#dc2626">r = 3cm</text>
    <text x="154" y="118" font-size="13" font-weight="bold" fill="#1d4ed8">母線 R = 9cm</text>
    <text x="110" y="32" font-size="14" font-weight="bold" fill="#1e293b">O</text>
    <text x="34" y="206" font-size="14" font-weight="bold" fill="#1e293b">A</text>
  </g>
  <g transform="translate(255,15)">
    <text x="40" y="18" font-size="14" font-weight="bold" fill="#1e293b">【側面の展開図】</text>
    <path d="M 115 50 L 21 110 A 112 112 0 0 0 209 110 Z" fill="#eff6ff" stroke="#1d4ed8" stroke-width="2"/>
    <line x1="21" y1="110" x2="209" y2="110" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="6 3"/>
    <text x="76" y="103" font-size="12" font-weight="bold" fill="#dc2626">最短の糸 AA&apos;</text>
    <path d="M 93 64 A 26 26 0 0 0 137 64" fill="none" stroke="#b45309" stroke-width="2"/>
    <text x="104" y="83" font-size="13" font-weight="bold" fill="#b45309">x°</text>
    <text x="110" y="43" font-size="14" font-weight="bold" fill="#1e293b">O</text>
    <text x="5" y="116" font-size="14" font-weight="bold" fill="#1e293b">A</text>
    <text x="213" y="116" font-size="14" font-weight="bold" fill="#1e293b">A&apos;</text>
    <circle cx="115" cy="197" r="35" fill="#fef3c7" stroke="#b45309" stroke-width="1.8"/>
    <line x1="115" y1="197" x2="150" y2="197" stroke="#dc2626" stroke-width="1.8"/>
    <text x="120" y="213" font-size="12" font-weight="bold" fill="#dc2626">3cm</text>
  </g>
</svg>`,

  'sci_circuits_ab.svg': `${head(520, 250, '回路A（直列回路）と回路B（並列回路）')}
  <g transform="translate(15,15)">
    <rect x="0" y="0" width="235" height="220" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="14" y="24" font-size="14" font-weight="bold" fill="#1e293b">【回路A：直列つなぎ】</text>
    <line x1="40" y1="60" x2="98" y2="60" stroke="#1e293b" stroke-width="2"/>
    <line x1="98" y1="46" x2="98" y2="74" stroke="#1e293b" stroke-width="1.8"/>
    <line x1="108" y1="38" x2="108" y2="82" stroke="#dc2626" stroke-width="3"/>
    <text x="82" y="34" font-size="13" font-weight="bold" fill="#dc2626">6.0 V</text>
    <line x1="108" y1="60" x2="195" y2="60" stroke="#1e293b" stroke-width="2"/>
    <line x1="40" y1="60" x2="40" y2="170" stroke="#1e293b" stroke-width="2"/>
    <line x1="195" y1="60" x2="195" y2="170" stroke="#1e293b" stroke-width="2"/>
    <line x1="40" y1="170" x2="62" y2="170" stroke="#1e293b" stroke-width="2"/>
    <rect x="62" y="156" width="46" height="28" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
    <text x="69" y="175" font-size="12" font-weight="bold" fill="#1d4ed8">20 Ω</text>
    <line x1="108" y1="170" x2="127" y2="170" stroke="#1e293b" stroke-width="2"/>
    <rect x="127" y="156" width="46" height="28" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
    <text x="134" y="175" font-size="12" font-weight="bold" fill="#0f766e">30 Ω</text>
    <line x1="173" y1="170" x2="195" y2="170" stroke="#1e293b" stroke-width="2"/>
    <text x="48" y="206" font-size="12" fill="#475569">電熱線P(20Ω) と Q(30Ω)</text>
  </g>
  <g transform="translate(270,15)">
    <rect x="0" y="0" width="235" height="220" rx="10" fill="#f8fafc" stroke="#cbd5e1"/>
    <text x="14" y="24" font-size="14" font-weight="bold" fill="#1e293b">【回路B：並列つなぎ】</text>
    <line x1="35" y1="55" x2="98" y2="55" stroke="#1e293b" stroke-width="2"/>
    <line x1="98" y1="43" x2="98" y2="67" stroke="#1e293b" stroke-width="1.8"/>
    <line x1="108" y1="36" x2="108" y2="74" stroke="#dc2626" stroke-width="3"/>
    <text x="82" y="31" font-size="13" font-weight="bold" fill="#dc2626">6.0 V</text>
    <line x1="108" y1="55" x2="200" y2="55" stroke="#1e293b" stroke-width="2"/>
    <line x1="35" y1="55" x2="35" y2="180" stroke="#1e293b" stroke-width="2"/>
    <line x1="200" y1="55" x2="200" y2="180" stroke="#1e293b" stroke-width="2"/>
    <line x1="35" y1="115" x2="88" y2="115" stroke="#1e293b" stroke-width="2"/>
    <rect x="88" y="101" width="58" height="28" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
    <text x="98" y="120" font-size="12" font-weight="bold" fill="#1d4ed8">P: 20Ω</text>
    <line x1="146" y1="115" x2="200" y2="115" stroke="#1e293b" stroke-width="2"/>
    <line x1="35" y1="180" x2="88" y2="180" stroke="#1e293b" stroke-width="2"/>
    <rect x="88" y="166" width="58" height="28" fill="#ffffff" stroke="#0f766e" stroke-width="2"/>
    <text x="98" y="185" font-size="12" font-weight="bold" fill="#0f766e">Q: 30Ω</text>
    <line x1="146" y1="180" x2="200" y2="180" stroke="#1e293b" stroke-width="2"/>
    <circle cx="35" cy="115" r="3.5" fill="#1e293b"/>
    <circle cx="200" cy="115" r="3.5" fill="#1e293b"/>
    <text x="148" y="88" font-size="12" font-weight="bold" fill="#b45309">全体の電流 I</text>
  </g>
</svg>`,

  'sci_convex_lens.svg': `${head(520, 240, '凸レンズによる実像のでき方')}
  <line x1="20" y1="120" x2="500" y2="120" stroke="#334155" stroke-width="1.8"/>
  <g stroke="#cbd5e1" stroke-width="1">
    <line x1="100" y1="30" x2="100" y2="210"/>
    <line x1="180" y1="30" x2="180" y2="210"/>
    <line x1="340" y1="30" x2="340" y2="210"/>
    <line x1="420" y1="30" x2="420" y2="210"/>
  </g>
  <path d="M 260 30 Q 278 120 260 210 Q 242 120 260 30 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="260" y1="25" x2="260" y2="215" stroke="#1d4ed8" stroke-dasharray="4 3"/>
  <circle cx="180" cy="120" r="4" fill="#dc2626"/>
  <text x="165" y="142" font-size="13" font-weight="bold" fill="#dc2626">焦点F</text>
  <circle cx="340" cy="120" r="4" fill="#dc2626"/>
  <text x="328" y="142" font-size="13" font-weight="bold" fill="#dc2626">焦点F&apos;</text>
  <line x1="100" y1="120" x2="100" y2="65" stroke="#0f766e" stroke-width="4"/>
  <polygon points="100,58 94,70 106,70" fill="#0f766e"/>
  <text x="72" y="52" font-size="13" font-weight="bold" fill="#0f766e">物体</text>
  <line x1="100" y1="65" x2="260" y2="65" stroke="#ea580c" stroke-width="2"/>
  <line x1="260" y1="65" x2="450" y2="195.6" stroke="#ea580c" stroke-width="2"/>
  <line x1="100" y1="65" x2="450" y2="185.3" stroke="#2563eb" stroke-width="2"/>
  <line x1="420" y1="120" x2="420" y2="175" stroke="#7c3aed" stroke-width="4"/>
  <polygon points="420,182 414,170 426,170" fill="#7c3aed"/>
  <text x="388" y="202" font-size="13" font-weight="bold" fill="#7c3aed">倒立の実像</text>
  <text x="148" y="228" font-size="12" font-weight="bold" fill="#1e293b">焦点距離 f = 10 cm（物体まで 20 cm ＝ 2f）</text>
</svg>`,

  'sci_weather_fronts.svg': `${head(540, 250, '温帯低気圧の前線断面図（A：寒冷前線 ／ B：温暖前線）')}
  <rect x="20" y="195" width="500" height="32" fill="#e2e8f0" stroke="#475569"/>
  <text x="45" y="216" font-size="13" font-weight="bold" fill="#1e3a8a">寒気（西側）</text>
  <text x="235" y="216" font-size="13" font-weight="bold" fill="#9a3412">暖気（南側）</text>
  <text x="420" y="216" font-size="13" font-weight="bold" fill="#1e3a8a">寒気（東側）</text>
  <path d="M 20 120 Q 130 125 185 195 L 20 195 Z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M 80 165 L 145 165" stroke="#1d4ed8" stroke-width="2.5"/>
  <polygon points="152,165 142,160 142,170" fill="#1d4ed8"/>
  <path d="M 215 175 Q 190 135 175 75" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <polygon points="174,68 170,79 180,78" fill="#dc2626"/>
  <path d="M 140 125 Q 132 95 150 75 Q 145 42 172 38 Q 198 40 195 72 Q 212 95 198 125 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
  <text x="128" y="28" font-size="13" font-weight="bold" fill="#1e293b">積乱雲（縦に発達）</text>
  <g stroke="#2563eb" stroke-width="1.8">
    <line x1="158" y1="130" x2="152" y2="192"/>
    <line x1="170" y1="130" x2="164" y2="192"/>
    <line x1="182" y1="130" x2="176" y2="192"/>
  </g>
  <text x="80" y="242" font-size="12" font-weight="bold" fill="#1d4ed8">前線A（短時間・強雨・北よりの風へ）</text>
  <path d="M 335 195 L 490 125 L 520 125 L 520 195 Z" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2"/>
  <path d="M 295 180 L 435 110" fill="none" stroke="#dc2626" stroke-width="2.5"/>
  <polygon points="442,107 431,107 436,116" fill="#dc2626"/>
  <path d="M 345 135 Q 350 112 385 110 Q 420 95 465 98 Q 505 98 510 120 L 355 145 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.8"/>
  <text x="366" y="86" font-size="13" font-weight="bold" fill="#1e293b">乱層雲など（広くうすい雲）</text>
  <g stroke="#60a5fa" stroke-width="1.4" stroke-dasharray="4 3">
    <line x1="375" y1="145" x2="370" y2="192"/>
    <line x1="400" y1="140" x2="395" y2="192"/>
    <line x1="425" y1="135" x2="420" y2="192"/>
    <line x1="450" y1="130" x2="445" y2="192"/>
  </g>
  <text x="335" y="242" font-size="12" font-weight="bold" fill="#dc2626">前線B（長時間・おだやかな雨）</text>
</svg>`,

  'sci_venus_orbit.svg': `${head(480, 270, '太陽・金星・地球の公転軌道（北極側から見た図）')}
  <circle cx="240" cy="135" r="20" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
  <text x="226" y="140" font-size="13" font-weight="bold" fill="#ffffff">太陽</text>
  <circle cx="240" cy="135" r="72" fill="none" stroke="#64748b" stroke-dasharray="5 3" stroke-width="1.6"/>
  <circle cx="240" cy="135" r="115" fill="none" stroke="#94a3b8" stroke-dasharray="4 4" stroke-width="1.4"/>
  <circle cx="240" cy="250" r="13" fill="#2563eb" stroke="#1e3a8a" stroke-width="2"/>
  <text x="258" y="255" font-size="13" font-weight="bold" fill="#1e3a8a">地球</text>
  <text x="142" y="255" font-size="11" fill="#475569">（東・明け方）</text>
  <text x="305" y="255" font-size="11" fill="#475569">（西・夕方）</text>
  <circle cx="173" cy="162" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
  <text x="148" y="167" font-size="14" font-weight="bold" fill="#854d0e">ア</text>
  <circle cx="192" cy="81" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
  <text x="170" y="75" font-size="14" font-weight="bold" fill="#854d0e">イ</text>
  <circle cx="288" cy="81" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
  <text x="298" y="75" font-size="14" font-weight="bold" fill="#854d0e">ウ</text>
  <circle cx="307" cy="162" r="9" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
  <text x="320" y="167" font-size="14" font-weight="bold" fill="#854d0e">エ</text>
  <path d="M 348 100 A 115 115 0 0 0 330 62" fill="none" stroke="#0f766e" stroke-width="2"/>
  <polygon points="326,57 336,62 329,69" fill="#0f766e"/>
  <text x="342" y="68" font-size="12" font-weight="bold" fill="#0f766e">公転の向き</text>
</svg>`,

  'sci_strata_columns.svg': `${head(490, 260, '地点A・B・Cのボーリング柱状図（地表からの深さ）')}
  <text x="18" y="24" font-size="12.5" font-weight="bold" fill="#1e293b">地表の標高：地点A＝40m ／ 地点B＝50m ／ 地点C＝30m（Aの真東にB、Aの真南にC）</text>
  <g transform="translate(55, 50)" font-size="12" fill="#334155">
    <text x="-42" y="5">深さ0m</text>
    <text x="-42" y="45">10m</text>
    <text x="-42" y="85">20m</text>
    <text x="-42" y="125">30m</text>
    <text x="-42" y="165">40m</text>
    <line x1="0" y1="0" x2="395" y2="0" stroke="#cbd5e1"/>
    <line x1="0" y1="40" x2="395" y2="40" stroke="#e2e8f0" stroke-dasharray="3 3"/>
    <line x1="0" y1="80" x2="395" y2="80" stroke="#e2e8f0" stroke-dasharray="3 3"/>
    <line x1="0" y1="120" x2="395" y2="120" stroke="#e2e8f0" stroke-dasharray="3 3"/>
    <line x1="0" y1="160" x2="395" y2="160" stroke="#e2e8f0" stroke-dasharray="3 3"/>
    <g transform="translate(25, 0)">
      <rect x="0" y="0" width="52" height="40" fill="#fde68a" stroke="#1e293b"/>
      <rect x="0" y="40" width="52" height="20" fill="#f87171" stroke="#1e293b"/>
      <rect x="0" y="60" width="52" height="100" fill="#cbd5e1" stroke="#1e293b"/>
      <text x="2" y="182" font-weight="bold" fill="#1e293b">地点A(40m)</text>
      <text x="56" y="54" font-size="11" font-weight="bold" fill="#b91c1c">←10〜15m</text>
    </g>
    <g transform="translate(160, 0)">
      <rect x="0" y="0" width="52" height="80" fill="#fde68a" stroke="#1e293b"/>
      <rect x="0" y="80" width="52" height="20" fill="#f87171" stroke="#1e293b"/>
      <rect x="0" y="100" width="52" height="60" fill="#cbd5e1" stroke="#1e293b"/>
      <text x="2" y="182" font-weight="bold" fill="#1e293b">地点B(50m)</text>
      <text x="56" y="94" font-size="11" font-weight="bold" fill="#b91c1c">←20〜25m</text>
    </g>
    <g transform="translate(295, 0)">
      <rect x="0" y="0" width="52" height="40" fill="#fde68a" stroke="#1e293b"/>
      <rect x="0" y="40" width="52" height="20" fill="#f87171" stroke="#1e293b"/>
      <rect x="0" y="60" width="52" height="100" fill="#cbd5e1" stroke="#1e293b"/>
      <text x="2" y="182" font-weight="bold" fill="#1e293b">地点C(30m)</text>
      <text x="56" y="54" font-size="11" font-weight="bold" fill="#b91c1c">←10〜15m</text>
    </g>
  </g>
  <text x="55" y="250" font-size="12" fill="#475569">凡例：黄＝砂岩層 ／ 赤＝凝灰岩層（かぎ層） ／ 灰＝泥岩層</text>
</svg>`,

  'soc_dhondt_chart.svg': `${head(500, 235, '比例代表選挙の政党別得票数（定数4議席・ドント式）')}
  <text x="20" y="26" font-size="14" font-weight="bold" fill="#1e293b">ある選挙区（改選定数：4議席）におけるA党〜D党の得票数</text>
  <g transform="translate(20, 42)" font-size="13">
    <rect x="0" y="0" width="90" height="36" fill="#1e3a8a" stroke="#1e293b"/>
    <text x="22" y="23" font-weight="bold" fill="#ffffff">割る数</text>
    <rect x="90" y="0" width="92" height="36" fill="#2563eb" stroke="#1e293b"/>
    <text x="120" y="23" font-weight="bold" fill="#ffffff">A党</text>
    <rect x="182" y="0" width="92" height="36" fill="#0f766e" stroke="#1e293b"/>
    <text x="212" y="23" font-weight="bold" fill="#ffffff">B党</text>
    <rect x="274" y="0" width="92" height="36" fill="#b45309" stroke="#1e293b"/>
    <text x="304" y="23" font-weight="bold" fill="#ffffff">C党</text>
    <rect x="366" y="0" width="92" height="36" fill="#6d28d9" stroke="#1e293b"/>
    <text x="396" y="23" font-weight="bold" fill="#ffffff">D党</text>

    <rect x="0" y="36" width="90" height="40" fill="#f1f5f9" stroke="#64748b"/>
    <text x="15" y="61" font-weight="bold" fill="#1e293b">÷1(得票)</text>
    <rect x="90" y="36" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="108" y="61" font-weight="bold" fill="#1e293b">1,200票</text>
    <rect x="182" y="36" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="205" y="61" font-weight="bold" fill="#1e293b">900票</text>
    <rect x="274" y="36" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="297" y="61" font-weight="bold" fill="#1e293b">500票</text>
    <rect x="366" y="36" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="389" y="61" font-weight="bold" fill="#1e293b">300票</text>

    <rect x="0" y="76" width="90" height="40" fill="#f1f5f9" stroke="#64748b"/>
    <text x="30" y="101" font-weight="bold" fill="#1e293b">÷2</text>
    <rect x="90" y="76" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="122" y="101" fill="#334155">600</text>
    <rect x="182" y="76" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="214" y="101" fill="#334155">450</text>
    <rect x="274" y="76" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="306" y="101" fill="#334155">250</text>
    <rect x="366" y="76" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="398" y="101" fill="#334155">150</text>

    <rect x="0" y="116" width="90" height="40" fill="#f1f5f9" stroke="#64748b"/>
    <text x="30" y="141" font-weight="bold" fill="#1e293b">÷3</text>
    <rect x="90" y="116" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="122" y="141" fill="#334155">400</text>
    <rect x="182" y="116" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="214" y="141" fill="#334155">300</text>
    <rect x="274" y="116" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="298" y="141" fill="#334155">166.6…</text>
    <rect x="366" y="116" width="92" height="40" fill="#ffffff" stroke="#64748b"/>
    <text x="398" y="141" fill="#334155">100</text>
  </g>
  <text x="20" y="218" font-size="12" fill="#475569">※得票数を 1, 2, 3… の整数で割り、商の大きい順に定数（4議席）まで配分する。</text>
</svg>`,

  'soc_japan_climographs.svg': `${head(540, 240, '日本の3都市（ア・イ・ウ）の雨温図')}
  <g transform="translate(15, 18)">
    <rect x="0" y="0" width="160" height="200" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
    <text x="46" y="20" font-size="14" font-weight="bold" fill="#1e293b">都市 ア</text>
    <text x="18" y="37" font-size="11" fill="#475569">年平均14.6℃ / 2399mm</text>
    <g fill="#3b82f6">
      <rect x="20" y="110" width="8" height="65"/><rect x="30" y="125" width="8" height="50"/>
      <rect x="40" y="140" width="8" height="35"/><rect x="50" y="145" width="8" height="30"/>
      <rect x="60" y="145" width="8" height="30"/><rect x="70" y="135" width="8" height="40"/>
      <rect x="80" y="122" width="8" height="53"/><rect x="90" y="132" width="8" height="43"/>
      <rect x="100" y="120" width="8" height="55"/><rect x="110" y="125" width="8" height="50"/>
      <rect x="120" y="108" width="8" height="67"/><rect x="130" y="102" width="8" height="73"/>
    </g>
    <polyline points="24,115 44,108 64,85 84,58 104,72 134,110" fill="none" stroke="#dc2626" stroke-width="2.2"/>
    <text x="20" y="190" font-size="11" fill="#334155">1月　　　7月　　　12月</text>
  </g>
  <g transform="translate(190, 18)">
    <rect x="0" y="0" width="160" height="200" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
    <text x="46" y="20" font-size="14" font-weight="bold" fill="#1e293b">都市 イ</text>
    <text x="18" y="37" font-size="11" fill="#475569">年平均16.3℃ / 1124mm</text>
    <g fill="#3b82f6">
      <rect x="20" y="163" width="8" height="12"/><rect x="30" y="160" width="8" height="15"/>
      <rect x="40" y="155" width="8" height="20"/><rect x="50" y="153" width="8" height="22"/>
      <rect x="60" y="148" width="8" height="27"/><rect x="70" y="136" width="8" height="39"/>
      <rect x="80" y="140" width="8" height="35"/><rect x="90" y="150" width="8" height="25"/>
      <rect x="100" y="138" width="8" height="37"/><rect x="110" y="152" width="8" height="23"/>
      <rect x="120" y="160" width="8" height="15"/><rect x="130" y="163" width="8" height="12"/>
    </g>
    <polyline points="24,110 44,102 64,80 84,54 104,68 134,107" fill="none" stroke="#dc2626" stroke-width="2.2"/>
    <text x="20" y="190" font-size="11" fill="#334155">1月　　　7月　　　12月</text>
  </g>
  <g transform="translate(365, 18)">
    <rect x="0" y="0" width="160" height="200" rx="6" fill="#f8fafc" stroke="#94a3b8"/>
    <text x="46" y="20" font-size="14" font-weight="bold" fill="#1e293b">都市 ウ</text>
    <text x="18" y="37" font-size="11" fill="#475569">年平均12.2℃ / 1045mm</text>
    <g fill="#3b82f6">
      <rect x="20" y="165" width="8" height="10"/><rect x="30" y="163" width="8" height="12"/>
      <rect x="40" y="156" width="8" height="19"/><rect x="50" y="155" width="8" height="20"/>
      <rect x="60" y="150" width="8" height="25"/><rect x="70" y="138" width="8" height="37"/>
      <rect x="80" y="136" width="8" height="39"/><rect x="90" y="148" width="8" height="27"/>
      <rect x="100" y="135" width="8" height="40"/><rect x="110" y="152" width="8" height="23"/>
      <rect x="120" y="162" width="8" height="13"/><rect x="130" y="165" width="8" height="10"/>
    </g>
    <polyline points="24,136 44,122 64,90 84,60 104,78 134,132" fill="none" stroke="#dc2626" stroke-width="2.2"/>
    <text x="20" y="190" font-size="11" fill="#334155">1月(氷点下) 7月　12月</text>
  </g>
</svg>`,

  'eng_club_survey.svg': `${head(520, 235, 'Green City Junior High School 生徒アンケート結果グラフ')}
  <text x="20" y="26" font-size="14" font-weight="bold" fill="#1e293b">Q. What do you want to try at the International Festival? (120 students)</text>
  <g transform="translate(25, 48)" font-size="13">
    <text x="0" y="22" font-weight="bold" fill="#1e293b">Cooking world food</text>
    <rect x="165" y="6" width="240" height="22" rx="4" fill="#2563eb"/>
    <text x="413" y="22" font-weight="bold" fill="#1d4ed8">48 students (40%)</text>
    <text x="0" y="62" font-weight="bold" fill="#1e293b">Listening to music</text>
    <rect x="165" y="46" width="150" height="22" rx="4" fill="#0f766e"/>
    <text x="323" y="62" font-weight="bold" fill="#0f766e">30 students (25%)</text>
    <text x="0" y="102" font-weight="bold" fill="#1e293b">Playing traditional games</text>
    <rect x="165" y="86" width="120" height="22" rx="4" fill="#d97706"/>
    <text x="293" y="102" font-weight="bold" fill="#b45309">24 students (20%)</text>
    <text x="0" y="142" font-weight="bold" fill="#1e293b">Talking online in English</text>
    <rect x="165" y="126" width="90" height="22" rx="4" fill="#7c3aed"/>
    <text x="263" y="142" font-weight="bold" fill="#6d28d9">18 students (15%)</text>
  </g>
  <text x="25" y="218" font-size="12" fill="#475569">Note: Cooking session starts at 10:30 a.m. (Room A) and 1:30 p.m. (Room A). Max 25 people per session.</text>
</svg>`,
};

for (const [name, content] of Object.entries(figs)) {
  writeFileSync(resolve(OUT_DIR, name), `${content.trim()}\n`, 'utf8');
}
console.log(`Generated ${Object.keys(figs).length} SVG figures in public/juken_figs/`);
