// Model.js
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

export default function Model({ scroll }) {
  const { scene, animations } = useGLTF('./model/fishswim.glb');
//   const { actions } = useAnimations(animations, scene);

//   useEffect(() => {
//     // 애니메이션 시작
//     actions['swim'].play().paused = true; // 애니메이션을 일시정지 상태로 시작
//   }, [actions]);

//   useEffect(() => {
//     // 스크롤 값에 따라 애니메이션 진행도 업데이트
//     const updateAnimation = () => {
//       const action = actions['swim'];
//       if (action) {
//         const duration = action.getClip().duration;
//         action.time = duration * scroll.current;
//       }
//       requestAnimationFrame(updateAnimation);
//     };
//     updateAnimation();
//   }, [actions, scroll]);

  return (
    <primitive object={scene} scale={1} position={[0, 0, 0]} />
  );
}

useGLTF.preload('./model/fishswim.glb');
