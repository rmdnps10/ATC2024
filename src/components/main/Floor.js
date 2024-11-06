'use client'

import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useState } from 'react'

function PhysicsStar({ position = [0, 8, 0] }) {
    const star3 = useGLTF('/model/star3.glb')
    return (
        <RigidBody position={position} colliders="hull">
            <primitive object={star3.scene.clone()} scale={10} />
        </RigidBody>
    )
}

function PhysicsBox({ position = [0, 8, 0], color = "white" }) {
    return (
        <RigidBody position={position} colliders="cuboid">
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </RigidBody>
    )
}

function PhysicsStarMain({ position = [0, 8, 0] }) {
    const starmain = useGLTF('/model/starmain.glb')
    return (
        <RigidBody position={position} colliders="hull">
            <primitive object={starmain.scene.clone()} scale={10} />
        </RigidBody>
    )
}

function PhysicsStar1({ position = [0, 8, 0] }) {
    const star1 = useGLTF('/model/star1.glb')
    return (
        <RigidBody position={position} colliders="hull">
            <primitive object={star1.scene.clone()} scale={10} />
        </RigidBody>
    )
}

function Wall({ position, rotation, args = [10, 10, 0.2] }) {
    return (
        <RigidBody type="fixed" position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={args} />
                <meshStandardMaterial metalness={0.2} roughness={0.5} color="white" />
            </mesh>
        </RigidBody>
    )
}

export default function Floor() {
    const [boxes, setBoxes] = useState([])
    const colors = ['#25cefc', '#168cff', '#005afb', '#df45ff', '#9822ff', '#7344ff']
    const initialBoxes = Array.from({ length: 10 }, (_, i) => ({
        id: `initial-${i}`,
        position: [-4 + i, 1 + i * 0.5, 0],
        color: "white"
    }))
    const [stars, setStars] = useState([])
    const [starsMain, setStarsMain] = useState([])
    const [stars1, setStars1] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            const x = Math.random() * 6 - 3
            const objectType = Math.random() * 4
            const randomColor = colors[Math.floor(Math.random() * colors.length)]

            if (objectType < 1) {
                setBoxes((prev) => [...prev, {
                    id: Date.now(),
                    position: [x, 15, x],
                    color: randomColor
                }])
            } else if (objectType < 2) {
                setStars((prev) => [...prev, { id: Date.now(), position: [x, 15, x] }])
            } else if (objectType < 3) {
                setStarsMain((prev) => [...prev, { id: Date.now(), position: [x, 15, x] }])
            } else {
                setStars1((prev) => [...prev, { id: Date.now(), position: [x, 15, x] }])
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <group position={[58.5, -124, -5]} rotation={[0, -Math.PI / 6, 0]}>
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
                position={[0, 5, -5]}
                rotation={[0, 0, 0]}
            />

            {/* 왼쪽 벽 */}
            <Wall
                position={[-5, 5, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />

            {/* 초기 계단형 박스들 */}
            {/* 바닥층 9개 */}
            <PhysicsBox position={[-4, 0.5, -4]} color="#ffffff" />
            <PhysicsBox position={[-4, 0.5, -3]} color="#ffffff" />
            <PhysicsBox position={[-4, 0.5, -2]} color="#ffffff" />
            <PhysicsBox position={[-3, 0.5, -4]} color="#ffffff" />
            <PhysicsBox position={[-3, 0.5, -3]} color="#ffffff" />
            <PhysicsBox position={[-3, 0.5, -2]} color="#ffffff" />
            <PhysicsBox position={[-2, 0.5, -4]} color="#ffffff" />
            <PhysicsBox position={[-2, 0.5, -3]} color="#ffffff" />
            <PhysicsBox position={[-2, 0.5, -2]} color="#ffffff" />

            {/* 중간층 4개 */}
            <PhysicsBox position={[-3.5, 1.5, -3.5]} color="#ffffff" />
            <PhysicsBox position={[-3.5, 1.5, -2.5]} color="#ffffff" />
            <PhysicsBox position={[-2.5, 1.5, -3.5]} color="#ffffff" />
            <PhysicsBox position={[-2.5, 1.5, -2.5]} color="#ffffff" />

            {/* 최상층 1개 */}
            <PhysicsBox position={[-3, 2.5, -3]} color="#ffffff" />

            {/* 떨어지는 상자들과 별들 */}
            {boxes.map(({ id, position, color }) => (
                <PhysicsBox key={id} position={position} color={color} />
            ))}
            {stars.map(({ id, position }) => (
                <PhysicsStar key={id} position={position} />
            ))}
            {starsMain.map(({ id, position }) => (
                <PhysicsStarMain key={id} position={position} />
            ))}
            {stars1.map(({ id, position }) => (
                <PhysicsStar1 key={id} position={position} />
            ))}
        </group>
    )
}