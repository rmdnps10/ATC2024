// Rig.jsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Rig({ isActive }) {
  const { camera, mouse } = useThree()
  const ref = useRef()
  const vec = new THREE.Vector3()

  useFrame(() => {
    if (isActive) {
      // Rig 활성화 시 카메라 위치 및 회전을 마우스에 따라 적용
      camera.position.lerp(vec.set(mouse.x * 1, 0, 3.5), 0.05)
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        -mouse.y * 0.2,
        0.1
      )
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        mouse.x * 0.2,
        0.1
      )

      // Rig 그룹의 위치 및 회전 업데이트
      if (ref.current) {
        ref.current.position.lerp(
          vec.set(-mouse.x * 0.5, -mouse.y * 0.1, 0),
          0.1
        )
        ref.current.rotation.y = THREE.MathUtils.lerp(
          ref.current.rotation.y,
          (-mouse.x * Math.PI) / 40,
          0.1
        )
      }
    }
  })

  return <group ref={ref} />
}
