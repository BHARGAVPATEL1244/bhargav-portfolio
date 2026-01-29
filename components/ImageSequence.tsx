'use client';

import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ImageSequenceProps {
    progress: number; // 0 to 1
}

export default function ImageSequence({ progress }: ImageSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    const frameCount = 240;

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let count = 0;

            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                const frameNumber = i.toString().padStart(3, '0');
                img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;

                await new Promise((resolve) => {
                    img.onload = () => {
                        count++;
                        setLoadedCount(count);
                        resolve(null);
                    };
                    img.onerror = () => resolve(null); // Skip errors but continue
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        loadImages();
    }, []);

    // Draw frame based on progress
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Calculate frame index
        const index = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(progress * (frameCount - 1)))
        );

        const img = images[index];
        if (!img) return;

        const drawImageCover = () => {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.width;
            const imgHeight = img.height;

            // Calculate scale to cover
            const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

            const scaledWidth = imgWidth * ratio;
            const scaledHeight = imgHeight * ratio;

            const centerShift_x = (canvasWidth - scaledWidth) / 2;

            // Dynamic Vertical Pan logic:
            // If image is taller than canvas, pan from Bottom to Top based on progress
            // Progress 0: Align Bottom (Show Feet) -> y = canvasHeight - scaledHeight (Negative)
            // Progress 1: Align Top (Show Head) -> y = 0

            let centerShift_y = (canvasHeight - scaledHeight) / 2; // Default center

            if (scaledHeight > canvasHeight) {
                // If we want to start at Bottom (Feet) and go to Top (Head)
                // alignBottom = canvasHeight - scaledHeight;
                // alignTop = 0;
                // current = alignBottom + (alignTop - alignBottom) * progress
                // Simplified: (canvasHeight - scaledHeight) * (1 - progress)

                centerShift_y = (canvasHeight - scaledHeight) * (1 - progress);
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(
                img,
                0,
                0,
                imgWidth,
                imgHeight,
                centerShift_x,
                centerShift_y,
                scaledWidth,
                scaledHeight
            );
        };

        drawImageCover();

    }, [progress, images]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loadedCount < frameCount) {
        return (
            <div className="flex items-center justify-center h-full w-full bg-black text-white font-mono text-xs">
                LOADING SEQUENCE... {Math.round((loadedCount / frameCount) * 100)}%
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
        />
    );
}
