// MainPage.js
'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Experience from '../../components/main/Experience';
import styles from './page.module.css';

export default function MainPage() {
  return (
    <div className={styles.canvasContainer}>
      <Canvas
        className={styles.canvas}
        shadows
        camera={{ fov: 50, near: 0.1, far: 1000 }}
      >
        {/* ScrollControls를 사용하여 스크롤 이벤트 처리 */}
        <ScrollControls pages={3}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
