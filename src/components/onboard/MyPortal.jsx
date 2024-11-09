import {
  CameraControls,
  useGLTF,
  useAnimations,
  MeshPortalMaterial,
  Html
} from '@react-three/drei'
import { forwardRef, useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { geometry } from 'maath'
import CameraAnimation from './CameraAnimation'
import CameraRig from './CameraRig'
import gsap from 'gsap'
import styles from './MyPortal.module.css'

extend(geometry)

export default function MyPortal({
  setRigActive,
  nextPortalRef,
  prevPortalRef,
  centerPortalRef
}) {
  const [targetPosition, setTargetPosition] = useState(null)
  const [targetFocus, setTargetFocus] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [currentPortal, setCurrentPortal] = useState(0)
  const controlsRef = useRef()
  const portalRefs = [useRef(), useRef(), useRef()]

  const portalPositions = [
    {
      position: new THREE.Vector3(-40, 20, 15),
      focus: new THREE.Vector3(-40, 20, 0)
    },
    {
      position: new THREE.Vector3(0, 20, 15),
      focus: new THREE.Vector3(0, 20, 0)
    },
    {
      position: new THREE.Vector3(40, 20, 15),
      focus: new THREE.Vector3(40, 20, 0)
    }
  ]

  const updateBlendValues = blendValue => {
    portalRefs.forEach(ref => {
      if (ref.current) {
        gsap.to(ref.current, { blend: blendValue, duration: 1 })
      }
    })
  }

  const goToNextPortal = () => {
    updateBlendValues(0)
    const nextIndex = (currentPortal + 1) % portalPositions.length
    setCurrentPortal(nextIndex)
    setTargetPosition(portalPositions[nextIndex].position)
    setTargetFocus(portalPositions[nextIndex].focus)
    setRigActive(true)
    gsap.to(portalRefs[nextIndex].current, { blend: 1, duration: 1 })
  }

  const goToPreviousPortal = () => {
    updateBlendValues(0)
    const prevIndex =
      (currentPortal - 1 + portalPositions.length) % portalPositions.length
    setCurrentPortal(prevIndex)
    setTargetPosition(portalPositions[prevIndex].position)
    setTargetFocus(portalPositions[prevIndex].focus)
    setRigActive(true)
    gsap.to(portalRefs[prevIndex].current, { blend: 1, duration: 1 })
  }

  const goToCenterPortal = () => {
    setTargetPosition(new THREE.Vector3(0, 10, 100))
    setTargetFocus(new THREE.Vector3(0, 20, -10))
    updateBlendValues(0)
    setRigActive(false)
  }

  useEffect(() => {
    nextPortalRef.current = goToNextPortal
    prevPortalRef.current = goToPreviousPortal
    centerPortalRef.current = goToCenterPortal
  }, [
    nextPortalRef,
    prevPortalRef,
    centerPortalRef,
    goToNextPortal,
    goToPreviousPortal,
    goToCenterPortal
  ])

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
      />
      <CameraControls
        ref={controlsRef}
        enabled={animationComplete}
        minAzimuthAngle={-Math.PI / 2.5 + 0.5}
        maxAzimuthAngle={Math.PI / 2.5 - 0.5}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2 - 0.01}
        dollySpeed={0}
        truckSpeed={0}
      />
      <Portal1
        ref={portalRefs[0]}
        onClick={() => {
          setTargetPosition(new THREE.Vector3(-40, 20, 15))
          setTargetFocus(new THREE.Vector3(-40, 20, 0))
          setCurrentPortal(0)
          updateBlendValues(0)
          gsap.to(portalRefs[0].current, { blend: 1, duration: 1 })
          setRigActive(true)
        }}
      />
      <Portal2
        ref={portalRefs[1]}
        onClick={() => {
          setTargetPosition(new THREE.Vector3(0, 20, 15))
          setTargetFocus(new THREE.Vector3(0, 20, 0))
          setCurrentPortal(1)
          updateBlendValues(0)
          gsap.to(portalRefs[1].current, { blend: 1, duration: 1 })
          setRigActive(true)
        }}
      />
      <Portal3
        ref={portalRefs[2]}
        onClick={() => {
          setTargetPosition(new THREE.Vector3(40, 20, 15))
          setTargetFocus(new THREE.Vector3(40, 20, 0))
          setCurrentPortal(2)
          updateBlendValues(0)
          gsap.to(portalRefs[2].current, { blend: 1, duration: 1 })
          setRigActive(true)
        }}
      />
    </>
  )
}

const Portal1 = forwardRef(({ onClick }, ref) => (
  <group position={[-40, 0, 0]}>
    <mesh
      name={'Film'}
      position={[0, 20, 0]}
      onClick={onClick}>
      <roundedPlaneGeometry args={[20, 20 * 1.61803398875, 3]} />
      <MeshPortalMaterial
        ref={ref}
        blend={0}>
        <color
          attach="background"
          args={['#005afb']}
        />
        <CakeModel />
      </MeshPortalMaterial>
    </mesh>
  </group>
))

const Portal2 = forwardRef(({ onClick }, ref) => (
  <group position={[0, 0, 0]}>
    <mesh
      name={'MainPage'}
      position={[0, 20, 0]}
      onClick={onClick}>
      <roundedPlaneGeometry args={[20, 20 * 1.61803398875, 3]} />
      <MeshPortalMaterial
        ref={ref}
        blend={0}>
        <color
          attach="background"
          args={['#FFFFFF']}
        />
        <FishModel />
      </MeshPortalMaterial>
    </mesh>
  </group>
))

const Portal3 = forwardRef(({ onClick }, ref) => (
  <group position={[40, 0, 0]}>
    <mesh
      name={'Instagram'}
      position={[0, 20, 0]}
      onClick={onClick}>
      <roundedPlaneGeometry args={[20, 20 * 1.61803398875, 3]} />
      <MeshPortalMaterial
        ref={ref}
        blend={0}>
        <color
          attach="background"
          args={['#7334ff']}
        />
        <StarModel />
      </MeshPortalMaterial>
    </mesh>
  </group>
))

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
      position={[0, -5, -10]}
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
      CakeRef.current.rotation.z += -0.01
    }
  })

  return (
    <primitive
      ref={CakeRef}
      object={scene}
      scale={40}
      position={[0, 0, -10]}
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
      StarRef.current.rotation.z += 0.01
    }
  })

  return (
    <primitive
      ref={StarRef}
      object={scene}
      scale={5}
      position={[0, 0, -10]}
      rotation-z={Math.PI * 0.5}
      {...props}
    />
  )
}
