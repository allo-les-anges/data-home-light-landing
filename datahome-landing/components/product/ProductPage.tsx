import Image from 'next/image';
import Link from 'next/link';
import { commercial } from '@/lib/marketing/commercial';
import { productCopy, type ProductLocale } from '@/lib/marketing/product';
import s from './ProductPage.module.css';

function Visual({
  asset, alt, note, full, kind='dashboard', priority=false,
  mobileSrc, imgWidth, imgHeight, mobileWidth=1080, mobileHeight=1993
}: {
  asset: string; alt: string; note: string; full: string;
  kind?: string; priority?: boolean;
  mobileSrc?: string; imgWidth?: number; imgHeight?: number;
  mobileWidth?: number; mobileHeight?: number;
}) {
  const website = kind === 'website';
  const w = imgWidth ?? (website ? 1440 : 1910);
  const h = imgHeight ?? (website ? 843 : 1194);
  // sizes: request a variant large enough to avoid CSS upscaling
  // - premium sources (3840px): request 3000px → Next.js serves 3840px breakpoint
  // - website / full-width sources: cap at intrinsic width
  // - standard 1910px sources: cap at 1920px (no upscale beyond intrinsic)
  const isPremium = asset.startsWith('premium/');
  const sizes = website
    ? `(max-width: 700px) 100vw, ${w}px`
    : isPremium
      ? '(max-width: 700px) 900px, 3000px'
      : `(max-width: 700px) 900px, ${Math.min(w, 1920)}px`;
  const desktopImg = (
    <Image
      src={'/screenshots/'+asset} alt={alt}
      width={w} height={h} sizes={sizes}
      quality={90} priority={priority}
    />
  );
  // portraitCanvas class signals the CSS to reset landscape zoom for mobile portrait images
  const canvasClass = [s.canvas, s[kind], mobileSrc ? s.portraitCanvas : ''].filter(Boolean).join(' ');
  return (
    <figure className={s.visual}>
      <div className={s.viewport} tabIndex={0} role="region" aria-label={alt}>
        <div className={canvasClass}>
          {mobileSrc ? (
            <>
              <div className={s.desktopImg}>{desktopImg}</div>
              <div className={s.mobileImg}>
                <Image
                  src={'/screenshots/'+mobileSrc} alt={alt}
                  width={mobileWidth} height={mobileHeight}
                  sizes="(max-width: 700px) 100vw, 1px"
                  quality={90}
                />
              </div>
            </>
          ) : desktopImg}
        </div>
      </div>
      <figcaption>
        <span>{note}</span>
        <a href={'/screenshots/'+asset} target="_blank" rel="noopener noreferrer">{full} ↗</a>
      </figcaption>
    </figure>
  );
}

export function ProductPage({locale}: {locale: ProductLocale}) {
  const c = productCopy[locale];
  const format = (text: string) => text
    .replace('{hours}', String(commercial.deliveryHours))
    .replace('{days}', String(commercial.trialDays))
    .replace('{languages}', String(commercial.websiteLanguagesIncluded))
    .replace('{xml}', new Intl.NumberFormat(locale, {style:'currency',currency:commercial.currency,maximumFractionDigits:0}).format(commercial.xmlPerFeedMonthlyEur));
  const visual = (asset: string, alt: string, kind='dashboard', priority=false) =>
    <Visual asset={asset} alt={alt} kind={kind} priority={priority} note={c.imageNote} full={c.fullImage}/>;
  return (
    <article className={s.page}>
      <header className={s.opening}>
        <p className={s.eyebrow}>DATAhome / {locale==='fr'?'Produit':'Product'}</p>
        <h1>{c.title}</h1>
        <div className={s.openingBottom}><p>{c.intro}</p><a href="#cockpit">{c.jump} ↓</a></div>
      </header>

      <section className={s.section} id="cockpit" aria-labelledby="pilot-title">
        <div className={s.sectionHead}>
          <div><p className={s.eyebrow}>{c.pilot.label}</p><h2 id="pilot-title">{c.pilot.title}</h2></div>
          <div><p>{c.pilot.body}</p><ul>{c.pilot.points.map(p=><li key={p}>{p}</li>)}</ul></div>
        </div>
        <Visual
          asset="premium/cockpit-premium-night-source.png"
          alt={c.alts.cockpit}
          kind="dashboard" priority={true}
          note={c.imageNote} full={c.fullImage}
          imgWidth={3840} imgHeight={2400}
          mobileSrc="product/cockpit-mobile.png"
          mobileWidth={1080} mobileHeight={1993}
        />
      </section>

      <section className={s.section} aria-labelledby="manage-title">
        <div className={s.sectionHead}>
          <div><p className={s.eyebrow}>{c.manage.label}</p><h2 id="manage-title">{c.manage.title}</h2></div>
          <div><p>{c.manage.body}</p><ul>{c.manage.points.map(p=><li key={p}>{p}</li>)}</ul></div>
        </div>
        <Visual
          asset="premium/property-catalogue-premium-night-source.png"
          alt={c.alts.catalogue}
          kind="catalogue"
          note={c.imageNote} full={c.fullImage}
          imgWidth={3840} imgHeight={2400}
        />
        <aside className={s.crm}><h3>{c.manage.crmTitle}</h3><p>{c.manage.crmBody}</p></aside>
      </section>

      <section className={s.section} aria-labelledby="website-title">
        <div className={s.websiteCopy}>
          <p className={s.eyebrow}>{c.website.label}</p>
          <h2 id="website-title">{c.website.title}</h2>
          <p>{c.website.body}</p>
          <ul>{c.website.points.map(p=><li key={p}>{format(p)}</li>)}</ul>
        </div>
        <Visual
          asset="product/amaru-regions.png"
          alt={c.alts.website}
          note={c.website.caption} full={c.fullImage}
          kind="website"
          imgWidth={1920} imgHeight={1080}
        />
      </section>

      <section className={s.section} aria-labelledby="create-title">
        <div className={s.wideCopy}>
          <p className={s.eyebrow}>{c.create.label}</p>
          <h2 id="create-title">{c.create.title}</h2>
          <p>{c.create.body}</p>
        </div>
        <div className={s.storyStep}><h3>{c.create.landingTitle}</h3><p>{c.create.landingBody}</p></div>
        <Visual
          asset="premium/landing-pages-premium-night-source.png"
          alt={c.alts.landing}
          kind="landing"
          note={c.imageNote} full={c.fullImage}
          imgWidth={3840} imgHeight={2400}
        />
        <div className={s.storyStep}><h3>{c.create.socialTitle}</h3><p>{c.create.socialBody}</p></div>
        <Visual
          asset="product/social-post-generator-desktop.png"
          alt={c.alts.social}
          kind="social"
          note={c.imageNote} full={c.fullImage}
          imgWidth={1920} imgHeight={1080}
          mobileSrc="product/social-hub-mobile.png"
          mobileWidth={1080} mobileHeight={1989}
        />
      </section>

      <section className={[s.section,s.engage].join(' ')} aria-labelledby="engage-title">
        <div>
          <p className={s.eyebrow}>{c.engage.label}</p>
          <h2 id="engage-title">{c.engage.title}</h2>
          <p>{c.engage.body}</p>
        </div>
        <dl>{c.engage.items.map(item=><div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}</dl>
        <div className={s.engageVisual}>
          <Visual
            asset="product/website-chatbot-desktop.png"
            alt={c.alts.cockpit}
            kind="website"
            note={c.imageNote} full={c.fullImage}
            imgWidth={1920} imgHeight={1080}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="extend-title">
        <div className={s.sectionHead}>
          <div><p className={s.eyebrow}>{c.extend.label}</p><h2 id="extend-title">{c.extend.title}</h2></div>
          <p>{c.extend.body}</p>
        </div>
        <div className={s.secondary}>
          <Visual
            asset="product/modules-marketing-desktop.png"
            alt={c.alts.modules}
            kind="website"
            note={c.imageNote} full={c.fullImage}
            imgWidth={1672} imgHeight={941}
          />
        </div>
        <aside className={s.crm}>
          <h3>{c.extend.xmlTitle}</h3>
          <div><p>{format(c.extend.xmlBody)}</p><Link href={'/'+locale+'/pricing'}>{c.extend.pricing} →</Link></div>
        </aside>
      </section>

      <section className={s.activation} aria-labelledby="activation-title">
        <h2 id="activation-title">{format(c.activation.title)}</h2>
        <p>{c.activation.body}</p>
        <a className={s.cta} href="https://datahome.vercel.app/register">{format(c.activation.cta)} →</a>
        <p className={s.access}>{c.activation.access}</p>
      </section>
    </article>
  );
}
