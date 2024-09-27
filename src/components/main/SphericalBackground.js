// import * as THREE from 'three';
// import { extend, useFrame } from '@react-three/fiber';
// import { useRef } from 'react';

// // Define the custom material as a class
// class FractalShaderMaterial extends THREE.ShaderMaterial {
//   constructor() {
//     super({
//       uniforms: {
//         iResolution: { value: new THREE.Vector3(1, 1, 1) },  // Canvas resolution
//         iTime: { value: 0.0 },  // Time uniform for animation
//         color: { value: new THREE.Color(0.9, 0.745, 0.9) },  // Color uniform for FBM
//       },
//       vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         #define NUM_OCTAVES 5

//         uniform vec3 iResolution;
//         uniform float iTime;
//         uniform vec3 color;
//         varying vec2 vUv;

//         float random(in vec2 st) {
//             return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
//         }

//         float noise(in vec2 st) {
//             vec2 i = floor(st);
//             vec2 f = fract(st);
            
//             float a = random(i + vec2(0.0, 0.0));
//             float b = random(i + vec2(1.0, 0.0));
//             float c = random(i + vec2(0.0, 1.0));
//             float d = random(i + vec2(1.0, 1.0));
            
//             vec2 u = f * f * (3.0 - 2.0 * f);
            
//             return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
//         }

//         float fbm(in vec2 st) {
//             float v = 0.0;
//             float a = 0.5;
            
//             for (int i = 0; i < NUM_OCTAVES; i++) {
//                 v += a * noise(st);
//                 st = st * 2.0;
//                 a *= 0.5;
//             }
            
//             return v;
//         }

//         void main() {
//             vec2 st = vUv * iResolution.xy / min(iResolution.x, iResolution.y);
            
//             vec2 q = vec2(0.0);
//             q.x = fbm(st + vec2(0.0));
//             q.y = fbm(st + vec2(1.0));
            
//             vec2 r = vec2(0.0);
//             r.x = fbm(st + (1.0 * q) + vec2(1.7, 9.2) + (0.15 * iTime));
//             r.y = fbm(st + (1.0 * q) + vec2(8.3, 2.8) + (0.12 * iTime));
            
//             float f = fbm(st + r);
//             float coef = (f * f * f + (0.6 * f * f) + (0.5 * f));
            
//             gl_FragColor = vec4(coef * color, 1.0);
//         }
//       `,
//       transparent: true,
//     });
//   }
// }

// // Extend to use the shader material in React Three Fiber
// extend({ FractalShaderMaterial });

// export default function SphericalBackground() {
//   const materialRef = useRef();

//   // Update the time uniform for animation
//   useFrame(({ clock }) => {
//     if (materialRef.current) {
//       materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
//     }
//   });

//   return (
//     <mesh>
//       <sphereGeometry args={[50, 64, 64]} />
//       {/* Use the correct camelCase tag */}
//       <fractalShaderMaterial ref={materialRef} />
//     </mesh>
//   );
// }
