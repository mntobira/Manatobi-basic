import React from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  ChevronLeft,
  Compass,
  FlaskConical,
  Globe2,
  Headphones,
  Leaf,
  PenLine,
  Scale,
  ScrollText,
  Sigma,
  Zap,
} from 'lucide-react';
import { STUDY_CATALOG, findStudySubject, type StudyContent, type StudyIcon, type StudySubject } from '../data/studyCatalog';
import './study-catalog.css';
import { TobiraBuddy } from './TobiraBuddy';
import { KineticText } from '../motion';

/**
 * 演習する（v6 分野別ダイレクト選択＆スマホ極小スクロール版）
 *
 * ■ 改善ポイント
 *   - 理科（生物・物理・化学・地学）、社会（地理・歴史・公民）、数学（数と式・関数・図形・確率データ）、
 *     国語（漢字語彙・口語文法敬語・古文漢文・現代文）、英語（中1-2文法・中3文法・整序対話・長文）を
 *     スマホでも2列コンパクトグリッド（.sc-domain-grid）で表示し、スクロール最小限でやりたい分野へ直行！
 */
export interface StudyProgress {
  solved: number;
  total: number;
}

export interface StudyCatalogProps {
  /** 選んでいる科目（null なら科目選択を表示） */
  subjectId: string | null;
  onSubject: (id: string | null) => void;
  onContent: (content: StudyContent) => void;
  onBack: () => void;
  /** コンテンツごとの進捗（progressSubject をキーに） */
  progressOf?: (progressSubject: string) => StudyProgress | undefined;
  /** 前回開いたコンテンツ（カードに「前回」を付ける） */
  lastContentId?: string | null;
}

const ICONS: Record<StudyIcon, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  headphones: Headphones,
  pen: PenLine,
  book: BookOpen,
  briefcase: Briefcase,
  flask: FlaskConical,
  sigma: Sigma,
  globe: Globe2,
  leaf: Leaf,
  zap: Zap,
  compass: Compass,
  scroll: ScrollText,
  scale: Scale,
  chart: BarChart3,
  letters: () => <span className="sc-letters" aria-hidden="true">Aa</span>,
};

/** 科目カード・通常コンテンツカード共通 */
export function StudyCard({
  icon,
  title,
  description,
  meta,
  progress,
  primary,
  badge,
  onClick,
  dataId,
}: {
  icon: StudyIcon;
  title: string;
  description: string;
  meta?: string;
  progress?: StudyProgress;
  primary?: boolean;
  badge?: string;
  onClick: () => void;
  dataId?: string;
}) {
  const Icon = ICONS[icon];
  const pct = progress && progress.total > 0 ? Math.round((progress.solved / progress.total) * 100) : null;
  return (
    <button type="button" className="sc-card" data-primary={primary || undefined} data-study-card={dataId} onClick={onClick}>
      <span className="sc-icon"><Icon size={22} aria-hidden /></span>
      <span className="sc-body">
        <span className="sc-title">
          <strong>{title}</strong>
          {badge && <em data-badge={badge === 'NEW' ? 'new' : undefined}>{badge}</em>}
        </span>
        <span className="sc-desc">{description}</span>
        {(meta || pct !== null) && (
          <span className="sc-meta">
            {meta && <small>{meta}</small>}
            {pct !== null && (
              <span className="sc-progress" role="progressbar" aria-label={`${title}の進捗`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
                <span className="sc-track"><i style={{ width: `${pct}%` }} /></span>
                <b>{pct}%</b>
              </span>
            )}
          </span>
        )}
      </span>
      <ArrowRight className="sc-arrow" size={18} aria-hidden="true" />
    </button>
  );
}

/** 分野別2列コンパクトカード（スマホでも1画面に4分野がスッキリ収まる設計） */
function DomainTile({
  content,
  progress,
  isLast,
  onClick,
}: {
  content: StudyContent;
  progress?: StudyProgress;
  isLast?: boolean;
  onClick: () => void;
}) {
  const Icon = ICONS[content.icon];
  const pct = progress && progress.total > 0 ? Math.round((progress.solved / progress.total) * 100) : 0;
  const badgeText = isLast ? '前回' : content.badge;
  return (
    <button
      type="button"
      className="sc-domain-card"
      data-study-card={content.id}
      data-last={isLast || undefined}
      style={content.accentColor ? ({ '--sc-accent': content.accentColor } as React.CSSProperties) : undefined}
      onClick={onClick}
    >
      <span className="sc-domain-top">
        <span className="sc-domain-icon"><Icon size={18} aria-hidden /></span>
        {badgeText && <em className="sc-domain-badge" data-last={isLast || undefined}>{badgeText}</em>}
      </span>
      <strong className="sc-domain-title">{content.title}</strong>
      <span className="sc-domain-desc">{content.description}</span>
      <span className="sc-domain-foot">
        <small>{content.meta}</small>
        <span className="sc-domain-bar" aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </span>
        <b>{pct}%</b>
      </span>
    </button>
  );
}

function subjectMeta(s: StudySubject): string {
  const domains = s.contents.filter((c) => c.section === 'domains');
  if (domains.length > 0) {
    return domains.map((d) => d.title).join(' ／ ');
  }
  return s.contents.map((c) => c.title).join('・');
}

export function StudyCatalog({ subjectId, onSubject, onContent, onBack, progressOf, lastContentId }: StudyCatalogProps) {
  const single = STUDY_CATALOG.length === 1 ? STUDY_CATALOG[0] : undefined;
  const subject = single ?? findStudySubject(subjectId);
  const showSubjects = !subject;
  const title = showSubjects ? '科目を選ぶ' : single ? '演習する' : subject.label;
  const sub = showSubjects ? 'スマホでサクサク・分野別に演習' : subject.description;
  const back = showSubjects || single ? onBack : () => onSubject(null);
  const backLabel = showSubjects || single ? 'ホーム' : '科目';

  const domainContents = subject ? subject.contents.filter((c) => c.section === 'domains') : [];
  const practiceContents = subject
    ? subject.contents.filter((c) => !c.section || c.section === 'practice')
    : [];
  const memorizeContents = subject ? subject.contents.filter((c) => c.section === 'memorize') : [];
  const spotlightContents = subject ? subject.contents.filter((c) => c.section === 'spotlight') : [];

  return (
    <main className="sc-page" data-study-catalog={showSubjects ? 'subjects' : 'contents'}>
      <header className="sc-head">
        {!single && (
          <button type="button" className="sc-back" onClick={back} aria-label={`${backLabel}に戻る`}>
            <ChevronLeft size={18} aria-hidden="true" />
            <span>{backLabel}</span>
          </button>
        )}
        <div className="sc-head-title">
          <p className="sc-crumb" aria-label="現在地">
            {single ? (
              <>演習する › <b>{single.label}</b></>
            ) : (
              <>演習する{!showSubjects && <> › <b>{subject.label}</b></>}</>
            )}
          </p>
          <h1><KineticText text={title} /></h1>
          <p>{sub}</p>
        </div>
      </header>

      {!showSubjects && spotlightContents.length > 0 && (
        <div className="sc-buddy-row">
          <TobiraBuddy className="sc-buddy" size="sm" bubble="right" input={{ screen: 'study', seed: new Date().getDate() }} />
          {spotlightContents.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <button
                key={c.id}
                type="button"
                className="sc-spot"
                data-study-card={c.id}
                onClick={() => onContent(c)}
                aria-label={`${c.title} ${c.description}（${c.meta}）を開く`}
              >
                <span className="sc-spot-icon"><Icon size={18} aria-hidden /></span>
                <span className="sc-spot-body">
                  <strong>{c.title}</strong>
                  <small>{c.description}</small>
                </span>
                {c.badge && lastContentId !== c.id && <em data-badge={c.badge === 'NEW' ? 'new' : undefined}>{c.badge}</em>}
                {lastContentId === c.id && <em>前回</em>}
              </button>
            );
          })}
        </div>
      )}

      <div className="sc-list" role="list">
        {showSubjects ? (
          <div className="sc-subject-grid">
            {STUDY_CATALOG.map((s) => (
              <div role="listitem" key={s.id}>
                <StudyCard
                  dataId={s.id}
                  icon={s.icon}
                  title={s.label}
                  description={s.description}
                  meta={subjectMeta(s)}
                  progress={progressOf?.(s.id)}
                  onClick={() => onSubject(s.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            {domainContents.length > 0 && (
              <>
                <h2 className="sc-section" role="presentation" data-study-section="domains">
                  分野を選んで演習（1セット5問〜）
                </h2>
                <div className="sc-domain-grid" data-count={domainContents.length}>
                  {domainContents.map((c) => (
                    <DomainTile
                      key={c.id}
                      content={c}
                      isLast={lastContentId === c.id}
                      progress={c.progressSubject ? progressOf?.(c.progressSubject) : undefined}
                      onClick={() => onContent(c)}
                    />
                  ))}
                </div>
              </>
            )}

            {practiceContents.length > 0 && (
              <>
                <h2 className="sc-section" role="presentation" data-study-section="practice">
                  スピード点検・特訓モード
                </h2>
                {practiceContents.map((c) => (
                  <div role="listitem" key={c.id}>
                    <StudyCard
                      dataId={c.id}
                      icon={c.icon}
                      title={c.title}
                      description={c.description}
                      meta={c.meta}
                      primary={c.primary}
                      badge={lastContentId === c.id ? '前回' : c.badge}
                      progress={c.progressSubject ? progressOf?.(c.progressSubject) : undefined}
                      onClick={() => onContent(c)}
                    />
                  </div>
                ))}
              </>
            )}

            {memorizeContents.length > 0 && (
              <>
                <h2 className="sc-section" role="presentation" data-study-section="memorize">
                  1画面赤シートで覚える
                </h2>
                {memorizeContents.map((c) => (
                  <div role="listitem" key={c.id}>
                    <StudyCard
                      dataId={c.id}
                      icon={c.icon}
                      title={c.title}
                      description={c.description}
                      meta={c.meta}
                      badge={lastContentId === c.id ? '前回' : c.badge}
                      onClick={() => onContent(c)}
                    />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
