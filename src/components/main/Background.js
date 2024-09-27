import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import BackgroundVertexShader from './shaders/background/vertex.glsl'
import BackgroundFragmentShader from './shaders/background/fragment.glsl'

export default function Background() {
  const { size } = useThree();
  const materialRef = useRef();

  // Memoize the shader material
  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          iResolution: { value: new THREE.Vector3(size.width, size.height, 1) },
          iTime: { value: 0.0 },
        },
        vertexShader: BackgroundVertexShader,
        fragmentShader: BackgroundFragmentShader,
      }),
    [size.width, size.height]
  );

  // Update the time uniform every frame
  useFrame(({ clock }) => {
    shaderMaterial.uniforms.iTime.value = clock.getElapsedTime();
    shaderMaterial.uniforms.iResolution.value.set(size.width, size.height, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}
