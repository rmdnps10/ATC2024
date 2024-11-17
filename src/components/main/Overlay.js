'use client';

import React, { useState, useEffect } from 'react';
import styles from './Overlay.module.css';
import { useRouter } from 'next/navigation';
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

  const [countdown, setCountdown] = useState('');

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date('2024-11-18T00:00:00');
      const diff = target - now;

      if (diff <= 0) {
        setCountdown('Conference Started!');
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 카운트다운 텍스트의 opacity 계산
  const countdownOpacity = scrollPercent >= 95
    ? (scrollPercent - 95) / 5  // 90%에서 95% 사이에 서서히 나타나도록
    : 0;

  const [showDelayedContent, setShowDelayedContent] = useState(false);

  useEffect(() => {
    let timer;
    if (scrollPercent >= 95) {
      timer = setTimeout(() => {
        setShowDelayedContent(true);
      }, 700); // 1.7초 딜레이
    } else {
      setShowDelayedContent(false);
    }
    return () => clearTimeout(timer);
  }, [scrollPercent]);

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
        className={`${styles.centerText} ${scrollPercent <= 30 ? styles.visible : ''}`}
        style={{
          transform: `translate(-50%, calc(-50% + ${translateY}%))`,
          opacity: opacity,
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        Art&Technology<br></br>Conference<br></br>2024
      </div>

      {scrollPercent >= 95 && (
        <>
          <div
            className={`${styles.transitionOverlay} ${showDelayedContent ? styles.fadeIn : ''}`}
          >
            <button
              className={`${styles.aboutButton} ${showDelayedContent ? styles.fadeIn : ''}`}
              onClick={() => router.push('/about')}
            >
              ABOUT
            </button>
          </div>
        </>
      )}
    </>
  );
}
