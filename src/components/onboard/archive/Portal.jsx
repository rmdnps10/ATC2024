import { Bloom, ToneMapping, EffectComposer } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { CameraControls } from '@react-three/drei'

export default function App() {
  return (
    <>
      <CameraControls
        makeDefault
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2 - 0.01}
      />
      <directionalLight position={[500, 150, -1000]} />
      <ambientLight />

      <EffectComposer>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Bloom
          mipmapBlur
          luminanceThreshold={1.1}
        />
      </EffectComposer>

      <mesh>
        <boxGeometry args={[10, 32.36, 1]} />
        <meshStandardMaterial
          color={[100, 100, 100]}
          emissive="#101010"
          emissiveIntensity={10}
        />
      </mesh>
    </>
  )
}
