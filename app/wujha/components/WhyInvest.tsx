'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './WhyInvest.module.css';

interface WhyInvestProps {
  onRegisterClick: () => void;
}

export const WhyInvest: React.FC<WhyInvestProps> = ({ onRegisterClick }) => {
  const { t } = useLanguage();
  
  const investmentReasons = [
    {
      title: t('whyInvest.lifestyleTitle'),
      description: t('whyInvest.lifestyleDescription'),
      image: '/assets/why-invest/01.jpeg',
      chipLabel: t('whyInvest.reason1'),
    },
    {
      title: t('whyInvest.locationTitle'),
      description: t('whyInvest.locationDescription'),
      image: '/assets/why-invest/02.jpeg',
      chipLabel: t('whyInvest.reason2'),
    },
  ];

  return (
    <SectionWrapper id="why-invest">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h2 className={`h3 ${styles.heading}`}>{t('whyInvest.heading')}</h2>

        <div className={styles.cardsContainer}>
          {investmentReasons.map((reason, index) => (
            <motion.div
              key={index}
              className={`${styles.card} ${index % 2 === 0 ? styles.cardLeft : styles.cardRight}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.cardImage}>
                <img src={reason.image} alt={reason.title} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={`h3 ${styles.cardTitle}`}>{reason.title}</h3>
                <p className={`regular-m ${styles.cardDescription}`}>{reason.description}</p>
                <button className={styles.button} onClick={onRegisterClick}>
                  <span>{t('whyInvest.registerNow')}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};