import { commercial, optionalModules, plans } from '@/lib/marketing/commercial';
import s from './PricingPage.module.css';

type PricingLocale='en'|'fr'|'es'|'nl'|'de'|'pl';
type PricingCopy={
  metaTitle:string;metaDescription:string;eyebrow:string;title:string;intro:string;monthly:string;month:string;
  user:string;users:string;fullAccess:string;trialLine:string;planCta:string;plansLabel:string;
  planText:Record<string,{tagline:string;features:string[]}>;
  differences:{eyebrow:string;title:string;intro:string;capacity:string;property:string;distinctive:string};
  modules:{eyebrow:string;title:string;intro:string;languageUnit:string};
  moduleNames:string[];
  xml:{eyebrow:string;title:string;body:string;none:string};
  setup:{eyebrow:string;title:string;body:string};
  trial:{eyebrow:string;title:string;body:string;cta:string};
  faq:{eyebrow:string;title:string;items:{question:string;answer:string}[]};
};

const planUrl=(name:string)=>'https://datahome.vercel.app/register?plan='+name.toLowerCase();
const differenceIndexes=[[4,1],[1,3],[0,1]];

export function PricingPage({locale,copy}:{locale:PricingLocale;copy:PricingCopy}){
  const money=(value:number)=>new Intl.NumberFormat(locale,{style:'currency',currency:commercial.currency,maximumFractionDigits:0}).format(value);
  const format=(text:string)=>text
    .replaceAll('{days}',String(commercial.trialDays))
    .replaceAll('{setup}',money(commercial.setupEur))
    .replaceAll('{xml}',money(commercial.xmlPerFeedMonthlyEur));
  const planCopy=(planIndex:number)=>{
    const plan=plans[planIndex];
    const localized=copy.planText[plan.name];
    return localized ?? {tagline:plan.tagline,features:plan.features};
  };

  return <article className={s.page} data-pricing-page>
    <section className={s.hero} aria-labelledby="pricing-title">
      <p className={s.eyebrow}>{copy.eyebrow}</p>
      <h1 id="pricing-title">{copy.title}</h1>
      <div className={s.heroBottom}>
        <p>{copy.intro}</p>
        <p className={s.trialNote}>{format(copy.trialLine)}{commercial.trialFullAccess&&<> · {copy.fullAccess}</>}</p>
      </div>
    </section>

    <section className={s.plans} aria-label={copy.plansLabel}>
      {plans.map((plan,index)=>{
        const localized=planCopy(index);
        return <article key={plan.name} className={plan.highlighted?s.emphasized:undefined}>
          <header>
            <p className={s.planIndex}>0{index+1}</p>
            <h2>{plan.name}</h2>
            <p>{localized.tagline}</p>
          </header>
          <div className={s.price}><strong>{money(plan.price)}</strong><span>/{copy.month}</span></div>
          <p className={s.capacity}>{plan.users} {plan.users===1?copy.user:copy.users}</p>
          <a href={planUrl(plan.name)} aria-label={`${copy.planCta} ${plan.name}`}>{copy.planCta} {plan.name}<span aria-hidden="true">↗</span></a>
          <ul>{localized.features.map(feature=><li key={feature}>{feature}</li>)}</ul>
        </article>;
      })}
    </section>

    <section className={s.section} aria-labelledby="differences-title">
      <div className={s.sectionHead}><div><p className={s.eyebrow}>{copy.differences.eyebrow}</p><h2 id="differences-title">{copy.differences.title}</h2></div><p>{copy.differences.intro}</p></div>
      <div className={s.differences}>
        {plans.map((plan,index)=>{
          const localized=planCopy(index);
          const propertyPlanIndex=plan.features.some(feature=>feature.includes('Property Manager'))?index:index-1;
          const propertyIndex=plans[propertyPlanIndex].features.findIndex(feature=>feature.includes('Property Manager'));
          const propertyFeature=planCopy(propertyPlanIndex).features[propertyIndex];
          return <article key={plan.name}>
            <h3>{plan.name}</h3>
            <dl>
              <div><dt>{copy.differences.capacity}</dt><dd>{plan.users} {plan.users===1?copy.user:copy.users}</dd></div>
              <div><dt>{copy.differences.property}</dt><dd>{propertyFeature}</dd></div>
              <div><dt>{copy.differences.distinctive}</dt><dd>{differenceIndexes[index].map(i=>localized.features[i]).join(' · ')}</dd></div>
            </dl>
          </article>;
        })}
      </div>
    </section>

    <section className={s.section} aria-labelledby="modules-title">
      <div className={s.sectionHead}><div><p className={s.eyebrow}>{copy.modules.eyebrow}</p><h2 id="modules-title">{copy.modules.title}</h2></div><p>{copy.modules.intro}</p></div>
      <dl className={s.modules}>{optionalModules.map((module,index)=><div key={module.name}><dt>{copy.moduleNames[index]??module.name}</dt><dd>{money(module.monthlyEur)}<span>/{module.unit==='language/month'?copy.modules.languageUnit:copy.month}</span></dd></div>)}</dl>
    </section>

    <section className={s.split}>
      <article aria-labelledby="xml-title"><p className={s.eyebrow}>{copy.xml.eyebrow}</p><h2 id="xml-title">{format(copy.xml.title)}</h2><p>{format(copy.xml.body)}</p><strong>{commercial.xmlIncludedInPlans?'':copy.xml.none}</strong></article>
      <article aria-labelledby="setup-title"><p className={s.eyebrow}>{copy.setup.eyebrow}</p><h2 id="setup-title">{format(copy.setup.title)}</h2><p>{format(copy.setup.body)}</p></article>
    </section>

    <section className={s.conversion} aria-labelledby="trial-title">
      <p className={s.eyebrow}>{copy.trial.eyebrow}</p><h2 id="trial-title">{format(copy.trial.title)}</h2><p>{format(copy.trial.body)}</p>
      <a href="https://datahome.vercel.app/register">{format(copy.trial.cta)}<span aria-hidden="true">→</span></a>
      {commercial.trialFullAccess&&<small>{copy.fullAccess}</small>}
    </section>

    <section className={s.faq} aria-labelledby="faq-title">
      <div><p className={s.eyebrow}>{copy.faq.eyebrow}</p><h2 id="faq-title">{copy.faq.title}</h2></div>
      <div>{copy.faq.items.map(item=><details key={item.question}><summary>{item.question}</summary><p>{format(item.answer)}</p></details>)}</div>
    </section>
  </article>;
}
