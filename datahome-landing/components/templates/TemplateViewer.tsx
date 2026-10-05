'use client';

import { useEffect, useRef, useState } from 'react';
import type { Template } from '@/lib/marketing/templates';
import s from './TemplateViewer.module.css';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

// Logical viewport widths the embedded template is rendered at. Real
// breakpoints inside the iframe react to these (it's a genuine browsing
// context, not a visual simulation).
const DEVICE_WIDTH: Record<DeviceMode, number> = {
  desktop: 1440,
  tablet: 820,
  mobile: 390,
};

// Real device viewport heights — not a content-length guess. The iframe's
// CSS height IS its internal 100vh, so this must match an actual screen for
// vh-based hero sizing (h-[85vh], 100vh, etc.) to render at the proportions
// the template was designed for. The stage scrolls to reveal content below
// the fold, exactly as it would on a real device of this class.
const DEVICE_HEIGHT: Record<DeviceMode, number> = {
  desktop: 900,
  tablet: 1180,
  mobile: 844,
};

const DEVICE_LABEL: Record<DeviceMode, string> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
};

function initialModeForViewport(): DeviceMode {
  if (typeof window === 'undefined') return 'desktop';
  const w = window.innerWidth;
  if (w >= 1024) return 'desktop';
  if (w >= 768) return 'tablet';
  return 'mobile';
}

// datahome-clean's production origin — the fallback used whenever
// NEXT_PUBLIC_DATAHOME_CLEAN_ORIGIN isn't set (i.e. always in production,
// since that variable is only ever defined in local .env.local).
const DATAHOME_CLEAN_PRODUCTION_ORIGIN = 'https://datahome.vercel.app';

// Resolve the iframe src for a template's live preview: swap the origin for
// the local datahome-clean dev server when NEXT_PUBLIC_DATAHOME_CLEAN_ORIGIN
// is set, otherwise keep the production origin baked into templates.json.
// The pathname (and any existing query params) from livePreviewUrl is kept
// as-is — only the origin changes and `embed=1` is enforced, both via
// URL/URLSearchParams rather than string concatenation.
function resolveEmbedSrc(livePreviewUrl: string): string {
  const source = new URL(livePreviewUrl);
  const origin = process.env.NEXT_PUBLIC_DATAHOME_CLEAN_ORIGIN || DATAHOME_CLEAN_PRODUCTION_ORIGIN;
  const resolved = new URL(source.pathname + source.search, origin);
  resolved.searchParams.set('embed', '1');
  return resolved.toString();
}

export function TemplateViewer({
  template,
  onClose,
}: {
  template: Template;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<DeviceMode>(initialModeForViewport);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const targetWidth = DEVICE_WIDTH[mode];
  const targetHeight = DEVICE_HEIGHT[mode];
  const embedSrc = resolveEmbedSrc(template.livePreviewUrl);

  // Lock background scroll while the viewer is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Close on Escape; focus the close button on open for keyboard users.
  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Recompute the fit-to-container scale whenever the mode or the
  // available stage width changes (host viewport resize included).
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => {
      const stylePadding = parseFloat(getComputedStyle(stage).paddingLeft) + parseFloat(getComputedStyle(stage).paddingRight);
      const available = stage.clientWidth - stylePadding;
      setScale(Math.min(1, available / targetWidth));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [targetWidth]);

  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={`DATAhome preview — ${template.name}`}>
      <div className={s.header}>
        <div className={s.brand}>
          <span className={s.brandMark}>DATAhome</span>
          <span className={s.brandDivider} aria-hidden="true" />
          <span className={s.badge}>Preview</span>
          <span className={s.templateName}>{template.name}</span>
        </div>

        <div className={s.devices} role="group" aria-label="Preview size">
          {(['desktop', 'tablet', 'mobile'] as const).map((value) => (
            <button
              key={value}
              type="button"
              className={s.deviceButton}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {DEVICE_LABEL[value]}
            </button>
          ))}
        </div>

        <button type="button" ref={closeRef} className={s.close} onClick={onClose} aria-label="Close preview, back to templates">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className={s.stage} ref={stageRef}>
        {/* Outer box already sized to the POST-scale footprint, so the
            stage can center it with plain flex layout. */}
        <div className={s.frameBox} style={{ width: targetWidth * scale, height: targetHeight * scale }}>
          <div
            className={s.frameShell}
            style={{ width: targetWidth, height: targetHeight, transform: `scale(${scale})` }}
          >
            <iframe
              key={template.id + mode}
              src={embedSrc}
              title={`DATAhome template preview — ${template.name}`}
              className={s.frame}
              style={{ width: targetWidth, height: targetHeight }}
              tabIndex={-1}
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <p className={s.hint}>
        You&rsquo;re previewing the <strong>{template.name}</strong> DATAhome template with sample content — interactions inside the preview are disabled.
      </p>
    </div>
  );
}
