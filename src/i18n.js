import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const options = {
    fallbackLng: 'GB',
    whitelist: ['GB', 'RU', 'UKR'],
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,
    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
    },
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(options);

export default i18n;
