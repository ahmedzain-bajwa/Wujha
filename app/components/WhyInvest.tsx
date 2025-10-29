'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './WhyInvest.module.css';

const investmentReasons = [
  {
    title: 'The best way to find your perfect home',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: '/assets/why-invest/01.jpeg',
    chipLabel: 'Reason 1',
  },
  {
    title: 'The best way to find your perfect home',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
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