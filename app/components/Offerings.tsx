'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './Offerings.module.css';

const offerings = [
  {
    image: '/assets/offering-1.png',
    title: 'Infinity Pool & Lounge',
    subtitle: 'Relax and unwind in style',
  },
  {
    image: '/assets/offering-2.png',
    title: 'State-of-the-Art Gym',
    subtitle: 'Stay fit with premium equipment',
  },
  {
    image: '/assets/offering-3.png',
    title: 'Landscaped Gardens',
    subtitle: 'Natural beauty at your doorstep',
  },
  {
    image: '/assets/offering-1.png',
    title: 'Co-Working Spaces',
    subtitle: 'Modern workspaces for professionals',
  },
  {
    image: '/assets/offering-2.png',
    title: 'Kids Play Area',
    subtitle: 'Safe and fun environment for children',
  },
  {
    image: '/assets/offering-3.png',
    title: '24/7 Security',
    subtitle: 'Your safety is our priority',
  },
];

export const Offerings: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(offerings.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + Math.ceil(offerings.length / 3)) % Math.ceil(offerings.length / 3)
    );
  };

  const getVisibleOfferings = () => {
    const itemsPerPage = 3;
    const start = currentIndex * itemsPerPage;
    return offerings.slice(start, start + itemsPerPage);
  };

  return (
    <SectionWrapper id="offerings" backgroundColor="var(--color-black)">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h2 className={`h3 ${styles.heading}`}>Offerings and Amenities</h2>
        <p className={`regular-l ${styles.subtext}`}>
          Discover a range of world-class amenities designed to enhance your lifestyle. From fitness and wellness to leisure and entertainment, Uptown Muscat has it all.
        </p>

        <div className={styles.chip}>Amenities That Elevate Living</div>

        <div className={styles.carouselContainer}>
          <button
            onClick={prevSlide}
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
            aria-label="Previous"
          >
            ←
          </button>

          <div className={styles.carouselContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={styles.cardsGrid}
              >
                {getVisibleOfferings().map((offering, index) => (
                  <div key={`${currentIndex}-${index}`} className={styles.card}>
                    <div className={styles.cardImage}>
                      <img src={offering.image} alt={offering.title} />
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{offering.title}</h3>
                      <p className={styles.cardSubtitle}>{offering.subtitle}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextSlide}
            className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
            aria-label="Next"
          >
            →
          </button>
        </div>

        <div className={styles.indicators}>
          {Array.from({ length: Math.ceil(offerings.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <p className={`regular-xs ${styles.footnote}`}>
          *Amenities and facilities are subject to availability and may vary by unit type.
        </p>
      </motion.div>
    </SectionWrapper>
  );
};

