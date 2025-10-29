'use client';

import React, { useState, useEffect } from 'react';
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`${styles.header} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/assets/header/logo.svg" alt="Wujha Development" className={styles.logoImage} />
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <button onClick={() => scrollToSection('hero')} className={styles.navLink}>
            Home
          </button>
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
          className={styles.mobileMenuToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <button onClick={() => scrollToSection('hero')} className={styles.mobileNavLink}>
            Home
          </button>
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
    </header>
  );
};

