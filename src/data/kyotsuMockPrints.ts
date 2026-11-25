/**
 * LR（レジェンドレア）：公立高校入試ガチャの大当たり＝全国公立高校入試 5教科総合予想模試（第1〜3回）。
 * 第1回（print_lr_juken_mock_1）はガチャで当てる前でも「全文を見る」でアプリ内PDFビューから全ページ閲覧可能。
 */
import type { GachaPrintDef } from './gachaPrints.generated';

export const KYOTSU_MOCK_PRINTS: readonly GachaPrintDef[] = [
  {
    "id": "print_lr_juken_mock_1",
    "label": "公立高校入試 5教科総合予想模試 第1回（英数国理社25問＋詳しい解説）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_juken_mock_1.pdf",
    "thumb": "/prints/thumbs/print_lr_juken_mock_1.webp",
    "pages": 8,
    "kb": 167
  },
  {
    "id": "print_lr_juken_mock_2",
    "label": "公立高校入試 5教科総合予想模試 第2回（英数国理社25問＋詳しい解説）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_juken_mock_2.pdf",
    "thumb": "/prints/thumbs/print_lr_juken_mock_2.webp",
    "pages": 8,
    "kb": 162
  },
  {
    "id": "print_lr_juken_mock_3",
    "label": "公立高校入試 5教科総合予想模試 第3回（英数国理社25問＋詳しい解説）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_juken_mock_3.pdf",
    "thumb": "/prints/thumbs/print_lr_juken_mock_3.webp",
    "pages": 8,
    "kb": 160
  }
];

export const KYOTSU_FREE_FULL_IDS: readonly string[] = ['print_lr_juken_mock_1'];
export const isFreeFullPrint = (id: string): boolean => KYOTSU_FREE_FULL_IDS.includes(id);
