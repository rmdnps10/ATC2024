'use client'

import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Reflector, Text, useTexture } from '@react-three/drei'
import Model from './Model'
//
//
export default function VideoText() {
  return (
    <>
      <Suspense fallback={null}>
        <group position={[0, -22, 0]}>
          <TextVideo position={[0, 1.3, -2]} />
          {/* <Ground /> */}
          <Wall />
          <Model />
        </group>
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.3} />
      </Suspense>
    </>
  )
}

function TextVideo(props) {
  return (
    <Text fontSize={3} letterSpacing={-0.06}  {...props} >
      ABOUT
      <meshBasicMaterial toneMapped={false}>
      </meshBasicMaterial>
    </Text>
  )
}

function Ground() {
  const [floor, normal] = useTexture(['./images/main/SurfaceImperfections003_1K_var1.jpg', './images/main/SurfaceImperfectionsNormal.jpg'])
  return (
    <Reflector blur={[400, 100]} resolution={512} args={[13, 13]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-x={4}>
      {(Material, props) => <Material color="white" metalness={0.5} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
    </Reflector>
  )
}

function Wall() {
  const [floor, normal] = useTexture(['./images/main/SurfaceImperfections003_1K_var1.jpg', './images/main/SurfaceImperfectionsNormal.jpg'])
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[5, 18]}
      mirror={1.0}
      mixBlur={6}
      mixStrength={1.5}
      rotation={[0, 0, Math.PI / 2]}
      position={[4, 0, -7]}
    >
      {(Material, props) => (
        <Material
          color="white"
          metalness={0.5}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[2, 2]}
          {...props}
        />
      )}
    </Reflector>
  )
}
