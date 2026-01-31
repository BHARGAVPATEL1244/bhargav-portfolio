'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DraggableBentoGrid } from '@/components/DraggableBentoGrid';
import { BentoCard } from '@/components/BentoGrid';
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

// --- Data Driven Items ---
// Item Configuration Data
const ITEM_CONFIG: Record<string, {
    baseClassName: string;
    render: () => ReactNode;
}> = {
    'headline': {
        baseClassName: "md:col-span-2 md:row-span-2 min-h-[400px] justify-between",
        render: () => (
            <BentoCard className="h-full justify-between" title="Welcome" delay={0.1}>
                <div className="flex flex-col h-full justify-between z-10 relative">
                    <div className="mt-8">
                        <div className="flex items-center text-sm font-medium text-emerald-400 mb-4 bg-emerald-500/10 w-fit px-3 py-1 rounded-full border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                            Available for work
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase">
                            BHARGAV<br />PATEL
                        </h1>
                    </div>
                    <div className="flex justify-between items-end">
                        <p className="text-sm text-secondary max-w-[300px] leading-relaxed">
                            Creative Developer & GUI Engineer.<br />
                            Crafting high-performance digital interfaces with depth and soul.
                        </p>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            </BentoCard>
        )
    },
    'about': {
        baseClassName: "md:col-span-1 md:row-span-2 min-h-[400px]",
        render: () => (
            <BentoCard className="h-full" delay={0.2} title="About">
                <div className="flex flex-col h-full">
                    <div className="flex-1 rounded-xl overflow-hidden bg-gray-900/50 mb-4 relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                            alt="Portrait"
                            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                        />
                        <div className="absolute bottom-3 left-3 z-20">
                            <p className="text-white text-sm font-medium">Digital Artisan</p>
                        </div>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">
                        Based in India.<br />
                        Obsessed with micro-interactions, 3D web experiences, and OS-level design systems.
                    </p>
                </div>
            </BentoCard>
        )
    },
    'visual-core': {
        baseClassName: "md:col-span-2 min-h-[400px] md:min-h-[500px] p-0 overflow-hidden relative",
        render: () => (
            <BentoCard className="h-full p-0 overflow-hidden relative" delay={0.2}>
                <VisualCoreGravity />
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-[10px] text-white font-mono uppercase">
                        Interactive Mode
                    </div>
                </div>
            </BentoCard>
        )
    },
    'tech-stack': {
        baseClassName: "md:col-span-1 h-[200px]",
        render: () => (
            <BentoCard className="h-full" delay={0.3} title="Arsenal" icon={Code2}>
                <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Typescript', 'Node.js', 'Framer', 'Three.js'].map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20 hover:text-foreground hover:border-primary/50 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </BentoCard>
        )
    },
    'connect': {
        baseClassName: "md:col-span-1 h-[200px] relative group",
        render: () => (
            <BentoCard className="h-full relative group" delay={0.35} title="Connect" icon={Globe}>
                <div className="flex flex-col h-full justify-between pt-2">
                    <div className="grid grid-cols-5 gap-2">
                        <a href="https://github.com/BHARGAVPATEL1244" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/50 hover:text-foreground transition-colors border border-foreground/5 hover:border-foreground/20">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://www.linkedin.com/in/bhargav1244" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/50 hover:text-foreground transition-colors border border-foreground/5 hover:border-foreground/20">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="https://www.instagram.com/bhargav.frames/" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/50 hover:text-foreground transition-colors border border-foreground/5 hover:border-foreground/20">
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a href="https://www.snapchat.com/@bhargavs_1244" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/50 hover:text-foreground transition-colors border border-foreground/5 hover:border-foreground/20">
                            <Ghost className="w-4 h-4" />
                        </a>
                    </div>
                    <Link href="/contact" className="w-full py-2 rounded-lg bg-foreground/5 hover:bg-indigo-500/20 text-foreground/50 hover:text-indigo-300 transition-colors border border-foreground/5 hover:border-indigo-500/30 flex items-center justify-center gap-2 text-xs font-medium">
                        <Mail className="w-3 h-3" />
                        Get in touch
                    </Link>
                </div>
            </BentoCard>
        )
    },
    'recent-project': {
        baseClassName: "md:col-span-2 md:row-span-1 min-h-[220px] overflow-hidden group relative",
        render: () => (
            <BentoCard className="h-full overflow-hidden group relative" delay={0.4} title="Recent Request" icon={ArrowUpRight}>
                <Link href="/projects" className="absolute inset-0 z-20" aria-label="View Projects" />
                <div className="absolute inset-0 bg-blue-500/5 transition-colors group-hover:bg-blue-500/10" />
                <div className="flex flex-col h-full justify-end relative z-10 p-2">
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-foreground">Project V + Arsenal</h3>
                            <p className="text-xs text-secondary">View the full project gallery and experiments.</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                            <ArrowUpRight className="w-4 h-4 text-foreground/80 group-hover:text-white" />
                        </div>
                    </div>
                </div>
            </BentoCard>
        )
    },
    'stats': {
        baseClassName: "md:col-span-1 relative group",
        render: () => (
            <BentoCard className="h-full relative group" delay={0.5}>
                <Link href="/about" className="absolute inset-0 z-20" aria-label="View Profile" />
                <div className="flex flex-col items-center justify-center h-full group-hover:scale-105 transition-transform duration-300">
                    <Activity className="w-8 h-8 text-primary mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-3xl font-bold text-foreground">4+</span>
                    <span className="text-[10px] text-secondary mt-1 tracking-widest uppercase">Years Exp.</span>
                </div>
            </BentoCard>
        )
    },
    'status': {
        baseClassName: "md:col-span-1 bg-green-500/5 border-green-500/20",
        render: () => (
            <BentoCard className="h-full bg-green-500/5 border-green-500/20" delay={0.55}>
                <div className="flex flex-col justify-center h-full space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-500 font-mono text-xs">ONLINE</span>
                    </div>
                    <p className="text-[10px] text-secondary">Accepting brave new projects.</p>
                </div>
            </BentoCard>
        )
    }
};

const DEFAULT_ORDER = Object.keys(ITEM_CONFIG);

export default function Hero() {
    const [order, setOrder] = useState<string[]>(DEFAULT_ORDER);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize state from local storage on mount
    useEffect(() => {
        // Load Order
        const savedOrder = localStorage.getItem('hero-bento-order');
        if (savedOrder) {
            try {
                setOrder(JSON.parse(savedOrder));
            } catch (e) {
                console.error("Failed to parse saved order", e);
            }
        }

        setIsLoaded(true);
    }, []);

    const handleOrderChange = (newOrder: string[]) => {
        setOrder(newOrder);
        localStorage.setItem('hero-bento-order', JSON.stringify(newOrder));
    };

    if (!isLoaded) return null; // Or a skeleton loader to prevent layout shift

    // Generate Items based on state
    const items = order.map(id => {
        const config = ITEM_CONFIG[id];
        if (!config) return null; // Skip if config not found for an ID in order

        return {
            id,
            className: config.baseClassName,
            content: config.render()
        };
    }).filter(Boolean) as any[]; // Filter out any nulls and cast to any[] for DraggableBentoGrid

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 pb-20">
            <DraggableBentoGrid items={items} onOrderChange={handleOrderChange} />
        </section>
    );
}
