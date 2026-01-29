'use client';

import { motion } from 'framer-motion';

const TECH_STACK = [
    "React", "Next.js", "TypeScript", "TailwindCSS", "Node.js", "Supabase", "Framer Motion", "Three.js", "PostgreSQL", "GraphQL"
];

export default function InfiniteMarquee() {
    return (
        <div className="relative w-full overflow-hidden bg-white/5 border-y border-white/5 py-4 backdrop-blur-sm">
            <div className="flex w-max">
                {[0, 1].map((i) => (
                    <motion.div
                        key={i}
                        className="flex gap-8 px-4"
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {TECH_STACK.map((tech, index) => (
                            <span
                                key={index}
                                className="text-xl font-bold text-white/50 uppercase tracking-widest whitespace-nowrap"
                            >
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>
    );
}
