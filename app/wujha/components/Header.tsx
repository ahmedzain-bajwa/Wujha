'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './shared/Button';
import styles from './Header.module.css';

interface HeaderProps {
  onRegisterClick: () => void;
  onCallClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterClick, onCallClick }) => {
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
              Highlights
            </button>
            <button onClick={() => scrollToSection('why-invest')} className={styles.navLink}>
              Why Invest
            </button>
            <button onClick={() => scrollToSection('about')} className={styles.navLink}>
              About Us
            </button>
            <button onClick={() => scrollToSection('offerings')} className={styles.navLink}>
              Offerings
            </button>
            <button onClick={() => scrollToSection('contact')} className={styles.navLink}>
              Contact
            </button>
          </nav>

          {/* Desktop Button */}
          <div className={styles.actions}>
            <button onClick={onRegisterClick} className={styles.contactButton}>
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={mobileMenuToggleRef}
            className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
            Highlights
          </button>
          <button onClick={() => scrollToSection('why-invest')} className={styles.mobileNavLink}>
            Why Invest
          </button>
          <button onClick={() => scrollToSection('about')} className={styles.mobileNavLink}>
            About Us
          </button>
          <button onClick={() => scrollToSection('offerings')} className={styles.mobileNavLink}>
            Offerings
          </button>
          <button onClick={() => scrollToSection('contact')} className={styles.mobileNavLink}>
            Contact
          </button>
        </nav>
        <div className={styles.mobileActions}>
          <button onClick={onRegisterClick} className={styles.contactButton}>
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};

