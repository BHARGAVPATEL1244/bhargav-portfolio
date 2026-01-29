'use client';

import { useOSStore, WallpaperType, WindowStyle } from '../useOSStore';
import { Monitor, Layout, Component } from 'lucide-react';

export default function SettingsApp() {
    const theme = useOSStore(state => state.theme);
    const setTheme = useOSStore(state => state.setTheme);

    return (
        <div className="h-full w-full bg-[#f5f5f7] text-gray-900 flex">
            {/* Sidebar */}
            <div className="w-48 bg-[#e8e8ed] p-4 flex flex-col gap-2 border-r border-gray-300">
                <div className="text-xs font-bold text-gray-500 px-2 mb-2">PREFERENCES</div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/50 text-blue-600 font-medium cursor-default">
                    <Monitor size={14} /> Wallpaper
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-600 hover:bg-white/30 cursor-not-allowed">
                    <Layout size={14} /> Dock
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-gray-600 hover:bg-white/30 cursor-not-allowed">
                    <Component size={14} /> Apps
                </div>
            </div>

            {/* Content Preview */}
            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-2xl font-semibold mb-6">Wallpaper & Appearance</h1>

                <section className="mb-8">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Background</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <WallpaperOption
                            type="grid"
                            isActive={theme.wallpaper === 'grid'}
                            color="bg-black"
                            label="Cyberpunk Grid"
                            onClick={() => setTheme({ wallpaper: 'grid' })}
                        />
                        <WallpaperOption
                            type="gradient"
                            isActive={theme.wallpaper === 'gradient'}
                            color="bg-gradient-to-br from-indigo-500 to-purple-600"
                            label="Zen Gradient"
                            onClick={() => setTheme({ wallpaper: 'gradient' })}
                        />
                        <WallpaperOption
                            type="nexus"
                            isActive={theme.wallpaper === 'nexus'}
                            color="bg-gray-900"
                            label="Dark Nexus"
                            onClick={() => setTheme({ wallpaper: 'nexus' })}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Window Style</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <StyleOption
                            type="glass"
                            isActive={theme.windowStyle === 'glass'}
                            label="Glassmorphism"
                            desc="Blur & Transparency"
                            onClick={() => setTheme({ windowStyle: 'glass' })}
                        />
                        <StyleOption
                            type="retro"
                            isActive={theme.windowStyle === 'retro'}
                            label="Retro 95"
                            desc="Solid Gray & Bevels"
                            onClick={() => setTheme({ windowStyle: 'retro' })}
                        />
                        <StyleOption
                            type="solid"
                            isActive={theme.windowStyle === 'solid'}
                            label="High Contrast"
                            desc="Solid Black & White"
                            onClick={() => setTheme({ windowStyle: 'solid' })}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
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
