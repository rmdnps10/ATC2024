// CameraAnimation.jsx
import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import gsap from 'gsap'

export default function CameraAnimation() {
  const { camera } = useThree() // 기본 카메라를 가져옵니다.
  const animationPlayed = useRef(false) // 애니메이션이 실행되었는지 여부를 추적합니다.
  const [controlsEnabled, setControlsEnabled] = useState(false) // CameraControls 활성화 여부를 추적합니다.
  const controlsRef = useRef() // CameraControls에 대한 참조

  useEffect(() => {
    if (!animationPlayed.current) {
      animationPlayed.current = true // 애니메이션이 실행되었음을 표시

      // GSAP를 사용하여 카메라 위치 애니메이션
      gsap.to(camera.position, {
        x: 0,
        y: 10,
        z: 75,
        duration: 5, // 5초간 애니메이션
        ease: 'power2.inOut',
        onComplete: () => {
          // 애니메이션이 끝난 후 CameraControls를 활성화하고 위치 동기화
          setControlsEnabled(true)

          // CameraControls의 목표 위치를 현재 카메라 위치와 동기화
          if (controlsRef.current) {
            controlsRef.current.setLookAt(
              camera.position.x,
              camera.position.y,
              camera.position.z,
              0, // 카메라가 바라볼 x 좌표
              10, // 카메라가 바라볼 y 좌표
              0 // 카메라가 바라볼 z 좌표
            )
          }
        }
      })
    }
  }, [camera])

  return (
    <>
      {/* controlsEnabled로 CameraControls 활성화 제어 */}
      <CameraControls
        ref={controlsRef} // CameraControls에 대한 참조
        enabled={controlsEnabled} // 애니메이션 중에는 비활성화, 끝난 후 활성화
        minAzimuthAngle={-Math.PI / 2.5 + 0.25}
        maxAzimuthAngle={Math.PI / 2.5 - 0.25}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2 - 0.01}
        dollySpeed={0} // 마우스 휠 줌 비활성화
        truckSpeed={0} // 우클릭 팬 비활성화
      />
    </>
  )
}
