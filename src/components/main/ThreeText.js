'use client'

import React, { Suspense } from 'react'
import { Text } from '@react-three/drei'
//
//
//
export default function ThreeText() {
  return (
    <>
      <Suspense fallback={null}>
        <group position={[0, -55, 0]}>
          <Text color="black" font='/images/main/Pretendard-Bold.woff' fontSize={5} position={[0, 5, -19.5]} text="ART" />
          <Text color="black" font='/images/main/Pretendard-Bold.woff' fontSize={7} position={[24, -9, -24.25]} text="&" />
          <Text color="black" font='/images/main/Pretendard-Bold.woff' fontSize={5} position={[64, -23, -30]} text="TECHNOLOGY" />
        </group>
        <directionalLight position={[-50, 0, -40]} intensity={0.3} />
      </Suspense>
    </>
  )
}