'use client';

import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ComponentType<any>;
    delay?: number;
}

export function BentoCard({ children, className, title, icon: Icon, delay = 0 }: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className={cn(
                "bento-card group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]",
                className
            )}
        >
            {/* Header if Title/Icon provided */}
            {(title || Icon) && (
                <div className="flex items-center gap-3 mb-4 text-secondary group-hover:text-primary transition-colors">
                    {Icon && <Icon className="w-5 h-5" />}
                    {title && <span className="text-xs font-mono uppercase tracking-widest">{title}</span>}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex-1">
                {children}
            </div>

            {/* Decorative Gradient Blob */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
}

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mx-auto max-w-7xl p-6", className)}>
            {children}
        </div>
    );
}
