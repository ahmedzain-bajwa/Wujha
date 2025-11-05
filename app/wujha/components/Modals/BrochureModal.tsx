'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import { useLanguage } from '@/contexts/LanguageContext';
import 'react-phone-input-2/lib/style.css';
import styles from './BrochureModal.module.css';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  
  // Get language-specific URLs (same as Footer)
  const termsPrivacyUrl = language === 'en'
    ? 'https://www.bayut.om/en/terms.html'
    : 'https://www.bayut.om/terms.html';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+968');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const countryButtonRef = React.useRef<HTMLButtonElement>(null);
  const scrollYRef = React.useRef<number>(0);

  const countries = [
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  ];

  // Carousel images - using the JPEG images from modals folder
  const carouselImages = [
    '/assets/modals/image-1.jpeg',
    '/assets/modals/image-2.jpeg',
    '/assets/modals/image-3.jpeg',
  ];

  // Auto carousel effect
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds

      return () => {
        clearInterval(interval);
      };
    }
  }, [isOpen, carouselImages.length]);

  // Prevent body scroll when modal is open
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to API with country code
      const fullPhone = `${countryCode}${phone}`;
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone: fullPhone }),
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
    <AnimatePresence onExitComplete={handleExitComplete}>
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
                <div className={styles.carouselContainer}>
                  <img 
                    src={carouselImages[currentImageIndex]} 
                    alt="Property Image" 
                    className={styles.carouselImage}
                  />
                  <div className={styles.carouselDots}>
                    {carouselImages.map((_, index) => (
                      <div
                        key={index}
                        className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <div className={styles.branding}>
                  <img src="/assets/modals/logo-blk.svg" alt="Wujha Development" className={styles.brandLogo} />
                </div>
                
                <h2 className={styles.title}>{t('brochureModal.title')}</h2>
                <p className={styles.subtitle}>
                  {t('brochureModal.subtitle')}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      {t('brochureModal.fullName')} <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t('brochureModal.fullNamePlaceholder')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      {t('brochureModal.email')} <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder={t('brochureModal.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      {t('brochureModal.phone')} <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.phoneInputWrapper}>
                      <div className={styles.customCountrySelect}>
                        <button
                          type="button"
                          ref={countryButtonRef}
                          className={styles.countryButton}
                          onClick={() => {
                            if (!isCountryDropdownOpen && countryButtonRef.current) {
                              const rect = countryButtonRef.current.getBoundingClientRect();
                              const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
                              
                              if (isRTL) {
                                // For RTL: align dropdown to the right edge of country button
                                setDropdownPosition({
                                  top: rect.bottom + 4,
                                  left: rect.right - 280, // 280px is the dropdown width
                                });
                              } else {
                                // For LTR: align dropdown to the left edge of country button
                                setDropdownPosition({
                                  top: rect.bottom + 4,
                                  left: rect.left,
                                });
                              }
                            }
                            setIsCountryDropdownOpen(!isCountryDropdownOpen);
                          }}
                        >
                          <span className={styles.countryFlag}>
                            {countries.find(c => c.code === countryCode)?.flag}
                          </span>
                          <span className={styles.countryCode}>{countryCode}</span>
                          <svg className={styles.dropdownArrow} width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {isCountryDropdownOpen && (
                          <div 
                            className={styles.customDropdown}
                            style={{
                              top: `${dropdownPosition.top}px`,
                              left: `${dropdownPosition.left}px`
                            }}
                          >
                            <div className={styles.dropdownSearch}>
                              <input
                                type="text"
                                placeholder={t('brochureModal.search')}
                                className={styles.searchInput}
                              />
                            </div>
                            {countries.map((country) => (
                              <div
                                key={country.code}
                                className={`${styles.dropdownItem} ${
                                  countryCode === country.code ? styles.selectedItem : ''
                                }`}
                                onClick={() => {
                                  setCountryCode(country.code);
                                  setIsCountryDropdownOpen(false);
                                }}
                              >
                                <span className={styles.countryFlag}>{country.flag}</span>
                                <span className={styles.countryName}>{country.name}</span>
                                <span className={styles.countryCodeText}>{country.code}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder={t('brochureModal.phonePlaceholder')}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className={styles.phoneNumberInput}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('brochureModal.processing') : t('brochureModal.register')}
                  </button>
                </form>

                <p className={styles.legalText}>
                  {t('brochureModal.legalText')}{' '}
                  <a href={termsPrivacyUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>{t('brochureModal.terms')}</a> and{' '}
                  <a href={termsPrivacyUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>{t('brochureModal.privacy')}</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

