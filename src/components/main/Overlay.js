// Overlay.js
import React, { useRef } from 'react';
import styles from './Overlay.module.css';

export default function Overlay({ scroll }) {
  const overlayRef = useRef();

  const onScroll = (e) => {
    scroll.current =
      e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
  };

  return (
    <div
      ref={overlayRef}
      onScroll={onScroll}
      className={styles.scrollContainer}
    >
      <div style={{ height: '500vh' }}>
        {/* 스크롤 가능한 컨텐츠 추가 */}
        <section className={styles.section}>
          <h1>Welcome</h1>
        </section>
        <section className={styles.section}>
          <h1>About the Jellyfish</h1>
        </section>
        <section className={styles.section}>
          <h1>Explore the Depths</h1>
        </section>
        <section className={styles.section}>
          <h1>Contact Us</h1>
        </section>
      </div>
    </div>
  );
}
