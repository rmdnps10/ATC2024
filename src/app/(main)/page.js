// MainPage.js
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, ScrollControls } from '@react-three/drei';
import Experience from '../../components/main/Experience';
import styles from './page.module.css';
//
//
//
export default function MainPage() {
  return (
    <div className={styles.canvasContainer}>
      <Canvas
        shadows
        gl={{ logarithmicDepthBuffer: true, antialias: false, stencil: false, depth: false }}
        className={styles.canvas}
        camera={{ fov: 50, near: 0.1, far: 400 }}
      >
        {/* <OrbitControls enableDamping /> */}
        <ScrollControls pages={3}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
