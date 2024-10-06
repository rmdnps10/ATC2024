"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { AxesHelper } from "three";

// 카메라 애니메이션
function CameraAnimation({ setIsHolding, cameraStartPos, isCameraMoving }) {
  const { camera } = useThree();

  useEffect(() => {
    // 카메라 초기 위치 설정 (멀리 떨어진 위치에서 시작)
    camera.position.set(0, 0, 20);
    cameraStartPos.current = new THREE.Vector3(0, 0, 20); // 카메라 시작 위치 저장

    // 카메라 애니메이션 (박스로 이동)
    gsap.to(camera.position, {
      x: 0, // 목표 좌표 (박스와 같은 위치)
      y: 0,
      z: 3,
      duration: 7, // 7초 동안 이동
      ease: "power4.inOut",
      onComplete: () => {
        camera.lookAt(0, 0, 0); // 애니메이션이 끝난 후 박스를 바라보도록 설정
        setIsHolding(true); // 카메라가 상자에 도달하면 홀드 가능
      },
    });
  }, [camera, setIsHolding, cameraStartPos]);
}

// 상자를 마우스로 누르고 있을 때 게이지가 차는 로직
function HoldAndMove({ isHolding, setGauge, cameraStartPos, isCameraMoving }) {
  const { camera } = useThree();
  const gaugeRef = useRef(0);
  const isPressed = useRef(false);

  const handlePointerDown = () => {
    isPressed.current = true; // 마우스가 눌렸을 때
  };

  const handlePointerUp = () => {
    isPressed.current = false; // 마우스를 떼면 멈춤
  };

  useFrame(() => {
    if (isHolding && isPressed.current && gaugeRef.current < 100) {
      // 마우스가 눌려 있는 동안 게이지 증가
      gaugeRef.current = Math.min(gaugeRef.current + 0.5, 100); // 게이지 증가
      setGauge(gaugeRef.current);
    } else if (gaugeRef.current === 100 && !isCameraMoving.current) {
      // 게이지가 100이면 카메라가 원래 위치를 바라봄
      isCameraMoving.current = true; // 카메라 이동 중 상태로 설정
      gsap.to(camera.position, {
        x: cameraStartPos.current.x + 3, // 카메라가 원래 위치에서 상자 뒤로 이동
        y: cameraStartPos.current.y + 1, // 위로 살짝 이동
        z: cameraStartPos.current.z - 3, // 카메라가 상자 뒤로 이동하여 3인칭 시점
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          camera.lookAt(0, 0, 0); // 상자를 바라보도록 설정
          isCameraMoving.current = false; // 카메라 이동 종료
        }
      });

      gaugeRef.current = 0; // 게이지 초기화
      setGauge(0);
    }
  });

  return (
    <mesh position={[0, 0, 0]} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
}

// 카메라와 오브젝트를 마우스에 따라 움직이게 하는 애니메이션
function Rig({ children, isCameraMoving }) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();

  useFrame(() => {
    if (!isCameraMoving.current) {
      // 카메라가 움직이는 동안에는 마우스에 따른 이동 중지
      camera.position.lerp(vec.set(mouse.x * 1, 0, 3.5), 0.05);

      // 카메라 회전을 마우스 위치에 따라 적용
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -mouse.y * 0.2, 0.1); // 마우스 Y축에 따른 카메라 피치 회전 (상하)
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * 0.2, 0.1);  // 마우스 X축에 따른 카메라 요 회전 (좌우)

      // 오브젝트 그룹의 위치와 회전 (기존 코드)
      if (ref.current) {
        ref.current.position.lerp(vec.set(-mouse.x * 0.5, -mouse.y * 0.1, 0), 0.1);
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 40, 0.1); // 오브젝트 회전
      }
    }
  });

  return <group ref={ref}>{children}</group>;
}

// 월드 좌표계를 시각화하는 헬퍼
function CoordinateHelper() {
  const { scene } = useThree();

  useEffect(() => {
    // 축 헬퍼 생성 (길이 5로 설정)
    const axesHelper = new AxesHelper(3);
    
    // 씬에 헬퍼 추가
    scene.add(axesHelper);

    // 컴포넌트가 언마운트될 때 헬퍼 제거
    return () => {
      scene.remove(axesHelper);
    };
  }, [scene]);

  return null;
}

export default function Scene() {
  const [isHolding, setIsHolding] = useState(false);
  const [gauge, setGauge] = useState(0);
  const cameraStartPos = useRef(new THREE.Vector3()); // 초기화된 카메라 위치
  const isCameraMoving = useRef(false); // 카메라가 이동 중인지 상태 확인

  return (
    <>
      <Canvas>
        <color args={[0, 0, 0]} attach={"background"} />

        {/* 카메라 애니메이션 */}
        <CameraAnimation setIsHolding={setIsHolding} cameraStartPos={cameraStartPos} isCameraMoving={isCameraMoving} />

        <Rig isCameraMoving={isCameraMoving}>
          {/* 상자를 꾹 누르면 게이지가 차고 카메라 이동 */}
          <HoldAndMove isHolding={isHolding} setGauge={setGauge} cameraStartPos={cameraStartPos} isCameraMoving={isCameraMoving} />

          {/* 바닥 추가 */}
          <mesh scale={100} rotation-x={-Math.PI * 0.5} position={[0, -0.5, 0]}>
            <planeGeometry />
            <meshNormalMaterial />
          </mesh>
        </Rig>

        {/* 좌표계 헬퍼 추가 */}
        <CoordinateHelper />

        {/* 조명 */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>

      {/* DOM 레이어로 게이지 바 추가 */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#000', width: '200px', height: '20px', border: '1px solid white' }}>
        <div style={{ width: `${gauge}%`, height: '100%', background: 'white' }}></div>
      </div>
    </>
  );
}