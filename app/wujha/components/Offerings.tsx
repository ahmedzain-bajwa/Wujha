'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(600);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < offerings.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Center the active card: position it in the middle of the wrapper
  // Keep EMPTY SPACE ON THE LEFT by padding-left; move the track LEFT when advancing
  const centerOffset = wrapperWidth > 0 ? (wrapperWidth - cardWidth) / 2 : 0;
  // Translate based on card index, but ensure we don't go beyond bounds
  const translateX = -(currentIndex * (cardWidth + 24)); // 24px is the gap

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
          {/* Dynamic background image */}
          <motion.div
            key={currentIndex}
            className={styles.backgroundImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage: `url(${offerings[currentIndex].image})`,
            }}
          />

          <h2 className={`h3 ${styles.heading}`}>Amenities That Elevate Living</h2>

          <p className={`regular-l ${styles.subtext}`}>
            Discover a range of world-class amenities designed to enhance your lifestyle. From fitness and wellness to leisure and entertainment, Uptown Muscat has it all.
          </p>

          <div className={styles.carouselContainer}>
            <button
              onClick={prevSlide}
              className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
              aria-label="Previous"
              disabled={currentIndex === 0}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className={styles.carouselWrapper} ref={wrapperRef}>
              <motion.div
                className={styles.cardsContainer}
                animate={{
                  x: translateX,
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{
                  // Add LEFT padding equal to centerOffset so the content starts from the middle, leaving left empty
                  paddingLeft: centerOffset,
                }}
              >
                {offerings.map((offering, index) => {
                  const isActive = index === currentIndex;
                  const isNext = index === currentIndex + 1 && currentIndex < offerings.length - 1;
                  const isPrev = index === currentIndex - 1 && currentIndex > 0;
                  const isVisible = isActive || isNext || isPrev;
                  
                  return (
                    <motion.div
                      key={index}
                      className={`${styles.card} ${isActive ? styles.cardActive : ''} ${isNext ? styles.cardNext : ''} ${isPrev ? styles.cardPrev : ''}`}
                      ref={index === currentIndex ? cardRef : null}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                    >
                      <motion.div
                        className={styles.cardInner}
                        initial={false}
                        animate={{
                          scale: isActive ? 1 : (isNext || isPrev) ? 0.88 : 1,
                          opacity: isActive ? 1 : (isNext || isPrev) ? 0.5 : 1,
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      >
                        <div className={styles.cardImage}>
                          <img src={offering.image} alt={offering.title} />
                        </div>
                        <div className={styles.cardContent}>
                          <h3 className={styles.cardTitle}>{offering.title}</h3>
                          <p className={styles.cardSubtitle}>{offering.subtitle}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <button
              onClick={nextSlide}
              className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
              aria-label="Next"
              disabled={currentIndex === offerings.length - 1}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.indicators}>
            {offerings.map((_, index) => (
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


