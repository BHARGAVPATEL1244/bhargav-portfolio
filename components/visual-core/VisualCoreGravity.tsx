'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Code2, Cpu, Globe, Layers, Zap } from 'lucide-react';

const icons = [
    { Icon: Code2, color: '#6366f1' },
    { Icon: Cpu, color: '#a855f7' },
    { Icon: Globe, color: '#3b82f6' },
    { Icon: Layers, color: '#ec4899' },
    { Icon: Zap, color: '#eab308' },
];

export default function VisualCoreGravity() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<Array<{ w: number; h: number; t: number; l: number; d: number; }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 20 }).map(() => ({
            w: Math.random() * 4 + 1,
            h: Math.random() * 4 + 1,
            t: Math.random() * 100,
            l: Math.random() * 100,
            d: Math.random() * 3 + 2,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-gradient-to-br from-indigo-500/5 to-purple-500/5 flex items-center justify-center">
            {/* Floating Particles Background */}
            <div className="absolute inset-0">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/5 rounded-full"
                        style={{
                            width: p.w,
                            height: p.h,
                            top: `${p.t}%`,
                            left: `${p.l}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: p.d,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Zero Gravity Icons */}
            {icons.map((item, i) => (
                <FloatingIcon key={i} Icon={item.Icon} color={item.color} index={i} />
            ))}

            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-secondary uppercase tracking-widest pointer-events-none">
                Zero Gravity Core
            </div>
        </div>
    );
}

function FloatingIcon({ Icon, color, index }: { Icon: any, color: string, index: number }) {
    const controls = useAnimationControls();

    useEffect(() => {
        controls.start({
            x: [Math.random() * 40 - 20, Math.random() * 40 - 20],
            y: [Math.random() * 40 - 20, Math.random() * 40 - 20],
            rotate: [Math.random() * 20 - 10, Math.random() * 20 - 10],
            transition: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            }
        });
    }, [controls]);

    return (
        <motion.div
            className="absolute p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl hover:bg-white/10 transition-colors"
            style={{
                top: `${30 + (index * 10)}%`,
                left: `${20 + (index * 15)}%`,
            }}
            animate={controls}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        >
            <Icon style={{ color }} className="w-8 h-8" />
        </motion.div>
    );
}
