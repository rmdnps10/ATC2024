import { useGLTF, useAnimations, MeshPortalMaterial } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { geometry } from 'maath'

extend(geometry)

export default function MyPortal() {
  return (
    <>
      <Portal1 />
      <Portal2 />
      <Portal3 />
    </>
  )
}

function Portal1() {
  const portalRef = useRef()
  const GOLDENRATIO = 1.61803398875

  return (
    <group
      position={[-30, 0, 0]}
      rotation={[0, 0.5, 0]}>
      <mesh
        name={1}
        position={[0, 20, 0]}>
        <roundedPlaneGeometry args={[20, 20 * GOLDENRATIO, 3]} />
        <MeshPortalMaterial
          ref={portalRef}
          blend={0}
          // events={true}
          // side={THREE.DoubleSide}
        >
          <color
            attach="background"
            args={['#005afb']}
          />
          {/* <mesh position={[0, 0, -10]}>
            <boxGeometry args={[2, 10, 2]} />
            <meshBasicMaterial color={'#25CEFC'} />
          </mesh> */}
          {/* <ambientLight />
          <directionalLight position={[0, 0, 15]} /> */}
          <CakeModel />
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Portal2() {
  const portalRef = useRef()
  const GOLDENRATIO = 1.61803398875

  return (
    <group
      position={[0, 0, -10]}
      rotation={[0, 0, 0]}>
      <mesh
        name={2}
        position={[0, 20, 0]}>
        <roundedPlaneGeometry args={[20, 20 * GOLDENRATIO, 3]} />
        <MeshPortalMaterial
          ref={portalRef}
          blend={0}
          // events={true}
          // side={THREE.DoubleSide}
        >
          <color
            attach="background"
            args={['#FFFFFF']}
          />
          {/* <ambientLight />
          <directionalLight position={[0, 0, 15]} /> */}
          <FishModel />
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Portal3() {
  const portalRef = useRef()
  const GOLDENRATIO = 1.61803398875

  return (
    <group
      position={[30, 0, 0]}
      rotation={[0, -0.5, 0]}>
      <mesh
        name={3}
        position={[0, 20, 0]}>
        <roundedPlaneGeometry args={[20, 20 * GOLDENRATIO, 3]} />
        <MeshPortalMaterial
          ref={portalRef}
          blend={0}
          // events={true}
          // side={THREE.DoubleSide}
        >
          <color
            attach="background"
            args={['#7334ff']}
          />
          {/* <mesh position={[0, 0, -10]}>
            <boxGeometry args={[2, 10, 2]} />
            <meshBasicMaterial color={'#de45ff'} />
          </mesh> */}
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
      StarRef.current.rotation.z += -0.005
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
