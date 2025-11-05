'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Hero.module.css';

interface HeroProps {
  onDownloadBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDownloadBrochure }) => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  
  // Parallax effect: balanced visibility with faster animation
  const imageY = useTransform(scrollY, [0, 800], ['30%', '10%']);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        {/* Minimal Snowfall Effect */}
        <div className={styles.snowfall}>
          <div className={styles.snowflake}></div>
          <div className={styles.snowflake}></div>
          <div className={styles.snowflake}></div>
          <div className={styles.snowflake}></div>
          <div className={styles.snowflake}></div>
          <div className={styles.snowflake}></div>
          <div className={styles.snowflake}></div>
          <div className={styles.snowflake}></div>
        </div>

        {/* Main Building Image */}
        <motion.div
          className={styles.imageContainer}
          style={{ y: imageY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img 
            src="/assets/hero/main-hero.png" 
            alt="Modern Building" 
            className={styles.mainImage}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className={styles.heading}>{t('hero.heading')}</h1>
          <h2 className={styles.locationHeading}>{t('hero.locationHeading')}</h2>
          <p className={styles.subtitle}>
            {t('hero.subtitle')}
          </p>
          <button onClick={onDownloadBrochure} className={styles.button}>
            <svg className={styles.downloadIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {t('hero.downloadBrochure')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
