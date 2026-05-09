'use client'

import Ocean from './Ocean'
import MyPortal from './MyPortal'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from 'r3f-perf'

export default function Experience({
  setRigActive,
  nextPortalRef,
  prevPortalRef,
  centerPortalRef,
  rigActive
}) {
  return (
    <Canvas
      camera={{ position: [0, 10, 750], fov: 55, near: 1, far: 3000 }}
      // DPR 최대 1.2로 제한 → Retina에서 GPU 픽셀 처리량 추가 절감
      dpr={[1, 1.2]}
    >
     
      <Suspense fallback={null}>
        <Ocean />
        <MyPortal
          setRigActive={setRigActive}
          nextPortalRef={nextPortalRef}
          prevPortalRef={prevPortalRef}
          centerPortalRef={centerPortalRef}
          rigActive={rigActive}
        />
      </Suspense>
    </Canvas>
  )
}
