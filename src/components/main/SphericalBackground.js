import { TextureLoader, BackSide } from 'three';
import { useLoader } from '@react-three/fiber';

export default function SphericalBackground() {
    const texture = useLoader(TextureLoader, './images/main/background.png');

    return (
        <>
            <primitive attach="background" object={texture} />

            <mesh>
                <sphereGeometry args={[50, 64, 64]} />
                <meshStandardMaterial 
                    map={texture} 
                    side={BackSide}
                />
            </mesh>
        </>
    );
}
