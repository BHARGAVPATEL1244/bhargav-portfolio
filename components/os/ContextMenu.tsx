'use client';

import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, Monitor, FolderPlus, Info, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useOSStore } from './useOSStore';

export default function ContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const setTheme = useOSStore(state => state.setTheme);
    const theme = useOSStore(state => state.theme);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            // Prevent custom menu on inputs or selected text
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
            if (window.getSelection()?.toString()) return;

            e.preventDefault();
            setVisible(true);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setVisible(false);
        };

        // Attach listener strictly to the desktop container if possible, 
        // but for global OS feel, document level is okay for now, 
        // ensuring we don't block app internal context menus if needed later.
        // For now, override everywhere on the "OS layer".
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const router = useRouter();

    // Actions
    const handleRefresh = () => {
        window.location.reload();
    };

    const handleChangeWallpaper = () => {
        const wallpapers: ('grid' | 'gradient' | 'nexus')[] = ['grid', 'gradient', 'nexus'];
        const currentIndex = wallpapers.indexOf(theme.wallpaper);
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        setTheme({ wallpaper: wallpapers[nextIndex] });
        setVisible(false);
    };

    const handleSystemInfo = () => {
        alert("Bhargav OS v1.0\nrunning on Next.js 14");
        setVisible(false);
    };

    const handleNavigation = (path: string) => {
        if (path === 'home') {
            // Check if we are already on home to avoid reload, or force boot depending on logic
            window.location.href = '/';
        } else {
            router.push(path);
        }
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                    className="fixed z-[9999] min-w-[200px] bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl p-1 overflow-hidden"
                    style={{ top: position.y, left: position.x }}
                >
                    <div className="flex flex-col gap-1">
                        <MenuItem
                            icon={RefreshCw}
                            label="Refresh System"
                            onClick={handleRefresh}
                        />
                        <MenuItem
                            icon={Monitor}
                            label="Change Wallpaper"
                            onClick={handleChangeWallpaper}
                        />
                        <div className="h-[1px] bg-white/10 my-1" />
                        <MenuItem
                            icon={FolderPlus}
                            label="New Folder"
                            onClick={() => setVisible(false)}
                            disabled
                        />
                        <div className="h-[1px] bg-white/10 my-1" />

                        <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold px-3 py-1">Navigation</div>
                        <MenuItem
                            icon={Monitor}
                            label="Home"
                            onClick={() => handleNavigation('home')}
                        />
                        <MenuItem
                            icon={FolderPlus}
                            label="Projects"
                            onClick={() => handleNavigation('/projects')}
                        />
                        <MenuItem
                            icon={Info}
                            label="About"
                            onClick={() => handleNavigation('/about')}
                        />
                        <MenuItem
                            icon={Mail}
                            label="Contact"
                            onClick={() => handleNavigation('/contact')}
                        />

                        <div className="h-[1px] bg-white/10 my-1" />
                        <MenuItem
                            icon={Info}
                            label="System Info"
                            onClick={handleSystemInfo}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function MenuItem({ icon: Icon, label, onClick, disabled = false }: { icon: any, label: string, onClick: () => void, disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-3 px-3 py-2 rounded text-sm text-left transition-colors
                ${disabled ? 'opacity-50 cursor-not-allowed text-white/40' : 'text-white/90 hover:bg-white/10 hover:text-white'}
            `}
        >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
        </button>
    );
}
