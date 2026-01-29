'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import { BentoGrid, BentoCard } from '@/components/BentoGrid';
import { Sparkles, Code2, Globe, ArrowUpRight, Github, Linkedin, Activity, Droplets, Zap, Mail, Instagram, Ghost } from 'lucide-react';

const LoadingCore = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse">
        <div className="w-8 h-8 border-2 border-indigo-500 rounded-full border-t-transparent animate-spin" />
    </div>
);

const VisualCoreGravity = dynamic(() => import('./visual-core/VisualCoreGravity'), {
    ssr: false,
    loading: () => <LoadingCore />
});



export default function Hero() {
    // Simplified Hero state

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 pb-20">
            <BentoGrid>

                {/* 1. Main Headline */}
                <BentoCard className="md:col-span-2 md:row-span-2 min-h-[400px] justify-between" delay={0.1}>
                    <div className="flex flex-col h-full justify-between z-20 relative">
                        <div className="space-y-2">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-widest uppercase mb-4">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
                                Available for work
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase">
                                BHARGAV<br />PATEL
                            </h1>
                        </div>
                        <p className="text-lg text-secondary max-w-sm leading-relaxed">
                            Creative Developer & GUI Engineer.<br />
                            Crafting high-performance digital interfaces with next-gen motion and precision.
                        </p>


                    </div>

                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
                </BentoCard>

                {/* 2. Visual / 3D Element Placeholder -> REAL INTERACTIVE COMPONENT */}
                <BentoCard className="md:col-span-2 min-h-[400px] md:min-h-[500px] p-0 overflow-hidden relative" delay={0.2}>
                    <VisualCoreGravity />

                    <div className="absolute top-4 right-4 z-20">
                        <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-[10px] text-white font-mono uppercase">
                            Interactive Mode
                        </div>
                    </div>
                </BentoCard>

                {/* 3. Tech Stack Marquee */}
                <BentoCard className="md:col-span-1 h-[200px]" delay={0.3} title="Arsenal" icon={Code2}>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Next.js', 'Typescript', 'Node.js', 'Framer', 'Three.js'].map((tech) => (
                            <span key={tech} className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20 hover:text-white hover:border-primary/50 transition-colors cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </BentoCard>

                {/* 4. Social / Connect Links */}
                <BentoCard className="md:col-span-1 h-[200px] relative group" delay={0.35} title="Connect" icon={Globe}>
                    <div className="flex flex-col h-full justify-between pt-2">
                        <div className="grid grid-cols-5 gap-2">
                            <a href="https://github.com/BHARGAVPATEL1244" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/5 hover:border-white/20">
                                <Github className="w-4 h-4" />
                            </a>

                            <a href="https://www.linkedin.com/in/bhargav1244" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/5 hover:border-white/20">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/bhargav.frames/" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/5 hover:border-white/20">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="https://www.snapchat.com/@bhargavs_1244" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors border border-white/5 hover:border-white/20">
                                <Ghost className="w-4 h-4" />
                            </a>
                        </div>
                        <Link href="/contact" className="w-full py-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-white/50 hover:text-indigo-300 transition-colors border border-white/5 hover:border-indigo-500/30 flex items-center justify-center gap-2 text-xs font-medium">
                            <Mail className="w-3 h-3" />
                            Get in touch
                        </Link>
                    </div>
                </BentoCard>

                {/* 5. Featured Project Preview */}
                <BentoCard className="md:col-span-2 md:row-span-1 min-h-[220px] overflow-hidden group relative" delay={0.4} title="Recent Request" icon={ArrowUpRight}>
                    <Link href="/projects" className="absolute inset-0 z-20" aria-label="View Projects" />
                    <div className="absolute inset-0 bg-blue-500/5 transition-colors group-hover:bg-blue-500/10" />
                    <div className="flex flex-col h-full justify-end relative z-10 p-2">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold mb-1 text-white">Project V + Arsenal</h3>
                                <p className="text-xs text-secondary">View the full project gallery and experiments.</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </BentoCard>

                {/* 6. Stats / KPI */}
                <BentoCard className="md:col-span-1 relative group" delay={0.5}>
                    <Link href="/about" className="absolute inset-0 z-20" aria-label="View Profile" />
                    <div className="flex flex-col items-center justify-center h-full group-hover:scale-105 transition-transform duration-300">
                        <Activity className="w-8 h-8 text-primary mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="text-3xl font-bold text-white">4+</span>
                        <span className="text-[10px] text-secondary mt-1 tracking-widest uppercase">Years Exp.</span>
                    </div>
                </BentoCard>

                {/* 7. Availability / Status */}
                <BentoCard className="md:col-span-1 bg-green-500/5 border-green-500/20" delay={0.55}>
                    <div className="flex flex-col justify-center h-full space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-green-400 font-mono text-xs">ONLINE</span>
                        </div>
                        <p className="text-[10px] text-secondary">Accepting brave new projects.</p>
                    </div>
                </BentoCard>

            </BentoGrid>
        </section>
    );
}
