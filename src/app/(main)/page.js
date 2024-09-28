// MainPage.js
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import Experience from '../../components/main/Experience.js';
import Overlay from '../../components/main/Overlay.js';
import styles from './page.module.css';

export default function MainPage() {
  const scrollRef = useRef(0);

  return (
    <>
      <div className={styles.canvasContainer}>
        <Canvas
          className={styles.canvas}
          shadows
          camera={{ fov: 35, near: 0.1, far: 1000 }}
        >
          <Suspense fallback={null}>
            <Experience scroll={scrollRef} />
          </Suspense>
        </Canvas>
      </div>
      <Overlay scroll={scrollRef} />
    </>
  );
}
