import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import pt from './locales/pt.json';

// Detect device language
const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode || 'en';

// Initialize i18next
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: { translation: en },
    pt: { translation: pt }
  },
  lng: deviceLanguage, // Set language based on device locale
  fallbackLng: 'en', // Default language
  interpolation: {
    escapeValue: false // React already escapes values, so no need to do it here
  }
});

export default i18n;
