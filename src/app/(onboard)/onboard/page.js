"use client";

import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber'; 
import Experience from "../../../components/onboard/Experience";
import styles from "./page.module.css";

export default function OnBoardPage() {
  
  // ReactDOM을 통해 root에 Canvas를 렌더링
  useEffect(() => {
    const root = ReactDOM.createRoot(document.querySelector('#root'));
    root.render(
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [0, 0, 100], // 초기 카메라 위치
        }}
      >
        <Experience />  {/* 3D 씬 렌더링 */}
      </Canvas>
    );
  }, []); 

  return <div id="root" className={styles.root}></div>;
}