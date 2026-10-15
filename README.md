# DATAhome — site marketing

Site vitrine de [data-home.app](https://data-home.app) : présentation de la plateforme DATAhome pour agences immobilières, tarifs, templates, partenaires, revendeurs et contact. Multilingue (EN, FR, ES, NL, DE, PL ; PT et RU en préparation).

## Stack

- Next.js 16 (App Router) et React 19
- TypeScript, Tailwind CSS 4, composants Radix / shadcn
- Contenu traduit dans `datahome-landing/messages/*.json`
- Déploiement sur Vercel

## Structure

Le projet Next.js se trouve dans le sous-dossier `datahome-landing/`. La racine du dépôt ne contient que ce README, `vercel.json` et ce dossier.

```
datahome-landing/
  app/
    [locale]/          pages par langue (home, product, templates, pricing, partners, resellers, contact, privacy, legal)
    api/leads/         envoi des demandes de contact (Resend)
    robots.ts          robots.txt
    sitemap.ts         sitemap.xml multilingue
  components/          sections, pages et éléments d'interface
  lib/
    i18n/              langues et dictionnaires
    marketing/         prix, plans, modules, templates (source des chiffres commerciaux)
    seo.ts             canonical, hreflang et Open Graph (voir ci-dessous)
  messages/            traductions
  proxy.ts             redirection de / vers la langue par défaut
```

## Démarrage

```bash
cd datahome-landing
cp .env.local.example .env.local   # puis renseigner les valeurs
npm ci
npm run dev
```

Autres scripts : `npm run build`, `npm run lint`, `npm run typecheck`.

Variables d'environnement : voir `datahome-landing/.env.local.example`. Ne jamais committer `.env.local`.

## SEO

`lib/seo.ts` est la source unique pour les URL canoniques, les alternates `hreflang` (avec `x-default`) et les balises Open Graph. Une page n'est exposée dans une langue que si son contenu traduit existe (déduit des dictionnaires), et le sitemap utilise la même logique. Pour ajouter une page, l'ajouter à `PageKey` et à `availability` dans ce fichier, puis appeler `alternatesFor()` et `openGraphFor()` dans son `generateMetadata`.

Next.js ne fusionne pas `openGraph` entre le layout et la page : une page qui le définit doit fournir tous les champs, `url` compris (`openGraphFor` s'en charge).

## Anciennes URL

L'ancien site statique (pages `*.html`) a été retiré. Ses URL sont redirigées de façon permanente vers leur équivalent actuel dans `datahome-landing/next.config.mjs` (`legacyRedirects`).

## Déploiement

`vercel.json` pointe vers `datahome-landing/package.json`. Si le projet Vercel est configuré avec « Root Directory » = `datahome-landing`, ce fichier devient inutile et peut être supprimé.
