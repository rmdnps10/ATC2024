'use client'

import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'

extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree(state => state.gl)
  const waterNormals = useLoader(
    THREE.TextureLoader,
    './model/textures/ocean/waternormals.jpeg'
  )
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(3000, 3000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x005afb,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta)
  )
  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
    />
  )
}

function Box() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
    ref.current.rotation.x =
      ref.current.rotation.y =
      ref.current.rotation.z +=
        delta
  })
  return (
    <mesh
      ref={ref}
      scale={20}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

export default function App() {
  return (
    <>
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <Ocean />
      {/* <Box /> */}
      <Sky
        scale={1000}
        sunPosition={[500, 150, -1000]}
        turbidity={0.1}
      />
    </>
  )
}
