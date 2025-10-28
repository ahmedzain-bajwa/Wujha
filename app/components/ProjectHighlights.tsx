'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './ProjectHighlights.module.css';

const highlights = [
  { time: '5 MIN', location: 'Al Rusayl Industrial Area' },
  { time: '10 MIN', location: 'Al Mawaleh – City Center' },
  { time: '15 MIN', location: 'Oman International Exhibition' },
  { time: '20 MIN', location: 'Muscat International Airport' },
];

export const ProjectHighlights: React.FC = () => {
  return (
    <SectionWrapper id="highlights">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <h2 className={`h3 ${styles.heading}`}>Project Highlights</h2>
        <p className={`regular-l ${styles.subtext}`}>
          Strategically located in Knowledge Oasis Muscat, Uptown offers unparalleled connectivity to key destinations, ensuring convenience for residents and tenants alike.
        </p>

        <div className={styles.highlightsContainer}>
          <div className={styles.highlightsLeft}>
            <h3 className={styles.highlightsTitle}>Convenient Accessibility</h3>
          </div>

          <div className={styles.highlightsRight}>
            {highlights.map((item, index) => (
              <React.Fragment key={index}>
                <motion.div
                  className={styles.highlightItem}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={styles.time}>{item.time}</div>
                  <div className={styles.arrow}>→</div>
                  <div className={styles.location}>{item.location}</div>
                </motion.div>
                {index < highlights.length - 1 && <div className={styles.divider} />}
              </React.Fragment>
            ))}
          </div>
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

