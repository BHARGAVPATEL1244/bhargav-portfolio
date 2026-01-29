'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "Neon FinTech",
        category: "Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        rotation: -2,
        scale: 0.98
    },
    {
        id: 2,
        title: "CyberDeck UI",
        category: "System Architecture",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
        rotation: 3,
        scale: 1
    },
    {
        id: 3,
        title: "Holo Earth",
        category: "3D Visualization",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
        rotation: -4,
        scale: 0.95
    },
    {
        id: 4,
        title: "Void Commerce",
        category: "E-Commerce",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        rotation: 1,
        scale: 1.02
    },
    {
        id: 5,
        title: "Neural Net",
        category: "AI Interface",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
        rotation: -1,
        scale: 0.99
    },
    {
        id: 6,
        title: "Crypto Pulse",
        category: "Web3",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
        rotation: 2,
        scale: 1.01
    }
];

export default function ProjectMasonry() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
            ))}
        </div>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 50,
                rotate: project.rotation
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotate: project.rotation,
                transition: { duration: 0.6, delay: index * 0.1 }
            }}
            whileHover={{
                rotate: 0,
                scale: 1.05,
                zIndex: 10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}

            viewport={{ once: true, margin: "-50px" }}
            className="group relative w-full h-[500px] rounded-3xl overflow-hidden bg-card border border-white/5 cursor-pointer shadow-2xl"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Content Layer */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-mono text-primary mb-2 block tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                        {project.category}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                        {project.title}
                    </h3>
                    <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300 ease-out" />
                </div>

                <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>

            {/* Hover Glow Edge */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-3xl transition-colors duration-300 pointer-events-none" />
        </motion.div>
    );
}
