'use client';

import { useSession } from '../context/SessionContext';
import { motion } from 'framer-motion';

export default function FooterReceipt() {
    const { time, scrollpixels } = useSession();
    const date = new Date().toLocaleDateString();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-sm mx-auto my-24 p-6 bg-white text-black font-mono text-xs rotate-3 shadow-2xl relative"
            style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                // Helper to make jagged edges (simulated via CSS mask or just style)
            }}
        >
            {/* Screw/Hole visual */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-300 border border-gray-400" />

            <div className="text-center border-b-2 border-dashed border-black/20 pb-4 mb-4">
                <h3 className="text-xl font-black uppercase tracking-widest">Gravity OS</h3>
                <p className="opacity-60">Session Receipt</p>
                <p className="mt-2">{date}</p>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                    <span>ITEM</span>
                    <span>QTY</span>
                    <span>COST</span>
                </div>
                <div className="w-full h-px bg-black/10 my-2" />

                <div className="flex justify-between">
                    <span>TIME SPENT</span>
                    <span>{time}s</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                    <span>PIXELS SCROLLED</span>
                    <span>{scrollpixels}px</span>
                    <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                    <span>VIBES ABSORBED</span>
                    <span>∞</span>
                    <span>$0.00</span>
                </div>
            </div>

            <div className="border-t-2 border-dashed border-black/20 pt-4 text-center">
                <div className="flex justify-between font-bold text-lg mb-2">
                    <span>TOTAL</span>
                    <span>$0.00</span>
                </div>
                <p className="text-[10px] opacity-60">THANK YOU FOR VISITING</p>
                <div className="mt-4 barcode h-8 w-full bg-black opacity-80" />
            </div>

            {/* Jagged Bottom Edge (CSS Trick) */}
            <div
                className="absolute -bottom-2 left-0 w-full h-4 bg-transparent"
                style={{
                    background: "linear-gradient(45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%)",
                    backgroundSize: "20px 40px",
                    backgroundPosition: "0 -20px"
                }}
            />
        </motion.div>
    );
}
