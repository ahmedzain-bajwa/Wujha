'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CallModal.module.css';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
              ×
            </button>

            <div className={styles.content}>
              <h2 className={styles.title}>Scan to Call Us</h2>
              <p className={styles.subtitle}>
                Scan the QR code below with your phone to call us directly at (+968) 80033666
              </p>

              <div className={styles.qrContainer}>
                <img src="/assets/qr-call.png" alt="QR Code to Call" />
              </div>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <a href="tel:+96880033666" className={styles.callButton}>
                <span className={styles.phoneIcon}>📞</span>
                Call (+968) 80033666
              </a>

              <p className={styles.note}>Available 24/7 for your inquiries</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

