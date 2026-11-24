#!/usr/bin/env python3
"""
Generate all Juken Gacha PDFs, cover thumbnails (WebP), half-page blurred previews (WebP),
and TypeScript definition files for マナトビ 高校入試:

  1) 47 Prefectures Public High School Entrance Exam Predicted Problem & Explanation PDFs (LR):
     - IDs: print_lr_pref_<prefId>  (47 booklets)
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
import os
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
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
)

ROOT = Path("/home/user/webapp")
PAYLOAD_PATH = Path("/tmp/juken_pdf_build/payload.json")
OUT_DIR = ROOT / "public" / "prints"
THUMBS_DIR = OUT_DIR / "thumbs"
PREVIEWS_DIR = OUT_DIR / "previews"

OUT_DIR.mkdir(parents=True, exist_ok=True)
THUMBS_DIR.mkdir(parents=True, exist_ok=True)
PREVIEWS_DIR.mkdir(parents=True, exist_ok=True)

# Register embedded TrueType CJK font (DroidSansFallbackFull.ttf embeds cleanly in PDF & PyMuPDF/pdfjs-dist)
FONT_REG = "DroidSansJP"
FONT_BOLD = "DroidSansJPBold"
pdfmetrics.registerFont(TTFont(FONT_REG, "/usr/share/fonts/truetype/droid/DroidSansFallbackFull.ttf"))
pdfmetrics.registerFont(TTFont(FONT_BOLD, "/usr/share/fonts/truetype/droid/DroidSansFallbackFull.ttf"))
from reportlab.pdfbase.pdfmetrics import registerFontFamily
registerFontFamily(FONT_REG, normal=FONT_REG, bold=FONT_BOLD, italic=FONT_REG, boldItalic=FONT_BOLD)

PAGE_W, PAGE_H = A4


def clean_tex(text: str) -> str:
    """Convert inline LaTeX / cloze markup to clean readable Unicode for PDF rendering."""
    if not text:
        return ""
    s = str(text)
    # Cloze {{ans}} -> 【ans】
    s = re.sub(r"\{\{([^{}]+)\}\}", r"【\1】", s)
    # Handle nested \dfrac / \frac (2 passes)
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
    # Superscripts / subscripts simple cleanup
    sup_map = {"0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "+": "⁺", "-": "⁻"}
    sub_map = {"0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄"}
    s = re.sub(
        r"\^\{([0-9+\-]+)\}",
        lambda m: "".join(sup_map.get(ch, ch) for ch in m.group(1)),
        s,
    )
    s = re.sub(r"\^([0-9])", lambda m: sup_map.get(m.group(1), "^" + m.group(1)), s)
    s = re.sub(
        r"_\{([0-9]+)\}",
        lambda m: "".join(sub_map.get(ch, ch) for ch in m.group(1)),
        s,
    )
    s = re.sub(r"_([0-9])", lambda m: sub_map.get(m.group(1), "_" + m.group(1)), s)
    s = s.replace("$", "")
    s = s.replace("\\", "")
    # Escape XML special chars for ReportLab Paragraph
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    s = s.replace("\n", "<br/>")
    return s


def make_styles(accent_hex="#1E40AF"):
    accent = colors.HexColor(accent_hex)
    return {
        "kicker": ParagraphStyle(
            "kicker",
            fontName=FONT_BOLD,
            fontSize=9,
            leading=13,
            textColor=accent,
            spaceAfter=2,
        ),
        "cover_title": ParagraphStyle(
            "cover_title",
            fontName=FONT_BOLD,
            fontSize=20,
            leading=28,
            textColor=colors.HexColor("#0F172A"),
            spaceAfter=6,
        ),
        "cover_sub": ParagraphStyle(
            "cover_sub",
            fontName=FONT_REG,
            fontSize=10.5,
            leading=16,
            textColor=colors.HexColor("#334155"),
            spaceAfter=8,
        ),
        "h1": ParagraphStyle(
            "h1",
            fontName=FONT_BOLD,
            fontSize=13.5,
            leading=19,
            textColor=colors.white,
            backColor=accent,
            borderPadding=(5, 8, 5, 8),
            spaceBefore=6,
            spaceAfter=8,
        ),
        "h2": ParagraphStyle(
            "h2",
            fontName=FONT_BOLD,
            fontSize=11,
            leading=16,
            textColor=accent,
            spaceBefore=6,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            "body",
            fontName=FONT_REG,
            fontSize=9.2,
            leading=14.2,
            textColor=colors.HexColor("#1E293B"),
            spaceAfter=4,
        ),
        "small": ParagraphStyle(
            "small",
            fontName=FONT_REG,
            fontSize=8.0,
            leading=12.0,
            textColor=colors.HexColor("#475569"),
            spaceAfter=3,
        ),
        "q_prompt": ParagraphStyle(
            "q_prompt",
            fontName=FONT_BOLD,
            fontSize=9.4,
            leading=14.4,
            textColor=colors.HexColor("#0F172A"),
            spaceBefore=4,
            spaceAfter=3,
        ),
        "choice": ParagraphStyle(
            "choice",
            fontName=FONT_REG,
            fontSize=8.9,
            leading=13.2,
            leftIndent=10,
            textColor=colors.HexColor("#1E293B"),
            spaceAfter=1.5,
        ),
        "ans": ParagraphStyle(
            "ans",
            fontName=FONT_BOLD,
            fontSize=9.2,
            leading=14,
            textColor=colors.HexColor("#B91C1C"),
            spaceAfter=2,
        ),
        "disclaimer": ParagraphStyle(
            "disclaimer",
            fontName=FONT_REG,
            fontSize=7.5,
            leading=11,
            textColor=colors.HexColor("#64748B"),
            spaceBefore=6,
        ),
    }


def make_page_decorator(header_title: str, accent_hex: str, badge_text: str):
    accent = colors.HexColor(accent_hex)

    def decorate(canvas, doc):
        canvas.saveState()
        pno = canvas.getPageNumber()
        if pno == 1:
            # Cover decorative top & side bars
            canvas.setFillColor(accent)
            canvas.rect(0, PAGE_H - 18 * mm, PAGE_W, 18 * mm, stroke=0, fill=1)
            canvas.setFillColor(colors.white)
            canvas.setFont(FONT_BOLD, 10)
            canvas.drawString(16 * mm, PAGE_H - 11.5 * mm, "マナトビ 高校入試｜特別編集プリント・予想問題コレクション")
            canvas.drawRightString(PAGE_W - 16 * mm, PAGE_H - 11.5 * mm, badge_text)
            # Subtle border frame on cover
            canvas.setStrokeColor(accent)
            canvas.setLineWidth(1.2)
            canvas.rect(12 * mm, 14 * mm, PAGE_W - 24 * mm, PAGE_H - 38 * mm, stroke=1, fill=0)
        else:
            # Running header & footer
            canvas.setStrokeColor(accent)
            canvas.setLineWidth(0.7)
            canvas.line(15 * mm, PAGE_H - 13 * mm, PAGE_W - 15 * mm, PAGE_H - 13 * mm)
            canvas.setFillColor(colors.HexColor("#334155"))
            canvas.setFont(FONT_BOLD, 8)
            canvas.drawString(15 * mm, PAGE_H - 10.5 * mm, header_title[:46])
            canvas.drawRightString(PAGE_W - 15 * mm, PAGE_H - 10.5 * mm, badge_text)

        canvas.setFillColor(colors.HexColor("#64748B"))
        canvas.setFont(FONT_REG, 8)
        canvas.drawCentredString(PAGE_W / 2, 8.5 * mm, f"— {pno} —  マナトビ 高校入試")
        canvas.restoreState()

    return decorate


REGION_COLORS = {
    "北海道・東北": "#1D4ED8",
    "関東": "#0F766E",
    "中部・東海・北陸": "#7C3AED",
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


def format_question_block(q_num: int, q: dict, styles: dict):
    elems = []
    rate_txt = f"（全国正答率目安 {q.get('rate', 70)}%・{clean_tex(q.get('skill') or q.get('category') or '')}）"
    elems.append(Paragraph(f"問{q_num}　{clean_tex(q['prompt'])} <font size='7.5' color='#64748B'>{rate_txt}</font>", styles["q_prompt"]))
    opts = q.get("optionTexts") or q.get("options") or []
    if opts and q.get("type") != "short_answer":
        labels = ["ア", "イ", "ウ", "エ", "オ"]
        for i, opt in enumerate(opts[:4]):
            lbl = labels[i] if i < len(labels) else str(i + 1)
            elems.append(Paragraph(f"{lbl}．{clean_tex(opt)}", styles["choice"]))
    else:
        elems.append(Paragraph("【記述・短答欄】＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿", styles["choice"]))
    elems.append(Spacer(1, 2 * mm))
    return KeepTogether(elems)


def correct_label_of(q: dict) -> str:
    opts = q.get("optionTexts") or q.get("options") or []
    ca = str(q.get("correctAnswer") or "")
    if opts and q.get("type") != "short_answer":
        labels = ["ア", "イ", "ウ", "エ"]
        # correctAnswer in buildChapter is '1'..'4' or option string
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
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=22 * mm,
        bottomMargin=16 * mm,
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

    # 1. Cover thumbnail (page 0) -> 320px wide WebP
    p0 = doc[0]
    pix = p0.get_pixmap(matrix=fitz.Matrix(1.2, 1.2), alpha=False)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    w_target = 320
    h_target = round(img.height * (w_target / img.width))
    thumb_img = img.resize((w_target, h_target), Image.Resampling.LANCZOS)
    thumb_out = THUMBS_DIR / f"{item_id}.webp"
    thumb_img.save(str(thumb_out), "WEBP", quality=82)

    preview_urls = []
    if make_preview and pages >= 2:
        # Pick problem page (page 2 = idx 1) and answer/explanation start page
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
            # Crop top 62% and blur lower 45% of that crop ("上半分だけ・下はぼかし")
            crop_h = round(ph * 0.62)
            cropped = im.crop((0, 0, pw, crop_h))
            blur_top = round(crop_h * 0.52)
            lower = cropped.crop((0, blur_top, pw, crop_h)).filter(ImageFilter.GaussianBlur(radius=9))
            cropped.paste(lower, (0, blur_top))
            # Soft white fade at bottom
            overlay = Image.new("RGBA", (pw, crop_h), (255, 255, 255, 0))
            draw = ImageDraw.Draw(overlay)
            for y in range(blur_top, crop_h):
                alpha = int(185 * ((y - blur_top) / max(1, crop_h - blur_top)))
                draw.line([(0, y), (pw, y)], fill=(248, 250, 252, alpha))
            merged = Image.alpha_composite(cropped.convert("RGBA"), overlay).convert("RGB")
            pno = p_idx + 1
            prev_file = PREVIEWS_DIR / f"{item_id}_p{pno}.webp"
            merged.save(str(prev_file), "WEBP", quality=80)
            preview_urls.append(f"/prints/previews/{item_id}_p{pno}.webp")

    doc.close()
    return pages, kb, preview_urls


def build_prefecture_pdf(pref: dict, subjects_map: dict, writing_tasks: list):
    pref_id = pref["id"]
    pref_name = pref["name"]
    region = pref["region"]
    accent = REGION_COLORS.get(region, "#1E40AF")
    styles = make_styles(accent)
    item_id = f"print_lr_pref_{pref_id}"
    pdf_path = OUT_DIR / f"{item_id}.pdf"

    # Build chapter lookup across all 5 subjects
    ch_by_id = {}
    all_q_by_subj = {}
    for sk, sdata in subjects_map.items():
        all_q = []
        for ch in sdata["chapters"]:
            ch_by_id[ch["id"]] = ch
            all_q.extend(ch["questions"])
        all_q_by_subj[sk] = all_q

    story = []
    # === PAGE 1: COVER & PREFECTURE EXAM GUIDE ===
    story.append(Spacer(1, 3 * mm))
    story.append(Paragraph(f"【LR 都道府県別 入試予想問題】 {region}ブロック ／ 都道府県コード {pref['code']:02d}", styles["kicker"]))
    story.append(Paragraph(f"{pref_name} 公立高校入試<br/>5教科 総合予想問題＆解答・解説", styles["cover_title"]))
    story.append(
        Paragraph(
            f"選抜制度：{clean_tex(pref['examSystemName'])} ｜ 配点：{clean_tex(pref['scoreSummary'])}<br/>"
            f"試験時間：{clean_tex(pref['timePerSubject'])} ｜ 解答形式：{clean_tex(pref['answerFormat'])}",
            styles["cover_sub"],
        )
    )

    info_rows = [
        ["項目", f"{pref_name} 入試データ・本番対策の急所"],
        ["英語リスニング", clean_tex(pref["listeningDetail"])],
        ["内申点（調査書）", f"{clean_tex(pref['naishinSpan'])} ／ {clean_tex(pref['naishinFormula']['formulaLabel'])}（当日:内申＝{clean_tex(pref['naishinFormula']['typicalRatioLabel'])}）"],
        ["英語外部検定", f"{clean_tex(pref['eikenPolicyType'])}：{clean_tex(pref['eikenDetail'])}"],
        ["自校作成・選択問題", clean_tex(pref["customProblem"])],
        ["代表的な進学校例", clean_tex(pref["representativeSchools"])],
        ["最新制度トピック", clean_tex(pref["recentReform"])],
        ["最大の特色・攻略法", clean_tex(pref["keyFeature"])],
    ]
    tbl_data = [
        [
            Paragraph(f"<b>{r[0]}</b>", styles["small"]),
            Paragraph(r[1], styles["small"]),
        ]
        for r in info_rows
    ]
    t = Table(tbl_data, colWidths=[34 * mm, 142 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor(accent)),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("BACKGROUND", (0, 1), (0, -1), colors.HexColor("#F1F5F9")),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 3.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("■ 5教科別 出題傾向サマリー（解く前の時間配分チェック）", styles["h2"]))
    trends = pref.get("subjectTrends", {})
    for sk in ["english", "math", "japanese", "science", "social"]:
        story.append(
            Paragraph(
                f"・<b>【{SUBJECT_NAMES_JA[sk]}】</b> {clean_tex(trends.get(sk, ''))}",
                styles["small"],
            )
        )

    story.append(
        Paragraph(
            f"※本冊子は{pref_name}教育委員会の公表要項・出題傾向を分析してマナトビ高校入試編集部が独自に制作した書き下ろし予想問題であり、{pref_name}の公式過去問ではありません。",
            styles["disclaimer"],
        )
    )
    story.append(PageBreak())

    # Select 4 high-yield questions per subject (total 20 questions + 1 prefecture-matched English Writing task)
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

    # Pick 1 writing task tailored to this prefecture
    wt = deterministic_pick(writing_tasks, f"{pref_id}:wt", 1)[0]

    # === PROBLEM PAGES ===
    for idx_s, sk in enumerate(["english", "math", "japanese", "science", "social"], start=1):
        sname = SUBJECT_NAMES_JA[sk]
        story.append(
            Paragraph(
                f"第{idx_s}部　{pref_name}予想問題【{sname}】（目標時間 15分 ／ 各5点×4問＝20点）",
                styles["h1"],
            )
        )
        story.append(
            Paragraph(
                f"<b>{pref_name}の{sname}対策ポイント：</b>{clean_tex(trends.get(sk, ''))}",
                styles["small"],
            )
        )
        for q_i, q in enumerate(selected_by_subj[sk], start=1):
            story.append(format_question_block(q_i, q, styles))

        if sk == "english":
            story.append(
                KeepTogether(
                    [
                        Paragraph(
                            f"【実戦英作文（＋5点）】次の条件にしたがって英語で書きなさい。（目安：{wt.get('minWords',15)}〜{wt.get('maxWords',35)}語）",
                            styles["q_prompt"],
                        ),
                        Paragraph(clean_tex(wt.get("promptJa", "")), styles["body"]),
                        Paragraph("英文記入欄：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿", styles["choice"]),
                        Paragraph("　　　　　　＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿", styles["choice"]),
                    ]
                )
            )
        if idx_s in (2, 4, 5):
            story.append(PageBreak())

    # === ANSWER SHEET & DETAILED EXPLANATIONS ===
    story.append(Paragraph(f"{pref_name} 公立高校入試予想問題｜模範解答・採点基準・詳しい解説", styles["h1"]))
    ans_summary_rows = [["教科", "問1", "問2", "問3", "問4", "配点"]]
    for sk in ["english", "math", "japanese", "science", "social"]:
        qs = selected_by_subj[sk]
        ans_summary_rows.append(
            [
                SUBJECT_NAMES_JA[sk],
                correct_label_of(qs[0])[:14],
                correct_label_of(qs[1])[:14],
                correct_label_of(qs[2])[:14],
                correct_label_of(qs[3])[:14],
                "25点" if sk == "english" else "20点",
            ]
        )
    ans_tbl = Table(
        [[Paragraph(f"<b>{c}</b>" if r_i == 0 else c, styles["small"]) for c in row] for r_i, row in enumerate(ans_summary_rows)],
        colWidths=[20 * mm, 34 * mm, 34 * mm, 34 * mm, 34 * mm, 20 * mm],
    )
    ans_tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0F172A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                ("BACKGROUND", (0, 1), (0, -1), colors.HexColor("#F8FAFC")),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    story.append(ans_tbl)
    story.append(Spacer(1, 4 * mm))

    for sk in ["english", "math", "japanese", "science", "social"]:
        sname = SUBJECT_NAMES_JA[sk]
        story.append(Paragraph(f"◆ 【{sname}】 1問ずつの解法プロセス＆誤答の罠", styles["h2"]))
        for q_i, q in enumerate(selected_by_subj[sk], start=1):
            exp = clean_tex(q.get("oneLine") or q.get("explanation") or "")
            detail = clean_tex(q.get("explanation") or "")
            if detail and detail != exp:
                exp = f"{exp}<br/><font color='#334155'>{detail[:240]}</font>"
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
                        Paragraph(f"【実戦英作文 模範解答例】 {model_en}", styles["ans"]),
                        Paragraph(clean_tex("減点ゼロのポイント：主語と時制の一致、語数条件のクリア、理由を because / to 不定詞で明確に続けること。"), styles["small"]),
                    ]
                )
            )

    story.append(
        Paragraph(
            f"発行：マナトビ 高校入試編集部 ／ 本プリントは{pref_name}の過去問・公式問題ではなく、学習用のオリジナル予想問題です。",
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
        "label": f"{pref_name} 公立高校入試 5教科予想問題＆詳しい解説（{pref['answerFormat']}・内申/傾向つき）",
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
        Spacer(1, 4 * mm),
        Paragraph(f"【LR 全国公立高校入試 5教科総合模試】 第{round_no}回（100点×5教科圧縮実戦＝125点満点）", styles["kicker"]),
        Paragraph(f"全国公立高校入試 5教科総合予想模試 第{round_no}回<br/>（問題編 ＋ 解答・解説編）", styles["cover_title"]),
        Paragraph(f"回のテーマ：{themes[round_no - 1]}", styles["cover_sub"]),
        Paragraph(
            "・本番と同じ「英・数・国・理・社」の5教科通し演習ができる総合予想模試です。<br/>"
            "・第1回はガチャで当てる前でもアプリ内の「全文を見る」から全ページ無料で試し読みできます！<br/>"
            "・各問に全国正答率の目安と「なぜ他が誤りか」「スタフリ流の時短解法」を完備しています。",
            styles["body"],
        ),
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
            story.append(format_question_block(q_i, q, styles))
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


def render_summary_sheets_book(item_id: str, label: str, subj_code: str, subtitle: str, sheets: list, accent: str, category: str = "完全版", make_preview: bool = True):
    pdf_path = OUT_DIR / f"{item_id}.pdf"
    styles = make_styles(accent)
    badge = "UR｜完全版の本" if category == "完全版" else "SR｜学習プリント"

    story = [
        Spacer(1, 4 * mm),
        Paragraph(f"【{badge}】 マナトビ高校入試 赤シート＆要点総整理シリーズ", styles["kicker"]),
        Paragraph(clean_tex(label), styles["cover_title"]),
        Paragraph(clean_tex(subtitle), styles["cover_sub"]),
        Paragraph("■ 収録シート目次（この1冊で入試直前の総復習が完結します）", styles["h2"]),
    ]
    for idx, sh in enumerate(sheets, start=1):
        story.append(Paragraph(f"第{idx}章　{clean_tex(sh['title'])} — <font color='#64748B'>{clean_tex(sh.get('subtitle',''))}</font>", styles["small"]))
    story.append(PageBreak())

    for idx, sh in enumerate(sheets, start=1):
        story.append(Paragraph(f"第{idx}章　{clean_tex(sh['title'])}", styles["h1"]))
        if sh.get("subtitle"):
            story.append(Paragraph(clean_tex(sh["subtitle"]), styles["small"]))
        for it in sh.get("items", []):
            story.append(
                KeepTogether(
                    [
                        Paragraph(f"● {clean_tex(it['heading'])}", styles["h2"]),
                        Paragraph(clean_tex(it.get("body") or it.get("point") or ""), styles["body"]),
                        *(
                            [Paragraph(f"【入試急所】 {clean_tex(it['tip'])}", styles["small"])]
                            if it.get("tip")
                            else []
                        ),
                    ]
                )
            )
            if it.get("table"):
                tb = it["table"]
                rows = [tb["headers"]] + tb["rows"]
                col_cnt = max(1, len(tb["headers"]))
                cw = (176 * mm) / col_cnt
                t = Table(
                    [[Paragraph(f"<b>{clean_tex(c)}</b>" if r_i == 0 else clean_tex(c), styles["small"]) for c in row] for r_i, row in enumerate(rows)],
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


def render_chapter_drill_pdf(item_id: str, label: str, subj_code: str, chapters: list, accent: str, category: str = "演習プリント", make_preview: bool = False):
    pdf_path = OUT_DIR / f"{item_id}.pdf"
    styles = make_styles(accent)
    badge = "UR｜完全版の本" if category == "完全版" else f"SR｜{category}"

    qs = []
    for ch in chapters:
        qs.extend(ch["questions"])
    qs = qs[:14]

    story = [
        Spacer(1, 4 * mm),
        Paragraph(f"【{badge}】 マナトビ高校入試 分野別集中攻略シリーズ", styles["kicker"]),
        Paragraph(clean_tex(label), styles["cover_title"]),
        Paragraph("収録単元：" + " ／ ".join(clean_tex(ch["abstractTitle"]) for ch in chapters), styles["cover_sub"]),
        Paragraph(f"全{len(qs)}問収録（問題編＋模範解答・1行核心解説つき）。印刷してノートやタブレットで反復演習できます。", styles["body"]),
        Spacer(1, 3 * mm),
        Paragraph("■ 問題編", styles["h1"]),
    ]
    for i, q in enumerate(qs, start=1):
        story.append(format_question_block(i, q, styles))

    story.append(PageBreak())
    story.append(Paragraph("■ 模範解答・スピード解説編", styles["h1"]))
    for i, q in enumerate(qs, start=1):
        story.append(
            KeepTogether(
                [
                    Paragraph(f"問{i}　正解：{correct_label_of(q)}", styles["ans"]),
                    Paragraph(clean_tex(q.get("oneLine") or q.get("explanation") or ""), styles["small"]),
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

    # 1. 47 Prefectures LR PDFs
    print("Building 47 prefecture LR PDFs...")
    pref_prints = []
    for pref in prefectures:
        meta = build_prefecture_pdf(pref, subjects_map, writing_tasks)
        all_previews[meta["id"]] = meta.pop("previews")
        pref_prints.append(meta)

    # 2. 3 National 5-Subject Mock Exam LR PDFs
    print("Building 3 national mock LR PDFs...")
    nat_mock_prints = []
    for rno in (1, 2, 3):
        meta = build_national_mock_pdf(rno, subjects_map, writing_tasks)
        all_previews[meta["id"]] = meta.pop("previews")
        nat_mock_prints.append(meta)

    # 3. 10 UR Complete Books (category='完全版', shown in UR pickup with previews!)
    print("Building 10 UR Complete Books...")
    ur_books = []
    ur_specs = [
        ("print_ur_juken_en_complete", "高校入試 英語 完全攻略バイブル（中学全英文法・長文・リスニング総整理）", "english", "時制・助動詞・不定詞・関係代名詞から長文対話・リスニング鉄則まで全7章完全網羅", sheets_by_subj["english"], "#2563EB"),
        ("print_ur_juken_ma_complete", "高校入試 数学 完全攻略バイブル（計算・連立8型・関数・図形・スタフリ裏ワザ全集）", "math", "平方根nの4パターン・連立方程式全8型・関数交点公式・円周角と三平方・作図まで全7章完全網羅", sheets_by_subj["math"], "#1D4ED8"),
        ("print_ur_juken_ja_complete", "高校入試 国語 完全攻略バイブル（国文法・語彙慣用句・韻文・古文漢文・読解作文）", "japanese", "品詞識別・敬語・四字熟語・短歌俳句の季語と表現技法・歴史的仮名遣い・返り点まで全6章完全網羅", sheets_by_subj["japanese"], "#BE123C"),
        ("print_ur_juken_sc_complete", "高校入試 理科 最終総まとめ完全版（全35講：物理・化学・生物・地学＋計算裏ワザ）", "science", "光音力・電流磁界・気体水溶液・化学変化イオン・動植物分類と遺伝・天気地震天体まで全12章完全網羅", sheets_by_subj["science"], "#047857"),
        ("print_ur_juken_so_geo_complete", "高校入試 社会【地理】完全版（世界6州・日本7地方・重要統計資料①②総整理）", "social", "世界の気候宗教・6州地誌・日本の工業農業ランキング・地形図縮尺まで全7章完全網羅", [s for s in sheets_by_subj["social"] if "地理" in s.get("group", "")], "#B45309"),
        ("print_ur_juken_so_hist_civ_complete", "高校入試 社会【歴史・公民】完全版（旧石器〜現代戦後史＆憲法・三権分立・経済・国際）", "social", "時代横断テーマ史・外交文化史・日本国憲法・国会内閣裁判所・直接請求権・税と国連まで全7章完全網羅", [s for s in sheets_by_subj["social"] if "地理" not in s.get("group", "")], "#7C2D12"),
    ]
    for iid, lbl, scode, sub, sh_list, col in ur_specs:
        meta = render_summary_sheets_book(iid, lbl, scode, sub, sh_list, col, category="完全版", make_preview=True)
        all_previews[meta["id"]] = meta.pop("previews")
        ur_books.append(meta)

    # 4 more UR Complete Drill Books (English Writing Complete + Math High-Speed Complete + Science Lab Complete + 47-Prefecture Guide Complete)
    # Writing Complete Book
    wt_story_styles = make_styles("#1E40AF")
    wt_id = "print_ur_juken_writing_complete"
    wt_path = OUT_DIR / f"{wt_id}.pdf"
    wt_story = [
        Spacer(1, 4 * mm),
        Paragraph("【UR｜完全版の本】 英作文対策プリント完全準拠", wt_story_styles["kicker"]),
        Paragraph("高校入試 英作文 完全制覇ブック（黄金の型21＋ドリル＋直前模試全27題）", wt_story_styles["cover_title"]),
        Paragraph("2文・3文条件英作、Eメール返信、意見＋理由2つ、グラフ読み取り英作まで模範解答つきで1冊に凝縮！", wt_story_styles["cover_sub"]),
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
        ("print_ur_juken_ma_drill_all", "高校入試 数学 頻出パターン厳選演習ブック（関数・相似三平方・確率データ完全版）", "math", subjects_map["math"]["chapters"][4:], "#1E3A8A"),
        ("print_ur_juken_sc_drill_all", "高校入試 理科 実験・観察・計算問題 完全演習ブック（全分野厳選）", "science", subjects_map["science"]["chapters"][:6], "#065F46"),
        ("print_ur_juken_so_drill_all", "高校入試 社会 統計・年表・記述 完全演習ブック（地理・歴史・公民横断）", "social", subjects_map["social"]["chapters"][:6], "#9A3412"),
    ]
    for iid, lbl, scode, chs, col in extra_ur_drills:
        meta = render_chapter_drill_pdf(iid, lbl, scode, chs, col, category="完全版", make_preview=True)
        all_previews[meta["id"]] = meta.pop("previews")
        ur_books.append(meta)

    # 4. 15 SR Unit & Trend Prints (category='演習プリント' or '出題傾向')
    print("Building 15 SR Unit & Trend Prints...")
    sr_prints = []
    sr_specs = [
        ("print_sr_juken_en_grammar", "英文法 小問・整序 集中演習プリント（時制・助動詞・不定詞・動名詞）", "english", subjects_map["english"]["chapters"][:3], "#2563EB", "演習プリント"),
        ("print_sr_juken_en_rc", "中学3年最重要文法＆長文・対話文 読解演習プリント（分詞・関係代名詞・図表読解）", "english", subjects_map["english"]["chapters"][3:7], "#1D4ED8", "演習プリント"),
        ("print_sr_juken_en_trend", "公立高校入試 英語リスニング・条件英作文 出題傾向＆即効対策レポート", "english", subjects_map["english"]["chapters"][6:], "#0284C7", "出題傾向"),
        ("print_sr_juken_ma_algebra", "直前数学対策 大問1・連立方程式8パターン 完全攻略プリント", "math", subjects_map["math"]["chapters"][:3], "#4338CA", "演習プリント"),
        ("print_sr_juken_ma_func", "高校入試 数学 一次関数ダイヤグラム・関数y=ax² 集中演習プリント", "math", subjects_map["math"]["chapters"][3:6], "#3730A3", "演習プリント"),
        ("print_sr_juken_ma_geom", "高校入試 数学 円周角・相似・三平方・空間図形・作図 集中演習プリント", "math", subjects_map["math"]["chapters"][6:10], "#1E40AF", "演習プリント"),
        ("print_sr_juken_ma_data", "高校入試 数学 確率・箱ひげ図・標本調査 出題傾向＆即演習プリント", "math", subjects_map["math"]["chapters"][10:], "#6D28D9", "出題傾向"),
        ("print_sr_juken_ja_kotoba", "高校入試 国語 漢字・同訓異字・四字熟語・国文法（品詞・敬語）演習プリント", "japanese", subjects_map["japanese"]["chapters"][:3], "#BE123C", "演習プリント"),
        ("print_sr_juken_ja_reading", "高校入試 国語 論説文・小説・韻文（短歌/俳句/詩）読解＆記述プリント", "japanese", subjects_map["japanese"]["chapters"][3:6], "#9F1239", "演習プリント"),
        ("print_sr_juken_ja_koten", "高校入試 国語 古文・漢文（歴史的仮名遣い・係り結び・返り点）出題傾向＆演習", "japanese", subjects_map["japanese"]["chapters"][6:], "#881337", "出題傾向"),
        ("print_sr_juken_sc_phys_chem", "高校入試 理科 物理・化学（オームの法則・凸レンズ・気体・化学反応とイオン）演習プリント", "science", subjects_map["science"]["chapters"][:6], "#047857", "演習プリント"),
        ("print_sr_juken_sc_bio_earth", "高校入試 理科 生物・地学（光合成・遺伝・天気湿度・地震・天体金星）演習プリント", "science", subjects_map["science"]["chapters"][6:], "#0F766E", "演習プリント"),
        ("print_sr_juken_so_geo", "高校入試 社会 世界地理・日本地理・地形図と雨温図 集中演習プリント", "social", subjects_map["social"]["chapters"][:4], "#B45309", "演習プリント"),
        ("print_sr_juken_so_hist", "高校入試 社会 日本史通史・時代並べ替え・外交文化テーマ史 演習プリント", "social", subjects_map["social"]["chapters"][4:8], "#92400E", "演習プリント"),
        ("print_sr_juken_so_civics", "高校入試 社会 公民（憲法・三権分立・地方自治・経済税制・国際連合）出題傾向＆演習", "social", subjects_map["social"]["chapters"][8:], "#78350F", "出題傾向"),
    ]
    for iid, lbl, scode, chs, col, cat in sr_specs:
        meta = render_chapter_drill_pdf(iid, lbl, scode, chs, col, category=cat, make_preview=False)
        meta.pop("previews", None)
        sr_prints.append(meta)

    # 5. Level-15 Reward Print
    print("Building Level-15 reward print...")
    lv_id = "print_level_juken_howto"
    lv_meta = render_summary_sheets_book(
        lv_id,
        "公立高校入試 5教科 時間配分＆ケアレスミス撲滅ガイド（Lv.15到達特典）",
        "english",
        "本番前日に必ず読む5教科の得点最大化チェックリスト＆スタフリ厳選裏ワザ抜粋",
        [sheets_by_subj["english"][6], sheets_by_subj["math"][0], sheets_by_subj["science"][11]],
        "#7C3AED",
        category="出題傾向",
        make_preview=False,
    )
    lv_meta.pop("previews", None)

    # === WRITE GENERATED TYPESCRIPT MODULES ===
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

    # kyotsuMockPrints.ts -> National 5-Subject Comprehensive Mock Exams (LR for 'kyotsu' pool)
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

    # nijiMockPrints.ts -> 47 Prefectures Public High School Entrance Exam Predicted PDFs (LR for 'niji' & 'univ' pools)
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
 * 1冊＝都道府県別の配点・内申・出題傾向ガイド＋5教科予想問題＋実戦英作文＋模範解答・詳しい解説。
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
