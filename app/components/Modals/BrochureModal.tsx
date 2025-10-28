'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import styles from './BrochureModal.module.css';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (response.ok) {
        // Trigger download
        const link = document.createElement('a');
        link.href = '/assets/Uptown-Brochure.pdf';
        link.download = 'Uptown-Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Reset form
        setName('');
        setEmail('');
        setPhone('');

        // Close modal
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className={styles.imageSection}>
                <img src="/assets/hero-modal-img.png" alt="Uptown Brochure" />
              </div>

              <div className={styles.formSection}>
                <h2 className={styles.title}>Register and Download Brochure</h2>
                <p className={styles.subtitle}>
                  Fill in your details to receive our comprehensive property brochure
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={setName}
                    required
                    name="name"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={setEmail}
                    required
                    name="email"
                  />

                  <div className={styles.phoneWrapper}>
                    <label className={styles.phoneLabel}>
                      Phone Number<span className={styles.required}>*</span>
                    </label>
                    <PhoneInput
                      country={'om'}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      enableSearch
                      containerClass={styles.phoneContainer}
                      inputClass={styles.phoneInput}
                      buttonClass={styles.phoneButton}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="large" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Download Brochure'}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

