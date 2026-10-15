import type { MetadataRoute } from 'next';
import { SITE_URL, languageAlternates, localesFor, pageKeys, pathFor } from '@/lib/seo';

// No lastModified on purpose: there is no reliable per-page date, and a wrong
// one is worse than none.
export default function sitemap(): MetadataRoute.Sitemap {
  return pageKeys.flatMap((page) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(page)).map(([lang, path]) => [lang, `${SITE_URL}${path}`]),
    );
    return localesFor(page).map((locale) => ({
      url: `${SITE_URL}${pathFor(page, locale)}`,
      alternates: { languages },
    }));
  });
}
