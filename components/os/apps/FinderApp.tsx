'use client';

import { useState } from 'react';
import { Folder, FileText, Image, ArrowLeft, ChevronRight, Home, Search } from 'lucide-react'; // Basic icons
import { fileSystem, getContents, FileSystemItem } from '../system/FileSystem';

export default function FinderApp() {
    // Start at Desktop by default to show some content
    const [currentPath, setCurrentPath] = useState<string[]>(['Desktop']);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const contents = getContents(currentPath);

    const handleNavigate = (folderName: string) => {
        setCurrentPath([...currentPath, folderName]);
        setSelectedItem(null);
    };

    const handleBack = () => {
        if (currentPath.length > 0) {
            const newPath = [...currentPath];
            newPath.pop();
            setCurrentPath(newPath);
            setSelectedItem(null);
        }
    };

    const handleHome = () => {
        setCurrentPath([]);
        setSelectedItem(null);
    };

    const getIcon = (item: FileSystemItem) => {
        if (item.type === 'folder') return <Folder className="w-12 h-12 text-blue-400 fill-blue-400/20" />;
        if (item.type === 'image') return <Image className="w-12 h-12 text-purple-400" />;
        return <FileText className="w-12 h-12 text-gray-400" />;
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex text-gray-300 text-sm font-sans">
            {/* Sidebar */}
            <div className="w-48 border-r border-white/10 bg-[#252526]/50 backdrop-blur-md p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-2 pb-4 text-gray-400">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                </div>

                <div className="font-bold text-xs text-gray-500 mb-1 px-2">FAVORITES</div>
                <SidebarItem icon={Home} label="Home" active={currentPath.length === 0} onClick={handleHome} />
                <SidebarItem icon={Folder} label="Desktop" active={currentPath.includes('Desktop')} onClick={() => setCurrentPath(['Desktop'])} />
                <SidebarItem icon={Folder} label="Documents" active={currentPath.includes('Documents')} onClick={() => setCurrentPath(['Documents'])} />
                <SidebarItem icon={Folder} label="Downloads" active={currentPath.includes('Downloads')} onClick={() => setCurrentPath(['Downloads'])} />
                <SidebarItem icon={Folder} label="Projects" active={currentPath.includes('Projects')} onClick={() => setCurrentPath(['Projects'])} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Toolbar */}
                <div className="h-10 border-b border-white/10 flex items-center px-4 gap-4 bg-[#252526]">
                    <div className="flex gap-2">
                        <button
                            onClick={handleBack}
                            disabled={currentPath.length === 0}
                            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
                        >
                            <ArrowLeft size={14} />
                        </button>
                    </div>
                    <div className="font-mono text-xs text-gray-400 flex items-center gap-1">
                        <Home size={10} />
                        {currentPath.map((segment, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <ChevronRight size={10} />
                                {segment}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Grid View */}
                <div className="flex-1 p-4 grid grid-cols-4 md:grid-cols-5 gap-4 content-start overflow-auto">
                    {contents ? contents.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => item.type === 'folder' ? handleNavigate(item.name) : setSelectedItem(item.name)}
                            onDoubleClick={() => item.type === 'folder' && handleNavigate(item.name)}
                            className={`flex flex-col items-center gap-2 p-3 rounded border border-transparent hover:bg-white/5 cursor-pointer transition-all ${selectedItem === item.name ? 'bg-blue-500/20 border-blue-500/30' : ''}`}
                        >
                            {getIcon(item)}
                            <span className="text-center text-xs truncate w-full px-1 select-none">{item.name}</span>
                        </div>
                    )) : (
                        <div className="col-span-full text-center text-gray-500 mt-20">Folder is empty</div>
                    )}
                </div>

                {/* Status Bar */}
                <div className="h-6 border-t border-white/10 flex items-center px-3 text-[10px] text-gray-500">
                    {contents?.length || 0} items
                </div>
            </div>
        </div>
    );
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
        >
            <Icon size={14} />
            <span>{label}</span>
        </div>
    );
}
