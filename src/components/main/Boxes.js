import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { Text } from '@react-three/drei';

export default function Boxes({ scrollPercent }) {
    const boxRefs = useRef([]);
    const groupRef = useRef();
    const SPACING = 1.25;
    const SIZE = 3;
    const [isAnimating, setIsAnimating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const COLORS = ['#ffffff', '#25cefc', '#168cff', '#005afb', '#df45ff', '#9822ff', '#7344ff'];

    const materials = useMemo(() => ({
        center: new THREE.MeshStandardMaterial({
            color: "#ffffff",
            metalness: 0.7,
            roughness: 0.2,
            emissive: "#ffffff",
            emissiveIntensity: 0.2,
        }),
        faces: COLORS.map(color => new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.3,
            roughness: 0.4,
        }))
    }), []);

    const geometry = useMemo(() => new THREE.BoxGeometry(1.25, 1.25, 1.25), []);

    const cubeData = useMemo(() => {
        const getRandomPosition = () => {
            const range = 10;
            return [
                THREE.MathUtils.randFloatSpread(range),
                THREE.MathUtils.randFloatSpread(range),
                THREE.MathUtils.randFloatSpread(range)
            ];
        };

        return [
            // 중앙 큐브
            { pos: [0, 0, 0], finalPos: [0, 0, 0], isCenter: true, colorIndex: 0 },
            // 앞면 큐브들
            { pos: getRandomPosition(), finalPos: [-1, 1, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, 1, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, 1, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [-1, 0, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, 0, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, 0, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [-1, -1, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, -1, 1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, -1, 1], isCenter: false, colorIndex: 0 },
            // 중간층 큐브들
            { pos: getRandomPosition(), finalPos: [-1, 1, 0], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, 1, 0], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, 1, 0], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [-1, 0, 0], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, 0, 0], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [-1, -1, 0], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, -1, 0], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, -1, 0], isCenter: false, colorIndex: 0 },
            // 뒷면 큐브들
            { pos: getRandomPosition(), finalPos: [-1, 1, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, 1, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, 1, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [-1, 0, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, 0, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, 0, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [-1, -1, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [0, -1, -1], isCenter: false, colorIndex: 0 },
            { pos: getRandomPosition(), finalPos: [1, -1, -1], isCenter: false, colorIndex: 0 },
        ];
    }, []);

    const finalPositions = useMemo(() => {
        return cubeData.map(cube => ({
            x: cube.finalPos[0] * SPACING,
            y: cube.finalPos[1] * SPACING,
            z: cube.finalPos[2] * SPACING,
            isCenter: cube.isCenter,
            colorIndex: cube.colorIndex
        }));
    }, [cubeData]);

    const initialPositions = useMemo(() => {
        return cubeData.map(cube => ({
            x: cube.pos[0] * SPACING,
            y: cube.pos[1] * SPACING,
            z: cube.pos[2] * SPACING,
            isCenter: cube.isCenter,
            colorIndex: cube.colorIndex
        }));
    }, [cubeData]);

    useFrame((state, delta) => {
        if (groupRef.current && isCompleted) {
            groupRef.current.rotation.x += delta * 0.5;
            groupRef.current.rotation.y += delta * 0.5;
        }

        if (!isCompleted) {
            boxRefs.current.forEach((box, index) => {
                if (box && !initialPositions[index].isCenter) {
                    box.rotation.x += delta * 0.5;
                    box.rotation.y += delta * 0.3;
                    box.rotation.z += delta * 0.2;
                }
            });
        }
    });

    useEffect(() => {
        boxRefs.current.forEach((box) => {
            if (box) {
                box.rotation.x = Math.random() * Math.PI;
                box.rotation.y = Math.random() * Math.PI;
                box.rotation.z = Math.random() * Math.PI;
            }
        });
    }, []);

    const leftTextRef = useRef({ z: 20 });
    const rightTextRef = useRef({ z: 20 });
    const [textPositions, setTextPositions] = useState({
        left: [-1, 10.5, 20],
        right: [3, -10.5, 20]
    });

    const animateToComplete = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);

        finalPositions.forEach((pos, index) => {
            gsap.to(boxRefs.current[index].position, {
                x: pos.x,
                y: pos.y,
                z: pos.z,
                duration: 1.5,
                ease: "power2.inOut",
            });

            gsap.to(boxRefs.current[index].rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    if (index === finalPositions.length - 1) {
                        setIsCompleted(true);
                        setIsAnimating(false);

                        // 텍스트 애니메이션 - z축으로 이동
                        gsap.to(leftTextRef.current, {
                            z: 0, // z축으로 0으로 이동
                            duration: 2.5,
                            ease: "power2.inOut",
                            onUpdate: () => {
                                setTextPositions(prev => ({
                                    ...prev,
                                    left: [-1, 3.5, leftTextRef.current.z]
                                }));
                            }
                        });

                        gsap.to(rightTextRef.current, {
                            z: 0, // z축으로 0으로 이동
                            duration: 5,
                            ease: "power2.inOut",
                            onUpdate: () => {
                                setTextPositions(prev => ({
                                    ...prev,
                                    right: [3, -3.5, rightTextRef.current.z]
                                }));
                            }
                        });
                    }
                }
            });
        });
    }, [finalPositions, isAnimating]);

    return (
        <>
            <directionalLight position={[3, 3, 1]} intensity={3} color="#333388" />
            <ambientLight intensity={0.5} />

            <group
                visible={isCompleted}
                position={[0, -30, -23]}
                scale={2}
            >
                <Text
                    position={textPositions.left}
                    fontSize={1.25}
                    color="#333333"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={-0.05}
                    font='/images/main/Pretendard-Bold.woff'
                >
                    How To Put An Elephant
                </Text>
                <Text
                    position={textPositions.right}
                    fontSize={1.25}
                    color="#333333"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={-0.05}
                    font='/images/main/Pretendard-Bold.woff'
                >
                    In A Refrigerator?
                </Text>
            </group>

            <group
                ref={groupRef}
                position={[0, -30, -20]}
                rotation={[Math.PI * 0.15, Math.PI * 0.25, 0]}
                scale={2}
            >
                {initialPositions.map((pos, index) => (
                    <mesh
                        key={index}
                        ref={(el) => (boxRefs.current[index] = el)}
                        position={[pos.x, pos.y, pos.z]}
                        onClick={() => pos.isCenter && animateToComplete()}
                        geometry={geometry}
                        material={pos.isCenter ? materials.center : materials.faces[pos.colorIndex]}
                    >
                    </mesh>
                ))}
                <Text
                    position={[0, 1.5, 0]}
                    fontSize={0.5}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                    visible={!isCompleted}
                    font='/images/main/Pretendard-Bold.woff'
                >
                    I'm Elephant.
                </Text>
            </group>
        </>
    );
} 