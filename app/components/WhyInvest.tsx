'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './WhyInvest.module.css';

const investmentReasons = [
  {
    title: 'Lifestyle that Inspires',
    description:
      'Experience a community designed for modern living, where every amenity and space is crafted to elevate your daily life. From state-of-the-art facilities to beautifully landscaped surroundings, Uptown Muscat blends comfort with sophistication.',
    image: '/assets/whyinvest-1.png',
    chips: ['Modern Living', 'Premium Amenities', 'Community'],
  },
  {
    title: 'Strategic Location in Knowledge City',
    description:
      'Located at the heart of Knowledge Oasis Muscat, Uptown places you at the center of innovation and growth. Benefit from proximity to leading educational institutions, business hubs, and cultural landmarks, all within minutes of your doorstep.',
    image: '/assets/whyinvest-2.png',
    chips: ['Prime Location', 'Innovation Hub', 'Growth Area'],
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
                <div className={styles.chips}>
                  {reason.chips.map((chip, chipIndex) => (
                    <span key={chipIndex} className={styles.chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={`h3 ${styles.cardTitle}`}>{reason.title}</h3>
                <p className={`regular-m ${styles.cardDescription}`}>{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

