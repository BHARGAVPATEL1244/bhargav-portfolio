'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { LiquidFilter } from './ui/LiquidFilter';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description?: string;
    link?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Goat Gang",
        category: "Hay Day Community",
        image: "/projects/goat-gang-vercel.png",
        link: "https://goat-gang.vercel.app/",
        description: "The #1 Hay Day community platform with hood tracking and events."
    },
    {
        id: 2,
        title: "Goat Gang Bot",
        category: "Automation Bot",
        image: "/projects/goat-gang-vercel.png",
        link: "https://goat-gang.vercel.app/",
        description: "Discord bot for the Goat Gang server."
    },
    {
        id: 3,
        title: "Kalp Enterprise",
        category: "Renewable Energy",
        image: "/projects/kalp-solar.png",
        link: "https://kalp-enterprise.netlify.app/",
        description: "Comprehensive solar energy solutions and installations."
    },
    {
        id: 4,
        title: "Triventaexim",
        category: "Global Export",
        image: "/projects/triventa.png",
        link: "https://triventaexim.netlify.app/",
        description: "Premium castor oil manufacturer and worldwide exporter."
    },
    {
        id: 5,
        title: "Kalp-Solar",
        category: "Renewable Energy",
        image: "/projects/kalp-solar.png",
        link: "https://kalp-enterprise.netlify.app/",
        description: "Comprehensive solar energy solutions and installations."
    },
    {
        id: 6,
        title: "Goat Gang",
        category: "Hay Day Community",
        image: "/projects/goat-gang-netlify.png",
        link: "https://goat-gang.netlify.app/",
        description: "The #1 Hay Day community platform with hood tracking and events."
    },
    {
        id: 7,
        title: "Portfolio v1",
        category: "Legacy Site",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/my-avatar.png",
        link: "https://bhargavsuhagiya.netlify.app/",
        description: "The foundation. My previous creative showcase."
    },
    {
        id: 8,
        title: "Real Estate Property Management",
        category: "odoo development",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/odoo%20development/banner.gif",
        link: "https://apps.odoo.com/apps/modules/16.0/real_estate_bs/"
    },
    {
        id: 9,
        title: "Student Query Portal",
        category: "web development",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/web%20development/student_query_portal.png",
        link: "https://github.com/BHARGAVPATEL1244/student-query-portal"
    },
    {
        id: 10,
        title: "Minecraft",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/1.png",
        link: "https://lens.snapchat.com/e4f4c4cd33094925bc83c105e7ab6a96"
    },
    {
        id: 11,
        title: "SpaceTroids Game",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/2.png",
        link: "https://lens.snapchat.com/a5137ba762774ba58b516d8c29e2794b"
    },
    {
        id: 12,
        title: "Phoenix Bird",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/3.png",
        link: "https://lens.snapchat.com/898a13313a9b4237aa2b3ffc54bf316c"
    },
    {
        id: 13,
        title: "Forest Mask",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/4.png",
        link: "https://lens.snapchat.com/496277125bb64d8fa4da0b48d1e77232"
    },
    {
        id: 14,
        title: "Eiffel Tower",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/5.png",
        link: "https://lens.snapchat.com/9ac9ce2f6efb46b280f9ef7fd176fd7c"
    },
    {
        id: 15,
        title: "Type On World",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/6.png",
        link: "https://lens.snapchat.com/1ac97f323f7941b3a94b1894d10fdaa6"
    },
    {
        id: 16,
        title: "Glasses",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/7.png",
        link: "https://lens.snapchat.com/6ab656d768b048e18d96fdc18fb7e1bd"
    },
    {
        id: 17,
        title: "Crystal Hearts",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/8.png",
        link: "https://lens.snapchat.com/367433d8d398425d93d202591ceb5180"
    },
    {
        id: 18,
        title: "Head Particales",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/9.png",
        link: "https://lens.snapchat.com/75858641300f4ba1b7631cb40a778ccd"
    },
    {
        id: 19,
        title: "Soul Mates",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/10.png",
        link: "https://lens.snapchat.com/893277e9d902481b8dae660a003b2e04"
    },
    {
        id: 20,
        title: "Horn",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/11.png",
        link: "https://lens.snapchat.com/344b929a40404256bfefe2d1818ef267"
    },
    {
        id: 21,
        title: "Cat Ear",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/12.png",
        link: "https://lens.snapchat.com/5ea7e2b788114dd88e3cbdeff2a726a2"
    },
    {
        id: 22,
        title: "Gradiant World",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/13.png",
        link: "https://lens.snapchat.com/73b585299eda44028173ab9cbe93fac5"
    },
    {
        id: 23,
        title: "Go Corona Go",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/14.png",
        link: "https://lens.snapchat.com/e2f2ac433ebb403a80574520630b82f2"
    },
    {
        id: 24,
        title: "Heart Glasses",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/15.png",
        link: "https://lens.snapchat.com/b65adb7bf05c4b3aaef02a7ecfd4ea46"
    },
    {
        id: 25,
        title: "Wings",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/16.png",
        link: "https://lens.snapchat.com/892d8057d6f14543bbd0dfc3040d8d0f"
    },
    {
        id: 26,
        title: "BlinkItUp",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/17.png",
        link: "https://lens.snapchat.com/f59e7066a1384002824dbfeff429a17c"
    },
    {
        id: 27,
        title: "Miss You",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/18.png",
        link: "https://lens.snapchat.com/083dfb527ef648b3a0793ef44a9f40f2"
    },
    {
        id: 28,
        title: "Tree Crown",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/19.png",
        link: "https://lens.snapchat.com/92408a7748624f0fb2a4a6cb30279afb"
    },
    {
        id: 29,
        title: "Binary Crown",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/20.png",
        link: "https://lens.snapchat.com/83f8f7f1a6d24219a77278c68cc668da"
    },
    {
        id: 30,
        title: "Face Effect",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/21.png",
        link: "https://lens.snapchat.com/cf4c56f09be446c69f1affb6fd5fc5b2"
    },
    {
        id: 31,
        title: "Rose Skull",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/22.png",
        link: "https://lens.snapchat.com/a738af193a6c45c399f855fa48feecd2"
    },
    {
        id: 32,
        title: "Headpiece",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/23.png",
        link: "https://lens.snapchat.com/70bfe1bd9892483eab68341534485879"
    },
    {
        id: 33,
        title: "Headpiece",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/24.png",
        link: "https://lens.snapchat.com/d2eeb147b7604feaa5254b13b0773894"
    },
    {
        id: 34,
        title: "Tap On Head",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/25.png",
        link: "https://lens.snapchat.com/65d37a9139414a9380157cb41cab926e"
    },
    {
        id: 35,
        title: "Matrix",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/26.png",
        link: "https://lens.snapchat.com/06d78086d8db4981bea7eb5ac2d188ff"
    },
    {
        id: 36,
        title: "FishMan",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/27.png",
        link: "https://lens.snapchat.com/e89579b5876c431996d3c49892b40a4b"
    },
    {
        id: 37,
        title: "Oni Mask",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/28.png",
        link: "https://lens.snapchat.com/adebd924d43142d195a913e0cad49ef6"
    },
    {
        id: 38,
        title: "Masquerade Mask",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/29.png",
        link: "https://lens.snapchat.com/9d159ffadf8e47cbb59a0a42485857fe"
    },
    {
        id: 39,
        title: "Angel Wings",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/30.png",
        link: "https://lens.snapchat.com/9fa1488357e04efea1069a61236a5bb2"
    },
    {
        id: 40,
        title: "Emerald Rings",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/31.png",
        link: "https://lens.snapchat.com/d86cf02ca03d4eb6ad5c5c599d9f3d8a"
    },
    {
        id: 41,
        title: "Shattered Glass",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/32.png",
        link: "https://lens.snapchat.com/1e78871c966d4d4186c6f3b518166d9e"
    },
    {
        id: 42,
        title: "FishTank",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/33.png",
        link: "https://lens.snapchat.com/0e3de6fd0ce84df98c2cda9bfede6eab"
    },
    {
        id: 43,
        title: "Snow Fall",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/34.png",
        link: "https://lens.snapchat.com/9166de2e65184ab0be697398679afb9a"
    },
    {
        id: 44,
        title: "Whale",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/35.png",
        link: "https://lens.snapchat.com/b6565010b73645b38f221fdda58cf20b"
    },
    {
        id: 45,
        title: "ANGEL Vs DEVIL",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/36.png",
        link: "https://lens.snapchat.com/44ab3ef61ec5436db3ed80fe9599f79a"
    },
    {
        id: 46,
        title: "What U Like",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/37.png",
        link: "https://lens.snapchat.com/5d8bc9ba945543ac93cfe711b1fdfbff"
    },
    {
        id: 47,
        title: "Grain Screen",
        category: "Snapchat lens",
        image: "https://bhargavsuhagiya.netlify.app/assets/images/snapchat/38.png",
        link: "https://lens.snapchat.com/c9f019f1b83545469cba45fffd982523"
    }
];

// Helper to distribute projects into N columns
const chunkProjects = (arr: Project[], cols: number) => {
    const chunks = Array.from({ length: cols }, () => [] as Project[]);
    arr.forEach((item, i) => {
        chunks[i % cols].push(item);
    });
    return chunks;
};

export default function ProjectMasonryGravity() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const columns = chunkProjects(projects, 3);

    // Parallax Columns Logic
    const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const yColumn2 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Moves up faster
    const yColumn3 = useTransform(scrollYProgress, [0, 1], [0, 100]);   // Moves up slower

    return (
        <div ref={containerRef}>
            <LiquidFilter id="liquid-1" />

            {/* Mobile Swipe-able Gallery (Visible < md) */}
            <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-12 w-full no-scrollbar">
                {projects.map((project, i) => (
                    <div key={project.id} className="snap-center shrink-0 w-[85vw] h-[450px]">
                        <ProjectCardGravity project={project} index={i} delay={0} />
                    </div>
                ))}
            </div>

            {/* Desktop Masonry Grid (Visible >= md) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full px-4 relative">

                {/* Column 1 */}
                <Column projects={columns[0]} y={yColumn1} delay={0} />

                {/* Column 2 */}
                <Column projects={columns[1]} y={yColumn2} className="md:mt-24" delay={0.2} />

                {/* Column 3 */}
                <Column projects={columns[2]} y={yColumn3} className="lg:mt-12" delay={0.4} />

            </div>
        </div>
    );
}

function Column({ projects, y, className = "", delay = 0 }: { projects: Project[], y: MotionValue<number>, className?: string, delay: number }) {
    return (
        <motion.div style={{ y }} className={`flex flex-col gap-12 ${className}`}>
            {projects.map((project, i) => (
                <ProjectCardGravity key={project.id} project={project} index={i} delay={delay} />
            ))}
        </motion.div>
    );
}

function ProjectCardGravity({ project, index, delay }: { project: Project, index: number, delay: number }) {
    const [isHovered, setIsHovered] = useState(false);

    // Holographic Tilt (Gyroscope)
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springConfig = { stiffness: 100, damping: 30 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    useEffect(() => {
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.beta === null || e.gamma === null) return;

            // Limit tilt range to avoids flipping
            const x = Math.min(Math.max(e.beta, -45), 45); // X-axis (front/back)
            const y = Math.min(Math.max(e.gamma, -45), 45); // Y-axis (left/right)

            // Invert beta so tilting forward tilts the card away
            rotateX.set(-x / 2);
            rotateY.set(y / 2);
        };

        if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation);
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [rotateX, rotateY]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: delay + index * 0.2 }}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                perspective: 1000
            }}
            className="group relative w-full h-[450px] cursor-pointer block transform-gpu preserve-3d"
        >
            {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />
            )}

            {/* Image Container with SVG Filter */}
            <div className="relative w-full h-full overflow-hidden rounded-3xl border border-white/5 bg-card shadow-2xl">

                {/* The Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                        backgroundImage: `url(${project.image})`,
                        // Apply liquid filter on hover by querying the SVG ID
                        filter: isHovered ? 'url(#liquid-1)' : 'none',
                        transition: 'filter 0.3s ease'
                    }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 mb-4 text-[10px] font-mono text-black bg-primary rounded-full uppercase tracking-widest">
                        {project.category}
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-secondary max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                    </p>
                </div>

                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300 pointer-events-auto">
                    {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ArrowUpRight className="w-5 h-5" />
                        </a>
                    ) : (
                        <ArrowUpRight className="w-5 h-5" />
                    )}
                </div>
            </div>

            {/* Hover Reflection / Glow */}
            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        </motion.div>
    );
}
