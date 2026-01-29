'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProjectMasonryGravity from '@/components/ProjectMasonryGravity';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                <header className="flex items-center justify-between mb-24">
                    <Link href="/" className="flex items-center gap-2 text-secondary hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono uppercase tracking-widest">Back to Core</span>
                    </Link>
                    <div className="text-right">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Projects</h1>
                        <p className="text-secondary font-mono text-xs tracking-widest uppercase">Select Work 2023 — 2026</p>
                    </div>
                </header>

                {/* Gravity Grid */}
                <ProjectMasonryGravity />
            </div>
        </main>
    );
}
