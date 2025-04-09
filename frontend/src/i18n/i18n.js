import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../assets/locales/en.json';
import hi from '../assets/locales/hi.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        hi: { translation: hi }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback if language file is missing
    interpolation: { escapeValue: false } // React already handles XSS protection
});

export default i18n;
