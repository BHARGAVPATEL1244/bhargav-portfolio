'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface VisualCoreGlobeProps {
    phase?: 'origin' | 'evolution' | 'future';
}

function AnimatedSphere({ phase }: { phase: VisualCoreGlobeProps['phase'] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    // Target parameters for each phase
    const targets = {
        origin: { distort: 0, speed: 1, roughness: 0.5, metalness: 0.2, wireframe: true, scale: 2.2, color: '#6366f1' },
        evolution: { distort: 0.3, speed: 2, roughness: 0.2, metalness: 0.9, wireframe: false, scale: 2.5, color: '#a855f7' },
        future: { distort: 0.8, speed: 4, roughness: 0.1, metalness: 1, wireframe: true, scale: 3.0, color: '#ec4899' }
    };

    const current = targets[phase || 'origin'];

    useFrame((state) => {
        if (meshRef.current && materialRef.current) {
            // Lerp values for smooth transition
            materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, current.distort, 0.05);
            materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, current.roughness, 0.05);
            materialRef.current.metalness = THREE.MathUtils.lerp(materialRef.current.metalness, current.metalness, 0.05);

            // Wireframe toggle (instant)
            materialRef.current.wireframe = current.wireframe;

            // Rotation speed based on phase
            meshRef.current.rotation.y += 0.005 * current.speed;
            meshRef.current.rotation.z += 0.002 * current.speed;
        }
    });

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={current.scale}>
            <MeshDistortMaterial
                ref={materialRef}
                color={current.color}
                attach="material"
                distort={0.4} // Initial value, overridden by lerp
                speed={1.5}
                roughness={0.2}
                metalness={0.9}
                wireframe={true}
            />
        </Sphere>
    );
}

function InnerCore({ phase }: { phase: VisualCoreGlobeProps['phase'] }) {
    const targetScale = phase === 'future' ? 1.5 : 0.5;
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05));
        }
    })

    return (
        <Sphere ref={meshRef} args={[1, 32, 32]} scale={0.5}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} toneMapped={false} />
        </Sphere>
    )
}

export default function VisualCoreGlobe({ phase = 'origin' }: VisualCoreGlobeProps) {
    return (
        <div className="relative w-full h-full bg-black/0 flex items-center justify-center overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} color="#6366f1" intensity={2} />
                <AnimatedSphere phase={phase} />
                <InnerCore phase={phase} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={phase === 'future' ? 2 : 0.5} />
            </Canvas>

            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-secondary uppercase tracking-widest pointer-events-none transition-all duration-500">
                System Status: <span className="text-white">{phase.toUpperCase()}</span>
            </div>
        </div>
    );
}
