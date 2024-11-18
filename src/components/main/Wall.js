'use client'

import React from 'react'
import { Reflector, useTexture } from '@react-three/drei'
//
//
//
export default function Wall() {
    const [floor, normal] = useTexture(['./images/main/SurfaceImperfections003_1K_var1.jpg', './images/main/SurfaceImperfectionsNormal.jpg'])

    const commonMaterialProps = {
        color: "#ffffff",
        metalness: 0.8,
        roughnessMap: floor,
        normalMap: normal,
        normalScale: [2, 2]
    }

    return (
        <>
            {/* 중앙 면 */}
            <Reflector
                blur={[400, 100]}
                resolution={512}
                mirror={1.0}
                mixBlur={6}
                mixStrength={1.5}
                position={[0, 1.3, -20]}
                rotation={[0, 0, 0]}
            >
                {(Material, props) => (
                    <>
                        <planeGeometry args={[20, 8]} />
                        <Material {...commonMaterialProps} {...props} />
                    </>
                )}
            </Reflector>
            <ThreeText position={[0, 1.3, -19.5]} text="num1" />

            {/* 왼쪽 면 */}
            <Reflector
                blur={[400, 100]}
                resolution={512}
                mirror={1.0}
                mixBlur={6}
                mixStrength={1.5}
                position={[35, -45, -15]}
                rotation={[0, 0, 0]}
            >
                {(Material, props) => (
                    <>
                        <planeGeometry args={[20, 8]} />
                        <Material {...commonMaterialProps} {...props} />
                    </>
                )}
            </Reflector>
            <ThreeText position={[35, -45, -14.5]} text="num2" />

            {/* 오른쪽 면 */}
            <Reflector
                blur={[400, 100]}
                resolution={512}
                mirror={1.0}
                mixBlur={6}
                mixStrength={1.5}
                position={[12, -20, -15]}
                rotation={[0, 0, 0]}
            >
                {(Material, props) => (
                    <>
                        <planeGeometry args={[20, 8]} />
                        <Material {...commonMaterialProps} {...props} />
                    </>
                )}
            </Reflector>
            <ThreeText position={[12, -20, -14.5]} text="num3" />
        </>
    )
}