import { WifiOff } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Glitch Effect Element */}
            <div className="animate-pulse absolute top-10 left-10 text-xs text-red-500 font-bold">
                CONNECTION_ERORR::0x00
            </div>

            <div className="z-10 bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-md max-w-md w-full text-center relative shadow-2xl">

                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20 animate-pulse">
                    <WifiOff className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-3xl font-black mb-2 uppercase tracking-tight">Signal Lost</h1>
                <p className="text-white/50 mb-8 text-sm">
                    You are currently drifting in deep space. <br />
                    Check your uplink module (internet connection).
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-colors w-full"
                >
                    Retry Connection
                </Link>

                {/* Decorative footer in the card */}
                <div className="mt-8 pt-4 border-t border-white/5 text-[10px] text-white/20 flex justify-between uppercase">
                    <span>ERR_INTERNET_DISCONNECTED</span>
                    <span>SYSTEM_HALTED</span>
                </div>
            </div>

        </div>
    );
}
