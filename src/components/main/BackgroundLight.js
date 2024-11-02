import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function BackgroundLight({ scrollPercent }) {
    const light1 = useRef()
    const light2 = useRef()
    const light3 = useRef()
    const target1 = useRef()
    const target2 = useRef()
    const target3 = useRef()

    // 스크롤에 따른 색상 변화
    const colors = {
        light1: new THREE.Color('#ff6b6b').lerp(new THREE.Color('#845ef7'), scrollPercent / 100),
        light2: new THREE.Color('#4dabf7').lerp(new THREE.Color('#ff922b'), scrollPercent / 100),
        light3: new THREE.Color('#51cf66').lerp(new THREE.Color('#cc5de8'), scrollPercent / 100),
    }

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()
        const scroll = scrollPercent / 100

        // spotLight의 위치 애니메이션
        light1.current.position.set(
            Math.sin(time * 0.1 + scroll * Math.PI) * 3,
            Math.cos(time * 0.15 + scroll * Math.PI) * 3,
            10
        )
        light2.current.position.set(
            Math.cos(time * 0.15 + scroll * Math.PI) * 3,
            Math.sin(time * 0.1 + scroll * Math.PI) * 3,
            10
        )
        light3.current.position.set(
            Math.sin(time * 0.2 + scroll * Math.PI) * 3,
            Math.cos(time * 0.2 + scroll * Math.PI) * 3,
            10
        )
    })

    return (
        <>
            <object3D ref={target1} position={[0, 0, -20]} />
            <object3D ref={target2} position={[0, 0, -20]} />
            <object3D ref={target3} position={[0, 0, -20]} />

            <directionalLight
                ref={light1}
                color={colors.light1}
                intensity={0.3}
                position={[3, 0, 10]}
            // target={target1.current}
            />
            <directionalLight
                ref={light2}
                color={colors.light2}
                intensity={0.3}
                position={[0, 3, 10]}
            // target={target2.current}
            />
            <directionalLight
                ref={light3}
                color={colors.light3}
                intensity={0.3}
                position={[-3, 3, 10]}
            // target={target3.current}
            />
        </>
    )
}