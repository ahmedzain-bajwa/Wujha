'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Get language-specific URLs
  const helpSupportUrl = language === 'en' 
    ? 'https://help.bayut.om/hc/en-us' 
    : 'https://help.bayut.om/hc/ar';
  
  const aboutUsUrl = language === 'en'
    ? 'https://www.bayut.om/en/about/aboutus.html'
    : 'https://www.bayut.om/about/aboutus.html';
  
  const termsPrivacyUrl = language === 'en'
    ? 'https://www.bayut.om/en/terms.html'
    : 'https://www.bayut.om/terms.html';
  
  const appStoreUrl = 'https://apps.apple.com/sa/app/bayut-oman/id6736895230';
  
  const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.bayut.bayutoman&pli=1';
  
  return (
    <footer className={styles.footer}>
      <div className={styles.backgroundOverlay}></div>
      
      <div className={styles.container}>
        {/* Logo Section */}
        <motion.div 
          className={styles.logoSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.logoGroup}>
            <img src="/assets/header/bayut.svg" alt="Bayut" className={styles.partnerLogo} />
            <span className={styles.logoSeparator} />
            <img src="/assets/header/logo.svg" alt="Wujha Development" className={styles.logoImage} />
          </div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div 
          className={styles.navLinks}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a href={helpSupportUrl} className={styles.navLink} target="_blank" rel="noopener noreferrer">
            {t('footer.helpSupport')}
          </a>
          <span className={styles.navSeparator} />
          <a href={aboutUsUrl} className={styles.navLink} target="_blank" rel="noopener noreferrer">
            {t('footer.aboutUs')}
          </a>
          <span className={styles.navSeparator} />
          <a href={termsPrivacyUrl} className={styles.navLink} target="_blank" rel="noopener noreferrer">
            {t('footer.termsPrivacy')}
          </a>
        </motion.div>

        {/* App Store Buttons */}
        <motion.div 
          className={styles.appButtons}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href={appStoreUrl} 
            className={styles.appButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src="/assets/footer/app-store-badge.png"
              alt="Download on the App Store"
              className={styles.appStoreBadge}
            />
          </a>
          
          <a 
            href={googlePlayUrl} 
            className={styles.appButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src="/assets/footer/Google-Playstore.png"
              alt="Get it on Google Play"
              className={styles.googlePlayBadge}
            />
          </a>
        </motion.div>

        {/* Phone Number */}
        <motion.div 
          className={styles.phoneSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={styles.phoneContainer}>
            <a 
              href={`tel:+96824442682`} 
              className={styles.phoneLink}
            >
              <svg className={styles.phoneIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>+968-24442682</span>
            </a>
            <button 
              className={styles.copyButton}
              onClick={async () => {
                const phoneNumber = '+968-24442682';
                try {
                  await navigator.clipboard.writeText(phoneNumber);
                  // Show feedback (you can add a toast notification here if needed)
                  const button = document.querySelector(`.${styles.copyButton}`) as HTMLElement;
                  if (button) {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = `
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    `;
                    setTimeout(() => {
                      button.innerHTML = originalHTML;
                    }, 2000);
                  }
                } catch (err) {
                  console.error('Failed to copy:', err);
                }
              }}
              aria-label="Copy phone number"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
