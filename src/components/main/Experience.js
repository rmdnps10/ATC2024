// Experience.js
'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Scroll, ScrollControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import Model from './Model.js';
import Particles from './Particles.js';
import Objects from './Objects.js';
import Background from './Background.js';
import TextContent from './TextContent.js';
import { Perf } from 'r3f-perf';

export default function Experience() {
  const { camera, mouse, viewport } = useThree();
  const scroll = useScroll();

  // ScrollControls의 페이지 수 (스크롤 길이 결정)
  const pages = 3;

  useFrame((state, delta) => {
    const { height } = viewport;
    const offset = scroll.offset; // 스크롤 오프셋 (0 ~ 1 사이의 값)

    // 카메라의 목표 Y 위치 계산 (스크롤에 따라 아래로 이동)
    const targetY = -offset * height * (pages - 1);

    // 카메라 위치 및 회전 업데이트
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.1);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouse.y * 0.5, 0.1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10, 0.1);

    // 카메라 회전 업데이트
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouse.y * -Math.PI * 0.05, 0.1);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * -Math.PI * 0.05, 0.1);
  });

  return (
    <>
      <Perf />

      <ambientLight />
      <directionalLight color="red" intensity={10} />

      {/* 배경 */}
      <Background />

      {/* ScrollControls 내에 Scroll 컴포넌트로 컨텐츠 구성 */}
      <ScrollControls pages={pages}>
        {/* 3D 컨텐츠 */}
        <Scroll>
          <Particles />
          <Objects />
          {/* 모델 추가 */}
          <Model />
          {/* 스크롤에 따라 움직이는 3D 텍스트 추가 */}
          <TextContent />
        </Scroll>
      </ScrollControls>
    </>
  );
}
