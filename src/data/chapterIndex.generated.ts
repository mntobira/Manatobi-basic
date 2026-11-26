/**
 * ===================================================================
 * 章インデックス（自動生成ファイル・手で編集しないこと）
 * ===================================================================
 */

export interface ChapterIndexEntry {
  id: string;
  partId?: string;
  partTitle?: string;
  title?: string;
  abstractTitle?: string;
  realTitle?: string;
  problemCount: number;
  practiceProblemCount?: number;
  miniTestProblemCount?: number;
  subQuestionCount?: number;
  practiceSubQuestionCount?: number;
  miniTestSubQuestionCount?: number;
}

export interface SubjectIndexEntry {
  id: string;
  label: string;
  chapters: readonly ChapterIndexEntry[];
}

export const SUBJECT_INDEX: readonly SubjectIndexEntry[] = [
  {
    "id": "english",
    "label": "英語",
    "chapters": [
      {
        "id": "en1_1",
        "partId": "en_part1",
        "partTitle": "第1部：中1・中2 英文法の土台",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 22,
        "practiceSubQuestionCount": 16,
        "miniTestSubQuestionCount": 6,
        "title": "時制・疑問詞・助動詞の鉄則",
        "abstractTitle": "時制・疑問詞・助動詞の鉄則",
        "realTitle": "一般動詞・過去形・未来表現・助動詞（must / have to / should / may）"
      },
      {
        "id": "en1_2",
        "partId": "en_part1",
        "partTitle": "第1部：中1・中2 英文法の土台",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 27,
        "practiceSubQuestionCount": 21,
        "miniTestSubQuestionCount": 6,
        "title": "不定詞・動名詞・接続詞・比較の完全攻略",
        "abstractTitle": "不定詞・動名詞・接続詞・比較の完全攻略",
        "realTitle": "It is ... for A to ~・動名詞のみをとる動詞・if/whenの現在形・比較級と最上級"
      },
      {
        "id": "en1_3",
        "partId": "en_part1",
        "partTitle": "第1部：中1・中2 英文法の土台",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 22,
        "practiceSubQuestionCount": 16,
        "miniTestSubQuestionCount": 6,
        "title": "第4文型（to/for書き換え）・第5文型・感嘆文・命令文・代名詞",
        "abstractTitle": "第4文型（to/for書き換え）・第5文型・感嘆文・命令文・代名詞",
        "realTitle": "SVOO（give/buy）とSVOC（make/call/keep）・What/How感嘆文・命令文＋and/or・独立所有格"
      },
      {
        "id": "en2_1",
        "partId": "en_part2",
        "partTitle": "第2部：中3 発展英文法（受動態・現在完了・分詞・関係代名詞・仮定法）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 22,
        "practiceSubQuestionCount": 16,
        "miniTestSubQuestionCount": 6,
        "title": "受動態・現在完了形・使役/知覚構造の急所",
        "abstractTitle": "受動態・現在完了形・使役/知覚構造の急所",
        "realTitle": "by以外の受動態・現在完了3用法と現在完了進行形・make/let/help・tell/want 人 to"
      },
      {
        "id": "en2_2",
        "partId": "en_part2",
        "partTitle": "第2部：中3 発展英文法（受動態・現在完了・分詞・関係代名詞・仮定法）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 27,
        "practiceSubQuestionCount": 21,
        "miniTestSubQuestionCount": 6,
        "title": "後置修飾（分詞・関係代名詞）・間接疑問文・仮定法",
        "abstractTitle": "後置修飾（分詞・関係代名詞）・間接疑問文・仮定法",
        "realTitle": "現在分詞/過去分詞の識別・関係代名詞主格/目的格/whose・間接疑問文の語順・I wish / If I were"
      },
      {
        "id": "en3_1",
        "partId": "en_part3",
        "partTitle": "第3部：英作文・対話応答・語順整序（三重県後期プリント完全準拠）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 22,
        "practiceSubQuestionCount": 16,
        "miniTestSubQuestionCount": 6,
        "title": "英作文の必須構文21選・減点回避＆誤文訂正スキル",
        "abstractTitle": "英作文の必須構文21選・減点回避＆誤文訂正スキル",
        "realTitle": "三重県後期選抜 英作文対策プリント直結！2点満点基準・言い換え術・頻出整序"
      },
      {
        "id": "en3_2",
        "partId": "en_part3",
        "partTitle": "第3部：英作文・対話応答・語順整序（三重県後期プリント完全準拠）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 20,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 6,
        "title": "リスニング計算＆対話・整序英作文（並べ替え）実戦攻略",
        "abstractTitle": "リスニング計算＆対話・整序英作文（並べ替え）実戦攻略",
        "realTitle": "時刻・割引リスニング問題・疑問詞/後置修飾の整序英作文・状況英作文判定"
      },
      {
        "id": "en4_1",
        "partId": "en_part4",
        "partTitle": "第4部：資料・グラフ融合読解 ＆ 本格長文読解（大問4・5対策）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 20,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 6,
        "title": "アンケートグラフ＆案内ポスター融合読解（情報検索型）",
        "abstractTitle": "アンケートグラフ＆案内ポスター融合読解（情報検索型）",
        "realTitle": "図表の数値計算＋Eメール・掲示物の条件照合リーディング"
      },
      {
        "id": "en4_2",
        "partId": "en_part4",
        "partTitle": "第4部：資料・グラフ融合読解 ＆ 本格長文読解（大問4・5対策）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 11,
        "miniTestSubQuestionCount": 6,
        "title": "スピーチ・物語長文の総合読解（指示語・要旨・心情変化）",
        "abstractTitle": "スピーチ・物語長文の総合読解（指示語・要旨・心情変化）",
        "realTitle": "300語規模の本格スピーチ読解：地域課題と高校生のアイデア（全県長文対策）"
      }
    ]
  },
  {
    "id": "math",
    "label": "数学",
    "chapters": [
      {
        "id": "ma1_1",
        "partId": "ma_part1",
        "partTitle": "第1部：数と式・平方根・連立方程式文章題（大問1・2直結）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 27,
        "practiceSubQuestionCount": 21,
        "miniTestSubQuestionCount": 6,
        "title": "文字式通分・平方根の自然数n（4パターン）・二次方程式",
        "abstractTitle": "文字式通分・平方根の自然数n（4パターン）・二次方程式",
        "realTitle": "直前数学対策プリント大問1完全準拠：分数式の符号罠・√an/√(a-n)・因数分解と解の公式"
      },
      {
        "id": "ma1_2",
        "partId": "ma_part1",
        "partTitle": "第1部：数と式・平方根・連立方程式文章題（大問1・2直結）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 19,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 6,
        "title": "連立方程式の文章題（全10パターン制覇：増減・速さ・食塩水・割合）",
        "abstractTitle": "連立方程式の文章題（全10パターン制覇：増減・速さ・食塩水・割合）",
        "realTitle": "直前数学対策プリント大問2直結！昨年基準の生徒数増減・食塩水濃度・池の周り・橋と列車"
      },
      {
        "id": "ma1_3",
        "partId": "ma_part1",
        "partTitle": "第1部：数と式・平方根・連立方程式文章題（大問1・2直結）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 20,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 6,
        "title": "平方根nの応用（分数型）・整数の文字式証明・規則性（タイル/マッチ棒）",
        "abstractTitle": "平方根nの応用（分数型）・整数の文字式証明・規則性（タイル/マッチ棒）",
        "realTitle": "直前数学PDF演習1〜4完全網羅・連続整数の証明・n番目の規則性立式"
      },
      {
        "id": "ma2_1",
        "partId": "ma_part2",
        "partTitle": "第2部：一次関数・関数 y = ax²（変域・変化の割合・放物線と図形融合）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 20,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 6,
        "title": "関数 y = ax² の変域（0またぎの罠）と変化の割合の裏ワザ",
        "abstractTitle": "関数 y = ax² の変域（0またぎの罠）と変化の割合の裏ワザ",
        "realTitle": "直前数学対策プリント頻出！0をまたぐyの変域・変化の割合 a(p+q)・制動距離"
      },
      {
        "id": "ma2_2",
        "partId": "ma_part2",
        "partTitle": "第2部：一次関数・関数 y = ax²（変域・変化の割合・放物線と図形融合）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 25,
        "practiceSubQuestionCount": 19,
        "miniTestSubQuestionCount": 6,
        "title": "放物線と直線の交点・三角形OABの面積・面積二等分（図解演習）",
        "abstractTitle": "放物線と直線の交点・三角形OABの面積・面積二等分（図解演習）",
        "realTitle": "大問3の花形！放物線 y=ax² と直線ABの式・y軸分割による△OAB面積・中点による二等分線"
      },
      {
        "id": "ma2_3",
        "partId": "ma_part2",
        "partTitle": "第2部：一次関数・関数 y = ax²（変域・変化の割合・放物線と図形融合）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 21,
        "practiceSubQuestionCount": 16,
        "miniTestSubQuestionCount": 5,
        "title": "一次関数ダイヤグラム・図形上の動点・スタフリ交点直線公式",
        "abstractTitle": "一次関数ダイヤグラム・図形上の動点・スタフリ交点直線公式",
        "realTitle": "すれ違い・追い越しのダイヤグラム／動点の変域場合分け／放物線2交点の直線裏ワザ"
      },
      {
        "id": "ma3_1",
        "partId": "ma_part3",
        "partTitle": "第3部：平面図形・円と相似・三平方・空間図形（大問4・5対策）",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 27,
        "practiceSubQuestionCount": 21,
        "miniTestSubQuestionCount": 6,
        "title": "多角形の角・円周角・平行線と面積比（平面図形の基礎〜標準）",
        "abstractTitle": "多角形の角・円周角・平行線と面積比（平面図形の基礎〜標準）",
        "realTitle": "直前数学プリント準拠：正n角形の外角公式・円周角と直径90°・相似比m:nと面積比m²:n²"
      },
      {
        "id": "ma3_2",
        "partId": "ma_part3",
        "partTitle": "第3部：平面図形・円と相似・三平方・空間図形（大問4・5対策）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 24,
        "practiceSubQuestionCount": 18,
        "miniTestSubQuestionCount": 6,
        "title": "三平方の定理・特別角と空間図形（ねじれ・円錐の最短距離・体積）",
        "abstractTitle": "三平方の定理・特別角と空間図形（ねじれ・円錐の最短距離・体積）",
        "realTitle": "1:2:√3 と 1:1:√2・ねじれの位置・円錐展開図の中心角と側面の糸・正四角錐の高さ"
      },
      {
        "id": "ma3_3",
        "partId": "ma_part3",
        "partTitle": "第3部：平面図形・円と相似・三平方・空間図形（大問4・5対策）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 24,
        "practiceSubQuestionCount": 18,
        "miniTestSubQuestionCount": 6,
        "title": "立体切断・空間内の相似と体積比（上位校・C問題・学校選択対策）",
        "abstractTitle": "立体切断・空間内の相似と体積比（上位校・C問題・学校選択対策）",
        "realTitle": "正四面体・直方体の断面図・高さの比と底面積比から求める三角錐の体積比"
      },
      {
        "id": "ma3_4",
        "partId": "ma_part3",
        "partTitle": "第3部：平面図形・円と相似・三平方・空間図形（大問4・5対策）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 16,
        "practiceSubQuestionCount": 10,
        "miniTestSubQuestionCount": 6,
        "title": "三角形の合同・相似証明 ＆ コンパス作図（垂直二等分線・角の二等分線・接線）",
        "abstractTitle": "三角形の合同・相似証明 ＆ コンパス作図（垂直二等分線・角の二等分線・接線）",
        "realTitle": "回転移動の合同証明・折り返し相似・作図条件の読み替え完全攻略"
      },
      {
        "id": "ma4_1",
        "partId": "ma_part4",
        "partTitle": "第4部：データの活用（箱ひげ図・ヒストグラム）＆ 確率・標本調査",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 23,
        "practiceSubQuestionCount": 17,
        "miniTestSubQuestionCount": 6,
        "title": "箱ひげ図と四分位範囲・確率（さいころ・カード・玉）の完全攻略",
        "abstractTitle": "箱ひげ図と四分位範囲・確率（さいころ・カード・玉）の完全攻略",
        "realTitle": "直前数学プリント大問1・2直結！箱ひげ図の正誤判定・2個のさいころ36通り表・標本調査"
      },
      {
        "id": "ma4_2",
        "partId": "ma_part4",
        "partTitle": "第4部：データの活用（箱ひげ図・ヒストグラム）＆ 確率・標本調査",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 12,
        "miniTestSubQuestionCount": 5,
        "title": "度数分布表（階級値平均・累積相対度数）・標本調査・連立方程式追加パターン",
        "abstractTitle": "度数分布表（階級値平均・累積相対度数）・標本調査・連立方程式追加パターン",
        "realTitle": "直前数学PDF連立全8型コンプ（池の周り・トンネル列車・食塩水）＆標本調査の推定"
      }
    ]
  },
  {
    "id": "japanese",
    "label": "国語",
    "chapters": [
      {
        "id": "ja1_1",
        "partId": "ja_part1",
        "partTitle": "第1部：漢字・語彙・四字熟語・口語文法・敬語",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 34,
        "practiceSubQuestionCount": 27,
        "miniTestSubQuestionCount": 7,
        "title": "同音異義語・同訓異字・四字熟語・慣用句・故事成語",
        "abstractTitle": "同音異義語・同訓異字・四字熟語・慣用句・故事成語",
        "realTitle": "入試大問1の得点源！文脈漢字識別・熟語の構成・故事成語・詩歌の表現技法"
      },
      {
        "id": "ja1_2",
        "partId": "ja_part1",
        "partTitle": "第1部：漢字・語彙・四字熟語・口語文法・敬語",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 35,
        "practiceSubQuestionCount": 28,
        "miniTestSubQuestionCount": 7,
        "title": "口語文法の完全攻略（品詞識別「ない・れる・ようだ」・用言活用・敬語）",
        "abstractTitle": "口語文法の完全攻略（品詞識別「ない・れる・ようだ」・用言活用・敬語）",
        "realTitle": "一発判別テストで解く「ない」の4識別・「れる/られる」4用法・尊敬語と謙譲語の罠"
      },
      {
        "id": "ja1_3",
        "partId": "ja_part1",
        "partTitle": "第1部：漢字・語彙・四字熟語・口語文法・敬語",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 19,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 5,
        "title": "漢字の同音異義語・四字熟語・慣用句・ことわざ・部首と筆順",
        "abstractTitle": "漢字の同音異義語・四字熟語・慣用句・ことわざ・部首と筆順",
        "realTitle": "全国公立大問1完全制覇：同音異訓（計る/測る/図る）・身体慣用句・故事成語"
      },
      {
        "id": "ja2_1",
        "partId": "ja_part2",
        "partTitle": "第2部：現代文読解（論説文・評論文 ／ 小説・物語文）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 20,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 6,
        "title": "論説文・説明文の論理構造（対比・指示語・接続語・要旨記述）",
        "abstractTitle": "論説文・説明文の論理構造（対比・指示語・接続語・要旨記述）",
        "realTitle": "二項対立（AではなくB）と逆接「しかし」の後ろ・具体例の抽象化で解く本格論説演習"
      },
      {
        "id": "ja2_2",
        "partId": "ja_part2",
        "partTitle": "第2部：現代文読解（論説文・評論文 ／ 小説・物語文）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 11,
        "miniTestSubQuestionCount": 6,
        "title": "小説・物語文の心情読解（行動・情景描写・会話の間・心情変化）",
        "abstractTitle": "小説・物語文の心情読解（行動・情景描写・会話の間・心情変化）",
        "realTitle": "直接書かれない気持ちを「しぐさ・風景・象徴物」から読み解く本格小説演習"
      },
      {
        "id": "ja2_3",
        "partId": "ja_part2",
        "partTitle": "第2部：現代文読解（論説文・評論文 ／ 小説・物語文）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 20,
        "practiceSubQuestionCount": 15,
        "miniTestSubQuestionCount": 5,
        "title": "韻文（短歌・俳句・現代詩）の表現技法・季語・句切れ完全攻略",
        "abstractTitle": "韻文（短歌・俳句・現代詩）の表現技法・季語・句切れ完全攻略",
        "realTitle": "枕詞・体言止め・倒置法・擬人法・現代詩（口語自由詩/文語定型詩）と季語の季節"
      },
      {
        "id": "ja3_1",
        "partId": "ja_part3",
        "partTitle": "第3部：古文・漢文・資料読み取りと条件作文",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 26,
        "practiceSubQuestionCount": 20,
        "miniTestSubQuestionCount": 6,
        "title": "古文読解（歴史的仮名遣い・古語・主語補完・係り結び）と漢文訓読・条件作文",
        "abstractTitle": "古文読解（歴史的仮名遣い・古語・主語補完・係り結び）と漢文訓読・条件作文",
        "realTitle": "歴史的仮名遣い変換・重要古語20選・係り結びの法則・返り点（レ点・一二点）と資料条件作文"
      },
      {
        "id": "ja3_2",
        "partId": "ja_part3",
        "partTitle": "第3部：古文・漢文・資料読み取りと条件作文",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 24,
        "practiceSubQuestionCount": 19,
        "miniTestSubQuestionCount": 5,
        "title": "漢文訓読（返り点・書き下し文・再読文字）＆ 古文文学史・和歌修辞",
        "abstractTitle": "漢文訓読（返り点・書き下し文・再読文字）＆ 古文文学史・和歌修辞",
        "realTitle": "レ点・一二点・上下点の読む順番／置き字（而・於・矣）と主要古典作品総整理"
      }
    ]
  },
  {
    "id": "science",
    "label": "理科",
    "chapters": [
      {
        "id": "sc1_1",
        "partId": "sc_part1",
        "partTitle": "第1部：生物分野（植物・動物・人体・細胞と遺伝）",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 27,
        "practiceSubQuestionCount": 21,
        "miniTestSubQuestionCount": 6,
        "title": "植物の分類・光合成の対照実験・蒸散量計算",
        "abstractTitle": "植物の分類・光合成の対照実験・蒸散量計算",
        "realTitle": "双子葉類と単子葉類の維管束・BTB液とヨウ素液の対照実験・ワセリン蒸散計算"
      },
      {
        "id": "sc1_2",
        "partId": "sc_part1",
        "partTitle": "第1部：生物分野（植物・動物・人体・細胞と遺伝）",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 30,
        "practiceSubQuestionCount": 24,
        "miniTestSubQuestionCount": 6,
        "title": "人体のしくみ（消化・循環・排出・神経）と細胞・遺伝・生態系",
        "abstractTitle": "人体のしくみ（消化・循環・排出・神経）と細胞・遺伝・生態系",
        "realTitle": "消化酵素と柔毛・肺循環と門脈・肝臓（尿素）と腎臓・反射・体細胞分裂とメンデル遺伝3:1"
      },
      {
        "id": "sc3_3",
        "partId": "sc_part1",
        "partTitle": "第1部：生物分野（植物・動物・人体・細胞と遺伝）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 4,
        "title": "植物と動物の分類総整理・神経系（反射）・食物連鎖と炭素循環（分解者）",
        "abstractTitle": "植物と動物の分類総整理・神経系（反射）・食物連鎖と炭素循環（分解者）",
        "realTitle": "理科最終プリント第9・11・22・24・34講完全網羅：シダコケ・脊椎5綱・反射経路・菌類細菌類"
      },
      {
        "id": "sc2_1",
        "partId": "sc_part2",
        "partTitle": "第2部：物理分野（光・音・力・圧力・電流と磁界・運動とエネルギー）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 22,
        "practiceSubQuestionCount": 17,
        "miniTestSubQuestionCount": 5,
        "title": "光の屈折と全反射・凸レンズの作図・音の波形・圧力と浮力",
        "abstractTitle": "光の屈折と全反射・凸レンズの作図・音の波形・圧力と浮力",
        "realTitle": "焦点距離2倍の実像・レンズ半分隠しの引っかけ・振幅と振動数・圧力 Pa＝N/m² とアルキメデスの浮力"
      },
      {
        "id": "sc2_2",
        "partId": "sc_part2",
        "partTitle": "第2部：物理分野（光・音・力・圧力・電流と磁界・運動とエネルギー）",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 28,
        "practiceSubQuestionCount": 23,
        "miniTestSubQuestionCount": 5,
        "title": "電流回路（オームの法則・電力・電力量）・電流と磁界・運動と仕事",
        "abstractTitle": "電流回路（オームの法則・電力・電力量）・電流と磁界・運動と仕事",
        "realTitle": "直列・並列の合成抵抗と消費電力・フレミング左手の法則と電磁誘導・斜面運動と動滑車の仕事率"
      },
      {
        "id": "sc1_3",
        "partId": "sc_part2",
        "partTitle": "第2部：物理分野（光・音・力・圧力・電流と磁界・運動とエネルギー）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 18,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 4,
        "title": "音・光（屈折/全反射/凸レンズ）・ばねと水圧・浮力・電磁誘導・放射線",
        "abstractTitle": "音・光（屈折/全反射/凸レンズ）・ばねと水圧・浮力・電磁誘導・放射線",
        "realTitle": "理科最終プリント第1〜4・33・35講完全網羅：オシロスコープ・凸レンズ実像虚像・浮力・レンツの法則"
      },
      {
        "id": "sc3_1",
        "partId": "sc_part3",
        "partTitle": "第3部：化学分野（気体・水溶液・状態変化・化学変化と質量比・イオンと電池）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 24,
        "practiceSubQuestionCount": 19,
        "miniTestSubQuestionCount": 5,
        "title": "気体の性質と集め方・状態変化と蒸留・溶解度と再結晶・定比例の法則",
        "abstractTitle": "気体の性質と集め方・状態変化と蒸留・溶解度と再結晶・定比例の法則",
        "realTitle": "上方/下方/水上置換・エタノール蒸留・硝酸カリウム再結晶計算・銅:酸素＝4:1とマグネシウム＝3:2"
      },
      {
        "id": "sc3_2",
        "partId": "sc_part3",
        "partTitle": "第3部：化学分野（気体・水溶液・状態変化・化学変化と質量比・イオンと電池）",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 28,
        "practiceSubQuestionCount": 23,
        "miniTestSubQuestionCount": 5,
        "title": "電解質と電気分解・化学電池（ダニエル電池）・酸とアルカリの中和イオン",
        "abstractTitle": "電解質と電気分解・化学電池（ダニエル電池）・酸とアルカリの中和イオン",
        "realTitle": "塩化銅と塩酸の電気分解・イオン化傾向とダニエル電池の亜鉛板/銅板・中和滴定のイオン数グラフ"
      },
      {
        "id": "sc2_3",
        "partId": "sc_part3",
        "partTitle": "第3部：化学分野（気体・水溶液・状態変化・化学変化と質量比・イオンと電池）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 4,
        "title": "気体の発生と捕集・水溶液の溶解度と再結晶・状態変化と蒸留・電池のしくみ",
        "abstractTitle": "気体の発生と捕集・水溶液の溶解度と再結晶・状態変化と蒸留・電池のしくみ",
        "realTitle": "理科最終プリント第5〜8・30講完全網羅：アンモニア噴水・溶解度計算・沸点蒸留・ダニエル電池"
      },
      {
        "id": "sc4_1",
        "partId": "sc_part4",
        "partTitle": "第4部：地学分野（火山・地震・地層・気象と前線・天体と金星・月）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 22,
        "practiceSubQuestionCount": 17,
        "miniTestSubQuestionCount": 5,
        "title": "火山と火成岩・地震のP波/S波計算・地層と柱状図の傾き",
        "abstractTitle": "火山と火成岩・地震のP波/S波計算・地層と柱状図の傾き",
        "realTitle": "しんかんせんはかりあげ・初期微動継続時間と緊急地震速報・ボーリング柱状図と鍵層（凝灰岩）"
      },
      {
        "id": "sc4_2",
        "partId": "sc_part4",
        "partTitle": "第4部：地学分野（火山・地震・地層・気象と前線・天体と金星・月）",
        "problemCount": 7,
        "practiceProblemCount": 5,
        "miniTestProblemCount": 2,
        "subQuestionCount": 29,
        "practiceSubQuestionCount": 24,
        "miniTestSubQuestionCount": 5,
        "title": "気象（飽和水蒸気量と湿度・前線と低気圧）と天体（日周/年周運動・金星・月と季節）",
        "abstractTitle": "気象（飽和水蒸気量と湿度・前線と低気圧）と天体（日周/年周運動・金星・月と季節）",
        "realTitle": "露点と湿度計算・寒冷前線（積乱雲・にわか雨・北寄りの風）vs温暖前線・金星の満ち欠けと時刻"
      },
      {
        "id": "sc4_3",
        "partId": "sc_part4",
        "partTitle": "第4部：地学分野（火山・地震・地層・気象と前線・天体と金星・月）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 4,
        "title": "日本の四季の天気・大気の動き（海陸風/季節風）・太陽系惑星と月の満ち欠け・金星",
        "abstractTitle": "日本の四季の天気・大気の動き（海陸風/季節風）・太陽系惑星と月の満ち欠け・金星",
        "realTitle": "理科最終プリント第17〜20・31〜32講完全網羅：西高東低・月の南中時刻・金星の満ち欠けと大きさ"
      }
    ]
  },
  {
    "id": "social",
    "label": "社会",
    "chapters": [
      {
        "id": "so1_1",
        "partId": "so_part1",
        "partTitle": "第1部：地理分野（世界地理・日本地理・地形図・統計資料）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 24,
        "practiceSubQuestionCount": 19,
        "miniTestSubQuestionCount": 5,
        "title": "世界地理（地球儀と図法・時差計算・気候帯と雨温図・6州の産業と統合）",
        "abstractTitle": "世界地理（地球儀と図法・時差計算・気候帯と雨温図・6州の産業と統合）",
        "realTitle": "メルカトルと正距方位図法・経度15°＝1時間の時差計算・世界の雨温図判別・EUとASEANとUSMCA"
      },
      {
        "id": "so1_2",
        "partId": "so_part1",
        "partTitle": "第1部：地理分野（世界地理・日本地理・地形図・統計資料）",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 27,
        "practiceSubQuestionCount": 22,
        "miniTestSubQuestionCount": 5,
        "title": "日本地理（地形図・6気候区の雨温図・扇状地と三角州・工業と農林水産業統計）",
        "abstractTitle": "日本地理（地形図・6気候区の雨温図・扇状地と三角州・工業と農林水産業統計）",
        "realTitle": "2万5千分の1地形図・太平洋/日本海/瀬戸内/中央高地の雨温図・中京/京葉の工業帯グラフ・促成と抑制栽培"
      },
      {
        "id": "so1_3",
        "partId": "so_part1",
        "partTitle": "第1部：地理分野（世界地理・日本地理・地形図・統計資料）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 4,
        "title": "世界6州の地誌完全網羅（アジア・ヨーロッパ・アフリカ・北米・南米・オセアニア）",
        "abstractTitle": "世界6州の地誌完全網羅（アジア・ヨーロッパ・アフリカ・北米・南米・オセアニア）",
        "realTitle": "最終地理プリント第4〜7講準拠：EU統合と農業・アフリカのモノカルチャー・北米適地適作・BRICS"
      },
      {
        "id": "so1_4",
        "partId": "so_part1",
        "partTitle": "第1部：地理分野（世界地理・日本地理・地形図・統計資料）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 15,
        "practiceSubQuestionCount": 11,
        "miniTestSubQuestionCount": 4,
        "title": "日本7地方の地誌完全網羅（九州〜北海道）＆ 重要統計資料①②（農林水産・貿易）",
        "abstractTitle": "日本7地方の地誌完全網羅（九州〜北海道）＆ 重要統計資料①②（農林水産・貿易）",
        "realTitle": "最終地理プリント第8〜14講＋重要資料①②準拠：工業地域出荷額比・促成/抑制栽培・地形図と統計"
      },
      {
        "id": "so2_1",
        "partId": "so_part2",
        "partTitle": "第2部：歴史分野（古代〜中世〜近世〜近代〜現代の通史・外交・文化・年代整序）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 18,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 5,
        "title": "古代〜中世〜近世の歴史（律令国家・武家政権の展開・東アジア外交・江戸の改革と文化）",
        "abstractTitle": "古代〜中世〜近世の歴史（律令国家・武家政権の展開・東アジア外交・江戸の改革と文化）",
        "realTitle": "大化の改新〜墾田永年私財法・鎌倉御恩と奉公・勘合貿易・太閤検地・参勤交代と鎖国4窓口・元禄と化政文化"
      },
      {
        "id": "so2_2",
        "partId": "so_part2",
        "partTitle": "第2部：歴史分野（古代〜中世〜近世〜近代〜現代の通史・外交・文化・年代整序）",
        "problemCount": 5,
        "practiceProblemCount": 3,
        "miniTestProblemCount": 2,
        "subQuestionCount": 23,
        "practiceSubQuestionCount": 18,
        "miniTestSubQuestionCount": 5,
        "title": "幕末・明治維新〜立憲国家の成立〜日清・日露と条約改正〜大正デモクラシー",
        "abstractTitle": "幕末・明治維新〜立憲国家の成立〜日清・日露と条約改正〜大正デモクラシー",
        "realTitle": "不平等条約（領事裁判権と関税自主権）の改正・地租改正・大日本帝国憲法・日清日露・護憲運動と普通選挙法"
      },
      {
        "id": "so2_3",
        "partId": "so_part2",
        "partTitle": "第2部：歴史分野（古代〜中世〜近世〜近代〜現代の通史・外交・文化・年代整序）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 18,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 5,
        "title": "昭和恐慌・十五年戦争〜戦後改革（GHQ）〜冷戦と高度経済成長〜現代の世界",
        "abstractTitle": "昭和恐慌・十五年戦争〜戦後改革（GHQ）〜冷戦と高度経済成長〜現代の世界",
        "realTitle": "世界恐慌（ニューディールとブロック経済）→満州事変〜太平洋戦争→農地改革と財閥解体→サンフランシスコ平和条約〜冷戦終結"
      },
      {
        "id": "so2_4",
        "partId": "so_part2",
        "partTitle": "第2部：歴史分野（古代〜中世〜近世〜近代〜現代の通史・外交・文化・年代整序）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 17,
        "practiceSubQuestionCount": 13,
        "miniTestSubQuestionCount": 4,
        "title": "歴史テーマ史横断（土地制度・日中外交・文化史・戦後日本と冷戦終結）",
        "abstractTitle": "歴史テーマ史横断（土地制度・日中外交・文化史・戦後日本と冷戦終結）",
        "realTitle": "スタフリ歴史横断整理：墾田永年私財法〜農地改革・勘合貿易〜日中国交正常化・戦後史完全版"
      },
      {
        "id": "so3_1",
        "partId": "so_part3",
        "partTitle": "第3部：公民分野（現代社会・日本国憲法と人権・三権分立と地方自治・経済と国際社会）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 19,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 5,
        "title": "現代社会・日本国憲法と新しい人権・国会/内閣/裁判所（三権分立）・地方自治",
        "abstractTitle": "現代社会・日本国憲法と新しい人権・国会/内閣/裁判所（三権分立）・地方自治",
        "realTitle": "憲法改正手続・生存権25条と新しい人権・衆議院の優越・議院内閣制・違憲審査権・直接請求権の提出先"
      },
      {
        "id": "so3_2",
        "partId": "so_part3",
        "partTitle": "第3部：公民分野（現代社会・日本国憲法と人権・三権分立と地方自治・経済と国際社会）",
        "problemCount": 6,
        "practiceProblemCount": 4,
        "miniTestProblemCount": 2,
        "subQuestionCount": 27,
        "practiceSubQuestionCount": 22,
        "miniTestSubQuestionCount": 5,
        "title": "選挙（ドント式計算）と経済（市場価格・金融政策・財政と税制・社会保障）＋国際社会とSDGs",
        "abstractTitle": "選挙（ドント式計算）と経済（市場価格・金融政策・財政と税制・社会保障）＋国際社会とSDGs",
        "realTitle": "比例代表ドント式議席計算・需要供給曲線・日銀の公開市場操作と円高円安・累進課税・少子高齢化と国連安保理"
      },
      {
        "id": "so3_3",
        "partId": "so_part3",
        "partTitle": "第3部：公民分野（現代社会・日本国憲法と人権・三権分立と地方自治・経済と国際社会）",
        "problemCount": 4,
        "practiceProblemCount": 2,
        "miniTestProblemCount": 2,
        "subQuestionCount": 18,
        "practiceSubQuestionCount": 14,
        "miniTestSubQuestionCount": 4,
        "title": "地方自治（直接請求権）・現代社会と税制/社会保障4柱・国際社会（国連・SDGs・環境）",
        "abstractTitle": "地方自治（直接請求権）・現代社会と税制/社会保障4柱・国際社会（国連・SDGs・環境）",
        "realTitle": "最終公民プリント第1・4・6・7講完全網羅：直接請求権の提出先・直接税/間接税・社会保障4柱・国連常任理事国"
      }
    ]
  }
];

export function getChapterIndexOfSubject(
  subjectId: string | null | undefined,
): readonly ChapterIndexEntry[] {
  const entry = SUBJECT_INDEX.find((subject) => subject.id === subjectId) ?? SUBJECT_INDEX[0];
  return entry ? entry.chapters : [];
}

export function getPartIndexStats(
  subjectId: string | null | undefined,
  partId: string,
  chapterId?: string,
): {
  chapters: number;
  sets: number;
  practiceQuestions: number;
  miniTestQuestions: number;
} {
  const all = getChapterIndexOfSubject(subjectId).filter(
    (ch) => ch.partId === partId && (!chapterId || ch.id === chapterId),
  );
  return {
    chapters: all.length,
    sets: all.reduce((s, c) => s + (c.practiceProblemCount ?? 0), 0),
    practiceQuestions: all.reduce((s, c) => s + (c.practiceSubQuestionCount ?? 0), 0),
    miniTestQuestions: all.reduce((s, c) => s + (c.miniTestSubQuestionCount ?? 0), 0),
  };
}

export interface SubjectStatsEntry {
  chapters?: number;
  questions?: number;
  practiceQuestions?: number;
  miniTestQuestions?: number;
  sections?: number;
  units?: number;
  points?: number;
  marks?: number;
}

export const SUBJECT_STATS: Readonly<Record<string, SubjectStatsEntry>> = {
  "english": {
    "sections": 4,
    "chapters": 9,
    "questions": 199,
    "practiceQuestions": 145,
    "miniTestQuestions": 54
  },
  "math": {
    "sections": 4,
    "chapters": 12,
    "questions": 263,
    "practiceQuestions": 193,
    "miniTestQuestions": 70
  },
  "japanese": {
    "sections": 3,
    "chapters": 8,
    "questions": 195,
    "practiceQuestions": 148,
    "miniTestQuestions": 47
  },
  "science": {
    "sections": 4,
    "chapters": 12,
    "questions": 279,
    "practiceQuestions": 221,
    "miniTestQuestions": 58
  },
  "social": {
    "sections": 3,
    "chapters": 11,
    "questions": 223,
    "practiceQuestions": 172,
    "miniTestQuestions": 51
  }
};

export function getSubjectStats(subjectId: string | null | undefined): SubjectStatsEntry {
  return SUBJECT_STATS[String(subjectId)] ?? {};
}
