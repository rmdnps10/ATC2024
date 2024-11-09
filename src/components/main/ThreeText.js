'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { Text } from '@react-three/drei'

export default function ThreeText() {
  const [fontSize, setFontSize] = useState({ main: 5, and: 7, tech: 5 })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // 모바일 환경
        setFontSize({ main: 4, and: 5.5, tech: 2.5 })
      } else { // 데스크톱 환경
        setFontSize({ main: 5, and: 7, tech: 5 })
      }
    }

    handleResize() // 초기 실행
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <group position={[0, -55, 0]}>
          <Text color="black" font='/images/main/Pretendard-Bold.woff' fontSize={fontSize.main} position={[0, 5, -19.5]} text="ART" />
          <Text color="black" font='/images/main/Pretendard-Bold.woff' fontSize={fontSize.and} position={[24, -9, -24.25]} text="&" />
          <Text color="black" font='/images/main/Pretendard-Bold.woff' fontSize={fontSize.tech} position={[64, -23, -30]} text="TECHNOLOGY" />
        </group>
        <directionalLight position={[-50, 0, -40]} intensity={0.3} />
      </Suspense>
    </>
  )
}