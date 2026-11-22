/**
 * ===================================================================
 * 高校入試 英作文道場データ（三重県後期選抜 英作文対策プリント＋全国公立型）
 * ===================================================================
 *
 * 送付プリント『三重県後期選抜 英語 英作文対策プリント』の
 * ・過去5年（R4〜R8）分析と2点満点減点基準
 * ・必須の型21選 ＆ 減点ゼロの言い換え5選
 * ・基礎ドリル（和文英訳・誤文訂正）
 * ・予想問題 第1回〜第6回（対話補充＆テーマ意見英作文）
 * を網羅的に収録。
 */

export interface WritingPattern {
  no: number;
  category: '意見・理由' | '提案・依頼' | '感情・経験' | '不定詞・構文';
  pattern: string;
  japanese: string;
  example: string;
  caution: string;
}

export interface ParaphraseTip {
  hardJa: string;
  ngTrap: string;
  safeEn: string;
  point: string;
}

export interface WritingTask {
  id: string;
  group: 'drill' | 'error_fix' | 'mock_dialogue' | 'national_opinion';
  badge: string;
  title: string;
  /** 対話文や状況設定 */
  context: string;
  /** 指示・条件 */
  condition: string;
  /** 推奨最小語数 */
  minWords: number;
  /** 推奨最大語数（0は上限なし） */
  maxWords?: number;
  /** 解答文の末尾記号の期待値 */
  expectedEndPunct?: '.' | '?' | 'any';
  /** ヒントになる推奨キーワード */
  hintKeywords: string[];
  /** 誤文訂正タスクの場合の元の誤文 */
  brokenSentence?: string;
  /** 模範解答（複数） */
  modelAnswers: string[];
  /** 採点・減点回避のポイント */
  rubricPoints: string[];
}

export const WRITING_PATTERNS_21: readonly WritingPattern[] = [
  { no: 1, category: '意見・理由', pattern: 'I think (that) S + V.', japanese: '私は〜だと思います。', example: 'I think that reading books is important.', caution: '後ろに完全な文（S+V）を続ける！' },
  { no: 2, category: '意見・理由', pattern: 'because S + V', japanese: 'なぜなら〜だからです。', example: 'I like summer because I can swim in the sea.', caution: 'Why ~? への返答や理由説明の大定番。' },
  { no: 3, category: '意見・理由', pattern: 'First, ... Second, ...', japanese: '第一に〜。第二に〜。', example: 'First, it is easy. Second, it is cheap.', caution: '2文以上で理由を書くときに論理が明確になる。' },
  { no: 4, category: '提案・依頼', pattern: 'Why don\'t we + 原形 ~?', japanese: '一緒に〜しませんか。', example: 'Why don\'t we go to the library after school?', caution: '文末は必ずクエスチョンマーク（?）にする！' },
  { no: 5, category: '提案・依頼', pattern: 'How about + ~ing?', japanese: '〜するのはどうですか。', example: 'How about making pancakes together?', caution: 'about は前置詞なので後ろは必ず ~ing（または名詞）！' },
  { no: 6, category: '提案・依頼', pattern: 'Let\'s + 原形 ~.', japanese: '〜しましょう。', example: 'Let\'s meet at the station at ten.', caution: '文末はピリオド（.）。時刻の前に at を忘れない。' },
  { no: 7, category: '提案・依頼', pattern: 'Could you + 原形 ~?', japanese: '〜していただけませんか。', example: 'Could you tell me the way to the hospital?', caution: '丁寧な依頼。Will you / Can you より丁寧。' },
  { no: 8, category: '提案・依頼', pattern: 'Shall I + 原形 ~?', japanese: '（私が）〜しましょうか。', example: 'Shall I help you with your homework?', caution: '手伝いを申し出るときに最適。' },
  { no: 9, category: '提案・依頼', pattern: 'You should + 原形 ~.', japanese: 'あなたは〜すべきです（〜した方がよい）。', example: 'You should take an umbrella today.', caution: '困っている相手へのアドバイス問題で鉄板！' },
  { no: 10, category: '感情・経験', pattern: 'I want to + 原形 ~.', japanese: '私は〜したいです。', example: 'I want to visit Kyoto with my family.', caution: 'visit は他動詞なので visit to Kyoto にしない！' },
  { no: 11, category: '感情・経験', pattern: 'I would like to + 原形 ~.', japanese: '私は〜したいのですが。', example: 'I would like to join the English club.', caution: '目上の人・メールでの丁寧な希望表現。' },
  { no: 12, category: '感情・経験', pattern: 'I enjoy + ~ing.', japanese: '私は〜して楽しみます。', example: 'I enjoy playing tennis with my friends.', caution: 'enjoy の後ろは必ず ~ing（× enjoy to play）！' },
  { no: 13, category: '感情・経験', pattern: 'I am looking forward to + ~ing.', japanese: '〜を楽しみにしています。', example: 'I am looking forward to seeing you soon.', caution: 'to は前置詞！ 後ろは名詞か動名詞 ~ing！' },
  { no: 14, category: '感情・経験', pattern: 'I have been to ~.', japanese: '私は〜へ行ったことがあります。', example: 'I have been to Okinawa twice.', caution: '経験を伝える黄金パターン（× have gone to）。' },
  { no: 15, category: '感情・経験', pattern: 'I was glad (happy) to + 原形 ~.', japanese: '〜してうれしかったです。', example: 'I was glad to hear the news.', caution: '感想を述べる文で万能に使える。' },
  { no: 16, category: '不定詞・構文', pattern: 'It is + 形容詞 + (for 人) + to 原形.', japanese: '（人にとって）〜することは…です。', example: 'It is fun for me to cook dinner.', caution: '「楽しい」で I am fun と書く減点ミスを完全回避できる！' },
  { no: 17, category: '不定詞・構文', pattern: 'S + V ... + to 原形（目的）', japanese: '〜するために…する。', example: 'I went to the shop to buy a notebook.', caution: 'for buy と書かないよう注意！' },
  { no: 18, category: '不定詞・構文', pattern: 'make + A + 形容詞', japanese: 'Aを〜（な気持ち・状態）にする。', example: 'Listening to music makes me happy.', caution: '動名詞主語のときは三単現の makes にする！' },
  { no: 19, category: '不定詞・構文', pattern: 'There is (are) + 名詞 + 場所.', japanese: '（場所）に〜があります・います。', example: 'There are many old temples in my town.', caution: '「私の町には〜がある」の紹介英作文で最強！' },
  { no: 20, category: '不定詞・構文', pattern: 'tell + 人 + 疑問詞 + S + V', japanese: '人に［いつ/どこで〜するか］を伝える。', example: 'Please tell me what time we will meet.', caution: '間接疑問の語順（疑問詞＋主語＋動詞）を守る！' },
  { no: 21, category: '不定詞・構文', pattern: 'one of the + 最上級 + 複数名詞', japanese: '最も〜なものの1つ。', example: 'Soccer is one of the most popular sports.', caution: '最後の名詞を必ず複数形（sports）にする！' },
];

export const PARAPHRASE_TIPS_5: readonly ParaphraseTip[] = [
  {
    hardJa: 'スマホはとても便利です。',
    ngTrap: '× Smartphones are convenience / convinient.（つづり・品詞ミス多発！）',
    safeEn: 'Smartphones are very useful for us. / They are easy to use.',
    point: 'useful（役に立つ）や easy to use（使いやすい）に言い換えればスペルミス0！',
  },
  {
    hardJa: '私は友達と話すのが楽しいです。',
    ngTrap: '× I am fun to talk with my friends.（私が「おもしろい人間」という意味になる！）',
    safeEn: 'It is fun for me to talk with my friends. / I enjoy talking with my friends.',
    point: '人が主語なら enjoy ~ing、fun を使うなら It is fun for me to ~ にする！',
  },
  {
    hardJa: 'いい思い出を作ることができました。',
    ngTrap: '× We could make good memory.（memory 単数無冠詞ミス！）',
    safeEn: 'We made a lot of good memories. / We had a great time.',
    point: 'memories と複数形にするか、もっと安全な We had a great time! に言い換える！',
  },
  {
    hardJa: '日本の伝統文化を体験できます。',
    ngTrap: '× You can experience traditional...（experience / traditional のスペルミス危険！）',
    safeEn: 'You can enjoy old Japanese culture. / You can learn about Japanese history.',
    point: '難しい漢語は enjoy / learn about / old Japanese culture にかみ砕く！',
  },
  {
    hardJa: '健康に気をつけるべきです。',
    ngTrap: '× You should care health.',
    safeEn: 'You should go to bed early and eat breakfast every day.',
    point: '抽象的な日本語は「早く寝る・朝食を食べる」など具体的な中学英語の行動に直す！',
  },
];

export const WRITING_TASKS: readonly WritingTask[] = [
  // ---- 基礎ドリル・誤文訂正 ----
  {
    id: 'wt_drill_1',
    group: 'drill',
    badge: '基礎ドリル①',
    title: '提案＆待ち合わせの英作文',
    context: '日曜日に友人の Tom と映画を見に行くことになりました。以下の内容を表す1文を英語で書きなさい。\n「午前10時に駅の前で会いましょう。」',
    condition: '6語以上の英語1文で書くこと（Let\'s または Why don\'t we を使うと書きやすい）。',
    minWords: 6,
    expectedEndPunct: 'any',
    hintKeywords: ['meet', 'station', 'ten'],
    modelAnswers: [
      'Let\'s meet in front of the station at ten.',
      'Why don\'t we meet at the station at 10 a.m.?',
    ],
    rubricPoints: [
      'Let\'s ＋動詞の原形（ピリオド）または Why don\'t we ＋動詞の原形（?）が正しく使えているか',
      '時刻の前に前置詞 at、「〜の前で」に in front of（または駅の地点 at the station）が使えているか',
    ],
  },
  {
    id: 'wt_drill_2',
    group: 'drill',
    badge: '基礎ドリル②',
    title: '目的を表す不定詞（〜するために）',
    context: '昨日の放課後の行動について英語で伝えます。\n「私は昨日、理科の本を借りるために図書館へ行きました。」',
    condition: '8語以上の英語1文で書くこと（時制に注意！）。',
    minWords: 8,
    expectedEndPunct: '.',
    hintKeywords: ['went', 'library', 'to', 'borrow'],
    modelAnswers: [
      'I went to the library to borrow a science book yesterday.',
      'Yesterday, I went to the library to read books about science.',
    ],
    rubricPoints: [
      '「昨日」なので主節の動詞が過去形 went になっているか',
      '目的「借りるために」が to borrow（× for borrow）になっているか',
      '可算名詞 book に冠詞 a または複数形 books がついているか',
    ],
  },
  {
    id: 'wt_fix_1',
    group: 'error_fix',
    badge: '誤文訂正ドリル①',
    title: '頻出減点ミスの修正（動名詞主語・三単現・複数形）',
    context: '次の英文には文法上の誤りが【2か所】あります。誤りをすべて直して正しい英文全体を書き直しなさい。',
    brokenSentence: 'Read many book make me happy.',
    condition: '主語を動名詞（または不定詞）にし、数えられる名詞と動詞の形を正しく直すこと。',
    minWords: 6,
    expectedEndPunct: '.',
    hintKeywords: ['Reading', 'books', 'makes'],
    modelAnswers: [
      'Reading many books makes me happy.',
      'To read many books makes me happy.',
    ],
    rubricPoints: [
      '①文頭の動詞原形 Read を動名詞 Reading（または To read）に直せているか',
      '②many の後ろなので複数形 books になっているか',
      '③動名詞句主語（単数扱い）に合わせて三単現の makes になっているか',
    ],
  },
  {
    id: 'wt_fix_2',
    group: 'error_fix',
    badge: '誤文訂正ドリル②',
    title: '頻出減点ミスの修正（間接疑問文の語順・前置詞to）',
    context: '次の2文のうち、下の誤文の誤りを正しく直して1文で書き直しなさい。',
    brokenSentence: 'Please tell me what time will the bus come.',
    condition: '間接疑問文の正しい語順に直して全文を書くこと。',
    minWords: 7,
    expectedEndPunct: '.',
    hintKeywords: ['tell', 'what time', 'the bus', 'will'],
    modelAnswers: [
      'Please tell me what time the bus will come.',
      'Could you tell me what time the bus comes?',
    ],
    rubricPoints: [
      'what time の後ろが「主語（the bus）＋助動詞・動詞（will come）」の肯定文語順になっているか',
      'Please で始まる命令文なので文末がピリオド（.）になっているか',
    ],
  },

  // ---- 三重県後期選抜 大問3型 予想問題 第1回〜第6回 ----
  {
    id: 'wt_mock_1',
    group: 'mock_dialogue',
    badge: '予想問題 第1回',
    title: '対話文補充：ALTの先生におすすめの場所を紹介する',
    context: '【対話】\nMs. Brown: I have three days off next week. I want to visit a nice place in your town. Where should I go?\nYou: You should visit Green Park.\nMs. Brown: Oh, why do you recommend it?\nYou: (　あなたの返答　)',
    condition: 'Green Park をおすすめする理由が伝わるように、6語以上の英語1文で書くこと。',
    minWords: 6,
    expectedEndPunct: '.',
    hintKeywords: ['because', 'see', 'beautiful', 'flowers'],
    modelAnswers: [
      'Because you can see many beautiful flowers there.',
      'It is famous for its beautiful cherry blossoms, and you can relax there.',
    ],
    rubricPoints: [
      'Why do you recommend it? に対して理由（Because S + V. や特徴の説明）が自然につながっているか',
      'flowers / trees など数えられる名詞に a または複数形 -s がついているか',
    ],
  },
  {
    id: 'wt_mock_2',
    group: 'mock_dialogue',
    badge: '予想問題 第2回',
    title: '対話文補充：体調を崩しそうな友人へのアドバイス',
    context: '【対話】\nKen: We have an important soccer game this Saturday, so I practiced until midnight last night. I\'m very sleepy now.\nYou: Oh, really? (　あなたのアドバイス　)\nKen: You\'re right. I\'ll go home early and rest tonight.',
    condition: 'Ken の最後の返答（早く帰って今夜は休むよ）につながるように、相手を気づかうアドバイスを6語以上の英語で書くこと。',
    minWords: 6,
    expectedEndPunct: '.',
    hintKeywords: ['should', 'go to bed', 'early', 'sleep'],
    modelAnswers: [
      'You should go to bed early tonight.',
      'You should get enough sleep for the game.',
    ],
    rubricPoints: [
      'You should ＋動詞の原形 など適切な助言表現が使えているか',
      '直後の Ken のセリフ（I\'ll go home early and rest tonight.）と文脈が一致しているか',
    ],
  },
  {
    id: 'wt_mock_3',
    group: 'mock_dialogue',
    badge: '予想問題 第3回',
    title: '対話文補充：留学生を料理パーティーに誘い、持ち物を尋ねる／提案する',
    context: '【対話】\nYou: Hi, Emma! My friends and I will make okonomiyaki at my house this Sunday. (　あなたの誘いの文　)\nEmma: Sounds great! I\'d love to join you. What time should I go to your house?\nYou: Please come at eleven.',
    condition: 'Emma が「いいね！ぜひ参加したいわ」と答えるような誘いの文を、5語以上の疑問文で書くこと。',
    minWords: 5,
    expectedEndPunct: '?',
    hintKeywords: ['Why don\'t you', 'Would you like to', 'join', 'with us'],
    modelAnswers: [
      'Would you like to join us?',
      'Why don\'t you come and cook with us?',
      'Do you want to make it with us?',
    ],
    rubricPoints: [
      '相手（Emma）を誘う表現 Would you like to ~? / Why don\'t you ~? / Do you want to ~? が使えているか',
      '疑問文なので文末にクエスチョンマーク（?）がついているか',
    ],
  },
  {
    id: 'wt_mock_4',
    group: 'mock_dialogue',
    badge: '予想問題 第4回',
    title: 'Eメール返信：送別会のプレゼント選びの提案',
    context: '【友人Mikiからのメール】\nNext Friday is Mr. Clark\'s last day at our school. Let\'s give him a nice present from our class! What should we give him, and why?\n\n【あなたの返信メール】\nHi, Miki. Good idea! (　あなたの提案と理由　)',
    condition: '「何を贈るとよいか」と「その理由」の両方が入るように、10語以上の英語（1文または2文）で書くこと。',
    minWords: 10,
    expectedEndPunct: 'any',
    hintKeywords: ['How about', 'should', 'because', 'memories'],
    modelAnswers: [
      'How about giving him a photo album because it will give him good memories?',
      'We should give him a Japanese cup because he likes drinking green tea every day.',
    ],
    rubricPoints: [
      '「贈る品物（a photo album / a cup / a message card 等）」と「理由（because ~）」の2つの条件を満たしているか',
      'give + 人 + 物 の語順と冠詞 a / 複数形が正確か',
    ],
  },
  {
    id: 'wt_mock_5',
    group: 'national_opinion',
    badge: '予想問題 第5回（意見英作文）',
    title: '全国公立頻出：紙の本と電子書籍、どちらが好きか',
    context: '【Question】\nWhich do you like better, reading paper books or reading e-books? Write your opinion and give at least one reason.',
    condition: '自分の立場を明確にし、理由を含めて【15語〜30語程度】の英語で書くこと。',
    minWords: 15,
    maxWords: 40,
    expectedEndPunct: '.',
    hintKeywords: ['like', 'better', 'because', 'easy', 'eyes'],
    modelAnswers: [
      'I like reading paper books better because they are good for my eyes and easy to read. Also, I can lend my favorite books to my friends.',
      'I like reading e-books better because I can carry many books in one tablet. It is very useful when I travel by train.',
    ],
    rubricPoints: [
      '冒頭で I like ~ better. と明確に質問に答えているか',
      'because や Also を使って具体的な理由が15語以上で書けているか',
      '代名詞（paper books → they / them）の一致が正確か',
    ],
  },
  {
    id: 'wt_mock_6',
    group: 'national_opinion',
    badge: '予想問題 第6回（意見英作文）',
    title: '全国公立頻出：高校生活で挑戦したいこと',
    context: '【Question】\nWhat do you want to try when you become a high school student? Write what you want to do and why.',
    condition: '「やりたいこと」と「その理由」を含めて【15語〜30語程度】の英語で書くこと。',
    minWords: 15,
    maxWords: 40,
    expectedEndPunct: '.',
    hintKeywords: ['want to', 'when', 'because', 'make friends'],
    modelAnswers: [
      'I want to join the tennis club when I become a high school student. I like playing tennis, and I want to make many new friends there.',
      'I want to study English harder to talk with people from many countries. I hope to visit Australia in the future.',
    ],
    rubricPoints: [
      'when I become ...（時・条件の副詞節なので will を使わず現在形！）が守れているか',
      'やりたいこと（want to ~）と理由・目的が具体的に述べられているか',
    ],
  },
];

export interface AutoCheckIssue {
  level: 'error' | 'warn' | 'ok';
  message: string;
}

export interface AutoCheckResult {
  wordCount: number;
  estimatedScore: 0 | 1 | 2;
  issues: AutoCheckIssue[];
}

/**
 * 生徒が入力した英文を自動解析し、語数・大文字・句読点・入試頻出の減点ミスを判定する
 */
export function evaluateEnglishWriting(rawInput: string, task: WritingTask): AutoCheckResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      wordCount: 0,
      estimatedScore: 0,
      issues: [{ level: 'warn', message: '英文を入力して「減点チェック＆採点」を押してください。' }],
    };
  }

  const words = trimmed
    .replace(/[.?!,;:"()]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const wordCount = words.length;
  const issues: AutoCheckIssue[] = [];
  let deductions = 0;

  // 1. 語数チェック
  if (wordCount < task.minWords) {
    issues.push({
      level: 'error',
      message: `語数不足：現在 ${wordCount} 語です（条件：${task.minWords} 語以上）。理由や場所・時の表現を補いましょう。`,
    });
    deductions += 2;
  } else if (task.maxWords && wordCount > task.maxWords + 5) {
    issues.push({
      level: 'warn',
      message: `現在 ${wordCount} 語です（目安上限 ${task.maxWords} 語）。長すぎると文法ミスのリスクが上がります。`,
    });
  } else {
    issues.push({
      level: 'ok',
      message: `語数クリア：${wordCount} 語（条件 ${task.minWords} 語以上）`,
    });
  }

  // 2. 文頭の大文字チェック
  if (!/^[A-Z]/.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '減点注意：文の先頭が大文字（A〜Z）になっていません。',
    });
    deductions += 1;
  }

  // 3. 文末のピリオド / クエスチョンマーク
  const lastChar = trimmed[trimmed.length - 1];
  if (task.expectedEndPunct === '?') {
    if (lastChar !== '?') {
      issues.push({
        level: 'error',
        message: '減点注意：疑問文で誘う条件のため、文末にクエスチョンマーク（?）が必要です。',
      });
      deductions += 1;
    }
  } else if (task.expectedEndPunct === '.') {
    if (lastChar !== '.' && lastChar !== '!') {
      issues.push({
        level: 'error',
        message: '減点注意：文末のピリオド（.）を忘れています！',
      });
      deductions += 1;
    }
  } else if (!['.', '?', '!'].includes(lastChar)) {
    issues.push({
      level: 'error',
      message: '減点注意：文末にピリオド（.）またはクエスチョンマーク（?）をつけましょう。',
    });
    deductions += 1;
  }

  // 4. 一人称単数 "i" の小文字ミス
  if (/(^|\s)i(\s|'[a-z]+|[.?!,]|$)/.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '減点注意：「私」を表す I が小文字の i になっています。必ず大文字 I に直しましょう。',
    });
    deductions += 1;
  }

  // 5. 高校入試で頻発する典型文法ミス検知
  if (/\benjoy\s+to\s+[a-z]+/i.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '典型ミス発見：enjoy の後ろに to不定詞は置けません！ enjoy ~ing（動名詞）に直しましょう。',
    });
    deductions += 1;
  }
  if (/\blook(ing)?\s+forward\s+to\s+(see|meet|go|visit|play|make|eat|talk|hear)\b/i.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '典型ミス発見：look forward to の後ろは動詞の原形ではなく ~ing（例：seeing / visiting）にします！',
    });
    deductions += 1;
  }
  if (/\bI\s+(am|'m|was)\s+fun\b/i.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '典型ミス発見：I am fun は「私はおもしろい人間だ」という意味になります。It is fun for me to ~ または I enjoy ~ing を使いましょう！',
    });
    deductions += 1;
  }
  if (/\bvisit\s+to\s+/i.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '典型ミス発見：visit は他動詞なので直後の to は不要です（例：visit Kyoto / visit Green Park）。',
    });
    deductions += 1;
  }
  if (/\bhow\s+about\s+(go|make|give|play|visit|eat|meet|buy)\b/i.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '典型ミス発見：How about の後ろは動詞の原形ではなく ~ing（例：How about going / making ...?）にします！',
    });
    deductions += 1;
  }
  if (/\bwhen\s+I\s+will\b|\bif\s+it\s+will\b/i.test(trimmed)) {
    issues.push({
      level: 'error',
      message: '典型ミス発見：「〜するとき（when）」「もし〜なら（if）」の副詞節の中では will を使わず現在形にします！',
    });
    deductions += 1;
  }
  if (/\bconvinient\b|\bconveniance\b/i.test(trimmed)) {
    issues.push({
      level: 'error',
      message: 'スペルミス発見：convenient のつづりが誤っています。useful や easy to use に言い換えると安全です！',
    });
    deductions += 1;
  }

  if (deductions === 0) {
    issues.push({
      level: 'ok',
      message: '大文字・句読点・頻出減点トラップすべてクリア！ 下の模範解答と文脈の自然さを見比べましょう。',
    });
  }

  const estimatedScore: 0 | 1 | 2 = deductions === 0 ? 2 : deductions === 1 ? 1 : 0;
  return {
    wordCount,
    estimatedScore,
    issues,
  };
}
