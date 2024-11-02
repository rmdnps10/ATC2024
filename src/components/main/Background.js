import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function Background() {
    const [activeBoxes, setActiveBoxes] = useState(new Set());
    const grid = useRef()
    const boxSize = 3
    const gap = 0.01
    const rows = 6
    const cols = 6

    // geometry와 material을 재사용하기 위해 useMemo 사용
    const geometry = useMemo(() => new THREE.BoxGeometry(boxSize, boxSize, boxSize), [boxSize])
    const material = useMemo(() => new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.5,
        metalness: 0.3,
        transparent: true,
        opacity: 1
    }), [])

    // 랜덤 z 위치를 미리 계산하여 저장
    const zPositions = useMemo(() => {
        return Array.from({ length: rows * cols }).map(() => {
            return 0;
        });
    }, []);

    // 텍스처 로더 및 텍스처 생성
    const textures = useMemo(() => {
        const loader = new THREE.TextureLoader();
        return [
            loader.load('/images/main/AtcElephant.png'),
            loader.load('/images/main/AtcElephant.png'),
            loader.load('/images/main/AtcElephant.png'),
            loader.load('/images/main/AtcRainbow.png'),
            loader.load('/images/main/AtcRectangle.png'),
            loader.load('/images/main/AtcBranding1.png'),
        ];
    }, []);

    // 특별한 박스 인덱스 배열
    const specialBoxIndices = [0, 7, 14, 21, 28, 35]; // 1, 8, 15, 22, 29, 36번째 박스 (0-based index)

    // 기본 material은 그대로 두고, 특별한 박스용 material 배열 생성
    // const specialMaterials = useMemo(() =>
    //     textures.map(texture => new THREE.MeshStandardMaterial({
    //         map: texture,
    //         roughness: 0.5,
    //         metalness: 0.3,
    //         transparent: true,
    //         opacity: 1
    //     }))
    //     , [textures]);

    // 이미지 로더 및 이미지 텍스처 생성
    const overlayTextures = useMemo(() => {
        const loader = new THREE.TextureLoader();
        return [
            loader.load('/images/main/AtcElephant.png'),
            loader.load('/images/main/AtcRainbow.png'),
            loader.load('/images/main/AtcRectangle.png'),
            loader.load('/images/main/AtcBranding1.png'),
            loader.load('/images/main/AtcBranding1.png'),
            loader.load('/images/main/AtcBranding1.png'),
        ];
    }, []);

    // 특별한 박스용 material 배열 생성 - 기본 컬러에 이미지 오버레이
    const specialMaterials = useMemo(() =>
        overlayTextures.map(texture => {
            // 텍스처의 인코딩을 LinearEncoding으로 설정
            texture.encoding = THREE.LinearEncoding;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;

            const material = new THREE.MeshStandardMaterial({
                color: "#ffffff",
                roughness: 0.5,
                metalness: 0.3,
                transparent: true,
                opacity: 1
            });

            material.toneMapped = false; // 톤매핑 비활성화
            // 이미지를 오버레이로 추가
            material.onBeforeCompile = (shader) => {
                shader.fragmentShader = shader.fragmentShader.replace(
                    '#include <map_fragment>',
                    `
                    #include <map_fragment>
                    vec4 texelColor = texture2D(map, vUv);
                    diffuseColor.rgb = mix(diffuseColor.rgb, texelColor.rgb, texelColor.a);
                    `
                );
            };
            material.map = texture;
            return material;
        })
        , [overlayTextures]);

    const handleClick = (index, meshRef) => {
        setActiveBoxes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                // 박스를 원래 위치로
                gsap.to(meshRef.current.position, {
                    z: zPositions[index],
                    duration: 0.5,
                    ease: "power2.out"
                });
                newSet.delete(index);
            } else {
                // 박스를 앞으로 튀어나오게
                gsap.to(meshRef.current.position, {
                    z: 5,
                    duration: 0.5,
                    ease: "power2.out"
                });
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <group position={[5, -20, -20]}>
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: cols }).map((_, col) => {
                    const index = row * cols + col;
                    const x = (col - cols / 2) * (boxSize + gap);
                    const y = (row - rows / 2) * (boxSize + gap);
                    const specialIndex = specialBoxIndices.indexOf(index);
                    const meshRef = useRef();

                    return (
                        <mesh
                            ref={meshRef}
                            receiveShadow
                            castShadow
                            key={`${row}-${col}`}
                            position={[x, y, zPositions[index]]}
                            geometry={geometry}
                            material={specialIndex !== -1 ? specialMaterials[specialIndex] : material}
                            onClick={() => specialIndex !== -1 && handleClick(index, meshRef)}
                        />
                    )
                })
            )}
        </group>
    )
}