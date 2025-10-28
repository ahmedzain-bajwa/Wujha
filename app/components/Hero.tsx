'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

interface HeroProps {
  onDownloadBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDownloadBrochure }) => {
  const { scrollY } = useScroll();
  
  // Parallax effect: starts at 20% visible, goes to 60% on scroll
  const imageY = useTransform(scrollY, [0, 1000], ['20%', '-40%']);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
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
          <h1 className={styles.heading}>REDEFINE LIFESTYLE</h1>
          <p className={styles.subtitle}>
            Wujha Muscat is more than a home — it's a vibrant, integrated city in the heart of Knowledge Oasis Muscat. Live, work, and play in harmony, surrounded by nature, tranquility, and the people you love.
          </p>
          <button onClick={onDownloadBrochure} className={styles.button}>
            Download Brochure
            <span className={styles.arrow}>↗</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
