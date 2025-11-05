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
      </div>
    </footer>
  );
};
