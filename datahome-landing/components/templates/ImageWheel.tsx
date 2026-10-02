'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { templates, templateCopy, type Template, type TemplateLocale, type TemplateTier } from '@/lib/marketing/templates';
import s from './ImageWheel.module.css';

// Replace the returnTo param with the canonical marketing templates URL so the
// preview bar's "Back to templates" button returns to data-home.app, not the cockpit.
// The preview frame (datahome-clean) whitelists only https://data-home.app/<locale>/templates.
const MARKETING_ORIGIN = "https://data-home.app";
function withMarketingReturnTo(url: string, locale: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('returnTo', `${MARKETING_ORIGIN}/${locale}/templates`);
    return parsed.toString();
  } catch {
    return url;
  }
}

function circularOffset(itemIndex: number, selectedIndex: number, length: number) {
  let offset = itemIndex - selectedIndex;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export function ImageWheel({
  locale,
  items = templates,
}: {
  locale: TemplateLocale;
  items?: readonly Template[];
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const copy = templateCopy[locale];
  const initialId = params?.get('template');
  const initialTemplate = items.find((item) => item.id === initialId) ?? items[0];
  const [selectedId, setSelectedId] = useState(initialTemplate.id);
  const [filter, setFilter] = useState<'all' | TemplateTier>('all');
  const filteredItems = useMemo(
    () => filter === 'all' ? items : items.filter((item) => item.tier === filter),
    [filter, items],
  );
  const selectedIndex = Math.max(0, filteredItems.findIndex((item) => item.id === selectedId));
  const selected = filteredItems[selectedIndex];
  const wheelRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = useCallback((id: string, scroll = true) => {
    if (!filteredItems.some((item) => item.id === id)) return;
    setSelectedId(id);
    const next = new URLSearchParams(params?.toString() ?? '');
    next.set('template', id);
    window.history.replaceState(null, '', pathname + '?' + next.toString());
    if (scroll && window.matchMedia('(max-width: 600px)').matches) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      requestAnimationFrame(() => {
        wheelRef.current?.querySelector<HTMLElement>(`[data-template-id="${id}"]`)
          ?.scrollIntoView({ behavior, block: 'nearest', inline: 'center' });
      });
    }
  }, [filteredItems, params, pathname]);

  const move = useCallback((delta: number) => {
    update(filteredItems[(selectedIndex + delta + filteredItems.length) % filteredItems.length].id);
  }, [filteredItems, selectedIndex, update]);

  useEffect(() => {
    const syncFromHistory = () => {
      const requested = new URLSearchParams(window.location.search).get('template');
      if (requested && filteredItems.some((item) => item.id === requested)) setSelectedId(requested);
    };
    window.addEventListener('popstate', syncFromHistory);
    return () => window.removeEventListener('popstate', syncFromHistory);
  }, [filteredItems]);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 600px)').matches) return;
    wheelRef.current?.querySelector<HTMLElement>(`[data-template-id="${selected.id}"]`)
      ?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
  }, [selected.id]);

  function selectNearestMobileCard() {
    const wheel = wheelRef.current;
    if (!wheel || !window.matchMedia('(max-width: 600px)').matches) return;
    const center = wheel.getBoundingClientRect().left + wheel.clientWidth / 2;
    const cards = Array.from(wheel.querySelectorAll<HTMLElement>('[data-template-id]'));
    const nearest = cards.reduce((best, card) => {
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - center);
      return distance < best.distance ? { card, distance } : best;
    }, { card: cards[0], distance: Number.POSITIVE_INFINITY });
    const id = nearest.card?.dataset.templateId;
    if (id && id !== selected.id) update(id, false);
  }

  function handleScroll() {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(selectNearestMobileCard, 100);
  }

  function changeFilter(nextFilter: 'all' | TemplateTier) {
    setFilter(nextFilter);
    const nextItems = nextFilter === 'all' ? items : items.filter((item) => item.tier === nextFilter);
    if (nextItems.some((item) => item.id === selectedId)) return;
    const nextId = nextItems[0].id;
    setSelectedId(nextId);
    const next = new URLSearchParams(params?.toString() ?? '');
    next.set('template', nextId);
    window.history.replaceState(null, '', pathname + '?' + next.toString());
  }

  return (
    <div className={s.page}>
      <header className={s.intro}>
        <p className={s.eyebrow}>{copy.eyebrow}</p>
        <h1>{copy.title.split('\n').map((line, index) => <span key={line} className={index ? s.muted : undefined}>{line}</span>)}</h1>
        <p className={s.lead}>{copy.intro}</p>
      </header>

      <section className={s.experience} aria-label={copy.browse}>
        <div className={s.toolbar}>
          <p>{copy.includedCollection}</p>
          <div className={s.catalogueNav}>
            <div className={s.filters} aria-label={copy.collection}>
              {(['all', 'included', 'premium'] as const).map((value) => (
                <button type="button" key={value} aria-pressed={filter === value} onClick={() => changeFilter(value)}>
                  {copy[value]}
                </button>
              ))}
            </div>
            <span className={s.counter}>{String(selectedIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div
          ref={wheelRef}
          className={s.wheel}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={copy.browse}
          onScroll={handleScroll}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              move(event.key === 'ArrowRight' ? 1 : -1);
            }
            if (event.key === 'Home' || event.key === 'End') {
              event.preventDefault();
              update(filteredItems[event.key === 'Home' ? 0 : filteredItems.length - 1].id);
            }
          }}
          onPointerDown={(event) => { pointer.current = { x: event.clientX, y: event.clientY }; suppressClick.current = false; }}
          onPointerUp={(event) => {
            const start = pointer.current;
            pointer.current = null;
            if (start && !window.matchMedia('(max-width: 600px)').matches && Math.abs(event.clientX - start.x) > 45 && Math.abs(event.clientX - start.x) > Math.abs(event.clientY - start.y)) {
              suppressClick.current = true;
              move(event.clientX < start.x ? 1 : -1);
            }
          }}
          onPointerCancel={() => { pointer.current = null; }}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          {filteredItems.map((item, itemIndex) => {
            const offset = circularOffset(itemIndex, selectedIndex, filteredItems.length);
            const visible = Math.abs(offset) <= 2;
            return (
              <button
                type="button"
                key={item.id}
                className={s.card}
                data-offset={offset}
                data-hidden={!visible}
                data-template-id={item.id}
                aria-label={item.name}
                aria-pressed={item.id === selected.id}
                onClick={() => update(item.id)}
              >
                <Image src={item.thumbnail} alt={`${copy.preview} — ${item.name}`} width={640} height={448} sizes="(max-width: 600px) 280px, 650px" draggable={false} loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'} />
                <span className={s.cardCaption}><strong>{item.name}</strong><span>{copy[item.tier]}</span></span>
              </button>
            );
          })}
        </div>

        <div className={s.controls}>
          <p><span className={s.desktopHint}>Drag or use arrow keys to explore.</span><span className={s.mobileHint}>Swipe to explore.</span></p>
          <div><button type="button" aria-label={copy.previous} onClick={() => move(-1)}>←</button><button type="button" aria-label={copy.next} onClick={() => move(1)}>→</button></div>
        </div>

        <article className={s.details} aria-live="polite" aria-atomic="true">
          <div className={s.detailHeader}>
            <div><p className={s.eyebrow}>{copy[selected.tier]}</p><h2>{selected.name}</h2></div>
            <p className={s.description}>{selected.description[locale]}</p>
            <a className={s.live} href={withMarketingReturnTo(selected.livePreviewUrl, locale)} target="_blank" rel="noopener noreferrer" aria-label={`${copy.live} — ${selected.name}. ${copy.external}`}>{copy.live} <span aria-hidden="true">↗</span></a>
          </div>
          <div className={s.selectedPreview}>
            <Image key={selected.desktopPreview} src={selected.desktopPreview} alt={`${copy.preview} — ${selected.name}`} width={selected.width} height={selected.height} sizes="(max-width: 900px) calc(100vw - 40px), 1220px" loading="eager" />
          </div>
        </article>

        <div className={s.index}>
          <label htmlFor="template-select">{copy.choose}</label>
          <select id="template-select" value={selected.id} onChange={(event) => update(event.target.value)}>
            {filteredItems.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>
      </section>
    </div>
  );
}
