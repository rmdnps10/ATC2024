// CameraAnimation.jsx
import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'

// easeInOutQuad 보간 함수
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function CameraAnimation({ controlsRef, onAnimationComplete }) {
  const { camera } = useThree()
  const animationProgress = useRef(0) // 애니메이션 진행 상태를 추적
  const animationPlayed = useRef(false)

  // 목표 위치 및 애니메이션 설정
  const startPosition = camera.position.clone()
  const targetPosition = { x: 0, y: 10, z: 100 }
  const duration = 5 // 애니메이션 지속 시간 (초)

  useEffect(() => {
    if (!animationPlayed.current) {
      animationPlayed.current = true // 애니메이션이 이미 시작됨을 표시
    }
  }, [])

  useFrame((state, delta) => {
    if (animationPlayed.current && animationProgress.current < 1) {
      animationProgress.current += delta / duration
      const progress = Math.min(animationProgress.current, 1)
      const easedProgress = easeInOutQuad(progress) // 부드러운 이동 적용

      // 선형 보간을 사용하여 카메라 위치 업데이트
      camera.position.lerpVectors(startPosition, targetPosition, easedProgress)

      // 진행률이 1에 도달하면 애니메이션 완료 처리
      if (progress >= 1) {
        onAnimationComplete() // 애니메이션 완료 상태 전달

        // CameraControls의 목표 위치를 현재 카메라 위치와 동기화
        if (controlsRef.current) {
          controlsRef.current.setLookAt(
            camera.position.x,
            camera.position.y,
            camera.position.z,
            0,
            8.5,
            -10
          )
        }
      }

      // 카메라의 프로젝션 매트릭스 업데이트
      camera.updateProjectionMatrix()
    }
  })

  return null
}
