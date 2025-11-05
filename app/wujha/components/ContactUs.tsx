'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionWrapper } from './shared/SectionWrapper';
import styles from './ContactUs.module.css';

interface ContactUsProps {
  onCallClick: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onCallClick }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [countryCode, setCountryCode] = useState('+968');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const countryButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = () => {
    if (countryButtonRef.current) {
      const rect = countryButtonRef.current.getBoundingClientRect();
      const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
      
      if (isRTL) {
        // For RTL: align dropdown to the right edge of country button
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.right - 280, // 280px is the dropdown width
          right: undefined,
        });
      } else {
        // For LTR: align dropdown to the left edge of country button
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          right: undefined,
        });
      }
    }
  };

  useEffect(() => {
    if (isCountryDropdownOpen) {
      updateDropdownPosition();
      
      const handleScroll = () => {
        updateDropdownPosition();
      };
      
      const handleResize = () => {
        updateDropdownPosition();
      };

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          countryButtonRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !countryButtonRef.current.contains(event.target as Node)
        ) {
          setIsCountryDropdownOpen(false);
        }
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isCountryDropdownOpen]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SectionWrapper id="contact">
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img 
            src="/assets/hero/hero-main.png" 
            alt="Background" 
            className={styles.backgroundImage}
          />
          <div className={styles.formOverlay}>
            <motion.h2 
              className={styles.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('contactUs.heading')}
            </motion.h2>

            <motion.form 
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  {t('contactUs.fullName')} <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  placeholder={t('contactUs.fullNamePlaceholder')}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  {t('contactUs.email')} <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  placeholder={t('contactUs.emailPlaceholder')}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                  {t('contactUs.phone')} <span className={styles.required}>*</span>
                </label>
                <div className={styles.phoneInputWrapper}>
                  <div className={styles.customCountrySelect}>
                    <button
                      type="button"
                      ref={countryButtonRef}
                      className={styles.countryButton}
                      onClick={() => {
                        if (!isCountryDropdownOpen) {
                          updateDropdownPosition();
                        }
                        setIsCountryDropdownOpen(!isCountryDropdownOpen);
                      }}
                    >
                      <span className={styles.countryFlag}>
                        {countries.find(c => c.code === countryCode)?.flag}
                      </span>
                      <span className={styles.countryCode}>{countryCode}</span>
                      <svg 
                        className={`${styles.dropdownArrow} ${isCountryDropdownOpen ? styles.dropdownArrowOpen : ''}`} 
                        width="10" 
                        height="6" 
                        viewBox="0 0 10 6" 
                        fill="none"
                      >
                        <path d="M1 1L5 5L9 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {isCountryDropdownOpen && (
                      <div 
                        ref={dropdownRef}
                        className={styles.customDropdown}
                        style={{
                          top: `${dropdownPosition.top}px`,
                          left: `${dropdownPosition.left}px`,
                        }}
                      >
                        <div className={styles.dropdownSearch}>
                          <input
                            type="text"
                            placeholder={t('contactUs.search')}
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
                    placeholder={t('contactUs.phonePlaceholder')}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={styles.phoneNumberInput}
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton}>
                  {t('contactUs.submit')}
                </button>
                <button type="button" className={styles.callUsButton} onClick={onCallClick}>
                  {t('contactUs.callUs')}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

