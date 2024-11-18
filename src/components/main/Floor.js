'use client'

import { memo } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useState, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
//
//
//
const PhysicsBox = memo(function PhysicsBox({ position = [0, 8, 0], textureIndex }) {
    const textures = useLoader(TextureLoader, [
        '/images/main/atc24_profile.png',
    ]).map(texture => {
        texture.repeat.set(1, 1);
        return texture;
    })

    return (
        <RigidBody position={position} colliders="cuboid">
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial map={textures[textureIndex]} />
            </mesh>
        </RigidBody>
    )
})

const PhysicsStar = memo(function PhysicsStar({ position = [0, 8, 0] }) {
    const star3 = useGLTF('/model/star3.glb')
    return (
        <RigidBody position={position} colliders="hull">
            <primitive object={star3.scene.clone()} scale={10} />
        </RigidBody>
    )
})

const PhysicsStarMain = memo(function PhysicsStarMain({ position = [0, 8, 0] }) {
    const starmain = useGLTF('/model/starmain.glb')
    return (
        <RigidBody position={position} colliders="hull">
            <primitive object={starmain.scene.clone()} scale={10} />
        </RigidBody>
    )
})

const PhysicsStar1 = memo(function PhysicsStar1({ position = [0, 8, 0] }) {
    const star1 = useGLTF('/model/star1.glb')
    return (
        <RigidBody position={position} colliders="hull">
            <primitive object={star1.scene.clone()} scale={10} />
        </RigidBody>
    )
})

const Wall = memo(function Wall({ position, rotation, args = [10, 10, 0.2] }) {
    return (
        <RigidBody type="fixed" position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={args} />
                <meshStandardMaterial metalness={0.2} roughness={0.5} color="white" />
            </mesh>
        </RigidBody>
    )
})

const PhysicsCake = memo(function PhysicsCake({ position = [0, 0.5, 0] }) {
    const cake = useGLTF('/model/cake.glb')
    return (
        <RigidBody position={position} colliders="hull">
            <primitive object={cake.scene} scale={15} />
        </RigidBody>
    )
})

export default function Floor() {
    const [showArrow, setShowArrow] = useState(false);

    // 상태 관리 최적화
    const [objects, setObjects] = useState({
        boxes: [],
        stars: [],
        starsMain: [],
        stars1: []
    });

    // 상수값 메모이제이션
    const OBJECT_LIMIT = useMemo(() => 50, []);
    const SPAWN_INTERVAL = useMemo(() => 700, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const x = Math.random() * 6 - 3;
            const objectType = Math.random() * 4;

            setObjects(prev => {
                const newObjects = { ...prev };
                const totalObjects = Object.values(newObjects).reduce((sum, arr) => sum + arr.length, 0);

                // 새 오브젝트 추가
                const newObject = {
                    id: Date.now(),
                    position: [x, 15, x],
                    textureIndex: 0
                };

                if (objectType < 1) {
                    newObjects.boxes = [...prev.boxes, newObject];
                } else if (objectType < 2) {
                    newObjects.stars = [...prev.stars, newObject];
                } else if (objectType < 3) {
                    newObjects.starsMain = [...prev.starsMain, newObject];
                } else {
                    newObjects.stars1 = [...prev.stars1, newObject];
                }

                // 오브젝트 제한 관리
                if (totalObjects >= OBJECT_LIMIT) {
                    Object.keys(newObjects).forEach(key => {
                        if (newObjects[key].length > 0) {
                            newObjects[key] = newObjects[key].slice(1);
                        }
                    });
                }

                return newObjects;
            });
        }, SPAWN_INTERVAL);

        return () => clearInterval(interval);
    }, [OBJECT_LIMIT, SPAWN_INTERVAL]);

    const textures = useLoader(TextureLoader, ['/images/main/atc24_profile.png'])

    return (
        <group position={[58.5 + 1, -124, -5]} rotation={[0, -Math.PI / 6, 0]}>
            <directionalLight position={[3, 10, 0]} intensity={10} />
            <pointLight position={[5, 10, 0]} intensity={100} color="red" />

            {/* 바닥 */}
            <Wall
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                args={[10, 10, 0.2]}
            />

            {/* 뒷벽 */}
            <Wall
                position={[0, 4.9, -5]}
                rotation={[0, 0, 0]}
            />

            {/* 왼쪽 벽 */}
            <Wall
                position={[-5, 4.9, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />

            {/* 뒷벽 계단형 박스들 */}
            {/* 바닥층 9개 */}
            <PhysicsBox position={[-4, 0.5, -4]} textureIndex={0} />
            <PhysicsBox position={[-4, 0.5, -3]} textureIndex={1} />
            <PhysicsBox position={[-4, 0.5, -2]} textureIndex={2} />
            <PhysicsBox position={[-3, 0.5, -4]} textureIndex={3} />
            <PhysicsBox position={[-3, 0.5, -3]} textureIndex={0} />
            <PhysicsBox position={[-3, 0.5, -2]} textureIndex={1} />
            <PhysicsBox position={[-2, 0.5, -4]} textureIndex={2} />
            <PhysicsBox position={[-2, 0.5, -3]} textureIndex={3} />
            <PhysicsBox position={[-2, 0.5, -2]} textureIndex={0} />

            {/* 중간층 4개 */}
            <PhysicsBox position={[-3.5, 1.5, -3.5]} textureIndex={1} />
            <PhysicsBox position={[-3.5, 1.5, -2.5]} textureIndex={2} />
            <PhysicsBox position={[-2.5, 1.5, -3.5]} textureIndex={3} />
            <PhysicsBox position={[-2.5, 1.5, -2.5]} textureIndex={0} />

            {/* 최상층 1개 */}
            <PhysicsBox position={[-3, 2.5, -3]} textureIndex={1} />

            {/* 최상층 1개 */}
            <PhysicsBox position={[-3, 5.5, -2]} textureIndex={1} />

            {/* 떨어지는 상자들과 별들 */}
            {objects.boxes.map(({ id, position, textureIndex }) => (
                <PhysicsBox key={id} position={position} textureIndex={textureIndex} />
            ))}
            {objects.stars.map(({ id, position }) => (
                <PhysicsStar key={id} position={position} />
            ))}
            {objects.starsMain.map(({ id, position }) => (
                <PhysicsStarMain key={id} position={position} />
            ))}
            {objects.stars1.map(({ id, position }) => (
                <PhysicsStar1 key={id} position={position} />
            ))}

            <PhysicsCake position={[0, 1, 1]} />
        </group>
    )
}

useGLTF.preload('/model/cake.glb')
useGLTF.preload('/model/star1.glb')
useGLTF.preload('/model/star3.glb')
useGLTF.preload('/model/starmain.glb')