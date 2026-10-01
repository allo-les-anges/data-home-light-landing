import type { ReactNode } from "react";
import { legalIdentity } from "@/lib/marketing/legal";
import s from "./LegalPages.module.css";

export type LegalSection = { title: string; body: string[] };
export type PrivacyCopy = { metaTitle: string; metaDescription: string; eyebrow: string; title: string; intro: string; updated: string; contactLabel: string; operatorStatus: string; sections: LegalSection[] };
export type LegalCopy = { metaTitle: string; metaDescription: string; eyebrow: string; title: string; intro: string; contactLabel: string; operatorStatus: string; sections: LegalSection[] };

function identity(contactLabel: string, operatorStatus: string) {
  return <address className={s.identity}><strong>{legalIdentity.brand}</strong><br />{legalIdentity.operator}<br />{operatorStatus}<br />{legalIdentity.address.map((line) => <span key={line}>{line}<br /></span>)}<span>{contactLabel}: <a href={`mailto:${legalIdentity.contactEmail}`}>{legalIdentity.contactEmail}</a></span></address>;
}

function replaceFacts(text: string) {
  return text
    .replaceAll("{operator}", legalIdentity.operator)
    .replaceAll("{email}", legalIdentity.contactEmail)
    .replaceAll("{taxId}", legalIdentity.taxId)
    .replaceAll("{months}", String(legalIdentity.contactRetentionMonths));
}

function ReadingPage({ eyebrow, title, intro, sections, identityBlock }: { eyebrow: string; title: string; intro: string; sections: LegalSection[]; identityBlock?: ReactNode }) {
  return <article className={s.page}><header className={s.hero}><p className={s.eyebrow}>{eyebrow}</p><h1>{title}</h1><p>{intro}</p></header><div className={s.content}>{identityBlock}{sections.map((section) => <section key={section.title} className={s.section}><h2>{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph}>{replaceFacts(paragraph)}</p>)}</section>)}</div></article>;
}

export function PrivacyPage({ copy }: { copy: PrivacyCopy }) {
  return <ReadingPage eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} sections={copy.sections} identityBlock={<><p className={s.updated}>{copy.updated}</p>{identity(copy.contactLabel, copy.operatorStatus)}</>} />;
}

export function LegalPage({ copy }: { copy: LegalCopy }) {
  return <ReadingPage eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} sections={copy.sections} identityBlock={identity(copy.contactLabel, copy.operatorStatus)} />;
}
