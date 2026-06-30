import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import tr from './tr.json';

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

// Cihazın dil kodunu alıyoruz (örn: 'tr-TR' içinden 'tr' kısmını alır)
const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage, // Başlangıç dili cihaz dili olur
    fallbackLng: 'en',   // Bulunamayan kelimeler için İngilizceye düşer
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağladığı için kapalı
    },
  });

export default i18n;