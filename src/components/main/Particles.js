// Particles.js
import { Point, Points } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import React from 'react';

const particleColors = ['#25cefc', '#168cff', '#005afb', '#df45ff', '#9822ff', '#7334ff'];

export default function Particles({ size = 5000 }) {
  const { viewport } = useThree();
  const { width, height } = viewport;

  return (
    <Points limit={size}>
      <pointsMaterial size={0.05} vertexColors />
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
