'use client'

import Ocean from './Ocean'
import { Portal } from './TestPortal'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'

export default function Experience() {
  return (
    <Canvas camera={{ position: [0, 10, 750], fov: 55, near: 1, far: 20000 }}>
      <Suspense fallback={null}>
        <Ocean />
        <Portal />
      </Suspense>
    </Canvas>
  )
}
