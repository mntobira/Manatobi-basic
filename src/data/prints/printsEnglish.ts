import type { SummaryPrintSheet } from './types';

export const ENGLISH_PRINT_SHEETS: readonly SummaryPrintSheet[] = [
  {
    id: 'print_en_1',
    subject: 'english',
    group: '基礎文法（中1・中2）',
    badge: '英語プリント①',
    title: '動詞・時制・疑問詞・代名詞格変化・命令文と感嘆文',
    subtitle: '中1〜中2前半の土台とスタフリ頻出の語順ルール完全網羅',
    stars: 5,
    linkedChapterId: 'en1_1',
    items: [
      {
        heading: 'be動詞と一般動詞の絶対鉄則・不規則過去形',
        body: '1つの節の中に {{be動詞}} と一般動詞の原形は絶対に並べない（× Do you interested in ~? → ○ {{Are you interested}} in ~?）。また過去副詞（yesterday / ~ {{ago}} / last ~）があれば必ず過去形！ 特に現在・過去・過去分詞が同形の {{put / cut / read / hurt / let / set}} と、つづり要注意の {{taught / caught / bought / brought}} は完全暗記！',
        table: {
          headers: ['原形', '過去形', '過去分詞', '入試の減点ポイント'],
          rows: [
            ['read', 'read［red］', 'read［red］', '主語が He でも過去形なら reads にしない！'],
            ['teach / catch', 'taught / caught', 'taught / caught', 'au と ou のつづり混同に注意（teach→a→taught）'],
            ['buy / bring', 'bought / brought', 'bought / brought', 'r の有無で「買った」と「持ってきた」を厳密区別'],
            ['lie（横たわる）/ lay（置く）', 'lay / laid', 'lain / laid', '難関校・私立で狙われる自動詞・他動詞ペア'],
          ],
        },
      },
      {
        heading: '疑問詞の完全整理（How＋形容詞/副詞の8兄弟）',
        body: '・期間・所要時間「どのくらい長く」＝ {{How long}}（返答：for three days / About twenty minutes.）\n・頻度「どのくらいの頻度で」＝ {{How often}}（返答：once a week / {{twice}} a month / three times a year）\n・距離＝ {{How far}} ／ 個数＝ {{How many ＋複数名詞}} ／ 量・値段＝ {{How much}} ／ 年齢＝ {{How old}}！',
        tip: 'スタフリ流・応答秒殺法：返答に「for / since / 分・時間」があれば How long、「回（once / twice / every ~）」があれば How often！',
      },
      {
        heading: '代名詞の格変化・命令文＋and/or・感嘆文の語順',
        body: '・「彼自身の〜」は所有格＋own（his own room）、「私たちの友人の1人」は独立所有格を使った {{a friend of ours}}（× of us）！\n・「命令文, {{and}} S will ~」＝「〜しなさい、そうすれば…」、「命令文, {{or}} S will ~」＝「〜しなさい、さもないと…」。\n・感嘆文は名詞中心なら {{What ＋ (a/an) ＋ 形容詞 ＋ 名詞}} (+ S + V)!、形容詞・副詞だけ強調するなら {{How ＋ 形容詞/副詞}} (+ S + V)!',
      },
    ],
  },
  {
    id: 'print_en_2',
    subject: 'english',
    group: '基礎文法（中1・中2）',
    badge: '英語プリント②',
    title: '助動詞・接続詞（時条件の副詞節）・There構文・第4/第5文型',
    subtitle: '書き換え問題と整序英作文で毎年狙われる中2中核ルール',
    stars: 5,
    linkedChapterId: 'en1_3',
    items: [
      {
        heading: '助動詞の否定・対話表現・had better',
        body: "・must not は「{{〜してはいけない（禁止）}}」、don't have to（＝need not）は「{{〜しなくてもよい（不必要）}}」！\n・申し出「私が〜しましょうか」＝ {{Shall I}} ~?（応答：Yes, please. / No, thank you.） ／ 勧誘「一緒に〜しませんか」＝ {{Shall we}} ~?（＝ {{Why don't we}} ~? ＝ {{How about ~ing}}?、応答：Yes, let's.）\n・「〜したほうがよい」＝ {{had better ＋動詞の原形}}（否定形は {{had better not ＋原形}}）！",
      },
      {
        heading: '接続詞 if / when の「時・条件の副詞節」と though / so',
        body: '・「もし明日雨が降ったら（条件）」「彼が到着したら（時）」を表す副詞節の中では、未来のことでも will を使わず {{現在形}} にする（例：If it {{rains}} tomorrow, I will stay home.）！ ※ただし「明日晴れるかどうか（{{名詞節：〜かどうか}}）」の if は未来なので {{will}} を使う！\n・英語では {{because}} と {{so}}、{{though (although)}} と {{but}} を1文の中で同時に重ねて使うことはできない！',
      },
      {
        heading: '第4文型（SVOO）の to / for 書き換えと第5文型（SVOC）',
        body: '・give / show / tell / teach / send / lend ＋人＋物 ⇔ 物＋ {{to}} ＋人（相手がいないと成り立たない動作）！\n・buy / make / cook / get / find ＋人＋物 ⇔ 物＋ {{for}} ＋人（1人でもできる動作）！\n・第5文型 SVOC：call A B（AをBと呼ぶ）、name A B、keep A ＋形容詞、そして最頻出 {{make ＋ A ＋ 形容詞}}（Aを〜な状態にする：News made me {{happy}}.）！',
        table: {
          headers: ['文型・動詞', '語順パターン', '書き換え・鉄則'],
          rows: [
            ['SVOO（to型）', 'give / show / tell / teach / lend 人 物', '物 to 人（方向矢印 → のイメージ）'],
            ['SVOO（for型）', 'buy / make / cook / find / get 人 物', '物 for 人（〜のために ♥ のイメージ）'],
            ['SVOC（状態変化）', 'make / keep / leave + O + 形容詞', '副詞 happily にしない！（形容詞 happy を使う）'],
          ],
        },
      },
    ],
  },
  {
    id: 'print_en_3',
    subject: 'english',
    group: '基礎文法（中1・中2）',
    badge: '英語プリント③',
    title: '不定詞・動名詞（MEGAFEPS）・原級/比較級/最上級の完全攻略',
    subtitle: '整序問題・適語選択の王道パターンと引っかけ完全対策',
    stars: 5,
    linkedChapterId: 'en1_2',
    items: [
      {
        heading: '不定詞3用法・疑問詞＋to・It is ... for 人 to ~',
        body: '・不定詞は ①名詞的用法「{{〜すること}}」、②副詞的用法「{{〜するために}} / 〜して（感情の原因）」、③形容詞的用法「{{〜するための…}}（something cold {{to drink}} の語順に注意！）」の3つ。\n・「何をすべきか」＝ {{what to do}}、「〜への行き方・方法」＝ {{how to}} get to ~（※ why to ~ という形は存在しない！）。\n・形式主語構文は {{It is ＋形容詞＋ (for 人) ＋ to 原形}}！ 人の性質を表す kind / nice / clever のときだけ for ではなく {{of}} 人になる！',
      },
      {
        heading: '動名詞のみを目的語にとる動詞（MEGAFEPS）と意味変化動詞',
        body: 'mind / enjoy / give up / avoid / {{finish}} / escape / {{practice}} / {{stop}} の後ろは必ず {{動名詞（-ing）}}！ また前置詞の後ろ（thank you for {{helping}} / look forward {{to seeing}} / be good {{at speaking}} / without {{saying}}）もすべて動名詞！',
        table: {
          headers: ['動詞', '後ろが ~ing の意味', '後ろが to 原形 の意味'],
          rows: [
            ['stop', '〜するのをやめる（過去〜現在の動作中断）', '〜するために立ち止まる（副詞的用法の目的！）'],
            ['remember', '（過去に）〜したことを覚えている', '忘れずに（これから）〜する'],
            ['forget', '（過去に）〜したことを忘れる', '（これから）〜するのを忘れる'],
            ['try', '試しに〜してみる', '〜しようと努める・努力する'],
          ],
        },
      },
      {
        heading: '原級・比較級・最上級の書き換え＆強調表現',
        body: '・倍数表現「Aの3倍の大きさ」＝ {{three times as large as A}} ／ 「Aほど〜ではない」＝ {{not as (so) 原級 as A}}（Aの方が上！）。\n・比較級の強調「ずっと〜」＝ {{much / a lot / far / even}} ＋比較級（※ {{very}} は絶対不可！）。「だんだん〜」＝ {{比較級 and 比較級}}（more and more popular）。\n・「最も〜なものの1つ」＝ {{one of the ＋最上級＋複数名詞}}！ 最上級を原級・比較級で書き換える {{No other 単数名詞}} ... as ~ as A / A is 比較級 than {{any other 単数名詞}} も単数名詞になる点に要注意！',
      },
    ],
  },
  {
    id: 'print_en_4',
    subject: 'english',
    group: '発展構文（中3）',
    badge: '英語プリント④',
    title: '受動態（by以外の熟語）・現在完了3用法・現在完了進行形・使役/知覚',
    subtitle: '中3前半〜後半で最も書き換え・正誤判定に出る単元',
    stars: 5,
    linkedChapterId: 'en2_1',
    items: [
      {
        heading: '受動態の基本と「by 以外の前置詞」を使う超重要熟語',
        body: '受動態は {{be動詞 ＋ 過去分詞}}。助動詞があるときは {{助動詞 ＋ be ＋ 過去分詞}}（This book can {{be read}} easily.）。さらに「〜に知られている」＝ {{be known to}} ~、「〜に覆われている」＝ {{be covered with}} ~、「〜に興味がある」＝ {{be interested in}} ~、「〜に驚く」＝ {{be surprised at}} ~！\n・材料の識別：見た目で原料がわかる（木製の机など）＝ {{be made of}} ／ 化学変化して見た目でわからない（ぶどう→ワイン、牛乳→チーズ）＝ {{be made from}}！',
      },
      {
        heading: '現在完了形（継続・経験・完了）と現在完了進行形',
        body: '・継続「ずっと〜している」：{{for ＋期間}}（for five years）と {{since ＋起点}}（since 2022 / since I was ten）を使い分ける。動作動詞（rain / study / wait / play）の継続は現在完了進行形 {{have (has) been ~ing}}！\n・経験「〜へ行ったことがある」＝ {{have been to}} ~（※ have gone to は「行ってしまって今ここにいない」なので I や You 主語では使えない！）。\n・完了・結果：just / already（肯定文）、{{yet}}（疑問文「もう」・否定文「まだ」）。',
        tip: 'スタフリ鉄則：When ~? や ~ ago, yesterday, last week がある文では絶対に現在完了形（have + 過去分詞）を選ばない！',
      },
      {
        heading: '使役動詞 make / let / help と知覚動詞 see / hear / feel',
        body: '・「Aに無理やり〜させる」＝ {{make ＋ 人 ＋ 原形不定詞}}、「Aが〜するのを許す・させる」＝ {{let ＋ 人 ＋ 原形}}（Let me {{show}} you!）、「Aが〜するのを手伝う」＝ {{help ＋ 人 ＋ (to) 原形}}。\n・「Aが〜しているのを見る・聞く」＝ see / hear / watch ＋ O ＋ {{現在分詞（-ing）}}、「最初から最後まで〜するのを見る」＝ ＋ {{原形不定詞}}！',
      },
    ],
  },
  {
    id: 'print_en_5',
    subject: 'english',
    group: '発展構文（中3）',
    badge: '英語プリント⑤',
    title: '分詞の後置修飾・関係代名詞（主格/目的格/whose）・間接疑問・仮定法',
    subtitle: '長文の長い主語を1秒で見抜く構造把握と中3クライマックス文法',
    stars: 5,
    linkedChapterId: 'en2_2',
    items: [
      {
        heading: '現在分詞（-ing）と過去分詞の後置修飾の見分け方',
        body: '修飾される名詞と分詞の間に「主語・述語」の関係をつくって判定！\n・the boy {{running}} in the park（少年が「走っている」＝能動・進行 → {{-ing}}）\n・a book {{written}} in easy English（本が英語で「書かれた」＝受動 → {{過去分詞}}）\n※ 1語だけなら名詞の前（a {{broken}} window / a {{sleeping}} baby）、2語以上のカタマリなら必ず名詞の{{後ろ}}に置く！',
      },
      {
        heading: '関係代名詞の完全判別（who / which / that / whose / 省略）',
        body: '空欄の【前の名詞（先行詞）】と【後ろの文の欠け】を見る！\n① 直後に動詞 V が続く ＝ {{主格}}（人なら {{who / that}}、物なら {{which / that}}）。先行詞の単複に動詞を一致させる！\n② 直後に S + V が続き目的語が欠けている ＝ {{目的格}}（{{省略可能}}！ 名詞＋S＋V を見たら接触節！）。\n③ 直後に無冠詞の名詞が続き「〜の…」とつながる ＝ 所有格 {{whose}}（人にも物にも使える：a house {{whose}} roof is red）！',
        table: {
          headers: ['先行詞', '主格（＋V）', '目的格（＋S V / 省略可）', '所有格（＋名詞）'],
          rows: [
            ['人', 'who / that', 'who(m) / that / 省略', 'whose'],
            ['物・動物', 'which / that', 'which / that / 省略', 'whose'],
            ['最上級・序数・only・all・人＋動物', 'that を優先', 'that / 省略', '—'],
          ],
        },
      },
      {
        heading: '間接疑問文の語順・too ~ to / enough to・仮定法過去',
        body: '・間接疑問文は文の途中に入るので必ず「{{疑問詞 ＋ 主語 ＋ 動詞}}」の肯定文語順（Do you know {{where he lives}}? ※ × where does he live / ※ Do you think のときは疑問詞が文頭に出て {{Who do you think}} he is?）！\n・so 形容詞 that S can\'t ~ ⇔ {{too 形容詞 (for 人) to 原形}}（「…すぎて〜できない」） ／ so 形容詞 that S can ~ ⇔ {{形容詞 enough (for 人) to 原形}}（enough の位置は形容詞の後ろ！）。\n・現在の事実に反する仮定（仮定法過去）：{{If ＋ S ＋ 過去形（be動詞は were）, S ＋ would [could] ＋ 動詞の原形}} ／ {{I wish ＋ S ＋ 過去形}}（「〜ならいいのに」）。',
      },
    ],
  },
  {
    id: 'print_en_6',
    subject: 'english',
    group: '英作文・読解・リスニング',
    badge: '英語プリント⑥（英作文①）',
    title: '英作文対策プリント完全収録①：採点基準・「尋ねる9型」「伝える12型」',
    subtitle: '三重県後期選抜＆全国公立の対話補充・Eメール・スピーチ原稿完全対応',
    stars: 5,
    linkedChapterId: 'en3_1',
    items: [
      {
        heading: '公立入試の英作文・採点基準のリアル（1文2点の減点ルール）',
        body: '採点基準では、①「大文字・小文字」「符号（{{.}} や {{?}}）」のミスで {{1点減点}}、②「つづり・文法・語法」のミスで {{1点減点}}！ 両方やると内容が合っていても {{0点}} になる。短縮形（I\'m / don\'t 等）は原則 {{1語}} として数え、コンマやピリオドは語数に入れない！',
      },
      {
        heading: '「〜と尋ねるとき」必勝9型 ＆「〜と伝える／〜ということ」必勝12型',
        body: '・「〜ということ」を英語にする問題では文頭に {{that を書かない}}！ 内容だけを完全な1文（S + V ... .）で書くのが鉄則！\n・尋ねる文の末尾は必ず {{?}}、伝える文・原稿の末尾は必ず {{.}} にする！',
        table: {
          headers: ['日本語の指示', 'そのまま使える鉄板英語テンプレート'],
          rows: [
            ['〜したことがあるかと尋ねる', 'Have you ever ＋過去分詞 〜?（例：Have you ever climbed Mt. Fuji?）'],
            ['日本に来てどれくらいか尋ねる', 'How long have you been in Japan?'],
            ['いちばん好きな〜は何か尋ねる', 'What ＋名詞＋ do you like the best? / What is your favorite 〜?'],
            ['〜しないかと誘う／頼む', 'Why don\'t we 原形 〜? / Shall we 原形 〜? / Could [Will] you 原形 〜?'],
            ['私の町には〜があると伝える', 'There is [are] 〜 in my town. / My town has 〜.'],
            ['〜することは…だと伝える', 'It is ＋形容詞＋ (for me) to 原形 〜.'],
            ['（人）に〜してほしいと伝える', 'I want ＋人＋ to 原形 〜.'],
            ['〜を楽しみにしているということ', 'I am looking forward to ~ing.（例：seeing you soon）'],
          ],
        },
      },
      {
        heading: '自由英作文（意見論述30〜50語・都立3文メール）の黄金構成',
        body: '意見論述は ①主張：{{I think (that) S + V.}} → ②理由1：{{First}}, S + V ... . → ③具体例または理由2：{{For example / Second}}, S + V ... . の3文構成で語数と論理が一発で整う！',
        tip: '画面上部の「英作文道場を開く」から、プリント収録の基礎ドリル・誤文訂正10問・予想問題6回分（Haruto〜Rin）を実際に書いて自動添削できます！',
      },
    ],
  },
  {
    id: 'print_en_7',
    subject: 'english',
    group: '英作文・読解・リスニング',
    badge: '英語プリント⑦（英作文②・長文）',
    title: '減点ゼロの言い換え術・頻出誤文訂正10選・長文＆リスニング裏ワザ',
    subtitle: '書けない日本語を中学英語に変換する技術とスタフリ流長文・聞き取り術',
    stars: 5,
    linkedChapterId: 'en4_1',
    items: [
      {
        heading: '書けない漢語を中1・中2英語に崩す「減点ゼロの言い換え」',
        body: '・「便利だ」（× convenience）→ {{useful}} / {{easy to use}}\n・「私は〜するのが楽しい」（× I am fun）→ {{I enjoy ~ing.}} / {{It is fun for me to ~.}}\n・「伝統的な料理」（traditional が不安なら）→ {{popular old Japanese food}}\n・「いい思い出ができた」（× make good memory）→ {{We made many good memories.}} / {{We had a great time.}}\n・「彼は走るのが速い選手だ」→ {{He runs very fast.}} / {{He is a fast runner.}}',
      },
      {
        heading: '英作文プリント収録・頻出ミス誤文訂正トップ10',
        body: '① My brother {{plays}} soccer every day.（三単現s）\n② last {{Sunday}} / {{Japanese}} food（曜日・月・国名・言語は大文字！）\n③ × I have visited Kyoto last year. → ○ {{I visited Kyoto last year.}}（last year に現在完了不可）\n④ There {{are}} many books（複数主語）\n⑤ {{Are}} you interested in ~?（be interested in）\n⑥ enjoyed {{swimming}}（mを重ねて-ing）\n⑦ a girl who {{lives}} near my house（単数先行詞に三単現s）！',
      },
      {
        heading: 'スタフリ流・長文読解「設問先読み」とリスニング「計算・メモ鉄則」',
        body: '・長文は本文を読む前に {{設問の疑問詞（Why / What / How）と固有名詞・数字}} に印をつけ、段落ごとに答えを探しながら読む（設問の順番＝本文の順番）！\n・内容一致4択は「{{all / every / never / only / no}}」など極端な断定語を含む選択肢が誤答になりやすい！\n・リスニングは放送前の下読み15秒で「選択肢の違い（時刻・場所・値段・動作）」に線を引く。割引計算（20% off / buy two, get one free）や時刻の逆算（leave 15 minutes before 10:00 → {{9:45}}）は余白に数字メモを取る！',
      },
    ],
  },
];
