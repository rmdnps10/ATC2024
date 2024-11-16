import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Preload
} from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'
import { suspend } from 'suspend-react'

extend(geometry)
const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

export const App = () => (
  //   <Canvas flat camera={{ fov: 75, position: [0, 0, 20] }} eventSource={document.getElementById('root')} eventPrefix="client">
  <>
    {/* <color
      attach="background"
      args={['#f0f0f0']}
    /> */}
    <group
      scale={20}
      position={[0, 20, 0]}>
      <Frame
        url="https://www.youtube.com"
        id="01"
        name={`film`}
        author="ATC Film Team"
        bg="#e4cdac"
        position={[-1.15, 0, 0]}
        rotation={[0, 0.5, 0]}>
        <Gltf
          src="./model/pickles_3d_version_of_hyuna_lees_illustration-transformed.glb"
          scale={8}
          position={[0, -0.7, -2]}
        />
      </Frame>
      <Frame
        id="02"
        name={'web'}
        author="ATC WEB Team">
        <Gltf
          src="./model/fiesta_tea-transformed.glb"
          position={[0, -2, -3]}
        />
      </Frame>
      <Frame
        url="https://www.instagram.com/atc.sogang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        id="03"
        name={'insta'}
        author="ATC Official"
        bg="#d1d1ca"
        position={[1.15, 0, 0]}
        rotation={[0, -0.5, 0]}>
        <Gltf
          src="./model/still_life_based_on_heathers_artwork-transformed.glb"
          scale={2}
          position={[0, -0.8, -4]}
        />
      </Frame>
    </group>
    <Rig />
    <Preload all />
  </>
  //   </Canvas>
)

function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  url,
  children,
  ...props
}) {
  const portal = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) =>
    easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt)
  )
  return (
    <group {...props}>
      <Text
        font={suspend(medium).default}
        fontSize={0.3}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
        material-toneMapped={false}>
        {name}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}>
        /{id}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.04}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}>
        {author}
      </Text>
      <mesh
        name={id}
        onClick={e => {
          e.stopPropagation()
          if (id === '02') {
            // id가 "02"일 경우 내부 페이지로 이동
            window.location.href = './..'
          } else if (url) {
            // 나머지 경우는 url prop에 따라 외부 링크로 이동
            window.open(url, '_blank')
          }
        }}
        onPointerOver={e => hover(true)}
        onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}>
          <color
            attach="background"
            args={[bg]}
          />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Rig({
  position = new THREE.Vector3(0, 0, 2),
  focus = new THREE.Vector3(0, 0, 0)
}) {
  const { controls, scene } = useThree()
  const [, params] = useRoute('/item/:id')
  useEffect(() => {
    const active = scene.getObjectByName(params?.id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return null
}
