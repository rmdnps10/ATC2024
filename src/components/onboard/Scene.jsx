"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

// 기본 카메라 애니메이션
function CameraAnimation() {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    // 카메라 초기 위치 설정 (멀리 떨어진 위치에서 시작)
    camera.position.set(0, 0, 20);

    // 카메라 애니메이션 (박스로 이동)
    gsap.to(camera.position, {
      x: 0, // 목표 좌표 (박스와 같은 위치)
      y: 0,
      z: 3,
      duration: 7, // 7초 동안 이동
      ease: "power2.inOut",
      onComplete: () => {
        camera.lookAt(0, 0, 0); // 애니메이션이 끝난 후 박스를 바라보도록 설정
      },
    });
  }, [camera]);
}

// 마우스에 따른 카메라 애니메이션 + 회전 추가
function Rig({ children }) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();

  useFrame(() => {
    // 카메라의 위치가 마우스 X축과 Y축에 따라 부드럽게 이동
    camera.position.lerp(vec.set(mouse.x * 1, 0, 3.5), 0.05);

    // 카메라 회전을 마우스 위치에 따라 적용
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x * 0.75, -mouse.y * 0.3, 0.1); // 마우스 Y축에 따른 카메라 피치 회전 (상하)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y * 0.75, mouse.x * 0.2, 0.1);  // 마우스 X축에 따른 카메라 요 회전 (좌우)

    // 오브젝트 그룹의 위치와 회전 (기존 코드)
    ref.current.position.lerp(vec.set(-mouse.x * 0.5, -mouse.y * 0.1, 0), 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 40, 0.1); // 오브젝트 회전
  });

  return <group ref={ref}>{children}</group>;
}

export default function Scene() {
  return (
    <Canvas>
      <color args={[0, 0, 0]} attach={"background"} />

      {/* 카메라 애니메이션 */}
      <CameraAnimation />

      <Rig>
        {/* 예시 박스 */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>

        {/* 평면 */}
        <mesh scale={100} rotation-x={-Math.PI * 0.5} position={[0, -0.5, 0]}>
          <planeGeometry />
          <meshNormalMaterial />
        </mesh>
      </Rig>

      {/* 조명 */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
}