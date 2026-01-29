'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="h-screen w-full bg-black text-white overflow-hidden relative flex flex-col items-center justify-center font-mono">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="z-10 text-center pointer-events-none select-none">
                <h1 className="text-xl mb-4 text-red-500 animate-pulse">ERR_404::GRAVITY_FAILURE</h1>
                <p className="text-white/50 mb-8 max-w-md mx-auto">
                    The page you are looking for has drifted into the void.
                    <br />
                    We are experiencing a temporary physics anomaly.
                </p>

                <Link
                    href="/"
                    className="pointer-events-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-colors"
                >
                    Return to Base
                </Link>
            </div>

            {/* Floating Space Debris (The 404) */}
            {/* We use drag constraints to keep them within the viewport roughly, but loose enough to feel floaty */}

            {/* The '4' */}
            <motion.div
                drag
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.2}
                whileHover={{ scale: 1.1, cursor: 'grab' }}
                whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                initial={{ x: -100, y: -100, rotate: 0 }}
                animate={{
                    y: [-20, 20, -20],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute text-[15rem] font-black text-white/5 pointer-events-auto"
                style={{ top: '30%', left: '20%' }}
            >
                4
            </motion.div>

            {/* The '0' */}
            <motion.div
                drag
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.2}
                whileHover={{ scale: 1.1, cursor: 'grab' }}
                whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                initial={{ x: 0, y: 0, rotate: 0 }}
                animate={{
                    y: [30, -30, 30],
                    rotate: [0, -20, 20, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute text-[15rem] font-black text-white/5 pointer-events-auto"
                style={{ top: '30%', left: 'calc(50% - 60px)' }}
            >
                0
            </motion.div>

            {/* The other '4' */}
            <motion.div
                drag
                dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
                dragElastic={0.2}
                whileHover={{ scale: 1.1, cursor: 'grab' }}
                whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                initial={{ x: 100, y: 100, rotate: 0 }}
                animate={{
                    y: [-15, 15, -15],
                    rotate: [0, 5, -15, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute text-[15rem] font-black text-white/5 pointer-events-auto"
                style={{ top: '30%', right: '20%' }}
            >
                4
            </motion.div>

        </div>
    );
}
