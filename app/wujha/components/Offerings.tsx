'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './Offerings.module.css';

export const Offerings: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(600);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const offerings = [
    {
      image: '/assets/offerings/cinema.png',
      title: t('offerings.cinema.title'),
      subtitle: t('offerings.cinema.subtitle'),
    },
    {
      image: '/assets/offerings/pool.png',
      title: t('offerings.pool.title'),
      subtitle: t('offerings.pool.subtitle'),
    },
    {
      image: '/assets/offerings/gym.png',
      title: t('offerings.gym.title'),
      subtitle: t('offerings.gym.subtitle'),
    },
    {
      image: '/assets/offerings/childcare.png',
      title: t('offerings.childcare.title'),
      subtitle: t('offerings.childcare.subtitle'),
    },
    {
      image: '/assets/offerings/firstaid.png',
      title: t('offerings.firstaid.title'),
      subtitle: t('offerings.firstaid.subtitle'),
    },
    {
      image: '/assets/offerings/commercial.png',
      title: t('offerings.commercial.title'),
      subtitle: t('offerings.commercial.subtitle'),
    },
  ];

  useEffect(() => {
    const updateDimensions = () => {
      const mobile = window.innerWidth <= 767;
      setIsMobile(mobile);
      
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
  const gap = isMobile ? 16 : 24;
  const mobileCardWidth = 280;
  
  let translateX = 0;
  let centerOffset = 0;
  
  if (isMobile) {
    // On mobile, calculate center offset based on viewport width
    centerOffset = wrapperWidth > 0 ? (wrapperWidth - mobileCardWidth) / 2 : 0;
    // Translate to show the current card centered
    translateX = centerOffset - (currentIndex * (mobileCardWidth + gap));
  } else {
    // Desktop logic
    centerOffset = wrapperWidth > 0 ? (wrapperWidth - cardWidth) / 2 : 0;
    translateX = -(currentIndex * (cardWidth + gap));
  }

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

          <h2 className={`h3 ${styles.heading}`}>{t('offerings.heading')}</h2>

          <p className={`regular-l ${styles.subtext}`}>
            {t('offerings.subtitle')}
          </p>

          <div className={styles.carouselContainer}>
            <button
              onClick={prevSlide}
              className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
              aria-label={t('offerings.previous')}
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
                  // On mobile, padding is not needed as centering is done via translateX
                  paddingLeft: isMobile ? 0 : centerOffset,
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
              aria-label={t('offerings.next')}
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


