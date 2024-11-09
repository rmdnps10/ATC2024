import {
  CameraControls,
  useGLTF,
  useAnimations,
  MeshPortalMaterial,
  Html // Html 컴포넌트를 import
} from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { geometry } from 'maath'
import CameraAnimation from './CameraAnimation'
import CameraRig from './CameraRig'
import styles from './MyPortal.module.css' // CSS 모듈 import

extend(geometry)

export default function MyPortal({
  setRigActive,
  nextPortalRef,
  prevPortalRef
}) {
  const [targetPosition, setTargetPosition] = useState(null)
  const [targetFocus, setTargetFocus] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [currentPortal, setCurrentPortal] = useState(0)
  const controlsRef = useRef() // CameraControls의 공통 참조

  const portalPositions = [
    {
      position: new THREE.Vector3(-30, 20, 10),
      focus: new THREE.Vector3(-30, 20, 0)
    },
    {
      position: new THREE.Vector3(0, 20, 10),
      focus: new THREE.Vector3(0, 20, -10)
    },
    {
      position: new THREE.Vector3(30, 20, 10),
      focus: new THREE.Vector3(30, 20, 0)
    }
  ]

  const goToNextPortal = () => {
    const nextIndex = (currentPortal + 1) % portalPositions.length
    setCurrentPortal(nextIndex)
    setTargetPosition(portalPositions[nextIndex].position)
    setTargetFocus(portalPositions[nextIndex].focus)
    setRigActive(true)
  }

  const goToPreviousPortal = () => {
    const prevIndex =
      (currentPortal - 1 + portalPositions.length) % portalPositions.length
    setCurrentPortal(prevIndex)
    setTargetPosition(portalPositions[prevIndex].position)
    setTargetFocus(portalPositions[prevIndex].focus)
    setRigActive(true)
  }

  // nextPortalRef와 prevPortalRef에 포탈 전환 함수 할당
  useEffect(() => {
    nextPortalRef.current = goToNextPortal
    prevPortalRef.current = goToPreviousPortal
  }, [nextPortalRef, prevPortalRef, goToNextPortal, goToPreviousPortal])

  return (
    <>
      <CameraAnimation
        controlsRef={controlsRef}
        onAnimationComplete={() => setAnimationComplete(true)}
      />
      <CameraRig
        controlsRef={controlsRef}
        enabled={animationComplete}
        targetPosition={targetPosition}
        targetFocus={targetFocus}
        onRigActivate={() => setRigActive(true)} // CameraRig 활성화 시 상태 변경
      />
      <CameraControls
        ref={controlsRef}
        enabled={animationComplete}
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
          setCurrentPortal(0)
          setRigActive(true)
        }}
      />
      <Portal2
        onClick={() => {
          setTargetPosition(new THREE.Vector3(0, 20, 10))
          setTargetFocus(new THREE.Vector3(0, 20, -10))
          setCurrentPortal(1)
          setRigActive(true)
        }}
      />
      <Portal3
        onClick={() => {
          setTargetPosition(new THREE.Vector3(30, 20, 10))
          setTargetFocus(new THREE.Vector3(30, 20, 0))
          setCurrentPortal(2)
          setRigActive(true)
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
      //   rotation={[0, 0.5, 0]}
    >
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
      position={[0, 0, 0]}
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
      //   rotation={[0, -0.5, 0]}
    >
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
