import type { ChapterExpansionSpec } from './problemHelpers';

export const MATH_BANK_EXPANSION: Record<string, ChapterExpansionSpec> = {
  "ma1_1": {
    "practice": [
      {
        "id": "ma1_1_exp_p1",
        "title": "数と式・平方根・因数分解・二次方程式 網羅演習",
        "category": "数と式",
        "requiresMathPalette": true,
        "leadText": "大問1の小問集合を無失点で通過する符号・分数通分・根号有理化・対称式・二次方程式の8問です。",
        "explanationSummary": "累乗の符号、分数式減法での分子の符号反転、因数分解してから代入する式の値の3点を徹底します。",
        "surroundingKnowledge": [
          "$x^2+y^2 = (x+y)^2 - 2xy$"
        ],
        "deepDiveTopics": [
          "平方根の小数部分"
        ],
        "questions": [
          {
            "prompt": "$-4^2 \\div (-2)^3 + 5$ を計算しなさい。",
            "choices": [
              "$7$",
              "$3$",
              "$-3$",
              "$13$"
            ],
            "why": "$-4^2=-16,\\ (-2)^3=-8$ より $(-16)\\div(-8)+5=2+5=7$ です。",
            "oneLine": "$-4^2=-16$ と $(-2)^3=-8$ を先に確定！",
            "skill": "正負の四則",
            "rate": 74,
            "difficulty": 3
          },
          {
            "prompt": "$\\dfrac{2x - 3y}{4} - \\dfrac{x - 5y}{6}$ を計算しなさい。",
            "choices": [
              "$\\dfrac{4x + y}{12}$",
              "$\\dfrac{4x - 19y}{12}$",
              "$4x + y$",
              "$\\dfrac{2x + y}{12}$"
            ],
            "why": "分母12で通分すると $\\dfrac{3(2x-3y)-2(x-5y)}{12} = \\dfrac{4x+y}{12}$ です。",
            "oneLine": "分母12を残し $-2\\times(-5y)=+10y$ に注意！",
            "skill": "分数文字式通分",
            "rate": 68,
            "difficulty": 3
          },
          {
            "prompt": "$\\dfrac{6}{\\sqrt{3}} - \\sqrt{27} + \\sqrt{12}$ を計算しなさい。",
            "choices": [
              "$\\sqrt{3}$",
              "$3\\sqrt{3}$",
              "$-\\sqrt{3}$",
              "$5\\sqrt{3}$"
            ],
            "why": "$2\\sqrt{3} - 3\\sqrt{3} + 2\\sqrt{3} = \\sqrt{3}$ です。",
            "oneLine": "有理化と $a\\sqrt{b}$ 変形で $\\sqrt{3}$ に統一！",
            "skill": "平方根の加減",
            "rate": 78,
            "difficulty": 3
          },
          {
            "prompt": "$x = \\sqrt{6} + \\sqrt{2},\\ y = \\sqrt{6} - \\sqrt{2}$ のとき、$x^2 + xy + y^2$ の値を求めなさい。",
            "choices": [
              "$20$",
              "$16$",
              "$12$",
              "$24$"
            ],
            "why": "そのまま代入せず対称式に変形します！$x + y = 2\\sqrt{6}$、$xy = (\\sqrt{6})^2 - (\\sqrt{2})^2 = 6 - 2 = 4$。よって $x^2 + xy + y^2 = (x + y)^2 - xy = (2\\sqrt{6})^2 - 4 = 24 - 4 = 20$ です！",
            "oneLine": "$x^2 + xy + y^2 = (x + y)^2 - xy$ に変形してから $x+y=2\\sqrt{6},\\ xy=4$ を代入！",
            "skill": "対称式と平方根の式の値",
            "rate": 71,
            "difficulty": 3,
            "wrongReasons": [
              "$(x+y)^2 - 2xy = 24 - 8 = 16$ は $x^2 + y^2$ の値であり $+xy$ の分を見落としている。",
              "$2\\sqrt{6}$ の2乗を $12$ と誤算したミス（$2^2 \\times 6 = 24$）。",
              "$(x+y)^2 = 24$ で止めてしまい $-xy$ を引き忘れたミス。"
            ]
          },
          {
            "prompt": "式 $2x^2 - 12x + 18$ を因数分解しなさい。",
            "choices": [
              "$2(x - 3)^2$",
              "$(2x - 6)(x - 3)$",
              "$2(x + 3)(x - 3)$",
              "$2(x - 9)(x - 1)$"
            ],
            "why": "共通因数 $2$ でくくり $2(x^2-6x+9)=2(x-3)^2$ となります。",
            "oneLine": "最初に共通因数 $2$ でくくる！",
            "skill": "因数分解",
            "rate": 79,
            "difficulty": 3
          },
          {
            "prompt": "二次方程式 $(x - 3)^2 = 7$ を解きなさい。",
            "choices": [
              "$x = 3 \\pm \\sqrt{7}$",
              "$x = -3 \\pm \\sqrt{7}$",
              "$x = 3 \\pm 7$",
              "$x = \\pm \\sqrt{10}$"
            ],
            "why": "展開せず $x-3 = \\pm\\sqrt{7} \\Rightarrow x = 3\\pm\\sqrt{7}$ です。",
            "oneLine": "展開せず平方根の考え方で即解！",
            "skill": "二次方程式",
            "rate": 81,
            "difficulty": 3
          },
          {
            "prompt": "二次方程式 $x^2 + ax - 18 = 0$ の解の1つが $x = -6$ のとき、$a$ の値ともう1つの解を求めなさい。",
            "choices": [
              "$a = 3$、もう1つの解は $x = 3$",
              "$a = -3$、もう1つの解は $x = 3$",
              "$a = 3$、もう1つの解は $x = -3$",
              "$a = 9$、もう1つの解は $x = 3$"
            ],
            "why": "$x=-6$ を代入し $36-6a-18=0 \\Rightarrow a=3$。$(x+6)(x-3)=0$ より他方の解は $x=3$ です。",
            "oneLine": "解を代入して定数 $a$ を先に求める！",
            "skill": "二次方程式の定数決定",
            "rate": 75,
            "difficulty": 3
          },
          {
            "prompt": "$\\sqrt{7}$ の小数部分を $a$ とするとき、$a(a + 4)$ の値を求めなさい。",
            "choices": [
              "$3$",
              "$7$",
              "$\\sqrt{7} - 2$",
              "$5$"
            ],
            "why": "$2<\\sqrt{7}<3$ より $a=\\sqrt{7}-2$。よって $(\\sqrt{7}-2)(\\sqrt{7}+2)=7-4=3$ です。",
            "oneLine": "$a=\\sqrt{7}-2$ より和と差の積で $3$！",
            "skill": "平方根の小数部分",
            "rate": 58,
            "difficulty": 4
          },
          {
            "prompt": "$-3^2 + (-2)^3 \\div \\dfrac{4}{3}$ を計算しなさい。",
            "shortAnswer": "-15",
            "acceptedAnswers": [
              "-15",
              "−15"
            ],
            "why": "$-3^2 = -9$、$(-2)^3 = -8$。よって $-9 + (-8) \\times \\dfrac{3}{4} = -9 - 6 = -15$ です。",
            "oneLine": "$-3^2 = -9$ と $(-3)^2 = +9$ の違いに注意！ $-9 - 6 = -15$！",
            "skill": "正負の数の累乗と四則混合",
            "rate": 78,
            "difficulty": 2
          },
          {
            "prompt": "$\\dfrac{2x - y}{3} - \\dfrac{x - 3y}{4}$ を通分して $\\dfrac{5x + ay}{12}$ の形にまとめたとき、$a$ に当てはまる整数を答えなさい。",
            "shortAnswer": "5",
            "acceptedAnswers": [
              "5",
              "+5"
            ],
            "why": "$\\dfrac{4(2x - y) - 3(x - 3y)}{12} = \\dfrac{8x - 4y - 3x + 9y}{12} = \\dfrac{5x + 5y}{12}$ より $a = 5$ です。",
            "oneLine": "文字式の分数引き算は分母を残し、$-3 \\times (-3y) = +9y$ の符号反転に注意！",
            "skill": "文字式の分数計算",
            "rate": 74,
            "difficulty": 3
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma1_1_exp_m1",
        "title": "数と式 スピード実戦チェック②",
        "category": "数と式",
        "leadText": "根号不等式・等式変形・整数二次方程式の3問です。",
        "explanationSummary": "不等式は2乗して比較し、等号の有無を確認します。",
        "surroundingKnowledge": [
          "$3<\\sqrt{n}<4 \\iff 9<n<16$"
        ],
        "deepDiveTopics": [
          "等式変形"
        ],
        "questions": [
          {
            "prompt": "$3 < \\sqrt{n} < 4$ を満たす自然数 $n$ は何個あるか。",
            "choices": [
              "6個",
              "7個",
              "8個",
              "5個"
            ],
            "why": "$9<n<16$ を満たす自然数は $10〜15$ の6個です。",
            "oneLine": "$9<n<16$ より $10〜15$ の6個！",
            "skill": "平方根の大小",
            "rate": 72,
            "difficulty": 3
          },
          {
            "prompt": "等式 $3x - 2y = 6$ を $y$ について解きなさい。",
            "choices": [
              "$y = \\dfrac{3}{2}x - 3$",
              "$y = -\\dfrac{3}{2}x + 3$",
              "$y = \\dfrac{3}{2}x + 3$",
              "$y = 3x - 6$"
            ],
            "why": "$-2y = -3x + 6$ を $-2$ で割り $y = \\dfrac{3}{2}x - 3$ です。",
            "oneLine": "$-2$ で割るとき定数項も $-3$ になる！",
            "skill": "等式変形",
            "rate": 79,
            "difficulty": 3
          },
          {
            "prompt": "連続する2つの正の偶数の積が $48$ のとき、この2つの偶数の和を求めなさい。",
            "choices": [
              "$14$",
              "$12$",
              "$16$",
              "$10$"
            ],
            "why": "$6\\times 8=48$ より和は $6+8=14$ です。",
            "oneLine": "正の偶数 $6, 8$ の和＝$14$！",
            "skill": "二次方程式の応用",
            "rate": 77,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma1_2": {
    "practice": [
      {
        "id": "ma1_2_exp_p1",
        "title": "連立方程式の文章題 網羅演習（2桁自然数・割引・速さ・割合）",
        "category": "連立方程式",
        "leadText": "2けたの自然数・定価の割引・速さの切り替え・食塩水混合・今月の個数を求める増減問題を完全網羅します。",
        "explanationSummary": "基準となる「もとの数」「定価」「先月」を $x,y$ と置き、最後に問題が何を聞いているかを確認します。",
        "surroundingKnowledge": [
          "20%引き＝$0.8x$、10%引き＝$0.9y$"
        ],
        "deepDiveTopics": [
          "単位換算と増減式"
        ],
        "questions": [
          {
            "prompt": "2けたの自然数があり、各位の数の和は $11$、十の位と一の位を入れ替えた数はもとの数より $27$ 大きい。もとの自然数を求めなさい。",
            "choices": [
              "$47$",
              "$74$",
              "$38$",
              "$56$"
            ],
            "why": "$x+y=11$ と $9(y-x)=27\\ (y-x=3)$ より $x=4, y=7$、もとの数は $47$ です。",
            "oneLine": "$x+y=11,\\ y-x=3 \\Rightarrow 47$！",
            "skill": "2けたの自然数",
            "rate": 76,
            "difficulty": 3
          },
          {
            "prompt": "シャツ1枚とズボン1本を定価で買うと合計 $6,500$ 円だが、シャツが $20\\%$ 引き、ズボンが $10\\%$ 引きで合計 $5,550$ 円だった。シャツ1枚の【定価】はいくらか。",
            "choices": [
              "$3,000$円",
              "$3,500$円",
              "$2,400$円",
              "$2,500$円"
            ],
            "why": "$x+y=6500,\\ 0.8x+0.9y=5550$ より $x=3000$ 円です。",
            "oneLine": "$0.8x+0.9y=5550 \\Rightarrow$ 定価 $3,000$円！",
            "skill": "定価と割引",
            "rate": 67,
            "difficulty": 3
          },
          {
            "prompt": "家から $2,140\\text{m}$ 離れた駅まで、はじめは分速 $60\\text{m}$ で歩き、途中から分速 $140\\text{m}$ で走ったら全体で $25$ 分かかった。走った道のりは何 $\\text{m}$ か。",
            "choices": [
              "$1,120\\text{m}$",
              "$1,020\\text{m}$",
              "$980\\text{m}$",
              "$1,260\\text{m}$"
            ],
            "why": "歩いた時間 $s$ 分、走った時間 $t$ 分とすると $s+t=25,\\ 60s+140t=2140 \\Rightarrow t=8$ 分。走った道のりは $140\\times 8=1,120\\text{m}$ です。",
            "oneLine": "走った時間8分×分速140m＝1,120m！",
            "skill": "速さの切り替え",
            "rate": 64,
            "difficulty": 4
          },
          {
            "prompt": "大人2人と中学生3人の入館料合計は $3,100$ 円、大人3人と中学生2人では $3,400$ 円である。中学生1人の入館料はいくらか。",
            "choices": [
              "$500$円",
              "$800$円",
              "$600$円",
              "$450$円"
            ],
            "why": "$2x+3y=3100,\\ 3x+2y=3400$ より $x+y=1300$、よって $y=500$ 円です。",
            "oneLine": "2式の和から $x+y=1300 \\Rightarrow y=500$円！",
            "skill": "個数と代金",
            "rate": 84,
            "difficulty": 3
          },
          {
            "prompt": "$8\\%$ の食塩水と $13\\%$ の食塩水を混ぜて、$10\\%$ の食塩水を $500\\text{g}$ 作りたい。$8\\%$ の食塩水は何 $\\text{g}$ 必要か。",
            "choices": [
              "$300\\text{g}$",
              "$200\\text{g}$",
              "$250\\text{g}$",
              "$350\\text{g}$"
            ],
            "why": "$x+y=500,\\ 0.08x+0.13y=50$ より $x=300\\text{g}$ です。",
            "oneLine": "食塩の和 $0.08x+0.13y=50 \\Rightarrow 300\\text{g}$！",
            "skill": "食塩水の混合",
            "rate": 73,
            "difficulty": 3
          },
          {
            "prompt": "ある工場で先月は製品AとBを合わせて $500$ 個生産した。今月はAが $10\\%$ 増え、Bが $5\\%$ 減って全体で $20$ 個増えた。【今月の製品A】は何個か。",
            "choices": [
              "$330$個",
              "$300$個",
              "$200$個",
              "$190$個"
            ],
            "why": "先月Aを $x$ とすると $x+y=500,\\ 0.10x-0.05y=20 \\Rightarrow x=300$。今月は $300\\times 1.1=330$ 個です。",
            "oneLine": "先月 $x=300$ から今月 $1.1x=330$ 個を出す！",
            "skill": "割合増減",
            "rate": 56,
            "difficulty": 4
          },
          {
            "prompt": "連立方程式 $\\begin{cases} 3x + 2y = 13 \\\\ 5x - 3y = 9 \\end{cases}$ を解いたときの $x$ の値を答えなさい。",
            "shortAnswer": "3",
            "acceptedAnswers": [
              "3",
              "x=3"
            ],
            "why": "$y$ の係数を6にそろえて加減法を行うと $19x = 57$ より $x = 3$ です。",
            "oneLine": "$9x+6y=39$ と $10x-6y=18$ を足して $19x = 57 \\Rightarrow x = 3$！",
            "skill": "連立方程式",
            "rate": 86,
            "difficulty": 2
          },
          {
            "prompt": "二次方程式 $x^2 - 6x + 7 = 0$ を解くと $x = a \\pm \\sqrt{b}$ となる。自然数 $a, b$ の和 $a + b$ を答えなさい。",
            "shortAnswer": "5",
            "acceptedAnswers": [
              "5"
            ],
            "why": "$(x - 3)^2 = 2$ より $x = 3 \\pm \\sqrt{2}$。よって $a = 3, b = 2$ より $a + b = 5$ です。",
            "oneLine": "$(x-3)^2 = 2 \\Rightarrow x = 3 \\pm \\sqrt{2}$！",
            "skill": "二次方程式",
            "rate": 81,
            "difficulty": 2
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma1_2_exp_m1",
        "title": "連立文章題 スピード実戦チェック②",
        "category": "連立方程式",
        "leadText": "池の周回・過不足・原価利益の3問です。",
        "explanationSummary": "逆向きは速さの和、同じ向きは速さの差を使います。",
        "surroundingKnowledge": [
          "利益＝売値−原価"
        ],
        "deepDiveTopics": [
          "過不足算"
        ],
        "questions": [
          {
            "prompt": "1周 $1,200\\text{m}$ の池をAとBが同時出発し、逆向きなら $6$ 分後に出会い、同じ向きなら $30$ 分後にAがBに追いつく。Aの分速は何 $\\text{m}$ か。",
            "choices": [
              "分速 $120\\text{m}$",
              "分速 $80\\text{m}$",
              "分速 $100\\text{m}$",
              "分速 $140\\text{m}$"
            ],
            "why": "$x+y=200,\\ x-y=40$ より $x=120\\text{m/分}$ です。",
            "oneLine": "$x+y=200,\\ x-y=40 \\Rightarrow x=120$！",
            "skill": "池の周回",
            "rate": 70,
            "difficulty": 3
          },
          {
            "prompt": "折り紙を1人に $5$ 枚ずつ配ると $12$ 枚余り、$7$ 枚ずつ配ると $8$ 枚足りない。子どもは何人か。",
            "choices": [
              "$10$人",
              "$62$人",
              "$9$人",
              "$11$人"
            ],
            "why": "$5x+12=7x-8 \\Rightarrow 2x=20 \\Rightarrow x=10$ 人です。",
            "oneLine": "$5x+12=7x-8 \\Rightarrow 10$人！",
            "skill": "過不足問題",
            "rate": 81,
            "difficulty": 3
          },
          {
            "prompt": "原価 $1,500$ 円の品物に $x\\%$ の利益を見込んで定価をつけ、定価の $20\\%$ 引きで売ったら利益が $60$ 円だった。$x$ を求めなさい。",
            "choices": [
              "$30$",
              "$25$",
              "$20$",
              "$35$"
            ],
            "why": "$1500(1+\\frac{x}{100})\\times 0.8 = 1560 \\Rightarrow 1+\\frac{x}{100}=1.3 \\Rightarrow x=30$ です。",
            "oneLine": "定価の8割＝1560円 $\\Rightarrow$ 定価1950円（30%増）！",
            "skill": "原価・定価・利益",
            "rate": 59,
            "difficulty": 4
          }
        ]
      }
    ]
  },
  "ma1_3": {
    "practice": [
      {
        "id": "ma1_3_exp_p1",
        "title": "規則性・カレンダー・文字式証明・平方根応用 網羅演習",
        "category": "規則性・証明",
        "leadText": "碁石・色板・カレンダー・連続奇数の証明・商の平方根パターンを網羅します。",
        "explanationSummary": "等差の $n$ 番目は「初項 $+ d(n-1)$」、正方形枠の周上は頂点の重複4個を引いた $4n-4$ 個です。",
        "surroundingKnowledge": [
          "$1+3+5+\\dots+(2n-1)=n^2$"
        ],
        "deepDiveTopics": [
          "カレンダー囲みの文字式"
        ],
        "questions": [
          {
            "prompt": "1辺に $n$ 個ずつ碁石を並べて中空の正方形の枠を作るとき、碁石の総数を $n$ の式で表しなさい（$n \\ge 2$）。",
            "choices": [
              "$(4n - 4)$ 個",
              "$4n$ 個",
              "$(4n - 2)$ 個",
              "$n^2$ 個"
            ],
            "why": "4頂点の重複を引くので $4n - 4$ 個です。",
            "oneLine": "角4個の重複を引いて $4n-4$ 個！",
            "skill": "規則性（正方形枠）",
            "rate": 75,
            "difficulty": 3
          },
          {
            "prompt": "1段目に1枚、2段目に3枚、3段目に5枚…と奇数の枚数で色板を $n$ 段目まで並べたときの【合計枚数】はどれか。",
            "choices": [
              "$n^2$ 枚",
              "$(2n - 1)$ 枚",
              "$\\dfrac{1}{2}n(n+1)$ 枚",
              "$(2n + 1)$ 枚"
            ],
            "why": "1から始まる $n$ 個の奇数の和は $n^2$ 枚になります。",
            "oneLine": "$1+3+5+\\dots+(2n-1)=n^2$！",
            "skill": "規則性（奇数の和）",
            "rate": 65,
            "difficulty": 4
          },
          {
            "prompt": "カレンダーで縦2マス×横2マスの4つの数を囲むとき、左上の数を $n$ とすると4つの数の和はどう表されるか。",
            "choices": [
              "$4n + 16$",
              "$4n + 8$",
              "$4n + 14$",
              "$4n + 18$"
            ],
            "why": "$n + (n+1) + (n+7) + (n+8) = 4n + 16$ です。",
            "oneLine": "1週間下は $+7$！和は $4n+16$！",
            "skill": "カレンダー文字式",
            "rate": 82,
            "difficulty": 3
          },
          {
            "prompt": "連続する3つの奇数の真ん中を $2n+1$（$n$ は整数）と置いたとき、3つの奇数の和を表した式はどれか。",
            "choices": [
              "$6n + 3 = 3(2n + 1)$",
              "$6n + 1 = 3(2n) + 1$",
              "$3n + 3 = 3(n + 1)$",
              "$6n + 9 = 3(2n + 3)$"
            ],
            "why": "$(2n-1)+(2n+1)+(2n+3) = 6n+3 = 3(2n+1)$ です。",
            "oneLine": "真ん中を $2n+1$ と置くと定数が綺麗にまとまる！",
            "skill": "文字式証明",
            "rate": 80,
            "difficulty": 3
          },
          {
            "prompt": "1番目に5本、2番目に8本、3番目に11本と3本ずつ棒を増やすとき、ちょうど $80$ 本になるのは何番目か。",
            "choices": [
              "26番目",
              "25番目",
              "27番目",
              "24番目"
            ],
            "why": "$3n+2 = 80 \\Rightarrow 3n = 78 \\Rightarrow n = 26$ 番目です。",
            "oneLine": "$3n+2=80 \\Rightarrow 26$番目！",
            "skill": "等差の逆算",
            "rate": 77,
            "difficulty": 3
          },
          {
            "prompt": "$\\sqrt{\\dfrac{180}{n}}$ の値が自然数となるような自然数 $n$ は全部で何個あるか。",
            "choices": [
              "4個",
              "3個",
              "2個",
              "5個"
            ],
            "why": "$180 = 6^2 \\times 5$ より、余りの $5$ に平方数 $1^2, 2^2, 3^2, 6^2$ を掛けた $n = 5, 20, 45, 180$ の4個です。",
            "oneLine": "$180=6^2\\times 5 \\Rightarrow n=5,20,45,180$ の4個！",
            "skill": "平方根（商の個数）",
            "rate": 62,
            "difficulty": 4
          },
          {
            "prompt": "$x = \\sqrt{5} + 2,\\ y = \\sqrt{5} - 2$ のとき、式の値 $x^2 - y^2$ を求めなさい。",
            "shortAnswer": "8√5",
            "acceptedAnswers": [
              "8√5",
              "8ルート5"
            ],
            "why": "そのまま代入せず必ず先に因数分解します！ $x^2 - y^2 = (x + y)(x - y) = (2\\sqrt{5}) \\times 4 = 8\\sqrt{5}$ と3秒で求まります。",
            "oneLine": "式の値は【代入する前にまず因数分解】！ $(x+y)(x-y) = 2\\sqrt{5} \\times 4 = 8\\sqrt{5}$！",
            "skill": "式の値（因数分解の活用）",
            "rate": 82,
            "difficulty": 2
          },
          {
            "prompt": "連続する2つの奇数を、整数 $n$ を使って $2n - 1,\\ 2n + 1$ と表すとき、この2つの奇数の積に $1$ を足した式 $(2n - 1)(2n + 1) + 1$ を展開して簡単にすると、常にある整数の何倍になるか。最も大きい自然数 $k$（$kn^2$ の $k$）を答えなさい。",
            "shortAnswer": "4",
            "acceptedAnswers": [
              "4"
            ],
            "why": "$(2n - 1)(2n + 1) + 1 = (4n^2 - 1) + 1 = 4n^2$ となり、$n^2$ は整数なので常に【4】の倍数になります。",
            "oneLine": "$(2n-1)(2n+1) + 1 = 4n^2$ → 常に【4】の倍数！",
            "skill": "整数の性質の文字式証明",
            "rate": 85,
            "difficulty": 2
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma1_3_exp_m1",
        "title": "規則性・証明 スピード実戦チェック②",
        "category": "規則性",
        "leadText": "商パターン・対角線・2乗の差の3問です。",
        "explanationSummary": "$n$ 角形の対角線は $\\dfrac{n(n-3)}{2}$ 本です。",
        "surroundingKnowledge": [
          "$(n+1)^2-n^2=2n+1$"
        ],
        "deepDiveTopics": [
          "対角線の数え方"
        ],
        "questions": [
          {
            "prompt": "$\\sqrt{\\dfrac{72}{n}}$ が自然数となる自然数 $n$ は何個あるか。",
            "choices": [
              "4個",
              "3個",
              "2個",
              "6個"
            ],
            "why": "$72=6^2\\times 2$ より $n=2, 8, 18, 72$ の4個です。",
            "oneLine": "$72=6^2\\times 2 \\Rightarrow 4$個！",
            "skill": "平方根（商）",
            "rate": 66,
            "difficulty": 3
          },
          {
            "prompt": "凸八角形の対角線は全部で何本引けるか。",
            "choices": [
              "20本",
              "24本",
              "40本",
              "16本"
            ],
            "why": "$\\dfrac{8\\times(8-3)}{2} = 20$ 本です。",
            "oneLine": "$\\dfrac{8\\times 5}{2}=20$本！",
            "skill": "対角線の本数",
            "rate": 74,
            "difficulty": 3
          },
          {
            "prompt": "連続する2つの整数の2乗の差 $(n+1)^2 - n^2$ は常にどのような数になるか。",
            "choices": [
              "もとの2つの整数の和に等しい奇数",
              "常に4の倍数",
              "もとの2つの整数の積",
              "常に偶数"
            ],
            "why": "$(n+1)^2-n^2 = 2n+1 = n+(n+1)$ となります。",
            "oneLine": "$(n+1)^2-n^2 = n+(n+1)$！",
            "skill": "整数の性質",
            "rate": 78,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma2_1": {
    "practice": [
      {
        "id": "ma2_1_exp_p1",
        "title": "関数 y=ax² の変域（a<0含む）・変化の割合・平均の速さ 網羅演習",
        "category": "関数 y=ax²",
        "leadText": "0をまたぐ変域の文字定数決定、変化の割合からの逆算、平均の速さを完全制覇します。",
        "explanationSummary": "$a<0$ で0をまたぐとき最大値が $0$！変化の割合は $a(p+q)$ で即解します。",
        "surroundingKnowledge": [
          "平均の速さ ＝ 変化の割合 $a(p+q)$"
        ],
        "deepDiveTopics": [
          "変域と比例定数の符号"
        ],
        "questions": [
          {
            "prompt": "関数 $y = -2x^2$ で $x$ の変域が $-1 \\le x \\le 3$ のときの $y$ の変域を求めなさい。",
            "choices": [
              "$-18 \\le y \\le 0$",
              "$-18 \\le y \\le -2$",
              "$0 \\le y \\le 18$",
              "$-2 \\le y \\le 0$"
            ],
            "why": "$a<0$ で0を含むため最大値は $0$、最小値は $x=3$ のとき $-18$ です。",
            "oneLine": "$a<0$ の0またぎ＝最大値 $0$、最小値 $-18$！",
            "skill": "変域（a<0）",
            "rate": 63,
            "difficulty": 4
          },
          {
            "prompt": "関数 $y = ax^2$（$a > 0$）で $x$ の変域が $-4 \\le x \\le 2$ のとき $y$ の変域が $0 \\le y \\le 8$ であった。$a$ を求めなさい。",
            "choices": [
              "$a = \\dfrac{1}{2}$",
              "$a = 2$",
              "$a = \\dfrac{1}{4}$",
              "$a = 1$"
            ],
            "why": "$x=-4$ で最大値 $8$ をとるので $16a=8 \\Rightarrow a=\\dfrac{1}{2}$ です。",
            "oneLine": "$16a=8 \\Rightarrow a=\\dfrac{1}{2}$！",
            "skill": "変域から定数決定",
            "rate": 69,
            "difficulty": 3
          },
          {
            "prompt": "関数 $y = 3x^2$ で $x$ が $a$ から $a + 2$ まで増加するときの変化の割合が $18$ であった。$a$ を求めなさい。",
            "choices": [
              "$a = 2$",
              "$a = 3$",
              "$a = 1$",
              "$a = 4$"
            ],
            "why": "$3(a + a + 2) = 18 \\Rightarrow 2a+2=6 \\Rightarrow a=2$ です。",
            "oneLine": "$a(p+q)$ 公式より $3(2a+2)=18 \\Rightarrow a=2$！",
            "skill": "変化の割合の逆算",
            "rate": 71,
            "difficulty": 3
          },
          {
            "prompt": "関数 $y = -x^2$ で $x$ が $-5$ から $-1$ まで増加するときの変化の割合を求めなさい。",
            "choices": [
              "$6$",
              "$-6$",
              "$4$",
              "$-4$"
            ],
            "why": "$-1\\times(-5-1) = +6$ です。",
            "oneLine": "$-1\\times(-6)=+6$！",
            "skill": "変化の割合",
            "rate": 72,
            "difficulty": 3
          },
          {
            "prompt": "斜面を転がる球の $x$ 秒間の距離が $y = 2x^2$（$\\text{m}$）のとき、$2$ 秒後から $5$ 秒後までの平均の速さを求めなさい。",
            "choices": [
              "秒速 $14\\text{m}$",
              "秒速 $10\\text{m}$",
              "秒速 $7\\text{m}$",
              "秒速 $21\\text{m}$"
            ],
            "why": "$2(2+5) = 14\\text{m/s}$ です。",
            "oneLine": "平均の速さ $= 2(2+5)=14\\text{m/s}$！",
            "skill": "平均の速さ",
            "rate": 77,
            "difficulty": 3
          },
          {
            "prompt": "反比例 $y = -\\dfrac{12}{x}$ で $x$ の変域が $2 \\le x \\le 6$ のときの $y$ の変域を求めなさい。",
            "choices": [
              "$-6 \\le y \\le -2$",
              "$2 \\le y \\le 6$",
              "$-12 \\le y \\le -2$",
              "$-6 \\le y \\le 0$"
            ],
            "why": "$x=2$ で $-6$、$x=6$ で $-2$ なので $-6 \\le y \\le -2$ です。",
            "oneLine": "両端代入で $-6 \\le y \\le -2$！",
            "skill": "反比例の変域",
            "rate": 76,
            "difficulty": 3
          },
          {
            "prompt": "反比例 $y = \\dfrac{12}{x}$ について、$x$ の変域が $-6 \\leqq x \\leqq -2$ のときの $y$ の変域を選びなさい。",
            "choices": [
              "-6 ≦ y ≦ -2",
              "-2 ≦ y ≦ -6",
              "2 ≦ y ≦ 6",
              "-6 ≦ y ≦ 6"
            ],
            "why": "$x = -6$ のとき $y = -2$、$x = -2$ のとき $y = -6$ より $-6 \\leqq y \\leqq -2$ です。",
            "oneLine": "変域は小さい順！ $-6 \\leqq y \\leqq -2$！",
            "skill": "反比例の変域",
            "rate": 82,
            "difficulty": 2,
            "wrongReasons": [
              "大小の向きが逆。",
              "符号ミス。",
              "誤り。"
            ]
          },
          {
            "prompt": "直線 $y = -2x + 7$ に【平行】で、点 $(3,\\ 4)$ を通る一次関数の式を $y = ax + b$ とするとき、切片 $b$ の値を求めなさい。",
            "shortAnswer": "10",
            "acceptedAnswers": [
              "10",
              "+10"
            ],
            "why": "平行な2直線の【傾きは等しい】ので $a = -2$。$y = -2x + b$ に $(3, 4)$ を代入して $4 = -6 + b \\Rightarrow b = 10$ です。",
            "oneLine": "『直線に平行』＝【傾き $a$ が同じ】！ $y = -2x + b$ に $(3, 4)$ を代入して $b = 10$！",
            "skill": "平行な直線の式",
            "rate": 86,
            "difficulty": 2
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma2_1_exp_m1",
        "title": "関数変域 スピード実戦チェック②",
        "category": "関数",
        "leadText": "一次関数変域・制動距離・放物線式決定の3問です。",
        "explanationSummary": "傾きが負の一次関数は左端で最大、右端で最小になります。",
        "surroundingKnowledge": [
          "2乗に比例：速さ $k$ 倍 $\\Rightarrow$ 距離 $k^2$ 倍"
        ],
        "deepDiveTopics": [
          "制動距離"
        ],
        "questions": [
          {
            "prompt": "一次関数 $y = -2x + b$（$-1 \\le x \\le 4$）の変域が $-3 \\le y \\le 7$ のとき、$b$ を求めなさい。",
            "choices": [
              "$b = 5$",
              "$b = 1$",
              "$b = 3$",
              "$b = -1$"
            ],
            "why": "右下がりなので $x=-1$ のとき $y=7$。$2+b=7 \\Rightarrow b=5$ です。",
            "oneLine": "左端 $(-1, 7)$ を通り $b=5$！",
            "skill": "一次関数の変域",
            "rate": 67,
            "difficulty": 3
          },
          {
            "prompt": "速さの2乗に比例する制動距離が時速 $40\\text{km}$ で $8\\text{m}$ のとき、時速 $60\\text{km}$ では何 $\\text{m}$ か。",
            "choices": [
              "$18\\text{m}$",
              "$12\\text{m}$",
              "$16\\text{m}$",
              "$24\\text{m}$"
            ],
            "why": "速さが $\\frac{3}{2}$ 倍なので距離は $\\frac{9}{4}$ 倍になり $8\\times\\frac{9}{4}=18\\text{m}$ です。",
            "oneLine": "$8\\times(\\frac{3}{2})^2 = 18\\text{m}$！",
            "skill": "制動距離",
            "rate": 73,
            "difficulty": 3
          },
          {
            "prompt": "点 $(-3, -18)$ を通る放物線 $y = ax^2$ の式を求めなさい。",
            "choices": [
              "$y = -2x^2$",
              "$y = 2x^2$",
              "$y = -6x^2$",
              "$y = -\\dfrac{1}{2}x^2$"
            ],
            "why": "$9a=-18 \\Rightarrow a=-2$ より $y=-2x^2$ です。",
            "oneLine": "$9a=-18 \\Rightarrow y=-2x^2$！",
            "skill": "放物線の式",
            "rate": 88,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma2_2": {
    "practice": [
      {
        "id": "ma2_2_exp_p1",
        "title": "放物線と図形（等積変形・面積二等分・正方形・平行四辺形）網羅演習",
        "category": "関数と図形",
        "leadText": "大問3の勝負問題である等積変形・面積二等分線・文字座標 $(t, t^2)$ を徹底攻略します。",
        "explanationSummary": "等積変形は平行な直線の傾き一致、面積二等分は対辺の中点通過、正方形は文字座標 $(t, at^2)$ で縦＝横を立式します。",
        "surroundingKnowledge": [
          "平行四辺形OACB：$\\text{O}+\\text{C}=\\text{A}+\\text{B}$"
        ],
        "deepDiveTopics": [
          "等積変形"
        ],
        "questions": [
          {
            "prompt": "放物線 $y = \\dfrac{1}{2}x^2$ 上の2点 $\\text{A}(-2, 2),\\ \\text{B}(4, 8)$ を通る直線 $\\text{AB}$ の式を求めなさい。",
            "choices": [
              "$y = x + 4$",
              "$y = x + 6$",
              "$y = 2x + 6$",
              "$y = \\dfrac{1}{2}x + 3$"
            ],
            "why": "傾き $\\frac{1}{2}(-2+4)=1$、切片 $-\\frac{1}{2}(-2)(4)=4$ より $y=x+4$ です。",
            "oneLine": "裏ワザ公式で傾き1・切片4 $\\Rightarrow y=x+4$！",
            "skill": "2交点の直線",
            "rate": 78,
            "difficulty": 3
          },
          {
            "prompt": "$\\text{A}(-2,2),\\ \\text{B}(4,8)$、直線AB：$y=x+4$ のとき、$\\triangle\\text{OAB}$ の面積を求めなさい。",
            "choices": [
              "$12$",
              "$24$",
              "$16$",
              "$10$"
            ],
            "why": "切片 $4$、横幅 $2+4=6$ より $\\frac{1}{2}\\times 4\\times 6=12$ です。",
            "oneLine": "$\\frac{1}{2}\\times 4\\times 6 = 12$！",
            "skill": "三角形OABの面積",
            "rate": 76,
            "difficulty": 3
          },
          {
            "prompt": "$\\text{A}(-2,2),\\ \\text{B}(4,8)$ に対し、放物線 $y=\\dfrac{1}{2}x^2$ の原点 $\\text{O}$ と点 $\\text{B}$ の間に $\\triangle\\text{PAB}=\\triangle\\text{OAB}$ となる点 $\\text{P}$ をとる。点 $\\text{P}$ の座標はどれか。",
            "choices": [
              "$(2, 2)$",
              "$(1, \\frac{1}{2})$",
              "$(3, \\frac{9}{2})$",
              "$(2, 4)$"
            ],
            "why": "Oを通りAB（傾き1）に平行な直線 $y=x$ と $y=\\frac{1}{2}x^2$ の交点より $(2, 2)$ です。",
            "oneLine": "平行線 $y=x$ との交点 $\\Rightarrow (2,2)$！",
            "skill": "等積変形",
            "rate": 54,
            "difficulty": 4
          },
          {
            "prompt": "点 $\\text{B}(4, 8)$ を通り、$\\triangle\\text{OAB}$（$\\text{A}(-2,2)$）の面積を二等分する直線の式を求めなさい。",
            "choices": [
              "$y = \\dfrac{7}{5}x + \\dfrac{12}{5}$",
              "$y = \\dfrac{3}{2}x + 2$",
              "$y = 2x$",
              "$y = \\dfrac{5}{3}x + \\dfrac{4}{3}$"
            ],
            "why": "OAの中点 $(-1,1)$ と $\\text{B}(4,8)$ を結ぶ直線なので $y = \\dfrac{7}{5}x + \\dfrac{12}{5}$ です。",
            "oneLine": "OAの中点 $(-1,1)$ と $\\text{B}(4,8)$ を通る直線！",
            "skill": "面積二等分線",
            "rate": 60,
            "difficulty": 4
          },
          {
            "prompt": "放物線 $y = x^2$ の第1象限上の点 $\\text{P}$ から両軸に垂線を下ろしてできる長方形が正方形になった。点 $\\text{P}$ の座標はどれか。",
            "choices": [
              "$(1, 1)$",
              "$(2, 4)$",
              "$(\\frac{1}{2}, \\frac{1}{4})$",
              "$(4, 16)$"
            ],
            "why": "$\\text{P}(t, t^2)$（$t>0$）で $t=t^2 \\Rightarrow t=1$ より $(1,1)$ です。",
            "oneLine": "$t = t^2\\ (t>0) \\Rightarrow (1,1)$！",
            "skill": "文字座標の活用",
            "rate": 74,
            "difficulty": 3
          },
          {
            "prompt": "3点 $\\text{O}(0,0),\\ \\text{A}(2, 5),\\ \\text{B}(6, 3)$ に対し、$\\text{OC}$ を対角線とする平行四辺形 $\\text{OACB}$ の頂点 $\\text{C}$ の座標を求めなさい。",
            "choices": [
              "$(8, 8)$",
              "$(4, -2)$",
              "$(8, 2)$",
              "$(4, 8)$"
            ],
            "why": "$\\text{C}(2+6, 5+3) = (8, 8)$ です。",
            "oneLine": "対角の座標の和一致 $\\Rightarrow (8,8)$！",
            "skill": "座標と平行四辺形",
            "rate": 72,
            "difficulty": 3
          },
          {
            "prompt": "関数 $y = \\dfrac{1}{2}x^2$ について、$x$ の値が $2$ から $6$ まで増加するときの変化の割合を求めなさい。",
            "shortAnswer": "4",
            "acceptedAnswers": [
              "4"
            ],
            "why": "$a(p + q) = \\dfrac{1}{2} \\times (2 + 6) = 4$ です。",
            "oneLine": "$y = ax^2$ の変化の割合 ＝ $a(p + q) = \\dfrac{1}{2}(2 + 6) = 4$！",
            "skill": "2乗に比例する関数の変化の割合",
            "rate": 85,
            "difficulty": 2
          },
          {
            "prompt": "放物線 $y = x^2$ と直線 $y = 2x + 8$ の2つの交点A、Bと原点Oを結んでできる $\\triangle\\text{OAB}$ の面積を求めなさい。",
            "shortAnswer": "24",
            "acceptedAnswers": [
              "24"
            ],
            "why": "連立して $x^2 = 2x + 8 \\Rightarrow x^2 - 2x - 8 = 0 \\Rightarrow (x - 4)(x + 2) = 0$ より交点の $x$ 座標は $-2$ と $4$。直線 $y = 2x + 8$ の切片は $(0, 8)$ なので、$y$ 軸で左右2つの三角形に分割すると、共通の底辺が $8$、高さの和が $|-2| + 4 = 6$！ よって面積は $\\dfrac{1}{2} \\times 8 \\times (2 + 4) = 24$ です！",
            "oneLine": "放物線と直線の $\\triangle\\text{OAB}$ 面積公式 ＝ $\\dfrac{1}{2} \\times (\\text{切片}) \\times (x_B - x_A) = \\dfrac{1}{2} \\times 8 \\times 6 = 24$！",
            "skill": "放物線と直線の三角形面積",
            "rate": 72,
            "difficulty": 3
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma2_2_exp_m1",
        "title": "関数と図形 スピード実戦チェック②",
        "category": "関数と図形",
        "leadText": "中点・切片・対称点の3問です。",
        "explanationSummary": "中点は足して2で割る、$x$ 軸上は $y=0$ です。",
        "surroundingKnowledge": [
          "$y$ 軸対称は $x$ の符号反転"
        ],
        "deepDiveTopics": [
          "座標幾何の基本"
        ],
        "questions": [
          {
            "prompt": "2点 $\\text{A}(-4, 6),\\ \\text{B}(2, -2)$ の中点の座標を求めなさい。",
            "choices": [
              "$(-1, 2)$",
              "$(-3, 4)$",
              "$(1, 2)$",
              "$(-1, 4)$"
            ],
            "why": "$(\\frac{-4+2}{2}, \\frac{6-2}{2})=(-1,2)$ です。",
            "oneLine": "足して2で割り $(-1,2)$！",
            "skill": "中点座標",
            "rate": 86,
            "difficulty": 3
          },
          {
            "prompt": "直線 $y = -\\dfrac{3}{4}x + 6$ と $x$ 軸との交点の座標を求めなさい。",
            "choices": [
              "$(8, 0)$",
              "$(6, 0)$",
              "$(-8, 0)$",
              "$(0, 6)$"
            ],
            "why": "$y=0$ を代入し $x=8$、よって $(8,0)$ です。",
            "oneLine": "$y=0$ 代入で $(8,0)$！",
            "skill": "x軸との交点",
            "rate": 83,
            "difficulty": 3
          },
          {
            "prompt": "放物線 $y = \\dfrac{1}{3}x^2$ 上の点 $(-6, 12)$ と $y$ 軸について対称な点の座標を求めなさい。",
            "choices": [
              "$(6, 12)$",
              "$(6, -12)$",
              "$(-6, -12)$",
              "$(12, 6)$"
            ],
            "why": "$x$ 座標の符号だけ変わり $(6, 12)$ です。",
            "oneLine": "$y$ 軸対称 $\\Rightarrow (6,12)$！",
            "skill": "放物線の対称性",
            "rate": 88,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma2_3": {
    "practice": [
      {
        "id": "ma2_3_exp_p1",
        "title": "一次関数の利用（料金プラン・動点面積・給排水）網羅演習",
        "category": "一次関数の利用",
        "leadText": "料金プランの損得比較、長方形上の動点Pの変域別立式、水槽の給排水グラフを完全網羅します。",
        "explanationSummary": "超過料金プランは $b + a(x - x_0)$ と引き算を忘れないこと！動点の減少区間は「ゴールまでの残り長さ」を使うと一瞬で立式できます。",
        "surroundingKnowledge": [
          "2直線の交点 ＝ 連立方程式の解"
        ],
        "deepDiveTopics": [
          "区間別の一次関数立式"
        ],
        "questions": [
          {
            "prompt": "自転車レンタルで、1分 $20$ 円のAプランと、基本料 $900$ 円で $30$ 分まで無料・$30$ 分超は1分 $10$ 円のBプランがある。Bプランの方が安くなるのは何分より多く利用したときか。",
            "choices": [
              "$60$分より多く利用したとき",
              "$45$分より多く利用したとき",
              "$75$分より多く利用したとき",
              "$90$分より多く利用したとき"
            ],
            "why": "$20x = 900 + 10(x-30) = 10x + 600 \\Rightarrow x = 60$ 分なので、$60$ 分を超えたときです。",
            "oneLine": "$20x = 10x + 600 \\Rightarrow 60$分超！",
            "skill": "料金プラン比較",
            "rate": 61,
            "difficulty": 4
          },
          {
            "prompt": "縦 $6\\text{cm}$・横 $8\\text{cm}$ の長方形 $\\text{ABCD}$ で、点 $\\text{P}$ が $\\text{A}$ から毎秒 $1\\text{cm}$ で $\\text{AB}\\to\\text{BC}\\to\\text{CD}$ 上を $\\text{D}$ まで動く。$\\triangle\\text{APD}$ の面積が $24\\text{cm}^2$ で一定になる $x$ の変域はどれか。",
            "choices": [
              "$6 \\le x \\le 14$",
              "$0 \\le x \\le 6$",
              "$6 \\le x \\le 8$",
              "$8 \\le x \\le 14$"
            ],
            "why": "辺BC上にある $6$ 秒後から $6+8=14$ 秒後までです。",
            "oneLine": "B到着6秒〜C到着14秒！",
            "skill": "動点の一定区間",
            "rate": 73,
            "difficulty": 3
          },
          {
            "prompt": "上の長方形動点問題で、点 $\\text{P}$ が辺 $\\text{CD}$ 上にあるとき（$14 \\le x \\le 20$）、$\\triangle\\text{APD}$ の面積 $y\\text{cm}^2$ を $x$ の式で表しなさい。",
            "choices": [
              "$y = -4x + 80$",
              "$y = -4x + 56$",
              "$y = 4x - 56$",
              "$y = -3x + 60$"
            ],
            "why": "残り距離 $\\text{PD}=20-x$ より $y = \\frac{1}{2}\\times 8\\times(20-x) = -4x + 80$ です。",
            "oneLine": "残り長さ $(20-x)$ を使い $y=-4x+80$！",
            "skill": "動点の減少区間",
            "rate": 57,
            "difficulty": 4
          },
          {
            "prompt": "$50\\text{L}$ 水が入った水槽に、最初の $5$ 分間は毎分 $4\\text{L}$ 給水のみ行い、その後は給水したまま毎分 $9\\text{L}$ で排水も行った。最初から数えて何分後に水槽は空になるか。",
            "choices": [
              "$19$分後",
              "$14$分後",
              "$15$分後",
              "$20$分後"
            ],
            "why": "5分後の水量は $50+20=70\\text{L}$。その後は毎分 $(9-4)=5\\text{L}$ ずつ減るので $70\\div 5 = 14$ 分かかり、最初から $5+14=19$ 分後です！",
            "oneLine": "5分後70Lから毎分5L減少で14分 $\\Rightarrow 5+14=19$分後！",
            "skill": "水槽の給排水",
            "rate": 64,
            "difficulty": 4
          },
          {
            "prompt": "傾きが $-2$ で点 $(3, -1)$ を通る直線の式を求めなさい。",
            "choices": [
              "$y = -2x + 5$",
              "$y = -2x - 7$",
              "$y = -2x + 1$",
              "$y = -2x + 6$"
            ],
            "why": "$-1 = -2\\times 3 + b \\Rightarrow b = 5$ より $y=-2x+5$ です。",
            "oneLine": "$-1 = -6 + b \\Rightarrow b=5$！",
            "skill": "直線の式決定",
            "rate": 87,
            "difficulty": 3
          },
          {
            "prompt": "2直線 $y = 2x - 1$ と $y = -x + 8$ の交点を通り、直線 $y = 4x + 1$ に平行な直線の式を求めなさい。",
            "choices": [
              "$y = 4x - 7$",
              "$y = 4x + 5$",
              "$y = 4x - 17$",
              "$y = -4x + 17$"
            ],
            "why": "交点は $2x-1=-x+8 \\Rightarrow x=3, y=5$。傾き $4$ で点 $(3,5)$ を通るので $5 = 4\\times 3 + b \\Rightarrow b = -7$、よって $y = 4x - 7$ です。",
            "oneLine": "交点 $(3,5)$・傾き $4 \\Rightarrow y = 4x - 7$！",
            "skill": "交点と平行条件",
            "rate": 72,
            "difficulty": 3
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma2_3_exp_m1",
        "title": "一次関数利用 スピード実戦チェック②",
        "category": "一次関数",
        "leadText": "平行条件・ろうそくの長さ・ダイヤグラム速さの3問です。",
        "explanationSummary": "平行な2直線は「傾きが等しい」を使います。",
        "surroundingKnowledge": [
          "速さ ＝ ダイヤグラムの傾きの絶対値"
        ],
        "deepDiveTopics": [
          "線香・ろうそくの燃焼関数"
        ],
        "questions": [
          {
            "prompt": "長さ $20\\text{cm}$ のろうそくに火をつけると毎分 $0.5\\text{cm}$ ずつ短くなる。火をつけてから $x$ 分後の長さが $12\\text{cm}$ になるのは何分後か。",
            "choices": [
              "$16$分後",
              "$14$分後",
              "$24$分後",
              "$8$分後"
            ],
            "why": "$20 - 0.5x = 12 \\Rightarrow 0.5x = 8 \\Rightarrow x = 16$ 分後です。",
            "oneLine": "$20 - 0.5x = 12 \\Rightarrow 16$分後！",
            "skill": "一次関数の利用",
            "rate": 85,
            "difficulty": 3
          },
          {
            "prompt": "点 $(2, 7)$ を通り、直線 $y = 3x - 5$ に平行な直線の式を求めなさい。",
            "choices": [
              "$y = 3x + 1$",
              "$y = 3x - 1$",
              "$y = -3x + 13$",
              "$y = 3x + 7$"
            ],
            "why": "平行より傾き $3$。$7 = 3\\times 2 + b \\Rightarrow b = 1$ より $y=3x+1$ です。",
            "oneLine": "平行＝傾き $3$、$(2,7)$ 代入で $y=3x+1$！",
            "skill": "平行な直線",
            "rate": 84,
            "difficulty": 3
          },
          {
            "prompt": "兄が分速 $60\\text{m}$ で家を出発してから $8$ 分後に、弟が自転車で分速 $180\\text{m}$ で追いかけた。弟が出発してから何分後に兄に追いつくか。",
            "choices": [
              "$4$分後",
              "$6$分後",
              "$12$分後",
              "$3$分後"
            ],
            "why": "兄の先行距離 $60\\times 8 = 480\\text{m}$ を速さの差 $180-60=120\\text{m/分}$ で詰めるので $480\\div 120 = 4$ 分後です。",
            "oneLine": "$60(x+8) = 180x \\Rightarrow x = 4$分後！",
            "skill": "追いつきの一次関数",
            "rate": 75,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma3_1": {
    "practice": [
      {
        "id": "ma3_1_exp_p1",
        "title": "平面図形（平行線角・円周角接線・角の二等分線比・相似面積比）網羅演習",
        "category": "平面図形",
        "leadText": "角度・円周角・平行線と線分比・中点連結定理・台形の面積比まで平面図形の頻出テーマを網羅します。",
        "explanationSummary": "①接線と接点を通る半径は $90^\\circ$、②内接四角形の対角の和は $180^\\circ$、③台形の対角線4分割の面積比は上底:下底 $= a:b$ のとき $a^2 : ab : ab : b^2$ です！",
        "surroundingKnowledge": [
          "中点連結定理：$\\text{MN} \\parallel \\text{BC}$ かつ $\\text{MN} = \\dfrac{1}{2}\\text{BC}$"
        ],
        "deepDiveTopics": [
          "台形対角線の面積比 $a^2:ab:ab:b^2$"
        ],
        "questions": [
          {
            "prompt": "対角線の総数が $27$ 本である多角形は何角形か。半角数字（整数）で答えなさい。",
            "shortAnswer": "9",
            "acceptedAnswers": [
              "9",
              "9角形",
              "九角形"
            ],
            "why": "$n$ 角形の1つの頂点からは自分自身と両隣の3点を除いた $(n - 3)$ 本の対角線が引け、両端で2回ずつ数えるため総数は $\\dfrac{n(n - 3)}{2}$ 本です。$\\dfrac{n(n - 3)}{2} = 27 \\Rightarrow n(n - 3) = 54 \\Rightarrow n^2 - 3n - 54 = 0 \\Rightarrow (n - 9)(n + 6) = 0$ より $n = 9$（九角形）です。",
            "oneLine": "$n$ 角形の対角線の総数 $= \\dfrac{n(n - 3)}{2}$ 本！ $n(n-3)=54$ より $9\\times 6 = 54 \\Rightarrow 9$ 角形！",
            "skill": "多角形の対角線の総数と二次方程式",
            "rate": 73,
            "difficulty": 3
          },
          {
            "prompt": "円に内接する四角形 $\\text{ABCD}$ において、$\\angle\\text{A} = 72^\\circ$ のとき、向かい合う $\\angle\\text{C}$ の大きさは何度か。",
            "choices": [
              "$108^\\circ$",
              "$72^\\circ$",
              "$144^\\circ$",
              "$98^\\circ$"
            ],
            "why": "円に内接する四角形の向かい合う内角の和は $180^\\circ$ なので $180^\\circ - 72^\\circ = 108^\\circ$ です。",
            "oneLine": "円に内接する四角形の対角の和 $= 180^\\circ$！",
            "skill": "円周角の応用",
            "rate": 82,
            "difficulty": 3
          },
          {
            "prompt": "$\\text{AD} \\parallel \\text{BC}$ の台形 $\\text{ABCD}$ で $\\text{AD} = 4\\text{cm},\\ \\text{BC} = 6\\text{cm}$、対角線 $\\text{AC}$ と $\\text{BD}$ の交点を $\\text{O}$ とする。$\\triangle\\text{AOD}$ の面積が $8\\text{cm}^2$ のとき、$\\triangle\\text{BOC}$ の面積は何 $\\text{cm}^2$ か。",
            "choices": [
              "$18\\text{cm}^2$",
              "$12\\text{cm}^2$",
              "$24\\text{cm}^2$",
              "$16\\text{cm}^2$"
            ],
            "why": "$\\triangle\\text{AOD} \\sim \\triangle\\text{COB}$ で相似比が $4:6 = 2:3$ なので、面積比は $2^2 : 3^2 = 4:9$。$8 \\times \\dfrac{9}{4} = 18\\text{cm}^2$ です。",
            "oneLine": "相似比 $2:3 \\Rightarrow$ 面積比 $4:9 \\Rightarrow 18\\text{cm}^2$！",
            "skill": "相似と面積比",
            "rate": 71,
            "difficulty": 3
          },
          {
            "prompt": "上の台形 $\\text{ABCD}$（$\\text{AD}:\\text{BC}=2:3$、$\\triangle\\text{AOD}=8\\text{cm}^2$）において、【台形 $\\text{ABCD}$ 全体】の面積は何 $\\text{cm}^2$ か。",
            "choices": [
              "$50\\text{cm}^2$",
              "$44\\text{cm}^2$",
              "$38\\text{cm}^2$",
              "$60\\text{cm}^2$"
            ],
            "why": "$\\triangle\\text{AOD}:\\triangle\\text{AOB} = \\text{DO}:\\text{OB} = 2:3$ より $\\triangle\\text{AOB}=\\triangle\\text{DOC}=12\\text{cm}^2$。$\\triangle\\text{BOC}=18\\text{cm}^2$ と合わせて $8+12+12+18 = 50\\text{cm}^2$ です！",
            "oneLine": "$a^2:ab:ab:b^2 = 4:6:6:9$ より合計 $25$ 比 $= 50\\text{cm}^2$！",
            "skill": "台形4分割の面積比",
            "rate": 56,
            "difficulty": 4
          },
          {
            "prompt": "$\\triangle\\text{ABC}$ で $\\text{AB} = 8\\text{cm},\\ \\text{AC} = 6\\text{cm},\\ \\text{BC} = 7\\text{cm}$ とする。$\\angle\\text{A}$ の二等分線と辺 $\\text{BC}$ の交点を $\\text{D}$ とするとき、線分 $\\text{BD}$ の長さを求めなさい。",
            "choices": [
              "$4\\text{cm}$",
              "$3\\text{cm}$",
              "$3.5\\text{cm}$",
              "$\\dfrac{16}{3}\\text{cm}$"
            ],
            "why": "角の二等分線の定理より $\\text{BD}:\\text{DC} = \\text{AB}:\\text{AC} = 8:6 = 4:3$。よって $\\text{BD} = 7 \\times \\dfrac{4}{4+3} = 4\\text{cm}$ です。",
            "oneLine": "角の二等分線定理 $\\text{BD}:\\text{DC} = 8:6 = 4:3 \\Rightarrow 4\\text{cm}$！",
            "skill": "角の二等分線と比",
            "rate": 70,
            "difficulty": 3
          },
          {
            "prompt": "$\\text{AB} \\parallel \\text{EF} \\parallel \\text{CD}$ の平行線と交わる図形（両端の縦線 $\\text{AB}=6\\text{cm},\\ \\text{CD}=12\\text{cm}$、$\\text{AD}$ と $\\text{BC}$ の交点 $\\text{E}$ から下した平行線 $\\text{EF}$）において、線分 $\\text{EF}$ の長さは何 $\\text{cm}$ か。",
            "choices": [
              "$4\\text{cm}$",
              "$4.5\\text{cm}$",
              "$3\\text{cm}$",
              "$5\\text{cm}$"
            ],
            "why": "和分の積の裏ワザ公式 $\\text{EF} = \\dfrac{6 \\times 12}{6 + 12} = \\dfrac{72}{18} = 4\\text{cm}$ です（相似比 $1:2$ より $\\text{BF}:\\text{FC}=1:2 \\Rightarrow \\text{EF}=12\\times\\frac{1}{3}=4\\text{cm}$）。",
            "oneLine": "砂時計＋ピラミッド融合の公式 $\\dfrac{ab}{a+b} = \\dfrac{6\\times 12}{6+12} = 4\\text{cm}$！",
            "skill": "平行線と比（和分の積）",
            "rate": 61,
            "difficulty": 4
          },
          {
            "prompt": "正八角形の1つの内角の大きさは何度か。半角数字で答えなさい。",
            "shortAnswer": "135",
            "acceptedAnswers": [
              "135",
              "135°"
            ],
            "why": "1つの外角が $360^\\circ \\div 8 = 45^\\circ$ なので、1つの内角は $180^\\circ - 45^\\circ = 135^\\circ$ です。",
            "oneLine": "外角 $360 \\div 8 = 45^\\circ$ を引いて $180 - 45 = 135^\\circ$！",
            "skill": "多角形の内角と外角",
            "rate": 86,
            "difficulty": 2
          },
          {
            "prompt": "半径 $9\\text{ cm}$、中心角 $120^\\circ$ のおうぎ形を丸めて側面にした円錐をつくるとき、この円錐の【底面の円の半径】は何 $\\text{cm}$ か。半角数字で答えなさい。",
            "shortAnswer": "3",
            "acceptedAnswers": [
              "3",
              "3cm"
            ],
            "why": "円錐の展開図の秒殺公式 $\\dfrac{\\text{底面の半径 } r}{\\text{母線 } R} = \\dfrac{\\text{中心角}}{360^\\circ}$ より、$\\dfrac{r}{9} = \\dfrac{120}{360} = \\dfrac{1}{3}$ なので $r = 3\\text{ cm}$ です。",
            "oneLine": "円錐の黄金比 $\\dfrac{r}{\\text{母線}} = \\dfrac{\\text{中心角}}{360^\\circ}$！ $\\dfrac{r}{9} = \\dfrac{1}{3} \\Rightarrow r = 3\\text{ cm}$！",
            "skill": "円錐の展開図と底面半径",
            "rate": 80,
            "difficulty": 2
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma3_1_exp_m1",
        "title": "平面図形 スピード実戦チェック②",
        "category": "平面図形",
        "leadText": "中点連結定理・円の接線角・おうぎ形面積の3問です。",
        "explanationSummary": "円の中心Oと接点Tを結ぶ半径OTは接線と垂直（$90^\\circ$）です。",
        "surroundingKnowledge": [
          "おうぎ形の面積 $S = \\dfrac{1}{2}lr$（弧の長さ×半径÷2）"
        ],
        "deepDiveTopics": [
          "円の接線の性質"
        ],
        "questions": [
          {
            "prompt": "$\\triangle\\text{ABC}$ の辺 $\\text{AB}, \\text{AC}$ の中点をそれぞれ $\\text{M}, \\text{N}$ とする。$\\text{BC} = 14\\text{cm}$ のとき、線分 $\\text{MN}$ の長さを求めなさい。",
            "choices": [
              "$7\\text{cm}$",
              "$6\\text{cm}$",
              "$8\\text{cm}$",
              "$3.5\\text{cm}$"
            ],
            "why": "中点連結定理より $\\text{MN} = \\dfrac{1}{2}\\text{BC} = 7\\text{cm}$ です。",
            "oneLine": "中点連結定理 $\\text{MN}=\\frac{1}{2}\\text{BC}=7\\text{cm}$！",
            "skill": "中点連結定理",
            "rate": 89,
            "difficulty": 3
          },
          {
            "prompt": "円 $\\text{O}$ の外部の点 $\\text{P}$ から円に2本の接線を引き、接点を $\\text{A}, \\text{B}$ とする。$\\angle\\text{APB} = 50^\\circ$ のとき、中心角 $\\angle\\text{AOB}$ の大きさは何度か。",
            "choices": [
              "$130^\\circ$",
              "$100^\\circ$",
              "$140^\\circ$",
              "$125^\\circ$"
            ],
            "why": "$\\angle\\text{OAP}=\\angle\\text{OBP}=90^\\circ$ なので、四角形OAPBの内角の和 $360^\\circ$ から $360 - (90+90+50) = 130^\\circ$ です。",
            "oneLine": "$180^\\circ - 50^\\circ = 130^\\circ$（接点角は $90^\\circ$）！",
            "skill": "円の接線と角",
            "rate": 77,
            "difficulty": 3
          },
          {
            "prompt": "半径 $6\\text{cm}$、弧の長さ $5\\pi\\text{cm}$ のおうぎ形の面積を求めなさい。",
            "choices": [
              "$15\\pi\\text{cm}^2$",
              "$30\\pi\\text{cm}^2$",
              "$12\\pi\\text{cm}^2$",
              "$10\\pi\\text{cm}^2$"
            ],
            "why": "公式 $S = \\dfrac{1}{2}lr = \\dfrac{1}{2} \\times 5\\pi \\times 6 = 15\\pi\\text{cm}^2$ です。",
            "oneLine": "$S = \\dfrac{1}{2}lr = \\dfrac{1}{2}\\times 5\\pi\\times 6 = 15\\pi\\text{cm}^2$！",
            "skill": "おうぎ形の面積",
            "rate": 78,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma3_2": {
    "practice": [
      {
        "id": "ma3_2_exp_p1",
        "title": "三平方の定理・2点間距離・直方体対角線・球と円錐 網羅演習",
        "category": "三平方・空間図形",
        "leadText": "三平方の有名比 $(3:4:5,\\ 5:12:13,\\ 1:1:\\sqrt{2},\\ 1:2:\\sqrt{3})$、座標上の距離、空間対角線、球の計量を網羅します。",
        "explanationSummary": "直方体（縦 $a$・横 $b$・高さ $c$）の対角線は $\\sqrt{a^2+b^2+c^2}$、1辺 $a$ の正三角形の高さは $\\dfrac{\\sqrt{3}}{2}a$・面積は $\\dfrac{\\sqrt{3}}{4}a^2$ です！",
        "surroundingKnowledge": [
          "半径 $r$ の球：体積 $V = \\dfrac{4}{3}\\pi r^3$、表面積 $S = 4\\pi r^2$"
        ],
        "deepDiveTopics": [
          "弦の長さと中心からの距離"
        ],
        "questions": [
          {
            "prompt": "1辺の長さが $6\\text{cm}$ の正三角形の【面積】を求めなさい。",
            "choices": [
              "$9\\sqrt{3}\\text{cm}^2$",
              "$18\\sqrt{3}\\text{cm}^2$",
              "$9\\sqrt{2}\\text{cm}^2$",
              "$12\\sqrt{3}\\text{cm}^2$"
            ],
            "why": "頂点から垂線を下ろすと $1:2:\\sqrt{3}$ より高さは $3\\sqrt{3}\\text{cm}$。面積は $\\dfrac{1}{2}\\times 6\\times 3\\sqrt{3} = 9\\sqrt{3}\\text{cm}^2$ です。",
            "oneLine": "正三角形の高さ $3\\sqrt{3} \\Rightarrow$ 面積 $9\\sqrt{3}\\text{cm}^2$！",
            "skill": "正三角形の面積",
            "rate": 76,
            "difficulty": 3
          },
          {
            "prompt": "半径 $5\\text{cm}$ の円 $\\text{O}$ で、中心 $\\text{O}$ からの距離が $3\\text{cm}$ である弦 $\\text{AB}$ の長さを求めなさい。",
            "choices": [
              "$8\\text{cm}$",
              "$4\\text{cm}$",
              "$6\\text{cm}$",
              "$2\\sqrt{34}\\text{cm}$"
            ],
            "why": "中心から弦に下ろした垂線は弦を二等分します。$3:4:5$ の直角三角形より半分の長さが $4\\text{cm}$、よって弦 $\\text{AB} = 8\\text{cm}$ です！",
            "oneLine": "半分が $4\\text{cm}$ なので2倍して弦 $\\text{AB}=8\\text{cm}$！",
            "skill": "円の弦と三平方",
            "rate": 72,
            "difficulty": 3
          },
          {
            "prompt": "1辺の長さが $6\\text{cm}$ の正四面体 $\\text{OABC}$ の体積を求めなさい。",
            "choices": [
              "$18\\sqrt{2}\\text{cm}^3$",
              "$36\\sqrt{2}\\text{cm}^3$",
              "$9\\sqrt{3}\\text{cm}^3$",
              "$18\\sqrt{3}\\text{cm}^3$"
            ],
            "why": "底面 $\\triangle\\text{ABC}$ は1辺 $6\\text{cm}$ の正三角形なので高さ $3\\sqrt{3}\\text{cm}$、底面積 $S = \\dfrac{1}{2} \\times 6 \\times 3\\sqrt{3} = 9\\sqrt{3}\\text{cm}^2$。頂点 $\\text{O}$ から下ろした垂線の足 $\\text{H}$ は重心（中線を $2:1$ に内分）なので $\\text{AH} = 3\\sqrt{3} \\times \\dfrac{2}{3} = 2\\sqrt{3}\\text{cm}$。三平方より高さ $\\text{OH} = \\sqrt{6^2 - (2\\sqrt{3})^2} = \\sqrt{36 - 12} = \\sqrt{24} = 2\\sqrt{6}\\text{cm}$。よって体積 $V = \\dfrac{1}{3} \\times 9\\sqrt{3} \\times 2\\sqrt{6} = 6\\sqrt{18} = 18\\sqrt{2}\\text{cm}^3$ です！",
            "oneLine": "1辺 $a$ の正四面体：底面積 $\\dfrac{\\sqrt{3}}{4}a^2$、高さ $\\dfrac{\\sqrt{6}}{3}a$、体積 $\\dfrac{\\sqrt{2}}{12}a^3$（$a=6 \\Rightarrow 18\\sqrt{2}$）！",
            "skill": "正四面体の高さと体積",
            "rate": 58,
            "difficulty": 4,
            "wrongReasons": [
              "錐体の $\\times \\dfrac{1}{3}$ をかけ忘れたミス。",
              "底面積 $9\\sqrt{3}$ をそのまま答えにしたミス。",
              "$\\sqrt{3} \\times \\sqrt{6} = 3\\sqrt{2}$ のルート計算を誤ったミス。"
            ]
          },
          {
            "prompt": "座標平面上の2点 $\\text{A}(-2, 1),\\ \\text{B}(4, 9)$ 間の距離を求めなさい。",
            "choices": [
              "$10$",
              "$14$",
              "$2\\sqrt{13}$",
              "$8$"
            ],
            "why": "横の差 $6$、縦の差 $8$ なので $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$ です。",
            "oneLine": "$6:8:10$（$3:4:5$ の2倍）より距離は $10$！",
            "skill": "座標の2点間距離",
            "rate": 83,
            "difficulty": 3
          },
          {
            "prompt": "半径 $3\\text{cm}$ の球の【体積】と【表面積】の組み合わせとして正しいものを選びなさい。",
            "choices": [
              "体積：$36\\pi\\text{cm}^3$　／　表面積：$36\\pi\\text{cm}^2$",
              "体積：$108\\pi\\text{cm}^3$　／　表面積：$36\\pi\\text{cm}^2$",
              "体積：$36\\pi\\text{cm}^3$　／　表面積：$12\\pi\\text{cm}^2$",
              "体積：$27\\pi\\text{cm}^3$　／　表面積：$36\\pi\\text{cm}^2$"
            ],
            "why": "$V = \\dfrac{4}{3}\\pi\\times 3^3 = 36\\pi\\text{cm}^3$、$S = 4\\pi\\times 3^2 = 36\\pi\\text{cm}^2$ です。",
            "oneLine": "$r=3$ のとき $\\frac{4}{3}\\pi r^3$ も $4\\pi r^2$ も数値は $36\\pi$！",
            "skill": "球の体積と表面積",
            "rate": 77,
            "difficulty": 3
          },
          {
            "prompt": "底面の半径が $3\\text{cm}$、母線の長さが $5\\text{cm}$ の円錐の【体積】を求めなさい。",
            "choices": [
              "$12\\pi\\text{cm}^3$",
              "$15\\pi\\text{cm}^3$",
              "$36\\pi\\text{cm}^3$",
              "$24\\pi\\text{cm}^3$"
            ],
            "why": "三平方の定理（$3:4:5$）より円錐の高さは $4\\text{cm}$。よって体積は $\\dfrac{1}{3} \\times (\\pi \\times 3^2) \\times 4 = 12\\pi\\text{cm}^3$ です（母線5を高さに使わない！）。",
            "oneLine": "母線5・半径3 $\\Rightarrow$ 高さ $4\\text{cm} \\Rightarrow \\frac{1}{3}\\times 9\\pi\\times 4 = 12\\pi\\text{cm}^3$！",
            "skill": "円錐の高さと体積",
            "rate": 69,
            "difficulty": 3
          },
          {
            "prompt": "相似比が $2 : 3$ である相似な2つの立体P、Qについて、Pの体積が $16\\text{ cm}^3$ のときQの体積は何 $\\text{cm}^3$ か。半角数字で答えなさい。",
            "shortAnswer": "54",
            "acceptedAnswers": [
              "54"
            ],
            "why": "体積比は $2^3 : 3^3 = 8 : 27$ なので $16 \\times \\dfrac{27}{8} = 54\\text{ cm}^3$ です。",
            "oneLine": "相似比 $2:3 \\Rightarrow$ 体積比 $8:27 \\Rightarrow 54\\text{ cm}^3$！",
            "skill": "相似な立体の体積比",
            "rate": 77,
            "difficulty": 3
          },
          {
            "prompt": "円周上の4点 A, B, C, D がこの順に並んでできる円に内接する四角形 ABCD において、$\\angle\\text{BAD} = 72^\\circ$ のとき、向かい合う角 $\\angle\\text{BCD}$ の大きさは何度か。半角数字で答えなさい。",
            "shortAnswer": "108",
            "acceptedAnswers": [
              "108",
              "108°"
            ],
            "why": "円に内接する四角形の対角の和は常に $180^\\circ$（中心角の和が $360^\\circ$ の半分になるため）なので、$180^\\circ - 72^\\circ = 108^\\circ$ です。",
            "oneLine": "円に内接する四角形の向かい合う角の和 ＝ $180^\\circ$！ $180 - 72 = 108^\\circ$！",
            "skill": "円周角と内接四角形",
            "rate": 84,
            "difficulty": 2
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma3_2_exp_m1",
        "title": "三平方・空間 スピード実戦チェック②",
        "category": "三平方・空間",
        "leadText": "側面積裏ワザ・特別角・回転体の3問です。",
        "explanationSummary": "円錐の側面積は $\\pi r R$、表面積は $\\pi r R + \\pi r^2$ です。",
        "surroundingKnowledge": [
          "直角三角形を1辺を軸に1回転＝円錐"
        ],
        "deepDiveTopics": [
          "回転体の体積"
        ],
        "questions": [
          {
            "prompt": "底面の半径 $4\\text{cm}$、母線の長さ $9\\text{cm}$ の円錐の【表面積】を求めなさい。",
            "choices": [
              "$52\\pi\\text{cm}^2$",
              "$36\\pi\\text{cm}^2$",
              "$48\\pi\\text{cm}^2$",
              "$68\\pi\\text{cm}^2$"
            ],
            "why": "側面積 $\\pi\\times 4\\times 9 = 36\\pi$ ＋ 底面積 $\\pi\\times 4^2 = 16\\pi$ ＝ $52\\pi\\text{cm}^2$ です。",
            "oneLine": "側面積 $36\\pi$ ＋ 底面積 $16\\pi ＝ 52\\pi\\text{cm}^2$！",
            "skill": "円錐の表面積",
            "rate": 74,
            "difficulty": 3
          },
          {
            "prompt": "$\\angle\\text{A}=90^\\circ,\\ \\angle\\text{B}=60^\\circ,\\ \\text{BC}=10\\text{cm}$ の直角三角形 $\\text{ABC}$ で、辺 $\\text{AC}$ の長さを求めなさい。",
            "choices": [
              "$5\\sqrt{3}\\text{cm}$",
              "$5\\text{cm}$",
              "$5\\sqrt{2}\\text{cm}$",
              "$\\dfrac{10\\sqrt{3}}{3}\\text{cm}$"
            ],
            "why": "$\\text{AB}:\\text{BC}:\\text{AC} = 1:2:\\sqrt{3}$ で斜辺 $\\text{BC}=10$ なので $\\text{AB}=5,\\ \\text{AC}=5\\sqrt{3}\\text{cm}$ です。",
            "oneLine": "$1:2:\\sqrt{3}$ より斜辺10の半分 $\\times\\sqrt{3} = 5\\sqrt{3}\\text{cm}$！",
            "skill": "特別角の直角三角形",
            "rate": 80,
            "difficulty": 3
          },
          {
            "prompt": "縦 $4\\text{cm}$、横 $3\\text{cm}$ の長方形を、縦の辺を軸として1回転させてできる円柱の体積を求めなさい。",
            "choices": [
              "$36\\pi\\text{cm}^3$",
              "$48\\pi\\text{cm}^3$",
              "$12\\pi\\text{cm}^3$",
              "$24\\pi\\text{cm}^3$"
            ],
            "why": "底面半径 $3\\text{cm}$、高さ $4\\text{cm}$ の円柱になるので $\\pi\\times 3^2\\times 4 = 36\\pi\\text{cm}^3$ です。",
            "oneLine": "半径3・高さ4の円柱 $\\Rightarrow 9\\pi\\times 4 = 36\\pi\\text{cm}^3$！",
            "skill": "回転体の体積",
            "rate": 84,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma3_3": {
    "practice": [
      {
        "id": "ma3_3_exp_p1",
        "title": "空間相似・体積比・立体表面の最短距離・切り口 網羅演習",
        "category": "空間図形応用",
        "leadText": "相似な立体の表面積比 $m^2:n^2$・体積比 $m^3:n^3$、円錐台の体積、直方体表面の糸の最短距離を徹底演習します。",
        "explanationSummary": "相似比が $m:n$ の立体では、表面積の比は $m^2:n^2$、体積の比は $m^3:n^3$！水面の高さが半分なら水の体積は全体の $\\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}$ です！",
        "surroundingKnowledge": [
          "表面を通る最短距離 ＝ 通る2つの面を展開図にして直線で結ぶ！"
        ],
        "deepDiveTopics": [
          "円錐容器の水位と体積比"
        ],
        "questions": [
          {
            "prompt": "相似な2つの円錐P, Qがあり、相似比が $2 : 3$ である。Pの体積が $16\\pi\\text{cm}^3$ のとき、Qの体積を求めなさい。",
            "choices": [
              "$54\\pi\\text{cm}^3$",
              "$36\\pi\\text{cm}^3$",
              "$24\\pi\\text{cm}^3$",
              "$72\\pi\\text{cm}^3$"
            ],
            "why": "体積比は $2^3 : 3^3 = 8 : 27$ なので、$16\\pi \\times \\dfrac{27}{8} = 54\\pi\\text{cm}^3$ です。",
            "oneLine": "相似比 $2:3 \\Rightarrow$ 体積比 $8:27 \\Rightarrow 54\\pi\\text{cm}^3$！",
            "skill": "相似な立体の体積比",
            "rate": 75,
            "difficulty": 3
          },
          {
            "prompt": "逆さまにした円錐形の容器に深さのちょうど半分まで水を入れたところ、水の体積が $15\\text{mL}$ であった。この容器を満水にするには【あと何 $\\text{mL}$】の水を入れればよいか。",
            "choices": [
              "$105\\text{mL}$",
              "$120\\text{mL}$",
              "$45\\text{mL}$",
              "$60\\text{mL}$"
            ],
            "why": "深さの比が $1:2$ なので体積比は $1^3 : 2^3 = 1 : 8$。満水は $15 \\times 8 = 120\\text{mL}$ であり、「あと何mLか」なので $120 - 15 = 105\\text{mL}$ です！",
            "oneLine": "満水 $120\\text{mL}$ から既に入っている $15\\text{mL}$ を引いて【あと105mL】！",
            "skill": "円錐容器の水量（差の罠）",
            "rate": 55,
            "difficulty": 4
          },
          {
            "prompt": "1辺 $6\\text{cm}$ の立方体 $\\text{ABCD-EFGH}$ で、3つの頂点 $\\text{A, C, F}$ を通る平面で切り取ったときにできる三角錐 $\\text{B-ACF}$ の体積を求めなさい。",
            "choices": [
              "$36\\text{cm}^3$",
              "$72\\text{cm}^3$",
              "$18\\text{cm}^3$",
              "$54\\text{cm}^3$"
            ],
            "why": "底面を直角二等辺三角形 $\\triangle\\text{ABC}$（$\\frac{1}{2}\\times 6\\times 6=18\\text{cm}^2$）、高さを $\\text{BF}=6\\text{cm}$ と見れば、$\\dfrac{1}{3}\\times 18\\times 6 = 36\\text{cm}^3$ です。",
            "oneLine": "直角が集まる頂点Bから見て $\\frac{1}{3}\\times 18\\times 6 = 36\\text{cm}^3$！",
            "skill": "立方体の角切り体積",
            "rate": 73,
            "difficulty": 3
          },
          {
            "prompt": "上の1辺 $6\\text{cm}$ の立方体で、切り口である $\\triangle\\text{ACF}$ の面積を求めなさい。",
            "choices": [
              "$18\\sqrt{3}\\text{cm}^2$",
              "$18\\sqrt{2}\\text{cm}^2$",
              "$36\\sqrt{3}\\text{cm}^2$",
              "$9\\sqrt{3}\\text{cm}^2$"
            ],
            "why": "$\\text{AC}=\\text{CF}=\\text{FA}=6\\sqrt{2}\\text{cm}$ の正三角形なので、面積は $\\dfrac{\\sqrt{3}}{4}\\times(6\\sqrt{2})^2 = \\dfrac{\\sqrt{3}}{4}\\times 72 = 18\\sqrt{3}\\text{cm}^2$ です。",
            "oneLine": "1辺 $6\\sqrt{2}$ の正三角形 $\\Rightarrow \\frac{\\sqrt{3}}{4}\\times 72 = 18\\sqrt{3}\\text{cm}^2$！",
            "skill": "切り口正三角形の面積",
            "rate": 58,
            "difficulty": 4
          },
          {
            "prompt": "縦 $3\\text{cm}$・横 $5\\text{cm}$・高さ $4\\text{cm}$ の直方体 $\\text{ABCD-EFGH}$（$\\text{AB}=3,\\ \\text{BC}=5,\\ \\text{AE}=4$）で、頂点 $\\text{A}$ から辺 $\\text{BC}$ を通って頂点 $\\text{G}$ まで表面にピンと糸を張ったときの最短の長さを求めなさい。",
            "choices": [
              "$\\sqrt{74}\\text{cm}$",
              "$\\sqrt{50}\\text{cm}$",
              "$\\sqrt{80}\\text{cm}$",
              "$9\\text{cm}$"
            ],
            "why": "上面ABCDと側面BCGFを平らに展開すると、横 $5\\text{cm}$、縦 $3+4=7\\text{cm}$ の長方形の対角線になるので $\\sqrt{5^2 + 7^2} = \\sqrt{25 + 49} = \\sqrt{74}\\text{cm}$ です。",
            "oneLine": "展開図で横5・縦(3+4)=7の直角三角形 $\\Rightarrow \\sqrt{5^2+7^2}=\\sqrt{74}\\text{cm}$！",
            "skill": "立体表面の最短距離",
            "rate": 63,
            "difficulty": 4
          },
          {
            "prompt": "座標平面上の2点 $\\text{A}(-1,\\ 2)$、$\\text{B}(5,\\ 10)$ 間の距離 $\\text{AB}$ を求めなさい。",
            "shortAnswer": "10",
            "acceptedAnswers": [
              "10"
            ],
            "why": "$\\sqrt{(5 - (-1))^2 + (10 - 2)^2} = \\sqrt{6^2 + 8^2} = 10$ です。",
            "oneLine": "$\\sqrt{6^2 + 8^2} = 10$！",
            "skill": "三平方の定理（2点間の距離）",
            "rate": 82,
            "difficulty": 2
          },
          {
            "prompt": "縦 $3\\text{ cm}$、横 $4\\text{ cm}$、高さ $12\\text{ cm}$ の直方体の1つの頂点から最も遠い頂点までの【空間対角線】の長さは何 $\\text{cm}$ か。半角数字で答えなさい。",
            "shortAnswer": "13",
            "acceptedAnswers": [
              "13",
              "13cm"
            ],
            "why": "直方体の対角線の公式 $\\sqrt{a^2 + b^2 + c^2} = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13\\text{ cm}$ です（底面の対角線5cmと高さ12cmの $5:12:13$ の直角三角形！）。",
            "oneLine": "直方体の対角線 ＝ $\\sqrt{a^2 + b^2 + c^2} = \\sqrt{3^2 + 4^2 + 12^2} = \\sqrt{169} = 13\\text{ cm}$！",
            "skill": "空間図形の三平方の定理",
            "rate": 80,
            "difficulty": 3
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma3_3_exp_m1",
        "title": "空間応用 スピード実戦チェック②",
        "category": "空間図形応用",
        "leadText": "表面積比・正四角錐の高さ・ねじれの3問です。",
        "explanationSummary": "相似比 $m:n$ なら表面積比は $m^2:n^2$ です。",
        "surroundingKnowledge": [
          "立方体の1辺とねじれの位置にある辺は4本！"
        ],
        "deepDiveTopics": [
          "ねじれの位置の本数"
        ],
        "questions": [
          {
            "prompt": "相似比が $3 : 5$ である2つの球の表面積の比を求めなさい。",
            "choices": [
              "$9 : 25$",
              "$3 : 5$",
              "$27 : 125$",
              "$6 : 10$"
            ],
            "why": "表面積の比は相似比の2乗なので $3^2 : 5^2 = 9 : 25$ です。",
            "oneLine": "表面積比 ＝ 相似比の2乗 $= 9:25$！",
            "skill": "相似な立体の表面積比",
            "rate": 83,
            "difficulty": 3
          },
          {
            "prompt": "立方体 $\\text{ABCD-EFGH}$ において、辺 $\\text{AB}$ と【ねじれの位置】にある辺は全部で何本あるか。",
            "choices": [
              "4本",
              "3本",
              "5本",
              "6本"
            ],
            "why": "平行な3本（CD, EF, GH）と交わる4本（AD, BC, AE, BF）を除いた、CG, DH, EH, FG の4本です。",
            "oneLine": "全12本 − 自身1 − 平行3 − 交わる4 ＝ 4本！",
            "skill": "ねじれの位置",
            "rate": 76,
            "difficulty": 3
          },
          {
            "prompt": "底面が1辺 $4\\text{cm}$ の正方形で、他の辺（側稜）がすべて $6\\text{cm}$ である正四角錐の高さは何 $\\text{cm}$ か。",
            "choices": [
              "$2\\sqrt{7}\\text{cm}$",
              "$4\\sqrt{2}\\text{cm}$",
              "$2\\sqrt{5}\\text{cm}$",
              "$2\\sqrt{11}\\text{cm}$"
            ],
            "why": "底面の対角線は $4\\sqrt{2}\\text{cm}$、中心までの長さは半分の $2\\sqrt{2}\\text{cm}$。高さは $\\sqrt{6^2 - (2\\sqrt{2})^2} = \\sqrt{36 - 8} = \\sqrt{28} = 2\\sqrt{7}\\text{cm}$ です。",
            "oneLine": "$\\sqrt{6^2 - (2\\sqrt{2})^2} = \\sqrt{28} = 2\\sqrt{7}\\text{cm}$！",
            "skill": "正四角錐の高さ",
            "rate": 66,
            "difficulty": 4
          }
        ]
      }
    ]
  },
  "ma3_4": {
    "practice": [
      {
        "id": "ma3_4_exp_p1",
        "title": "合同・相似証明の条件選択＆コンパス作図の原理 網羅演習",
        "category": "証明・作図",
        "leadText": "直角三角形の合同条件、平行四辺形になるための5条件、長方形の折り返し相似、外心・内心作図を網羅します。",
        "explanationSummary": "①2点から等距離＝垂直二等分線、②2直線（辺）から等距離＝角の二等分線、③直角三角形は「斜辺と1つの鋭角」または「斜辺と他の1辺」が等しければ合同！",
        "surroundingKnowledge": [
          "平行四辺形になる5条件のうち「1組の対辺が平行で、かつその長さが等しい」が証明で最頻出！"
        ],
        "deepDiveTopics": [
          "折り返し図形の相似と三平方"
        ],
        "questions": [
          {
            "prompt": "2つの直角三角形が合同であることを示すための条件として【誤っている（合同とは限らない）】ものを1つ選びなさい。",
            "choices": [
              "斜辺以外の1辺と1つの鋭角がそれぞれ等しい（対応しない角の場合を含む表現ではなく：2つの鋭角がそれぞれ等しい）",
              "斜辺と1つの鋭角がそれぞれ等しい",
              "斜辺と他の1辺がそれぞれ等しい",
              "直角をはさむ2辺がそれぞれ等しい"
            ],
            "why": "「2つの鋭角がそれぞれ等しい（3つの角が等しい）」だけでは拡大・縮小した相似な直角三角形が含まれるため、合同条件にはなりません（必ず1組以上の辺の長さが必要です）。",
            "oneLine": "角だけ等しくても相似どまり！合同には必ず辺の条件が必要！",
            "skill": "直角三角形の合同条件",
            "rate": 82,
            "difficulty": 3
          },
          {
            "prompt": "四角形 $\\text{ABCD}$ が平行四辺形であるための条件として【正しくない（等脚台形などの反例がある）】ものはどれか。",
            "choices": [
              "1組の対辺が平行で、もう1組の対辺の長さが等しい",
              "2組の対辺がそれぞれ平行である",
              "1組の対辺が平行で、その長さが等しい",
              "対角線がそれぞれの中点で交わる"
            ],
            "why": "「1組の対辺が平行で、もう1組の対辺が等しい」四角形には平行四辺形でない【等脚台形】が存在するため誤りです（正しくは「平行であるその同じ1組の長さが等しい」）。",
            "oneLine": "等脚台形の反例がある引っかけ選択肢に要注意！",
            "skill": "平行四辺形になる条件",
            "rate": 65,
            "difficulty": 4
          },
          {
            "prompt": "$\\triangle\\text{ABC}$ の3つの頂点 $\\text{A, B, C}$ すべてを通る円（外接円）の中心 $\\text{O}$ を作図したい。どの作図を2回組み合わせれば中心 $\\text{O}$ が求まるか。",
            "choices": [
              "辺 $\\text{AB}$ の垂直二等分線と、辺 $\\text{BC}$ の垂直二等分線の交点",
              "$\\angle\\text{A}$ の二等分線と、$\\angle\\text{B}$ の二等分線の交点",
              "頂点 $\\text{A}$ から辺 $\\text{BC}$ への垂線と、頂点 $\\text{B}$ から辺 $\\text{AC}$ への垂線の交点",
              "頂点 $\\text{A}$ と辺 $\\text{BC}$ の中点を結ぶ線と、頂点 $\\text{B}$ と辺 $\\text{AC}$ の中点を結ぶ線の交点"
            ],
            "why": "3頂点からの【点からの距離】が等しい点（OA＝OB＝OC）を求めるので、辺の垂直二等分線の交点（外心）を作図します（角の二等分線の交点は3辺に接する内接円の中心）。",
            "oneLine": "3頂点から等距離＝辺の垂直二等分線の交点！3辺から等距離＝角の二等分線の交点！",
            "skill": "作図の原理（外心と内心）",
            "rate": 74,
            "difficulty": 3
          },
          {
            "prompt": "$\\angle\\text{C} = 90^\\circ$ の直角三角形 $\\text{ABC}$ で頂点 $\\text{C}$ から斜辺 $\\text{AB}$ に垂線 $\\text{CD}$ を下ろしたとき、$\\triangle\\text{ABC}$ と相似になる三角形と相似条件の組み合わせとして正しいものはどれか。",
            "choices": [
              "$\\triangle\\text{ACD}$（2組の角がそれぞれ等しい）",
              "$\\triangle\\text{ADC}$（2組の辺の比とその間の角がそれぞれ等しい）",
              "$\\triangle\\text{BCD}$（3組の辺の比がすべて等しい）",
              "$\\triangle\\text{BDC}$（斜辺と1つの鋭角がそれぞれ等しい）"
            ],
            "why": "$\\angle\\text{ACB} = \\angle\\text{ADC} = 90^\\circ$、$\\angle\\text{A}$ は共通より、2組の角がそれぞれ等しいので $\\triangle\\text{ABC} \\sim \\triangle\\text{ACD}$（対応順もA→C→BとA→D→Cで完全一致）です！",
            "oneLine": "対応する頂点の順番（A-B-C と A-C-D）まで厳密に揃える！",
            "skill": "直角三角形の垂線相似",
            "rate": 68,
            "difficulty": 3
          },
          {
            "prompt": "コンパスと定規だけを使って作図できる角度として適切なものを1つ選びなさい。",
            "choices": [
              "$75^\\circ$",
              "$20^\\circ$",
              "$40^\\circ$",
              "$50^\\circ$"
            ],
            "why": "正三角形の $60^\\circ$ と直角 $90^\\circ$ の二等分による $45^\\circ$ や $30^\\circ \\to 15^\\circ$ を組み合わせられるため、$60^\\circ + 15^\\circ = 75^\\circ$（または $90^\\circ - 15^\\circ$）が作図可能です。",
            "oneLine": "$60^\\circ$ と $90^\\circ$ の半分半分で作れる角度（$15^\\circ, 30^\\circ, 45^\\circ, 75^\\circ, 105^\\circ, 135^\\circ$）！",
            "skill": "特別角の作図",
            "rate": 67,
            "difficulty": 3
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma3_4_exp_m1",
        "title": "証明・作図 スピード実戦チェック②",
        "category": "証明・作図",
        "leadText": "相似条件・二等辺三角形の性質・接線作図の3問です。",
        "explanationSummary": "三角形の相似条件3つは一字一句正確に言えるようにします。",
        "surroundingKnowledge": [
          "二等辺三角形の頂角の二等分線は底辺を垂直に二等分する"
        ],
        "deepDiveTopics": [
          "相似条件の暗唱"
        ],
        "questions": [
          {
            "prompt": "$\\triangle\\text{ABC}$ と $\\triangle\\text{DEF}$ で $\\text{AB}=6,\\ \\text{BC}=9,\\ \\angle\\text{B}=50^\\circ$、$\\text{DE}=4,\\ \\text{EF}=6,\\ \\angle\\text{E}=50^\\circ$ のとき、成り立つ相似条件はどれか。",
            "choices": [
              "2組の辺の比とその間の角がそれぞれ等しい",
              "2組の角がそれぞれ等しい",
              "3組の辺の比がすべて等しい",
              "2辺とその間の角がそれぞれ等しい"
            ],
            "why": "$\\text{AB}:\\text{DE}=6:4=3:2$、$\\text{BC}:\\text{EF}=9:6=3:2$、その間の角 $\\angle\\text{B}=\\angle\\text{E}=50^\\circ$ より成り立ちます（「比」を抜かすと合同条件になってしまうので注意！）。",
            "oneLine": "相似条件は「2組の辺の【比】とその間の角がそれぞれ等しい」！",
            "skill": "三角形の相似条件",
            "rate": 81,
            "difficulty": 3
          },
          {
            "prompt": "頂角が $36^\\circ$ である二等辺三角形の1つの底角の大きさは何度か。",
            "choices": [
              "$72^\\circ$",
              "$54^\\circ$",
              "$68^\\circ$",
              "$144^\\circ$"
            ],
            "why": "$(180^\\circ - 36^\\circ) \\div 2 = 72^\\circ$ です。",
            "oneLine": "$(180-36)\\div 2 = 72^\\circ$！",
            "skill": "二等辺三角形の底角",
            "rate": 90,
            "difficulty": 3
          },
          {
            "prompt": "円周上の1点 $\\text{P}$ を通る円の【接線】を作図するとき、中心 $\\text{O}$ と $\\text{P}$ を結ぶ半直線 $\\text{OP}$ を引いたあとに行う操作はどれか。",
            "choices": [
              "点 $\\text{P}$ を通り直線 $\\text{OP}$ に垂直な直線（垂線）を作図する",
              "線分 $\\text{OP}$ の垂直二等分線を作図する",
              "中心 $\\text{O}$ を通る角の二等分線を作図する",
              "半径 $\\text{OP}$ を1辺とする正三角形を作図する"
            ],
            "why": "接線は接点を通る半径 $\\text{OP}$ と垂直に交わるため、直線 $\\text{OP}$ 上の点 $\\text{P}$ を通る垂線を作図します。",
            "oneLine": "円周上の点Pを通る接線 ＝ 直線OPに対する点Pでの垂線！",
            "skill": "接線の作図",
            "rate": 79,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma4_1": {
    "practice": [
      {
        "id": "ma4_1_exp_p1",
        "title": "確率（余事象・0を含む2桁整数・じゃんけん・さいころ素数）＆箱ひげ図 網羅演習",
        "category": "確率・箱ひげ図",
        "leadText": "「少なくとも1つ〜」「0を含むカード順列」「さいころの和が素数」「箱ひげ図とデータの読み取り」を完全攻略します。",
        "explanationSummary": "①少なくとも1つ表＝$1 - (\\text{すべて裏})$、②0を含む2けたの整数は十の位に0が置けないので $3\\times 3=9$ 通り、③箱ひげ図の四分位範囲は $Q_3 - Q_1$ です。",
        "surroundingKnowledge": [
          "素数は $2, 3, 5, 7, 11, 13\\dots$（$1$ は素数ではない！）"
        ],
        "deepDiveTopics": [
          "箱ひげ図から確実に言えることの判別"
        ],
        "questions": [
          {
            "prompt": "3枚の硬貨 A, B, C を同時に投げるとき、【少なくとも1枚は表】が出る確率を求めなさい。",
            "choices": [
              "$\\dfrac{7}{8}$",
              "$\\dfrac{3}{4}$",
              "$\\dfrac{1}{2}$",
              "$\\dfrac{5}{8}$"
            ],
            "why": "全8通りのうち3枚とも裏は1通りなので $1 - \\dfrac{1}{8} = \\dfrac{7}{8}$ です。",
            "oneLine": "余事象 $1 - \\frac{1}{8} = \\frac{7}{8}$！",
            "skill": "確率（余事象）",
            "rate": 78,
            "difficulty": 3
          },
          {
            "prompt": "$0, 1, 2, 3$ の4枚のカードから2枚を取り出して並べ、2けたの整数を作るとき、それが【偶数】になる確率を求めなさい。",
            "choices": [
              "$\\dfrac{5}{9}$",
              "$\\dfrac{1}{2}$",
              "$\\dfrac{4}{9}$",
              "$\\dfrac{7}{12}$"
            ],
            "why": "十の位に0は置けないため全9通り（10,12,13, 20,21,23, 30,31,32）。偶数は（10,12,20,30,32）の5通りなので $\\dfrac{5}{9}$ です。",
            "oneLine": "十の位に0不可で全9通り、偶数は5通り $\\Rightarrow \\frac{5}{9}$！",
            "skill": "0を含むカードの確率",
            "rate": 54,
            "difficulty": 4
          },
          {
            "prompt": "大小2つのさいころを同時に投げるとき、出る目の和が【素数】になる確率を求めなさい。",
            "choices": [
              "$\\dfrac{5}{12}$",
              "$\\dfrac{11}{36}$",
              "$\\dfrac{7}{18}$",
              "$\\dfrac{4}{9}$"
            ],
            "why": "目の和（$2〜12$）のうち素数は $2, 3, 5, 7, 11$。それぞれ $1, 2, 4, 6, 2$ 通りあるので合計 $15$ 通り、$\\dfrac{15}{36} = \\dfrac{5}{12}$ です。",
            "oneLine": "和が2(1), 3(2), 5(4), 7(6), 11(2)の計15通り $\\Rightarrow \\frac{15}{36}=\\frac{5}{12}$！",
            "skill": "さいころと素数",
            "rate": 65,
            "difficulty": 4
          },
          {
            "prompt": "A, B, C の3人が1回じゃんけんをするとき、【Aだけが勝つ】確率を求めなさい。",
            "choices": [
              "$\\dfrac{1}{9}$",
              "$\\dfrac{1}{3}$",
              "$\\dfrac{1}{27}$",
              "$\\dfrac{2}{9}$"
            ],
            "why": "手の出し方は $3^3 = 27$ 通り。Aがグー・チョキ・パーのどれで勝つかの3通りなので $\\dfrac{3}{27} = \\dfrac{1}{9}$ です。",
            "oneLine": "全27通りのうちAの勝ち手3通り $\\Rightarrow \\frac{3}{27}=\\frac{1}{9}$！",
            "skill": "3人のじゃんけん確率",
            "rate": 63,
            "difficulty": 4
          },
          {
            "prompt": "$9$ 人の生徒の小テスト得点が低い順に $3, 4, 5, 6, 7, 8, 8, 9, 10$（点）であった。このデータの【四分位範囲】を求めなさい。",
            "choices": [
              "$4$点",
              "$3.5$点",
              "$5$点",
              "$7$点"
            ],
            "why": "中央値（5番目）は $7$ 点。下位4個 $(3,4,5,6)$ の第1四分位数 $Q_1 = 4.5$ 点、上位4個 $(8,8,9,10)$ の第3四分位数 $Q_3 = 8.5$ 点。四分位範囲は $8.5 - 4.5 = 4$ 点です。",
            "oneLine": "$Q_3(8.5) - Q_1(4.5) = 4$ 点！",
            "skill": "四分位範囲の計算",
            "rate": 68,
            "difficulty": 3
          },
          {
            "prompt": "生徒40人のハンドボール投げの記録の箱ひげ図で、最小値 $12\\text{m}$、第1四分位数 $18\\text{m}$、中央値 $23\\text{m}$、第3四分位数 $29\\text{m}$、最大値 $36\\text{m}$ であった。【必ず正しい】といえるものを選びなさい。",
            "choices": [
              "$18\\text{m}$ 以上の記録を出した生徒は $30$ 人以上いる",
              "平均値はちょうど $23\\text{m}$ である",
              "$23\\text{m}$ の記録を出した生徒が少なくとも1人はいる",
              "四分位範囲は $24\\text{m}$ である"
            ],
            "why": "40人を10人ずつ4区間に分けた第1四分位数が $18\\text{m}$ なので、上位3区間（30人）はすべて $18\\text{m}$ 以上であり「30人以上いる」は確実に正しいです（偶数40人の中央値は20番目と21番目の平均なので23mちょうどの人がいるとは限りません）。",
            "oneLine": "40人の $Q_1$ 以上には少なくとも $40\\times\\frac{3}{4}=30$ 人含まれる！",
            "skill": "箱ひげ図の正誤判定",
            "rate": 58,
            "difficulty": 4
          },
          {
            "prompt": "35人のハンドボール投げの箱ひげ図において、【第1四分位数から第3四分位数までの箱の部分】には全体の約何割のデータが含まれているか。",
            "choices": [
              "約5割（約半分）",
              "約2.5割（約4分の1）",
              "約7.5割（約4分の3）",
              "10割すべて"
            ],
            "why": "箱（四分位範囲）には中央の2区間分＝全体の約50%（約半分）のデータが入ります。",
            "oneLine": "箱ひげ図の『箱（四分位範囲）』には全体の【約50%（半分）】のデータが含まれる！",
            "skill": "箱ひげ図と四分位範囲",
            "rate": 83,
            "difficulty": 2,
            "wrongReasons": [
              "約1/4。",
              "約3/4。",
              "全体。"
            ]
          },
          {
            "prompt": "赤玉3個と白玉2個の合計5個の玉が入った袋から、【同時に2個】の玉を取り出すとき、2個とも赤玉である確率を既約分数 `a/b` の形で答えなさい。",
            "shortAnswer": "3/10",
            "acceptedAnswers": [
              "3/10",
              "３／１０"
            ],
            "why": "5個から同時に2個取り出す組合せは $(5 \\times 4) \\div 2 = 10$ 通り。赤玉3個から2個取り出す組合せは $(3 \\times 2) \\div 2 = 3$ 通り。よって確率は $\\dfrac{3}{10}$ です。",
            "oneLine": "5個から同時に2個＝10通り、赤3個から2個＝3通り → 確率は【3/10】！",
            "skill": "確率（同時に2個取り出す）",
            "rate": 83,
            "difficulty": 2
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma4_1_exp_m1",
        "title": "確率・箱ひげ図 スピード実戦チェック②",
        "category": "確率・箱ひげ図",
        "leadText": "データの範囲・積が偶数・当たりくじの3問です。",
        "explanationSummary": "積が偶数 ＝ 1 −（両方とも奇数の確率）で一発計算できます。",
        "surroundingKnowledge": [
          "範囲（レンジ）＝ 最大値 − 最小値"
        ],
        "deepDiveTopics": [
          "積の偶奇の確率"
        ],
        "questions": [
          {
            "prompt": "大小2つのさいころを同時に投げるとき、出る目の【積が偶数】になる確率を求めなさい。",
            "choices": [
              "$\\dfrac{3}{4}$",
              "$\\dfrac{1}{2}$",
              "$\\dfrac{2}{3}$",
              "$\\dfrac{5}{6}$"
            ],
            "why": "両方とも奇数になる確率は $\\dfrac{3}{6}\\times\\dfrac{3}{6} = \\dfrac{1}{4}$ なので、積が偶数は $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$ です。",
            "oneLine": "1 −（奇数×奇数 $\\frac{1}{4}$）＝ $\\frac{3}{4}$！",
            "skill": "積が偶数の確率",
            "rate": 74,
            "difficulty": 3
          },
          {
            "prompt": "当たり2本、はずれ3本の計5本のくじから同時に2本引くとき、少なくとも1本が当たる確率を求めなさい。",
            "choices": [
              "$\\dfrac{7}{10}$",
              "$\\dfrac{3}{5}$",
              "$\\dfrac{2}{5}$",
              "$\\dfrac{4}{5}$"
            ],
            "why": "全10通りのうち2本ともはずれは $\\dfrac{3\\times 2}{2} = 3$ 通りなので、$1 - \\dfrac{3}{10} = \\dfrac{7}{10}$ です。",
            "oneLine": "全10通り − はずれ2本(3通り) ＝ $\\frac{7}{10}$！",
            "skill": "くじ引きと余事象",
            "rate": 76,
            "difficulty": 3
          },
          {
            "prompt": "あるデータの最小値が $14$、第1四分位数が $21$、第3四分位数が $33$、最大値が $42$ のとき、【データの範囲】と【四分位範囲】の組み合わせとして正しいものはどれか。",
            "choices": [
              "範囲：$28$　／　四分位範囲：$12$",
              "範囲：$12$　／　四分位範囲：$28$",
              "範囲：$28$　／　四分位範囲：$6$",
              "範囲：$42$　／　四分位範囲：$12$"
            ],
            "why": "範囲 $= 42 - 14 = 28$、四分位範囲 $= 33 - 21 = 12$ です。",
            "oneLine": "範囲 $=42-14=28$、四分位範囲 $=33-21=12$！",
            "skill": "範囲と四分位範囲",
            "rate": 86,
            "difficulty": 3
          }
        ]
      }
    ]
  },
  "ma4_2": {
    "practice": [
      {
        "id": "ma4_2_exp_p1",
        "title": "度数分布（最頻値・中央値階級・累積相対度数）＆標本調査 網羅演習",
        "category": "データの活用・標本調査",
        "leadText": "直前数学対策PDF演習7（資料の分析）と同型の度数分布計算・累積相対度数・捕獲再捕獲法（標本調査）を完全網羅します。",
        "explanationSummary": "①最頻値（モード）は度数が最も大きい階級の【階級値（両端の平均）】！ ②偶数人（40人）の中央値が入る階級は下から【20番目と21番目】が入る階級！ ③標本調査は比例式「母集団 : 不良品 ＝ 標本 : 標本の不良品」で解きます。",
        "surroundingKnowledge": [
          "相対度数 ＝ その階級の度数 ÷ 度数の合計（合計は必ず $1.00$）"
        ],
        "deepDiveTopics": [
          "捕獲再捕獲法の比例式"
        ],
        "questions": [
          {
            "prompt": "生徒40人の記録の度数分布表で、度数が最も多い階級が「$45\\text{kg}$ 以上 $50\\text{kg}$ 未満（17人）」であるとき、このデータの【最頻値（モード）】を求めなさい。",
            "choices": [
              "$47.5\\text{kg}$",
              "$17$人",
              "$45\\text{kg}$",
              "$50\\text{kg}$"
            ],
            "why": "最頻値は度数が最大の階級の「階級値（真ん中の値）」なので $\\dfrac{45 + 50}{2} = 47.5\\text{kg}$ です。",
            "oneLine": "最頻値 ＝ 最大度数階級の真ん中（階級値）$= 47.5\\text{kg}$！",
            "skill": "最頻値（階級値）",
            "rate": 79,
            "difficulty": 3
          },
          {
            "prompt": "生徒40人の通学時間の度数分布表で、0〜10分が5人、10〜20分が12人、20〜30分が14人、30〜40分が9人であった。【中央値（メジアン）】が含まれる階級はどれか。",
            "choices": [
              "$20$分以上 $30$分未満",
              "$10$分以上 $20$分未満",
              "$30$分以上 $40$分未満",
              "$0$分以上 $10$分未満"
            ],
            "why": "40人の中央値は小さい方から20番目と21番目の平均です。20分未満までで $5+12=17$ 人、30分未満までで $17+14=31$ 人なので、20・21番目はともに「20分以上30分未満」に入ります。",
            "oneLine": "40人の中央値は20・21番目！累積度数17人の次なので20〜30分！",
            "skill": "中央値の階級",
            "rate": 77,
            "difficulty": 3
          },
          {
            "prompt": "上の40人の表（0〜10分：5人、10〜20分：12人、20〜30分：14人、30〜40分：9人）において、「30分未満」までの【累積相対度数】を小数第3位まで求めなさい。",
            "choices": [
              "$0.775$",
              "$0.350$",
              "$0.425$",
              "$0.825$"
            ],
            "why": "30分未満までの累積度数は $5 + 12 + 14 = 31$ 人。よって累積相対度数は $31 \\div 40 = 0.775$ です。",
            "oneLine": "累積度数 $31 \\div 40 = 0.775$！",
            "skill": "累積相対度数",
            "rate": 73,
            "difficulty": 3
          },
          {
            "prompt": "池にいるコイの総数を調べるため、$60$ 匹を捕まえて印をつけて池に戻した。数日後、無作為に $50$ 匹を捕まえたところ印のついたコイが $4$ 匹いた。池のコイはおよそ何匹と推定されるか。",
            "choices": [
              "およそ $750$ 匹",
              "およそ $600$ 匹",
              "およそ $800$ 匹",
              "およそ $1,200$ 匹"
            ],
            "why": "総数を $x$ 匹とすると $x : 60 = 50 : 4 \\Rightarrow 4x = 3000 \\Rightarrow x = 750$ 匹です。",
            "oneLine": "比例式 $x : 60 = 50 : 4 \\Rightarrow x = 750$ 匹！",
            "skill": "標本調査（捕獲再捕獲）",
            "rate": 78,
            "difficulty": 3
          },
          {
            "prompt": "工場で作られた電球 $12,000$ 個から無作為に $300$ 個を抽出して検査したところ、不良品が $5$ 個見つかった。$12,000$ 個全体に含まれる不良品はおよそ何個と推測されるか。",
            "choices": [
              "およそ $200$ 個",
              "およそ $150$ 個",
              "およそ $240$ 個",
              "およそ $60$ 個"
            ],
            "why": "$12000 \\times \\dfrac{5}{300} = 40 \\times 5 = 200$ 個です。",
            "oneLine": "$12000 \\div 300 = 40$ 倍 $\\Rightarrow 5\\times 40 = 200$ 個！",
            "skill": "標本調査（不良品推定）",
            "rate": 86,
            "difficulty": 3
          },
          {
            "prompt": "全校生徒の読書時間を調べる調査において、【全数調査】ではなく【標本調査】を行うのが適切な事例を1つ選びなさい。",
            "choices": [
              "工場で製造された缶詰の品質（味や中身）の検査",
              "学校の定期健康診断における身長・体重の測定",
              "国が5年ごとに行う国勢調査",
              "搭乗する飛行機に乗る乗客の手荷物保安検査"
            ],
            "why": "缶詰を開けて検査する品質調査は商品を壊してしまう（破壊検査）ため全数調査ができず、標本調査を行います。",
            "oneLine": "製品を壊す検査・視聴率調査 ＝ 標本調査！国勢調査・健康診断 ＝ 全数調査！",
            "skill": "全数調査と標本調査",
            "rate": 88,
            "difficulty": 3
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "ma4_2_exp_m1",
        "title": "データ・標本調査 スピード実戦チェック②",
        "category": "データの活用",
        "leadText": "階級の幅・相対度数・無作為抽出の3問です。",
        "explanationSummary": "相対度数が異なる人数の集団同士の割合比較に最も適しています。",
        "surroundingKnowledge": [
          "総度数が違うA組とB組の比較には度数ではなく相対度数を使う！"
        ],
        "deepDiveTopics": [
          "相対度数を使う理由"
        ],
        "questions": [
          {
            "prompt": "人数が異なる1年生（120人）と3年生（160人）の通学時間の分布を公平に比較したいとき、度数ではなく何を用いて比較すべきか。",
            "choices": [
              "相対度数",
              "階級の幅",
              "最大値と最小値の和",
              "度数の合計"
            ],
            "why": "全体の人数（度数の合計）が異なる集団を比較するときは、全体に対する割合である【相対度数】を使います。",
            "oneLine": "人数が異なる集団の比較 ＝【相対度数】を使う！",
            "skill": "相対度数の活用",
            "rate": 89,
            "difficulty": 3
          },
          {
            "prompt": "度数分布表で、全体の人数が $50$ 人、ある階級の相対度数が $0.24$ であった。この階級の度数（人数）は何人か。",
            "choices": [
              "$12$人",
              "$24$人",
              "$6$人",
              "$15$人"
            ],
            "why": "度数 ＝ 総度数 × 相対度数 $= 50 \\times 0.24 = 12$ 人です。",
            "oneLine": "$50 \\times 0.24 = 12$ 人！",
            "skill": "相対度数から度数計算",
            "rate": 87,
            "difficulty": 3
          },
          {
            "prompt": "母集団からかたよりなく標本を選び出すことを何というか。",
            "choices": [
              "無作為に抽出する（無作為抽出）",
              "全数調査する",
              "四分位抽出する",
              "比例配分する"
            ],
            "why": "乱数さいや乱数表・コンピュータなどを使って偏りなく標本を選ぶことを「無作為に抽出する（無作為抽出）」といいます。",
            "oneLine": "偏りなく標本を選ぶこと ＝【無作為抽出】！",
            "skill": "標本調査の用語",
            "rate": 92,
            "difficulty": 3
          }
        ]
      }
    ]
  }
};
