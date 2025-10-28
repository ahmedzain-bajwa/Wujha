'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './AboutUs.module.css';

export const AboutUs: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h2 className={`h3 ${styles.mainHeading}`}>About Us</h2>

        <div className={styles.container}>
          <motion.div
            className={styles.imageContainer}
            animate={{
              y: [0, -10, 0],
              rotateY: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img src="/assets/aboutus-tablet.png" alt="Uptown Muscat Overview" />
          </motion.div>

          <div className={styles.textContainer}>
            <h3 className={styles.heading}>Why Wujha?</h3>
            <div className={styles.textContent}>
              <p className={`regular-s ${styles.paragraph}`}>
                Wujha Real Estate Development is committed to creating spaces that blend innovation, quality, and lifestyle. With a deep understanding of Oman's real estate landscape, we deliver projects that stand the test of time.
              </p>
              <p className={`regular-s ${styles.paragraph}`}>
                Our vision is to build more than structures — we create communities where people thrive. Uptown Muscat is a testament to our dedication to excellence and our passion for transforming visions into reality.
              </p>
              <p className={`regular-s ${styles.paragraph}`}>
                Backed by years of experience and a commitment to customer satisfaction, Wujha is your trusted partner in making sound real estate investments that deliver lasting value.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

