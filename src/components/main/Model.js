import { useGLTF, useAnimations, useScroll } from '@react-three/drei';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Model(props) {
  const { scene, animations } = useGLTF('./model/fishswim.glb');
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    const action = actions[animations[0].name];
    action.play();

    return () => {
      action.stop();
    };
  }, [actions, animations]);

  // 원형 이동 및 회전 설정
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const offset = scroll.offset;

    // 모델의 위치를 원형 궤적을 따라 움직이게 함
    scene.position.x = + Math.sin(time) * 5; // X축 이동 (반지름 5)
    scene.position.z = - Math.cos(time) * 5; // Z축 이동 (반지름 5)

    // Y축 회전 (모델이 원을 그리면서 회전)
    scene.rotation.y += 0.01;

    // 스크롤에 따라 Y축 위치 추가 변경
    scene.position.y = -offset * 10;
  });

  return (
    <primitive
      object={scene}
      scale={8}
      position={[0, 0, 0]} // 필요시 위치 조정
      rotation={[Math.PI * 0.3, 0, 0]}
    />
  );
}

useGLTF.preload('./model/fishswim.glb');
