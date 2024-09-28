// Experience.js
'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import Model from './Model';
import Background from './Background';
import { Perf } from 'r3f-perf';

export default function Experience({ scroll }) {
  const { camera } = useThree();

  // 카메라 초기 위치 설정
  useEffect(() => {
    camera.position.set(0, 0, 10);
  }, [camera]);

  useFrame(() => {
    const scrollOffset = scroll.current; // 0에서 1 사이의 값

    // 스크롤 값에 따라 카메라 위치와 각도 업데이트
    const targetPositionZ = 10 - scrollOffset * 20; // 카메라 Z축 이동
    const targetRotationX = scrollOffset * Math.PI * 0.2; // 카메라 X축 회전

    // 부드러운 이동을 위해 보간 처리
    camera.position.z += (targetPositionZ - camera.position.z) * 0.1;
    camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.1;
  });

  return (
    <>
      <Perf />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Background />

      <Model scroll={scroll} />
    </>
  );
}
