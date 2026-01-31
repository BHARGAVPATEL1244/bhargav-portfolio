'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';

const DENSITY = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

export default function MirrorApp() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animationRef = useRef<number>(undefined);
    const isMounted = useRef(true);

    const [ascii, setAscii] = useState<string>("");
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = undefined;
        }
    };

    const startCamera = async () => {
        stopCamera();

        try {
            if (!isMounted.current) return;

            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 100, height: 75 } });

            if (!isMounted.current) {
                stream.getTracks().forEach(t => t.stop());
                return;
            }

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                try {
                    await videoRef.current.play();

                    if (!isMounted.current) {
                        stopCamera();
                        return;
                    }
                    setHasPermission(true);
                    setError(null);
                } catch (e) {
                    if (isMounted.current) {
                        console.error("Play error", e);
                    }
                }
            }
        } catch (err) {
            if (isMounted.current) {
                console.error("Error accessing camera:", err);
                setHasPermission(false);
                setError("Camera access denied or unavailable.");
            }
        }
    };

    useEffect(() => {
        isMounted.current = true;
        startCamera();

        return () => {
            isMounted.current = false;
            stopCamera();
        };
    }, []);

    const processFrame = () => {
        if (!isMounted.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) {
            animationRef.current = requestAnimationFrame(processFrame);
            return;
        }

        if (video.readyState < 2) {
            animationRef.current = requestAnimationFrame(processFrame);
            return;
        }

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const w = 100;
        const h = 75;

        if (canvas.width !== w) canvas.width = w;
        if (canvas.height !== h) canvas.height = h;

        ctx.drawImage(video, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        let asciiImage = "";
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const offset = (y * w + x) * 4;
                const r = data[offset];
                const g = data[offset + 1];
                const b = data[offset + 2];

                const avg = (r + g + b) / 3;
                const len = DENSITY.length;
                const charIndex = Math.floor((avg / 255) * len);

                const c = DENSITY.charAt(len - 1 - charIndex);
                asciiImage += c === " " ? "&nbsp;" : c;
            }
            asciiImage += "<br/>";
        }

        setAscii(asciiImage);
        animationRef.current = requestAnimationFrame(processFrame);
    };

    useEffect(() => {
        if (hasPermission && isMounted.current) {
            animationRef.current = requestAnimationFrame(processFrame);
        }
    }, [hasPermission]);

    return (
        <div className="w-full h-full bg-black text-green-500 font-mono text-[8px] leading-[8px] overflow-hidden flex flex-col relative p-4 select-none">
            <video ref={videoRef} playsInline muted className="hidden" />
            <canvas ref={canvasRef} className="hidden" />

            <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                    onClick={startCamera}
                    className="p-2 bg-green-900/20 hover:bg-green-900/40 text-green-500 rounded-full transition-colors"
                    title="Restart Camera"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            {error ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                    <CameraOff className="w-12 h-12 opacity-50" />
                    <p className="text-sm max-w-[200px]">{error}</p>
                    <button
                        onClick={startCamera}
                        className="px-4 py-2 border border-green-500/50 hover:bg-green-500/10 rounded text-xs"
                    >
                        Retry Permission
                    </button>
                </div>
            ) : !hasPermission && hasPermission !== false ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Camera className="w-12 h-12 animate-pulse" />
                    <p className="text-xs">Initializing Neural Link...</p>
                </div>
            ) : (
                <div
                    className="w-full h-full flex items-center justify-center whitespace-nowrap overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: ascii }}
                />
            )}

            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20" style={{ backgroundSize: "100% 2px, 3px 100%" }} />
        </div>
    );
}
