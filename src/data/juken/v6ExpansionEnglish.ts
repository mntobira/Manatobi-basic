import type { ChapterExpansionSpec } from './problemHelpers';

/**
 * v6 英語：「まなとび英文法」スタイルのテンポよく解ける5問ステージ増強パック
 */
export const ENGLISH_V6_EXPANSION: Record<string, ChapterExpansionSpec> = {
  en1_2: {
    practice: [
      {
        id: 'en1_2_v6_p1',
        title: '【★基礎・5問ステージ】動名詞 vs 不定詞・時と条件の副詞節・比較の急所',
        category: '不定詞・動名詞・比較（5問）',
        difficultyLevel: 1,
        leadText: '入試の4択・整序で毎年出る「enjoy/finish/stop ＋ ~ing」「if/when節の現在形」「比較級・最上級」をテンポよく5問クリアしましょう！',
        explanationSummary: '①MEGAFEPS（mind, enjoy, give up, avoid, finish, escape, practice, stop）の後ろは【~ing（動名詞）】！ ②「もし明日晴れたら」のように未来のことでも【時・条件を表す if / when 節の中は現在形】！',
        surroundingKnowledge: ['stop ~ing（〜するのをやめる） vs stop to ~（〜するために立ち止まる）の意味の違いは超頻出！'],
        deepDiveTopics: ['原級比較 not as ~ as ... と比較級の書き換え'],
        questions: [
          {
            prompt: 'My sister finished (　　) her math homework ten minutes ago.',
            choices: ['doing', 'to do', 'did', 'done'],
            wrongReasons: [
              'finish は目的語に to不定詞をとることができない動詞の代表格である！',
              '動詞の過去形をそのまま並べることはできない。',
              '過去分詞単体では目的語にならない。',
            ],
            skill: '動名詞のみを目的語にとる動詞',
            rate: 86,
            difficulty: 1,
            oneLine: 'enjoy / finish / stop / practice の後ろは必ず【~ing（動名詞）】！',
            why: 'finish ~ing「〜し終える」は不定詞 to do を選ばせるひっかけ問題の筆頭です。',
          },
          {
            prompt: 'If it (　　) sunny tomorrow, we will have a barbecue by the river.',
            choices: ['is', 'will be', 'was', 'be'],
            wrongReasons: [
              'tomorrow があっても、「もし〜なら」という条件の副詞節（if節）の中では未来のことを【現在形】で表す鉄則がある！',
              '未来の話なので過去形 was は不可。',
              '原形 be をそのまま置くことはできない。',
            ],
            skill: '時・条件の副詞節の現在形',
            rate: 76,
            difficulty: 2,
            oneLine: '「もし〜なら」の if 節の中では未来のことでも will を使わず【現在形（is / rains 等）】！',
            why: '主節が we will have ~ なのでつられて will be を選びがちですが、条件の副詞節内は現在形 is が正解です（注意：「〜かどうか」の名詞節 I don\'t know if it will be sunny tomorrow. なら will を使う！）。',
          },
          {
            prompt: 'This library is (　　) of all the buildings in our town.',
            choices: ['the oldest', 'older', 'as old', 'oldest'],
            wrongReasons: [
              '後ろに of all ~（すべての中で）があるので2者比較の比較級 older ではなく最上級にする。',
              'as old as ~ の形になっていない。',
              '形容詞の最上級の前には原則として【the】が必要である！',
            ],
            skill: '最上級（the + -est + of / in）',
            rate: 84,
            difficulty: 1,
            oneLine: 'of all ＋ 複数名詞 ／ in ＋ 場所（単数）が後ろにあれば【the ＋ 最上級】！',
            why: 'of all the buildings「すべての建物の中で」に対応するのは the oldest です。',
          },
          {
            prompt: 'It is very important (　　) us to save water and electricity.',
            choices: ['for', 'of', 'to', 'with'],
            wrongReasons: [
              'of 人 to ~ を使うのは人の性質を表す形容詞（kind / nice / clever 等）のときだけである。',
              '意味上の主語は to ではなく for で表す。',
              'with は使わない。',
            ],
            skill: '形式主語構文（It is ... for A to ~）',
            rate: 83,
            difficulty: 2,
            oneLine: 'It is ＋ 形容詞 ＋【for 人】＋ to 動詞の原形！（kind / nice のときだけ of 人）',
            why: 'important は事柄の性質を表す形容詞なので、意味上の主語には for us を用います。',
          },
          {
            prompt: 'Ken runs much (　　) than I could run three years ago.',
            choices: ['faster', 'more fast', 'fastest', 'very faster'],
            wrongReasons: [
              'fast は短い語なので more ではなく語尾に -er をつける。',
              '後ろに than があるので最上級 fastest ではなく比較級にする。',
              '比較級を強める「ずっと〜」には very は使えず【much / a lot / far】を使う！',
            ],
            skill: '比較級の強調（much + 比較級）',
            rate: 79,
            difficulty: 2,
            oneLine: 'than があれば比較級 faster！ 比較級の前の強調「ずっと〜」は very ではなく【much】！',
            why: 'much faster than ~「〜よりずっと速く」は文法問題でも英作文でも大活躍する表現です。',
          },
        ],
      },
    ],
  },
  en2_2: {
    practice: [
      {
        id: 'en2_2_v6_p1',
        title: '【★★★実戦・5問ステージ】分詞の識別・関係代名詞 whose/目的格・間接疑問・仮定法',
        category: '中3重要文法総仕上げ（5問）',
        difficultyLevel: 3,
        leadText: '中3英文法の山場である「現在分詞 vs 過去分詞」「関係代名詞」「間接疑問文の語順」「仮定法過去」を5問で総点検します！',
        explanationSummary: '①修飾される名詞が「〜している（能動）」なら【~ing】、「〜された・〜されている（受動）」なら【過去分詞】！ ②間接疑問文は文の途中に入るため【疑問詞 ＋ 主語(S) ＋ 動詞(V)】の肯定文語順に戻る！',
        surroundingKnowledge: ['I wish I were [had / could] ~. や If I had enough time, I would ~. では「現在の事実に反する仮定」を【過去形】で表す！'],
        deepDiveTopics: ['目的格の関係代名詞の省略（名詞 ＋ S ＋ V の接触節の読み取り）'],
        questions: [
          {
            prompt: 'Look at the picture (　　) by my grandfather fifty years ago.',
            choices: ['taken', 'taking', 'took', 'was taken'],
            wrongReasons: [
              '写真は「撮る」側ではなく「撮られた」側（受動関係）なので現在分詞 taking は不可。',
              'すでに動詞 Look があるので過去形 took は置けない。',
              '関係代名詞 which がないまま was taken と動詞を続けることはできない。',
            ],
            skill: '過去分詞の後置修飾',
            rate: 81,
            difficulty: 2,
            oneLine: '「〜によって撮られた写真」＝ 受動関係なので【過去分詞 taken】で後ろから修飾！',
            why: 'the picture [ (which was) taken by my grandfather ] の構造です。後ろの by ~ も過去分詞の強い目印になります。',
          },
          {
            prompt: 'Could you tell me (　　)?',
            choices: [
              'when the next bus leaves',
              'when does the next bus leave',
              'when will the next bus leave',
              'when leaves the next bus',
            ],
            wrongReasons: [
              '疑問文の語順（does ... leave）のまま埋め込んでしまった最頻出ミス！',
              '疑問文の語順（will ... leave）になっているミス。',
              '主語と動詞の順序が逆になっている。',
            ],
            skill: '間接疑問文の語順（疑問詞＋S＋V）',
            rate: 75,
            difficulty: 2,
            oneLine: '間接疑問文 ＝【疑問詞 ＋ 主語 ＋ 動詞】の語順！（does が消えるので三単現の -s「leaves」を忘れない！）',
            why: 'does を外して肯定文の語順に戻す際、主語が単数 the next bus なので動詞を leaves と三単現の形にする2段階チェックが急所です！',
          },
          {
            prompt: 'I have a friend (　　) mother is a famous pianist in Vienna.',
            choices: ['whose', 'who', 'whom', 'which'],
            wrongReasons: [
              '空所の直後に無冠詞の名詞 mother が続いて「その友人の母が〜」と所有関係になっているため主格 who は不可。',
              '目的格 whom ではなく所有格が必要である。',
              'which は事物を先行詞にとり、かつ所有格ではない。',
            ],
            skill: '関係代名詞の所有格 whose',
            rate: 72,
            difficulty: 3,
            oneLine: '先行詞 ＋【whose ＋ 名詞（冠詞なし）】＋ V 〜 ＝「その…の［名詞］が〜」！',
            why: 'a friend + her mother is a famous pianist をつなぐため、所有格 her の働きをする関係代名詞 whose を選びます。',
          },
          {
            prompt: 'I am very busy today. If I (　　) free today, I could go to the museum with you.',
            choices: ['were', 'am', 'will be', 'have been'],
            wrongReasons: [
              '実際には今日忙しい（現在の事実に反する仮定）かつ主節が could go なので現在形 am は不可。',
              '仮定法では if 節に will be は使わない。',
              '現在完了形ではなく仮定法過去を用いる。',
            ],
            skill: '仮定法過去（If I were ~, I could ...）',
            rate: 74,
            difficulty: 3,
            oneLine: '現在の事実に反する仮定 ＝【If ＋ S ＋ 過去形（be動詞は were / was）, S ＋ would / could ＋ 原形】！',
            why: '前半の I am very busy today.（事実は忙しい）と後半の could go が仮定法過去の決定的な手がかりです。',
          },
          {
            prompt: 'A: How long have you known Ms. Green? — B: (　　) I entered this junior high school.',
            choices: ['Since', 'For', 'When', 'During'],
            wrongReasons: [
              'for の後ろには「3年間（three years）」のような期間を表す名詞句が置き、S+V（文）は続けられない。',
              'How long have you ~?（どのくらいの期間ずっと〜ですか）への応答なので「〜したとき」の When では答えにならない。',
              'during は前置詞で後ろに名詞しか置けない。',
            ],
            skill: '現在完了（継続）の since + S + 過去形',
            rate: 80,
            difficulty: 2,
            oneLine: 'since ＋ 過去の起点（S ＋ 過去形）＝「〜して以来ずっと」！（for ＋ 期間の長さ と区別！）',
            why: '後ろが I entered ~ という主語＋過去形の節になっているため、接続詞としても使える Since が正解です。',
          },
        ],
      },
    ],
  },
};
