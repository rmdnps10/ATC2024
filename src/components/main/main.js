/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
    const { nodes, materials } = useGLTF('/model/main.glb')
    return (
        <group {...props} dispose={null}>
            <group position={[0, 0.095, 0]} scale={0.181}>
                <skinnedMesh
                    geometry={nodes.Body.geometry}
                    material={materials.Material}
                    skeleton={nodes.Body.skeleton}
                />
                <group position={[0, -0.524, 0]} scale={5.537}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube006_1.geometry}
                        material={materials['Material.007']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube006_2.geometry}
                        material={materials['Material.007']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube001.geometry}
                        material={materials['Material.011']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube003.geometry}
                        material={materials['Material.008']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube004.geometry}
                        material={materials['Material.010']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube007.geometry}
                        material={materials['Material.012']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube008.geometry}
                        material={materials['Material.013']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cylinder.geometry}
                        material={materials['Material.006']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube005_1.geometry}
                        material={materials['Material.007']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube005_2.geometry}
                        material={materials['Material.007']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube011.geometry}
                        material={materials['Material.009']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube011_1.geometry}
                        material={materials['Material.009']}
                    />
                </group>
                <primitive object={nodes.Bone} />
            </group>
        </group>
    )
}

useGLTF.preload('/model/main.glb')