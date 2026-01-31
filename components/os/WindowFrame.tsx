'use client';

import { motion, useDragControls } from 'framer-motion';
import { Minus, X, Maximize2 } from 'lucide-react';
import { useOSStore, AppId } from './useOSStore';
import React, { ReactNode, useRef, useEffect } from 'react';

interface WindowFrameProps {
    id: AppId;
    children: ReactNode;
    icon?: ReactNode;
}

export default function WindowFrame({ id, children, icon }: WindowFrameProps) {
    const windowState = useOSStore((state) => state.windows[id]);
    const activeWindowId = useOSStore((state) => state.activeWindowId);
    const focusWindow = useOSStore((state) => state.focusWindow);
    const closeWindow = useOSStore((state) => state.closeWindow);
    const minimizeWindow = useOSStore((state) => state.minimizeWindow);
    const theme = useOSStore((state) => state.theme);
    const moveWindow = useOSStore((state) => state.moveWindow);
    const resizeWindow = useOSStore((state) => state.resizeWindow);

    const controls = useDragControls();

    // --- Resize Logic ---
    const [isResizing, setIsResizing] = React.useState(false);

    useEffect(() => {
        if (!isResizing) return;

        function handlePointerMove(e: PointerEvent) {
            // Update size based on pointer position relative to window position
            const newWidth = Math.max(300, e.clientX - windowState.position.x);
            const newHeight = Math.max(200, e.clientY - windowState.position.y);

            resizeWindow(id, { width: newWidth, height: newHeight });
        }

        function handlePointerUp() {
            setIsResizing(false);
            document.body.style.cursor = 'default';
        }

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isResizing, id, resizeWindow, windowState?.position]);

    const onResizeStart = (e: React.PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        document.body.style.cursor = 'nwse-resize';
    };

    if (!windowState.isOpen || windowState.isMinimized) return null;

    const isActive = activeWindowId === id;

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            drag
            dragControls={controls}
            dragListener={false} // Only drag from header
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(_, info) => {
                const newX = windowState.position.x + info.offset.x;
                const newY = windowState.position.y + info.offset.y;
                moveWindow(id, { x: newX, y: newY });
            }}
            style={{
                position: 'absolute',
                width: windowState.size.width,
                height: windowState.size.height,
                left: windowState.position.x,
                top: windowState.position.y,
                zIndex: windowState.zIndex,
            }}
            onPointerDown={() => focusWindow(id)}
            className={`flex flex-col overflow-hidden transition-all duration-300 ${theme.windowStyle === 'retro'
                ? 'border-2 border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0] text-black rounded-none shadow-[2px_2px_0px_rgba(0,0,0,0.5)]'
                : theme.windowStyle === 'solid'
                    ? 'border-white bg-black text-white rounded-none border-2'
                    : isActive
                        ? 'rounded-lg border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-gray-900/90 backdrop-blur-xl'
                        : 'rounded-lg border border-white/5 shadow-xl bg-gray-900/80 backdrop-blur-lg'
                }`}
        >
            {/* Header Bar */}
            <div
                className={`h-8 flex items-center justify-between px-2 select-none cursor-default ${theme.windowStyle === 'retro'
                    ? isActive ? 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white' : 'bg-[#808080] text-[#c0c0c0]'
                    : 'border-b border-white/5 bg-white/5 h-10 px-4'
                    }`}
                onPointerDown={(e) => {
                    controls.start(e);
                    focusWindow(id);
                }}
            >
                {theme.windowStyle === 'retro' ? (
                    // Retro Header Layout
                    <div className="flex items-center justify-between w-full font-bold tracking-wider text-[11px] font-[MS_Sans_Serif,sans-serif]">
                        <div className="flex items-center gap-2">
                            <span>{windowState.title}</span>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="w-4 h-4 bg-[#c0c0c0] border-t-white border-l-white border-b-black border-r-black border text-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                                <Minus size={8} strokeWidth={4} />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="w-4 h-4 bg-[#c0c0c0] border-t-white border-l-white border-b-black border-r-black border text-black flex items-center justify-center active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                                <X size={10} strokeWidth={4} />
                            </button>
                        </div>
                    </div>
                ) : (
                    // Modern Header Layout
                    <>
                        <div className="flex items-center gap-2 group">
                            <button
                                onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center text-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={8} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center text-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Minus size={8} />
                            </button>
                            <button
                                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Maximize2 size={8} />
                            </button>
                        </div>

                        <div className="text-xs font-medium text-white/50 flex items-center gap-2">
                            {icon}
                            <span>{windowState.title}</span>
                        </div>
                        <div className="w-10" />
                    </>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 w-full overflow-auto relative">
                {children}
            </div>

            {/* Resize Handle */}
            <div
                className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 flex items-end justify-end p-1 select-none"
                onPointerDown={onResizeStart}
            >
                <div className="w-2 h-2 border-r-2 border-b-2 border-white/20" />
            </div>
        </motion.div>
    );
}
