import React from 'react';
import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  backgroundColor?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = '',
  id,
  backgroundColor,
}) => {
  return (
    <section
      id={id}
      className={`${styles.section} ${className}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className={styles.container}>{children}</div>
    </section>
  );
};

