'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './ContactUs.module.css';

export const ContactUs: React.FC = () => {
  return (
    <SectionWrapper id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.content}
      >
        <div className={styles.container}>
          <h2 className={`h3 ${styles.mainHeading}`}>Contact Us</h2>

          <div className={styles.infoSection}>
            <h3 className={styles.heading}>Sale Gallery</h3>
            <div className={styles.textContent}>
              <div className={styles.office}>
                <h4 className={styles.officeTitle}>OMAN OFFICE:</h4>
                <p className={styles.address}>
                  Office no. 11, Building No. 2870,<br />
                  Way No. 2333, Madinat Al Sultan Qaboos.<br />
                  P.O. Box 407, P.C. 133 Al Khuwair, Muscat,<br />
                  Sultanate of Oman.
                </p>
              </div>

              <div className={styles.office}>
                <h4 className={styles.officeTitle}>EGYPT OFFICE:</h4>
                <p className={styles.address}>
                  Office B4-2-1.A Building B4<br />
                  Mivida Business Park<br />
                  90 St. 5th Settlement, Cairo, Egypt.
                </p>
              </div>

              <div className={styles.contactDetails}>
                <h4 className={styles.officeTitle}>INQUIRY:</h4>
                <a href="tel:+96880033666" className={styles.phone}>
                  (+968) 80033666
                </a>
                <a href="mailto:Inquiry@wujha.com" className={styles.email}>
                  Inquiry@wujha.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

