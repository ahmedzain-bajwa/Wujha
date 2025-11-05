'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import QRCode from 'qrcode';
import styles from './CallModal.module.css';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  
  // Generate QR code with phone number
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const phoneNumber = '+96824442682';
        const qrData = `tel:${phoneNumber}`;

        const qrCodeDataURL = await QRCode.toDataURL(qrData, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });

        setQrCodeDataURL(qrCodeDataURL);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    if (isOpen) {
      generateQRCode();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (isOpen) {
      // Simple approach: just prevent scrolling with overflow hidden
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scrolling when modal closes
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>{t('callModal.title')}</h2>
              <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                ×
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {/* QR Code */}
              <div className={styles.qrContainer}>
                {qrCodeDataURL ? (
                  <img src={qrCodeDataURL} alt="QR Code to Call" className={styles.qrCode} />
                ) : (
                  <div className={styles.qrPlaceholder}>
                    <span>Loading QR Code...</span>
                  </div>
                )}
              </div>

              {/* Get in touch text */}
              <p className={styles.getInTouchText}>
                {t('callModal.getInTouch')}
              </p>

              {/* Phone Number */}
              <div className={styles.phoneNumberContainer}>
                <svg className={styles.phoneIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <a href="tel:+96824442682" className={styles.phoneNumber}>
                  {t('callModal.phoneNumber')}
                </a>
              </div>

              {/* Call to Action */}
              <p className={styles.callToAction}>
                {t('callModal.callToAction')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
