import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import da from "./locales/da/translation.json";
import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json";
import de from "./locales/de/translation.json";
import it from "./locales/it/translation.json";
import pt from "./locales/pt/translation.json";
import nl from "./locales/nl/translation.json";
import sv from "./locales/sv/translation.json";
import no from "./locales/no/translation.json";
import fi from "./locales/fi/translation.json";
import pl from "./locales/pl/translation.json";
import ro from "./locales/ro/translation.json";
import el from "./locales/el/translation.json";
import cs from "./locales/cs/translation.json";
import uk from "./locales/uk/translation.json";
import ru from "./locales/ru/translation.json";
import tr from "./locales/tr/translation.json";
import ar from "./locales/ar/translation.json";
import he from "./locales/he/translation.json";
import hi from "./locales/hi/translation.json";
import zh from "./locales/zh/translation.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: { translation: en },
      da: { translation: da },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
      it: { translation: it },
      pt: { translation: pt },
      nl: { translation: nl },
      sv: { translation: sv },
      no: { translation: no },
      fi: { translation: fi },
      pl: { translation: pl },
      ro: { translation: ro },
      el: { translation: el },
      cs: { translation: cs },
      uk: { translation: uk },
      ru: { translation: ru },
      tr: { translation: tr },
      ar: { translation: ar },
      he: { translation: he },
      hi: { translation: hi },
      zh: { translation: zh },
      ja: { translation: ja },
      ko: { translation: ko },
    },
  });

export default i18n;
