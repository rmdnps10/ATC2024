'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Experience from '../../components/main/Experience';
import styles from './page.module.css';
import { useReducer } from 'react';

const accents = ['#25cefc', '#005afb', '#df45ff', '#7334ff'];

export default function MainPage() {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);

  return (
    <div className={styles.canvasContainer} onClick={click}> {/* 클릭 이벤트 추가 */}
      <Canvas
        flat
        shadows
        dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 0, 30], fov: 17.5, near: 10, far: 40 }}
      >
        {/* <ScrollControls pages={3}> */}
          <Experience accent={accent} /> {/* 액센트를 Experience에 전달 */}
        {/* </ScrollControls> */}
      </Canvas>
    </div>
  );
}
