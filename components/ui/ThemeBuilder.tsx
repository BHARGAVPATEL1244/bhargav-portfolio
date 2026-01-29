'use client';

import { Paintbrush } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
    { name: 'Indigo', color: '99 102 241', hex: '#6366f1' },
    { name: 'Emerald', color: '16 185 129', hex: '#10b981' },
    { name: 'Rose', color: '244 63 94', hex: '#f43f5e' },
    { name: 'Amber', color: '245 158 11', hex: '#f59e0b' },
    { name: 'Cyan', color: '6 182 212', hex: '#06b6d4' },
];

export default function ThemeBuilder() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState('Indigo');

    const setTheme = (theme: typeof themes[0]) => {
        document.documentElement.style.setProperty('--primary', theme.color);
        setActiveTheme(theme.name);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="mb-4 p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-2"
                    >
                        <div className="text-[10px] uppercase font-mono text-white/50 mb-1 text-center">System Theme</div>
                        <div className="grid grid-cols-1 gap-2">
                            {themes.map((t) => (
                                <button
                                    key={t.name}
                                    onClick={() => setTheme(t)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${activeTheme === t.name ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                                >
                                    <div
                                        className="w-4 h-4 rounded-full shadow-[0_0_10px_inset_rgba(0,0,0,0.5)]"
                                        style={{ backgroundColor: t.hex }}
                                    />
                                    <span className="text-xs font-medium">{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border border-white/10 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-black/50 backdrop-blur-md text-white hover:bg-white/10'}`}
            >
                <Paintbrush className="w-5 h-5" />
            </button>
        </div>
    );
}
