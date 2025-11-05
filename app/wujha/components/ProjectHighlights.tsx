'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './ProjectHighlights.module.css';

export const ProjectHighlights: React.FC = () => {
  const { t } = useLanguage();
  
  const highlights = [
    {
      time: '5 MIN',
      location: t('projectHighlights.alRusayl'),
    },
    {
      time: '10 MIN',
      location: t('projectHighlights.alMawaleh'),
    },
    {
      time: '15 MIN',
      location: t('projectHighlights.exhibition'),
    },
    {
      time: '20 MIN',
      location: t('projectHighlights.airport'),
    },
  ];

  return (
    <SectionWrapper id="highlights">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h2 className={styles.heading}>{t('projectHighlights.heading')}</h2>
        <div className={styles.highlightsContainer}>
          {highlights.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                className={styles.highlightItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.time}>
                  <span className={styles.timeNumber}>{item.time.split(' ')[0]}</span>
                  <span className={styles.timeUnit}>{' ' + item.time.split(' ').slice(1).join(' ')}</span>
                </div>
                <div className={styles.location}>{item.location}</div>
              </motion.div>
              {index < highlights.length - 1 && <div className={styles.separator} />}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1234567890123!2d58.4089123!3d23.5880234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM1JzE2LjkiTiA1OMKwMjQnMzIuMSJF!5e0!3m2!1sen!2som!4v1234567890123!5m2!1sen!2som"
            width="100%"
            height="600"
            style={{ border: 0, borderRadius: 'var(--radius-16)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Uptown Muscat Location"
          />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};
