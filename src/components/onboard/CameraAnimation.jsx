// CameraAnimation.jsx
import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Rig from './Rig'

// easeInOutQuad 보간 함수
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function CameraAnimation({ controlsRef, onAnimationComplete }) {
  const { camera } = useThree()
  const animationProgress = useRef(0)
  const [isRigActive, setIsRigActive] = useState(true) // Rig 활성화 상태 관리

  const startPosition = camera.position.clone()
  const targetPosition = new THREE.Vector3(0, 10, 100)
  const duration = 5

  useEffect(() => {
    animationProgress.current = 0 // 애니메이션 초기화
  }, [])

  useFrame((state, delta) => {
    if (animationProgress.current < 1) {
      animationProgress.current += delta / duration
      const progress = Math.min(animationProgress.current, 1)
      const easedProgress = easeInOutQuad(progress)

      camera.position.lerpVectors(startPosition, targetPosition, easedProgress)

      if (progress >= 1) {
        onAnimationComplete()
        setIsRigActive(false) // 애니메이션 완료 시 Rig 비활성화
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
      camera.updateProjectionMatrix()
    }
  })

  return <Rig isActive={isRigActive} />
}
