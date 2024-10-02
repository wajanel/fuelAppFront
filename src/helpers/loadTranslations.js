// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { backendApi } from '../api/backendApi';

const loadTranslations = async (locale) => {
    const response = await backendApi.get(`/translations/${locale}`);
    console.log(response.data);
    return response.data;
};

const savedLanguage = localStorage.getItem('language') || 'es';

i18n.use(initReactI18next).init({
    fallbackLng: 'es',
    lng: savedLanguage,
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: { translation: {} },
        es: { translation: {} }
    }
});

export const changeLanguage = async (locale) => {
    const translations = await loadTranslations(locale);
    console.log(translations);
    
    i18n.addResources(locale, 'translation', translations.translation);
    i18n.changeLanguage(locale);
    localStorage.setItem('language', locale);
};

export default i18n;
