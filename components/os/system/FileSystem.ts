import { FileText, Folder, Image, Music, Video } from 'lucide-react';

export type FileSystemItem = {
    name: string;
    type: 'folder' | 'file' | 'image' | 'link';
    content?: string; // For text files or links
    icon?: any;
    children?: FileSystemItem[];
};

export const fileSystem: FileSystemItem[] = [
    {
        name: 'Desktop',
        type: 'folder',
        children: [
            { name: 'Projects', type: 'folder', children: [] }, // Will be populated dynamically or static
            { name: 'welcome.txt', type: 'file', content: 'Welcome to Bhargav OS! This is a simulated environment showcasing web capabilities.' },
            { name: 'resume.pdf', type: 'file', content: '# Resume\n\nBhargav Patel\nCreative Developer' },
        ]
    },
    {
        name: 'Documents',
        type: 'folder',
        children: [
            { name: 'project-plans.txt', type: 'file', content: '# Project V\nStatus: Stealth Mode\nPriority: High' },
            { name: 'ideas.md', type: 'file', content: '# Ideas\n- AI-generated UI components\n- 3D file explorer' },
            { name: 'budget.csv', type: 'file', content: 'Item,Cost\nServer, $50\nDomain, $12' },
            { name: 'notes', type: 'folder', children: [] }
        ]
    },
    {
        name: 'Downloads',
        type: 'folder',
        children: [
            { name: 'installer.dmg', type: 'file', content: 'Binary content...' }
        ]
    },
    {
        name: 'Projects',
        type: 'folder',
        children: [
            { name: 'Bento Portfolio', type: 'link', content: 'https://github.com/BHARGAVPATEL1244/portfolio-bento' },
            { name: 'Goat Gang', type: 'link', content: 'https://goat-gang.vercel.app' },
            { name: 'Vision Pro', type: 'link', content: '#' }
        ]
    },
    {
        name: 'Trash',
        type: 'folder',
        children: [
            { name: 'old_design.png', type: 'image' },
            { name: 'draft.txt', type: 'file', content: 'unused content' }
        ]
    }
];

export const getContents = (path: string[]): FileSystemItem[] | null => {
    let current = fileSystem;
    // Special case for root
    if (path.length === 0) return current;

    // Traverse
    for (const segment of path) {
        if (segment === '~') continue; // Skip home tilde if present

        const folder = current.find(item => item.name === segment && item.type === 'folder');
        if (folder && folder.children) {
            current = folder.children;
        } else {
            return null; // Path not found
        }
    }
    return current;
};
