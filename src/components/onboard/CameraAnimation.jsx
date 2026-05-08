import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Rig from './Rig'

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function CameraAnimation({ controlsRef, onAnimationComplete }) {
  const { camera } = useThree()
  const animationProgress = useRef(0)
  const [isRigActive, setIsRigActive] = useState(true)

  // 마운트 시점의 카메라 위치를 ref로 캡처 → 렌더마다 .clone() 재호출 방지
  const startPosition = useRef(null)
  const targetPosition = useRef(new THREE.Vector3(0, 10, 100))
  const duration = 5

  useEffect(() => {
    animationProgress.current = 0
    startPosition.current = camera.position.clone()
  }, [])

  useFrame((state, delta) => {
    if (animationProgress.current >= 1) return

    animationProgress.current += delta / duration
    const progress = Math.min(animationProgress.current, 1)
    const easedProgress = easeInOutQuad(progress)

    if (startPosition.current) {
      camera.position.lerpVectors(
        startPosition.current,
        targetPosition.current,
        easedProgress
      )
    }

    if (progress >= 1) {
      onAnimationComplete()
      setIsRigActive(false)
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
      // camera.position 변경은 투영 행렬에 영향 없음 → updateProjectionMatrix 불필요
    }
  })

  return <Rig isActive={isRigActive} />
}
