// i18n/config.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Brainer!',
      // Add more translations here
    },
  },
  es: {
    translation: {
      welcome: '¡Bienvenido a Brainer!',
      // Add more translations here
    },
  },
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;