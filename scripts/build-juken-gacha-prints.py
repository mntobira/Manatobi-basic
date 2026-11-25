#!/usr/bin/env python3
"""
Generate all 76 Juken Gacha PDFs, high-visibility book-style cover thumbnails (WebP),
half-page blurred previews (WebP), and TypeScript definition files for マナトビ 高校入試:

  1) 47 Prefectures Public High School Entrance Exam Predicted Problem & Explanation PDFs (LR):
     - IDs: print_lr_pref_<prefId>  (47 booklets, authentic prefecture exam format + answer sheet + vector figures + listening)
  2) 3 National 5-Subject Comprehensive Mock Exam PDFs (LR):
     - IDs: print_lr_juken_mock_1 .. 3  (#1 is free full-view in app)
  3) 10 Complete 5-Subject Books (UR, category='完全版'):
     - IDs: print_ur_juken_*
  4) 15 Unit & Trend Drill Prints (SR, category='演習プリント' | '出題傾向'):
     - IDs: print_sr_juken_*
  5) 1 Level-15 Reward Print (UR):
     - ID: print_level_juken_howto
"""

import json
import re
import hashlib
from pathlib import Path
import pymupdf as fitz
from PIL import Image, ImageFilter, ImageDraw

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
    Flowable,
)

ROOT = Path("/home/user/webapp")
PAYLOAD_PATH = Path("/tmp/juken_pdf_build/payload.json")
OUT_DIR = ROOT / "public" / "prints"
THUMBS_DIR = OUT_DIR / "thumbs"
PREVIEWS_DIR = OUT_DIR / "previews"

OUT_DIR.mkdir(parents=True, exist_ok=True)
THUMBS_DIR.mkdir(parents=True, exist_ok=True)
PREVIEWS_DIR.mkdir(parents=True, exist_ok=True)

FONT_REG = "WQYZenHei"
FONT_BOLD = "WQYZenHeiBold"
pdfmetrics.registerFont(TTFont(FONT_REG, "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc", subfontIndex=0))
pdfmetrics.registerFont(TTFont(FONT_BOLD, "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc", subfontIndex=0))
registerFontFamily(FONT_REG, normal=FONT_REG, bold=FONT_BOLD, italic=FONT_REG, boldItalic=FONT_BOLD)

PAGE_W, PAGE_H = A4


def clean_tex(text: str, rich: bool = False) -> str:
    """Convert inline LaTeX / cloze / lesson emphasis markup to clean ReportLab XML."""
    if not text:
        return ""
    s = str(text)
    s = re.sub(r"\{\{([^{}]+)\}\}", r"【\1】", s)
    for _ in range(3):
        s = re.sub(r"\\d?frac\{([^{}]+)\}\{([^{}]+)\}", r"(\1)/(\2)", s)
    s = re.sub(r"\\sqrt\{([^{}]+)\}", r"√(\1)", s)
    s = re.sub(r"\\triangle\s*", "△", s)
    s = re.sub(r"\\angle\s*", "∠", s)
    s = re.sub(r"\\parallel\s*", "∥", s)
    s = re.sub(r"\\perp\s*", "⊥", s)
    s = re.sub(r"\\equiv\s*", "≡", s)
    s = re.sub(r"\\sim\s*", "∽", s)
    s = re.sub(r"\\fallingdotseq\s*", "≒", s)
    s = re.sub(r"\\times\s*", "×", s)
    s = re.sub(r"\\div\s*", "÷", s)
    s = re.sub(r"\\pm\s*", "±", s)
    s = re.sub(r"\\cdot\s*", "・", s)
    s = re.sub(r"\\le\b|\\leq\b", "≦", s)
    s = re.sub(r"\\ge\b|\\geq\b", "≧", s)
    s = re.sub(r"\\neq\b|\\ne\b", "≠", s)
    s = re.sub(r"\\Rightarrow\s*", "⇒ ", s)
    s = re.sub(r"\\rightarrow\s*|\\to\b", "→", s)
    s = re.sub(r"\\leftarrow\s*", "←", s)
    s = re.sub(r"\\dots\b|\\cdots\b", "…", s)
    s = re.sub(r"\\pi\b", "π", s)
    s = re.sub(r"\\alpha\b", "α", s)
    s = re.sub(r"\\beta\b", "β", s)
    s = re.sub(r"\\gamma\b", "γ", s)
    s = re.sub(r"\^\\circ", "°", s)
    s = re.sub(r"\\text\{([^{}]*)\}", r"\1", s)
    s = re.sub(r"\\mathrm\{([^{}]*)\}", r"\1", s)
    s = re.sub(r"\\left|\\right", "", s)
    s = re.sub(r"<u>(.*?)</u>", r"[\1]", s)
    sup_map = {"0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "+": "⁺", "-": "⁻"}
    sub_map = {"0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄"}
    s = re.sub(r"\^\{([0-9+\-]+)\}", lambda m: "".join(sup_map.get(ch, ch) for ch in m.group(1)), s)
    s = re.sub(r"\^([0-9])", lambda m: sup_map.get(m.group(1), "^" + m.group(1)), s)
    s = re.sub(r"_\{([0-9]+)\}", lambda m: "".join(sub_map.get(ch, ch) for ch in m.group(1)), s)
    s = re.sub(r"_([0-9])", lambda m: sub_map.get(m.group(1), "_" + m.group(1)), s)
    s = s.replace("$", "").replace("\\", "")
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

    if rich:
        s = re.sub(r"!!([^!]+)!!", r"<font color='#DC2626'><b>\1</b></font>", s)
        s = re.sub(r"==([^=]+)==", r"<font backColor='#FEF08A' color='#0F172A'><b> \1 </b></font>", s)
        s = re.sub(r"__([^_]+)__", r"<u><b>\1</b></u>", s)
    else:
        s = re.sub(r"!!([^!]+)!!", r"\1", s)
        s = re.sub(r"==([^=]+)==", r"\1", s)
        s = re.sub(r"__([^_]+)__", r"\1", s)

    s = s.replace("\n", "<br/>")
    return s


class BookCoverHero(Flowable):
    """Bold, high-contrast book cover header designed to remain super-legible even at 90px thumbnail width."""

    def __init__(self, rarity_tag: str, big_title: str, sub_line: str, chips: list, accent_hex: str, gold_trim: bool = False):
        super().__init__()
        self.rarity_tag = rarity_tag
        self.big_title = big_title
        self.sub_line = sub_line
        self.chips = chips[:3]
        self.accent_hex = accent_hex
        self.gold_trim = gold_trim
        self.width = 178 * mm
        self.height = 66 * mm

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        w, h = self.width, self.height
        accent = colors.HexColor(self.accent_hex)
        dark_bg = colors.HexColor("#0F172A")
        gold = colors.HexColor("#F59E0B")

        c.setFillColor(dark_bg)
        c.roundRect(0, 0, w, h, 5 * mm, stroke=0, fill=1)

        c.setFillColor(accent)
        c.roundRect(0, h - 17 * mm, w, 17 * mm, 4 * mm, stroke=0, fill=1)
        c.rect(0, h - 17 * mm, w, 6 * mm, stroke=0, fill=1)

        if self.gold_trim:
            c.setStrokeColor(gold)
            c.setLineWidth(2.4)
            c.roundRect(1.2, 1.2, w - 2.4, h - 2.4, 5 * mm, stroke=1, fill=0)
        else:
            c.setStrokeColor(accent)
            c.setLineWidth(1.8)
            c.roundRect(1, 1, w - 2, h - 2, 5 * mm, stroke=1, fill=0)

        c.setFillColor(gold if self.gold_trim else colors.white)
        c.roundRect(5 * mm, h - 13.5 * mm, 48 * mm, 9 * mm, 2.2 * mm, stroke=0, fill=1)
        c.setFillColor(dark_bg)
        c.setFont(FONT_BOLD, 11.2)
        c.drawCentredString(29 * mm, h - 10.5 * mm, self.rarity_tag[:13])

        c.setFillColor(colors.white)
        c.setFont(FONT_BOLD, 10)
        c.drawRightString(w - 5 * mm, h - 10.3 * mm, "マナトビ高校入試 特別編集")

        title_lines = self.big_title.split("\n")
        if len(title_lines) == 1:
            fs = 31 if len(title_lines[0]) <= 9 else (25 if len(title_lines[0]) <= 13 else 20)
            c.setFillColor(colors.white)
            c.setFont(FONT_BOLD, fs)
            c.drawString(6 * mm, h - 33 * mm, title_lines[0][:18])
        else:
            fs1 = 27 if len(title_lines[0]) <= 10 else 21
            fs2 = 20 if len(title_lines[1]) <= 14 else 16.5
            c.setFillColor(colors.HexColor("#FDE047") if self.gold_trim else colors.white)
            c.setFont(FONT_BOLD, fs1)
            c.drawString(6 * mm, h - 30 * mm, title_lines[0][:18])
            c.setFillColor(colors.white)
            c.setFont(FONT_BOLD, fs2)
            c.drawString(6 * mm, h - 41 * mm, title_lines[1][:22])

        c.setFillColor(colors.HexColor("#CBD5E1"))
        c.setFont(FONT_REG, 9.5)
        c.drawString(6 * mm, 15.5 * mm, self.sub_line[:44])

        chip_w = (w - 16 * mm) / max(1, len(self.chips))
        for idx, ch_txt in enumerate(self.chips):
            cx = 6 * mm + idx * (chip_w + 2 * mm)
            c.setFillColor(colors.HexColor("#1E293B"))
            c.setStrokeColor(gold if (self.gold_trim and idx == 0) else colors.HexColor("#475569"))
            c.setLineWidth(1)
            c.roundRect(cx, 4 * mm, chip_w - 2 * mm, 8.5 * mm, 2 * mm, stroke=1, fill=1)
            c.setFillColor(colors.HexColor("#FDE68A") if idx == 0 else colors.white)
            c.setFont(FONT_BOLD, 8.5)
            c.drawCentredString(cx + (chip_w - 2 * mm) / 2, 6.8 * mm, ch_txt[:18])

        c.restoreState()


class ExamVectorFiguresStrip(Flowable):
    """Draws 3 crisp vector reference figures (Math parabola, Science circuit, Social hythergraph)."""

    def __init__(self, accent_hex="#1E40AF"):
        super().__init__()
        self.accent_hex = accent_hex
        self.width = 176 * mm
        self.height = 38 * mm

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        w, h = self.width, self.height
        box_w = (w - 6 * mm) / 3.0

        # Box 1: Math parabola
        c.setFillColor(colors.HexColor("#F8FAFC"))
        c.setStrokeColor(colors.HexColor("#CBD5E1"))
        c.roundRect(0, 0, box_w, h, 2 * mm, stroke=1, fill=1)
        c.setFillColor(colors.HexColor("#0F172A"))
        c.setFont(FONT_BOLD, 7.5)
        c.drawString(2.5 * mm, h - 4.5 * mm, "【数学参考図】放物線 y=ax² と直線AB")
        ox, oy = box_w * 0.48, 6 * mm
        c.setStrokeColor(colors.HexColor("#64748B"))
        c.setLineWidth(0.7)
        c.line(4 * mm, oy, box_w - 4 * mm, oy)
        c.line(ox, 3 * mm, ox, h - 7 * mm)
        c.setStrokeColor(colors.HexColor(self.accent_hex))
        c.setLineWidth(1.3)
        pts = []
        for i in range(-18, 19):
            px = ox + i * 1.15
            py = oy + (i * i) * 0.068
            if py <= h - 7 * mm:
                pts.append((px, py))
        for i in range(len(pts) - 1):
            c.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1])
        c.setStrokeColor(colors.HexColor("#DC2626"))
        c.setLineWidth(1.1)
        c.line(ox - 14, oy + 6.5, ox + 17, oy + 20)
        c.setFont(FONT_BOLD, 6.8)
        c.setFillColor(colors.HexColor("#DC2626"))
        c.drawString(ox - 22, oy + 7, "A")
        c.drawString(ox + 18, oy + 19, "B")
        c.setFillColor(colors.HexColor("#334155"))
        c.drawString(ox + 2, oy + 11, "C(0,b)")

        # Box 2: Science circuit
        x2 = box_w + 3 * mm
        c.setFillColor(colors.HexColor("#F8FAFC"))
        c.setStrokeColor(colors.HexColor("#CBD5E1"))
        c.roundRect(x2, 0, box_w, h, 2 * mm, stroke=1, fill=1)
        c.setFillColor(colors.HexColor("#0F172A"))
        c.setFont(FONT_BOLD, 7.5)
        c.drawString(x2 + 2.5 * mm, h - 4.5 * mm, "【理科参考図】並列回路と電流計A")
        c.setStrokeColor(colors.HexColor("#0F172A"))
        c.setLineWidth(1.0)
        cx0, cy0 = x2 + 7 * mm, 6 * mm
        cw, ch_box = box_w - 14 * mm, h - 14 * mm
        c.rect(cx0, cy0, cw, ch_box, stroke=1, fill=0)
        mid_y = cy0 + ch_box * 0.52
        c.line(cx0 + cw * 0.2, mid_y, cx0 + cw * 0.8, mid_y)
        c.line(cx0 + cw * 0.2, cy0 + ch_box, cx0 + cw * 0.2, mid_y)
        c.line(cx0 + cw * 0.8, cy0 + ch_box, cx0 + cw * 0.8, mid_y)
        c.setFillColor(colors.white)
        c.rect(cx0 + cw * 0.36, cy0 + ch_box - 2.2 * mm, cw * 0.28, 4.4 * mm, stroke=1, fill=1)
        c.rect(cx0 + cw * 0.36, mid_y - 2.2 * mm, cw * 0.28, 4.4 * mm, stroke=1, fill=1)
        c.setFillColor(colors.HexColor("#047857"))
        c.setFont(FONT_BOLD, 6.8)
        c.drawCentredString(cx0 + cw * 0.5, cy0 + ch_box - 0.8 * mm, "R₁")
        c.drawCentredString(cx0 + cw * 0.5, mid_y - 0.8 * mm, "R₂")
        c.setFillColor(colors.HexColor("#FEF3C7"))
        c.circle(cx0 + cw * 0.82, cy0, 3.0 * mm, stroke=1, fill=1)
        c.setFillColor(colors.HexColor("#92400E"))
        c.drawCentredString(cx0 + cw * 0.82, cy0 - 1.0 * mm, "A")

        # Box 3: Social hythergraph
        x3 = 2 * (box_w + 3 * mm)
        c.setFillColor(colors.HexColor("#F8FAFC"))
        c.setStrokeColor(colors.HexColor("#CBD5E1"))
        c.roundRect(x3, 0, box_w, h, 2 * mm, stroke=1, fill=1)
        c.setFillColor(colors.HexColor("#0F172A"))
        c.setFont(FONT_BOLD, 7.5)
        c.drawString(x3 + 2.5 * mm, h - 4.5 * mm, "【社会参考図】雨温図（冬多雨＝日本海側）")
        gx0, gy0 = x3 + 6 * mm, 5 * mm
        gw, gh = box_w - 12 * mm, h - 13 * mm
        bars = [0.85, 0.72, 0.50, 0.38, 0.36, 0.45, 0.58, 0.52, 0.68, 0.65, 0.80, 0.92]
        bw = gw / 12.0
        c.setFillColor(colors.HexColor("#60A5FA"))
        for idx, bval in enumerate(bars):
            c.rect(gx0 + idx * bw + 1, gy0, bw - 2, gh * bval * 0.78, stroke=0, fill=1)
        temps = [0.15, 0.17, 0.30, 0.50, 0.68, 0.80, 0.92, 0.95, 0.78, 0.56, 0.36, 0.20]
        c.setStrokeColor(colors.HexColor("#DC2626"))
        c.setLineWidth(1.2)
        for idx in range(11):
            c.line(
                gx0 + (idx + 0.5) * bw,
                gy0 + gh * temps[idx],
                gx0 + (idx + 1.5) * bw,
                gy0 + gh * temps[idx + 1],
            )
        c.setStrokeColor(colors.HexColor("#475569"))
        c.setLineWidth(0.6)
        c.line(gx0, gy0, gx0 + gw, gy0)

        c.restoreState()


class PrefectureAnswerSheetPreview(Flowable):
    """Renders an authentic prefecture-tailored mock answer sheet (Mark-sheet bubbles vs Descriptive/Proof/Composition grid)."""

    def __init__(self, pref_name: str, answer_format: str, accent_hex: str):
        super().__init__()
        self.pref_name = pref_name
        self.answer_format = answer_format
        self.is_mark = ("マーク" in answer_format)
        self.accent_hex = accent_hex
        self.width = 176 * mm
        self.height = 54 * mm

    def wrap(self, availWidth, availHeight):
        self.width = availWidth
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        w, h = self.width, self.height
        accent = colors.HexColor(self.accent_hex)

        c.setFillColor(colors.white)
        c.setStrokeColor(accent)
        c.setLineWidth(1.2)
        c.roundRect(0, 0, w, h, 2.5 * mm, stroke=1, fill=1)

        c.setFillColor(accent)
        c.rect(0, h - 8 * mm, w, 8 * mm, stroke=0, fill=1)
        c.setFillColor(colors.white)
        c.setFont(FONT_BOLD, 8.5)
        mode_str = "マークシート＋記述併用式 模擬解答用紙" if self.is_mark else "記述・論述・証明重視型 模擬解答用紙"
        c.drawString(4 * mm, h - 5.6 * mm, f"{self.pref_name} 本番形式準拠｜{mode_str}（印刷して実戦練習用）")
        c.drawRightString(w - 4 * mm, h - 5.6 * mm, "受験番号［　　　　］ 氏名［　　　　　　　］")

        left_w = w * 0.52
        c.setFillColor(colors.HexColor("#0F172A"))
        c.setFont(FONT_BOLD, 7.5)
        if self.is_mark:
            c.drawString(4 * mm, h - 13 * mm, "■ 選択問題マーク欄（HB/Bの黒鉛筆で濃く塗りつぶすこと）")
            subjs = ["英語", "数学", "国語", "理科", "社会"]
            for s_i, sname in enumerate(subjs):
                ry = h - (19 + s_i * 6.8) * mm
                c.setFillColor(colors.HexColor("#1E293B"))
                c.setFont(FONT_BOLD, 7.2)
                c.drawString(4 * mm, ry, sname)
                for q_i in range(4):
                    qx = 15 * mm + q_i * 18.5 * mm
                    c.setFont(FONT_REG, 6.2)
                    c.setFillColor(colors.HexColor("#64748B"))
                    c.drawString(qx, ry + 0.3 * mm, f"{q_i+1}")
                    for b_i, lbl in enumerate(["ア", "イ", "ウ", "エ"]):
                        bx = qx + 3.2 * mm + b_i * 3.5 * mm
                        c.setStrokeColor(colors.HexColor("#0F766E"))
                        c.setLineWidth(0.6)
                        c.ellipse(bx, ry - 0.6 * mm, bx + 2.8 * mm, ry + 2.6 * mm, stroke=1, fill=0)
                        c.setFont(FONT_REG, 5.0)
                        c.drawCentredString(bx + 1.4 * mm, ry + 0.3 * mm, lbl)
        else:
            c.drawString(4 * mm, h - 13 * mm, "■ 各教科 記号・短答記述欄（単位・漢字指定に注意）")
            subjs = ["英語", "数学", "国語", "理科", "社会"]
            for s_i, sname in enumerate(subjs):
                ry = h - (19.5 + s_i * 6.8) * mm
                c.setFillColor(colors.HexColor("#1E293B"))
                c.setFont(FONT_BOLD, 7.2)
                c.drawString(4 * mm, ry + 0.8 * mm, sname)
                for q_i in range(4):
                    qx = 15 * mm + q_i * 18.5 * mm
                    c.setStrokeColor(colors.HexColor("#94A3B8"))
                    c.setLineWidth(0.6)
                    c.rect(qx, ry - 1 * mm, 17 * mm, 5.2 * mm, stroke=1, fill=0)
                    c.setFont(FONT_REG, 5.6)
                    c.setFillColor(colors.HexColor("#64748B"))
                    c.drawString(qx + 0.8 * mm, ry + 2.4 * mm, f"問{q_i+1}")

        rx = left_w + 3 * mm
        rw = w - rx - 4 * mm
        c.setFillColor(colors.HexColor("#0F172A"))
        c.setFont(FONT_BOLD, 7.2)
        c.drawString(rx, h - 13 * mm, "■ 実戦英作文・証明/理由記述・国語字数指定マス目")

        c.setStrokeColor(colors.HexColor("#64748B"))
        c.setLineWidth(0.5)
        for ln in range(3):
            ly = h - (18.5 + ln * 5.2) * mm
            c.line(rx, ly, rx + rw, ly)
        c.setFont(FONT_REG, 5.8)
        c.setFillColor(colors.HexColor("#64748B"))
        c.drawRightString(rx + rw, h - 17.5 * mm, "（英語条件英作文記入欄）")

        gy_top = h - 35.5 * mm
        cols = 15
        cell = min(4.3 * mm, rw / cols)
        c.setStrokeColor(colors.HexColor("#059669"))
        c.setLineWidth(0.45)
        for r_i in range(2):
            for c_i in range(cols):
                c.rect(rx + c_i * cell, gy_top - (r_i + 1) * cell, cell, cell, stroke=1, fill=0)
        c.setFont(FONT_REG, 5.8)
        c.setFillColor(colors.HexColor("#047857"))
        c.drawString(rx, gy_top + 1 * mm, "国語・社会 30字記述マス（句読点も1マス）")

        c.setStrokeColor(colors.HexColor("#94A3B8"))
        c.rect(rx, 2.5 * mm, rw, 9.5 * mm, stroke=1, fill=0)
        c.setFillColor(colors.HexColor("#64748B"))
        c.drawString(rx + 1.5 * mm, 9.2 * mm, "数学 途中式・証明 ／ 理科 理由記述欄")

        c.restoreState()


def make_styles(accent_hex="#1E40AF"):
    accent = colors.HexColor(accent_hex)
    return {
        "kicker": ParagraphStyle("kicker", fontName=FONT_BOLD, fontSize=9, leading=13, textColor=accent, spaceAfter=2),
        "cover_title": ParagraphStyle("cover_title", fontName=FONT_BOLD, fontSize=18, leading=25, textColor=colors.HexColor("#0F172A"), spaceAfter=4),
        "cover_sub": ParagraphStyle("cover_sub", fontName=FONT_REG, fontSize=9.8, leading=14.8, textColor=colors.HexColor("#334155"), spaceAfter=6),
        "h1": ParagraphStyle(
            "h1",
            fontName=FONT_BOLD,
            fontSize=12.5,
            leading=17.5,
            textColor=colors.white,
            backColor=accent,
            borderPadding=(4.5, 7, 4.5, 7),
            spaceBefore=5,
            spaceAfter=6,
        ),
        "h2": ParagraphStyle("h2", fontName=FONT_BOLD, fontSize=10.5, leading=15, textColor=accent, spaceBefore=5, spaceAfter=2.5),
        "black_tag": ParagraphStyle(
            "black_tag",
            fontName=FONT_BOLD,
            fontSize=9.8,
            leading=14,
            textColor=colors.white,
            backColor=colors.HexColor("#0F172A"),
            borderPadding=(3.5, 6, 3.5, 6),
            spaceBefore=5,
            spaceAfter=3,
        ),
        "why_box": ParagraphStyle(
            "why_box",
            fontName=FONT_REG,
            fontSize=8.6,
            leading=13.2,
            textColor=colors.HexColor("#78350F"),
            backColor=colors.HexColor("#FEF3C7"),
            borderPadding=(4, 6, 4, 6),
            spaceAfter=3.5,
        ),
        "body": ParagraphStyle("body", fontName=FONT_REG, fontSize=9.0, leading=13.8, textColor=colors.HexColor("#1E293B"), spaceAfter=3.5),
        "small": ParagraphStyle("small", fontName=FONT_REG, fontSize=8.0, leading=12.0, textColor=colors.HexColor("#475569"), spaceAfter=2.5),
        "q_prompt": ParagraphStyle("q_prompt", fontName=FONT_BOLD, fontSize=9.2, leading=14.0, textColor=colors.HexColor("#0F172A"), spaceBefore=3.5, spaceAfter=2.5),
        "choice": ParagraphStyle("choice", fontName=FONT_REG, fontSize=8.7, leading=12.8, leftIndent=10, textColor=colors.HexColor("#1E293B"), spaceAfter=1.2),
        "ans": ParagraphStyle("ans", fontName=FONT_BOLD, fontSize=9.1, leading=13.6, textColor=colors.HexColor("#B91C1C"), spaceAfter=1.8),
        "disclaimer": ParagraphStyle("disclaimer", fontName=FONT_REG, fontSize=7.3, leading=10.5, textColor=colors.HexColor("#64748B"), spaceBefore=4),
    }


def make_page_decorator(header_title: str, accent_hex: str, badge_text: str):
    accent = colors.HexColor(accent_hex)

    def decorate(canvas, doc):
        canvas.saveState()
        pno = canvas.getPageNumber()
        if pno == 1:
            canvas.setStrokeColor(accent)
            canvas.setLineWidth(1.4)
            canvas.rect(10 * mm, 12 * mm, PAGE_W - 20 * mm, PAGE_H - 22 * mm, stroke=1, fill=0)
        else:
            canvas.setStrokeColor(accent)
            canvas.setLineWidth(0.8)
            canvas.line(15 * mm, PAGE_H - 13 * mm, PAGE_W - 15 * mm, PAGE_H - 13 * mm)
            canvas.setFillColor(colors.HexColor("#334155"))
            canvas.setFont(FONT_BOLD, 8)
            canvas.drawString(15 * mm, PAGE_H - 10.5 * mm, header_title[:48])
            canvas.drawRightString(PAGE_W - 15 * mm, PAGE_H - 10.5 * mm, badge_text)

        canvas.setFillColor(colors.HexColor("#64748B"))
        canvas.setFont(FONT_REG, 8)
        canvas.drawCentredString(PAGE_W / 2, 7.5 * mm, f"— {pno} —  マナトビ 高校入試")
        canvas.restoreState()

    return decorate


REGION_COLORS = {
    "北海道・東北": "#1D4ED8",
    "関東": "#0F766E",
    "中部・東海・北陸": "#6D28D9",
    "近畿": "#B45309",
    "中国・四国": "#0369A1",
    "九州・沖縄": "#BE123C",
}

SUBJECT_NAMES_JA = {
    "english": "英語",
    "math": "数学",
    "japanese": "国語",
    "science": "理科",
    "social": "社会",
}


def deterministic_pick(items, seed_key: str, k: int):
    if len(items) <= k:
        return list(items)
    scored = []
    for idx, it in enumerate(items):
        h = hashlib.md5(f"{seed_key}:{idx}:{it.get('id','')}".encode("utf-8")).hexdigest()
        scored.append((h, it))
    scored.sort(key=lambda x: x[0])
    return [x[1] for x in scored[:k]]


def format_question_block(q_num: int, q: dict, styles: dict, is_mark: bool = False):
    elems = []
    rate_txt = f"（正答率目安 {q.get('rate', 70)}%｜{clean_tex(q.get('skill') or q.get('category') or '')}）"
    elems.append(Paragraph(f"問{q_num}　{clean_tex(q['prompt'])} <font size='7.3' color='#64748B'>{rate_txt}</font>", styles["q_prompt"]))
    opts = q.get("optionTexts") or q.get("options") or []
    if opts and q.get("type") != "short_answer":
        labels = ["ア", "イ", "ウ", "エ", "オ"]
        for i, opt in enumerate(opts[:4]):
            lbl = labels[i] if i < len(labels) else str(i + 1)
            mark_prefix = f"[{lbl}] " if is_mark else f"{lbl}．"
            elems.append(Paragraph(f"{mark_prefix}{clean_tex(opt)}", styles["choice"]))
    else:
        elems.append(Paragraph("【記述・短答欄】＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿（単位・条件を確認）", styles["choice"]))
    elems.append(Spacer(1, 1.5 * mm))
    return KeepTogether(elems)


def correct_label_of(q: dict) -> str:
    opts = q.get("optionTexts") or q.get("options") or []
    ca = str(q.get("correctAnswer") or "")
    if opts and q.get("type") != "short_answer":
        labels = ["ア", "イ", "ウ", "エ"]
        if ca.isdigit():
            idx = int(ca) - 1
            if 0 <= idx < len(opts):
                return f"{labels[idx]}（{clean_tex(opts[idx])}）"
        for idx, o in enumerate(opts):
            if str(o) == ca:
                return f"{labels[idx]}（{clean_tex(o)}）"
    return clean_tex(ca)


def build_pdf(pdf_path: Path, story: list, header_title: str, accent_hex: str, badge_text: str):
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title=header_title,
        author="マナトビ 高校入試編集部",
    )
    doc.build(
        story,
        onFirstPage=make_page_decorator(header_title, accent_hex, badge_text),
        onLaterPages=make_page_decorator(header_title, accent_hex, badge_text),
    )


def render_thumb_and_previews(pdf_path: Path, item_id: str, make_preview: bool = True):
    doc = fitz.open(str(pdf_path))
    pages = len(doc)
    kb = max(1, round(pdf_path.stat().st_size / 1024))

    p0 = doc[0]
    pix = p0.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    w_target = 360
    h_target = round(img.height * (w_target / img.width))
    thumb_img = img.resize((w_target, h_target), Image.Resampling.LANCZOS)
    thumb_out = THUMBS_DIR / f"{item_id}.webp"
    thumb_img.save(str(thumb_out), "WEBP", quality=86)

    preview_urls = []
    if make_preview and pages >= 2:
        cand_indices = [1]
        mid = min(pages - 1, max(2, pages - 2))
        if mid not in cand_indices:
            cand_indices.append(mid)
        for p_idx in cand_indices:
            pg = doc[p_idx]
            px = pg.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
            im = Image.frombytes("RGB", [px.width, px.height], px.samples)
            pw = 640
            ph = round(im.height * (pw / im.width))
            im = im.resize((pw, ph), Image.Resampling.LANCZOS)
            crop_h = round(ph * 0.62)
            cropped = im.crop((0, 0, pw, crop_h))
            blur_top = round(crop_h * 0.52)
            lower = cropped.crop((0, blur_top, pw, crop_h)).filter(ImageFilter.GaussianBlur(radius=9))
            cropped.paste(lower, (0, blur_top))
            overlay = Image.new("RGBA", (pw, crop_h), (255, 255, 255, 0))
            draw = ImageDraw.Draw(overlay)
            for y in range(blur_top, crop_h):
                alpha = int(185 * ((y - blur_top) / max(1, crop_h - blur_top)))
                draw.line([(0, y), (pw, y)], fill=(248, 250, 252, alpha))
            merged = Image.alpha_composite(cropped.convert("RGBA"), overlay).convert("RGB")
            pno = p_idx + 1
            prev_file = PREVIEWS_DIR / f"{item_id}_p{pno}.webp"
            merged.save(str(prev_file), "WEBP", quality=82)
            preview_urls.append(f"/prints/previews/{item_id}_p{pno}.webp")

    doc.close()
    return pages, kb, preview_urls


LISTENING_SCRIPTS = [
    {
        "dialog": "M: Excuse me, Ms. Green. Will the science club meet in the first lab after school today?\nW: Actually, the third-year students are using it until four thirty, so we moved our meeting to the library on the second floor.\nM: Got it! Should I bring my tablet?\nW: Yes, we'll check the slides for Saturday's presentation.",
        "question": "Where will the science club meet after school today?",
        "options": ["ア．In the first science lab", "イ．In the library on the second floor", "ウ．In the computer room", "エ．In the school gym"],
        "ans": "イ（In the library on the second floor）",
        "point": "最初の場所（first lab）に飛びつかず、Actually 以下の変更後の場所（moved our meeting to the library）を聞き取るのがリスニング最大の鉄則！",
    },
    {
        "dialog": "W: Ken, how will we get to the city museum tomorrow? By bus or by train?\nM: The bus stops right in front of the museum, but it takes forty minutes because of morning traffic. If we take the nine-ten train, it takes only fifteen minutes and a five-minute walk.\nW: Let's take the train then. Let's meet at the station ticket gate ten minutes before it leaves.",
        "question": "What time will they meet at the station ticket gate tomorrow?",
        "options": ["ア．At 8:50", "イ．At 9:00", "ウ．At 9:10", "エ．At 9:25"],
        "ans": "イ（At 9:00）",
        "point": "数値計算型リスニング！『9時10分発の電車（nine-ten train）』の『10分前（ten minutes before it leaves）』なので 9:00 が正解！",
    },
    {
        "dialog": "M: Look at this chart from our student council survey. More than half of the students want longer library hours.\nW: Yes, fifty-five percent chose that. The second most popular request was adding water coolers near the gym, at twenty-eight percent.\nM: Let's propose both ideas to the principal next Monday.",
        "question": "What was the most popular request in the student council survey?",
        "options": ["ア．Adding water coolers near the gym", "イ．Making library hours longer", "ウ．Opening the school cafeteria on Saturdays", "エ．Buying new soccer balls"],
        "ans": "イ（Making library hours longer）",
        "point": "図表・グラフ読み取り型リスニング！More than half (55%) と The second most popular (28%) の順位関係をメモしながら聞く！",
    },
]


def build_prefecture_pdf(pref: dict, subjects_map: dict, writing_tasks: list):
    pref_id = pref["id"]
    pref_name = pref["name"]
    region = pref["region"]
    accent = REGION_COLORS.get(region, "#1E40AF")
    styles = make_styles(accent)
    item_id = f"print_lr_pref_{pref_id}"
    pdf_path = OUT_DIR / f"{item_id}.pdf"
    is_mark = ("マーク" in pref.get("answerFormat", ""))

    ch_by_id = {}
    all_q_by_subj = {}
    for sk, sdata in subjects_map.items():
        all_q = []
        for ch in sdata["chapters"]:
            ch_by_id[ch["id"]] = ch
            all_q.extend(ch["questions"])
        all_q_by_subj[sk] = all_q

    story = []
    story.append(
        BookCoverHero(
            rarity_tag=f"LR｜{pref['shortName']}入試予想",
            big_title=f"{pref_name} 公立高校入試\n5教科 本番形式予想問題集",
            sub_line=f"{pref['examSystemName']}準拠｜問題・模擬解答用紙・放送台本・採点基準つき",
            chips=[
                f"時間:{pref['timePerSubject'][:12]}",
                f"形式:{pref['answerFormat'][:12]}",
                f"当日:内申={pref['naishinFormula']['typicalRatioLabel']}",
            ],
            accent_hex=accent,
            gold_trim=True,
        )
    )
    story.append(Spacer(1, 3 * mm))

    info_rows = [
        [f"{pref_name} 本番規定", "公開要綱・出題傾向に基づく実戦チェックポイント"],
        ["選抜名・配点・時間", f"{clean_tex(pref['examSystemName'])} ／ {clean_tex(pref['scoreSummary'])} ／ 各教科 {clean_tex(pref['timePerSubject'])}"],
        ["解答用紙の形式", f"<b>{clean_tex(pref['answerFormat'])}</b>（下段に{pref_name}仕様の模擬解答欄を収録）"],
        ["英語リスニング規定", clean_tex(pref["listeningDetail"])],
        ["調査書（内申点）換算", f"{clean_tex(pref['naishinSpan'])} ／ {clean_tex(pref['naishinFormula']['formulaLabel'])}（比率目安 {clean_tex(pref['naishinFormula']['typicalRatioLabel'])}）"],
        ["自校作成・外部検定", f"{clean_tex(pref['customProblem'])} ｜ 英検等：{clean_tex(pref['eikenPolicyType'])}"],
        ["最重点攻略ポイント", clean_tex(pref["keyFeature"])],
    ]
    tbl_data = [[Paragraph(f"<b>{r[0]}</b>", styles["small"]), Paragraph(r[1], styles["small"])] for r in info_rows]
    t = Table(tbl_data, colWidths=[35 * mm, 145 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F172A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("BACKGROUND", (0, 1), (0, -1), colors.HexColor("#F1F5F9")),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 2.8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
                ("LEFTPADDING", (0, 0), (-1, -1), 4.5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4.5),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 3 * mm))

    story.append(PrefectureAnswerSheetPreview(pref_name, pref["answerFormat"], accent))
    story.append(
        Paragraph(
            f"※本冊子は{pref_name}教育委員会の公表要綱・出題傾向を分析してマナトビ高校入試編集部が独自制作した書き下ろし予想問題であり、公式過去問ではありません。",
            styles["disclaimer"],
        )
    )
    story.append(PageBreak())

    rec_by_subj = {}
    for rec in pref.get("recommendedChapters", []):
        rec_by_subj.setdefault(rec["subject"], []).append(rec["chapterId"])

    selected_by_subj = {}
    for sk in ["english", "math", "japanese", "science", "social"]:
        pool = []
        for cid in rec_by_subj.get(sk, []):
            if cid in ch_by_id:
                pool.extend(ch_by_id[cid]["questions"])
        picked = deterministic_pick(pool, f"{pref_id}:{sk}:rec", 2)
        used_ids = {q["id"] for q in picked}
        rest = [q for q in all_q_by_subj[sk] if q["id"] not in used_ids]
        picked.extend(deterministic_pick(rest, f"{pref_id}:{sk}:all", 4 - len(picked)))
        selected_by_subj[sk] = picked[:4]

    wt = deterministic_pick(writing_tasks, f"{pref_id}:wt", 1)[0]
    ls_item = LISTENING_SCRIPTS[pref["code"] % len(LISTENING_SCRIPTS)]
    trends = pref.get("subjectTrends", {})

    story.append(ExamVectorFiguresStrip(accent))
    story.append(Spacer(1, 2.5 * mm))

    for idx_s, sk in enumerate(["english", "math", "japanese", "science", "social"], start=1):
        sname = SUBJECT_NAMES_JA[sk]
        fmt_badge = "マーク選択＋記述" if is_mark else "記述・短答・選択"
        story.append(
            Paragraph(
                f"第{idx_s}検査　{pref_name}予想問題【{sname}】（本番試験時間 {clean_tex(pref['timePerSubject'])}の圧縮実戦15分｜{fmt_badge}）",
                styles["h1"],
            )
        )
        story.append(
            Paragraph(
                f"<b>■ {pref_name}・{sname}の出題傾向と時間配分：</b>{clean_tex(trends.get(sk, ''))}",
                styles["small"],
            )
        )

        if sk == "english":
            story.append(
                KeepTogether(
                    [
                        Paragraph(
                            f"【リスニング予想問題（{clean_tex(pref['listeningDetail'][:34])}）】放送される対話を聞き、質問の答えとして最も適切なものを選びなさい。（巻末に放送台本収録）",
                            styles["q_prompt"],
                        ),
                        Paragraph(f"Question: {clean_tex(ls_item['question'])}", styles["body"]),
                        *[Paragraph(opt, styles["choice"]) for opt in ls_item["options"]],
                        Spacer(1, 1.5 * mm),
                    ]
                )
            )

        for q_i, q in enumerate(selected_by_subj[sk], start=1):
            story.append(format_question_block(q_i, q, styles, is_mark=is_mark))

        if sk == "english":
            story.append(
                KeepTogether(
                    [
                        Paragraph(
                            f"【実戦条件英作文（配点5点）】次の条件にしたがって英語で書きなさい。（語数目安：{wt.get('minWords',15)}〜{wt.get('maxWords',35)}語）",
                            styles["q_prompt"],
                        ),
                        Paragraph(clean_tex(wt.get("promptJa", "")), styles["body"]),
                        Paragraph("解答欄：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿", styles["choice"]),
                        Paragraph("　　　　＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿", styles["choice"]),
                    ]
                )
            )
        if idx_s in (2, 4, 5):
            story.append(PageBreak())

    story.append(Paragraph(f"{pref_name} 公立高校入試予想問題｜正答一覧・リスニング台本・採点基準つき解説", styles["h1"]))
    ans_summary_rows = [["教科", "問1", "問2", "問3", "問4", "備考"]]
    for sk in ["english", "math", "japanese", "science", "social"]:
        qs = selected_by_subj[sk]
        ans_summary_rows.append(
            [
                SUBJECT_NAMES_JA[sk],
                correct_label_of(qs[0])[:14],
                correct_label_of(qs[1])[:14],
                correct_label_of(qs[2])[:14],
                correct_label_of(qs[3])[:14],
                "リス＋英作含" if sk == "english" else pref["answerFormat"][:8],
            ]
        )
    ans_tbl = Table(
        [[Paragraph(f"<b>{c}</b>" if r_i == 0 else c, styles["small"]) for c in row] for r_i, row in enumerate(ans_summary_rows)],
        colWidths=[18 * mm, 35 * mm, 35 * mm, 35 * mm, 35 * mm, 22 * mm],
    )
    ans_tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F172A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("BACKGROUND", (0, 1), (0, -1), colors.HexColor("#F8FAFC")),
                ("TOPPADDING", (0, 0), (-1, -1), 2.8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
            ]
        )
    )
    story.append(ans_tbl)
    story.append(Spacer(1, 3 * mm))

    story.append(
        KeepTogether(
            [
                Paragraph(f"◆ 【英語リスニング放送台本＆正解】 正解：{ls_item['ans']}", styles["ans"]),
                Paragraph(f"<b>放送スクリプト：</b><br/>{clean_tex(ls_item['dialog'])}", styles["small"]),
                Paragraph(f"<b>聞き取りの急所：</b>{clean_tex(ls_item['point'])}", styles["why_box"]),
            ]
        )
    )

    for sk in ["english", "math", "japanese", "science", "social"]:
        sname = SUBJECT_NAMES_JA[sk]
        story.append(Paragraph(f"◆ 【{sname}】 解法プロセス＆誤答の罠チェック", styles["h2"]))
        for q_i, q in enumerate(selected_by_subj[sk], start=1):
            exp = clean_tex(q.get("oneLine") or q.get("explanation") or "")
            detail = clean_tex(q.get("explanation") or "")
            if detail and detail != exp:
                exp = f"<b>{exp}</b><br/><font color='#334155'>{detail[:260]}</font>"
            story.append(
                KeepTogether(
                    [
                        Paragraph(f"問{q_i}　正解：{correct_label_of(q)}", styles["ans"]),
                        Paragraph(exp, styles["small"]),
                    ]
                )
            )
        if sk == "english":
            model_en = clean_tex((wt.get("modelAnswers") or [""])[0] if wt.get("modelAnswers") else wt.get("modelAnswer", ""))
            story.append(
                KeepTogether(
                    [
                        Paragraph(f"【実戦条件英作文 模範解答例（5点満点）】 {model_en}", styles["ans"]),
                        Paragraph(
                            "<b>採点基準（部分点ルーブリック）：</b>①内容・条件の充足（2点） ②主語と動詞の時制・三単現の一致（2点） ③スペル・語数条件のクリア（1点）。難しい直訳を避け、中学基本文型に言い換えるのが満点の鉄則！",
                            styles["why_box"],
                        ),
                    ]
                )
            )

    story.append(
        Paragraph(
            f"発行：マナトビ 高校入試編集部 ／ 本プリントは{pref_name}の公式過去問ではなく、公開選抜要項に基づく学習用オリジナル予想問題集です。",
            styles["disclaimer"],
        )
    )

    header_title = f"{pref_name} 公立高校入試 5教科予想問題＆解説"
    build_pdf(pdf_path, story, header_title, accent, f"LR｜{pref['shortName']}入試予想")
    pages, kb, previews = render_thumb_and_previews(pdf_path, item_id, make_preview=True)
    return {
        "id": item_id,
        "prefId": pref_id,
        "prefName": pref_name,
        "region": region,
        "label": f"{pref_name} 公立高校入試 5教科予想問題＆詳しい解説（{pref['answerFormat']}・模擬解答用紙つき）",
        "subject": "juken_5subjects",
        "category": "演習プリント",
        "file": f"/prints/{item_id}.pdf",
        "thumb": f"/prints/thumbs/{item_id}.webp",
        "pages": pages,
        "kb": kb,
        "previews": previews,
    }


def build_national_mock_pdf(round_no: int, subjects_map: dict, writing_tasks: list):
    item_id = f"print_lr_juken_mock_{round_no}"
    pdf_path = OUT_DIR / f"{item_id}.pdf"
    accent = ["#B91C1C", "#1D4ED8", "#0F766E"][round_no - 1]
    styles = make_styles(accent)
    themes = [
        "標準〜上位校突破（基礎の取りこぼしゼロ＋思考力読解・関数・実験考察）",
        "グラフ・資料読み取り＆記述強化（統計地理・歴史並べ替え・化学計算・証明）",
        "直前ファイナル総仕上げ（全国頻出トラップ・スタフリ秒殺裏ワザ総動員）",
    ]

    story = [
        BookCoverHero(
            rarity_tag=f"LR｜全国総合模試 第{round_no}回",
            big_title=f"全国公立高校入試\n5教科総合予想模試 第{round_no}回",
            sub_line=themes[round_no - 1],
            chips=["5教科25問+英作文", "模擬解答用紙つき", "第1回は全文無料公開" if round_no == 1 else "正答率・誤答解説完備"],
            accent_hex=accent,
            gold_trim=True,
        ),
        Spacer(1, 3 * mm),
        Paragraph(
            "・本番と同じ「英・数・国・理・社」の5教科通し演習ができる全国標準〜上位レベルの総合予想模試です。<br/>"
            "・各問に全国正答率の目安と「なぜそうなるか（丸暗記ゼロの核心解説）」を完備しています。",
            styles["body"],
        ),
        ExamVectorFiguresStrip(accent),
        Spacer(1, 3 * mm),
        PrefectureAnswerSheetPreview(f"全国総合模試 第{round_no}回", "マーク＋記述併用", accent),
        PageBreak(),
    ]

    selected_by_subj = {}
    for sk in ["english", "math", "japanese", "science", "social"]:
        all_q = [q for ch in subjects_map[sk]["chapters"] for q in ch["questions"]]
        selected_by_subj[sk] = deterministic_pick(all_q, f"natmock:{round_no}:{sk}", 5)

    for idx_s, sk in enumerate(["english", "math", "japanese", "science", "social"], start=1):
        sname = SUBJECT_NAMES_JA[sk]
        story.append(Paragraph(f"第{idx_s}教科　【{sname}】 予想問題（各5点×5問＝25点）", styles["h1"]))
        for q_i, q in enumerate(selected_by_subj[sk], start=1):
            story.append(format_question_block(q_i, q, styles, is_mark=True))
        if idx_s in (2, 4, 5):
            story.append(PageBreak())

    story.append(Paragraph(f"全国公立高校入試 5教科総合予想模試 第{round_no}回｜解答・解説編", styles["h1"]))
    for sk in ["english", "math", "japanese", "science", "social"]:
        sname = SUBJECT_NAMES_JA[sk]
        story.append(Paragraph(f"■ 【{sname}】 正解とスピード解説", styles["h2"]))
        for q_i, q in enumerate(selected_by_subj[sk], start=1):
            story.append(
                KeepTogether(
                    [
                        Paragraph(f"問{q_i}　正解：{correct_label_of(q)}", styles["ans"]),
                        Paragraph(clean_tex(q.get("oneLine") or q.get("explanation") or ""), styles["small"]),
                    ]
                )
            )

    header_title = f"全国公立高校入試 5教科総合予想模試 第{round_no}回"
    build_pdf(pdf_path, story, header_title, accent, f"LR｜総合模試 第{round_no}回")
    pages, kb, previews = render_thumb_and_previews(pdf_path, item_id, make_preview=True)
    return {
        "id": item_id,
        "label": f"公立高校入試 5教科総合予想模試 第{round_no}回（英数国理社25問＋詳しい解説）",
        "subject": "juken_5subjects",
        "category": "演習プリント",
        "file": f"/prints/{item_id}.pdf",
        "thumb": f"/prints/thumbs/{item_id}.webp",
        "pages": pages,
        "kb": kb,
        "previews": previews,
    }


def render_summary_sheets_book(
    item_id: str,
    short_cover_title: str,
    label: str,
    subj_code: str,
    subtitle: str,
    sheets: list,
    accent: str,
    category: str = "完全版",
    make_preview: bool = True,
):
    pdf_path = OUT_DIR / f"{item_id}.pdf"
    styles = make_styles(accent)
    is_ur = category == "完全版"
    badge = "UR｜完全版バイブル" if is_ur else "SR｜要点攻略"

    story = [
        BookCoverHero(
            rarity_tag=badge,
            big_title=short_cover_title,
            sub_line=subtitle,
            chips=[f"全{len(sheets)}章 完全収録", "丸暗記ゼロの理由解説", "実戦例題・比較表つき"],
            accent_hex=accent,
            gold_trim=is_ur,
        ),
        Spacer(1, 3 * mm),
        Paragraph("■ 収録チャプター目次（原本授業プリントの構成そのままに理解→定着が完結）", styles["h2"]),
    ]
    for idx, sh in enumerate(sheets, start=1):
        story.append(Paragraph(f"第{idx}講　<b>{clean_tex(sh['title'])}</b> — <font color='#64748B'>{clean_tex(sh.get('subtitle',''))}</font>", styles["small"]))
    story.append(PageBreak())

    for idx, sh in enumerate(sheets, start=1):
        story.append(Paragraph(f"第{idx}講　{clean_tex(sh['title'])}", styles["h1"]))
        if sh.get("subtitle"):
            story.append(Paragraph(clean_tex(sh["subtitle"]), styles["small"]))
        for it in sh.get("items", []):
            block = [
                Paragraph(f"■ {clean_tex(it['heading'])}", styles["black_tag"]),
            ]
            if it.get("whyCore"):
                block.append(Paragraph(f"<b>【なぜそうなる？ 本質の理解】</b> {clean_tex(it['whyCore'], rich=True)}", styles["why_box"]))
            block.append(Paragraph(clean_tex(it.get("body") or it.get("point") or "", rich=True), styles["body"]))
            if it.get("flowBoxes"):
                flow_str = " <b>⇒</b> ".join(
                    f"[{clean_tex(fb.get('step',''))}] {clean_tex(fb.get('title',''))}（{clean_tex(fb.get('detail',''))}）"
                    for fb in it["flowBoxes"]
                )
                block.append(Paragraph(f"<b>【因果・思考フロー】</b> {flow_str}", styles["small"]))
            if it.get("tip"):
                block.append(Paragraph(f"<b>【入試の急所】</b> {clean_tex(it['tip'], rich=True)}", styles["small"]))
            story.append(KeepTogether(block))

            if it.get("table"):
                tb = it["table"]
                rows = [tb["headers"]] + tb["rows"]
                col_cnt = max(1, len(tb["headers"]))
                cw = (180 * mm) / col_cnt
                t = Table(
                    [[Paragraph(f"<b>{clean_tex(c)}</b>" if r_i == 0 else clean_tex(c, rich=True), styles["small"]) for c in row] for r_i, row in enumerate(rows)],
                    colWidths=[cw] * col_cnt,
                )
                t.setStyle(
                    TableStyle(
                        [
                            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E2E8F0")),
                            ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CBD5E1")),
                            ("VALIGN", (0, 0), (-1, -1), "TOP"),
                            ("TOPPADDING", (0, 0), (-1, -1), 2.5),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
                        ]
                    )
                )
                story.append(t)
                story.append(Spacer(1, 2 * mm))

            if it.get("workedExamples"):
                for ex_i, ex in enumerate(it["workedExamples"], start=1):
                    steps_txt = " → ".join(clean_tex(s) for s in ex.get("thinkingSteps", []))
                    story.append(
                        KeepTogether(
                            [
                                Paragraph(f"【実戦例題{ex_i}】 {clean_tex(ex.get('prompt',''))}", styles["q_prompt"]),
                                Paragraph(f"考え方：{steps_txt}<br/><b>答：{clean_tex(ex.get('answer',''))}</b>", styles["small"]),
                            ]
                        )
                    )
        if idx < len(sheets):
            story.append(PageBreak())

    build_pdf(pdf_path, story, label, accent, badge)
    pages, kb, previews = render_thumb_and_previews(pdf_path, item_id, make_preview=make_preview)
    return {
        "id": item_id,
        "label": label,
        "subject": subj_code,
        "category": category,
        "file": f"/prints/{item_id}.pdf",
        "thumb": f"/prints/thumbs/{item_id}.webp",
        "pages": pages,
        "kb": kb,
        "previews": previews,
    }


def render_chapter_drill_pdf(
    item_id: str,
    short_cover_title: str,
    label: str,
    subj_code: str,
    chapters: list,
    accent: str,
    category: str = "演習プリント",
    make_preview: bool = False,
    max_q: int = 18,
):
    pdf_path = OUT_DIR / f"{item_id}.pdf"
    styles = make_styles(accent)
    is_ur = category == "完全版"
    badge = "UR｜完全演習ブック" if is_ur else f"SR｜{category}"

    qs = []
    for ch in chapters:
        qs.extend(ch["questions"])
    qs = deterministic_pick(qs, f"drill:{item_id}", max_q)

    story = [
        BookCoverHero(
            rarity_tag=badge,
            big_title=short_cover_title,
            sub_line=" ／ ".join(clean_tex(ch["abstractTitle"]) for ch in chapters)[:46],
            chips=[f"厳選{len(qs)}問 収録", "正答率・誤答分析つき", "印刷＆タブレット対応"],
            accent_hex=accent,
            gold_trim=is_ur,
        ),
        Spacer(1, 3 * mm),
        Paragraph("■ 問題編（時間を計って解き、巻末の1行核心解説で根拠まで確認しよう）", styles["h1"]),
    ]
    for i, q in enumerate(qs, start=1):
        story.append(format_question_block(i, q, styles))

    story.append(PageBreak())
    story.append(Paragraph("■ 模範解答・スピード核心解説編", styles["h1"]))
    for i, q in enumerate(qs, start=1):
        exp = clean_tex(q.get("oneLine") or q.get("explanation") or "")
        detail = clean_tex(q.get("explanation") or "")
        if detail and detail != exp:
            exp = f"<b>{exp}</b><br/><font color='#334155'>{detail[:220]}</font>"
        story.append(
            KeepTogether(
                [
                    Paragraph(f"問{i}　正解：{correct_label_of(q)}", styles["ans"]),
                    Paragraph(exp, styles["small"]),
                ]
            )
        )

    build_pdf(pdf_path, story, label, accent, badge)
    pages, kb, previews = render_thumb_and_previews(pdf_path, item_id, make_preview=make_preview)
    return {
        "id": item_id,
        "label": label,
        "subject": subj_code,
        "category": category,
        "file": f"/prints/{item_id}.pdf",
        "thumb": f"/prints/thumbs/{item_id}.webp",
        "pages": pages,
        "kb": kb,
        "previews": previews,
    }


def main():
    payload = json.loads(PAYLOAD_PATH.read_text("utf-8"))
    prefectures = payload["prefectures"]
    subjects_map = payload["subjects"]
    summary_sheets = payload["summarySheets"]
    writing_tasks = payload["writingTasks"]

    sheets_by_subj = {}
    for sh in summary_sheets:
        sheets_by_subj.setdefault(sh["subject"], []).append(sh)

    all_previews = {}

    print("Building 47 prefecture LR PDFs (authentic exam formats + crisp covers)...")
    pref_prints = []
    for pref in prefectures:
        meta = build_prefecture_pdf(pref, subjects_map, writing_tasks)
        all_previews[meta["id"]] = meta.pop("previews")
        pref_prints.append(meta)

    print("Building 3 national mock LR PDFs...")
    nat_mock_prints = []
    for rno in (1, 2, 3):
        meta = build_national_mock_pdf(rno, subjects_map, writing_tasks)
        all_previews[meta["id"]] = meta.pop("previews")
        nat_mock_prints.append(meta)

    print("Building 10 UR Complete Books...")
    ur_books = []
    ur_specs = [
        ("print_ur_juken_en_complete", "英語 完全攻略バイブル\n全英文法・長文・リスニング", "高校入試 英語 完全攻略バイブル（中学全英文法・長文・リスニング総整理）", "english", "時制・助動詞・不定詞・関係代名詞から長文対話・リスニング鉄則まで全7講完全網羅", sheets_by_subj["english"], "#2563EB"),
        ("print_ur_juken_ma_complete", "数学 完全攻略バイブル\n連立8型・関数・図形裏ワザ", "高校入試 数学 完全攻略バイブル（計算・連立8型・関数・図形・スタフリ裏ワザ全集）", "math", "平方根nの4パターン・連立方程式全8型・関数交点公式・円周角と三平方・作図まで全7講完全網羅", sheets_by_subj["math"], "#1D4ED8"),
        ("print_ur_juken_ja_complete", "国語 完全攻略バイブル\n国文法・読解・古文漢文", "高校入試 国語 完全攻略バイブル（国文法・語彙慣用句・韻文・古文漢文・読解作文）", "japanese", "品詞識別・敬語・四字熟語・短歌俳句の季語と表現技法・歴史的仮名遣い・返り点まで全6講完全網羅", sheets_by_subj["japanese"], "#BE123C"),
        ("print_ur_juken_sc_complete", "理科 最終総まとめ完全版\n物理・化学・生物・地学35講", "高校入試 理科 最終総まとめ完全版（全35講：物理・化学・生物・地学＋計算裏ワザ）", "science", "光音力・電流磁界・気体水溶液・化学変化イオン・動植物分類と遺伝・天気地震天体まで全12講完全網羅", sheets_by_subj["science"], "#047857"),
        ("print_ur_juken_so_geo_complete", "社会【地理】完全版\n世界6州・日本7地方・統計", "高校入試 社会【地理】完全版（世界6州・日本7地方・重要統計資料①②総整理）", "social", "世界の気候宗教・6州地誌・日本の工業農業ランキング・地形図縮尺まで全7講完全網羅", [s for s in sheets_by_subj["social"] if "地理" in s.get("group", "")], "#B45309"),
        ("print_ur_juken_so_hist_civ_complete", "社会【歴史・公民】完全版\n通史テーマ＆憲法・政治経済", "高校入試 社会【歴史・公民】完全版（旧石器〜現代戦後史＆憲法・三権分立・経済・国際）", "social", "時代横断テーマ史・外交文化史・日本国憲法・国会内閣裁判所・直接請求権・税と国連まで全7講完全網羅", [s for s in sheets_by_subj["social"] if "地理" not in s.get("group", "")], "#7C2D12"),
    ]
    for iid, scov, lbl, scode, sub, sh_list, col in ur_specs:
        meta = render_summary_sheets_book(iid, scov, lbl, scode, sub, sh_list, col, category="完全版", make_preview=True)
        all_previews[meta["id"]] = meta.pop("previews")
        ur_books.append(meta)

    wt_story_styles = make_styles("#1E40AF")
    wt_id = "print_ur_juken_writing_complete"
    wt_path = OUT_DIR / f"{wt_id}.pdf"
    wt_story = [
        BookCoverHero(
            rarity_tag="UR｜英作文完全制覇",
            big_title="高校入試 英作文\n黄金の型21＋実戦27題",
            sub_line="英作文対策プリント完全準拠｜2文・3文条件・Eメール・意見理由・グラフ英作",
            chips=["黄金の型21パターン", "実戦全27題+模範解答", "減点ゼロ採点基準つき"],
            accent_hex="#1E40AF",
            gold_trim=True,
        ),
        Spacer(1, 3 * mm),
        Paragraph("■ 本書の使い方：難しい日本語をそのまま直訳せず、『中学英語の主語＋動詞』に言い換えて減点ゼロで満点を狙う実戦演習書です。", wt_story_styles["body"]),
        PageBreak(),
    ]
    for idx, w in enumerate(writing_tasks, start=1):
        model_en = clean_tex((w.get("modelAnswers") or [""])[0] if w.get("modelAnswers") else w.get("modelAnswer", ""))
        wt_story.append(
            KeepTogether(
                [
                    Paragraph(f"演習 {idx:02d}｜{clean_tex(w.get('title',''))} （目安 {w.get('minWords',15)}〜{w.get('maxWords',35)}語）", wt_story_styles["h2"]),
                    Paragraph(clean_tex(w.get("promptJa", "")), wt_story_styles["body"]),
                    Paragraph(f"模範解答：{model_en}", wt_story_styles["ans"]),
                ]
            )
        )
    build_pdf(wt_path, wt_story, "高校入試 英作文 完全制覇ブック（全27題）", "#1E40AF", "UR｜完全版の本")
    p_cnt, p_kb, p_prev = render_thumb_and_previews(wt_path, wt_id, make_preview=True)
    all_previews[wt_id] = p_prev
    ur_books.append({
        "id": wt_id,
        "label": "高校入試 英作文 完全制覇ブック（黄金の型21＋実戦全27題・模範解答集）",
        "subject": "english",
        "category": "完全版",
        "file": f"/prints/{wt_id}.pdf",
        "thumb": f"/prints/thumbs/{wt_id}.webp",
        "pages": p_cnt,
        "kb": p_kb,
    })

    extra_ur_drills = [
        ("print_ur_juken_ma_drill_all", "数学 頻出パターン厳選\n関数・相似三平方・確率", "高校入試 数学 頻出パターン厳選演習ブック（関数・相似三平方・確率データ完全版）", "math", subjects_map["math"]["chapters"][4:], "#1E3A8A"),
        ("print_ur_juken_sc_drill_all", "理科 実験・計算厳選\n全分野24問 完全演習", "高校入試 理科 実験・観察・計算問題 完全演習ブック（全分野厳選）", "science", subjects_map["science"]["chapters"][:8], "#065F46"),
        ("print_ur_juken_so_drill_all", "社会 統計・年表・記述\n地歴公横断 完全演習", "高校入試 社会 統計・年表・記述 完全演習ブック（地理・歴史・公民横断）", "social", subjects_map["social"]["chapters"][:8], "#9A3412"),
    ]
    for iid, scov, lbl, scode, chs, col in extra_ur_drills:
        meta = render_chapter_drill_pdf(iid, scov, lbl, scode, chs, col, category="完全版", make_preview=True, max_q=24)
        all_previews[meta["id"]] = meta.pop("previews")
        ur_books.append(meta)

    print("Building 15 SR Unit & Trend Prints...")
    sr_prints = []
    sr_specs = [
        ("print_sr_juken_en_grammar", "英語｜中1・中2英文法\n時制・助動詞・不定詞", "英文法 小問・整序 集中演習プリント（時制・助動詞・不定詞・動名詞）", "english", subjects_map["english"]["chapters"][:3], "#2563EB", "演習プリント"),
        ("print_sr_juken_en_rc", "英語｜関係代名詞・分詞\n長文・対話文 読解演習", "中学3年最重要文法＆長文・対話文 読解演習プリント（分詞・関係代名詞・図表読解）", "english", subjects_map["english"]["chapters"][3:7], "#1D4ED8", "演習プリント"),
        ("print_sr_juken_en_trend", "英語｜リスニング＆英作\n出題傾向・即効攻略", "公立高校入試 英語リスニング・条件英作文 出題傾向＆即効対策レポート", "english", subjects_map["english"]["chapters"][6:], "#0284C7", "出題傾向"),
        ("print_sr_juken_ma_algebra", "数学｜大問1＆連立8型\n平方根n・二次方程式", "直前数学対策 大問1・連立方程式8パターン 完全攻略プリント", "math", subjects_map["math"]["chapters"][:3], "#4338CA", "演習プリント"),
        ("print_sr_juken_ma_func", "数学｜一次関数＆y=ax²\n交点公式・面積二等分", "高校入試 数学 一次関数ダイヤグラム・関数y=ax² 集中演習プリント", "math", subjects_map["math"]["chapters"][3:6], "#3730A3", "演習プリント"),
        ("print_sr_juken_ma_geom", "数学｜平面＆空間図形\n円周角・相似・三平方", "高校入試 数学 円周角・相似・三平方・空間図形・作図 集中演習プリント", "math", subjects_map["math"]["chapters"][6:10], "#1E40AF", "演習プリント"),
        ("print_sr_juken_ma_data", "数学｜確率・箱ひげ図\n標本調査 集中演習", "高校入試 数学 確率・箱ひげ図・標本調査 出題傾向＆即演習プリント", "math", subjects_map["math"]["chapters"][10:], "#6D28D9", "出題傾向"),
        ("print_sr_juken_ja_kotoba", "国語｜漢字・四字熟語\n品詞識別・敬語ドリル", "高校入試 国語 漢字・同訓異字・四字熟語・国文法（品詞・敬語）演習プリント", "japanese", subjects_map["japanese"]["chapters"][:3], "#BE123C", "演習プリント"),
        ("print_sr_juken_ja_reading", "国語｜論説・小説・韻文\n記述の型＆読解演習", "高校入試 国語 論説文・小説・韻文（短歌/俳句/詩）読解＆記述プリント", "japanese", subjects_map["japanese"]["chapters"][3:6], "#9F1239", "演習プリント"),
        ("print_sr_juken_ja_koten", "国語｜古文・漢文攻略\n仮名遣い・係り結び・返り点", "高校入試 国語 古文・漢文（歴史的仮名遣い・係り結び・返り点）出題傾向＆演習", "japanese", subjects_map["japanese"]["chapters"][6:], "#881337", "出題傾向"),
        ("print_sr_juken_sc_phys_chem", "理科｜生物＆物理厳選\n光合成・遺伝・光音力・電流", "高校入試 理科 生物・物理（光合成・遺伝・オームの法則・凸レンズ・仕事）演習プリント", "science", subjects_map["science"]["chapters"][:6], "#047857", "演習プリント"),
        ("print_sr_juken_sc_bio_earth", "理科｜化学＆地学厳選\n気体・イオン・天気地震天体", "高校入試 理科 化学・地学（気体水溶液・イオン電池・天気湿度・地震・天体）演習プリント", "science", subjects_map["science"]["chapters"][6:], "#0F766E", "演習プリント"),
        ("print_sr_juken_so_geo", "社会｜世界＆日本地理\n雨温図・農業工業・地形図", "高校入試 社会 世界地理・日本地理・地形図と雨温図 集中演習プリント", "social", subjects_map["social"]["chapters"][:3], "#B45309", "演習プリント"),
        ("print_sr_juken_so_hist", "社会｜日本史＆世界史\n時代整序・外交・文化史", "高校入試 社会 日本史通史・時代並べ替え・外交文化テーマ史 演習プリント", "social", subjects_map["social"]["chapters"][3:7], "#92400E", "演習プリント"),
        ("print_sr_juken_so_civics", "社会｜公民 集中攻略\n憲法・三権分立・経済・国際", "高校入試 社会 公民（憲法・三権分立・地方自治・経済税制・国際連合）出題傾向＆演習", "social", subjects_map["social"]["chapters"][7:], "#78350F", "出題傾向"),
    ]
    for iid, scov, lbl, scode, chs, col, cat in sr_specs:
        meta = render_chapter_drill_pdf(iid, scov, lbl, scode, chs, col, category=cat, make_preview=False, max_q=16)
        meta.pop("previews", None)
        sr_prints.append(meta)

    print("Building Level-15 reward print...")
    lv_id = "print_level_juken_howto"
    lv_meta = render_summary_sheets_book(
        lv_id,
        "Lv.15特典｜本番前日必読\n5教科 時間配分＆裏ワザ集",
        "公立高校入試 5教科 時間配分＆ケアレスミス撲滅ガイド（Lv.15到達特典）",
        "english",
        "本番前日に必ず読む5教科の得点最大化チェックリスト＆スタフリ厳選裏ワザ抜粋",
        [sheets_by_subj["english"][6], sheets_by_subj["math"][0], sheets_by_subj["science"][11]],
        "#7C3AED",
        category="出題傾向",
        make_preview=False,
    )
    lv_meta.pop("previews", None)

    gacha_prints_all = ur_books + sr_prints
    gp_ts = """// ★自動生成ファイル★ scripts/build-juken-gacha-prints.py で生成。
export type GachaPrintCategory = '出題傾向' | '演習プリント' | '単語テスト' | '完全版';

export interface GachaPrintDef {
  /** ガチャのアイテム id（ITEMS にもこの id で入る） */
  id: string;
  label: string;
  subject: string;
  category: GachaPrintCategory;
  /** public/ からの PDF パス */
  file: string;
  /** 1ページ目のサムネイル（webp） */
  thumb: string;
  pages: number;
  kb: number;
}

export const GACHA_PRINTS: readonly GachaPrintDef[] = """ + json.dumps(gacha_prints_all, ensure_ascii=False, indent=2) + ";\n"
    (ROOT / "src" / "data" / "gachaPrints.generated.ts").write_text(gp_ts, "utf-8")

    prev_ts = """// ★自動生成ファイル★ scripts/build-juken-gacha-prints.py で生成。
/** ピックアップの「中身を少し見る」画像（PDFの一部の上半分だけ・下はぼかし） */
export const GACHA_PREVIEWS: Readonly<Record<string, readonly string[]>> = """ + json.dumps(all_previews, ensure_ascii=False, indent=2) + ";\n"
    (ROOT / "src" / "data" / "gachaPreviews.generated.ts").write_text(prev_ts, "utf-8")

    kyotsu_ts = """/**
 * LR（レジェンドレア）：公立高校入試ガチャの大当たり＝全国公立高校入試 5教科総合予想模試（第1〜3回）。
 * 第1回（print_lr_juken_mock_1）はガチャで当てる前でも「全文を見る」でアプリ内PDFビューから全ページ閲覧可能。
 */
import type { GachaPrintDef } from './gachaPrints.generated';

export const KYOTSU_MOCK_PRINTS: readonly GachaPrintDef[] = """ + json.dumps(nat_mock_prints, ensure_ascii=False, indent=2) + """;

export const KYOTSU_FREE_FULL_IDS: readonly string[] = ['print_lr_juken_mock_1'];
export const isFreeFullPrint = (id: string): boolean => KYOTSU_FREE_FULL_IDS.includes(id);
"""
    (ROOT / "src" / "data" / "kyotsuMockPrints.ts").write_text(kyotsu_ts, "utf-8")

    pref_entries = [
        {"id": p["prefId"], "name": p["prefName"], "region": p["region"], "track": ""}
        for p in pref_prints
    ]
    pref_defs_clean = [
        {k: v for k, v in p.items() if k not in ("prefId", "prefName", "region")}
        for p in pref_prints
    ]
    niji_ts = """/**
 * LR（レジェンドレア）：都道府県別 公立高校入試 5教科予想問題＆詳しい解説（全国47都道府県・全47冊）。
 * 1冊＝都道府県別の配点・内申・出題傾向ガイド＋本番仕様模擬解答用紙＋5教科予想問題＋リスニング＆英作文＋詳しい解説。
 * 各都道府県教育委員会の公式過去問ではなく、公開要綱・出題傾向をもとに制作した書き下ろし予想問題です。
 */
import type { GachaPrintDef } from './gachaPrints.generated';

export const NIJI_UNIVERSITIES = """ + json.dumps(pref_entries, ensure_ascii=False, indent=2) + """ as const;

export type NijiUniversityId = (typeof NIJI_UNIVERSITIES)[number]['id'];

export const OTHER_MOCK_UNIVERSITIES: readonly { id: string; name: string }[] = [];

export const NIJI_MOCK_PRINTS: readonly GachaPrintDef[] = """ + json.dumps(pref_defs_clean, ensure_ascii=False, indent=2) + """;

export function nijiUniversityOf(id: string): (typeof NIJI_UNIVERSITIES)[number] | undefined {
  const m = id.match(/^print_lr_pref_([a-z]+)$/);
  return m ? NIJI_UNIVERSITIES.find((u) => u.id === m[1]) : undefined;
}

export function mockUniversityOf(id: string): { id: string; name: string } | undefined {
  return nijiUniversityOf(id);
}

export function nijiDisclaimerFor(prefName: string): string {
  return `${prefName}教育委員会の公式過去問ではありません。公開要綱・出題傾向を分析して制作したオリジナル予想問題です。`;
}

export const NIJI_DISCLAIMER = '全国47都道府県の教育委員会が公表する入学者選抜要綱・出題傾向を分析して制作した書き下ろし予想問題であり、各都道府県の公式過去問ではありません。';

export const LEVEL_JUKEN_PRINT: GachaPrintDef = """ + json.dumps(lv_meta, ensure_ascii=False, indent=2) + """;
"""
    (ROOT / "src" / "data" / "nijiMockPrints.ts").write_text(niji_ts, "utf-8")

    print(
        f"DONE! Generated {len(pref_prints)} pref LR PDFs + {len(nat_mock_prints)} mock LR PDFs + "
        f"{len(ur_books)} UR books + {len(sr_prints)} SR prints + 1 Level print = "
        f"{len(pref_prints)+len(nat_mock_prints)+len(ur_books)+len(sr_prints)+1} PDFs total."
    )


if __name__ == "__main__":
    main()
