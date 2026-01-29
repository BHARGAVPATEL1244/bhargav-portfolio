'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Battery, Wifi, Moon, Sun } from 'lucide-react';

export default function PitchBot() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [icon, setIcon] = useState<React.ElementType>(Bot);
    const [stats, setStats] = useState<{ battery?: number; network?: string; time?: string }>({});

    useEffect(() => {
        const analyzeContext = async () => {
            let contextMessage = "I've analyzed your viewing context.";
            let detectedIcon = Bot;
            const newStats: typeof stats = {};

            // 1. Time Analysis
            const hour = new Date().getHours();
            if (hour < 5) {
                contextMessage = "Burning the midnight oil? I optimize for late-night focus.";
                detectedIcon = Moon;
                newStats.time = "Late Night";
            } else if (hour < 10) {
                contextMessage = "Good morning. Starting your day with some creative inspiration?";
                detectedIcon = Sun;
                newStats.time = "Morning";
            }

            // 2. Network Analysis
            // @ts-ignore - navigator.connection is experimental
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                if (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
                    contextMessage = "Network congestion detected. I've optimized assets for speed.";
                    detectedIcon = Wifi;
                    newStats.network = "Slow/Data Saver";
                }
            }

            // 3. Battery Analysis (Override others if critical)
            // @ts-ignore - navigator.getBattery is experimental
            if (navigator.getBattery) {
                try {
                    // @ts-ignore
                    const battery = await navigator.getBattery();
                    newStats.battery = Math.round(battery.level * 100);

                    if (battery.level < 0.2 && !battery.charging) {
                        contextMessage = `Battery at ${Math.round(battery.level * 100)}%. I'll keep this concise so you save power.`;
                        detectedIcon = Battery;
                    }
                } catch (e) {
                    // Battery API not supported or failed
                }
            }

            setStats(newStats);
            setMessage(contextMessage);
            setIcon(detectedIcon);

            // Delay showing to not overwhelm immediately
            setTimeout(() => setIsVisible(true), 1500);
        };

        analyzeContext();
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="fixed bottom-24 right-6 z-40 max-w-xs w-full"
                >
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl relative overflow-hidden">

                        {/* Decorative gradient */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                                {icon === Bot ? <Bot className="w-5 h-5 text-indigo-400" /> :
                                    icon === Battery ? <Battery className="w-5 h-5 text-red-400 animate-pulse" /> :
                                        icon === Wifi ? <Wifi className="w-5 h-5 text-amber-400" /> :
                                            icon === Moon ? <Moon className="w-5 h-5 text-purple-400" /> :
                                                <Sun className="w-5 h-5 text-yellow-400" />
                                }
                            </div>

                            <div className="flex-1">
                                <div className="text-[10px] uppercase font-mono text-indigo-300 mb-1 flex items-center gap-2">
                                    <span>System Detection</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                                </div>
                                <p className="text-sm text-white leading-relaxed font-medium">
                                    "{message}"
                                </p>

                                {/* Context Pill */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {stats.time && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">{stats.time}</span>}
                                    {stats.battery && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">Bat: {stats.battery}%</span>}
                                    {stats.network && <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">Net: {stats.network}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
