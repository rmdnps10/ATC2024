'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, Text } from '@react-three/drei';
import { BallCollider, Physics, RigidBody } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { easing } from 'maath';
import * as THREE from 'three';
import { Effects } from './Effects.js';
import Background from './Background.js';
import Particles from './Particles.js';
//
//
//
const accents = ['#9822ff', '#25cefc', '#168cff', '#df45ff']; // ATC2024 메인 컬러 사용
const shuffle = (accent = 0) => [
  { color: '#25cefc', roughness: 0.1, metalness: 0.5 },
  { color: '#005afb', roughness: 0.1, metalness: 0.5 },
  { color: '#005afb', roughness: 0.1, metalness: 0.5 },
  { color: '#168cff', roughness: 0.1, metalness: 0.1 },
  { color: '#9822ff', roughness: 0.1, metalness: 0.1 },
  { color: '#7334ff', roughness: 0.1, metalness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.3 },
  { color: 'white', roughness: 0.3 },
  { color: '#168cff', roughness: 0.1 },
  { color: '#9822ff', roughness: 0.2 },
  { color: '#7334ff', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true, transparent: true, opacity: 0.5 },
  { color: accents[accent], roughness: 0.3, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true, transparent: true, opacity: 0.5 },
];

export default function Experience({ accent }) {
  const [ hitSound ] = useState(() => new Audio('./images/main/hit.mp3'));

  const collisionEnter = () =>
  {
      console.log('collision!');
      hitSound.currentTime = 0
      hitSound.volume = Math.random()
      hitSound.play()
  }

  const connectors = useMemo(() => shuffle(accent), [accent]);

  const { camera, mouse } = useThree();

  useFrame((state, delta) => {
    // 카메라 위치 및 회전 업데이트
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.2, 0.1); // X축 이동폭을 줄임
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.2, 0.1); // Y축 이동폭을 줄임
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 30, 0.1);
  
    // 카메라 회전 업데이트
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouse.y * -Math.PI * 0.05, 0.1) * 0.8;
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * -Math.PI * 0.05, 0.1) * 0.8;
  });
  

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault zoomSpeed={0.1} dampingFactor={ 0.05 } angularDamping dampC />

      <color attach="background" args={['#141622']} />

      <Background />

      <Text
        position={[0, 0, 5]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
        bevel={10}
      >
        ATC2024
      </Text>

      <Physics timeStep="vary" gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Sphere key={i} {...props} />
        ))}
      </Physics>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer form="ring" color="#4060ff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
        </group>
      </Environment>
      <Effects />
    </>
  );
}

function Sphere({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, color = 'white', ...props }) {
  const api = useRef();
  const ref = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2));
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });
  return (
    <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
      <BallCollider args={[1]} />
      <mesh ref={ref} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial {...props} />
        {children}
      </mesh>
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  
  // 여기서 useState를 사용하여 사운드 초기화
  const [hitSound] = useState(() => new Audio('./images/main/hit.mp3'));

  // 충돌 시 사운드를 재생하는 함수
  const collisionEnter = () => {
    console.log('collision!');
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  // 마우스 위치에 따른 오브젝트 이동
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0));
  });

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref} onCollisionEnter={collisionEnter}>
      <BallCollider args={[1]} />
    </RigidBody>
  );
}

