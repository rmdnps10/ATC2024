"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

// 기본 카메라 애니메이션
function CameraAnimation() {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  useEffect(() => {
    // 카메라 초기 위치 설정 (멀리 떨어진 위치에서 시작)
    camera.position.set(0, 0, 20);
    
    // // CameraControls 비활성화 (애니메이션 중 충돌 방지)
    // if (controlsRef.current) controlsRef.current.enabled = false;

    // 카메라 애니메이션 (박스로 이동)
    gsap.to(camera.position, {
      x: 0, // 목표 좌표 (박스와 같은 위치)
      y: 0,
      z: 3,
      duration: 5, // 5초 동안 이동
      ease: "power2.inOut",
      onComplete: () => {
        // 카메라가 애니메이션이 끝난 후 박스를 바라보도록 설정
        camera.lookAt(0, 0, 0);

        // // 애니메이션 완료 후 CameraControls 다시 활성화
        // if (controlsRef.current) {
        //   controlsRef.current.enabled = true;
        //   controlsRef.current.setLookAt(
        //     camera.position.x,
        //     camera.position.y,
        //     camera.position.z,
        //     0,
        //     0,
        //     0,
        //     true
        //   ); // 카메라가 다시 설정되지 않도록 유지
        // }
      },
    });
  }, [camera]);

  // return <CameraControls ref={controlsRef} />;
}

// 마우스에 따른 카메라 애니메이션
function Rig({ children }) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();

  useFrame(() => {
    // 카메라가 마우스의 X축과 Y축에 따라 부드럽게 이동
    // X축 이동을 줄이기 위해 값을 조정 (이전에는 mouse.x * 2)
    camera.position.lerp(vec.set(mouse.x * 1, 0, 3.5), 0.05);
    ref.current.position.lerp(vec.set(- mouse.x * 0.5, - mouse.y * 0.1, 0), 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 40, 0.1); // 회전도 좀 더 줄임
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