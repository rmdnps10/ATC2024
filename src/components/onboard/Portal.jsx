import { Bloom, ToneMapping, EffectComposer } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'

export default function App() {
  return (
    <>
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
        <boxGeometry args={[10, 32.36]} />
        <meshStandardMaterial
          color={[100, 100, 100]}
          emissive="#101010"
          emissiveIntensity={10}
        />
      </mesh>
    </>
  )
}
