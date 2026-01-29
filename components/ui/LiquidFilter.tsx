'use client';

import { motion } from 'framer-motion';

/**
 * A reusable SVG Liquid Filter.
 * Wraps children and applies a displacement map effect on hover.
 */
export const LiquidFilter = ({ id = "liquid-filter" }) => {
    return (
        <svg className="absolute w-0 h-0">
            <defs>
                <filter id={id}>
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.04 0.04"
                        numOctaves="3"
                        result="noise"
                    >
                        <animate
                            attributeName="baseFrequency"
                            dur="5s"
                            values="0.04 0.04; 0.02 0.02; 0.04 0.04"
                            repeatCount="indefinite"
                        />
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="50"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </defs>
        </svg>
    );
};
