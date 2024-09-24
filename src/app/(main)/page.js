'use client'

import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience.js';
//
//
//
export default function MainPage() {
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
          <Experience />
        </Canvas>
      </div>
  )
}
