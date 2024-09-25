'use client'

import { Float, Text, Cloud, OrbitControls, useGLTF } from '@react-three/drei';
//
//
//
export default function Experience() {
    const fish = useGLTF('./model/fishswim.glb');

    return (
        <>
            <color args={ [ 'skyblue' ] } attach="background" />

            <OrbitControls />

            <ambientLight intensity={ 1.5 } />
            <directionalLight />

            <Float
                floatIntensity={ 10 }
            >
                <Text
                    position={ [ 0, 0, 3 ] }
                    fontSize={ 2 }
                    color={ 'mediumpurple' }
                >
                    MAINPAGE!!
                </Text>
            </Float>
            <Cloud />

            <primitive object={ fish.scene } scale={ 15.0 } position-y={ 3 } />
        </>
    )
}