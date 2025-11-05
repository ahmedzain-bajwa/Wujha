'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '@/locales/en.json'
import arTranslations from '@/locales/ar.json'

// Initialize synchronously to ensure translations are available immediately
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false, // Disable suspense to prevent loading issues
    },
  })
}

export default i18n

