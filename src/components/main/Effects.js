import { useThree, useFrame } from '@react-three/fiber'
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ToneMappingEffect, FXAAEffect } from 'postprocessing'
import { useEffect, useState } from 'react'
import { SSGIEffect, VelocityDepthNormalPass } from './v2'
//
//
//
export default function Effects() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const [composer] = useState(() => new EffectComposer(gl, { multisampling: 0 }))

  useEffect(() => composer.setSize(size.width, size.height), [composer, size])

  useEffect(() => {
    // SSGI (Screen Space Global Illumination) 효과를 위한 설정
    const config = {
      importanceSampling: true,
      steps: 20,
      refineSteps: 4,
      spp: 1,
      resolutionScale: 1,
      missedRays: false,
      distance: 5.980000000000011,
      thickness: 2.829999999999997,
      denoiseIterations: 1,
      denoiseKernel: 3,
      denoiseDiffuse: 25,
      denoiseSpecular: 25.54,
      radius: 11,
      phi: 0.5760000000000001,
      lumaPhi: 20.651999999999997,
      depthPhi: 23.37,
      normalPhi: 26.087,
      roughnessPhi: 18.477999999999998,
      specularPhi: 7.099999999999999,
      envBlur: 0.8
    }

    // 성능 향상을 위한 제안:
    // 1. resolutionScale을 0.25로 낮추어 렌더링 해상도 감소
    // 2. steps와 refineSteps 값을 각각 10과 2로 줄임
    // 3. denoiseIterations를 2로 늘리고 다른 디노이징 값들은 낮춤
    // 4. radius 값을 8로 줄여 필터링 범위 축소

    const renderPass = new RenderPass(scene, camera)
    const velocityDepthNormalPass = new VelocityDepthNormalPass(scene, camera)
    composer.addPass(renderPass)
    composer.addPass(velocityDepthNormalPass)
    composer.addPass(new EffectPass(camera, new SSGIEffect(composer, scene, camera, { ...config, velocityDepthNormalPass })))
    composer.addPass(new EffectPass(camera, new FXAAEffect(), new ToneMappingEffect()))

    return () => {
      composer.removeAllPasses()
    }
  }, [composer, camera, scene])

  useFrame((state, delta) => {
    gl.autoClear = true
    composer.render(delta)
  }, 1)
}
