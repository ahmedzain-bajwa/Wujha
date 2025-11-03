'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './AboutUs.module.css';

export const AboutUs: React.FC = () => {
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
            <span>About Us</span>
          </div>
          <h2 className={styles.heading}>Why WUJHA?</h2>
          <div className={styles.paragraph}>
            <p>At Wujha, we aspire to go beyond the ordinary.</p>
            <p>Our vision is to transform urban spaces into sustainable, vibrant destinations that enrich lives and inspire communities. We are committed to building exceptional environments where luxury meets purpose – communities that elevate aspirations, foster harmony, and reflect the highest international standards.</p>
            <p>Through thoughtfully designed residential spaces, business centers, and integrated developments, Wujha creates more than buildings; we create lifestyles shaped for a brighter future. At the heart of our culture lies a promise to deliver experiences that are not only luxurious but truly enriching – ensuring every project reflects the essence of Wujha's vision.</p>
          </div>
          <button className={styles.button}>
            <span>Register Now</span>
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
