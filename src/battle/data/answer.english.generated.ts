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
 * ■ 収録数: 54 問（oneLine を持つ問題だけ）
 * -------------------------------------------------------------------
 * 機械生成の問題は元データに1行解答が無いので入っていない。
 * 画面側は「無い問題は答えの行を出さない」作りにしてある。
 *
 * ■ このファイルは何も import しない（型すら import しない）。
 */

/** [出題ID, 試合後に出す1行解答] */
export const ANSWERS: readonly (readonly [string, string])[] = [
  ["q:en1_1:en1_1_mini:en1_1_mini_q1","「〜しなくてもよい（不必要）」は don't have to ＋動詞の原形！"],
  ["q:en1_1:en1_1_mini:en1_1_mini_q2","所要時間（About fifty minutes.）を尋ねるときは How long does it take ~?"],
  ["q:en1_1:en1_1_mini:en1_1_mini_q3","two days ago があるので過去形！ read の過去形はつづりが同じ read（発音はレッド）。"],
  ["q:en1_1:en1_1_mini:en1_1_mini_q4","「（私が）〜しましょうか」と申し出る表現は Shall I ~?"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q1","「〜しなくてもよい（不必要）」は don't have to ＋動詞の原形！"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q2","所要時間（About fifty minutes.）を尋ねるときは How long does it take ~?"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q3","two days ago があるので過去形！ read の過去形はつづりが同じ read（発音はレッド）。"],
  ["q:en1_1:en1_1_p1:en1_1_p1_q4","「（私が）〜しましょうか」と申し出る表現は Shall I ~?"],
  ["q:en1_2:en1_2_mini:en1_2_mini_q1","enjoy の目的語は必ず動名詞（-ing）！ to不定詞は置けない。"],
  ["q:en1_2:en1_2_mini:en1_2_mini_q2","「もし〜なら」の条件節（If ...）の中では、未来のことでも現在形を使う！"],
  ["q:en1_2:en1_2_mini:en1_2_mini_q3","It is [形容詞] for A to do（Aが〜することは…だ）の意味上の主語は for！"],
  ["q:en1_2:en1_2_mini:en1_2_mini_q4","buy の目的語（「何を」買うべきか）が空いているので what to buy！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q1","enjoy の目的語は必ず動名詞（-ing）！ to不定詞は置けない。"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q2","「もし〜なら」の条件節（If ...）の中では、未来のことでも現在形を使う！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q3","It is [形容詞] for A to do（Aが〜することは…だ）の意味上の主語は for！"],
  ["q:en1_2:en1_2_p1:en1_2_p1_q4","buy の目的語（「何を」買うべきか）が空いているので what to buy！"],
  ["q:en1_3:en1_3_mini:en1_3_mini_q1","one of the ＋最上級＋【複数名詞】！「山々のうちの1つ」だから mountains！"],
  ["q:en1_3:en1_3_mini:en1_3_mini_q2","動名詞句（Listening to ...）が主語のときは【三人称単数扱い】！ songs に釣られない！"],
  ["q:en1_3:en1_3_mini:en1_3_mini_q3","be covered with ~（〜で覆われている）は受動態の重要連語！"],
  ["q:en1_3:en1_3_mini:en1_3_mini_q4","比較級 larger を「ずっと大きい」と強めるのは much（very は不可）！"],
  ["q:en1_3:en1_3_p1:en1_3_p1_q1","one of the ＋最上級＋【複数名詞】！「山々のうちの1つ」だから mountains！"],
  ["q:en1_3:en1_3_p1:en1_3_p1_q2","動名詞句（Listening to ...）が主語のときは【三人称単数扱い】！ songs に釣られない！"],
  ["q:en1_3:en1_3_p1:en1_3_p1_q3","be covered with ~（〜で覆われている）は受動態の重要連語！"],
  ["q:en1_3:en1_3_p1:en1_3_p1_q4","比較級 larger を「ずっと大きい」と強めるのは much（very は不可）！"],
  ["q:en2_1:en2_1_mini:en2_1_mini_q1","「〜へ行ったことがある」は have been to ~！（gone にすると今ここにいないことになる）"],
  ["q:en2_1:en2_1_mini:en2_1_mini_q2","since yesterday morning（昨日の朝から今までずっと降り続けている）→ has been raining！"],
  ["q:en2_1:en2_1_mini:en2_1_mini_q3","現在完了の完了用法で、疑問文の文末「もう」・否定文「まだ」はどちらも yet！"],
  ["q:en2_1:en2_1_mini:en2_1_mini_q4","be動詞は状態動詞なので進行形にしない！ since がある継続は have been。"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q1","「〜へ行ったことがある」は have been to ~！（gone にすると今ここにいないことになる）"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q2","since yesterday morning（昨日の朝から今までずっと降り続けている）→ has been raining！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q3","現在完了の完了用法で、疑問文の文末「もう」・否定文「まだ」はどちらも yet！"],
  ["q:en2_1:en2_1_p1:en2_1_p1_q4","be動詞は状態動詞なので進行形にしない！ since がある継続は have been。"],
  ["q:en2_2:en2_2_mini:en2_2_mini_q1","the picture（絵）は祖父によって「描かれた」側（受動）なので過去分詞 painted！"],
  ["q:en2_2:en2_2_mini:en2_2_mini_q2","先行詞が a friend（人）で、直後に動詞 lives が続くから主格の who！"],
  ["q:en2_2:en2_2_mini:en2_2_mini_q3","間接疑問文は【疑問詞 ＋ 主語 ＋ 動詞】の肯定文語順！ does は消えて opens になる！"],
  ["q:en2_2:en2_2_mini:en2_2_mini_q4","now なのに後半が would go → 現在の事実と逆の仮定（仮定法過去）だから had！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q1","the picture（絵）は祖父によって「描かれた」側（受動）なので過去分詞 painted！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q2","先行詞が a friend（人）で、直後に動詞 lives が続くから主格の who！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q3","間接疑問文は【疑問詞 ＋ 主語 ＋ 動詞】の肯定文語順！ does は消えて opens になる！"],
  ["q:en2_2:en2_2_p1:en2_2_p1_q4","now なのに後半が would go → 現在の事実と逆の仮定（仮定法過去）だから had！"],
  ["q:en3_1:en3_1_mini:en3_1_mini_q1","How about ~ing?（〜するのはどう？）の about は前置詞なので後ろは必ず -ing！"],
  ["q:en3_1:en3_1_mini:en3_1_mini_q2","職業の単数には必ず冠詞 a をつけ（a doctor）、目的「〜するために」は to ＋原形！"],
  ["q:en3_1:en3_1_mini:en3_1_mini_q3","look forward to ~ing の to は前置詞！ 後ろは動詞の原形ではなく動名詞 ~ing！"],
  ["q:en3_1:en3_1_mini:en3_1_mini_q4","× I am fun（私が面白い人間だ）に注意！ It is fun for me to ~ または I enjoy ~ing を使う！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q1","How about ~ing?（〜するのはどう？）の about は前置詞なので後ろは必ず -ing！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q2","職業の単数には必ず冠詞 a をつけ（a doctor）、目的「〜するために」は to ＋原形！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q3","look forward to ~ing の to は前置詞！ 後ろは動詞の原形ではなく動名詞 ~ing！"],
  ["q:en3_1:en3_1_p1:en3_1_p1_q4","× I am fun（私が面白い人間だ）に注意！ It is fun for me to ~ または I enjoy ~ing を使う！"],
  ["q:en3_2:en3_2_mini:en3_2_mini_q1","中学生以下は無料（Saki＝中学生0円、弟10歳＝0円）、大人（父）1人分の300円のみ！"],
  ["q:en3_2:en3_2_mini:en3_2_mini_q2","If it rains, the outdoor market will be held in Hall B.（雨天時はホールBで開催）！"],
  ["q:en3_2:en3_2_mini:en3_2_mini_q3","starts at 1:30 p.m. ＋ Please come 10 minutes before it starts. → 1:20 p.m.までに来る！"],
  ["q:en3_2:en3_2_p1:en3_2_p1_q1","中学生以下は無料（Saki＝中学生0円、弟10歳＝0円）、大人（父）1人分の300円のみ！"],
  ["q:en3_2:en3_2_p1:en3_2_p1_q2","If it rains, the outdoor market will be held in Hall B.（雨天時はホールBで開催）！"],
  ["q:en3_2:en3_2_p1:en3_2_p1_q3","starts at 1:30 p.m. ＋ Please come 10 minutes before it starts. → 1:20 p.m.までに来る！"],
];
