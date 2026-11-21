import type { Unit } from './types'

/** 数学 ─ 中学3年分＋入試の頻出単元 */
export const mathUnits: Unit[] = [
  {
    id: 'math-1',
    subject: 'math',
    name: '正負の数・文字式',
    grade: '中1',
    description: '符号ミスをなくす。計算の土台。',
    questions: [
      {
        id: 'math-1-1',
        prompt: '次の計算をしなさい。\n(-3) + (+7) - (-2)',
        choices: ['-8', '2', '6', '12'],
        answer: 2,
        explanation:
          'まず引き算を足し算に直します。-(-2) は +2。よって (-3) + 7 + 2 = 6 です。',
        point: '−(−a) は ＋a に直す',
        level: 1,
      },
      {
        id: 'math-1-2',
        prompt: '次の計算をしなさい。\n(-2)² - 3 × (-4)',
        choices: ['-16', '4', '10', '16'],
        answer: 3,
        explanation:
          '累乗が先：(-2)² = 4。次にかけ算：3 × (-4) = -12。よって 4 - (-12) = 4 + 12 = 16。',
        point: '累乗 → かけ算・わり算 → たし算・ひき算',
        level: 2,
      },
      {
        id: 'math-1-3',
        prompt: 'x = -2 のとき、3x² - 5x + 1 の値を求めなさい。',
        choices: ['3', '15', '23', '27'],
        answer: 2,
        explanation:
          '3×(-2)² - 5×(-2) + 1 = 3×4 + 10 + 1 = 12 + 10 + 1 = 23。x² に代入するときは (-2)² と必ずかっこをつけます。',
        point: '代入は (−2)² のようにかっこで囲む',
        level: 2,
      },
      {
        id: 'math-1-4',
        prompt: '次の式を計算しなさい。\n2(3a - 4b) - 3(a - 2b)',
        choices: ['3a - 2b', '3a - 14b', '9a - 14b', '3a + 2b'],
        answer: 0,
        explanation:
          '展開すると 6a - 8b - 3a + 6b。a は 6a - 3a = 3a、b は -8b + 6b = -2b。よって 3a - 2b。',
        point: '−( ) をはずすときは全項の符号が変わる',
        level: 2,
      },
    ],
  },
  {
    id: 'math-2',
    subject: 'math',
    name: '一次方程式・連立方程式',
    grade: '中1〜中2',
    description: '等式の性質と代入法・加減法。',
    questions: [
      {
        id: 'math-2-1',
        prompt: '方程式 4x - 7 = 2x + 5 を解きなさい。',
        choices: ['x = 2', 'x = 3', 'x = 6', 'x = -6'],
        answer: 2,
        explanation:
          'x を左辺へ、数は右辺へ移項します。4x - 2x = 5 + 7 → 2x = 12 → x = 6。',
        point: '移項したら符号が変わる',
        level: 1,
      },
      {
        id: 'math-2-2',
        prompt: '方程式 3(x - 1) = 5x + 7 を解きなさい。',
        choices: ['x = -5', 'x = -2', 'x = 2', 'x = 5'],
        answer: 0,
        explanation:
          '左辺を展開して 3x - 3 = 5x + 7。移項して 3x - 5x = 7 + 3 → -2x = 10 → x = -5。',
        point: '両辺を負の数で割ると符号が反転する',
        level: 2,
      },
      {
        id: 'math-2-3',
        prompt: '連立方程式を解きなさい。\nx + y = 7\n2x - y = 2',
        choices: ['x = 3, y = 4', 'x = 4, y = 3', 'x = 2, y = 5', 'x = 5, y = 2'],
        answer: 0,
        explanation:
          '2式を足すと y が消えて 3x = 9 → x = 3。x + y = 7 に代入して y = 4。',
        point: '係数が逆符号なら足して消す（加減法）',
        level: 2,
      },
      {
        id: 'math-2-4',
        prompt:
          '1本80円の鉛筆と1本120円のペンを合わせて10本買ったところ、代金は960円でした。鉛筆の本数を求めなさい。',
        choices: ['4本', '5本', '6本', '7本'],
        answer: 2,
        explanation:
          '鉛筆を x 本とすると 80x + 120(10 - x) = 960。80x + 1200 - 120x = 960 → -40x = -240 → x = 6。',
        point: '「合わせて10本」→ もう一方は (10 − x) 本',
        level: 3,
      },
    ],
  },
  {
    id: 'math-3',
    subject: 'math',
    name: '関数（比例・一次関数）',
    grade: '中1〜中2',
    description: '変化の割合とグラフの読み取り。',
    questions: [
      {
        id: 'math-3-1',
        prompt: '一次関数 y = -2x + 3 について、x が1増えると y はどうなるか。',
        choices: ['2増える', '2減る', '3増える', '3減る'],
        answer: 1,
        explanation:
          '一次関数 y = ax + b の a（傾き）が「x が1増えたときの y の増加量」。a = -2 なので y は 2 減ります。',
        point: '傾き a ＝ x が1増えたときの y の増加量',
        level: 1,
      },
      {
        id: 'math-3-2',
        prompt: '2点 (1, 3)、(3, 9) を通る直線の式を求めなさい。',
        choices: ['y = 2x + 1', 'y = 3x', 'y = 3x - 2', 'y = 6x - 3'],
        answer: 1,
        explanation:
          '傾き a = (9 - 3) ÷ (3 - 1) = 6 ÷ 2 = 3。(1, 3) を通るので 3 = 3×1 + b → b = 0。よって y = 3x。',
        point: '傾き＝(yの増加量)÷(xの増加量)',
        level: 2,
      },
      {
        id: 'math-3-3',
        prompt:
          'y は x に比例し、x = 4 のとき y = 12 です。x = 6 のときの y の値を求めなさい。',
        choices: ['9', '14', '16', '18'],
        answer: 3,
        explanation:
          '比例の式 y = ax に代入して 12 = 4a → a = 3。y = 3x なので x = 6 のとき y = 18。',
        point: '比例定数 a を先に決める',
        level: 1,
      },
      {
        id: 'math-3-4',
        prompt:
          'y = 2x + 4 のグラフと x 軸との交点の座標を求めなさい。',
        choices: ['(0, 4)', '(-2, 0)', '(2, 0)', '(4, 0)'],
        answer: 1,
        explanation:
          'x 軸との交点は y = 0 の点。0 = 2x + 4 → 2x = -4 → x = -2。よって (-2, 0)。',
        point: 'x軸との交点は y = 0 を代入',
        level: 2,
      },
    ],
  },
  {
    id: 'math-4',
    subject: 'math',
    name: '図形（相似・三平方）',
    grade: '中3',
    description: '角度・相似比・三平方の定理の使いどころ。',
    questions: [
      {
        id: 'math-4-1',
        prompt:
          '直角三角形で、直角をはさむ2辺が3cmと4cmのとき、斜辺の長さを求めなさい。',
        choices: ['5cm', '6cm', '7cm', '√7cm'],
        answer: 0,
        explanation:
          '三平方の定理より 3² + 4² = 9 + 16 = 25。斜辺は √25 = 5cm。',
        point: '3・4・5 は代表的な直角三角形',
        level: 1,
      },
      {
        id: 'math-4-2',
        prompt:
          '相似な2つの三角形があり、相似比が 2 : 3 です。面積比を求めなさい。',
        choices: ['2 : 3', '4 : 6', '4 : 9', '8 : 27'],
        answer: 2,
        explanation:
          '相似比 a : b のとき、面積比は a² : b²。よって 2² : 3² = 4 : 9。',
        point: '相似比 a:b → 面積比 a²:b² ／ 体積比 a³:b³',
        level: 1,
      },
      {
        id: 'math-4-3',
        prompt:
          '円周角の定理について正しいものを選びなさい。',
        choices: [
          '同じ弧に対する円周角は中心角の2倍である',
          '同じ弧に対する円周角はすべて等しい',
          '直径に対する円周角は45°である',
          '円周角は弧の長さに反比例する',
        ],
        answer: 1,
        explanation:
          '同じ弧に対する円周角はすべて等しくなります。中心角は円周角の2倍、直径に対する円周角は90°です。',
        point: '中心角＝円周角×2 ／ 直径の円周角＝90°',
        level: 2,
      },
      {
        id: 'math-4-4',
        prompt:
          '1辺が6cmの正方形の対角線の長さを求めなさい。',
        choices: ['6cm', '6√2cm', '6√3cm', '12cm'],
        answer: 1,
        explanation:
          '正方形の対角線は 6² + 6² = 72 の平方根。√72 = 6√2cm。',
        point: '1辺 a の正方形の対角線は a√2',
        level: 2,
      },
    ],
  },
  {
    id: 'math-5',
    subject: 'math',
    name: 'データの活用・確率',
    grade: '中1〜中3',
    description: '代表値・箱ひげ図・確率の求め方。',
    questions: [
      {
        id: 'math-5-1',
        prompt:
          'データ 2, 4, 4, 6, 9 の中央値（メジアン）を求めなさい。',
        choices: ['4', '5', '5.5', '6'],
        answer: 0,
        explanation:
          'データを小さい順に並べると 2, 4, 4, 6, 9。個数が5個（奇数）なので真ん中の3番目、4 が中央値です。',
        point: '奇数個の中央値＝真ん中の値',
        level: 1,
      },
      {
        id: 'math-5-2',
        prompt:
          '大小2つのさいころを同時に投げるとき、出た目の和が7になる確率を求めなさい。',
        choices: ['1/6', '1/9', '5/36', '7/36'],
        answer: 0,
        explanation:
          '全部で36通り。和が7になるのは (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) の6通り。6/36 = 1/6。',
        point: '確率＝あてはまる場合の数 ÷ 全体の場合の数',
        level: 2,
      },
      {
        id: 'math-5-3',
        prompt:
          'データの値が 3, 5, 7, 9 のとき、平均値を求めなさい。',
        choices: ['5', '6', '7', '8'],
        answer: 1,
        explanation:
          '平均値＝合計 ÷ 個数＝(3 + 5 + 7 + 9) ÷ 4 = 24 ÷ 4 = 6。',
        point: '平均値＝合計÷個数',
        level: 1,
      },
      {
        id: 'math-5-4',
        prompt:
          '箱ひげ図で、箱の左右の端が表しているものを選びなさい。',
        choices: [
          '第1四分位数と第3四分位数',
          '最小値と最大値',
          '平均値と中央値',
          '最頻値と中央値',
        ],
        answer: 0,
        explanation:
          '箱ひげ図の箱の両端が第1四分位数（Q1）と第3四分位数（Q3）。箱の長さがデータの散らばりの目安になります。最小値・最大値はひげの先端です。',
        point: '箱の端＝Q1 と Q3 ／ ひげの端＝最小・最大',
        level: 3,
      },
    ],
  },
]
