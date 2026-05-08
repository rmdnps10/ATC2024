import {
  Html,
  CameraControls,
  useGLTF,
  useAnimations,
  MeshPortalMaterial
} from '@react-three/drei'
import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from 'react'

import * as THREE from 'three'
import { useFrame, extend } from '@react-three/fiber'
import { geometry } from 'maath'
import CameraAnimation from './CameraAnimation'
import CameraRig from './CameraRig'
import gsap from 'gsap'
import styles from './MyPortal.module.css'

extend(geometry)

export default function MyPortal({
  rigActive,
  setRigActive,
  nextPortalRef,
  prevPortalRef,
  centerPortalRef
}) {
  const [targetPosition, setTargetPosition] = useState(null)
  const [targetFocus, setTargetFocus] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [currentPortal, setCurrentPortal] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const controlsRef = useRef()
  const portalRef0 = useRef()
  const portalRef1 = useRef()
  const portalRef2 = useRef()
  // 배열을 useMemo로 안정화 → useCallback deps에서 배열 재생성 방지
  const portalRefs = useMemo(() => [portalRef0, portalRef1, portalRef2], [])

  // Vector3 객체를 컴포넌트 렌더마다 재생성하지 않도록 useMemo로 고정
  const portalPositions = useMemo(
    () => [
      {
        position: new THREE.Vector3(-35, 20, 15),
        focus: new THREE.Vector3(-35, 20, 0),
        description: 'ATC FILM',
        link: 'https://www.youtube.com/watch?v=F1Kab1fGy0A'
      },
      {
        position: new THREE.Vector3(0, 20, 15),
        focus: new THREE.Vector3(0, 20, 0),
        description: 'ATC WEB',
        link: './..'
      },
      {
        position: new THREE.Vector3(35, 20, 15),
        focus: new THREE.Vector3(35, 20, 0),
        description: 'ATC INSTAGRAM',
        link: 'https://www.instagram.com/atc.sogang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
      }
    ],
    []
  )

  // excludeIndex 포털을 제외한 나머지 blend를 0으로 닫는 함수
  // excludeIndex = -1 이면 전체 닫기 (center로 돌아갈 때)
  const closePortals = useCallback(
    (excludeIndex = -1) => {
      portalRefs.forEach((ref, index) => {
        if (index === excludeIndex || !ref.current) return
        gsap.killTweensOf(ref.current)
        gsap.to(ref.current, { blend: 0, duration: 1 })
      })
    },
    [portalRefs]
  )

  // 특정 포털을 여는 함수: 기존 트윈 kill 후 blend 1 애니메이션
  const openPortal = useCallback(
    index => {
      gsap.killTweensOf(portalRefs[index].current)
      gsap.to(portalRefs[index].current, { blend: 1, duration: 1 })
    },
    [portalRefs]
  )

  const goToNextPortal = useCallback(() => {
    const nextIndex = (currentPortal + 1) % portalPositions.length
    closePortals(nextIndex)
    openPortal(nextIndex)
    setCurrentPortal(nextIndex)
    setTargetPosition(portalPositions[nextIndex].position)
    setTargetFocus(portalPositions[nextIndex].focus)
    setRigActive(true)
  }, [currentPortal, portalPositions, closePortals, openPortal, setRigActive])

  const goToPreviousPortal = useCallback(() => {
    const prevIndex =
      (currentPortal - 1 + portalPositions.length) % portalPositions.length
    closePortals(prevIndex)
    openPortal(prevIndex)
    setCurrentPortal(prevIndex)
    setTargetPosition(portalPositions[prevIndex].position)
    setTargetFocus(portalPositions[prevIndex].focus)
    setRigActive(true)
  }, [currentPortal, portalPositions, closePortals, openPortal, setRigActive])

  const goToCenterPortal = useCallback(() => {
    setTargetPosition(new THREE.Vector3(0, 10, 100))
    setTargetFocus(new THREE.Vector3(0, 20, -10))
    setRigActive(false)
    closePortals(-1)
  }, [closePortals, setRigActive])

  // useCallback으로 안정화된 함수만 dep에 넣어 매 렌더마다 ref 재할당 방지
  useEffect(() => {
    nextPortalRef.current = goToNextPortal
    prevPortalRef.current = goToPreviousPortal
    centerPortalRef.current = goToCenterPortal
  }, [goToNextPortal, goToPreviousPortal, goToCenterPortal])

  // hover 핸들러를 useCallback으로 안정화
  const handlePointerOver = useCallback(() => setIsHovered(true), [])
  const handlePointerOut = useCallback(() => setIsHovered(false), [])

  const handlePortalClick = useCallback(
    index => {
      if (!animationComplete) return
      closePortals(index)
      openPortal(index)
      setCurrentPortal(index)
      setTargetPosition(portalPositions[index].position)
      setTargetFocus(portalPositions[index].focus)
      setRigActive(true)
    },
    [animationComplete, portalPositions, closePortals, openPortal, setRigActive]
  )

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
        minPolarAngle={0.5 + 0.5}
        maxPolarAngle={Math.PI / 2 - 0.01}
        dollySpeed={0}
        truckSpeed={0}
      />

      {rigActive && (
        <Html
          position={[
            portalPositions[currentPortal].position.x,
            portalPositions[currentPortal].position.y,
            portalPositions[currentPortal].position.z - 30
          ]}
          center>
          <div className={styles.portalDescription}>
            {portalPositions[currentPortal].description}
            <button
              className={styles.portalLinkButton}
              onClick={e => {
                e.stopPropagation()
                if (currentPortal === 1) {
                  window.location.href = portalPositions[currentPortal].link
                } else if (portalPositions[currentPortal].link) {
                  window.open(portalPositions[currentPortal].link, '_blank')
                }
              }}>
              Go !
            </button>
          </div>
          <div
            className={isHovered ? styles.hoverCursor : ''}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          />
        </Html>
      )}

      <Portal1
        ref={portalRef0}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handlePortalClick(0)}
      />
      <Portal2
        ref={portalRef1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handlePortalClick(1)}
      />
      <Portal3
        ref={portalRef2}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handlePortalClick(2)}
      />
    </>
  )
}

// blend prop 제거: GSAP이 THREE material을 직접 조작하므로 React가 값을 덮어쓰지 않도록 함
// isActive=false일 때 모델을 언마운트 → FBO 씬이 배경색만 렌더링 (GPU 비용 절감)
const Portal1 = forwardRef(({ onClick, onPointerOver, onPointerOut }, ref) => (
  <group position={[-35, 0, 0]}>
    <mesh
      name={'Film'}
      position={[0, 20, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}>
      <roundedPlaneGeometry args={[20, 20 * 1.61803398875, 3]} />
      <MeshPortalMaterial ref={ref}>
        <color
          attach="background"
          args={['#005afb']}
        />
        <CakeModel />
      </MeshPortalMaterial>
    </mesh>
  </group>
))

const Portal2 = forwardRef(({ onClick, onPointerOver, onPointerOut }, ref) => (
  <group position={[0, 0, 0]}>
    <mesh
      name={'MainPage'}
      position={[0, 20, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}>
      <roundedPlaneGeometry args={[20, 20 * 1.61803398875, 3]} />
      <MeshPortalMaterial ref={ref}>
        <color
          attach="background"
          args={['#FFFFFF']}
        />
        <FishModel />
      </MeshPortalMaterial>
    </mesh>
  </group>
))

const Portal3 = forwardRef(({ onClick, onPointerOver, onPointerOut }, ref) => (
  <group position={[35, 0, 0]}>
    <mesh
      name={'Instagram'}
      position={[0, 20, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}>
      <roundedPlaneGeometry args={[20, 20 * 1.61803398875, 3]} />
      <MeshPortalMaterial ref={ref}>
        <color
          attach="background"
          args={['#7334ff']}
        />
        <StarModel />
      </MeshPortalMaterial>
    </mesh>
  </group>
))

function FishModel({ color = '#000000' }) {
  const { scene: fishScene, animations: fishAnimations } = useGLTF(
    './model/fishfast.glb'
  )
  const { actions } = useAnimations(fishAnimations, fishScene)
  const fishRef = useRef()

  useEffect(() => {
    actions[fishAnimations[0].name]?.play()
  }, [actions, fishAnimations])

  useEffect(() => {
    fishScene.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color })
      }
    })
  }, [fishScene, color])

  useFrame(() => {
    if (fishRef.current) fishRef.current.rotation.y += 0.01
  })

  return (
    <primitive
      ref={fishRef}
      object={fishScene}
      scale={75}
      position={[0, -5, -5]}
    />
  )
}

function CakeModel({ color = '#25CEFC' }) {
  const { scene } = useGLTF('./model/ATC_cake.glb')
  const CakeRef = useRef()

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color })
      }
    })
  }, [scene, color])

  useFrame(() => {
    if (CakeRef.current) {
      CakeRef.current.rotation.y += 0.01
      CakeRef.current.rotation.z += -0.01
    }
  })

  return (
    <primitive
      ref={CakeRef}
      object={scene}
      scale={40}
      position={[0, 0, -5]}
    />
  )
}

function StarModel({ color = '#de45ff' }) {
  const { scene } = useGLTF('./model/StarCrystal2.glb')
  const StarRef = useRef()

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({ color })
      }
    })
  }, [scene, color])

  useFrame(() => {
    if (StarRef.current) StarRef.current.rotation.y += 0.01
  })

  return (
    <primitive
      ref={StarRef}
      object={scene}
      scale={7}
      position={[0, 0, -5]}
      rotation-z={Math.PI * 0.5}
    />
  )
}
