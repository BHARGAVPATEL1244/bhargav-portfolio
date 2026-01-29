'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Color } from 'three';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
uniform float time;
uniform vec3 colorA;
uniform vec3 colorB;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Create wobbly effect
  float wave = sin(uv.x * 10.0 + time) * 0.1 + sin(uv.y * 12.0 + time * 0.8) * 0.1;
  uv += wave;

  float strength = step(0.8, sin(uv.x * 20.0 + time * 3.0) + sin(uv.y * 20.0 + time * 2.0));
  
  vec3 color = mix(colorA, colorB, vUv.y + wave);
  color += strength * 0.2; // Add some shine

  gl_FragColor = vec4(color, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
uniform float time;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(pos.x * 5.0 + time) * 0.2;
  pos.z += sin(pos.y * 5.0 + time * 0.5) * 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

function LiquidPlane() {
    const mesh = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            colorA: { value: new Color("#4338ca") }, // Indigo 700
            colorB: { value: new Color("#a855f7") }, // Purple 500
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh} rotation={[-Math.PI / 4, 0, 0]}>
            <planeGeometry args={[6, 6, 32, 32]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    );
}

export default function VisualCoreLiquid() {
    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <Canvas camera={{ position: [0, 0, 3] }}>
                <LiquidPlane />
            </Canvas>
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/50 uppercase tracking-widest pointer-events-none z-20">
                Liquid Chrome Shader
            </div>
        </div>
    );
}
