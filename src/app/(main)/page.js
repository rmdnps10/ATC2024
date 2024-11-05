'use client'

import { useReducer, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  PerformanceMonitor,
  ScrollControls,
  Scroll,
  useScroll,
  AdaptiveDpr,
  AdaptiveEvents
} from '@react-three/drei'
import styles from './page.module.css'
import CustomCursor from '@/components/main/CustomCursor'
import Experience from '@/components/main/Experience'
import Overlay from '@/components/main/Overlay'
//
//
//
export default function MainPage() {
  const [accent, click] = useReducer(state => ++state % 6, 0)
  const [dpr, setDpr] = useState(1)
  const [scrollPercent, setScrollPercent] = useState(0)
  const pages = 5

  return (
    <Suspense fallback={null}>
      <div className={styles.canvasContainer} onClick={click}>
        <CustomCursor />
        <Canvas
          frameloop="always"
          dpr={dpr}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 50], fov: 17.5, near: 10, far: 100 }}
          style={{ scrollbarWidth: 'none' }}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <ScrollControls pages={pages} damping={0.1}>
            <PerformanceMonitor
              onIncline={() => {
                setDpr(Math.min(2, window.devicePixelRatio))
              }}
              onDecline={() => {
                setDpr(1)
              }}>
              <Experience accent={accent} scrollPercent={scrollPercent} />
              <Scroll html />
              <ScrollTracker setScrollPercent={setScrollPercent} />
            </PerformanceMonitor>
          </ScrollControls>
        </Canvas>
        <Overlay scrollPercent={scrollPercent} />
      </div>
    </Suspense>
  )
}

function ScrollTracker({ setScrollPercent }) {
  const scroll = useScroll()

  useFrame(() => {
    const offset = scroll.offset
    const percent = Math.min(Math.max(offset * 100, 0), 100)
    setScrollPercent(percent.toFixed(0))
  })

  return null
}
