'use client';

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectHighlights } from './components/ProjectHighlights';
import { WhyInvest } from './components/WhyInvest';
import { AboutUs } from './components/AboutUs';
import { Offerings } from './components/Offerings';
import { ContactUs } from './components/ContactUs';
import { BrochureModal } from './components/Modals/BrochureModal';
import { CallModal } from './components/Modals/CallModal';

export default function Home() {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRegisterClick = () => {
    setIsBrochureModalOpen(true);
  };

  const handleCallClick = () => {
    if (isMobile) {
      // On mobile, directly open phone dialer
      window.location.href = 'tel:+96880033666';
    } else {
      // On desktop, open modal with QR code
      setIsCallModalOpen(true);
    }
  };

  return (
    <main>
      <Header onRegisterClick={handleRegisterClick} onCallClick={handleCallClick} />

      <Hero onDownloadBrochure={handleRegisterClick} />

      <ProjectHighlights />

      <WhyInvest />

      <AboutUs />

      <Offerings />

      <ContactUs />

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />

      <CallModal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
    </main>
  );
}

