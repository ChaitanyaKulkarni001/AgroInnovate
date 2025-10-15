import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// If loading files via HTTP, you could use HttpApi; here we'll import JSON directly:

import enTranslations from "./locales/en/translation.json"
import hiTranslations from './locales/hi/translation.json';
import mrTranslations from './locales/mr/translation.json';

i18n
//   .use(LanguageDetector)   // auto-detect language (querystring, localStorage, cookie, navigator)
  .use(initReactI18next)   // pass i18n down to react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      mr: { translation: mrTranslations },
    },
    fallbackLng: 'en',
    debug: false,           // set true for debugging
    interpolation: {
      escapeValue: false,   // not needed for React
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
