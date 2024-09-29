import { useIntersect } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
//
//
//
export default function Objects() {
  const { height, width } = useThree((state) => state.viewport)

  return (
    <>
      <pointLight color="#7334ff" position={[8, -25, 5]} intensity={20} />
      <Item color="skyblue" position={[0, 2, 0]}>
        <boxGeometry />
      </Item>
      <Item color="skyblue" position={[width / 6, -height * 0.5, 0]}>
        <boxGeometry />
      </Item>
      <Item color="gray" position={[-width / 5, -height * 1.8, -2]}>
        <boxGeometry/>
      </Item>
      <Item color="white" position={[width / 4 + 4, -height * 2, 0]}>
        <boxGeometry/>
      </Item>
      <Item color="#eeeeff" position={[-width / 12 - 4.5, -height * 2.25, 0.5]}>
        <boxGeometry />
      </Item>
    </>
  )
}

function Item({ color, position, children }) {
  const visible = useRef()
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const [xRandomFactor, yRandomFactor] = useMemo(() => [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5], [])

  useFrame(({ clock }, delta) => {
    const elapsedTime = clock.getElapsedTime()

    ref.current.rotation.x = elapsedTime * xRandomFactor
    ref.current.rotation.y = elapsedTime * yRandomFactor

    const scale = THREE.MathUtils.damp(ref.current.scale.x, visible.current ? 1.5 : 0.2, 5, delta)
    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <>
      <mesh ref={ref} position={position}>
        {children}
        <meshPhysicalMaterial
          color={color}  // 선택한 색상
          roughness={0}  // 표면이 완전히 매끄럽게 (거울처럼)
          metalness={1}  // 금속성 재질
          clearcoat={1}  // 반짝임 증가
          clearcoatRoughness={0}  // 반짝이는 표면
          reflectivity={1}  // 반사 제거
        />
      </mesh>
    </>
  )
}
