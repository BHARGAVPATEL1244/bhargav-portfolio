'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Search, Monitor, Terminal, Camera, CloudRain, Github, Mail, User, Code2, Zap, FileText } from 'lucide-react';
import { useOSStore } from '@/components/os/useOSStore';
import { useRouter } from 'next/navigation';

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const openWindow = useOSStore(state => state.openWindow);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] w-[90vw] max-w-[640px] translate-x-[-50%] translate-y-[-50%] rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">

                    <VisuallyHidden>
                        <Dialog.Title>Global Command Menu</Dialog.Title>
                        <Dialog.Description>Quickly navigate apps and pages.</Dialog.Description>
                    </VisuallyHidden>

                    <Command className="w-full h-full bg-transparent">
                        <div className="flex items-center border-b border-white/10 px-4">
                            <Search className="w-5 h-5 text-white/50 mr-3" />
                            <Command.Input
                                autoFocus
                                placeholder="Type a command or search..."
                                className="flex-1 h-16 bg-transparent outline-none text-lg text-white placeholder:text-white/40 font-light"
                            />
                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] text-white/60 font-mono">ESC</div>
                        </div>

                        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                            <Command.Empty className="py-6 text-center text-sm text-white/40">No results found.</Command.Empty>

                            <Command.Group heading="Apps" className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-2 pl-2">
                                <Command.Item
                                    onSelect={() => runCommand(() => openWindow('mirror'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors group"
                                >
                                    <Camera className="w-4 h-4 text-pink-400 group-aria-selected:text-white transition-colors" />
                                    <span>Mirror</span>
                                    <span className="ml-auto text-[10px] opacity-40">App</span>
                                </Command.Item>

                                <Command.Item
                                    onSelect={() => runCommand(() => openWindow('weather'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors group"
                                >
                                    <CloudRain className="w-4 h-4 text-blue-400 group-aria-selected:text-white transition-colors" />
                                    <span>Atmosphere</span>
                                    <span className="ml-auto text-[10px] opacity-40">App</span>
                                </Command.Item>

                                <Command.Item
                                    onSelect={() => runCommand(() => openWindow('notes'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors group"
                                >
                                    <FileText className="w-4 h-4 text-yellow-400 group-aria-selected:text-white transition-colors" />
                                    <span>Notes</span>
                                    <span className="ml-auto text-[10px] opacity-40">App</span>
                                </Command.Item>

                                <Command.Item
                                    onSelect={() => runCommand(() => openWindow('terminal'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors group"
                                >
                                    <Terminal className="w-4 h-4 text-green-400 group-aria-selected:text-white transition-colors" />
                                    <span>Terminal</span>
                                    <span className="ml-auto text-[10px] opacity-40">App</span>
                                </Command.Item>

                                <Command.Item
                                    onSelect={() => runCommand(() => openWindow('settings'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors group"
                                >
                                    <Monitor className="w-4 h-4 text-orange-400 group-aria-selected:text-white transition-colors" />
                                    <span>Settings</span>
                                    <span className="ml-auto text-[10px] opacity-40">System</span>
                                </Command.Item>
                            </Command.Group>

                            <Command.Separator className="h-[1px] bg-white/10 my-2" />

                            <Command.Group heading="Navigation" className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-2 pl-2">
                                <Command.Item
                                    onSelect={() => runCommand(() => router.push('/projects'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
                                >
                                    <Code2 className="w-4 h-4 text-gray-400" />
                                    <span>Projects</span>
                                    <span className="ml-auto text-[10px] opacity-40">Page</span>
                                </Command.Item>

                                <Command.Item
                                    onSelect={() => runCommand(() => router.push('/about'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
                                >
                                    <User className="w-4 h-4 text-gray-400" />
                                    <span>About</span>
                                    <span className="ml-auto text-[10px] opacity-40">Page</span>
                                </Command.Item>

                                <Command.Item
                                    onSelect={() => runCommand(() => router.push('/contact'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
                                >
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span>Contact</span>
                                    <span className="ml-auto text-[10px] opacity-40">Page</span>
                                </Command.Item>
                            </Command.Group>

                            <Command.Separator className="h-[1px] bg-white/10 my-2" />

                            <Command.Group heading="Social" className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-2 pl-2">
                                <Command.Item
                                    onSelect={() => runCommand(() => window.open('https://github.com/BHARGAVPATEL1244', '_blank'))}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
                                >
                                    <Github className="w-4 h-4 text-gray-400" />
                                    <span>GitHub</span>
                                    <span className="ml-auto text-[10px] opacity-40">Link</span>
                                </Command.Item>

                                <Command.Item
                                    onSelect={() => runCommand(() => window.location.reload())}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/90 aria-selected:bg-white/10 aria-selected:text-white cursor-pointer transition-colors"
                                >
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    <span>Reload System</span>
                                    <span className="ml-auto text-[10px] opacity-40">Action</span>
                                </Command.Item>
                            </Command.Group>
                        </Command.List>
                    </Command>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
