'use client';

import { useOSStore, WallpaperType, WindowStyle } from '../useOSStore';
import { Monitor, Layout, Component, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SettingsApp() {
    const osTheme = useOSStore(state => state.theme);
    const setOSTheme = useOSStore(state => state.setTheme);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="h-full w-full bg-[#f5f5f7] text-gray-900 flex">
            {/* Sidebar */}
            <div className="w-48 bg-[#e8e8ed] p-4 flex flex-col gap-2 border-r border-gray-300">
                <div className="text-xs font-bold text-gray-500 px-2 mb-2">PREFERENCES</div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/50 text-blue-600 font-medium cursor-default">
                    <Palette size={14} /> Appearance
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-600 hover:bg-white/30 cursor-not-allowed">
                    <Monitor size={14} /> Display
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-600 hover:bg-white/30 cursor-not-allowed">
                    <Layout size={14} /> Dock
                </div>
            </div>

            {/* Content Preview */}
            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-2xl font-semibold mb-6">Appearance</h1>

                <section className="mb-8">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">System Theme (Chroma Lab)</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <ThemeOption
                            themeId="deep-space"
                            currentTheme={theme}
                            label="Deep Space"
                            colors={['#030712', '#6366f1']}
                            setTheme={setTheme}
                        />
                        <ThemeOption
                            themeId="cyberpunk"
                            currentTheme={theme}
                            label="Cyberpunk"
                            colors={['#050505', '#ff00ff']}
                            setTheme={setTheme}
                        />
                        <ThemeOption
                            themeId="swiss"
                            currentTheme={theme}
                            label="Swiss Print"
                            colors={['#ffffff', '#d70000']}
                            setTheme={setTheme}
                        />
                        <ThemeOption
                            themeId="retro"
                            currentTheme={theme}
                            label="Retro 95"
                            colors={['#008080', '#c0c0c0']}
                            setTheme={setTheme}
                        />
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Background</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <WallpaperOption
                            type="grid"
                            isActive={osTheme.wallpaper === 'grid'}
                            color="bg-black"
                            label="Cyberpunk Grid"
                            onClick={() => setOSTheme({ wallpaper: 'grid' })}
                        />
                        <WallpaperOption
                            type="gradient"
                            isActive={osTheme.wallpaper === 'gradient'}
                            color="bg-gradient-to-br from-indigo-500 to-purple-600"
                            label="Zen Gradient"
                            onClick={() => setOSTheme({ wallpaper: 'gradient' })}
                        />
                        <WallpaperOption
                            type="nexus"
                            isActive={osTheme.wallpaper === 'nexus'}
                            color="bg-gray-900"
                            label="Dark Nexus"
                            onClick={() => setOSTheme({ wallpaper: 'nexus' })}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Window Style</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <StyleOption
                            type="glass"
                            isActive={osTheme.windowStyle === 'glass'}
                            label="Glassmorphism"
                            desc="Blur & Transparency"
                            onClick={() => setOSTheme({ windowStyle: 'glass' })}
                        />
                        <StyleOption
                            type="retro"
                            isActive={osTheme.windowStyle === 'retro'}
                            label="Retro 95"
                            desc="Solid Gray & Bevels"
                            onClick={() => setOSTheme({ windowStyle: 'retro' })}
                        />
                        <StyleOption
                            type="solid"
                            isActive={osTheme.windowStyle === 'solid'}
                            label="High Contrast"
                            desc="Solid Black & White"
                            onClick={() => setOSTheme({ windowStyle: 'solid' })}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

function ThemeOption({ themeId, currentTheme, label, colors, setTheme }: any) {
    const isActive = currentTheme === themeId;
    return (
        <button onClick={() => setTheme(themeId)} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${isActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex -space-x-2">
                {colors.map((c: string, i: number) => (
                    <div key={i} className="w-6 h-6 rounded-full border border-gray-200 ring-1 ring-white" style={{ backgroundColor: c }} />
                ))}
            </div>
            <span className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>{label}</span>
        </button>
    )
}

function WallpaperOption({ type, isActive, color, label, onClick }: any) {
    return (
        <button onClick={onClick} className="flex flex-row items-center gap-4 group p-2 rounded-lg hover:bg-black/5 transition-colors">
            <div className={`w-32 aspect-video rounded-lg shadow-sm border-2 transition-all overflow-hidden relative ${isActive ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className={`w-full h-full ${color}`}>
                    {type === 'grid' && (
                        <div className="w-full h-full text-green-500/20" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    )}
                </div>
                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                    </div>
                )}
            </div>
            <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>{label}</span>
        </button>
    )
}

function StyleOption({ type, isActive, label, desc, onClick }: any) {
    return (
        <button onClick={onClick} className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col h-full ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="font-medium text-gray-900 break-words w-full">{label}</div>
            <div className="text-xs text-gray-500 mt-1 leading-normal opacity-80">{desc}</div>
        </button>
    )
}
