'use client';

import { useReducer, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, ScrollControls, Scroll, useScroll } from '@react-three/drei';
import styles from './page.module.css';
import Experience from '@/components/main/Experience';
import CustomCursor from '@/components/main/CustomCursor';
import Overlay from '@/components/main/Overlay';
//
//
//
export default function MainPage() {
  const accents = ['#005afb', '#25cefc', '#168cff', '#df45ff']; // ATC2024 메인 컬러 사용
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const [dpr, setDpr] = useState(1.5);
  const [scrollPercent, setScrollPercent] = useState(0);

  return (
    <div className={styles.canvasContainer} onClick={click} >
      <CustomCursor />
      <Canvas
        frameloop="always"
        shadows
        dpr={dpr}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }}
        style={{ scrollbarWidth: 'none' }}
      >
        <ScrollControls pages={3} damping={0.1} style={{ scrollbarWidth: 'none' }} >
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
          <Experience accent={accent} />
          <Scroll html />
          <ScrollTracker setScrollPercent={setScrollPercent} />
        </ScrollControls>
      </Canvas>
      <Overlay scrollPercent={scrollPercent} />
    </div>
  );
}

function ScrollTracker({ setScrollPercent }) {
  const scroll = useScroll();

  useFrame(() => {
    const offset = scroll.offset;
    const percent = Math.min(Math.max(offset * 100, 0), 100);
    setScrollPercent(percent.toFixed(0));
  });

  return null;
}
