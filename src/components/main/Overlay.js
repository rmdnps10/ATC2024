'use client';

import React from 'react';
import styles from './Overlay.module.css';
//
//
//
export default function Overlay({ scrollPercent }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.percentageText}>
        {scrollPercent}%
      </div>
    </div>
  );
}
