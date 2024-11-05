import { useThree, useFrame } from '@react-three/fiber'
import { EffectComposer, RenderPass, EffectPass, BloomEffect, ToneMappingEffect, FXAAEffect } from 'postprocessing'
import { useEffect, useState, useMemo } from 'react'
import { SSGIEffect, VelocityDepthNormalPass } from './v2'
import * as THREE from 'three'
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
    const handleShaderError = (material) => {
      if (material) {
        material.onBeforeCompile = (shader) => {
          shader.vertexShader = shader.vertexShader.replace(
            'void main() {',
            `
            varying vec2 vUv;
            void main() {
              vUv = uv;
            `
          );

          if (shader.vertexShader.includes('USE_SKINNING')) {
            shader.vertexShader = shader.vertexShader.replace(
              '#ifdef BONE_TEXTURE',
              `#ifdef BONE_TEXTURE
              #ifdef USE_SKINNING
                uniform int boneTextureSize;
              #endif
              `
            );
          }

          shader.fragmentShader = shader.fragmentShader.replace(
            'void main() {',
            `
            varying vec2 vUv;
            void main() {
            `
          );

          shader.fragmentShader = shader.fragmentShader.replace(
            /texture2D\(/g,
            'texture('
          );
        };

        if (material.skinning) {
          material.uniforms = {
            ...material.uniforms,
            boneTextureSize: { value: 0 }
          };
        }
      }
    };

    scene.traverse((object) => {
      if (object.isMesh) {
        if (Array.isArray(object.material)) {
          object.material.forEach(handleShaderError);
        } else {
          handleShaderError(object.material);
        }
      }
    });

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
