'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from './useOSStore';
import Taskbar from './Taskbar';
import WindowFrame from './WindowFrame';
import { Terminal, Copy, Folder, Trash, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

import TerminalApp from './apps/TerminalApp';
import FinderApp from './apps/FinderApp';
import SettingsApp from './apps/SettingsApp';
import TrashApp from './apps/TrashApp';
import MirrorApp from './apps/MirrorApp';
import WeatherApp from './apps/WeatherApp';
import NotesApp from './apps/NotesApp';
import ContextMenu from './ContextMenu';
import { Camera, CloudRain, FileText } from 'lucide-react';

const BrowserApp = () => (
    <div className="h-full w-full bg-white text-black flex flex-col">
        {/* URL Bar */}
        <div className="h-10 bg-gray-100 border-b flex items-center px-4 gap-4 text-sm text-gray-500">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <input
                type="text"
                defaultValue="https://bhargav.dev"
                className="flex-1 h-7 bg-white rounded border flex items-center px-3 outline-none text-gray-700 font-mono text-xs"
            />
        </div>
        <div className="flex-1 bg-white relative">
            <iframe
                src="https://www.wikipedia.org"
                className="w-full h-full border-none"
                title="Browser"
            />
        </div>
    </div>
);

export default function OSDesktop() {
    const isBooted = useOSStore(state => state.isBooted);
    const shutdownOS = useOSStore(state => state.shutdownOS);
    const theme = useOSStore(state => state.theme);

    if (!isBooted) return null;

    // Wallpaper Logic
    const getWallpaperStyle = () => {
        if (!theme) return { backgroundColor: '#050505' }; // Safety check

        switch (theme.wallpaper) {
            case 'gradient':
                return { background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)' };
            case 'nexus':
                return { background: '#09090b', backgroundImage: 'radial-gradient(circle at center, #18181b 0%, #000 100%)' };
            case 'grid':
            default:
                return {
                    backgroundColor: '#050505',
                    backgroundImage: `
                        linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                };
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                className="fixed inset-0 z-[500] overflow-hidden"
                style={getWallpaperStyle()}
            >
                {/* Desktop Icons Area (Click to clear focus) */}
                <div
                    className="absolute inset-0"
                    onPointerDown={(e) => {
                        if (e.target === e.currentTarget) {
                            // deselect windows logic could go here
                        }
                    }}
                />

                {/* Windows Container */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* We use pointer-events-auto inside WindowFrame to re-enable clicks */}
                    <div className="relative w-full h-full pointer-events-auto">
                        <WindowFrame id="terminal" icon={<Terminal size={12} />}>
                            <TerminalApp />
                        </WindowFrame>

                        <WindowFrame id="browser" icon={<Copy size={12} />}>
                            <BrowserApp />
                        </WindowFrame>

                        <WindowFrame id="finder" icon={<Folder size={12} />}>
                            <FinderApp />
                        </WindowFrame>

                        <WindowFrame id="settings" icon={<Settings size={12} />}>
                            <SettingsApp />
                        </WindowFrame>

                        <WindowFrame id="trash" icon={<Trash size={12} />}>
                            <TrashApp />
                        </WindowFrame>

                        <WindowFrame id="mirror" icon={<Camera size={12} />}>
                            <MirrorApp />
                        </WindowFrame>

                        <WindowFrame id="weather" icon={<CloudRain size={12} />}>
                            <WeatherApp />
                        </WindowFrame>

                        <WindowFrame id="notes" icon={<FileText size={12} />}>
                            <NotesApp />
                        </WindowFrame>
                    </div>
                </div>

                {/* Dock */}
                <Taskbar />

                {/* Context Menu */}
                <ContextMenu />

                {/* Close/Exit OS Button (Escape Hatch) */}
                <button
                    onClick={shutdownOS}
                    className="fixed top-4 right-4 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-xs font-mono hover:bg-red-500 hover:text-white transition-colors z-[1000]"
                >
                    EXIT OS
                </button>
            </motion.div>
        </AnimatePresence>
    );
}
