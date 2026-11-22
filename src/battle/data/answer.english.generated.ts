/**
 * ===================================================================
 * 対戦の解答（試合後に出す1行解答）: english（自動生成・手で編集しないこと）
 * ===================================================================
 *
 * ★このファイルは scripts/gen-battle-pool.mts が生成する。★
 * 手で書き換えても次の生成で消える。直したいときは
 * src/battle/data/authored/*.json の oneLine を直してから
 *
 *     npm run gen:battle-pool
 *
 * を実行すること。
 *
 * -------------------------------------------------------------------
 * ■ ★これは出題プールとは別のファイルである★
 * -------------------------------------------------------------------
 * 出題プール（pool.english.generated.ts）は対戦が始まる前に読み込まれる。
 * そこに答えを混ぜると、通信を覗くだけで全問の答えが分かってしまう。
 * このファイルは ★試合が終わってリザルト画面が出たときだけ★ 読み込む。
 *
 * -------------------------------------------------------------------
 * ■ 収録数: 59 問（oneLine を持つ問題だけ）
 * -------------------------------------------------------------------
 * 機械生成の問題は元データに1行解答が無いので入っていない。
 * 画面側は「無い問題は答えの行を出さない」作りにしてある。
 *
 * ■ このファイルは何も import しない（型すら import しない）。
 */

/** [出題ID, 試合後に出す1行解答] */
export const ANSWERS: readonly (readonly [string, string])[] = [
  ["q:en1_1:en1_1_m1:en1_1_m1_q1","was studying ＝ 「昨夜父が帰宅したとき、ちょうど〜していた」＝過去進行形 was studying！"],
  ["q:en1_1:en1_1_m1:en1_1_m1_q2","must not ＝ 試験中のスマホ使用は【禁止】なので must not（〜してはいけない）！"],
  ["q:en1_1:en1_1_m1:en1_1_m1_q3","Whose ＝ It's my brother's.（兄のものです＝所有）に対応する疑問詞は Whose ＋名詞！"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q1","don't have to ＝ 「〜しなくてもよい（不必要）」は don't have to ＋動詞の原形！"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q2","How long ＝ 所要時間（About fifty minutes.）を尋ねる鉄板型は How long does it take ~?"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q3","read ＝ two days ago があるから過去形！ read の過去形はつづりそのまま read［red］！"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q4","Shall ＝ 「（私が）〜しましょうか」と申し出る表現は Shall I ~?（＝Can I ~?）"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q5","How often ＝ Twice a month（月に2回＝頻度）を導く疑問詞は How often！"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q6","is going to ＝ 目の前の根拠（黒い雲）から「〜しそうだ」と予測する未来は be going to ＋原形！"],
  ["q:en1_2:en1_2_m1:en1_2_m1_q1","too ＝ so 形容詞 that S can't ~ ⇔ too 形容詞 (for 人) to 原形「…すぎて〜できない」！"],
  ["q:en1_2:en1_2_m1:en1_2_m1_q2","talking ＝ 「〜するのをやめる」は stop ~ing！（stop to 原形＝〜するために立ち止まる）"],
  ["q:en1_2:en1_2_m1:en1_2_m1_q3","cold ＝ as と as の間は必ず【原級（元の形）】！ not as cold as yesterday ＝ 昨日ほど寒くない！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q1","is ＝ 「もし明日〜なら」の if 節・when 節の中では、未来のことでも【現在形】にする！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q2","taking ＝ enjoy / finish / stop / practice の後ろは必ず動名詞（~ing）！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q3","for ＝ It is ＋形容詞＋【for 人】＋ to 原形！（人の性質 kind / nice のときだけ of 人）"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q4","lake ＝ 比較級 ＋ than any other ＋【単数名詞】＝「他のどの〜よりも…だ」！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q5","what ＝ buy の目的語「何を」が空いているので what to buy（何を買うべきか）！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q6","much ＝ 比較級を「ずっと〜」と強めるときは much / a lot / far / even！（very は絶対NG）"],
  ["q:en2_1:en2_1_m1:en2_1_m1_q1","covered ＝ 「〜に覆われている」は be covered with ~！（by ではなく with を使う代表格）"],
  ["q:en2_1:en2_1_m1:en2_1_m1_q2","yet ＝ 現在完了（完了）の疑問文の文末「もう〜しましたか」は yet！（否定文では「まだ」）"],
  ["q:en2_1:en2_1_m1:en2_1_m1_q3","use ＝ 「Oに（許可して）〜させてくれる」は let ＋ O ＋ 動詞の原形！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q1","from ＝ 大豆→豆腐のように性質・見た目が変わる加工（原料）は be made from！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q2","has lived ＝ since ＋過去の時点（〜以来ずっと）があるから現在完了（継続）has lived！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q3","gone ＝ She isn't here now.（今ここにいない）→「〜へ行ってしまった」＝ has gone to！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q4","feel ＝ make ＋ O ＋ 動詞の原形（または形容詞）！ to を絶対につけない！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q5","not to ＝ 「人に〜しないように言う」は tell [ask] ＋ 人 ＋【not to ＋原形】！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q6","has been ＝ 過去から今まで動作がずっと続いている（3時間降り続けている）＝ has been ~ing！"],
  ["q:en2_2:en2_2_m1:en2_2_m1_q1","could speak ＝ I can't ~ を受けて「〜できたらいいのに」と願う表現は I wish I could ＋原形！"],
  ["q:en2_2:en2_2_m1:en2_2_m1_q2","playing ＝ 少年が能動的に「ギターを弾いている」ので現在分詞 playing the guitar！"],
  ["q:en2_2:en2_2_m1:en2_2_m1_q3","which ＝ 物の先行詞 The camera ＋ 後ろで gave me [ 目的語 ] が空いている → 目的格 which（または that）！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q1","spoken ＝ The language（言語）は人々に「話される」受動関係 → 過去分詞 spoken！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q2","the nearest bus stop is ＝ 間接疑問文は【疑問詞 ＋ 主語（the nearest bus stop）＋ 動詞（is）】の順！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q3","whose ＝ 先行詞 a friend と直後の名詞 father が「その友人の父（his/her father）」でつながる → 所有格 whose！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q4","had ＝ now（今）の話なのに主節が would go！ 現在の事実に反する仮定は【過去形 had】を使う！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q5","that ＝ 先行詞が「人＋動物（the girl and her dog）」のときは関係代名詞【that】を選ぶ！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q6","the library opens ＝ does が消えて肯定文語順に戻るとき、the library に合わせて opens と【-s を復活】させる！"],
  ["q:en3_1:en3_1_m1:en3_1_m1_q1","Why don't you ＝ 相手に「〜してはどうですか」と助言し、後ろが動詞の原形なら Why don't you ＋原形 ~?"],
  ["q:en3_1:en3_1_m1:en3_1_m1_q2","I want to have a job that makes many people smile in the future. ＝ a job that makes many people smile（多くの人を笑顔にする仕事）＝関係代名詞＋使役makeの黄金コンボ！"],
  ["q:en3_1:en3_1_m1:en3_1_m1_q3","Not at all. ＝ Would you mind ~ing?（〜していただけませんか＝気になりませんか）に快諾するときは Not at all. / Of course not. / Sure.！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q1","Learning about the cultures of many countries is fun. ＝ 動名詞主語 V-ing ... は直前が複数名詞 countries でも必ず【単数動詞 is】で受ける！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q2","We went camping by the lake and cooked curry together. ＝ 疑問詞 What には Yes/No 厳禁！ last Sunday に反応して【We ＋ 過去形】で答える！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q3","We discussed the school festival in our class yesterday. ＝ discuss（〜について議論する）・visit（〜を訪れる）は他動詞！ about や to をつけない！（不安なら talk about に言い換える）"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q4","You can eat fresh and ＝ 場所・体験をおすすめするときの鉄板2文目：You can ＋ 原形 ~ there.！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q5","My mother taught me how to ride a bike. ＝ teach [show / tell] ＋ 人 ＋ how to 原形「人に〜のしかたを教える」！"],
  ["q:en4_1:en4_1_m1:en4_1_m1_q1","最大8冊・3週間 ＝ In August, up to 8 books for three weeks.（カッコ内の usually は通常期！）"],
  ["q:en4_1:en4_1_m1:en4_1_m1_q2","カウンターで座席を予約すること ＝ reserve a seat at the counter before using it ＝ 使う前にカウンターで席を予約する！"],
  ["q:en4_1:en4_1_m1:en4_1_m1_q3","火曜日の午前9時00分 ＝ 開館は 9:30 a.m. から！ 火曜でも午前9時00分はまだ開いていない！"],
  ["q:en4_1:en4_1_p1:en4_1_p1_q1","forty percent ＝ Cooking world food は 48 / 120 人 ＝ 40%（forty percent）！"],
  ["q:en4_1:en4_1_p1:en4_1_p1_q2","希望者が48人いるのに対し、会場のRoom Aには1回につき最大25人までしか入れないから。 ＝ That's why の直前を見る！ Room A can hold at most 25 people in one session.（定員25人＜希望48人）が根拠！"],
  ["q:en4_1:en4_1_p1:en4_1_p1_q3","午後1時30分からの料理企画に参加し、エプロンとタオルを持参する。 ＝ 11:00〜12:30のゲーム後は 1:30 p.m. の午後の料理枠へ！ 持ち物は apron & towel、料金は free！"],
  ["q:en4_1:en4_1_p1:en4_1_p1_q4","「音楽を聴くこと」を選んだ生徒数は、全回答者のちょうど4分の1である。 ＝ Listening to music ＝ 30人（25%）＝ 全回答者120人のちょうど4分の1！"],
  ["q:en4_2:en4_2_m1:en4_2_m1_q1","However ＝ 「多くの人はAだと思う。しかし実際はBだ」の一般通念⇔筆者の主張パターンは However！"],
  ["q:en4_2:en4_2_m1:en4_2_m1_q2","Instead of ＝ Instead of ~ing ＝「〜する代わりに」（捨てる代わりにエコバッグを作る）！"],
  ["q:en4_2:en4_2_m1:en4_2_m1_q3","thanks to ＝ thanks to ＋ 名詞 ＝「〜のおかげで」！"],
  ["q:en4_2:en4_2_p1:en4_2_p1_q1","大きなスーパーマーケットに何でもそろっているため、古い商店街はもはや必要ないと思っていた。 ＝ until last spring, I thought, \"Old shopping streets are not necessary anymore...\" がそのまま根拠！"],
  ["q:en4_2:en4_2_p1:en4_2_p1_q2","加藤さんのパン屋の隣にあった空き店舗を、地元の高校生たちと改装して誰でも無料で座れるようにした場所。 ＝ 指示語 that 名詞 は直前の文（an empty store next to his bakery）を指す！"],
  ["q:en4_2:en4_2_p1:en4_2_p1_q3","年配の女性が、泣いている赤ちゃんの優しい抱き方を若い母親に教え、母親がほっとして微笑んでいた。 ＝ showed the mother how to hold the crying baby gently, and the mother smiled with relief.！"],
  ["q:en4_2:en4_2_p1:en4_2_p1_q4","月に2回、そのスペースで小学生向けに「宿題＆英語カフェ」を開いている。 ＝ Since last summer ... held a \"Homework & English Cafe\" for elementary school children ... twice a month.！"],
  ["q:en4_2:en4_2_p1:en4_2_p1_q5","地域には世代を超えて人々がつながる場所が大切であり、生徒の小さな行動でも地域に新しい活気をもたらすことができる。 ＝ 最終文 I realized that even small actions by students can bring new life to our community. が主題！"],
];
