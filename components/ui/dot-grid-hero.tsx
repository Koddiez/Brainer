// FIX: Changed React import to standard named import to resolve type issues.
import React, { useState, MouseEvent } from "react";
// FIX: Import Variants type from framer-motion to correctly type animation variants.
import { motion, type Variants } from "framer-motion";
import { cn } from "../../lib/utils";

const DotGridHero = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
    const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
    };

    const dotSize = 2;
    const dotGap = 25;
    const glowRadius = 200;

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: -500, y: -500 })}
            className={cn("relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#030303]", className)}
        >
            <div className="absolute inset-0 z-0">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern
                            id="dot-pattern"
                            width={dotGap}
                            height={dotGap}
                            patternUnits="userSpaceOnUse"
                        >
                            <circle className="dot-pattern-circle" cx={dotSize} cy={dotSize} r={dotSize / 2} />
                        </pattern>
                        <radialGradient id="mouse-glow" cx="50%" cy="50%" r="50%">
                            <stop stopColor="rgba(34, 197, 94, 0.3)" offset="0%" />
                            <stop stopColor="rgba(79, 70, 229, 0.3)" offset="50%" />
                            <stop stopColor="rgba(79, 70, 229, 0)" offset="100%" />
                        </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                    <motion.circle
// FIX: Correctly pass framer-motion props to resolve type errors.
                        cx={mousePosition.x}
                        cy={mousePosition.y}
                        r={glowRadius}
                        fill="url(#mouse-glow)"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                </svg>
            </div>
            {children}
        </div>
    );
};

export const HeroContent = ({
    badge = "Brainer Platform",
    title1 = "Empowering Nigeria’s Youth",
    title2 = "Through Innovation & Competition",
    children
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    children?: React.ReactNode;
}) => {
    // FIX: Explicitly type fadeUpVariants with Variants from framer-motion to resolve type inference issues.
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: "easeInOut",
            },
        }),
    };
    return (
        <div className="relative z-10 flex flex-col items-center text-center p-4">
            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="mb-8 inline-block rounded-full border border-gray-300 dark:border-white/10 bg-gray-100/80 dark:bg-white/5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 backdrop-blur-sm"
            >
                {badge}
            </motion.div>
            <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="text-5xl font-bold tracking-tight text-transparent sm:text-7xl md:text-8xl bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-50 dark:to-gray-400"
            >
                {title1}
                <br />
                <span className="bg-clip-text bg-gradient-to-r from-emerald-500 via-indigo-500 to-indigo-600 dark:from-emerald-400 dark:via-indigo-400 dark:to-indigo-500">
                    {title2}
                </span>
            </motion.h1>
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                {children}
            </motion.div>
        </div>
    );
}

export default DotGridHero;
