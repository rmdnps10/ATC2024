// components/main/Cube.js
'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
//
//
//
export default function Cube() {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: './images/main/videoTest.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])

    const bigCubeRef = useRef();
    const smallCubesGroupRef = useRef();
    const colors = ['#005afb', '#25cefc', '#168cff', '#df45ff', '#9822ff', '#7334ff'];
    const smallCubeCount = 20;

    const smallCubes = useMemo(() => {
        const positions = [];
        for (let i = 0; i < smallCubeCount; i++) {
        const angle = (i / smallCubeCount) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        positions.push([x, -10, z]);
        }
        return positions;
    }, [smallCubeCount]);

    useFrame((state, delta) => {
        if (bigCubeRef.current) {
        bigCubeRef.current.rotation.x += delta * 0.5;
        bigCubeRef.current.rotation.y += delta * 0.5;
        }

        if (smallCubesGroupRef.current) {
        smallCubesGroupRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <>
        <mesh ref={bigCubeRef} position={[0, -10, 0]} castShadow>
            <boxGeometry args={[3, 3, 3]} />
            <meshBasicMaterial toneMapped={false}>
                <videoTexture attach="map" args={[video]} encoding={THREE.SRGBColorSpace} />
            </meshBasicMaterial>
        </mesh>

        {/* <group ref={smallCubesGroupRef}>
            {smallCubes.map((position, index) => (
            <mesh key={index} position={position} castShadow>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color={colors[index % colors.length]} />
            </mesh>
            ))}
        </group> */}
        </>
    );
};
