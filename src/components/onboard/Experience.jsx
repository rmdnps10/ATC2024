"use client";

import { useRef, useEffect } from 'react';
import { CameraControls, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
  const cameraControlsRef = useRef();

  // 카메라 애니메이션을 설정하는 useEffect
  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        0, 2, 10, // 카메라가 시작할 위치
        0, 0, 0,  // 카메라가 바라볼 위치
        true      // 애니메이션 활성화
      );
    }
  }, []); // 처음 한 번 실행

  return (
    <>
      {/* 카메라 컨트롤 */}
      <CameraControls ref={cameraControlsRef} />
      <OrbitControls makeDefault /> {/* 카메라 회전 제어 */}
      
      {/* 배경색과 3D 오브젝트 */}
      <color args={[0, 0, 0]} attach="background" />
      
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
}