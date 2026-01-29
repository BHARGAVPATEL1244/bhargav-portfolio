'use client';

import { Trash2 } from 'lucide-react';
import { fileSystem } from '../system/FileSystem';

export default function TrashApp() {
    // Find the Trash folder in the file system
    const trashFolder = fileSystem.find(item => item.name === 'Trash');
    const items = trashFolder?.children || [];

    return (
        <div className="h-full w-full bg-[#1e1e1e] flex flex-col text-gray-300">
            <div className="flex-1 p-4 grid grid-cols-4 gap-4 content-start overflow-auto">
                {items.length > 0 ? (
                    items.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 p-3 rounded hover:bg-white/5 cursor-pointer">
                            <Trash2 className="w-12 h-12 text-gray-500" />
                            <span className="text-center text-xs truncate w-full">{item.name}</span>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                        <Trash2 className="w-16 h-16 opacity-20" />
                        <span>Trash is empty</span>
                    </div>
                )}
            </div>
            <div className="h-10 border-t border-white/10 flex items-center justify-end px-4 bg-[#252526]">
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors">
                    Empty Trash
                </button>
            </div>
        </div>
    );
}
