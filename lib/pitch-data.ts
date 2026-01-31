
export interface PitchData {
    skills: Record<string, string>;
    projects: {
        id: string;
        name: string;
        keywords: string[];
        description: string;
        link?: string;
    }[];
    bio: string;
    contact: {
        email: string;
        github: string;
        linkedin: string;
        twitter: string;
    };
}

export const KNOWLEDGE_BASE: PitchData = {
    bio: "I'm Bhargav Patel, a creative developer specializing in immersive web experiences. I blend technical prowess in React and Next.js with deep design sensibilities using GSAP and Three.js.",
    skills: {
        'react': "I've been building with React for over 4 years, focusing on performance and component architecture.",
        'next': "I use Next.js for almost all my production apps to ensure SEO, speed, and scalability.",
        'three': "I create 3D web experiences using Three.js and React Three Fiber to add depth and interactivity.",
        'design': "I don't just code; I design. I use Figma for prototyping and implement pixel-perfect UIs with Tailwind CSS.",
        'animation': "I bring interfaces to life using GSAP and Framer Motion for smooth, physics-based interactions."
    },
    projects: [
        {
            id: 'goat-gang',
            name: 'Goat Gang',
            keywords: ['nft', 'web3', 'community', 'react'],
            description: "A vibrant NFT community platform built with Next.js and Tailwind, featuring real-time minting and gallery views.",
            link: '/projects/goat-gang'
        },
        {
            id: 'kalp-enterprise',
            name: 'Kalp Enterprise',
            keywords: ['corporate', 'business', 'enterprise', 'clean'],
            description: "A professional corporate portfolio for an enterprise client, focusing on clean typography and trust.",
            link: '/projects/kalp-enterprise'
        },
        {
            id: 'triventa',
            name: 'Triventa',
            keywords: ['ecommerce', 'shop', 'modern', 'minimal'],
            description: "A modern e-commerce storefront with a minimal aesthetic, optimized for conversion and speed.",
            link: '/projects/triventa'
        }
    ],
    contact: {
        email: "bhargav.patel@example.com", // update if real email known
        github: "https://github.com/BHARGAVPATEL1244",
        linkedin: "https://linkedin.com/in/bhargavpatel",
        twitter: "https://twitter.com/bhargavpatel"
    }
};
