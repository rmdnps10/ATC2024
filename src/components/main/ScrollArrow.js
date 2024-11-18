'use client'

import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
//
//
//
const ArrowBox = memo(function ArrowBox({ position }) {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
})

export default function ScrollArrow({ isVisible }) {
    const arrowRef = useRef()
    const boxPositions = [
        // 화살표 머리 (위쪽)
        [2.5, 0, 0],
        [2.5, 0.5, 0],
        [2.0, 0, 0],
        [2.0, 0.5, 0],
        [2.0, 1.0, 0],
        [1.5, 0, 0],
        [1.5, 0.5, 0],
        [1.5, 1.0, 0],
        [1.5, 1.5, 0],

        // 화살표 머리 (아래쪽)
        [3.0, 0, 0],
        [2.5, 0, 0],
        [2.5, -0.5, 0],
        [2.0, -0, 0],
        [2.0, -0.5, 0],
        [2.0, -1.0, 0],
        [1.5, 0.0, 0],
        [1.5, -0.5, 0],
        [1.5, -1.0, 0],
        [1.5, -1.5, 0],

        // 화살표 몸통 중앙
        [0, 0, 0],
        [-0.5, 0, 0],
        [-1.0, 0, 0],
        [-1.5, 0, 0],
        [-2.0, 0, 0],
        [-2.5, 0, 0],
        [-3, 0, 0],
        [0.5, 0, 0],
        [1, 0, 0],
        [1.5, 0, 0],
        [2, 0, 0],
        [2.5, 0, 0],
    ]

    useEffect(() => {
        if (isVisible) {
            const boxes = arrowRef.current.children

            // 초기 위치 (흩어진 상태)
            boxes.forEach((box, i) => {
                gsap.set(box.position, {
                    x: Math.random() * 5 - 2.5,
                    y: Math.random() * 5 - 2.5,
                    z: Math.random() * 5 - 2.5
                })
            })

            // 화살표 모양으로 모이는 애니메이션
            boxes.forEach((box, i) => {
                gsap.to(box.position, {
                    x: boxPositions[i][0],
                    y: boxPositions[i][1],
                    z: boxPositions[i][2],
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    delay: i * 0.05
                })
            })
        }
    }, [isVisible])

    return (
        <group ref={arrowRef} position={[60, -123, 5]}>
            {boxPositions.map((pos, i) => (
                <ArrowBox key={i} position={pos} />
            ))}
        </group>
    )
} 