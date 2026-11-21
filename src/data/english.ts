import type { Unit } from './types'

/** 英語 ─ 中学3年分＋入試の頻出単元 */
export const englishUnits: Unit[] = [
  {
    id: 'english-1',
    subject: 'english',
    name: 'be動詞・一般動詞',
    grade: '中1',
    description: '文の骨組み。主語と時制で動詞の形が決まる。',
    questions: [
      {
        id: 'english-1-1',
        prompt: '次の日本文に合う英文を選びなさい。\n「私は野球部の一員です。」',
        choices: [
          'I am a member of the baseball club.',
          'I is a member of the baseball club.',
          'I are a member of the baseball club.',
          'I am member of the baseball club.',
        ],
        answer: 0,
        explanation:
          '主語が I のとき be動詞は am。また member は数えられる名詞なので a member と冠詞が必要です。',
        point: 'I → am ／ 数えられる名詞には a・an をつける',
        level: 1,
      },
      {
        id: 'english-1-2',
        prompt: '「あなたはどこに住んでいますか。」に合う英文を選びなさい。',
        choices: [
          'Where are you live?',
          'Where do you live?',
          'Where you live?',
          'Where does you live?',
        ],
        answer: 1,
        explanation:
          '一般動詞 live の疑問文は do を主語の前に置きます。主語が you なので does は使いません。be動詞の are と一般動詞 live を同時に使うこともできません。',
        point: '一般動詞の疑問文＝do/does ＋ 主語 ＋ 動詞の原形',
        level: 1,
      },
      {
        id: 'english-1-3',
        prompt: '「健は毎日英語を勉強します。」に合う英文を選びなさい。',
        choices: [
          'Ken study English every day.',
          'Ken studies English every day.',
          'Ken studying English every day.',
          'Ken is study English every day.',
        ],
        answer: 1,
        explanation:
          '主語が三人称単数（Ken）で現在の文なので、一般動詞に s をつけます。study は「子音字＋y」なので y を i に変えて es → studies。',
        point: '三単現の s（study → studies）',
        level: 1,
      },
      {
        id: 'english-1-4',
        prompt: '「私は昨日その映画を見ませんでした。」に合う英文を選びなさい。',
        choices: [
          "I don't see the movie yesterday.",
          "I didn't saw the movie yesterday.",
          "I didn't see the movie yesterday.",
          "I wasn't see the movie yesterday.",
        ],
        answer: 2,
        explanation:
          '過去の否定文は didn\'t ＋ 動詞の原形。didn\'t が過去を表すので saw にはしません。',
        point: 'didn\'t のあとは必ず原形',
        level: 2,
      },
    ],
  },
  {
    id: 'english-2',
    subject: 'english',
    name: '疑問詞・代名詞',
    grade: '中1〜中2',
    description: 'who / whose / which と、it・one の使い分け。',
    questions: [
      {
        id: 'english-2-1',
        prompt: '「これは誰の傘ですか。」に合う英文を選びなさい。',
        choices: [
          'Who umbrella is this?',
          'Whose umbrella is this?',
          'Which umbrella is this?',
          'Whose this umbrella is?',
        ],
        answer: 1,
        explanation:
          '「誰の」と所有をたずねるのは whose。疑問詞のあとは〈whose ＋ 名詞 ＋ be動詞 ＋ 主語〉の語順になります。',
        point: '「誰の」＝whose（who ではない）',
        level: 1,
      },
      {
        id: 'english-2-2',
        prompt: '「彼女は何時に起きますか。」に合う英文を選びなさい。',
        choices: [
          'What time she gets up?',
          'What time does she gets up?',
          'What time does she get up?',
          'What time is she get up?',
        ],
        answer: 2,
        explanation:
          '主語が三人称単数（she）なので does を使い、動詞は原形 get に戻します。',
        point: 'does を使ったら動詞は原形',
        level: 1,
      },
      {
        id: 'english-2-3',
        prompt: '空所に入る最も適切なものを選びなさい。\n「太郎と私は同じクラスです。＿＿＿ はとても仲が良いです。」',
        choices: ['They', 'We', 'You', 'It'],
        answer: 1,
        explanation:
          '「太郎と私」＝話し手を含むので We。They（彼ら）は話し手を含みません。',
        point: '話し手を含めば we',
        level: 1,
      },
      {
        id: 'english-2-4',
        prompt: '「この2つのうち、どちらが好きですか。」に合う英文を選びなさい。',
        choices: [
          'Which do you like better, this or that?',
          'What do you like better, this or that?',
          'Which do you like best, this or that?',
          'Which are you like better, this or that?',
        ],
        answer: 0,
        explanation:
          '限られた2つのうちから選ぶので which。2つを比べるので最上級 best ではなく比較級 better を使います。',
        point: '2つから選ぶ＝which ／ 2者比較＝better',
        level: 2,
      },
    ],
  },
  {
    id: 'english-3',
    subject: 'english',
    name: '比較・不定詞・動名詞',
    grade: '中2',
    description: '入試で必ず出る3大文法。語順で勝負が決まる。',
    questions: [
      {
        id: 'english-3-1',
        prompt: '「私は姉より背が高いです。」に合う英文を選びなさい。',
        choices: [
          'I am tall than my sister.',
          'I am taller than my sister.',
          'I am more tall than my sister.',
          'I am the tallest than my sister.',
        ],
        answer: 1,
        explanation:
          '短い形容詞の比較級は -er をつけます（tall → taller）。than は「〜より」。the tallest は最上級で than とは一緒に使えません。',
        point: '短い語は -er ／ than は比較級とセット',
        level: 1,
      },
      {
        id: 'english-3-2',
        prompt: '「これは私が今まで読んだ中でいちばん面白い本です。」に合う英文を選びなさい。',
        choices: [
          'This is the most interesting book I have ever read.',
          'This is the interestingest book I have ever read.',
          'This is more interesting book I have ever read.',
          'This is the most interesting book I ever read.',
        ],
        answer: 0,
        explanation:
          'interesting は長い形容詞なので最上級は the most interesting。「今までに〜した中で」は have ever ＋ 過去分詞。',
        point: '長い語は the most ／ ever は現在完了とセット',
        level: 2,
      },
      {
        id: 'english-3-3',
        prompt: '「私は朝食を作るために早く起きました。」に合う英文を選びなさい。',
        choices: [
          'I got up early for make breakfast.',
          'I got up early to make breakfast.',
          'I got up early making breakfast.',
          'I got up early to making breakfast.',
        ],
        answer: 1,
        explanation:
          '「〜するために」という目的は to ＋ 動詞の原形（不定詞の副詞的用法）。for のあとに動詞の原形は置けません。',
        point: '目的の to ＋ 原形',
        level: 1,
      },
      {
        id: 'english-3-4',
        prompt: '「私は泳ぐことが好きです。」に合う英文を選びなさい。',
        choices: [
          'I like swim.',
          'I like to swimming.',
          'I like swimming.',
          'I like swims.',
        ],
        answer: 2,
        explanation:
          'like の目的語に動詞を置くときは動名詞（-ing）か不定詞（to ＋ 原形）。「I like swimming.」または「I like to swim.」が正しい形です。',
        point: 'like は -ing も to 不定詞もOK',
        level: 1,
      },
    ],
  },
  {
    id: 'english-4',
    subject: 'english',
    name: '受動態・現在完了',
    grade: '中3',
    description: '「〜される」「ずっと〜している」の言い方。',
    questions: [
      {
        id: 'english-4-1',
        prompt: '「この橋は100年前に建てられました。」に合う英文を選びなさい。',
        choices: [
          'This bridge built 100 years ago.',
          'This bridge was built 100 years ago.',
          'This bridge is built 100 years ago.',
          'This bridge was building 100 years ago.',
        ],
        answer: 1,
        explanation:
          '受動態は be動詞 ＋ 過去分詞。過去の話なので was built。is built だと「今建てられている」という現在の意味になります。',
        point: '受動態＝be ＋ 過去分詞',
        level: 2,
      },
      {
        id: 'english-4-2',
        prompt: '「私は3年間ずっと京都に住んでいます。」に合う英文を選びなさい。',
        choices: [
          'I live in Kyoto for three years.',
          'I am living in Kyoto since three years.',
          'I have lived in Kyoto for three years.',
          'I have living in Kyoto for three years.',
        ],
        answer: 2,
        explanation:
          '過去から今まで続いている状態は現在完了（継続）＝have ＋ 過去分詞。期間の長さは for、起点は since で表します。',
        point: '継続＝have ＋ 過去分詞 ＋ for/since',
        level: 2,
      },
      {
        id: 'english-4-3',
        prompt: '「あなたはもう宿題を終えましたか。」に合う英文を選びなさい。',
        choices: [
          'Did you finish your homework yet?',
          'Have you finished your homework yet?',
          'Have you finish your homework yet?',
          'Are you finished your homework yet?',
        ],
        answer: 1,
        explanation:
          '「もう〜しましたか」は現在完了の疑問文。yet は疑問文で「もう」の意味になります。完了形なので過去分詞 finished。',
        point: '疑問文の yet ＝「もう」',
        level: 2,
      },
      {
        id: 'english-4-4',
        prompt: '「英語は世界の多くの国で話されています。」に合う英文を選びなさい。',
        choices: [
          'English speaks in many countries around the world.',
          'English is speaking in many countries around the world.',
          'English is spoken in many countries around the world.',
          'English are spoken in many countries around the world.',
        ],
        answer: 2,
        explanation:
          '主語 English は「話される」側なので受動態。主語が単数扱いなので is ＋ spoken。',
        point: '主語が単数なら is ＋ 過去分詞',
        level: 3,
      },
    ],
  },
  {
    id: 'english-5',
    subject: 'english',
    name: '長文読解・英作文',
    grade: '入試',
    description: '内容一致・空所補充・条件英作文の実戦形式。',
    questions: [
      {
        id: 'english-5-1',
        prompt: '次の英文を読んで、下の問いに答えなさい。',
        passage:
          'Ken is a junior high school student. He gets up at six every morning to practice the piano. He wants to be a piano player in the future. His sister Yuki gets up at seven. She likes math and wants to be a doctor.',
        choices: [
          'Ken practices the piano every morning.',
          'Ken wants to be a doctor.',
          'Yuki gets up earlier than Ken.',
          'Yuki plays the piano every day.',
        ],
        answer: 0,
        explanation:
          '本文に「He gets up at six every morning to practice the piano.」とあります。Ken は6時、Yuki は7時起床なので、Yuki のほうが早いという選択肢は誤りです。',
        point: '本文に書いてあることだけを根拠にする',
        level: 3,
      },
      {
        id: 'english-5-2',
        prompt: '次の会話の空所に入る最も適切なものを選びなさい。',
        passage:
          'A: Have you ever been to Nara?\nB: Yes, I have. I (  ) there last summer with my family.\nA: Did you see the big Buddha?\nB: Yes. It was wonderful.',
        choices: ['go', 'went', 'have gone', 'am going'],
        answer: 1,
        explanation:
          'last summer という明確な過去を表す語句があるので、現在完了ではなく過去形 went を使います。',
        point: 'last 〜 / yesterday があれば過去形',
        level: 3,
      },
      {
        id: 'english-5-3',
        prompt: '次の英文の空所に入る最も適切なものを選びなさい。',
        passage:
          'Many people in Japan take the train to school or work. The trains are usually on time, (  ) it is a convenient way to travel.',
        choices: ['so', 'but', 'because', 'or'],
        answer: 0,
        explanation:
          '「電車はたいてい時間どおりだ」→ だから「便利な移動手段だ」という因果関係。結果を導くので so（だから）が入ります。',
        point: '原因 → 結果＝so',
        level: 3,
      },
      {
        id: 'english-5-4',
        prompt:
          '「あなたが行ってみたい国とその理由」を2文で書きます。1文目として最も適切なものを選びなさい。',
        choices: [
          'I want to visit Australia because I like koalas and beautiful nature.',
          'I will visited Australia because I like koalas.',
          'I want visit Australia because koalas like me.',
          'I am want to visit Australia because it is koalas.',
        ],
        answer: 0,
        explanation:
          '条件英作文では「何をしたいか」＋「なぜか」を正しい語順で書きます。want to ＋ 動詞の原形、理由は because ＋ 主語＋動詞の順でつなぎます。',
        point: 'want to ＋ 原形 ／ 理由は because',
        level: 3,
      },
    ],
  },
]
