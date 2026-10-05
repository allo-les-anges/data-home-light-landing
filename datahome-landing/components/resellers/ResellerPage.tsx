import Image from 'next/image';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import {
  BadgeCheck, TrendingUp, Layers, LineChart,
  Monitor, Home as HomeIcon, Users, Share2, Sparkles, Database,
  Settings, Building2, UserCircle2, Globe2, Lightbulb, ArrowRight,
  Search, Presentation, Briefcase, Coins, ClipboardList, ListChecks,
} from 'lucide-react';
import { ResellerForm, type ResellerFormCopy } from './ResellerForm';
import s from './ResellerPage.module.css';

const serif = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'] });

type Item = { title: string; body: string };
type Step = { number: string; title: string; body: string };

export type ResellerPageCopy = {
  metaTitle: string; metaDescription: string;
  hero: { eyebrow: string; title: string; body: string; ctaPrimary: string; ctaSecondary: string; stats: Item[] };
  opportunity: { eyebrow: string; title: string; body: string[]; items: Item[] };
  howYouEarn: { eyebrow: string; title: string; steps: Step[]; note: string };
  salesWorkspace: { eyebrow: string; title: string; body: string[]; items: Item[] };
  whatYouSell: { eyebrow: string; title: string; intro: string[]; items: Item[] };
  partnership: { eyebrow: string; title: string; steps: Step[]; note: string };
  lookingFor: { eyebrow: string; title: string; profiles: Item[]; highlight: Item };
  global: { eyebrow: string; title: string; body: string; markets: string[]; more: string; ctaPrompt: string; ctaLink: string };
  finalCta: { eyebrow: string; lead: string; lines: string[]; cta: string };
  form: ResellerFormCopy;
};

type Locale = 'en' | 'fr' | 'es' | 'nl';

const OPPORTUNITY_ICONS = [TrendingUp, Layers, LineChart];
const EARN_ICONS = [Search, Presentation, Briefcase, Coins];
const WORKSPACE_ICONS = [ClipboardList, ListChecks, Layers, LineChart];
const SELL_ICONS = [Monitor, HomeIcon, Users, Share2, Sparkles, Database];
const PARTNERSHIP_ICONS = [Users, Settings, TrendingUp];
const LOOKING_FOR_ICONS = [Building2, UserCircle2, Globe2];
// Fixed pairing by index — the market list is written in the same order in
// every locale file (en/fr/es/nl), so a locale-agnostic flag lookup keyed by
// position is simpler and safer than matching on translated country names.
const MARKET_FLAGS = ['🇪🇺', '🇪🇸', '🇫🇷', '🇧🇪', '🇱🇺', '🇨🇭', '🇵🇹', '🇬🇪', '🇦🇪'];

const PRIVACY_LABEL: Record<Locale, string> = { en: 'Privacy', fr: 'Confidentialité', es: 'Privacidad', nl: 'Privacy' };

export function ResellerPage({ locale, copy }: { locale: Locale; copy: ResellerPageCopy }) {
  const heroLines = copy.hero.title.split('\n');
  const opportunityLines = copy.opportunity.title.split('\n');

  return (
    <article className={s.page}>
      {/* HERO — solid navy premium background; the villa/device visual is a
          framed accent on the right, never a full-bleed page background. */}
      <section className={s.hero} aria-labelledby="reseller-hero-title">
        <div className={s.heroInner}>
          <div className={s.heroContent}>
            <p className={s.eyebrowLight}>{copy.hero.eyebrow}</p>
            <h1 id="reseller-hero-title" className={serif.className}>
              {heroLines.map((line, index) => <span key={line}>{line}{index < heroLines.length - 1 && <br />}</span>)}
            </h1>
            <p className={s.heroBody}>{copy.hero.body}</p>
            <div className={s.heroCtas}>
              <a className={s.ctaPrimary} href="#reseller-form">{copy.hero.ctaPrimary}<ArrowRight size={16} aria-hidden="true" /></a>
              <Link className={s.ctaSecondary} href={`/${locale}`}>{copy.hero.ctaSecondary}</Link>
            </div>
            <ul className={s.heroStats}>
              {copy.hero.stats.map(stat => (
                <li key={stat.title}>
                  <BadgeCheck size={16} aria-hidden="true" />
                  <div className={s.heroStatText}><strong>{stat.title}</strong><span>{stat.body}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.heroVisual} aria-hidden="true">
            <Image src="/resellers/hero-villa-sunset.webp" alt="" width={515} height={344} priority className={s.heroVisualImg} />
          </div>
        </div>
      </section>

      {/* THE OPPORTUNITY — light */}
      <section className={s.opportunity} aria-labelledby="reseller-opportunity-title">
        <div className={s.sectionInner}>
          <p className={s.eyebrowDark}>{copy.opportunity.eyebrow}</p>
          <h2 id="reseller-opportunity-title" className={serif.className}>
            {opportunityLines.map((line, index) => <span key={line}>{line}{index < opportunityLines.length - 1 && <br />}</span>)}
          </h2>
          <div className={s.opportunityIntro}>
            {copy.opportunity.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={s.opportunityGrid}>
            {copy.opportunity.items.map((item, index) => {
              const Icon = OPPORTUNITY_ICONS[index] ?? TrendingUp;
              return (
                <div className={s.opportunityCard} key={item.title}>
                  <span className={s.iconBadgeDark}><Icon size={18} aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW YOU EARN — light */}
      <section className={s.earn} aria-labelledby="reseller-earn-title">
        <div className={s.sectionInner}>
          <p className={s.eyebrowDark}>{copy.howYouEarn.eyebrow}</p>
          <h2 id="reseller-earn-title" className={serif.className}>
            {copy.howYouEarn.title.split('\n').map((line, index, arr) => <span key={line}>{line}{index < arr.length - 1 && <br />}</span>)}
          </h2>
          <ol className={s.earnSteps}>
            {copy.howYouEarn.steps.map((step, index) => {
              const Icon = EARN_ICONS[index] ?? Search;
              return (
                <li className={s.earnStep} key={step.number}>
                  <span className={s.stepNumber}>{step.number}</span>
                  <span className={s.iconBadgeDark}><Icon size={18} aria-hidden="true" /></span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              );
            })}
          </ol>
          <p className={s.earnNote}>{copy.howYouEarn.note}</p>
        </div>
      </section>

      {/* YOUR SALES WORKSPACE — dark, deep navy */}
      <section className={s.workspace} aria-labelledby="reseller-workspace-title">
        <div className={s.sectionInner}>
          <p className={s.eyebrowLight}>{copy.salesWorkspace.eyebrow}</p>
          <h2 id="reseller-workspace-title" className={serif.className}>
            {copy.salesWorkspace.title.split('\n').map((line, index, arr) => <span key={line}>{line}{index < arr.length - 1 && <br />}</span>)}
          </h2>
          <div className={s.workspaceIntro}>
            {copy.salesWorkspace.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={s.workspaceGrid}>
            {copy.salesWorkspace.items.map((item, index) => {
              const Icon = WORKSPACE_ICONS[index] ?? ClipboardList;
              return (
                <div className={s.workspaceCard} key={item.title}>
                  <span className={s.iconBadgeLight}><Icon size={20} aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT YOU SELL — dark */}
      <section className={s.sell} aria-labelledby="reseller-sell-title">
        <div className={s.sectionInner}>
          <p className={s.eyebrowLight}>{copy.whatYouSell.eyebrow}</p>
          <h2 id="reseller-sell-title" className={serif.className}>{copy.whatYouSell.title}</h2>
          <div className={s.sellIntro}>
            {copy.whatYouSell.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={s.sellGrid}>
            {copy.whatYouSell.items.map((item, index) => {
              const Icon = SELL_ICONS[index] ?? Sparkles;
              return (
                <div className={s.sellCard} key={item.title}>
                  <span className={s.iconBadgeLight}><Icon size={20} aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW THE PARTNERSHIP WORKS — light, with form */}
      <section className={s.partnership} aria-labelledby="reseller-partnership-title" id="reseller-form">
        <div className={`${s.sectionInner} ${s.partnershipGrid}`}>
          <div className={s.partnershipSteps}>
            <p className={s.eyebrowDark}>{copy.partnership.eyebrow}</p>
            <h2 id="reseller-partnership-title" className={serif.className}>{copy.partnership.title}</h2>
            <ol className={s.steps}>
              {copy.partnership.steps.map((step, index) => {
                const Icon = PARTNERSHIP_ICONS[index] ?? Users;
                return (
                  <li key={step.number}>
                    <span className={s.stepNumber}>{step.number}</span>
                    <div>
                      <span className={s.iconBadgeDark}><Icon size={16} aria-hidden="true" /></span>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className={s.partnershipNote}>{copy.partnership.note}</p>
          </div>
          <div className={s.partnershipFormWrap}>
            <ResellerForm locale={locale} copy={copy.form} />
            <aside className={s.privacy}>
              <span aria-hidden="true" />
              <p>{copy.form.privacy} <Link href={`/${locale}/privacy`}>{PRIVACY_LABEL[locale]}</Link>.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* WHO WE'RE LOOKING FOR — light */}
      <section className={s.lookingFor} aria-labelledby="reseller-looking-title">
        <div className={s.sectionInner}>
          <p className={s.eyebrowDark}>{copy.lookingFor.eyebrow}</p>
          <h2 id="reseller-looking-title" className={serif.className}>{copy.lookingFor.title}</h2>
          <div className={s.lookingForGrid}>
            {copy.lookingFor.profiles.map((profile, index) => {
              const Icon = LOOKING_FOR_ICONS[index] ?? Building2;
              return (
                <div className={s.profileCard} key={profile.title}>
                  <span className={s.iconBadgeDark}><Icon size={18} aria-hidden="true" /></span>
                  <h3>{profile.title}</h3>
                  <p>{profile.body}</p>
                </div>
              );
            })}
            <div className={`${s.profileCard} ${s.profileHighlight}`}>
              <span className={s.iconBadgeAccent}><Lightbulb size={18} aria-hidden="true" /></span>
              <h3>{copy.lookingFor.highlight.title}</h3>
              <p>{copy.lookingFor.highlight.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL OPPORTUNITY — dark, map visual blended into the background
          (mask fade), never a hard-edged rectangle sitting on the page. */}
      <section className={s.global} aria-labelledby="reseller-global-title">
        <div className={`${s.sectionInner} ${s.globalGrid}`}>
          <div className={s.globalText}>
            <p className={s.eyebrowLight}>{copy.global.eyebrow}</p>
            <h2 id="reseller-global-title" className={serif.className}>{copy.global.title}</h2>
            <p className={s.globalBody}>{copy.global.body}</p>
            <ul className={s.marketChips}>
              {copy.global.markets.map((market, index) => (
                <li key={market}><span aria-hidden="true">{MARKET_FLAGS[index] ?? '🌍'}</span>{market}</li>
              ))}
              <li className={s.marketMore}><Globe2 size={14} aria-hidden="true" />{copy.global.more}</li>
            </ul>
            <p className={s.globalCta}>{copy.global.ctaPrompt} <a href="#reseller-form">{copy.global.ctaLink}</a></p>
          </div>
          <div className={s.globalVisual} aria-hidden="true">
            <Image src="/resellers/reseller-global-map.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 520px" className={s.globalVisualImg} />
          </div>
        </div>
      </section>

      {/* FINAL CTA — dark */}
      <section className={s.finalCta} aria-labelledby="reseller-final-title">
        <p className={s.eyebrowLight}>{copy.finalCta.eyebrow}</p>
        <p className={s.finalCtaLead}>{copy.finalCta.lead}</p>
        <h2 id="reseller-final-title" className={serif.className}>
          {copy.finalCta.lines.map((line, index) => <span key={line}>{line}{index < copy.finalCta.lines.length - 1 && <br />}</span>)}
        </h2>
        <a className={s.ctaPrimary} href="#reseller-form">{copy.finalCta.cta}<ArrowRight size={16} aria-hidden="true" /></a>
      </section>
    </article>
  );
}
