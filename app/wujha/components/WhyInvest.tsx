'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './WhyInvest.module.css';

const investmentReasons = [
  {
    title: 'Lifestyle that Inspires',
    description:
      'Uptown Muscat is more than a residence - it\'s a nature-inspired community that sparks creativity. With green spaces, open surroundings, and the lively Uptown Boulevard at its center, it balances work and life. Shops, a social club, playgrounds, and family areas all support convenience, connection, and memorable moments.',
    image: '/assets/why-invest/01.jpeg',
    chipLabel: 'Reason 1',
  },
  {
    title: 'Strategic Location in Knowledge City',
    description:
      'Located in Knowledge Oasis Muscat (KOM) - Oman\'s leading tech park managed by @madaynoman - Uptown sits at the center of the country\'s digital growth. KOM hosts 200+ companies, from local SMEs and education hubs to global brands, powered by a skilled, multilingual workforce. For residents and investors, it offers direct access to opportunity, innovation, and a thriving knowledge economy.',
    image: '/assets/why-invest/02.jpeg',
    chipLabel: 'Reason 2',
  },
];

export const WhyInvest: React.FC = () => {
  return (
    <SectionWrapper id="why-invest">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h2 className={`h3 ${styles.heading}`}>Why Invest in Uptown Muscat?</h2>

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
                <div className={styles.badge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{reason.chipLabel}</span>
                </div>
                <h3 className={`h3 ${styles.cardTitle}`}>{reason.title}</h3>
                <p className={`regular-m ${styles.cardDescription}`}>{reason.description}</p>
                <button className={styles.button}>
                  <span>Start exploring</span>
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