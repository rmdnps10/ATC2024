'use client'

import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Reflector, RoundedBox, Text, MeshRefractionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Model from './Model';
import { MeshStandardMaterial } from 'three';
//
//
//
export default function Level() {
  const { viewport } = useThree();
  const groupRef = useRef();

  // 각 섹션 사이의 거리 설정
  const stageDistance = viewport.height * 4.3; // 섹션 높이 증가

  // 각 단계의 위치 및 회전 설정
  const stages = [
    {
      position: [-2.5, -1, -10],
      rotation: [ 0, - Math.PI / 2, -  Math.PI * 0.1], // 첫 번째 단계: 정면
      component: <FirstStage />,
    },
    {
      position: [2, -stageDistance, -12],
      rotation: [0, Math.PI * 1.25, 0], // 두 번째 단계: 오른쪽으로 회전 및 이동
      component: <SecondStage />,
    },
    {
      position: [-2, -stageDistance * 2, -10],
      rotation: [0, -Math.PI / 3, 0], // 세 번째 단계: 왼쪽으로 회전 및 이동
      component: <ThirdStage />,
    },
  ];

  return (
    <group ref={groupRef}>
      {stages.map((stage, index) => (
        <group
          key={index}
          position={stage.position}
          rotation={stage.rotation}
        >
          {stage.component}
        </group>
      ))}
    </group>
  );
}

// 첫 번째 단계 컴포넌트
function FirstStage() {
  return (
    <group>
      <Planes />
      <Model />
      <Text
          position={ [ -1.99, 4, -3 ] }
          fontSize={3}
          rotation-y={ Math.PI * 0.5 }
          color="#ccccee"
          anchorX="center"
          anchorY="middle"
        >
          ATC2024
        </Text>
    </group>
  );
}

// 두 번째 단계 컴포넌트
function SecondStage() {
  return (
    <group>
      <Planes />
      <Sphere />
      <Text
          position={ [ -1.99, 4, -3 ] }
          fontSize={3}
          rotation-y={ Math.PI * 0.5 }
          color="#ccccee"
          anchorX="center"
          anchorY="middle"
        >
          ELEPHANT
        </Text>
    </group>
  );
}

// 세 번째 단계 컴포넌트
function ThirdStage() {
  return (
    <group>
      <Planes />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <Text
          position={ [ -1.99, 4, -3 ] }
          fontSize={3}
          rotation-y={ Math.PI * 0.5 }
          color="#ccccee"
          anchorX="center"
          anchorY="middle"
        >
          ABOUT
        </Text>
    </group>
  );
}

function Planes() {
  return (
    <group position={[0, -0.9, -3]}>
      {/* 반사효과를 적용할 두께를 가진 평면 */}
      <mesh position={[3, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* BoxGeometry로 두께 설정 */}
        <boxGeometry args={[10, 17, 0.5]} /> {/* 마지막 인자는 두께 */}
        <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.5} />
      </mesh>

      <Reflector
        blur={[400, 100]}
        resolution={512}
        args={[10, 17]}
        mirror={1}
        mixBlur={1}
        mixStrength={2}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[3, -0.74, 0]}
      >
        {(Material, props) => (
          <Material
            color="#ffffff"
            metalness={0.6}
            roughness={0.5}
            {...props}
          />
        )}
      </Reflector>
      {/* 기타 평면들 */}
      <Plane color="#f4ae00" rotation-x={-Math.PI / 2} position={[0, 1, 0]} scale={[4.2, 1, 4]} />
      <Plane color="#436fbd" rotation-x={-Math.PI / 2} position={[-1.7, 1, 6]} scale={[1.5, 4, 3]} />
      {/* <Plane color="#d7dfff" rotation-x={-Math.PI / 2} rotation-z={-Math.PI / 3} position={[0, 4, 3]} scale={[2, 0.03, 4]} /> */}
      {/* <mesh position={[-2, 4, 0]} rotation={[0, Math.PI / 2, 0]} scale={[17, 10, 1]}>
        <planeGeometry />
        <meshPhysicalMaterial
          receiveShadow
          toneMapped={false}
          color="black"
          roughness={0} // 표면을 매끄럽게
          metalness={1} // 금속성이 아닌 유리
          reflectivity={0.8}
        />
      </mesh> */}
    </group>
  );
}

function Sphere() {
  const ref = useRef();
  return (
    <mesh ref={ref} position={[0, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshStandardMaterial
        color="lightblue"
        clearcoat={1}
        clearcoatRoughness={0}
        roughness={0}
        metalness={0.25}
      />
    </mesh>
  );
}

const Plane = ({ color, ...props }) => (
  <RoundedBox receiveShadow castShadow smoothness={10} radius={0.015} {...props}>
    <meshStandardMaterial color={color} envMapIntensity={0.5} roughness={0.2} metalness={0.5} />
  </RoundedBox>
);
