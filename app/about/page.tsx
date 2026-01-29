'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import ImageSequence from '@/components/ImageSequence';

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the entire page
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the progress for the video
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Transform scroll progress to opacity for text sections (4 Sections)
    // Section 1: Foundation (0-20%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.25], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.1, 0.25], [50, 0, -50]);

    // Section 2: Engineering (25-45%)
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.40, 0.50], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.50], [50, 0, -50]);

    // Section 3: Impact (50-70%)
    const opacity3 = useTransform(scrollYProgress, [0.50, 0.60, 0.65, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.50, 0.60, 0.75], [50, 0, -50]);

    // Section 4: Horizon (75-100%)
    const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.75, 0.85], [50, 0]);

    // State to pass to ImageSequence (using raw state to avoid frequent rerenders if strictly passed via props, 
    // but React handles this okay. For optimization we could use MotionValue if ImageSequence supported it, 
    // but for Canvas we need number. We'll stick to a simple listener or pass the spring value and listen inside.)

    // Actually, passing smoothProgress directly to a component that uses `useMotionValue` or `onChange` is better,
    // but since we updated ImageSequence to take a number, let's bridge it.
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        return smoothProgress.on("change", (latest) => {
            setProgress(latest);
        });
    }, [smoothProgress]);

    return (
        <main ref={containerRef} className="bg-black relative min-h-[500vh]">

            {/* Sticky Background Logic */}
            <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
                <ImageSequence progress={progress} />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            </div>

            {/* Sticky Navigation */}
            <header className="fixed top-8 left-8 z-50 mix-blend-difference">
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-mono uppercase tracking-widest">Back to Core</span>
                </Link>
            </header>

            {/* Scrollable Overlay Layer */}
            <div className="relative z-10 w-full">

                {/* Section 1: Foundation */}
                <div className="h-[100vh] flex items-center justify-center md:justify-start px-8 md:px-24">
                    <motion.div
                        style={{ opacity: opacity1, y: y1 }}
                        className="max-w-xl"
                    >
                        <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 block">2015 — 2019</span>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">The Foundation</h2>
                        <div className="space-y-6 text-white/80 leading-relaxed font-light text-lg">
                            <p>
                                <strong className="text-white font-medium block mb-1">Vidhyanagar High School</strong>
                                Completed 10th & 12th grade with distinction (2015-2019).
                            </p>
                            <p className="text-white/60">
                                The early years where logic met creativity. Laying the groundwork for a future in computational thinking.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Section 2: Engineering */}
                <div className="h-[100vh] flex items-center justify-center md:justify-end px-8 md:px-24 text-right">
                    <motion.div
                        style={{ opacity: opacity2, y: y2 }}
                        className="max-w-xl"
                    >
                        <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4 block">2019 — 2023</span>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Engineering</h2>
                        <div className="space-y-6 text-white/80 leading-relaxed font-light text-lg">
                            <p>
                                <strong className="text-white font-medium block mb-1">Hasmukh Goswami College of Engineering</strong>
                                Bachelor of Engineering in Information Technology.
                            </p>
                            <p className="text-white/60">
                                Deep dive into algorithms, system architecture, and full-stack development.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Section 3: Impact */}
                <div className="h-[100vh] flex items-center justify-center md:justify-start px-8 md:px-24">
                    <motion.div
                        style={{ opacity: opacity3, y: y3 }}
                        className="max-w-xl"
                    >
                        <span className="text-pink-400 font-mono text-sm tracking-widest uppercase mb-4 block">2022 — 2023</span>
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Practical Impact</h2>
                        <div className="space-y-8 text-white/80 leading-relaxed font-light text-lg">
                            <div>
                                <strong className="text-white font-medium block mb-1">Odoo Internship (Jan - May 2023)</strong>
                                <p className="text-sm">Customized Odoo ERP modules, mastered PostgreSQL & XML. Agile development with senior engineers.</p>
                            </div>
                            <div>
                                <strong className="text-white font-medium block mb-1">Data Analytics (May - June 2022)</strong>
                                <p className="text-sm">Data visualization and analysis using Pandas & Matplotlib.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Section 4: Horizon */}
                <div className="h-[100vh] flex items-center justify-center px-8 md:px-24 text-center">
                    <motion.div
                        style={{ opacity: opacity4, y: y4 }}
                        className="max-w-2xl"
                    >
                        <span className="text-secondary font-mono text-sm tracking-widest uppercase mb-4 block">Present Day</span>
                        <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">The Horizon</h2>
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-8">
                            With a strong foundation in backend systems and data analytics, I am ready to build the next generation of digital experiences.
                        </p>
                        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                            Initialize Contact
                        </Link>
                    </motion.div>
                </div>

                {/* Buffer */}
                <div className="h-[20vh]" />

            </div>
        </main>
    );
}
