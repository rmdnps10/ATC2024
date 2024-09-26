'use client'
import { useLoader, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { ShaderMaterial, Color } from 'three';
//
//
//
const JellyfishMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Color(0x00ffcc) }, // Jellyfish glow color
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vPosition;
    void main() {
      vPosition = position;

      // Animate the jellyfish-like movement by using a sine wave based on time
      vec3 pos = position + normal * sin(uTime + position.y * 10.0) * 0.2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vPosition;

    void main() {
      // Create a glowing effect based on distance from the center
      float intensity = pow(1.0 - length(vPosition) / 2.0, 3.0);
      gl_FragColor = vec4(uColor * intensity, 1.0);
    }
  `,
  transparent: true
});

export default function FishModel() {
  const gltf = useGLTF('./model/fishswim.glb');
  const jellyfishRef = useRef();

  useFrame(({ clock }) => {
    jellyfishRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <primitive 
      ref={jellyfishRef}
      object={gltf.scene} 
      scale={15.0} 
      position-y={3} 
      material={JellyfishMaterial}  // Apply the shader to the GLB model
    />
  );
}
