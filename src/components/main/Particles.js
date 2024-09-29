import { Point, Points, useTexture } from '@react-three/drei';
import { useThree, useLoader } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

const particleColors = ['#25cefc', '#168cff', '#005afb', '#df45ff', '#9822ff', '#7334ff'];

export default function Particles({ size = 5000 }) {
  const { viewport } = useThree();
  const { width, height } = viewport;

  // PNG 텍스처 로드 (여기서 particle.png는 사용할 이미지 파일 경로)
  const particleTexture = useLoader(THREE.TextureLoader, './images/main/trace_01.png');

  return (
    <Points limit={size}>
      {/* 텍스처를 map 속성에 전달 */}
      <pointsMaterial size={0.05} transparent depthWrite={ false } alphaTest={ 0.5 } vertexColors={true} />
      {Array.from({ length: size }).map((_, i) => (
        <Point
          key={i}
          position={[
            (0.5 - Math.random()) * width * 2,
            0.5 * height + Math.random() ** 0.25 * height * -3,
            (0.5 - Math.random()) * 25,
          ]}
          color={particleColors[Math.floor(Math.random() * particleColors.length)]}
        />
      ))}
    </Points>
  );
}
