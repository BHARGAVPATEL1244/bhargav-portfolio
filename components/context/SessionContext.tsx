'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

interface SessionContextType {
    time: number;
    scrollpixels: number;
}

const SessionContext = createContext<SessionContextType>({ time: 0, scrollpixels: 0 });

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [stats, setStats] = useState({
        startTime: 0,
        time: 0,
        scrollpixels: 0,
    });

    const { scrollY } = useScroll();
    // specific useRef to track last position for delta calculation
    // We use a ref so it doesn't trigger re-renders just for calculation
    const lastScrollY = useState(0);

    useEffect(() => {
        // Init Start Time
        const start = Date.now();
        setStats(s => ({ ...s, startTime: start }));

        const interval = setInterval(() => {
            setStats(s => ({ ...s, time: Math.floor((Date.now() - start) / 1000) }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Track total pixels scrolled (cumulative)
    useMotionValueEvent(scrollY, "change", (latest) => {
        setStats(prev => {
            // We need to track the previous value to get the delta.
            // Since we can't easily access the "previous" motion value in this callback without a ref,
            // we will use a slight hack or just rely on the difference from a tracked ref.
            // Actually, let's use a ref for the last value.
            return prev;
        });
    });

    // Re-implementing scroll tracking with a simpler approach to avoid closure staleness
    useEffect(() => {
        let lastPy = window.scrollY;

        const handleScroll = () => {
            const currentPy = window.scrollY;
            const delta = Math.abs(currentPy - lastPy);

            if (delta > 0) {
                setStats(s => ({ ...s, scrollpixels: s.scrollpixels + delta }));
                lastPy = currentPy;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <SessionContext.Provider value={{ time: stats.time, scrollpixels: stats.scrollpixels }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);
