'use client';

import React from 'react';
import styles from './Overlay.module.css';
//
//
//
export default function Overlay({ scrollPercent }) {
  const totalBoxes = 25;

  let topFilled = 0;
  let bottomFilled = 0;

  if (scrollPercent <= 50) {
    topFilled = Math.floor((scrollPercent / 50) * totalBoxes);
  } else {
    topFilled = totalBoxes;
    bottomFilled = Math.floor(((scrollPercent - 50) / 50) * totalBoxes);
  }

  const translateY = scrollPercent <= 30
    ? -(scrollPercent / 30) * 100
    : -100;

  const opacity = scrollPercent <= 30
    ? 0.8 - (scrollPercent / 30)
    : 0;

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.topStack}>
          {Array.from({ length: totalBoxes }, (_, i) => (
            <div
              key={i}
              className={`${styles.box} ${i < topFilled ? styles.filled : ''}`}
            />
          ))}
        </div>

        <div className={styles.percentageText}>
          {scrollPercent}%
        </div>

        <div className={styles.bottomStack}>
          {Array.from({ length: totalBoxes }, (_, i) => (
            <div
              key={i}
              className={`${styles.box} ${i < bottomFilled ? styles.filled : ''}`}
            />
          ))}
        </div>
      </div>

      <div
        className={styles.centerText}
        style={{
          transform: `translate(-50%, calc(-50% + ${translateY}%))`,
          opacity: opacity
        }}
      >
        Art&Technology Conference 2024
      </div>
    </>
  );
}
