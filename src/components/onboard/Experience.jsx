'use client'

import Ocean from './Ocean'
import { Portal } from './TestPortal'
import CameraAnimation from './CameraAnimation'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { App } from './EnterPortal'

export default function Experience() {
  return (
    <Canvas camera={{ position: [0, 10, 750], fov: 55, near: 1, far: 20000 }}>
      <CameraAnimation />
      <Suspense fallback={null}>
        <Ocean />
        <App />
        {/* <Portal /> */}
      </Suspense>
    </Canvas>
  )
}
