import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";

import string_en from "../locales/en.json";
import string_cn_simp from "../locales/cn-simp.json";
import string_cn_trad from "../locales/cn-tran.json";

// the translations
const resources = {
  en: {
    translation: string_en,
  },
  cn_simp: {
    translation: string_cn_simp,
  },
  cn_trad: {
    translation: string_cn_trad,
  },
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
