import { extend } from '@react-three/fiber'
import {
  useAnimations,
  useGLTF,
  MeshPortalMaterial,
  Sky
} from '@react-three/drei'
import { geometry } from 'maath'

extend(geometry)
const GOLDENRATIO = 1.61803398875

export const Portal = () => (
  <>
    <Frame
      id="01"
      name="ATC"
      author="WEBWEBWEB"
      scale={20}
      position={[0, 17.5, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
      />
      <Sky />
      <Model position={[0, -2, 0]} />
    </Frame>
  </>
)

function Model({ clip, ...props }) {
  const { scene: fishScene, animations: fishAnimations } = useGLTF(
    './model/fishfast.glb'
  )
  const { actions } = useAnimations(fishAnimations, fishScene)

  const action = actions[fishAnimations[0].name]
  action.play()

  return (
    <primitive
      object={fishScene}
      scale={5}
      position={[0, -0.5, -1]}
    />
  )
}

function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = GOLDENRATIO,
  children,
  ...props
}) {
  return (
    <group {...props}>
      <mesh name={id}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial>{children}</MeshPortalMaterial>
      </mesh>
      <mesh
        name={id}
        position={[0, 0, -0.001]}>
        <roundedPlaneGeometry args={[width + 0.05, height + 0.05, 0.12]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  )
}
