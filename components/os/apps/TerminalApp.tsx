'use client';

import { useState, useRef, useEffect } from 'react';
import { fileSystem } from '../system/FileSystem';

export default function TerminalApp() {
    const [history, setHistory] = useState<string[]>([
        "INITIALIZING SYSTEM KERNEL v1.0.0...",
        "Loading kernel modules... DONE",
        "Mounting UI filesystem... DONE",
        "",
        "Welcome to Bhargav OS. Type 'help' for available commands."
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        let output: string | string[] = [];

        switch (trimmed) {
            case 'help':
                output = [
                    "Available commands:",
                    "  help      - Show this help message",
                    "  about     - Display user information",
                    "  projects  - List current projects",
                    "  contact   - Show contact details",
                    "  clear     - Clear the terminal screen",
                    "  whoami    - Display current user"
                ];
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'whoami':
                output = "visitor@bhargavsuhagiya02.dev";
                break;
            case 'about':
                output = "Bhargav Patel | Creative Developer & GUI Engineer.\nSpecializing in high-performance web interfaces and next-gen user experiences.";
                break;
            case 'contact':
                output = [
                    "Email: bhargavsuhagiya02@gmail.com",
                    "GitHub: github.com/BHARGAVPATEL1244",
                    "Snapchat: @bhargavs_1244",
                    "LinkedIn: linkedin.com/in/bhargav1244",
                    "Instagram: @bhargav.frames"
                ];
                break;

            case 'projects':
                const projectsFolder = fileSystem.find(f => f.name === 'Projects');
                const projectList = projectsFolder?.children?.map(p => `- ${p.name} (${p.content?.includes('github') ? 'GitHub' : 'Link'})`) || [];

                output = [
                    "Listing public repositories...",
                    ...projectList
                ];
                break;
            case '':
                output = "";
                break;
            default:
                output = `command not found: ${trimmed}`;
        }

        if (Array.isArray(output)) {
            setHistory(prev => [...prev, `~/visitor $ ${cmd}`, ...output]);
        } else {
            setHistory(prev => [...prev, `~/visitor $ ${cmd}`, output]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className="h-full w-full bg-[#1e1e1e] p-4 text-green-400 font-mono text-sm overflow-hidden flex flex-col font-mono" onClick={() => document.getElementById('terminal-input')?.focus()}>
            <div className="flex-1 overflow-auto space-y-1">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words min-h-[1.2em]">{line}</div>
                ))}
                <div className="flex items-center gap-2">
                    <span className="text-blue-400">~/visitor</span>
                    <span>$</span>
                    <input
                        id="terminal-input"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none border-none text-green-400 focus:ring-0 placeholder-transparent"
                        autoFocus
                        autoComplete="off"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
