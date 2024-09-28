'use client'

import { Float, Text, Cloud, OrbitControls, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { TextureLoader } from 'three';
import Background from './background.js';
import FishModel from './Model.js';
//
//
//
export default function Experience() {
    const fish = useGLTF('./model/fishswim.glb');
    const backgroundTexture = useLoader(TextureLoader, './images/main/background.png');

    return (
        <>
            <Perf />

            <Background />

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
            {/* <Cloud /> */}

           <FishModel />
        </>
    )
}