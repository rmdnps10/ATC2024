import { useGLTF, useAnimations, useScroll } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
//
//
//
export default function Model(props) {

  const { scene: fishScene, animations: fishAnimations } = useGLTF('./model/fishfast.glb');
  const { scene: mainScene } = useGLTF('./model/main.glb');
  const { actions } = useAnimations(fishAnimations, fishScene);
  const scroll = useScroll();

  const groupRef = useRef(); 

  useEffect(() => {
    const action = actions[fishAnimations[0].name];
    action.play();
    return () => {
      action.stop();
    };
  }, [actions, fishAnimations]);

  // useFrame((state) => {
  //   const time = state.clock.getElapsedTime();
  //   const offset = scroll.offset;

  //   if (groupRef.current) {
  //     groupRef.current.position.x = Math.sin(time) * 5;
  //     groupRef.current.position.z = -Math.cos(time) * 5;
  //     groupRef.current.rotation.y += 0.01;

  //     groupRef.current.position.y = -offset * 10;
  //   }
  // });

  return (
    <group ref={groupRef}>
      <primitive
        object={fishScene}
        scale={5}
        position={[6, 1, -5]}
      />
      <primitive
        object={mainScene}
        scale={15}
        position={[6, - 1.5, 0]}
        rotation-y={ -Math.PI * 0.3 }
      />
    </group>
  );
}

useGLTF.preload('./model/fishfast.glb');
useGLTF.preload('./model/main.glb');
