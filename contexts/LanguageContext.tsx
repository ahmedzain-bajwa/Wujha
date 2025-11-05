'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'

interface LanguageContextType {
  language: string
  toggleLanguage: () => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { t: i18nT, i18n, ready: i18nReady } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguage] = useState('ar')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Detect language from URL pathname - default to Arabic, /en for English
    const detectedLanguage = pathname?.startsWith('/en') ? 'en' : 'ar'
    setLanguage(detectedLanguage)
    
    // Sync i18next with detected language - wait for i18n to be ready
    if (i18n && i18n.isInitialized && i18n.language !== detectedLanguage) {
      i18n.changeLanguage(detectedLanguage)
    }
    
    // Update document direction and lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', detectedLanguage === 'ar' ? 'rtl' : 'ltr')
      document.documentElement.setAttribute('lang', detectedLanguage)
    }
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('wujha-language', detectedLanguage)
    }
  }, [pathname, i18n, mounted])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en'
    
    // Change i18n language
    if (i18n) {
      i18n.changeLanguage(newLanguage)
    }
    setLanguage(newLanguage)
    
    // Get current pathname - use window.location as fallback for reliability
    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : null) || '/wujha'
    let newPath = currentPath
    
    // Normalize path to ensure it starts with /wujha or /en/wujha
    if (!newPath.startsWith('/wujha') && !newPath.startsWith('/en')) {
      // If path doesn't match expected pattern, default to /wujha
      newPath = '/wujha'
    }
    
    if (newLanguage === 'en') {
      // Switching to English - add /en prefix
      if (!newPath.startsWith('/en')) {
        newPath = `/en${newPath}`
      }
    } else {
      // Switching to Arabic - remove /en prefix (default)
      if (newPath.startsWith('/en')) {
        newPath = newPath.replace('/en', '')
        // Ensure we have a valid path
        if (!newPath || newPath === '/') {
          newPath = '/wujha'
        }
      } else if (newPath !== '/wujha') {
        // Ensure we're on /wujha for Arabic
        newPath = '/wujha'
      }
    }
    
    // Navigate to new URL using Next.js router for faster, smoother navigation
    // This prevents full page reload and white screen flash
    router.push(newPath)
  }

  // Wrapper function to use i18next's t with same API as before
  const t = (key: string): string => {
    // Always try to get translation, even if not fully mounted
    try {
      // First try using react-i18next's t function
      if (i18nT && i18nReady) {
        const translation = i18nT(key)
        if (translation && translation !== key) {
          return translation
        }
      }
      
      // Fallback to direct i18n.t if available
      if (i18n && i18n.isInitialized) {
        const translation = i18n.t(key)
        if (translation && translation !== key) {
          return translation
        }
      }
    } catch (error) {
      // Silently fail and return key
    }
    
    // Last resort: return key (shouldn't happen if translations are loaded)
    return key
  }

  if (!mounted) {
    // Return default values during SSR - default to Arabic
    // But provide a working t function that uses i18n directly if available
    const ssrT = (key: string): string => {
      try {
        if (i18n && i18n.isInitialized) {
          return i18n.t(key) || key
        }
      } catch (error) {
        // Fall through
      }
      return key
    }
    return (
      <LanguageContext.Provider value={{ language: 'ar', toggleLanguage, t: ssrT, isRTL: true }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

