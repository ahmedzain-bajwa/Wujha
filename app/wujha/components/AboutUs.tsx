'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './AboutUs.module.css';

interface AboutUsProps {
  onRegisterClick: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onRegisterClick }) => {
  const { t } = useLanguage();
  
  return (
    <SectionWrapper id="about">
      <div className={styles.content}>
        <motion.div
          className={styles.textContainer}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.badge}>
            <span className={styles.starIcon}>★</span>
            <span>{t('aboutUs.badge')}</span>
          </div>
          <h2 className={styles.heading}>{t('aboutUs.heading')}</h2>
          <div className={styles.paragraph}>
            <p>{t('aboutUs.paragraph1')}</p>
            <p>{t('aboutUs.paragraph2')}</p>
            <p>{t('aboutUs.paragraph3')}</p>
          </div>
          <button className={styles.button} onClick={onRegisterClick}>
            <span>{t('aboutUs.registerNow')}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        <div className={styles.leftColumn}>
          <motion.div
            className={styles.videoContainer}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <video
              className={styles.video}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/about-us/videowujha.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            className={styles.imageGrid}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/assets/about-us/about1.jpeg" alt="Wujha Development 1" />
            <img src="/assets/about-us/about2.jpeg" alt="Wujha Development 2" />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};
