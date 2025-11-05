'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './shared/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Header.module.css';

interface HeaderProps {
  onRegisterClick: () => void;
  onCallClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick, onCallClick }) => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        mobileMenuToggleRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !mobileMenuToggleRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${!isVisible ? styles.hidden : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <button 
              onClick={() => scrollToSection('hero')} 
              className={styles.logoButton}
              aria-label="Go to top"
            >
              <div className={styles.logoGroup}>
                <img src="/assets/header/bayut.svg" alt="Bayut" className={styles.partnerLogo} />
                <span className={styles.logoSeparator} />
                <img src="/assets/header/logo.svg" alt="Wujha Development" className={styles.logoImage} />
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <button onClick={() => scrollToSection('highlights')} className={styles.navLink}>
              {t('header.highlights')}
            </button>
            <button onClick={() => scrollToSection('why-invest')} className={styles.navLink}>
              {t('header.whyInvest')}
            </button>
            <button onClick={() => scrollToSection('offerings')} className={styles.navLink}>
              {t('header.offerings')}
            </button>
          </nav>

          {/* Desktop Buttons */}
          <div className={styles.actions}>
            <button 
              onClick={toggleLanguage}
              className={styles.languageButton}
              aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <svg 
                className={styles.languageIcon}
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12H22" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              {language === 'en' ? (
                <img 
                  src="/assets/header/Arabic.svg" 
                  alt="Arabic" 
                  className={styles.arabicIcon}
                />
              ) : (
                <span className={styles.languageText}>EN</span>
              )}
            </button>
            <button onClick={onRegisterClick} className={styles.contactButton}>
              {t('header.contactUs')}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={mobileMenuToggleRef}
            className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t('header.toggleMenu')}
          >
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Outside header to avoid overflow clipping */}
      <div 
        ref={mobileMenuRef}
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <nav className={styles.mobileNav}>
          <button onClick={() => scrollToSection('highlights')} className={styles.mobileNavLink}>
            {t('header.highlights')}
          </button>
          <button onClick={() => scrollToSection('why-invest')} className={styles.mobileNavLink}>
            {t('header.whyInvest')}
          </button>
          <button onClick={() => scrollToSection('offerings')} className={styles.mobileNavLink}>
            {t('header.offerings')}
          </button>
        </nav>
        <div className={styles.mobileActions}>
          <button 
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuOpen(false);
            }}
            className={styles.languageButton}
            aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          >
            <svg 
              className={styles.languageIcon}
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2 12H22" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {language === 'en' ? (
              <img 
                src="/assets/header/Arabic.svg" 
                alt="Arabic" 
                className={styles.arabicIcon}
              />
            ) : (
              <span className={styles.languageText}>EN</span>
            )}
          </button>
          <button onClick={onRegisterClick} className={styles.contactButton}>
            {t('header.contactUs')}
          </button>
        </div>
      </div>
    </>
  );
};

