'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './shared/Button';
import styles from './Hero.module.css';

interface HeroProps {
  onDownloadBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDownloadBrochure }) => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        {/* Background Building Image */}
        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.mainImage}>
            <img src="/assets/hero-main.png" alt="Modern Building" />
          </div>
          <motion.div
            className={styles.floatingImage}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img src="/assets/hero-floating.png" alt="Property Detail" />
          </motion.div>
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`h0 ${styles.heading}`}>NOBLE LIVING</h1>
          <p className={styles.subtext}>
            Discover a beautifully curated stunning and modern properties designed for ultimate comfort and style.
          </p>
          <button onClick={onDownloadBrochure} className={styles.ctaButton}>
            View All Projects
            <span>↗</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

