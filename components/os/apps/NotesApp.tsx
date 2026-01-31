'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, FileText, ChevronLeft } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    content: string;
    updatedAt: number;
}

export default function NotesApp() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileListVisible, setIsMobileListVisible] = useState(true);

    // Load notes from local storage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('bhargav-notes');
        if (savedNotes) {
            try {
                const parsed = JSON.parse(savedNotes);
                setNotes(parsed);
                if (parsed.length > 0) {
                    setActiveNoteId(parsed[0].id);
                }
            } catch (e) {
                console.error('Failed to parse notes', e);
            }
        } else {
            // Create a welcome note if no notes exist
            const welcomeNote: Note = {
                id: crypto.randomUUID(),
                title: 'Welcome to Notes',
                content: '# Welcome to Notes\n\nThis is a simple notes app for Bhargav OS.\n\n- Create new notes with the + button\n- Your notes are saved automatically\n- Markdown styling is supported in spirit!',
                updatedAt: Date.now()
            };
            setNotes([welcomeNote]);
            setActiveNoteId(welcomeNote.id);
            localStorage.setItem('bhargav-notes', JSON.stringify([welcomeNote]));
        }
    }, []);

    // Save notes to local storage whenever they change
    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem('bhargav-notes', JSON.stringify(notes));
        }
    }, [notes]);

    const activeNote = notes.find((note) => note.id === activeNoteId);

    const createNote = () => {
        const newNote: Note = {
            id: crypto.randomUUID(),
            title: 'New Note',
            content: '',
            updatedAt: Date.now(),
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id);
        setIsMobileListVisible(false); // Switch to edit mode on mobile
    };

    const deleteNote = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
        localStorage.setItem('bhargav-notes', JSON.stringify(newNotes)); // Force save immediately

        if (activeNoteId === id) {
            setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
        }
    };

    const updateNote = (key: keyof Note, value: string) => {
        if (!activeNoteId) return;

        const newNotes = notes.map((note) => {
            if (note.id === activeNoteId) {
                const updatedNote = { ...note, [key]: value, updatedAt: Date.now() };
                // Auto-update title based on first line of content if title is default
                if (key === 'content') {
                    const firstLine = value.split('\n')[0].replace(/^#+\s*/, '').trim();
                    if (firstLine && firstLine.length < 50) {
                        updatedNote.title = firstLine;
                    } else if (!value.trim()) {
                        updatedNote.title = 'New Note';
                    }
                }
                return updatedNote;
            }
            return note;
        });

        setNotes(newNotes);
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-full w-full bg-[#1c1c1e]/95 backdrop-blur-xl text-white overflow-hidden rounded-lg">

            {/* Sidebar List */}
            <div className={`${isMobileListVisible ? 'flex' : 'hidden md:flex'} w-full md:w-[300px] flex-col border-r border-white/10 bg-black/20`}>
                <div className="p-4 border-b border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-lg text-white/90">Notes</h2>
                        <button
                            onClick={createNote}
                            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-yellow-400"
                            aria-label="Create new note"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm outline-none focus:border-yellow-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {filteredNotes.length === 0 && (
                        <div className="text-center py-10 text-white/30 text-sm">No notes found</div>
                    )}
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => {
                                setActiveNoteId(note.id);
                                setIsMobileListVisible(false);
                            }}
                            className={`p-3 rounded-lg cursor-pointer transition-all group ${activeNoteId === note.id ? 'bg-yellow-500/20 ring-1 ring-yellow-500/30' : 'hover:bg-white/5'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-semibold text-sm truncate pr-2 ${activeNoteId === note.id ? 'text-yellow-400' : 'text-white/90'}`}>
                                    {note.title || 'New Note'}
                                </h3>
                                {activeNoteId === note.id && (
                                    <button
                                        onClick={(e) => deleteNote(e, note.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-400 rounded text-white/40 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/40">
                                <span>{new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                <span className="truncate">{note.content.substring(0, 30).replace(/\n/g, ' ') || 'No additional text'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Editor */}
            <div className={`${!isMobileListVisible ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#1c1c1e]/50`}>
                {activeNote ? (
                    <>
                        <div className="flex md:hidden items-center p-3 border-b border-white/10 text-yellow-500 cursor-pointer" onClick={() => setIsMobileListVisible(true)}>
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            <span className="text-sm font-medium">Notes</span>
                        </div>
                        <div className="flex-1 flex flex-col p-6 overflow-hidden">
                            <span className="text-xs text-white/30 font-mono mb-4 text-center">
                                {new Date(activeNote.updatedAt).toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <textarea
                                className="flex-1 bg-transparent resize-none outline-none text-white/90 text-lg leading-relaxed placeholder:text-white/20"
                                placeholder="Start typing..."
                                value={activeNote.content}
                                onChange={(e) => updateNote('content', e.target.value)}
                                autoFocus
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/20">
                        <FileText className="w-16 h-16 mb-4 opacity-50" />
                        <p>Select or create a note</p>
                    </div>
                )}
            </div>
        </div>
    );
}
