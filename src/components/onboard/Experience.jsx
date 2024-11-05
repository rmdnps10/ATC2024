'use client'

import Ocean from './Ocean'
import Portal from './Portal'
import { App } from './TestPortal'
import { CameraControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

export default function Experience() {
  return (
    <>
      <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
        <CameraControls />
        <Suspense>
          <Ocean />
          <App />
          {/* <Portal /> */}
        </Suspense>
      </Canvas>
    </>
  )
}
