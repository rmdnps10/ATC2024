'use client'

import Ocean from './Ocean'
import MyPortal from './MyPortal'
import CameraAnimation from './CameraAnimation'
import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

export default function Experience() {
  return (
    <Canvas camera={{ position: [0, 10, 750], fov: 55, near: 1, far: 20000 }}>
      {/* <CameraAnimation /> */}
      <Suspense fallback={null}>
        <Ocean />
        <MyPortal />
      </Suspense>
    </Canvas>
  )
}
