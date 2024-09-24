'use client'

import { Cloud, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
//
//
//
export default function MainPage() {
  const fish = useGLTF('./model/fishswim.glb');

  return (
      <div id="canvas-container"
        style={{ 
          overflow: 'hidden',
          position: 'fixed',
          width: '100%',
          height: '100%',
          margin: '0',
          padding: '0',
          left: '0',
          top: '0',
          boxSizing: 'border-box'
        }}>
        <Canvas
        shadows={true}
        camera={{
          fov: 35,
          near: 0.1,
          far: 300,
          position: [ -4, 3, 6 ],
        }}
        >
          <color args={ [ 'skyblue' ] } attach="background" />

          <OrbitControls />

          <ambientLight intensity={ 1.5 } />
          <directionalLight />

          <Cloud />

          <primitive object={ fish.scene } scale={ 10.0 } position-y={ 3 } />
        </Canvas>
      </div>
  )
}
