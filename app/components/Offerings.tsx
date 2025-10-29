'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './Offerings.module.css';

const offerings = [
  {
    image: '/assets/offerings/cinema.png',
    title: 'Cinema',
    subtitle: 'This small private cinema can be fully reserved and seats about 12 VIP guests, plus one large premium sofa.',
  },
  {
    image: '/assets/offerings/pool.png',
    title: 'Pool',
    subtitle: 'Pool access is on the lower floor beside other sports facilities, with locker rooms and restrooms connected by stairs and elevators.',
  },
  {
    image: '/assets/offerings/gym.png',
    title: 'Gym',
    subtitle: 'Two gyms are provided—one shared and one for women—each with its own locker room, sauna, and jacuzzi.',
  },
  {
    image: '/assets/offerings/childcare.png',
    title: 'Childcare',
    subtitle: 'During working hours, children will be taken care of by trained caregivers.',
  },
  {
    image: '/assets/offerings/firstaid.png',
    title: 'First Aid Room',
    subtitle: 'Located within the sports facility, this area supports quick first aid and has ground-floor parking access for fast transfer to emergency care.',
  },
  {
    image: '/assets/offerings/commercial.png',
    title: 'Commercial Area',
    subtitle: 'Mix of retail options on the longest boulevard in Muscat.',
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
    <SectionWrapper id="offerings">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <div className={styles.container}>
          <h2 className={`h3 ${styles.heading}`}>Amenities That Elevate Living</h2>

          <p className={`regular-l ${styles.subtext}`}>
            Discover a range of world-class amenities designed to enhance your lifestyle. From fitness and wellness to leisure and entertainment, Uptown Muscat has it all.
          </p>

        <div className={styles.carouselContainer}>
          <button
            onClick={prevSlide}
            className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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

        </div>
      </motion.div>
    </SectionWrapper>
  );
};


