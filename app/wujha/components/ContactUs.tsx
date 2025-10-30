'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from './shared/SectionWrapper';
import { Input } from './shared/Input';
import styles from './ContactUs.module.css';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
  });

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
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <motion.form 
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </motion.form>
      </div>
    </SectionWrapper>
  );
};

