"use client";

import * as THREE from "three";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import gsap from "gsap";
import { easing } from "maath";
import dynamic from "next/dynamic";
import CameraController from "./CameraController.js";
import ThreeText from "./ThreeText.js";
import Boxes from "./Boxes.js";
import Floor from "./Floor.js";
import Model from "./Model.js";
import ScrollArrow from "./ScrollArrow.js";
const Effects = dynamic(() => import("./Effects.js"), { ssr: false });
//
//
//
const accents = ['#25cefc', '#168cff', '#005afb', '#df45ff', '#9822ff', '#7344ff']; // ATC2024 메인 컬러 사용

const shuffle = (accent = 0) => [
  { color: '#ffffff', roughness: 0.5, metalness: 0.3 },
  { color: '#ffffff', roughness: 0.5, metalness: 0.3 },
  { color: '#ffffff', roughness: 0.5, metalness: 0.3 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: 'white', roughness: 0.1, metalness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent + 1], roughness: 0.1, accent: true },
  { color: accents[accent + 2], roughness: 0.1, accent: true },
  { color: '#cccccc', roughness: 0.6 },
  { color: '#cccccc', roughness: 0.4 },
  { color: '#cccccc', roughness: 0.4 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.2 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent + 3], roughness: 0.1, accent: true },
  { color: accents[accent + 4], roughness: 0.3, accent: true },
  { color: accents[accent + 5], roughness: 0.1, accent: true }
];

export default function Experience({ accent, scrollPercent }) {
  const connectors = useMemo(() => shuffle(accent), [accent]);
  const bgRef = useRef();

  useEffect(() => {
    if (scrollPercent >= 85) {
      const progress = (scrollPercent - 85) / 15; // 75%에서 100%까지의 진행률 계산
      gsap.to(bgRef.current, {
        r: 0,
        g: 0,
        b: 0,
        duration: 1.5,
        ease: "power2.out",
        progress: progress
      });
    } else {
      gsap.to(bgRef.current, {
        r: 1,
        g: 1,
        b: 1,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }, [scrollPercent]);

  return (
    <>
      {/* <Perf position="bottom-left" /> */}
      <color ref={bgRef} attach="background" args={['white']} />
      <CameraController />
      {/* <OrbitControls /> */}

      <Environment resolution={64} preset="studio" environmentIntensity={0.5} />

      {scrollPercent < 30 && (
        <Physics gravity={[0, 0, 0]} >
          <Pointer />
          {connectors.map((props, i) => (
            <Sphere key={i} {...props} />
          ))}
        </Physics>
      )}

      <Boxes scrollPercent={scrollPercent} />

      <ThreeText />

      {scrollPercent >= 75 && (
        <Physics gravity={[0, -9.8, 0]}>
          <Floor scroll={scrollPercent} />
        </Physics>
      )}

      <Model />

      <ScrollArrow isVisible={scrollPercent >= 98} />

      <Effects />
    </>
  );
}

function Sphere({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  accent,
  color = "white",
  ...props
}) {
  const api = useRef();
  const ref = useRef();
  const r = useCallback(() => THREE.MathUtils.randFloatSpread(10), []);
  const pos = useMemo(() => position || [r(), r(), r()], [position, r]);

  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2)
    );
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
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
  const [hitSound] = useState(() => new Audio("./images/main/hit.mp3"));

  const lastPlayTime = useRef(0);
  const soundCooldown = 80;

  const collisionEnter = () => {
    const now = Date.now();

    if (now - lastPlayTime.current > soundCooldown) {
      hitSound.currentTime = 0;
      hitSound.volume = Math.random() * 0.3;
      hitSound.play();

      lastPlayTime.current = now;
    }
  };

  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
      onCollisionEnter={collisionEnter}
    >
      <BallCollider args={[1]} />
    </RigidBody>
  );
}
