/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/model/fishfast.glb')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        // 모든 애니메이션 액션을 찾아서 재생
        Object.values(actions).forEach((action) => {
            action.play();
            action.repetitions = Infinity; // 무한 반복
        });
    }, [actions]);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="Armature" position={[0, 0.027, 0.028]} scale={0.081}>
                    <skinnedMesh
                        name="Cube"
                        geometry={nodes.Cube.geometry}
                        material={materials.Material}
                        skeleton={nodes.Cube.skeleton}
                    />
                    <skinnedMesh
                        name="Cube009"
                        geometry={nodes.Cube009.geometry}
                        material={materials.Material}
                        skeleton={nodes.Cube009.skeleton}
                    />
                    <skinnedMesh
                        name="Cube010"
                        geometry={nodes.Cube010.geometry}
                        material={materials.Material}
                        skeleton={nodes.Cube010.skeleton}
                    />
                    <primitive object={nodes.Bone} />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/model/fishfast.glb')