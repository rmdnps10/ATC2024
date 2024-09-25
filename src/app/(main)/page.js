'use client'

import { Canvas } from '@react-three/fiber';
import Experience from '../../components/main/Experience.js';
import styles from './page.module.css'
//
//
//
export default function MainPage() {
  return (
      <div className={styles.canvasContainer}>
        <Canvas
          shadows={true}
          camera={{
            fov: 35,
            near: 0.1,
            far: 300,
            position: [ -4, 3, 6 ],
        }}
        >
          <Experience />
        </Canvas>
      </div>
  )
}
