import type { Locale } from './locales';
import type { LegalCopy, PrivacyCopy } from '@/components/legal/LegalPages';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import es from '@/messages/es.json';
import de from '@/messages/de.json';
import nl from '@/messages/nl.json';
import pt from '@/messages/pt.json';
import ru from '@/messages/ru.json';
import pl from '@/messages/pl.json';
export type Dictionary = Pick<typeof en, "navigation" | "promise" | "chrome" | "productPending"> & {
  hero?: typeof en.hero;
  pricing?: typeof en.pricing | typeof fr.pricing;
  partnersPage?: typeof en.partnersPage | typeof fr.partnersPage;
  contactPage?: typeof en.contactPage | typeof fr.contactPage;
  resellerPage?: typeof en.resellerPage | typeof fr.resellerPage;
  privacyPage?: PrivacyCopy;
  legalPage?: LegalCopy;
};
const dictionaries = {en,fr,es,de,nl,pt,ru,pl} as Record<Locale, Dictionary>;
export function getDictionary(locale: Locale): Dictionary { return dictionaries[locale]; }
