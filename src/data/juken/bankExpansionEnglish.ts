import type { ChapterExpansionSpec } from './problemHelpers';

export const ENGLISH_BANK_EXPANSION: Record<string, ChapterExpansionSpec> = {
  "en1_1": {
    "practice": [
      {
        "id": "en1_1_exp_p1",
        "title": "時制・不規則動詞・助動詞・疑問詞の網羅実戦演習",
        "category": "時制・助動詞",
        "leadText": "全国の公立入試小問から、不規則動詞の過去形・未来表現・助動詞の使い分け・疑問詞応答の典型パターンを網羅演習します。",
        "explanationSummary": "過去副詞（last night / ~ ago / yesterday）があれば必ず過去形、未来副詞（next ~ / tomorrow）があれば will または be going to を選びます。また How far（距離）・How old（年齢）・Whose（誰のもの）の応答一致を確実に押さえましょう。",
        "surroundingKnowledge": [
          "hurt - hurt - hurt（傷つける・痛む）／ cut - cut - cut ／ cost - cost - cost は現在・過去・過去分詞がすべて同形！",
          "teach - taught - taught と catch - caught - caught は augh、buy - bought と bring - brought は ough！"
        ],
        "deepDiveTopics": [
          "may（推量：〜かもしれない ／ 許可：〜してもよい）の文脈判定"
        ],
        "questions": [
          {
            "prompt": "My brother (　　) his knee during the soccer game yesterday afternoon.",
            "choices": [
              "hurt",
              "hurts",
              "is hurting",
              "has hurt"
            ],
            "why": "yesterday afternoon という明確な過去の時を表す語句があるため過去形にします。hurt は原形・過去形・過去分詞がすべて hurt で同形なので、三人称単数でも hurts にはなりません。",
            "oneLine": "yesterday があるので過去形！ hurt の過去形は hurt（-s をつけない）！",
            "skill": "不規則動詞の過去形",
            "rate": 66,
            "difficulty": 3,
            "wrongReasons": [
              "三単現の現在形であり過去の語句と合わない。",
              "現在進行形であり昨日の出来事には使えない。",
              "現在完了形は yesterday と一緒に使えない。"
            ]
          },
          {
            "prompt": "A: (　　) umbrella is this by the door? — B: It's Yuki's.",
            "choices": [
              "Whose",
              "Who",
              "Which",
              "Whom"
            ],
            "why": "Bが「ユキのものです（所有）」と答えており、直後に名詞 umbrella があるため所有格の疑問詞 Whose（誰の〜）が正解です。",
            "oneLine": "Whose ＋ 名詞 ＝「誰の〜」（返答は 人's / mine / yours）！",
            "skill": "疑問詞 Whose",
            "rate": 81,
            "difficulty": 3,
            "wrongReasons": [
              "Who の直後に名詞 umbrella を置いて所有を表すことはできない。",
              "Which umbrella なら「どちらの傘（青い傘など）」と特定する返答になる。",
              "Whom は目的格（誰を・誰に）であり名詞を修飾しない。"
            ]
          },
          {
            "prompt": "A: Look at those dark clouds! It (　　) rain very soon. — B: Let's hurry home.",
            "choices": [
              "is going to",
              "was",
              "did",
              "had"
            ],
            "why": "目の前の黒い雲という根拠から「もうすぐ雨が降りそうだ」と近い未来を予測しているため be going to ＋原形 が正解です。",
            "oneLine": "目の前の兆候からの未来予測 ＝ be going to ＋動詞の原形！",
            "skill": "未来表現",
            "rate": 78,
            "difficulty": 3,
            "wrongReasons": [
              "was の後ろに動詞の原形 rain は置けない。",
              "did rain は過去の強調になり very soon と矛盾する。",
              "had の後ろに原形 rain は置けない。"
            ]
          },
          {
            "prompt": "Ms. Brown (　　) us English when we were in the seventh grade.",
            "choices": [
              "taught",
              "teaches",
              "has taught",
              "teaching"
            ],
            "why": "when we were in the seventh grade（私たちが中学1年生だったとき）という過去の時を表す節があるため、teach の過去形 taught が正解です。",
            "oneLine": "when 節が過去形 were なので主節も過去形 taught！",
            "skill": "過去形と時制の一致",
            "rate": 79,
            "difficulty": 3,
            "wrongReasons": [
              "三単現の現在形であり、過去の when 節と時制が一致しない。",
              "現在完了形は when we were ~ のような過去の特定の時を表す節とは共起できない。",
              "進行形の分詞だけでは文の述語動詞になれない（be動詞もない）。"
            ]
          },
          {
            "prompt": "A: (　　) is it from this bus stop to the city museum? — B: About three kilometers.",
            "choices": [
              "How far",
              "How long",
              "How many",
              "How high"
            ],
            "why": "Bが About three kilometers.（約3キロメートル）と距離を答えているため、距離を尋ねる How far is it from A to B? が正解です。",
            "oneLine": "距離（〜 kilometers）を尋ねる表現 ＝ How far is it from A to B?",
            "skill": "疑問詞 How far",
            "rate": 80,
            "difficulty": 3,
            "wrongReasons": [
              "How long は所要時間や期間（About twenty minutes. 等）を尋ねる表現。",
              "How many の直後には複数名詞が必要で is it とは続かない。",
              "How high は山や建物の高さを尋ねる表現であり距離には使わない。"
            ]
          },
          {
            "prompt": "You (　　) use a dictionary during this English test. Please put it in your bag.",
            "choices": [
              "must not",
              "don't have to",
              "would like to",
              "were able to"
            ],
            "why": "後半で「かばんにしまってください」と指示しているため、テスト中の辞書使用を強く禁止する must not（〜してはいけない）が正解です。",
            "oneLine": "テスト中の禁止ルール ＝ must not ＋動詞の原形！",
            "skill": "助動詞（禁止）",
            "rate": 83,
            "difficulty": 3,
            "wrongReasons": [
              "don't have to は「〜しなくてもよい（不必要）」になり、テスト中の禁止ルールにならない。",
              "would like to は「〜したい」という願望で命令・禁止の文脈に合わない。",
              "were able to は「〜できた」という過去形で現在の指示に合わない。"
            ]
          },
          {
            "prompt": "A: Could you open the window, Ken? It's hot in here. — B: (　　)",
            "choices": [
              "Sure, no problem.",
              "Yes, thank you.",
              "No, I don't.",
              "That's right."
            ],
            "why": "Could you ~?（〜していただけませんか）という依頼に対する快諾の返答として Sure, no problem.（いいですよ、問題ありません）が最も自然です。",
            "oneLine": "Could [Will] you ~?（依頼）への快諾 ＝ Sure. / Certainly. / All right.",
            "skill": "助動詞の対話応答",
            "rate": 82,
            "difficulty": 3,
            "wrongReasons": [
              "依頼に対して Yes, thank you. は「頼まれた側がお礼を言う」不自然な応答になる。",
              "Could you ~? に No, I don't. と一般動詞現在形で答えることはできない。",
              "That's right.（その通りです）は事実への同意であり依頼への返答にならない。"
            ]
          },
          {
            "prompt": "Take your coat with you. It (　　) get cold tonight.",
            "choices": [
              "may",
              "does",
              "is",
              "has"
            ],
            "why": "「コートを持っていきなさい。今夜は寒くなるかもしれないよ」という未来の推量を表す助動詞 may（〜かもしれない）が正解です。",
            "oneLine": "推量「〜かもしれない」＝ may ＋動詞の原形！",
            "skill": "助動詞 may",
            "rate": 77,
            "difficulty": 3,
            "wrongReasons": [
              "does get は強調表現になり「今夜寒くなるかもしれない」という推量を表せない。",
              "is の直後に動詞の原形 get を置くことはできない。",
              "has の直後に動詞の原形 get は置けない（過去分詞が必要）。"
            ]
          },
          {
            "prompt": "A: (　　) does it take from this station to the airport by bus? — B: About forty minutes.",
            "choices": [
              "How long",
              "How far",
              "How often",
              "How many"
            ],
            "why": "返答が About forty minutes（所要時間）なので、期間・所要時間を尋ねる How long が正解です（距離なら How far、頻度なら How often）。",
            "oneLine": "所要時間（〜 minutes / hours）を尋ねる疑問詞 ＝ 【How long】！",
            "skill": "疑問詞 How long",
            "rate": 86,
            "difficulty": 2,
            "wrongReasons": [
              "距離を尋ねる表現。",
              "頻度を尋ねる表現。",
              "数を尋ねる表現。"
            ]
          },
          {
            "prompt": "You (　　) touch that old painting in the museum. Look at the sign over there.",
            "choices": [
              "must not",
              "don't have to",
              "would like to",
              "were able to"
            ],
            "why": "美術館の注意書きを指して「触ってはいけない（禁止）」と伝えている場面なので must not が正解です。don't have to は「〜しなくてよい（不必要）」です。",
            "oneLine": "must not ＝【〜してはいけない（禁止）】 ⇔ don't have to ＝【〜しなくてよい（不必要）】！",
            "skill": "助動詞 must not と don't have to",
            "rate": 78,
            "difficulty": 2,
            "wrongReasons": [
              "「触る必要はない」という意味になる。",
              "「触りたい」は不適切。",
              "「触ることができた」は不適切。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en1_1_exp_m1",
        "title": "時制・疑問詞・助動詞 スピード実戦チェック②",
        "category": "時制・助動詞",
        "leadText": "入試本番の小問を想定し、1問20秒以内で正確に即答しましょう。",
        "explanationSummary": "過去進行形（was/were ~ing）・had better not・時刻や日付を尋ねる疑問詞の3題です。",
        "surroundingKnowledge": [
          "had better の否定は had not better ではなく had better not ＋原形！"
        ],
        "deepDiveTopics": [
          "過去のある時点で進行中だった動作（過去進行形）"
        ],
        "questions": [
          {
            "prompt": "What (　　) you doing when I called you at eight last night?",
            "choices": [
              "were",
              "did",
              "are",
              "have"
            ],
            "why": "「昨夜8時に電話したとき、何をしていましたか」と過去の特定時点で進行中だった動作を尋ねる過去進行形 What were you doing ~? が正解です。",
            "oneLine": "過去の1点（at eight last night）で進行中 ＝ 過去進行形 were ~ing！",
            "skill": "過去進行形",
            "rate": 75,
            "difficulty": 3,
            "wrongReasons": [
              "did の後ろに現在分詞 doing を置くことはできない（原形 do が必要）。",
              "are は現在進行形であり last night（昨夜）と時制が矛盾する。",
              "have の後ろは過去分詞 done になり、かつ last night とは一緒に使えない。"
            ]
          },
          {
            "prompt": "You look pale. You (　　) stay up late tonight.",
            "choices": [
              "had better not",
              "don't had better",
              "had not to",
              "better not to"
            ],
            "why": "「顔色が悪いね。今夜は夜更かししないほうがよい」という意味で、had better の否定形 had better not ＋動詞の原形 が正解です。",
            "oneLine": "「〜しないほうがよい」の語順 ＝ had better not ＋原形！",
            "skill": "助動詞的表現 had better",
            "rate": 62,
            "difficulty": 4,
            "wrongReasons": [
              "had better は1つの助動詞相当語句なので don't を前につける否定形は存在しない。",
              "had not to という語順は誤り（過去不必要なら didn't have to）。",
              "主語の直後に動詞のない better not to を置くことはできない。"
            ]
          },
          {
            "prompt": "A: (　　) is your sister's birthday? — B: It's October 12th.",
            "choices": [
              "When",
              "What time",
              "How old",
              "Where"
            ],
            "why": "月日（10月12日）を尋ねているため When が正解です。What time は時刻（7時30分など）を聞くときに使います。",
            "oneLine": "日付・曜日・時期を尋ねる疑問詞 ＝ When！",
            "skill": "疑問詞 When",
            "rate": 88,
            "difficulty": 3,
            "wrongReasons": [
              "What time は時刻（7:30など）を尋ねる表現で、月日（10月12日）には使わない。",
              "How old は年齢を尋ねる表現。",
              "Where は場所を尋ねる表現。"
            ]
          }
        ]
      }
    ]
  },
  "en1_2": {
    "practice": [
      {
        "id": "en1_2_exp_p1",
        "title": "不定詞・動名詞・接続詞・比較の網羅実戦演習",
        "category": "不定詞・動名詞・比較",
        "leadText": "不定詞の形容詞的用法（前置詞落ち注意）・動名詞の慣用表現・比較の倍数/強調/書き換えを完全制覇します。",
        "explanationSummary": "a chair to sit on / a pen to write with のような前置詞の残し方、look forward to ~ing、比較級強調の much/far、as ~ as possible（＝as ~ as S can）は毎年全国で繰り返し出題されます。",
        "surroundingKnowledge": [
          "be worth ~ing（〜する価値がある）／ feel like ~ing（〜したい気がする）／ cannot help ~ing（〜せずにはいられない）",
          "the ＋比較級 S V, the ＋比較級 S V（〜すればするほど、ますます…）※上位校・私立対策"
        ],
        "deepDiveTopics": [
          "不定詞の形容詞的用法で末尾に前置詞が必要なパターン"
        ],
        "questions": [
          {
            "prompt": "I have no pen to write (　　). Could you lend me one?",
            "choices": [
              "with",
              "on",
              "in",
              "about"
            ],
            "why": "「書くためのペン」は write a letter with a pen（ペンを使って書く）の関係になるため、不定詞の後ろに道具の with が必要です。paper（紙）なら write on になります。",
            "oneLine": "a pen to write with（ペンで書く）／ paper to write on（紙の上に書く）！",
            "skill": "不定詞（形容詞的用法＋前置詞）",
            "rate": 55,
            "difficulty": 4,
            "wrongReasons": [
              "write on ~ は「（紙などの上に）書く」であり、a pen（道具）には on ではなく with を使う。",
              "write in ~ は「（インク・鉛筆・英語などの言語・材料で）書く」ときに使う表現。",
              "write about ~ は「〜について書く」になり、ペンが話題になってしまう。"
            ]
          },
          {
            "prompt": "All of us are looking forward to (　　) your hometown next month.",
            "choices": [
              "visiting",
              "visit",
              "visited",
              "be visited"
            ],
            "why": "look forward to ~（〜を楽しみに待つ）の to は不定詞ではなく【前置詞】なので、後ろには名詞または動名詞（visiting）が続きます。",
            "oneLine": "look forward to ＋ 動名詞（~ing）＝「〜するのを楽しみにしている」！",
            "skill": "動名詞（前置詞 to）",
            "rate": 63,
            "difficulty": 4,
            "wrongReasons": [
              "look forward to の to は前置詞なので動詞の原形 visit は置けない！",
              "過去形・過去分詞 visited は前置詞 to の目的語になれない。",
              "「訪れる」側なので受動態にする必要はなく、前置詞の後ろに原形 be も置けない。"
            ]
          },
          {
            "prompt": "Hokkaido is (　　) larger than Shikoku.",
            "choices": [
              "much",
              "very",
              "more",
              "most"
            ],
            "why": "比較級 larger を強めて「ずっと大きい」と言うときは much / a lot / far / even を使います。very は原級しか修飾できません。",
            "oneLine": "比較級の強調「ずっと〜」＝ much [far / a lot] ＋比較級（× very は不可）！",
            "skill": "比較級の強調",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "very は原級（large）しか修飾できず、比較級 larger の前には置けない最頻出の罠！",
              "larger はすでに -er がついた比較級なので more を重ねる二重比較は誤り。",
              "most は最上級をつくる語であり than がある比較級の文には使えない。"
            ]
          },
          {
            "prompt": "Please run as fast as you (　　) to catch the first bus.",
            "choices": [
              "can",
              "possible",
              "could",
              "will"
            ],
            "why": "「できるだけ速く」は as fast as possible または主語＋can を使った as fast as you can で表します（過去文なら could）。ここは命令文（現在）なので can です。",
            "oneLine": "as 原級 as possible ⇔ as 原級 as 主語 ＋ can [could]！",
            "skill": "原級慣用表現",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "as ~ as possible なら正しいが、主語 you があるのに as you possible とは言えない。",
              "命令文（現在）なので過去形の could ではなく現在形の can に揃える。",
              "能力の「できるだけ」を表す慣用句では will ではなく can を用いる。"
            ]
          },
          {
            "prompt": "My father went to the bookstore (　　) a travel magazine.",
            "choices": [
              "to buy",
              "buying",
              "for buying",
              "bought"
            ],
            "why": "「旅行雑誌を買うために書店へ行った」という目的を表す不定詞の副詞的用法 to buy が正解です（目的を for ~ing で表すことは原則しません）。",
            "oneLine": "動作の目的「〜するために」＝ to ＋動詞の原形！",
            "skill": "不定詞（副詞的用法）",
            "rate": 81,
            "difficulty": 3,
            "wrongReasons": [
              "go ~ing（買い物に行く等）以外の一般動作で「〜するために行った」を buying だけでは表せない。",
              "目的「〜するために」を for ~ing で表すのは誤り（用途の説明にしか使えない）。",
              "過去形 bought を動詞 went と並べることはできない。"
            ]
          },
          {
            "prompt": "(　　) my grandfather is seventy-five years old, he swims every morning.",
            "choices": [
              "Although",
              "Because",
              "So",
              "Unless"
            ],
            "why": "「祖父は75歳だけれども、毎朝泳いでいる」と逆接の譲歩を表す接続詞 Although（＝Though）が正解です。",
            "oneLine": "逆接「〜だけれども」＝ Although [Though] ＋ S ＋ V！",
            "skill": "接続詞（譲歩）",
            "rate": 78,
            "difficulty": 3,
            "wrongReasons": [
              "Because にすると「75歳だから毎朝泳いでいる」と因果が逆になってしまう。",
              "So は「だから」という順接で文頭で従属節をつくる使い方はしない。",
              "Unless は「〜でない限り」という条件であり文意が通らない。"
            ]
          },
          {
            "prompt": "Lake Biwa is larger than (　　) in Japan.",
            "choices": [
              "any other lake",
              "all the lakes",
              "any lakes",
              "no other lake"
            ],
            "why": "最上級 the largest lake in Japan を比較級で書き換える定型表現は larger than any other ＋【単数名詞】（他のどの湖よりも大きい）です。",
            "oneLine": "最上級の書き換え ＝ 比較級 ＋ than any other ＋ 単数名詞！",
            "skill": "比較（最上級の書き換え）",
            "rate": 61,
            "difficulty": 4,
            "wrongReasons": [
              "all the lakes にすると琵琶湖自身も含まれてしまい「自分より大きい」という矛盾が生じる。",
              "any other の後ろは【単数名詞】にする鉄則があり、複数形 lakes は不可。",
              "no other lake を than の後ろに置くと「どの湖よりも大きくない」と逆の意味になる。"
            ]
          },
          {
            "prompt": "Thank you very much for (　　) me with my science report.",
            "choices": [
              "helping",
              "help",
              "to help",
              "helped"
            ],
            "why": "前置詞 for の後ろには動名詞（-ing）を置くため helping が正解です。help 人 with 物（人の〜を手伝う）の形も重要です。",
            "oneLine": "前置詞（for / without / before / after / by）の直後は必ず動名詞 -ing！",
            "skill": "前置詞＋動名詞",
            "rate": 85,
            "difficulty": 3,
            "wrongReasons": [
              "前置詞 for の後ろに動詞の原形 help をそのまま置くことはできない。",
              "前置詞 for の直後に to 不定詞を続けることはできない。",
              "過去形・過去分詞 helped は前置詞の目的語になれない。"
            ]
          },
          {
            "prompt": "My sister went to the library (　　) borrow some books about Japanese history.",
            "choices": [
              "to",
              "for",
              "with",
              "by"
            ],
            "why": "動詞の原形 borrow が直後に続いているため、「〜するために」という副詞的用法の不定詞 to borrow にします。",
            "oneLine": "to ＋ 動詞の原形 ＝【〜するために】（副詞的用法の不定詞）！",
            "skill": "不定詞の副詞的用法",
            "rate": 88,
            "difficulty": 1,
            "wrongReasons": [
              "for の後ろに動詞の原形は置けない。",
              "前置詞 with の後ろは名詞。",
              "前置詞 by の後ろは名詞・動名詞。"
            ]
          },
          {
            "prompt": "Ken stopped (　　) video games at ten o'clock and went to bed early.",
            "choices": [
              "playing",
              "to play",
              "played",
              "plays"
            ],
            "why": "「テレビゲームをすることをやめた」は stop ~ing（動名詞）で表します。stop to do は「〜するために立ち止まる」です。",
            "oneLine": "stop ~ing ＝【〜することをやめる】 ⇔ stop to V ＝【〜するために立ち止まる】！",
            "skill": "動名詞と不定詞の意味変化",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "「ゲームをするために立ち止まった」という意味になる。",
              "過去形は続けられない。",
              "三単現は続けられない。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en1_2_exp_m1",
        "title": "不定詞・動名詞・比較 スピード実戦チェック②",
        "category": "不定詞・動名詞・比較",
        "leadText": "頻出の too ~ to 構文・疑問詞＋to・好きの比較（like A better than B）を素早く判定しましょう。",
        "explanationSummary": "too 形容詞 to 原形（〜すぎて…できない）⇔ so 形容詞 that S can't 原形 の書き換えは超定番です。",
        "surroundingKnowledge": [
          "enough の語順は【形容詞＋enough＋to 原形】（rich enough to buy / old enough to go）！"
        ],
        "deepDiveTopics": [
          "too ~ to ... と enough to ... の書き換え"
        ],
        "questions": [
          {
            "prompt": "This box was too heavy for me (　　) alone.",
            "choices": [
              "to carry",
              "carrying",
              "carried",
              "that I carried"
            ],
            "why": "too ＋形容詞＋ (for 人) ＋ to 原形 で「（人にとって）〜すぎて…できない」を表します。",
            "oneLine": "too ＋ 形容詞 ＋ for A ＋ to 原形 ＝「Aにとって〜すぎて…できない」！",
            "skill": "too ~ to 構文",
            "rate": 77,
            "difficulty": 3,
            "wrongReasons": [
              "too ~ to 原形 の構文なので動名詞 carrying は不可。",
              "過去分詞 carried では「運ぶには重すぎた」の不定詞構文にならない。",
              "so heavy that I couldn't carry it なら正しいが too ~ that とは言えない。"
            ]
          },
          {
            "prompt": "I didn't know (　　) to get off the train, so I asked the station staff.",
            "choices": [
              "where",
              "what",
              "who",
              "why"
            ],
            "why": "get off the train（電車を降りる）とつながり「どこで電車を降りるべきか」となる疑問詞＋to不定詞 where to get off が正解です。",
            "oneLine": "where to ＋原形 ＝「どこで（どこへ）〜すべきか」！",
            "skill": "疑問詞＋to不定詞",
            "rate": 79,
            "difficulty": 3,
            "wrongReasons": [
              "get off は自動詞句で後ろに the train があるため目的語をとる what は入らない。",
              "「誰が降りるか」ではなく主語 I が「どこで降りるか」なので who は不適。",
              "駅員に尋ねて解決するのは「理由（why）」ではなく「降車駅（where）」である。"
            ]
          },
          {
            "prompt": "A: Which season do you like (　　), spring or autumn? — B: I like autumn better.",
            "choices": [
              "better",
              "best",
              "well",
              "more"
            ],
            "why": "spring or autumn と【2つ】の季節を比べているため、well の比較級 better を用います（3つ以上なら the best）。",
            "oneLine": "2者比較は比較級 better、3者以上は最上級 the best！",
            "skill": "比較級と最上級の使い分け",
            "rate": 80,
            "difficulty": 3,
            "wrongReasons": [
              "best は3つ以上を比べるときに使い、2択（A or B）では比較級 better を使う。",
              "比較の疑問文 Which ~ or ~? で原級の well は使えない。",
              "like ~ better が熟語であり、単独で like ~ more とは言わない（better を使う）。"
            ]
          }
        ]
      }
    ]
  },
  "en1_3": {
    "practice": [
      {
        "id": "en1_3_exp_p1",
        "title": "文型（SVOO/SVOC）・There構文・代名詞（one/it/another）網羅演習",
        "category": "文型・代名詞",
        "leadText": "整序・適語補充で差がつく第4・第5文型、不定代名詞（one / it / another / the other）、感嘆文を徹底演習します。",
        "explanationSummary": "2つのうち「1つは one、残りのもう1つは the other」、不特定の「もう1つは another」！ また SVOC の C には副詞ではなく形容詞・名詞を置きます。",
        "surroundingKnowledge": [
          "2つのとき：one ... the other ~ ／ 3つのとき：one ... another ... the last (the third) ~",
          "some ... others ~（〜なものもいれば、他方で…なものもいる［限定なし］） vs some ... the others ~（残り全員）"
        ],
        "deepDiveTopics": [
          "不定代名詞 it / one / another / the other の図解整理"
        ],
        "questions": [
          {
            "prompt": "There are five balls in the box. Two are white, and (　　) are red.",
            "choices": [
              "the others",
              "others",
              "another",
              "the other"
            ],
            "why": "全体が『5個』と決まっており、2個を引いた【残りすべて（3個・複数）】を指すので特定を表す the をつけた複数形【the others】が正解です（残り1つだけなら the other、全体数が決まっていない『他の〜もいる』なら others）。",
            "oneLine": "全体数が決まっていて『残りすべて（複数）』＝【the others】！（残り1つなら the other）",
            "skill": "不定代名詞（the others / others / another）",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "others（the なし）は全体数が限定されていない『ほかにも〜がある（Some ... others ~）』のときに使う。",
              "another は『（不特定の）もう1つ』で単数扱い。",
              "the other は『残り1つ』のときであり、ここでは are red と複数なので不可。"
            ]
          },
          {
            "prompt": "This cup of coffee is a little cold. May I have (　　) cup?",
            "choices": [
              "another",
              "the other",
              "others",
              "it"
            ],
            "why": "特定されていない「もう1杯（別のもう1つ）」を求める表現なので another（an + other）が正解です。",
            "oneLine": "不特定の「もう1つ・おかわり」＝ another ＋単数名詞！",
            "skill": "不定代名詞 another",
            "rate": 72,
            "difficulty": 3,
            "wrongReasons": [
              "the other は「（2つのうちの）残りもう一方」と特定されるときにしか使えない。",
              "others は複数形「他のものたち」であり単数名詞 cup の前には置けない。",
              "it cup と代名詞 it を名詞の前に置くことはできない。"
            ]
          },
          {
            "prompt": "Listening to classical music always makes me (　　).",
            "choices": [
              "relaxed",
              "relaxing",
              "happily",
              "calmly"
            ],
            "why": "make ＋ O ＋ C（OをCの状態にする）の補語 C には形容詞を置きます。人が「リラックスさせられた（落ち着いた）状態」なので過去分詞由来の形容詞 relaxed が正解です。",
            "oneLine": "人が主語・目的語の感情状態 ＝ relaxed / excited / interested（過去分詞形）！",
            "skill": "第5文型 SVOC",
            "rate": 62,
            "difficulty": 4,
            "wrongReasons": [
              "relaxing は「（音楽などが）人をリラックスさせるような」という能動側で、人（me）の状態には使わない。",
              "make O C の補語 C に副詞 happily は置けない（形容詞 happy が必要）！",
              "副詞 calmly も補語 C にはなれない。"
            ]
          },
          {
            "prompt": "My uncle sent a nice birthday card (　　) me from Canada.",
            "choices": [
              "to",
              "for",
              "of",
              "at"
            ],
            "why": "send（送る）は送り先の相手に向かって届く動詞なので、send A B ⇔ send B to A となります。",
            "oneLine": "send / give / show / tell / teach / lend は 物 ＋ to ＋ 人！",
            "skill": "第4文型の書き換え",
            "rate": 82,
            "difficulty": 3,
            "wrongReasons": [
              "for を使うのは buy / make / cook / find など「相手のために手に入れる・作る」動詞のとき。",
              "send B of A という語法はない。",
              "at は点への狙いを表し send の授与書き換えには使わない。"
            ]
          },
          {
            "prompt": "Please keep the classroom door (　　) while the air conditioner is on.",
            "choices": [
              "closed",
              "close",
              "closing",
              "closely"
            ],
            "why": "keep ＋ O ＋ C（OをCの状態に保つ）で、「ドアが閉められた状態」にするため形容詞（過去分詞）の closed が正解です（動詞 close と紛らわしい形容詞 close は「近い」の意味）。",
            "oneLine": "keep the door closed（閉じた状態）／ keep the window open（開いた状態）！",
            "skill": "第5文型 keep O C",
            "rate": 64,
            "difficulty": 4,
            "wrongReasons": [
              "形容詞の close［klóus］は「近い」という意味になってしまい、「閉まった」は closed！",
              "ドアは「閉められる」対象なので現在分詞 closing ではなく過去分詞 closed を使う。",
              "副詞 closely（密接に・注意深く）は keep O C の補語になれない。"
            ]
          },
          {
            "prompt": "(　　) three hundred students in our school thirty years ago.",
            "choices": [
              "There were",
              "There are",
              "They were",
              "It had"
            ],
            "why": "「〜に…があった・いた」と存在を表す構文で、thirty years ago（30年前）かつ複数名詞 three hundred students なので過去複数形の There were が正解です。",
            "oneLine": "過去の複数存在 ＝ There were ＋ 複数名詞！",
            "skill": "There is/are 構文",
            "rate": 84,
            "difficulty": 3,
            "wrongReasons": [
              "thirty years ago（30年前）という過去の語句があるため現在形 There are は不可。",
              "They were の後ろに直接名詞だけを続けて「〜に…がいた」とは言えない。",
              "英語で「〜に…がある」を主語なしの It had で表すことはできない。"
            ]
          },
          {
            "prompt": "I lost my watch yesterday, so I have to buy a new (　　).",
            "choices": [
              "one",
              "it",
              "them",
              "that"
            ],
            "why": "無くした時計そのもの（＝it）ではなく、「（同じ種類の）新しい時計を1つ」買うので不特定単数を指す代名詞 one が正解です。",
            "oneLine": "その物自体 ＝ it ／ 同じ種類の別の1つ ＝ one！",
            "skill": "代名詞 it と one の識別",
            "rate": 75,
            "difficulty": 3,
            "wrongReasons": [
              "it にすると「昨日失くしたその同じ時計」を買い直すという不合理な意味になってしまう！",
              "a new ~ と単数冠詞 a があるので複数形の them は入らない。",
              "a new that と指示代名詞 that に冠詞・形容詞をつけることはできない。"
            ]
          },
          {
            "prompt": "Everyone in the club calls (　　) \"Captain.\"",
            "choices": [
              "him",
              "he",
              "his",
              "himself"
            ],
            "why": "call ＋ O（目的格）＋ C（名称）で「OをCと呼ぶ」となるため、目的格の him が正解です。",
            "oneLine": "call ＋ 目的格（him / her / us）＋ 名前 ＝「Oを〜と呼ぶ」！",
            "skill": "第5文型 call O C",
            "rate": 86,
            "difficulty": 3,
            "wrongReasons": [
              "動詞 calls の目的語の位置なので主格の he は置けない。",
              "所有格の his だけでは目的語になれない。",
              "主語は Everyone であり同一人物ではないため再帰代名詞 himself は不適。"
            ]
          },
          {
            "prompt": "A: Would you mind opening the window a little? — B: (　　) It's getting warm in this room.",
            "choices": [
              "Not at all.",
              "Yes, please.",
              "You're welcome.",
              "That's too bad."
            ],
            "why": "Would you mind ~ing?（〜するのを気にしますか）に快く応じるときは「いいえ、少しも構いません」＝ Not at all. / Of course not. と答えます。",
            "oneLine": "Would you mind ~ing? にOKするときは【Not at all. / Of course not.】（Yes だと断りになる！）",
            "skill": "会話応答（Would you mind ~?）",
            "rate": 68,
            "difficulty": 4,
            "wrongReasons": [
              "Yes と答えると「気にする＝嫌だ」になってしまう。",
              "お礼への返答。",
              "残念な知らせへの返答。"
            ]
          },
          {
            "prompt": "There (　　) a convenience store and two banks near our school ten years ago.",
            "choices": [
              "were",
              "is",
              "are",
              "have been"
            ],
            "why": "ten years ago（10年前）という過去の語句があり、直後の主語が a convenience store and two banks（合計3つの複数扱い）または近接一致でも過去形が必要なので、選択肢の中で過去のbe動詞である were が正解です。",
            "oneLine": "ten years ago があるので過去形！ There is/are の過去形は【was / were】！",
            "skill": "There is/are 構文の過去形",
            "rate": 79,
            "difficulty": 2,
            "wrongReasons": [
              "現在形であり ten years ago と合わない。",
              "現在形であり過去と合わない。",
              "現在完了形は ten years ago と共に使えない。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en1_3_exp_m1",
        "title": "文型・代名詞・感嘆文 スピード実戦チェック②",
        "category": "文型・代名詞",
        "leadText": "感嘆文・命令文＋and・再帰代名詞の慣用表現をテンポよく確認します。",
        "explanationSummary": "Help yourself (to ~).（ご自由に取って食べてください）／ Enjoy yourself.（楽しんでね）／ by oneself（独力で・1人で）は対話文の定番です。",
        "surroundingKnowledge": [
          "make oneself understood in English（英語で自分の言いたいことを伝える）は難関校頻出！"
        ],
        "deepDiveTopics": [
          "再帰代名詞（-self / -selves）を使う重要熟語"
        ],
        "questions": [
          {
            "prompt": "A: Please help (　　) to these cookies, Tom. — B: Thank you! They look delicious.",
            "choices": [
              "yourself",
              "you",
              "yours",
              "yourselves"
            ],
            "why": "Tom（1人）に向かって「どうぞご自由に召し上がれ」と勧める慣用表現 Help yourself to ~. が正解です（相手が複数なら yourselves）。",
            "oneLine": "Help yourself to ~. ＝「どうぞ〜をご自由に取って召し上がれ」！",
            "skill": "再帰代名詞の慣用表現",
            "rate": 71,
            "difficulty": 3,
            "wrongReasons": [
              "命令文の主語は「あなた（you）」なので同一人物が目的語になるときは再帰代名詞 yourself が必須。",
              "所有代名詞 yours は「あなたのもの」であり慣用句にならない。",
              "呼びかけが Tom（1人）なので複数形の yourselves ではなく単数形 yourself を使う。"
            ]
          },
          {
            "prompt": "(　　) beautifully Emma plays the piano!",
            "choices": [
              "How",
              "What",
              "What a",
              "Which"
            ],
            "why": "直後が副詞 beautifully だけであり、そのすぐ後ろに主語＋動詞 Emma plays が続いているため How 感嘆文が正解です。",
            "oneLine": "How ＋ 形容詞/副詞 ＋ S ＋ V!（名詞がなければ How！）",
            "skill": "感嘆文",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "What 感嘆文は What (a/an) ＋ 形容詞 ＋【名詞】！ のときしか使えず、副詞 beautifully には不可。",
              "後ろに単数名詞がないため What a は置けない。",
              "Which は疑問詞であり感嘆文は作れない。"
            ]
          },
          {
            "prompt": "Turn left at the next corner, (　　) you will see the post office on your right.",
            "choices": [
              "and",
              "or",
              "but",
              "so"
            ],
            "why": "「次の角を左に曲がりなさい、そうすれば右手に郵便局が見えますよ」なので 命令文, and ~ が正解です。",
            "oneLine": "道案内の定番：Turn left [Go straight], and you will see ~!",
            "skill": "命令文＋and",
            "rate": 85,
            "difficulty": 3,
            "wrongReasons": [
              "命令文, or ~ は「〜しなさい、さもないと…（悪い結果）」になるときに使う。",
              "「左に曲がれば郵便局が見える」は順当な結果なので逆接の but は不適。",
              "命令文の後ろをカンマ＋so でつなぐ定型構文は標準的ではない（命令文, and ~ を使う）。"
            ]
          }
        ]
      }
    ]
  },
  "en2_1": {
    "practice": [
      {
        "id": "en2_1_exp_p1",
        "title": "受動態・現在完了3用法・現在完了進行形・tell/want構文 網羅演習",
        "category": "受動態・現在完了",
        "leadText": "中3前半の最重要単元である受動態の応用、現在完了の継続・経験・完了の判別、SV＋人＋to不定詞を徹底攻略します。",
        "explanationSummary": "How long have you ~? に対する for / since の使い分け、have been to（経験）と have gone to（結果：今ここにいない）の差、ask / tell / advise 人 to ~ の語順を完璧にしましょう。",
        "surroundingKnowledge": [
          "tell A not to 原形（Aに〜しないように言う）※ not の位置は必ず to の直前！",
          "助動詞つき受動態：must be done / can be seen / will be held（開催される予定だ）"
        ],
        "deepDiveTopics": [
          "現在完了形と現在完了進行形の違い（状態動詞 know/live vs 動作動詞 rain/wait/study）"
        ],
        "questions": [
          {
            "prompt": "Mount Fuji was (　　) white snow from the top to the middle.",
            "choices": [
              "covered with",
              "covered by",
              "covering with",
              "cover of"
            ],
            "why": "「〜に覆われている」は by ではなく前置詞 with を用いた受動態 be covered with ~ で表します。",
            "oneLine": "be covered with ~ ＝「〜に覆われている」（× by は不可）！",
            "skill": "by以外の受動態",
            "rate": 78,
            "difficulty": 3,
            "wrongReasons": [
              "be covered with ~ が熟語であり、行為者を表す by は使わない引っかけの定番！",
              "富士山は雪で「覆われている」側なので能動の covering にはならない。",
              "was の後ろに原形 cover は置けない。"
            ]
          },
          {
            "prompt": "A: Have you finished your math homework (　　)? — B: No, not yet.",
            "choices": [
              "yet",
              "already",
              "ever",
              "just"
            ],
            "why": "現在完了の【疑問文】で文末に置き「もう〜しましたか」を表す副詞は yet です（否定文では「まだ〜ない」）。already は原則肯定文で使います。",
            "oneLine": "現在完了の疑問文「もう」・否定文「まだ」＝ 文末の yet！",
            "skill": "現在完了（完了用法）",
            "rate": 79,
            "difficulty": 3,
            "wrongReasons": [
              "already（すでに）は原則として肯定文で使い、通常の現在完了疑問文の文末には yet を使う。",
              "ever（これまでに）は経験用法の疑問文で過去分詞の直前に置く語で、文末には置かない。",
              "just（ちょうど今）は肯定文で have [has] の直後に置く副詞。"
            ]
          },
          {
            "prompt": "It (　　) raining since yesterday morning, so we cannot play baseball outside.",
            "choices": [
              "has been",
              "is",
              "was",
              "had"
            ],
            "why": "since yesterday morning（昨日の朝からずっと）があり、動作動詞 rain が今も降り続いていることを表す【現在完了進行形】has been raining が正解です。",
            "oneLine": "動作の継続「ずっと〜し続けている」＝ have [has] been ＋ ~ing！",
            "skill": "現在完了進行形",
            "rate": 72,
            "difficulty": 3,
            "wrongReasons": [
              "since yesterday morning（過去の起点から今まで）があるため現在進行形 is raining は不可！",
              "過去進行形 was raining では「今も外で野球ができない」現在の状況とつながらない。",
              "過去完了進行形なら had been が必要で had raining という形は文法的に誤り。"
            ]
          },
          {
            "prompt": "My mother told me (　　) play video games after ten at night.",
            "choices": [
              "not to",
              "to not",
              "don't",
              "didn't"
            ],
            "why": "tell ＋ 人 ＋ to 原形（人に〜するように言う）の否定「〜しないように言う」は、to の直前に not を置いて tell ＋ 人 ＋ not to 原形 とします。",
            "oneLine": "tell [ask] ＋ 人 ＋ not to 原形 ＝「人に〜しないように言う［頼む］」！",
            "skill": "不定詞の否定位置",
            "rate": 65,
            "difficulty": 4,
            "wrongReasons": [
              "不定詞の否定は必ず to の【直前】に not を置くため to not play の語順は誤り。",
              "told me の後ろに直接助動詞 don't を続けることはできない。",
              "同じく told me didn't play のように節なしで過去否定は続けられない。"
            ]
          },
          {
            "prompt": "Cheese and butter are made (　　) milk.",
            "choices": [
              "from",
              "of",
              "by",
              "into"
            ],
            "why": "牛乳からチーズやバターを作るときは性質が変化して元の液体（牛乳）がそのまま見えないため、材料の be made from ~ を用います。",
            "oneLine": "化学変化・加工で元の姿が見えない原料 ＝ be made from ~！",
            "skill": "be made of/from の識別",
            "rate": 71,
            "difficulty": 3,
            "wrongReasons": [
              "be made of ~ は「木の机（a desk made of wood）」のように見た目で元の材質がわかる物理変化のときに使う。",
              "by は行為者や手段を表し、原料には使わない。",
              "be made into ~ は逆に「（牛乳が）チーズに加工される（Milk is made into cheese.）」の順で使う。"
            ]
          },
          {
            "prompt": "Mr. Green has lived in Mie (　　) he came to Japan five years ago.",
            "choices": [
              "since",
              "for",
              "from",
              "when"
            ],
            "why": "後ろに he came to Japan five years ago（5年前に来日した）という【過去の起点の文（S＋過去形）】が続いているため、接続詞としても使える since（〜以来ずっと）が正解です。",
            "oneLine": "since ＋ 過去の起点（名詞 または S＋過去形）！",
            "skill": "現在完了（for と since）",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "for の後ろは「期間の長さ（for five years）」しか置けず、S＋Vの文は続けられない！",
              "現在完了形で過去の起点に from を使うことはできない（since を使う）。",
              "現在完了形の主節に when 節（過去の1点）を組み合わせることはできない。"
            ]
          },
          {
            "prompt": "The Olympic Games will (　　) in that city four years from now.",
            "choices": [
              "be held",
              "hold",
              "held",
              "have held"
            ],
            "why": "主語 The Olympic Games（オリンピック大会）は「開催される」側であり、助動詞 will の後ろなので受動態 will be held（hold - held - held）が正解です。",
            "oneLine": "助動詞 ＋ be ＋ 過去分詞（will be held ＝ 開催されるだろう）！",
            "skill": "助動詞＋受動態",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "オリンピックは「開催される」受動関係なので能動の will hold は不可。",
              "助動詞 will の直後に過去分詞 held を直接置くことはできない（be が必要）。",
              "will have held は未来完了の能動態であり受動の意味にならない。"
            ]
          },
          {
            "prompt": "Let me (　　) your tablet for a few minutes to check the train schedule.",
            "choices": [
              "use",
              "to use",
              "using",
              "used"
            ],
            "why": "使役動詞 let ＋ O ＋【動詞の原形】（Oに〜させてあげる）の構文なので、原形の use が正解です（Let me ~ ＝ 私に〜させてください）。",
            "oneLine": "make / let ＋ 人 ＋ 動詞の原形（to を絶対につけない）！",
            "skill": "使役動詞 let",
            "rate": 77,
            "difficulty": 3,
            "wrongReasons": [
              "allow 人 to 原形 とは異なり、使役動詞 let / make / have の後ろに to をつけるのは誤り！",
              "let O ~ing という形はとらない。",
              "「私が使う」という能動関係なので過去分詞 used にはならない。"
            ]
          },
          {
            "prompt": "Mt. Fuji is (　　) than any other mountain in Japan.",
            "choices": [
              "higher",
              "highest",
              "as high",
              "more high"
            ],
            "why": "『比較級 ＋ than any other ＋ 単数名詞』で「他のどの〜よりも…だ」を表す重要構文です。",
            "oneLine": "比較級 ＋ than any other ＋ 単数名詞 ＝【他のどの〜よりも…だ】！",
            "skill": "比較級で最上級を表す構文",
            "rate": 77,
            "difficulty": 3,
            "wrongReasons": [
              "than があるので比較級を使う。",
              "as ~ as の形ではない。",
              "high の比較級は higher。"
            ]
          },
          {
            "prompt": "This song is loved (　　) people all over the world.",
            "choices": [
              "by",
              "from",
              "of",
              "at"
            ],
            "why": "受動態 be ＋ 過去分詞 において動作主「〜によって」を表す前置詞は by です。",
            "oneLine": "受動態『be動詞 ＋ 過去分詞 ＋ by 〜』＝ 〜によって…される！",
            "skill": "受動態の基本",
            "rate": 91,
            "difficulty": 1,
            "wrongReasons": [
              "原料などに使う前置詞。",
              "材料などに使う前置詞。",
              "be surprised at などで使う前置詞。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en2_1_exp_m1",
        "title": "受動態・現在完了 スピード実戦チェック②",
        "category": "受動態・現在完了",
        "leadText": "When疑問文との共起不可・知覚動詞・経験回数の3題を素早く仕留めましょう。",
        "explanationSummary": "When did you ~? には過去形で答え、How many times have you ~? には現在完了（経験）で答えます。",
        "surroundingKnowledge": [
          "be known to ~（〜に知られている） vs be known for ~（＝be famous for：〜で有名だ）"
        ],
        "deepDiveTopics": [
          "現在完了形と過去形の決定的な境界線"
        ],
        "questions": [
          {
            "prompt": "A: How many times have you (　　) to Kyoto? — B: Three times.",
            "choices": [
              "been",
              "gone",
              "went",
              "visited"
            ],
            "why": "「何回京都へ行ったことがありますか（経験）」は have been to ~ を使います。visited を使うなら直後の前置詞 to が不要になるため不可です。",
            "oneLine": "「〜へ行ったことがある」＝ have [has] been to 場所！",
            "skill": "現在完了（経験）",
            "rate": 75,
            "difficulty": 3,
            "wrongReasons": [
              "have gone to ~ は「〜へ行ってしまって今ここにいない（結果）」になり、目の前の相手 you には使えない！",
              "have の後ろは過去分詞なので過去形 went は置けない。",
              "visit は他動詞なので後ろに前置詞 to がある空欄には入れられない（visited Kyoto なら可）。"
            ]
          },
          {
            "prompt": "I heard someone (　　) my name from behind at the station.",
            "choices": [
              "call",
              "to call",
              "called",
              "calls"
            ],
            "why": "知覚動詞 hear ＋ O ＋ 原形（または ~ing）で「Oが〜するのを聞く」となるため、原形の call が正解です（to call は不可）。",
            "oneLine": "知覚動詞 see / hear / watch / feel ＋ O ＋ 原形 [~ing]！",
            "skill": "知覚動詞",
            "rate": 69,
            "difficulty": 3,
            "wrongReasons": [
              "知覚動詞 hear / see / watch / feel ＋ O の後ろに to 不定詞は置けない！",
              "自分の名前が「誰かが呼ぶ」能動関係（someone が私の名前を呼ぶ）なので過去分詞 called は不適。",
              "補語の位置に三単現の calls を置くことはできない。"
            ]
          },
          {
            "prompt": "When (　　) this wooden bridge built across the river?",
            "choices": [
              "was",
              "has",
              "did",
              "is"
            ],
            "why": "疑問詞 When は過去の1点を尋ねるため現在完了形（has been built）は使えず、過去の受動態 When was S ＋ 過去分詞 ~? になります。",
            "oneLine": "When 疑問文は現在完了と共起不可 → 過去の受動態 When was ~ built?",
            "skill": "受動態の疑問文",
            "rate": 68,
            "difficulty": 3,
            "wrongReasons": [
              "疑問詞 When は過去の1点を尋ねるため現在完了（has）とは絶対に一緒に使えない超頻出の罠！",
              "did にすると後ろが過去分詞 built なので文法的に破綻する。",
              "過去の建設時期を尋ねているため現在形 is ではなく過去形 was を使う。"
            ]
          }
        ]
      }
    ]
  },
  "en2_2": {
    "practice": [
      {
        "id": "en2_2_exp_p1",
        "title": "分詞・関係代名詞（主格/目的格/whose）・間接疑問文・仮定法 網羅演習",
        "category": "後置修飾・仮定法",
        "leadText": "中3後半の最重要単元！先行詞が人か物か、後ろの節で主語か目的語か、所有格 whose かを論理的に見抜く8問です。",
        "explanationSummary": "関係代名詞の空欄問題は ①先行詞が人か物か、②空欄の直後に【動詞】があるか（＝主格 who/which/that）、【S＋V】があるか（＝目的格）、【無冠詞の名詞＋V】があるか（＝所有格 whose）の3ステップで100%解けます！",
        "surroundingKnowledge": [
          "先行詞に the only / the very / 最上級 / all / every / ~thing がつくときは that が好まれる！",
          "what ＝ the thing(s) which「〜すること・もの」（先行詞を中に含んでいるので前に名詞がない！）"
        ],
        "deepDiveTopics": [
          "関係代名詞 what と接続詞 that の違い",
          "仮定法過去 I wish S were/had/could ~"
        ],
        "questions": [
          {
            "prompt": "The girl (　　) talking with Ms. Sato over there is my cousin.",
            "choices": [
              "standing by the window and",
              "who are",
              "stood",
              "is"
            ],
            "why": "単数名詞 The girl を修飾しており、本動詞 is my cousin が後ろにあるため is は不可。standing by the window and talking ~ と現在分詞で後置修飾する形が文法的に成立します。",
            "oneLine": "名詞 ＋ 現在分詞句（〜している…）＋ 本動詞 is！",
            "skill": "現在分詞の後置修飾",
            "rate": 66,
            "difficulty": 3,
            "wrongReasons": [
              "先行詞 The girl は単数なので関係代名詞節の動詞が複数形 are になっている時点で誤り。",
              "「立っている少女」は能動・進行なので過去分詞 stood ではなく現在分詞 standing を使う。",
              "後ろに本動詞 is my cousin があるため、ここにもう1つ is を入れると1文に動詞が2つ重なり不可。"
            ]
          },
          {
            "prompt": "I have a friend (　　) father works as a pilot at an international airport.",
            "choices": [
              "whose",
              "who",
              "whom",
              "which"
            ],
            "why": "先行詞 a friend と直後の無冠詞名詞 father が「その友人の父（her/his father）」という【所有関係】になっているため、所有格の関係代名詞 whose が正解です。",
            "oneLine": "先行詞 ＋ whose ＋ 無冠詞名詞 ＝「その〜の…」（所有格関係代名詞）！",
            "skill": "関係代名詞 whose",
            "rate": 58,
            "difficulty": 4,
            "wrongReasons": [
              "主格 who の直後に無冠詞名詞 father＋動詞 works を続けることはできない。",
              "目的格 whom の後ろは S＋V になるが、father works に目的語の欠けがないため不可。",
              "先行詞 a friend は人であり、かつ所有関係なので which は不可。"
            ]
          },
          {
            "prompt": "Look at the mountain (　　) top is covered with snow.",
            "choices": [
              "whose",
              "which",
              "that",
              "who"
            ],
            "why": "所有格の whose は先行詞が【人だけでなく物（the mountain）】のときにも使え、「その山頂（its top）が雪で覆われている山」を表します。",
            "oneLine": "whose は先行詞が物（the house whose roof ~ / the mountain whose top ~）でも使える！",
            "skill": "関係代名詞 whose（物）",
            "rate": 52,
            "difficulty": 4,
            "wrongReasons": [
              "物の所有格にも whose を使う！「which ＋ 無冠詞名詞 top」という形は存在しない。",
              "関係代名詞 that には所有格の用法がないため that top とは言えない。",
              "主格の who は先行詞が物のときにも所有関係にも使えない。"
            ]
          },
          {
            "prompt": "The pictures (　　) Tom took in Okinawa last summer were very beautiful.",
            "choices": [
              "which",
              "who",
              "whose",
              "what"
            ],
            "why": "先行詞 The pictures（物）で、後ろに Tom took [目的語欠け] があるため、目的格の関係代名詞 which（または that、省略も可）が正解です。",
            "oneLine": "先行詞（物）＋ which [that] ＋ S ＋ V（目的語欠け）！",
            "skill": "関係代名詞（目的格）",
            "rate": 79,
            "difficulty": 3,
            "wrongReasons": [
              "先行詞 The pictures は「物」なので人専用の who は使えない。",
              "後ろが Tom took と「主語＋他動詞（目的語欠け）」であり所有格 whose の形ではない。",
              "先行詞 The pictures が前にあるため、先行詞を含む what は絶対に置けない！"
            ]
          },
          {
            "prompt": "Could you tell me what time (　　) tomorrow morning?",
            "choices": [
              "the library opens",
              "does the library open",
              "will the library open",
              "opens the library"
            ],
            "why": "Could you tell me ＋ 疑問詞節（間接疑問文）なので、what time の後ろは肯定文の語順【主語 the library ＋ 動詞 opens】になります（時刻表・確定予定は現在形で表せます）。",
            "oneLine": "間接疑問文は【疑問詞 ＋ 主語 ＋ 動詞】の肯定文語順！（does を消して三単現 -s を戻す！）",
            "skill": "間接疑問文",
            "rate": 61,
            "difficulty": 4,
            "wrongReasons": [
              "間接疑問文の語順は「疑問詞＋S＋V」であり、疑問文語順 does the library open は誤り！",
              "同じく助動詞 will を主語の前に出した疑問文語順なので誤り。",
              "英語では疑問詞の直後に一般動詞 opens＋主語と倒置しない。"
            ]
          },
          {
            "prompt": "If I (　　) wings like a bird, I would fly to see you right now.",
            "choices": [
              "had",
              "have",
              "will have",
              "am having"
            ],
            "why": "「もし今、鳥のように翼を持っていたら（実際は持っていない）」という現在の事実に反する仮定（仮定法過去）なので、if節は過去形 had、主節は would ＋原形 になります。",
            "oneLine": "現在の事実に反する仮定（仮定法過去）＝ If S ＋ 過去形 (were / had), S would [could] ＋ 原形！",
            "skill": "仮定法過去",
            "rate": 70,
            "difficulty": 3,
            "wrongReasons": [
              "現在の事実に反する仮定（仮定法過去）なので現在形 have ではなく過去形 had を使う。",
              "if節の中に will は入れず、かつ仮定法過去なので had が必要。",
              "現在進行形では反事実の仮定を表せない。"
            ]
          },
          {
            "prompt": "I wish I (　　) speak Spanish as fluently as Maria.",
            "choices": [
              "could",
              "can",
              "will",
              "am"
            ],
            "why": "「マリアくらい流暢にスペイン語が話せたらなあ（実際は話せない）」という現在の願望を表す仮定法過去なので I wish I could ＋原形 が正解です。",
            "oneLine": "「〜できたらなあ」＝ I wish ＋ S ＋ could ＋ 原形！",
            "skill": "仮定法 I wish",
            "rate": 73,
            "difficulty": 3,
            "wrongReasons": [
              "I wish の後ろは仮定法過去にするため現在形の can は使えず過去形 could にする！",
              "実現可能な未来の希望（hope）ではなく現在の反事実の願望なので will は不可。",
              "am の後ろに動詞の原形 speak は置けない。"
            ]
          },
          {
            "prompt": "This is (　　) I wanted to buy for my mother's birthday.",
            "choices": [
              "what",
              "which",
              "that",
              "who"
            ],
            "why": "空欄の前に先行詞となる名詞がなく、「私が母の誕生日に買いたかった【もの】（＝the thing which）」という意味になるため、先行詞を含む関係代名詞 what が正解です。",
            "oneLine": "前に名詞（先行詞）がなく「〜するもの・こと」＝ 関係代名詞 what！",
            "skill": "関係代名詞 what",
            "rate": 60,
            "difficulty": 4,
            "wrongReasons": [
              "空欄の前に先行詞（名詞）がないため which は使えない！",
              "この位置で「〜するもの・こと」を表す関係代名詞として that 単独（先行詞なし）は使えない。",
              "「母の誕生日に買いたかったもの」は物であり先行詞もないので who は不可。"
            ]
          },
          {
            "prompt": "Mr. Brown (　　) in Kyoto since he came to Japan five years ago.",
            "choices": [
              "has lived",
              "lived",
              "is living",
              "lives"
            ],
            "why": "since he came to Japan（5年前に来日して以来ずっと）があるため現在完了形の継続用法 has lived を選びます。",
            "oneLine": "since ＋ 過去の一時点 とセットで使うのは【現在完了形（have / has ＋ 過去分詞）】！",
            "skill": "現在完了形（継続）",
            "rate": 84,
            "difficulty": 2,
            "wrongReasons": [
              "過去形は since 節と組んで現在までの継続を表せない。",
              "現在進行形では不可。",
              "現在形では不可。"
            ]
          },
          {
            "prompt": "Have you finished cleaning your room (　　), Takeshi?",
            "choices": [
              "yet",
              "already",
              "just",
              "ever"
            ],
            "why": "現在完了形（完了）の疑問文の文末で「もう〜しましたか」と尋ねるときは yet を使います。",
            "oneLine": "現在完了の完了用法：疑問文の文末＝【yet（もう）】、否定文＝not ~ yet（まだ）！",
            "skill": "現在完了（already と yet）",
            "rate": 80,
            "difficulty": 2,
            "wrongReasons": [
              "肯定文で「すでに」。",
              "肯定文で「ちょうど」。",
              "経験の疑問文で「これまでに」。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en2_2_exp_m1",
        "title": "後置修飾・間接疑問・仮定法 スピード実戦チェック②",
        "category": "後置修飾・仮定法",
        "leadText": "過去分詞修飾・主格関係代名詞の三単現一致・仮定法 If I were you の3題です。",
        "explanationSummary": "主格の関係代名詞の直後の動詞は、必ず【先行詞が単数か複数か】に合わせて s の有無を決めます！",
        "surroundingKnowledge": [
          "a student who studies ~（単数） vs students who study ~（複数）"
        ],
        "deepDiveTopics": [
          "関係代名詞節内の主語と動詞の数の一致"
        ],
        "questions": [
          {
            "prompt": "A dictionary is a book which (　　) us the meanings of words.",
            "choices": [
              "tells",
              "tell",
              "telling",
              "is told"
            ],
            "why": "主格の関係代名詞 which の先行詞は単数名詞 a book なので、関係代名詞節の中の動詞にも三単現の -s がつき tells が正解です。",
            "oneLine": "主格関係代名詞の直後の動詞は【先行詞の単複】に一致させる！",
            "skill": "関係代名詞と三単現",
            "rate": 67,
            "difficulty": 3,
            "wrongReasons": [
              "先行詞 a book が単数なので原形 tell ではなく三単現の tells に一致させる必要がある。",
              "関係代名詞 which の直後には述語動詞が必要であり分詞 telling だけでは文にならない。",
              "辞書は意味を「教えてくれる（能動）」側なので受動態 is told は逆になる。"
            ]
          },
          {
            "prompt": "The car (　　) in Japan is very popular in many foreign countries.",
            "choices": [
              "made",
              "making",
              "makes",
              "was made"
            ],
            "why": "後ろに本動詞 is very popular があるため was made は不可。「日本で作られた車」と過去分詞句 made in Japan が後ろから The car を修飾します。",
            "oneLine": "名詞 ＋ 過去分詞句（made in ~ / written by ~ / spoken in ~）！",
            "skill": "過去分詞の後置修飾",
            "rate": 78,
            "difficulty": 3,
            "wrongReasons": [
              "車は「作られる（受動）」側なので現在分詞 making ではなく過去分詞 made で修飾する。",
              "関係代名詞なしで動詞 makes を名詞の後ろに並べることはできない。",
              "後ろに本動詞 is very popular があるため was made を入れると動詞が2つになり不可。"
            ]
          },
          {
            "prompt": "If I (　　) you, I would talk to the teacher about the problem.",
            "choices": [
              "were",
              "am",
              "will be",
              "be"
            ],
            "why": "仮定法過去で「もし私があなただったら」と言うときは、主語が I でも be動詞は were を用いるのが標準表現です。",
            "oneLine": "「もし私があなたなら」＝ If I were you, I would ~!",
            "skill": "仮定法 If I were you",
            "rate": 81,
            "difficulty": 3,
            "wrongReasons": [
              "「私があなたなら（あり得ない仮定）」は仮定法過去なので現在形 am は使えない。",
              "if節に未来の will be は使えず、反事実なので were にする。",
              "現代口語で If I be you とは言わず were を用いる。"
            ]
          }
        ]
      }
    ]
  },
  "en3_1": {
    "practice": [
      {
        "id": "en3_1_exp_p1",
        "title": "英作文の必須構文・減点ゼロの言い換え＆正誤判定演習",
        "category": "英作文・語法",
        "leadText": "『英作文完全対策プリント』の過去5年分析から、受験生が最も減点されやすい語法・前置詞・that節・依頼勧誘の型を徹底演習します。",
        "explanationSummary": "英作文では ①visit / discuss / approach / marry / enter（入る）は他動詞なので直後に前置詞をつけない！ ②recommend / suggest / hope の後ろに「人＋to原形」は置けない！ ③難しい日本語は SV が明確な中学英語に言い換える！が鉄則です。",
        "surroundingKnowledge": [
          "visit Kyoto（× visit to Kyoto）／ discuss the problem（× discuss about ~）／ marry him（× marry with ~）",
          "It takes (人) 時間 to 原形（〜するのに時間がかかる）⇔ 人 spend 時間 ~ing"
        ],
        "deepDiveTopics": [
          "自動詞と間違えやすい他動詞ベスト5"
        ],
        "questions": [
          {
            "prompt": "次の日本文「私たちは放課後にその問題について話し合った。」を表す英文として、文法的に【減点されない正しい文】を選びなさい。",
            "choices": [
              "We talked about the problem after school.",
              "We discussed about the problem after school.",
              "We talked the problem after school.",
              "We were discussed the problem after school."
            ],
            "why": "discuss は「〜について議論する」という意味をすでに含む他動詞なので about をつけると1点減点になります。talk を使うなら自動詞なので talked about ~ で満点になります！",
            "oneLine": "talk about ~ ＝ discuss ~（discuss に about は絶対につけない）！",
            "skill": "英作文の減点回避（他動詞）",
            "rate": 63,
            "difficulty": 4,
            "wrongReasons": [
              "discuss は他動詞なので後ろに前置詞 about をつけると減点される最頻出ミス！",
              "talk は自動詞なので前置詞なしに the problem を目的語にはできない（talk about が必要）。",
              "「私たちが議論された」という受動態になってしまい意味が破綻する。"
            ]
          },
          {
            "prompt": "留学生に「日本で訪れるべき場所がたくさんある」と伝える英文として【最も適切な】ものを選びなさい。",
            "choices": [
              "There are a lot of places to visit in Japan.",
              "There have many places to visit to in Japan.",
              "Japan is having many places visiting.",
              "It has a lot of place to visit in Japan."
            ],
            "why": "三重県R4正答例そのもの！「〜がたくさんある」＝ There are a lot of [many] 複数名詞、「訪れるべき場所」＝ places to visit（visit は他動詞なので末尾に to は不要）です。",
            "oneLine": "「訪れるべき場所がたくさんある」＝ There are a lot of places to visit ~!",
            "skill": "英作文必須パターン（There構文＋不定詞）",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "英語で「〜がある」を There have ~ とは言わず（There is/are ~）、かつ visit の後ろに to は不要。",
              "have（持っている・ある）は状態動詞なので is having と進行形にはできず語法も誤り。",
              "a lot of の後ろが単数形 place になっており、主語 It も不自然。"
            ]
          },
          {
            "prompt": "友人に「次の土曜日に私たちの野球の練習に参加しませんか」と誘う英文として【正しい】ものを選びなさい。",
            "choices": [
              "Why don't you join our baseball practice next Saturday?",
              "Why not you join to our baseball practice on next Saturday?",
              "Shall I join our baseball practice next Saturday?",
              "How about join our baseball practice next Saturday?"
            ],
            "why": "相手を誘う表現は Why don't you ＋原形 ~? / Would you like to ＋原形 ~? / How about ＋ ~ing? です。join は他動詞、また next Saturday の前には前置詞 on をつけません！",
            "oneLine": "next / last / this / every ＋ 曜日・月 の前には前置詞（on / in）をつけない！",
            "skill": "英作文（勧誘と時表現）",
            "rate": 71,
            "difficulty": 3,
            "wrongReasons": [
              "Why not ＋原形?（主語 you なし）なら使えるが Why not you ~ は誤り、また join に to も next に on も不要！",
              "Shall I ~? は「私が参加しましょうか」になり相手を誘う文にならない。",
              "前置詞 about の後ろは動名詞 joining にしなければならず原形 join は不可。"
            ]
          },
          {
            "prompt": "スピーチ原稿で「私は祖母が私の誕生日にそれをくれたということを伝えたい（＝祖母が誕生日にそれをくれた）」と書くときの正しい1文を選びなさい。",
            "choices": [
              "My grandmother gave it to me for my birthday.",
              "That my grandmother gave it to me on my birthday.",
              "My grandmother gave to me it for my birthday.",
              "My grandmother was given it to me on my birthday."
            ],
            "why": "英作文プリント鉄則②：「〜ということ」という問題文でも文頭に That だけの名詞節を書いてピリオドを打つと文として不完全で減点！ SV の完全な文 My grandmother gave it to me ~. と書きます（代名詞 it が目的語のときは give 人 it の順は避け give it to 人 にします）。",
            "oneLine": "「〜ということ」を英作するとき文頭に That は書かない！ 代名詞 it は give it to 人 の語順！",
            "skill": "英作文（代名詞の語順）",
            "rate": 65,
            "difficulty": 4,
            "wrongReasons": [
              "That節（名詞節）だけでは主節の動詞がない「文の断片」になり英作文では大幅減点される！",
              "give の後ろに to me it の語順はとれない（give it to me の順にする）。",
              "「祖母がそれを与えられた」という受動態になり送り主が逆転している。"
            ]
          },
          {
            "prompt": "「もし春にひかり山に登れば、美しい花を見ることができます。」を表す正しい英文を選びなさい。",
            "choices": [
              "If you climb Mt. Hikari in spring, you can see beautiful flowers.",
              "If you will climb Mt. Hikari in spring, you can see beautiful flowers.",
              "When you climbed Mt. Hikari in spring, you will see beautiful flowers.",
              "If climbing Mt. Hikari in spring, beautiful flowers can see."
            ],
            "why": "条件の副詞節 If you climb ~ の中は現在形、主節は you can see ~ とします。「〜山」は Mt. Hikari の語順です。",
            "oneLine": "条件の if 節（現在形）＋ 主節（can / will ＋ 原形）は英作文5年連続頻出！",
            "skill": "英作文（条件のif文）",
            "rate": 80,
            "difficulty": 3,
            "wrongReasons": [
              "「時・条件を表す副詞節（if / when ~）」の中では未来のことでも will を使わず現在形にする鉄則！",
              "条件節が過去形 climbed なのに主節が未来形 will see で時制がねじれている。",
              "主節の主語が beautiful flowers なのに分詞構文の主語と一致せず「花が自分で見る」文になっている。"
            ]
          },
          {
            "prompt": "「私は夕食を食べる前に、家族のためにバイオリンを演奏しました。」を表す正しい英文を選びなさい。",
            "choices": [
              "I played the violin for my family before I ate dinner.",
              "I played violin to my family before eating a dinner.",
              "Before I eat dinner, I played the violin for my family.",
              "I was played the violin for my family before dinner."
            ],
            "why": "楽器を演奏するときは必ず定冠詞 the をつけて play the violin（スポーツは冠詞なしで play soccer）、食事名 dinner は無冠詞、過去のことなので before 節も過去形 ate に揃えます！",
            "oneLine": "play ＋ the ＋ 楽器名 ／ play ＋ 無冠詞 ＋ スポーツ名 ／ 食事名（breakfast/lunch/dinner）は無冠詞！",
            "skill": "冠詞の使い分け",
            "rate": 73,
            "difficulty": 3,
            "wrongReasons": [
              "楽器には the が必須（play the violin）、誰かのためには to ではなく for、dinner に冠詞 a は不要！",
              "過去の出来事なので before 節の中も現在形 eat ではなく過去形 ate に揃える。",
              "I was played にすると「私が演奏された」という受動態になってしまう。"
            ]
          },
          {
            "prompt": "「私の町は美しい海とおいしい魚で有名です。」を表す正しい英文を選びなさい。",
            "choices": [
              "My town is famous for its beautiful sea and delicious fish.",
              "My town is famous as beautiful sea and delicious fish.",
              "My town knows for beautiful sea and delicious fish.",
              "There is famous for beautiful sea in my town."
            ],
            "why": "「（特産物・名所など）〜で有名だ」は be famous for ~ を使います（be famous as ~ は「〜という肩書き・立場として有名だ」）。また fish は単複同形なので fishes にはしません。",
            "oneLine": "特産品や名所で有名 ＝ be famous for ~！",
            "skill": "重要熟語 be famous for",
            "rate": 79,
            "difficulty": 3,
            "wrongReasons": [
              "be famous as ~ は「（人物や都市が）〜という立場・肩書きとして有名だ」のときに使う表現。",
              "know は「知っている」という能動動詞であり「有名だ」なら be known for ~ にする必要がある。",
              "There is famous ~ という構文は英語に存在しない（主語を My town にする）。"
            ]
          },
          {
            "prompt": "「彼が私たちのチームの誰よりも速く走る選手だ」を最もシンプルで減点リスクゼロの英語に言い換えた文はどれか。",
            "choices": [
              "He runs the fastest on our team.",
              "He is fast runner than everyone in our team.",
              "He can running faster than any players.",
              "His running is most fast in our team."
            ],
            "why": "英作文プリント鉄則④（和文和訳）：直訳しにくい日本語も He runs fast. や He runs the fastest on [in] our team. のように動詞 run ＋ 副詞 fast で書けばミスなく満点が取れます。",
            "oneLine": "「走るのが速い選手だ」→ He runs fast. / He runs the fastest ~. に言い換える！",
            "skill": "和文和訳スキル",
            "rate": 77,
            "difficulty": 3,
            "wrongReasons": [
              "fast runner に冠詞 a がなく、また比較級（faster）になっていないのに than を使っている。",
              "助動詞 can の後ろに ~ing は置けず、比較対象も any other player とする必要がある。",
              "fast の最上級は most fast ではなく fastest である。"
            ]
          },
          {
            "prompt": "Look at the boy (　　) under that big tree with a white dog.",
            "choices": [
              "sitting",
              "sat",
              "sits",
              "to sitting"
            ],
            "why": "「あの大きな木の下に座っている少年」と the boy を後ろから修飾するため現在分詞 sitting を使います。",
            "oneLine": "名詞 ＋ 現在分詞(~ing) ＋ 場所 ＝【…している名詞】（後置修飾）！",
            "skill": "現在分詞の後置修飾",
            "rate": 83,
            "difficulty": 2,
            "wrongReasons": [
              "自動詞 sit は受身の過去分詞修飾にならない。",
              "現在形はそのまま名詞を修飾できない。",
              "to sitting は不可。"
            ]
          },
          {
            "prompt": "The smartphone (　　) my father bought for me yesterday is very light.",
            "choices": [
              "which",
              "who",
              "whose",
              "where"
            ],
            "why": "先行詞が The smartphone（物）で bought の目的語が欠けているため、目的格の関係代名詞 which が入ります。",
            "oneLine": "先行詞が『物』＋ 後ろの目的語が空欄 ＝ 目的格の関係代名詞【which / that】！",
            "skill": "関係代名詞（目的格）",
            "rate": 85,
            "difficulty": 2,
            "wrongReasons": [
              "先行詞が「人」のときに使う関係代名詞であり、先行詞 smartphone（物）には使えない。",
              "whose は「〜の…」を表す所有格であり、後ろに無冠詞の名詞が続くときに使う。",
              "関係副詞であり目的語になれない。"
            ]
          },
          {
            "prompt": "A: Do you know the girl (　　) mother is a famous pianist? — B: Yes, she is Emi.",
            "choices": [
              "whose",
              "who",
              "whom",
              "which"
            ],
            "why": "先行詞 the girl と直後の無冠詞の名詞 mother が「その少女の母親（her mother）」という所有関係になるため、所有格の関係代名詞 whose を選びます。",
            "oneLine": "先行詞 ＋ 【whose】 ＋ 無冠詞の名詞 ＝『その〜の…』！",
            "skill": "関係代名詞（所有格 whose）",
            "rate": 75,
            "difficulty": 3,
            "wrongReasons": [
              "主格であり後ろに mother is と続かない。",
              "whom は目的格（「〜を／〜に」）であり、直後に無冠詞名詞 mother を続けて所有関係は表せない。",
              "先行詞が人なので不可。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en3_1_exp_m1",
        "title": "英作文・語法 スピード実戦チェック②",
        "category": "英作文・語法",
        "leadText": "前置詞・語法ミスを一瞬で見抜く3問です。",
        "explanationSummary": "arrive at（狭い地点：駅・空港）と arrive in（広い場所：国・大都市）＝ get to ＝ reach（他動詞）の書き換えは超頻出です。",
        "surroundingKnowledge": [
          "borrow（無料で借りる：動かす） vs rent（有料で借りる） vs use（その場で使う：電話やトイレは May I use ~?）"
        ],
        "deepDiveTopics": [
          "「着く」を表す3表現 arrive at[in] / get to / reach"
        ],
        "questions": [
          {
            "prompt": "We (　　) Tokyo Station at nine thirty this morning.",
            "choices": [
              "arrived at",
              "arrived to",
              "reached to",
              "got at"
            ],
            "why": "駅や空港などの地点に到着する表現は arrive at ~（＝get to ~ ＝ reach ~［前置詞なし］）です。",
            "oneLine": "arrive at 駅 [in 都市] ＝ get to 場所 ＝ reach 場所！",
            "skill": "到着を表す熟語",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "arrive to ~ という語法はない（狭い地点には arrive at、都市・国には arrive in を使う）！",
              "reach は他動詞なので後ろに前置詞 to をつけると誤り（reached Tokyo Station なら可）。",
              "get で到着を表すときは got at ではなく got to Tokyo Station とする。"
            ]
          },
          {
            "prompt": "A: Excuse me, may I (　　) your phone? Mine is out of battery. — B: Sure, go ahead.",
            "choices": [
              "use",
              "borrow",
              "lend",
              "bring"
            ],
            "why": "その場に置いてあるものや相手の電話・ペンをちょっと使わせてもらうときは borrow（持ち出して借りる）よりも use を使うのが自然で減点されません（lend は「貸す」）。",
            "oneLine": "その場で借りて使う ＝ May I use ~? ／ 図書館から借り出す ＝ borrow！",
            "skill": "語法 borrow / lend / use",
            "rate": 70,
            "difficulty": 3,
            "wrongReasons": [
              "borrow は「（本などを無料で外へ）借り出す」ニュアンスが強く、その場で電話を使うときは use が適切。",
              "lend は「貸す」なので May I lend ~? にすると「私があなたの電話を貸しましょうか」と逆になる！",
              "bring は「持ってくる」であり文意に合わない。"
            ]
          },
          {
            "prompt": "It took me about two hours (　　) making dinner for everyone.",
            "choices": [
              "to finish",
              "finishing",
              "finished",
              "for finish"
            ],
            "why": "It takes [took] ＋ 人 ＋ 時間 ＋ to 原形 で「人が〜するのに（時間）がかかる」を表す必須構文です（後ろの finish の目的語は動名詞 making）。",
            "oneLine": "It takes ＋ 人 ＋ 時間 ＋ to 原形 ＝「人が〜するのに時間がかかる」！",
            "skill": "形式主語 It takes 構文",
            "rate": 75,
            "difficulty": 3,
            "wrongReasons": [
              "It took 人 時間 の後ろは to 不定詞（to finish）をとるのが標準構文である。",
              "過去分詞 finished を続けることはできない。",
              "for の後ろに動詞の原形 finish を置くことはできない。"
            ]
          }
        ]
      }
    ]
  },
  "en3_2": {
    "practice": [
      {
        "id": "en3_2_exp_p1",
        "title": "リスニング条件整理＆整序英作文（並べ替え）徹底演習",
        "category": "リスニング・整序",
        "leadText": "リスニングの時刻・料金・場所変更の聞き取りと、公立入試で配点の高い5〜6語整序問題を組み合わせて攻略します。",
        "explanationSummary": "リスニングの数字問題は「最初の提案 → 相手の都合や割引条件による修正 → 最終決定（Let's do that / Sounds good の直前）」の3段階構造になっています！",
        "surroundingKnowledge": [
          "quarter to five ＝ 5時15分前（4:45） ／ quarter past five ＝ 5時15分過ぎ（5:15） ／ half past six ＝ 6時半（6:30）",
          "a dozen（1ダース＝12個） ／ pair（2つ1組） ／ buy two, get one free（2個買うと1個無料）"
        ],
        "deepDiveTopics": [
          "整序問題で余りやすい副詞・前置詞の処理手順"
        ],
        "questions": [
          {
            "prompt": "【リスニング台本演習】\nBoy: Let's meet at the station at 10:00 tomorrow.\nGirl: The bus to the aquarium leaves at 10:10, so 10:00 is a bit tight. Can we meet twenty minutes earlier?\nBoy: Good idea. See you then!\n2人が明日駅で待ち合わせする時刻はいつか。",
            "choices": [
              "9:40",
              "9:50",
              "10:00",
              "10:20"
            ],
            "why": "最初少年が 10:00 を提案しましたが、少女が「10:10発のバスにはギリギリすぎるから、それより20分早く（twenty minutes earlier）会える？」と修正し少年が同意したため、10:00 の20分前である 9:40 が正解です。",
            "oneLine": "10:00 の twenty minutes earlier（20分前）＝ 9:40！",
            "skill": "リスニング時刻計算",
            "rate": 71,
            "difficulty": 3,
            "wrongReasons": [
              "10:10発のバス基準で20分前と勘違いしたミス（元の待ち合わせ提案 10:00 の20分前なので 9:40！）。",
              "最初に少年が提案した時刻であり、その後の変更を聞き逃した引っかけ選択肢。",
              "20 minutes later（20分遅く）と聞き間違えたうえバス発車後になってしまう時刻。"
            ]
          },
          {
            "prompt": "【リスニング台本演習】\nClerk: Welcome! One notebook is 200 yen, or you can buy a set of three for 500 yen.\nStudent: I need four notebooks, please. Oh, and this 100-yen eraser, too.\n生徒が支払う合計金額はいくらか。",
            "choices": [
              "800円",
              "900円",
              "700円",
              "1,000円"
            ],
            "why": "ノート4冊は「3冊セット500円 ＋ 単品1冊200円 ＝ 700円」、そこに100円の消しゴムを1個足すので合計 800円 になります。",
            "oneLine": "3冊セット500円 ＋ 1冊200円 ＋ 消しゴム100円 ＝ 800円！",
            "skill": "リスニング料金計算",
            "rate": 69,
            "difficulty": 3,
            "wrongReasons": [
              "ノート4冊すべてを単品200円（200×4＋100＝900円）で計算しセット割引を忘れたミス。",
              "ノート4冊分（500＋200＝700円）だけで100円の消しゴムを足し忘れたミス。",
              "3冊セットを2組（1,000円）買ったと誤解した金額。"
            ]
          },
          {
            "prompt": "【整序】「これは私が今まで見た中で最も美しい湖です。」\nThis is [ ① ever / ② the most / ③ I / ④ lake / ⑤ beautiful / ⑥ seen / ⑦ have ].\n正しい順に並べたとき、3番目と6番目に来る番号の組み合わせを選びなさい。",
            "choices": [
              "3番目：④　／　6番目：①",
              "3番目：⑤　／　6番目：⑥",
              "3番目：④　／　6番目：⑥",
              "3番目：③　／　6番目：①"
            ],
            "why": "最上級＋現在完了（経験）の黄金パターン：This is [②the most ⑤beautiful ④lake ③I ⑦have ①ever ⑥seen]. となるため、3番目は④(lake)、6番目は①(ever)です。",
            "oneLine": "the ＋ 最上級 ＋ 名詞 ＋ (that) ＋ S ＋ have ever ＋ 過去分詞！",
            "skill": "整序（最上級＋現在完了）",
            "rate": 62,
            "difficulty": 4,
            "wrongReasons": [
              "the most beautiful の直後に名詞 lake（④）を置かず形容詞で切ってしまった語順ミス。",
              "関係節の終わりが I have seen ever になってしまい ever の位置（過去分詞の直前）が誤り。",
              "名詞 lake が抜けて the most beautiful I have ~ となってしまうミス。"
            ]
          },
          {
            "prompt": "【整序】「あなたに何か温かい飲み物を持ってきましょうか。」\nShall I [ ① hot / ② to / ③ something / ④ bring / ⑤ you / ⑥ drink ]?\n正しい順に並べたとき、2番目と4番目に来る語の組み合わせを選びなさい。",
            "choices": [
              "2番目：⑤(you)　／　4番目：①(hot)",
              "2番目：③(something)　／　4番目：②(to)",
              "2番目：⑤(you)　／　4番目：②(to)",
              "2番目：④(bring)　／　4番目：③(something)"
            ],
            "why": "第4文型 bring ＋ 人(you) ＋ 物(something hot to drink) を組み立てます。Shall I [④bring ⑤you ③something ①hot ②to ⑥drink]? となるため、2番目は⑤(you)、4番目は①(hot)です。",
            "oneLine": "bring 人 something ＋ 形容詞 ＋ to 原形！",
            "skill": "整序（SVOO＋不定詞）",
            "rate": 60,
            "difficulty": 4,
            "wrongReasons": [
              "bring something hot to you なら to が余分に必要になるが選択肢の to は to drink 用なので you を先に置く。",
              "形容詞 hot は -thing で終わる代名詞 something の直後に置く（something hot to drink）。",
              "Shall I の直後は動詞の原形④(bring)が1番目に来るため2番目にはならない。"
            ]
          },
          {
            "prompt": "【対話応答】\nA: Do you mind if I sit next to you?\nB: (　　) Please go ahead.",
            "choices": [
              "Not at all.",
              "Yes, I do.",
              "Yes, please.",
              "You're welcome."
            ],
            "why": "Do you mind if ~? は「〜したら気に障りますか（嫌ですか）」と尋ねているため、許可するときは「いいえ、全く気にしませんよ」を表す No, not at all. / Of course not. と答えます（Yes と言うと「嫌だ」になるので超注意！）。",
            "oneLine": "Do you mind ~? に OK を出す返答 ＝ Not at all. / Of course not.（No系で答える！）",
            "skill": "対話応答 Do you mind",
            "rate": 54,
            "difficulty": 4,
            "wrongReasons": [
              "Do you mind ~? に Yes, I do. と答えると「はい、気にします（＝座らないで）」と拒絶になり後半と矛盾する！",
              "Yes, please. は依頼や勧めへの返答であり Do you mind ~? には使えない。",
              "You're welcome.（どういたしまして）はお礼に対する返答である。"
            ]
          },
          {
            "prompt": "【整序】「このコンピュータの使い方を私に教えてくれませんか。」\nCould you [ ① how / ② use / ③ me / ④ tell / ⑤ to / ⑥ this computer ]?\n正しい順に並べたとき、3番目と5番目に来る語の組み合わせを選びなさい。",
            "choices": [
              "3番目：①(how)　／　5番目：②(use)",
              "3番目：⑤(to)　／　5番目：⑥(this computer)",
              "3番目：①(how)　／　5番目：⑤(to)",
              "3番目：③(me)　／　5番目：②(use)"
            ],
            "why": "tell ＋ 人(me) ＋ 物(how to use this computer：このコンピュータの使い方) の第4文型です。Could you [④tell ③me ①how ⑤to ②use ⑥this computer]? となり、3番目は①(how)、5番目は②(use)です。",
            "oneLine": "tell [show / teach] ＋ 人 ＋ how to 原形！",
            "skill": "整序（SV＋人＋疑問詞to）",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "tell の直後に目的語の人③(me)を置かないと tell how to ~ となり me の行き場がなくなる。",
              "5番目は to の後ろの動詞の原形②(use)であり、5番目が⑤(to)にはならない。",
              "1番目が④(tell)、2番目が③(me)なので3番目に me は来ない。"
            ]
          },
          {
            "prompt": "Could you tell me (　　) the next train leaves for Nagoya?",
            "choices": [
              "when",
              "when does",
              "what time does",
              "that when"
            ],
            "why": "間接疑問文では『疑問詞 ＋ 主語(S) ＋ 動詞(V)』の語順になるため does を使わず when the next train leaves が正解です。",
            "oneLine": "間接疑問文の鉄則＝【疑問詞 ＋ 主語 ＋ 動詞】（途中に do / does / did を入れない！）",
            "skill": "間接疑問文の語順",
            "rate": 78,
            "difficulty": 3,
            "wrongReasons": [
              "疑問文語順のミス。",
              "疑問文語順のミス。",
              "that と when は重ねない。"
            ]
          },
          {
            "prompt": "If I (　　) a bird, I could fly to your town right now.",
            "choices": [
              "were",
              "am",
              "will be",
              "have been"
            ],
            "why": "現在の事実に反する仮定を表す【仮定法過去】では、if 節に過去形 were を使い主節に could / would ＋ 原形を置きます。",
            "oneLine": "仮定法過去＝『If S ＋ 過去形(were), S would / could ＋ 原形』！",
            "skill": "仮定法過去",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "主節の could fly と合わない。",
              "will be は不可。",
              "現在完了形は不可。"
            ]
          },
          {
            "prompt": "The news made all the members of our club very (　　).",
            "choices": [
              "happy",
              "happily",
              "happiness",
              "to happy"
            ],
            "why": "第5文型『make ＋ O（目的語）＋ C（補語＝形容詞）』で「OをC（という状態）にする」を表すため、副詞 happily ではなく形容詞 happy を選びます。",
            "oneLine": "make ＋ O ＋ 形容詞 ＝【Oを（形容詞）の状態にする】（副詞 ~ly にしない引っかけ注意！）",
            "skill": "第5文型 make O C",
            "rate": 82,
            "difficulty": 2,
            "wrongReasons": [
              "副詞は補語Cになれない（入試超頻出の引っかけ）。",
              "名詞「幸福」では「メンバー＝幸福そのもの」になり不自然。",
              "文法的に不可。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en3_2_exp_m1",
        "title": "対話・リスニング表現 スピード実戦チェック②",
        "category": "リスニング・対話",
        "leadText": "道案内・電話応対・天気や体調の定型表現を即答チェックします。",
        "explanationSummary": "電話での This is ~ speaking. / Hold on, please. や体調を聞く What's the matter (with you)? は対話小問の鉄板です。",
        "surroundingKnowledge": [
          "電話で「〜さんをお願いします」＝ May I speak to ~? ／ 「私が〜です」＝ Speaking. / This is ~ speaking."
        ],
        "deepDiveTopics": [
          "電話・買物・道案内の場面別決まり文句"
        ],
        "questions": [
          {
            "prompt": "【電話の対話】A: Hello, may I speak to Ken, please? — B: Sorry, he's out right now. Can I (　　) a message?",
            "choices": [
              "take",
              "leave",
              "make",
              "give"
            ],
            "why": "電話を受けたBが「伝言をお預かりしましょうか」と申し出ているため take a message が正解です（かけた側が「伝言を残す」なら leave a message）。",
            "oneLine": "伝言を預かる ＝ take a message ／ 伝言を残す ＝ leave a message！",
            "skill": "電話の対話表現",
            "rate": 68,
            "difficulty": 3,
            "wrongReasons": [
              "leave a message は電話を【かけた側】が「伝言を残す」ときに使う表現なので立場が逆！",
              "make a message という定型表現は電話応対では使わない。",
              "電話を受けている側が「預かる」ときは give ではなく take a message を使う。"
            ]
          },
          {
            "prompt": "A: What's the (　　), Riku? You don't look well. — B: I have a headache.",
            "choices": [
              "matter",
              "wrong",
              "happen",
              "trouble with"
            ],
            "why": "「どうしたの？」と相手の様子や体調を尋ねる決まり文句は What's the matter (with you)? または冠詞なしの What's wrong (with you)? です。ここでは the があるので matter が正解です。",
            "oneLine": "What's the matter? ＝ What's wrong?（the の有無に注意！）",
            "skill": "体調を尋ねる表現",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "wrong は形容詞なので冠詞 the はつけず What's wrong (with you)? とする。",
              "動詞の原形 happen の前に冠詞 the は置けない（What happened? とする）。",
              "後ろにピリオドしかなく前置詞 with の目的語がないため不可（What's the trouble? なら可）。"
            ]
          },
          {
            "prompt": "A: How long will you stay in Osaka? — B: (　　) Friday.",
            "choices": [
              "Until",
              "By",
              "Since",
              "During"
            ],
            "why": "stay（滞在する）という継続動作に対して「金曜日までずっと」を表す前置詞は until（＝till）です。by Friday は「金曜日までに（完了期限：提出する等）」に使います。",
            "oneLine": "継続「〜までずっと」＝ until ／ 期限「〜までに（1回完了）」＝ by！",
            "skill": "前置詞 until と by",
            "rate": 65,
            "difficulty": 4,
            "wrongReasons": [
              "by Friday は「金曜日までに（1回完了する期限）」を表し、stay（ずっと滞在する継続）には until を使う！",
              "since Friday は「金曜日からずっと」で現在完了形とともに使い、未来の will stay とは合わない。",
              "during の後ろは「期間を表す名詞（during the vacation 等）」を置き特定の曜日1点には使わない。"
            ]
          }
        ]
      }
    ]
  },
  "en4_1": {
    "practice": [
      {
        "id": "en4_1_exp_p1",
        "title": "図書館リニューアル掲示＆中学生意識調査データの複合読解",
        "category": "資料・実用文読解",
        "leadText": "次の市営図書館のお知らせ（Notice）と利用者アンケートのメモを読み、あとの問いに答えなさい。\n\n【Green City Library Renewal Notice】\n・Opening Hours: 9:30 a.m. – 7:00 p.m. (Closed every Monday, except national holidays)\n・Study Room (2nd Floor): 40 seats. Students can reserve a seat up to 3 hours a day using a library card.\n・Weekend Reading Event: Every second and fourth Saturday from 2:00 p.m. (Free; up to 25 people; sign up on our website at least two days before the event).\n・Survey Note (200 junior high students): 45% answered they wanted \"more quiet study seats,\" 30% wanted \"more English comic books,\" 15% wanted \"longer opening hours,\" and 10% chose \"others.\"",
        "explanationSummary": "実用文・グラフ融合問題は ①曜日・祝日の例外規定（except ~）、②予約期限（at least two days before＝少なくとも2日前までに）、③割合（%）から実人数への掛け算（200人×45%＝90人）の3点を正確に照合します。",
        "surroundingKnowledge": [
          "except ~（〜を除いて） vs besides ~（〜に加えて）",
          "up to ~（最大〜まで） ／ at least ~（少なくとも〜） ／ free of charge（無料で）"
        ],
        "deepDiveTopics": [
          "掲示物・Eメール問題での条件照合テクニック"
        ],
        "questions": [
          {
            "prompt": "掲示の内容から、Green City Library の休館日と自習室（Study Room）の利用ルールについて【正しい】ものを選びなさい。",
            "choices": [
              "祝日にあたらない毎週月曜日が休館日で、図書カードを使えば1日最大3時間まで自習室の席を予約できる。",
              "祝日を含めすべての月曜日が休館日で、自習室は予約なしで何時間でも利用できる。",
              "毎週火曜日が休館日で、自習室は1回につき40人グループでのみ予約できる。",
              "年中無休で午前9時半から午後7時まで開いており、自習室の利用には1時間100円かかる。"
            ],
            "why": "Closed every Monday, except national holidays（祝日を除く毎週月曜休館）と reserve a seat up to 3 hours a day using a library card と完全に一致します。",
            "oneLine": "except national holidays（祝日を除いて）＋ up to 3 hours a day（1日最大3時間まで）！",
            "skill": "実用文の条件照合",
            "rate": 82,
            "difficulty": 3,
            "wrongReasons": [
              "except national holidays（祝日を除く）と up to 3 hours a day（予約制・最大3時間）に反する。",
              "休館日は火曜日ではなく月曜日であり、40人は自習室の総席数である。",
              "月曜休館であり、利用料が1時間100円という記述は本文にない（図書カードで無料予約）。"
            ]
          },
          {
            "prompt": "3月第2土曜日の午後2時から開かれる Weekend Reading Event に参加したい場合、ウェブサイトから申し込む期限はいつか。",
            "choices": [
              "その週の木曜日（イベントの少なくとも2日前）まで",
              "イベント当日の午前9時30分まで",
              "イベント前日の金曜日午後7時まで",
              "前の月の最終月曜日まで"
            ],
            "why": "sign up on our website at least two days before the event（少なくともイベントの2日前までにウェブサイトで申し込む）とあるため、土曜日の2日前である木曜日までが正解です。",
            "oneLine": "at least two days before Saturday ＝ 木曜日までに要申込！",
            "skill": "日時条件の読み取り",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "at least two days before the event（少なくとも2日前まで）という条件を見落としている。",
              "1日前（前日金曜）では「少なくとも2日前」の期限に間に合わない。",
              "前の月の最終月曜日までという制限は本文に書かれていない。"
            ]
          },
          {
            "prompt": "アンケートに回答した中学生200人のうち、「より多くの静かな自習席」を望んだ生徒は、「開館時間の延長」を望んだ生徒より【何人多い】か。",
            "choices": [
              "60人",
              "30人",
              "90人",
              "45人"
            ],
            "why": "「静かな自習席」は 45%（200×0.45＝90人）、「開館時間の延長」は 15%（200×0.15＝30人）。差は 90 − 30 ＝ 60人（または 200 × (45% − 15%) ＝ 60人）です！",
            "oneLine": "%のまま答えず実人数（200人 × 30%差 ＝ 60人）に換算する！",
            "skill": "英文統計の計算",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "割合の差 45% − 15% ＝ 30% をそのまま30人と答えてしまった典型的な引っかけミス（母数は200人！）。",
              "「静かな自習席」を望んだ生徒数そのもの（200×45%＝90人）であり、差ではない。",
              "45%という数値だけを人数と取り違えたミス。"
            ]
          },
          {
            "prompt": "本文中の \"sign up\" に最も近い意味を持つ英語表現を選びなさい。",
            "choices": [
              "register one's name to join",
              "write a book review",
              "pay money at the desk",
              "clean up the room"
            ],
            "why": "イベントなどに「参加登録する・申し込む」を表す sign up は register one's name to join と同意です。",
            "oneLine": "sign up (for ~) ＝（イベントや講座に）申し込む・登録する！",
            "skill": "実用熟語 sign up",
            "rate": 75,
            "difficulty": 3,
            "wrongReasons": [
              "読書感想文を書くことではなくイベントへの「参加申し込み・登録」を意味する。",
              "本文に Free（無料）とある通り支払いの意味ではない。",
              "部屋の掃除をするという意味はない。"
            ]
          },
          {
            "prompt": "英作文で『日本の夏はオーストラリアの夏よりも蒸し暑い』と書くとき、比較の対象を誤らずに表した英文として最も適切なものを選びなさい。",
            "choices": [
              "Summer in Japan is more humid than that in Australia.",
              "Summer in Japan is more humid than Australia.",
              "Japan is more humid than summer in Australia.",
              "Summer in Japan is humider as Australia."
            ],
            "why": "「日本の夏」と比べる相手は「オーストラリアの【それ（＝夏）】」なので代名詞 that を使って than that in Australia とします。",
            "oneLine": "『Aの気候』と比べるのは『B（国）』ではなく『that in/of B（Bのそれ）』！",
            "skill": "英作文の比較対象一致",
            "rate": 71,
            "difficulty": 4,
            "wrongReasons": [
              "「夏」と「国」を直接比べた誤り。",
              "「国」と「夏」を比べた誤り。",
              "比較級も接続詞も誤り。"
            ]
          },
          {
            "prompt": "意見論述英作文で『第一に〜。第二に〜。これらの理由から私は…と考える。』と論理的に構成するとき、結論部の書き出しとして最も自然な英語表現はどれか。",
            "choices": [
              "For these reasons, I think that ~",
              "By the way, I don't know ~",
              "Once upon a time, there was ~",
              "Excuse me, could you tell me ~"
            ],
            "why": "三重県後期英作文対策プリントでも推奨されている黄金結論フレーズ『For these reasons, I think (that) ...（これらの理由から、私は〜と考える）』はどんな賛成・反対テーマにも使える万能表現です。",
            "oneLine": "英作文の結論締めフレーズ＝【For these reasons, I think (that) ...】！",
            "skill": "意見英作文の構成表現",
            "rate": 92,
            "difficulty": 1,
            "wrongReasons": [
              "話題を変える表現。",
              "昔話の書き出し。",
              "道案内などの質問表現。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en4_1_exp_m1",
        "title": "実用文・図表重要表現 スピード実戦チェック②",
        "category": "資料・実用文読解",
        "leadText": "掲示・メール・グラフ問題で毎年出る英語表現を即答チェックします。",
        "explanationSummary": "in case of rain（雨天の場合は）、more than half of ~（過半数の〜）、twice as many ~ as ...（…の2倍の数の〜）は全県必須です。",
        "surroundingKnowledge": [
          "be postponed to [until] ~（〜に延期される） ／ be canceled（中止になる）"
        ],
        "deepDiveTopics": [
          "グラフ比較表現（account for ~% / the second largest）"
        ],
        "questions": [
          {
            "prompt": "ポスターの注意書き \"The flea market will be held in the gym (　　) rain.\" の空欄に入る最も適切な語句を選びなさい。",
            "choices": [
              "in case of",
              "instead of",
              "because",
              "as well as"
            ],
            "why": "「雨天の場合には体育館で開催されます」という意味を表す熟語 in case of rain が正解です（because の後ろには S+V が必要）。",
            "oneLine": "in case of rain ＝「雨天の場合には」！",
            "skill": "掲示物の重要熟語",
            "rate": 77,
            "difficulty": 3,
            "wrongReasons": [
              "instead of rain（雨の代わりに体育館で）では意味が不自然になる。",
              "because は接続詞なので名詞 rain だけを後ろに置くことはできない（because of rain なら文法上可だが未然の備えは in case of）。",
              "as well as（〜と同様に）では文意が通らない。"
            ]
          },
          {
            "prompt": "アンケート結果の説明文 \"(　　) half of the students use a bicycle to go to school.\" で「半数以上の生徒（50%超）」を表す語句はどれか。",
            "choices": [
              "More than",
              "Less than",
              "Fewer",
              "As much"
            ],
            "why": "「〜より多い（半数超）」は More than half of ~ で表します（Less than half なら「半数未満」）。",
            "oneLine": "more than half of ~ ＝「半数以上の〜」 ／ less than half of ~ ＝「半数未満の〜」！",
            "skill": "グラフ読解表現",
            "rate": 83,
            "difficulty": 3,
            "wrongReasons": [
              "「半数超（50%より多い）」を表す問題なので Less than（〜未満）は逆の意味になる。",
              "half は単数扱い・量概念として比較するため Fewer half とは言わない（Fewer than ~ が必要かつ意味も逆）。",
              "As much as half なら「半数もの〜」だが than も as も足りず「半数超」にならない。"
            ]
          },
          {
            "prompt": "Eメールの結び \"Please let me know (　　) you can come or not.\" の空欄に入る最も適切な接続詞を選びなさい。",
            "choices": [
              "whether",
              "that",
              "what",
              "which"
            ],
            "why": "後ろに or not を伴い「〜かどうか私に知らせてください」という名詞節をつくる接続詞 whether（または if）が正解です。",
            "oneLine": "whether S V (or not) ＝「SがVするかどうか」！",
            "skill": "名詞節 whether",
            "rate": 74,
            "difficulty": 3,
            "wrongReasons": [
              "後ろに or not があるため「〜ということ」の that は使えない！",
              "know の目的語として完全文 you can come が続いており疑問代名詞 what は入らない。",
              "選択肢が提示されておらず「来るか来ないか（whether ~ or not）」なので which は不適。"
            ]
          }
        ]
      }
    ]
  },
  "en4_2": {
    "practice": [
      {
        "id": "en4_2_exp_p1",
        "title": "対話型長文読解：古い商店街の空き店舗再生プロジェクト",
        "category": "長文総合読解",
        "leadText": "次の高校生 Kenta と留学生 Emma の対話を読み、あとの問いに答えなさい。\n\nKenta: Emma, thank you for coming to Sakura Shopping Street with me today. Ten years ago, this street was always crowded, but now several shops are closed because a big shopping mall opened near the highway.\nEmma: I see. However, the old wooden buildings here have a warm atmosphere. Look at that bakery! There is a long line of people.\nKenta: Yes. Last year, high school students and local farmers started a weekend café next to that bakery. They used an empty store and began selling soup made from vegetables that looked a little strange in shape.\nEmma: Oh, farmers usually can't sell **such vegetables** at supermarkets even though they taste just as good! That reduces food waste and brings young people back to the street.\nKenta: Exactly! Next month, we are going to set up a free study and book-sharing corner inside the café so that junior high students and elderly people can talk and learn together.",
        "explanationSummary": "対話型長文では ①過去と現在の対比（Ten years ago vs now）、②指示語 such ~ の直前照合、③目的を表す so that S can ~（Sが〜できるように）の3箇所がそのまま設問になります。",
        "surroundingKnowledge": [
          "so that S can [will] 原形 ＝「Sが〜できるように（目的）」",
          "even though S V ＝「たとえ〜だとしても・〜であるにもかかわらず」",
          "food waste（食品ロス） ／ atmosphere（雰囲気・大気）"
        ],
        "deepDiveTopics": [
          "SDGs・地域活性化テーマの長文頻出語彙"
        ],
        "questions": [
          {
            "prompt": "Kenta の説明によると、さくら商店街で現在いくつかの店が閉まっている理由は何か。",
            "choices": [
              "高速道路の近くに大型ショッピングモールが開店したから。",
              "10年前の台風で古い木造の建物がすべて壊れてしまったから。",
              "地域の農家が野菜の栽培を完全にやめてしまったから。",
              "商店街のパン屋が別の町へ移転してしまったから。"
            ],
            "why": "第1発言の because a big shopping mall opened near the highway と一致します。",
            "oneLine": "because の後ろの原因節を正確に特定する！",
            "skill": "長文理由把握",
            "rate": 86,
            "difficulty": 3,
            "wrongReasons": [
              "台風で建物が壊れたという記述は本文に一切ない。",
              "農家は栽培を続けており、形が不揃いな野菜をカフェに提供している。",
              "パン屋の移転ではなく高速道路近くの大型モール開店が原因である。"
            ]
          },
          {
            "prompt": "下線部 **such vegetables** が指している具体的な内容を最も適切に表しているものを選びなさい。",
            "choices": [
              "味は同じようにおいしいが、形が少し変わっている野菜",
              "海外から輸入された珍しい種類の高価な野菜",
              "学校の屋上で高校生たちが水耕栽培した野菜",
              "賞味期限が切れて食べられなくなった野菜"
            ],
            "why": "直前のKentaの発言 vegetables that looked a little strange in shape と、直後のEmmaの発言 even though they taste just as good を統合すると正解が導けます。",
            "oneLine": "such ＋ 名詞 は必ず直前の1〜2文の具体説明を指す！",
            "skill": "指示語把握",
            "rate": 82,
            "difficulty": 3,
            "wrongReasons": [
              "海外からの高価な輸入野菜ではなく、地元農家が育てた形が少し不揃いな野菜である。",
              "高校生の水耕栽培ではなく地元農家（local farmers）から安く仕入れた野菜である。",
              "味は同じようにおいしい（taste just as good）新鮮な規格外野菜であり、腐敗したものではない。"
            ]
          },
          {
            "prompt": "Emma は高校生と地元農家の週末カフェの取り組みにはどのような2つの良い効果があると述べているか。",
            "choices": [
              "食品ロスを減らし、若者を商店街に呼び戻す効果",
              "バスの本数を増やし、観光客の宿泊費を下げる効果",
              "英語の本を増やし、図書館の混雑を解消する効果",
              "電気代を節約し、プラスチックごみをゼロにする効果"
            ],
            "why": "Emmaの2つ目の発言 \"That reduces food waste and brings young people back to the street.\" に明確に書かれています。",
            "oneLine": "reduce food waste（食品ロス削減）＋ bring young people back（若者を呼び戻す）！",
            "skill": "長文要点把握",
            "rate": 84,
            "difficulty": 3,
            "wrongReasons": [
              "バス増便や宿泊費に関する話題は本文に登場しない。",
              "図書館の混雑ではなく商店街の活性化と食品ロス削減の話である。",
              "電気代やプラスチックごみについての記述はない。"
            ]
          },
          {
            "prompt": "来月カフェの中に新しく設置される予定のものとその目的として、本文の内容と【一致する】ものを選びなさい。",
            "choices": [
              "中学生と高齢者が交流し学び合えるようにするための、無料の学習＆本シェアコーナー",
              "留学生に日本の伝統料理の作り方を教えるための有料料理教室",
              "農家がインターネットで全国に野菜を発送するための配送センター",
              "買い物客が自転車を無料で修理できる駐輪スペース"
            ],
            "why": "最後のKentaの発言 set up a free study and book-sharing corner ... so that junior high students and elderly people can talk and learn together と完全に一致します。",
            "oneLine": "Next month, we are going to ~（今後の計画）と so that S can ~（目的）をセットで読む！",
            "skill": "内容一致判定",
            "rate": 83,
            "difficulty": 3,
            "wrongReasons": [
              "有料の料理教室ではなく無料の学習・本シェアコーナー（free study and book-sharing corner）である。",
              "野菜のネット発送センターという記述はない。",
              "無料の自転車修理スペースという記述はない。"
            ]
          },
          {
            "prompt": "We should take care of our health (　　) we can enjoy our school trip next week.",
            "choices": [
              "so that",
              "because of",
              "instead of",
              "in spite of"
            ],
            "why": "後ろに S can V が続いているため『so that S can ~（Sが〜できるように）』が正解です。",
            "oneLine": "so that ＋ 主語 ＋ can ~ ＝【…が〜できるように】！",
            "skill": "接続詞 so that S can ~",
            "rate": 81,
            "difficulty": 2,
            "wrongReasons": [
              "後ろは名詞。",
              "後ろは名詞・動名詞。",
              "後ろは名詞。"
            ]
          },
          {
            "prompt": "長文読解で指示語『this / these / such + 名詞』が指す内容を探すときの原則として最も適切なものを選びなさい。",
            "choices": [
              "原則として直前の1〜2文に戻り、単数なら this/that、複数の事柄や文全体なら these/this に対応する具体的な内容を確認する",
              "必ず次の段落の最後の文だけを見る",
              "本文を読まずに選択肢の長さだけで決める",
              "指示語より後ろにある疑問文だけを見る"
            ],
            "why": "英語長文の下線部内容説明や空欄補充では、指示語（it / they / this / these / such ~）は原則として【直前の文】の同義表現を言い換えています。",
            "oneLine": "英語長文の指示語（this / these / it / they）は【直前の1〜2文】で単複を合わせて特定！",
            "skill": "長文読解の指示語追跡",
            "rate": 90,
            "difficulty": 1,
            "wrongReasons": [
              "後ろの段落ではなく、原則として直前の1〜2文をさかのぼって指示対象を探す。",
              "本文中に書かれていない自分の感想や一般論を補うのではなく、直前の具体的語句を代入する。",
              "最終段落の結論ではなく、下線部の直前にある単数・複数の一致する名詞句を追跡する。"
            ]
          }
        ]
      }
    ],
    "miniTest": [
      {
        "id": "en4_2_exp_m1",
        "title": "長文読解重要構文＆論理接続詞 スピード実戦チェック②",
        "category": "長文総合読解",
        "leadText": "長文の文脈の流れを決める接続副詞・熟語を素早く判定しましょう。",
        "explanationSummary": "for example（具体例）、however（逆接）、therefore / as a result（結果）、in other words（言い換え）の4大論理マーカーは英語・国語共通の読解武器です。",
        "surroundingKnowledge": [
          "not only A but (also) B ＝ B as well as A（AだけでなくBも）※強調される中心はB！"
        ],
        "deepDiveTopics": [
          "論理マーカーによる段落要旨の特定"
        ],
        "questions": [
          {
            "prompt": "Many students wanted a place to study after school. (　　), the city decided to open the community center until 8 p.m.",
            "choices": [
              "Therefore",
              "However",
              "For example",
              "Instead of"
            ],
            "why": "「多くの生徒が放課後に勉強する場所を求めていた。【それゆえ（その結果）】、市は公民館を午後8時まで開けることに決めた」という因果の流れなので Therefore（＝As a result）が正解です。",
            "oneLine": "原因 → 結果をつなぐ接続副詞 ＝ Therefore / As a result！",
            "skill": "長文の論理接続",
            "rate": 79,
            "difficulty": 3,
            "wrongReasons": [
              "要望を受けて開館時間を延長した順当な結果なので逆接の However（しかしながら）は逆になる。",
              "具体例ではなく結論・対応を述べているため For example は不適。",
              "Instead of は前置詞句なのでカンマだけで文頭副詞のようには使えない（副詞なら Instead）。"
            ]
          },
          {
            "prompt": "This eco-bag is not only light (　　) very strong, so I use it every day.",
            "choices": [
              "but also",
              "and also",
              "or",
              "as well"
            ],
            "why": "not only A but (also) B で「A（軽い）だけでなくB（とても丈夫）でもある」を表す相関表現です。",
            "oneLine": "not only A but (also) B ＝「AだけでなくBも」（＝ B as well as A）！",
            "skill": "長文頻出相関表現",
            "rate": 85,
            "difficulty": 3,
            "wrongReasons": [
              "not only A の相方は and ではなく but (also) B が鉄則！",
              "not only A or B という形は存在しない（either A or B と混同しない）。",
              "as well は文末に置く副詞句であり空欄の位置には入らない。"
            ]
          },
          {
            "prompt": "I turned on the light (　　) I could read the map clearly in the tent.",
            "choices": [
              "so that",
              "in order",
              "even if",
              "as soon as"
            ],
            "why": "後ろに主語＋助動詞（I could read ~）が続き「地図をはっきり読めるように明かりをつけた」という目的を表す接続詞は so that S can [could] ~ です（in order なら in order to read）。",
            "oneLine": "目的節をつくる接続詞 ＝ so that ＋ S ＋ can [could] ＋ 原形！",
            "skill": "目的構文 so that",
            "rate": 76,
            "difficulty": 3,
            "wrongReasons": [
              "in order の後ろに直接 S＋V の節は続けられない（in order that S may ~ または in order to 原形）。",
              "even if（たとえ〜でも）では「地図を読むために明かりをつけた」目的の意味にならない。",
              "as soon as（〜するとすぐに）では could read と時制・意味がつながらない。"
            ]
          }
        ]
      }
    ]
  }
};
