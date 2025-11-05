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
  const scrollYRef = React.useRef<number>(0);
  
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
      // Store current scroll position BEFORE locking
      scrollYRef.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      
      // Prevent body scroll when modal is open
      const body = document.body;
      const html = document.documentElement;
      
      // Store original styles
      const originalOverflow = body.style.overflow;
      const originalPosition = body.style.position;
      const originalTop = body.style.top;
      const originalWidth = body.style.width;
      const originalLeft = body.style.left;
      const originalRight = body.style.right;
      
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollYRef.current}px`;
      body.style.width = '100%';
      body.style.left = '0';
      body.style.right = '0';
      
      // Don't restore here - let onExitComplete handle it after animation
      return () => {
        // Cleanup will be handled by onExitComplete
      };
    }
  }, [isOpen]);
  
  // Restore scroll after exit animation completes
  const handleExitComplete = () => {
    const scrollY = scrollYRef.current;
    const body = document.body;
    const html = document.documentElement;
    
    // Set scroll position FIRST while body is still fixed (if it still is)
    // This is critical to prevent jump
    if (document.scrollingElement) {
      (document.scrollingElement as HTMLElement).scrollTop = scrollY;
    }
    html.scrollTop = scrollY;
    
    // Now restore body styles - this will trigger layout
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    body.style.removeProperty('left');
    body.style.removeProperty('right');
    
    // Immediately after removing fixed position, set scroll again
    // This prevents the browser from jumping to top
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: 'auto'
      });
      // Set it directly as well for extra insurance
      html.scrollTop = scrollY;
      if (document.scrollingElement) {
        (document.scrollingElement as HTMLElement).scrollTop = scrollY;
      }
    });
  };
  
  const handleClose = () => {
    // Just close the modal - scroll will be restored in handleExitComplete
    onClose();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
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
              <button className={styles.closeButton} onClick={handleClose} aria-label="Close modal">
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
