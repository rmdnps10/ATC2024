import {
  CameraControls,
  useGLTF,
  useAnimations,
  MeshPortalMaterial
} from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { geometry } from 'maath'
import CameraAnimation from './CameraAnimation'
import CameraRig from './CameraRig'

extend(geometry)

export default function MyPortal() {
  const [targetPosition, setTargetPosition] = useState(null)
  const [targetFocus, setTargetFocus] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false) // 애니메이션 완료 상태
  const controlsRef = useRef() // CameraControls의 공통 참조

  return (
    <>
      {/* 카메라 애니메이션 컴포넌트 */}
      <CameraAnimation
        controlsRef={controlsRef}
        onAnimationComplete={() => setAnimationComplete(true)}
      />
      {/* 애니메이션 완료 후에만 CameraRig 활성화 */}
      {animationComplete && (
        <CameraRig
          controlsRef={controlsRef} // CameraControls 참조 전달
          targetPosition={targetPosition}
          targetFocus={targetFocus}
        />
      )}
      <CameraControls
        ref={controlsRef} // CameraControls에 대한 참조
        minAzimuthAngle={-Math.PI / 2.5 + 0.5}
        maxAzimuthAngle={Math.PI / 2.5 - 0.5}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2 - 0.01}
        dollySpeed={0} // 마우스 휠 줌 비활성화
        truckSpeed={0} // 우클릭 팬 비활성화
      />
      <Portal1
        onClick={() => {
          setTargetPosition(new THREE.Vector3(-30, 20, 10))
          setTargetFocus(new THREE.Vector3(-30, 20, 0))
        }}
      />
      <Portal2
        onClick={() => {
          setTargetPosition(new THREE.Vector3(0, 20, 10))
          setTargetFocus(new THREE.Vector3(0, 20, -10))
        }}
      />
      <Portal3
        onClick={() => {
          setTargetPosition(new THREE.Vector3(30, 20, 10))
          setTargetFocus(new THREE.Vector3(30, 20, 0))
        }}
      />
    </>
  )
}

function Portal1({ onClick }) {
  const portalRef = useRef()
  const GOLDENRATIO = 1.61803398875

  return (
    <group
      position={[-30, 0, 0]}
      rotation={[0, 0.5, 0]}>
      <mesh
        name={'Film'}
        position={[0, 20, 0]}
        onClick={onClick}>
        <roundedPlaneGeometry args={[20, 20 * GOLDENRATIO, 3]} />
        <MeshPortalMaterial
          ref={portalRef}
          blend={0}>
          <color
            attach="background"
            args={['#005afb']}
          />
          <CakeModel />
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

// Portal2와 Portal3도 동일하게 onClick 이벤트 설정
function Portal2({ onClick }) {
  const portalRef = useRef()
  const GOLDENRATIO = 1.61803398875

  return (
    <group
      position={[0, 0, -10]}
      rotation={[0, 0, 0]}>
      <mesh
        name={'MainPage'}
        position={[0, 20, 0]}
        onClick={onClick}>
        <roundedPlaneGeometry args={[20, 20 * GOLDENRATIO, 3]} />
        <MeshPortalMaterial
          ref={portalRef}
          blend={0}>
          <color
            attach="background"
            args={['#FFFFFF']}
          />
          <FishModel />
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Portal3({ onClick }) {
  const portalRef = useRef()
  const GOLDENRATIO = 1.61803398875

  return (
    <group
      position={[30, 0, 0]}
      rotation={[0, -0.5, 0]}>
      <mesh
        name={'Instagram'}
        position={[0, 20, 0]}
        onClick={onClick}>
        <roundedPlaneGeometry args={[20, 20 * GOLDENRATIO, 3]} />
        <MeshPortalMaterial
          ref={portalRef}
          blend={0}>
          <color
            attach="background"
            args={['#7334ff']}
          />
          <StarModel />
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function FishModel({ clip, color = '#000000', ...props }) {
  const { scene: fishScene, animations: fishAnimations } = useGLTF(
    './model/fishfast.glb'
  )
  const { actions } = useAnimations(fishAnimations, fishScene)

  const action = actions[fishAnimations[0].name]
  action.play()

  const fishRef = useRef()

  useEffect(() => {
    fishScene.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color }) // 임의 색상 적용
      }
    })
  }, [fishScene, color])

  useFrame(() => {
    if (fishRef.current) {
      fishRef.current.rotation.y += 0.01
    }
  })

  return (
    <primitive
      ref={fishRef}
      object={fishScene}
      scale={75}
      position={[0, -5, -15]}
    />
  )
}

function CakeModel({ clip, color = '#25CEFC', ...props }) {
  const { scene } = useGLTF('./model/ATC_cake.glb')
  const CakeRef = useRef()

  // 모델의 모든 Mesh에 임의의 색상 적용
  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color }) // 임의 색상 적용
      }
    })
  }, [scene, color])

  // 회전 애니메이션
  useFrame(() => {
    if (CakeRef.current) {
      //   CakeRef.current.rotation.x += -0.005
      CakeRef.current.rotation.y += 0.01
      CakeRef.current.rotation.z += -0.005
    }
  })

  return (
    <primitive
      ref={CakeRef}
      object={scene}
      scale={40}
      position={[0, 0, -15]}
      {...props}
    />
  )
}

function StarModel({ clip, color = '#de45ff', ...props }) {
  const { scene } = useGLTF('./model/StarCrystal2.glb')
  const StarRef = useRef()

  // 모델의 모든 Mesh에 임의의 색상 적용
  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color }) // 임의 색상 적용
      }
    })
  }, [scene, color])

  // 회전 애니메이션
  useFrame(() => {
    if (StarRef.current) {
      //   StarRef.current.rotation.x += -0.005
      StarRef.current.rotation.y += 0.01
      StarRef.current.rotation.z += 0.005
    }
  })

  return (
    <primitive
      ref={StarRef}
      object={scene}
      scale={5}
      position={[0, 0, -15]}
      rotation-z={Math.PI * 0.5}
      {...props}
    />
  )
}
