'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KeyboardManager() {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (e.key.toLowerCase()) {
                case 'p':
                    router.push('/projects');
                    break;
                case 'a':
                    router.push('/about');
                    break;
                case 'c':
                    router.push('/contact');
                    break;
                case 'h':
                    router.push('/');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return null; // Hidden component
}
