/**
 * 都道府県選択ガチャ（1回500マナコイン）で狙う都道府県を選ぶダイアログ（全国47都道府県対応）。
 *   ・6地方ブロック（北海道・東北／関東／中部・東海・北陸／近畿／中国・四国／九州・沖縄）＋名前検索で素早く絞り込める。
 *   ・各都道府県の予想問題PDFの所持状況もひと目で分かる。
 */
import { useMemo, useState, type RefObject } from 'react';
import { Check, MapPin, Search } from 'lucide-react';
import {
  SELECTABLE_UNIVERSITIES,
  selectableUniversityOf,
  type SelectableUniversity,
} from '../../battle/core/gachaPools';
import { PRINT_SHELVES, type PrintShelfId } from '../../battle/core/printShelves';
import type { GrowthProgress } from '../../battle/core/growth';
import { NIJI_DISCLAIMER } from '../../data/nijiMockPrints';

const REGION_SHELVES = PRINT_SHELVES.filter((s) =>
  ['hokkaido_tohoku', 'kanto', 'chubu', 'kinki', 'chugoku_shikoku', 'kyushu_okinawa'].includes(s.id),
);

export function GachaUniversityModal({
  dialog,
  univId,
  onSelect,
  progress,
}: {
  dialog: RefObject<HTMLDialogElement | null>;
  univId: string;
  onSelect: (univId: string) => void;
  progress: GrowthProgress | null;
}) {
  const current = selectableUniversityOf(univId);
  const [region, setRegion] = useState<PrintShelfId | 'all'>('all');
  const [query, setQuery] = useState('');

  const regionCounts = useMemo(() => {
    const map = new Map<PrintShelfId, number>();
    for (const u of SELECTABLE_UNIVERSITIES) {
      map.set(u.region, (map.get(u.region) ?? 0) + 1);
    }
    return map;
  }, []);

  const filtered: readonly SelectableUniversity[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SELECTABLE_UNIVERSITIES.filter((u) => {
      if (region !== 'all' && u.region !== region) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.label.toLowerCase().includes(q) ||
        u.regionLabel.toLowerCase().includes(q)
      );
    });
  }, [region, query]);

  const choose = (id: string) => {
    onSelect(id);
    dialog.current?.close();
  };

  return (
    <dialog
      ref={dialog}
      className="game-details-dialog mt-dialog"
      aria-labelledby="gacha-univ-title"
      data-gacha-univ-dialog
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <header>
        <h2 id="gacha-univ-title">狙う都道府県を選ぶ（全47都道府県・1回500枚）</h2>
        <button type="button" autoFocus onClick={() => dialog.current?.close()}>
          閉じる
        </button>
      </header>
      <div className="game-details-body gacha-univ-modal">
        <p className="gacha-pickup-lead">
          選んだ都道府県の公立高校入試 5教科予想問題PDFだけが LR 枠で出ます。現在：<b>{current.label}</b>
        </p>

        <label className="gacha-univ-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="都道府県名・地方でさがす（例：三重、東京、近畿）"
            aria-label="都道府県名・地方で検索"
            data-gacha-univ-search
          />
        </label>

        <nav className="gacha-pickup-shelves" aria-label="地方で絞り込む" data-gacha-univ-regions>
          <button
            type="button"
            aria-pressed={region === 'all'}
            onClick={() => setRegion('all')}
            data-univ-region="all"
          >
            すべて<small>{SELECTABLE_UNIVERSITIES.length}</small>
          </button>
          {REGION_SHELVES.map((sh) => (
            <button
              key={sh.id}
              type="button"
              aria-pressed={region === sh.id}
              onClick={() => setRegion(sh.id)}
              data-univ-region={sh.id}
            >
              {sh.label}
              <small>{regionCounts.get(sh.id) ?? 0}</small>
            </button>
          ))}
        </nav>

        {filtered.length === 0 ? (
          <p className="gacha-univ-empty" role="status">
            条件に合う都道府県が見つかりませんでした。別の語や「すべて」をお試しください。
          </p>
        ) : (
          <ul className="gacha-univ-list" aria-label="選択できる都道府県一覧">
            {filtered.map((u) => {
              const ownedCount = u.printIds.filter((pid) => progress?.owned.includes(pid)).length;
              const selected = u.id === current.id;
              return (
                <li key={u.id}>
                  <button
                    type="button"
                    className="gacha-univ-option"
                    aria-pressed={selected}
                    data-gacha-univ-option={u.id}
                    onClick={() => choose(u.id)}
                  >
                    <MapPin size={18} aria-hidden="true" />
                    <span className="gacha-univ-option-body">
                      <strong>
                        {u.name}
                        <small className="gacha-univ-region-tag">{u.regionLabel}</small>
                      </strong>
                      {u.track && <span className="gacha-univ-track">{u.track}</span>}
                    </span>
                    <span className="gacha-univ-owned" data-complete={ownedCount === u.printIds.length || undefined}>
                      {ownedCount > 0 ? '所持済み' : `未所持（${u.printIds.length}冊）`}
                    </span>
                    {selected && <Check size={18} aria-hidden="true" className="gacha-univ-check" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <details className="gacha-pickup-disclaimer">
          <summary>※ 各都道府県の公式過去問ではありません（オリジナル予想問題）</summary>
          <p className="gacha-detail-disclaimer">※ {NIJI_DISCLAIMER}</p>
        </details>
      </div>
    </dialog>
  );
}
