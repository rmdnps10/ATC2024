import { useRef, useMemo } from 'react';
import { Model as FishModel } from './fish';
import { Model as MainModel } from './main';
import { Model as Fish2Model } from './fish2'
import { Float } from '@react-three/drei';

export default function Model(props) {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={[55, -117, 0]} rotation={[0, 0, 0]}>
      <group scale={15} position={[0, -2.5, 0]} rotation-y={Math.PI / 6}>
        <Float speed={3} rotationIntensity={1} floatIntensity={0.1}>
          <MainModel />
        </Float>
      </group>
      <Float
        speed={3}
        rotationIntensity={1}
        floatIntensity={1}
      >
        <group scale={5} position={[1.5, -1.75, 0]}>
          <FishModel />
        </group>
        <group scale={5} position={[-1.5, -1.5, 0]}>
          <Fish2Model />
        </group>
      </Float>
    </group>
  );
}
