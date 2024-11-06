import { useGLTF, useAnimations, useScroll } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
//
//
//
export default function Model(props) {

  const { scene: fishScene, animations: fishAnimations } = useGLTF('./model/fishfast.glb');
  const { scene: mainScene } = useGLTF('/model/main.glb');
  const { scene: star1Scene } = useGLTF('/model/star1.glb');
  const { scene: star2Scene } = useGLTF('/model/star2.glb');
  const { scene: star3Scene } = useGLTF('/model/star3.glb');
  const { scene: star4Scene } = useGLTF('/model/star4.glb');
  const { scene: star5Scene } = useGLTF('/model/star5.glb');
  const { scene: cakeScene } = useGLTF('/model/cake.glb');
  const { scene: starMainScene } = useGLTF('/model/starmain.glb');
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
    <group ref={groupRef} position={[65, -117, -3]} rotation={[0, 0, 0]}>
      <primitive
        object={fishScene}
        scale={5}
        position={[2, 1, -5]
        }
      />
      <primitive
        object={fishScene}
        scale={5}
        position={[-1, 1, -5]}
      />
      {/* <primitive
        object={mainScene}
        scale={15}
        position={[0, - 1.5, 0]}
      // rotation-y={-Math.PI * 0.3}
      /> */}
      <primitive
        object={starMainScene}
        scale={15}
        position={[0, 2.5, 0]}
        rotation-y={-Math.PI * 0.3}
      />
      <primitive
        object={star1Scene}
        scale={15}
        position={[-3, 0, 0]}
        rotation-y={-Math.PI * 0.3}
      />
      <primitive
        object={star2Scene}
        scale={15}
        position={[5, 1.5, 0]}
        rotation-y={-Math.PI * 0.3}
      />
      <primitive
        object={star3Scene}
        scale={15}
        position={[-4, 1.5, 0]}
        rotation-y={-Math.PI * 0.3}
      />
      <primitive
        object={star4Scene}
        scale={15}
        position={[6, 1, 0]}
        rotation-y={-Math.PI * 0.3}
      />
      <primitive
        object={star5Scene}
        scale={15}
        position={[3, 2, 0]}
        rotation-y={-Math.PI * 0.3}
      />
      {/* <primitive
        object={cakeScene}
        scale={15}
        position={[-1, 1.5, 0]}
        rotation-y={-Math.PI * 0.3}
      /> */}
    </group>
  );
}

useGLTF.preload('./model/fishfast.glb');
useGLTF.preload('./model/main.glb');
