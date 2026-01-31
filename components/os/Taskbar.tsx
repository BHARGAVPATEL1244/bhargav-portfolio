'use client';

import { motion } from 'framer-motion';
import { useOSStore, AppId } from './useOSStore';
import { Terminal, Copy, Folder, Trash, Settings, Camera, CloudRain, FileText } from 'lucide-react';

const apps = [
    { id: 'finder', icon: Folder, color: 'text-blue-400', label: 'Finder' },
    { id: 'terminal', icon: Terminal, color: 'text-green-400', label: 'Terminal' },
    { id: 'browser', icon: Copy, color: 'text-indigo-400', label: 'Browser' },
    { id: 'settings', icon: Settings, color: 'text-gray-400', label: 'Settings' },
    { id: 'mirror', icon: Camera, color: 'text-pink-400', label: 'Mirror' },
    { id: 'weather', icon: CloudRain, color: 'text-blue-400', label: 'Weather' },
    { id: 'notes', icon: FileText, color: 'text-yellow-400', label: 'Notes' },
    { id: 'app-separator', icon: null, color: '', label: '' },
    { id: 'trash', icon: Trash, color: 'text-red-400', label: 'Trash' },
];

export default function Taskbar() {
    const openWindow = useOSStore((state) => state.openWindow);
    const windows = useOSStore((state) => state.windows);
    const activeWindowId = useOSStore((state) => state.activeWindowId);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
            <div className="flex items-end gap-3 px-4 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl">
                {apps.map((app) => {
                    if (app.id === 'app-separator') {
                        return <div key="sep" className="w-[1px] h-8 bg-white/10 mx-1" />;
                    }

                    const isOpen = windows[app.id as AppId]?.isOpen;
                    const isActive = activeWindowId === app.id;
                    const Icon = app.icon!;

                    return (
                        <motion.button
                            key={app.id}
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openWindow(app.id as AppId)}
                            className="relative group p-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 shadow-inner ${app.id === 'trash' ? 'group-hover:text-red-500' : ''}`}>
                                <Icon className={`w-6 h-6 ${app.color}`} />
                            </div>

                            {/* Dot indicator for open apps */}
                            {isOpen && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/50" />
                            )}

                            {/* Float App Name */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                                {app.label}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
