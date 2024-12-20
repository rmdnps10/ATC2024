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
  const [cameraZ, setCameraZ] = useState(50)
  const [isMobile, setIsMobile] = useState(false)
  const pages = 4

  useEffect(() => {
    const mobileCheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    setIsMobile(mobileCheck)
    setCameraZ(mobileCheck ? 90 : 50)
  }, [])

  return (
    <Suspense fallback={null}>
      <div className={styles.canvasContainer} onClick={click}>
        {!isMobile && <CustomCursor />}
        <Canvas
          frameloop="always"
          dpr={dpr}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, cameraZ], fov: 17.5, near: 10, far: 1000 }}
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
