'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { usePathname } from 'next/navigation'
import i18n from '../app/i18n.client'

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Wait for i18n to be initialized
    if (!i18n.isInitialized) {
      // If not initialized, wait a bit and check again
      const checkReady = () => {
        if (i18n.isInitialized) {
          initializeLanguage()
        } else {
          setTimeout(checkReady, 10)
        }
      }
      checkReady()
    } else {
      initializeLanguage()
    }

    function initializeLanguage() {
      // Detect language from URL - default to Arabic, /en for English
      const locale = pathname?.startsWith('/en') ? 'en' : 'ar'

      if (i18n.language !== locale) {
        i18n.changeLanguage(locale)
      }

      // Update HTML attributes
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
      }

      setReady(true)
    }
  }, [pathname])

  // Show children immediately but ensure i18n is ready
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

