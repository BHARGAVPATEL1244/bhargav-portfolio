'use client';

import { Monitor } from 'lucide-react';
import { useOSStore } from './useOSStore';

export default function OSBootButton() {
    const bootOS = useOSStore(state => state.bootOS);
    const isBooted = useOSStore(state => state.isBooted);

    if (isBooted) return null;

    return (
        <button
            onClick={bootOS}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-indigo-500 hover:border-indigo-400 hover:scale-110 transition-all group shadow-2xl backdrop-blur-md"
            title="Launch Desktop Mode"
        >
            <Monitor className="w-5 h-5 group-hover:animate-pulse" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-black/80 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                Desktop Mode
            </span>
        </button>
    );
}
