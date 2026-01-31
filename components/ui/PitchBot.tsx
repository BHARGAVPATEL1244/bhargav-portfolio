'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, ChevronDown, User, Sparkles } from 'lucide-react'; // Added icons
import { generateResponse, BotResponse } from '@/lib/pitch-logic';
import Link from 'next/link';

interface Message {
    role: 'bot' | 'user';
    content: string;
    action?: {
        label: string;
        link: string;
    };
}

export default function PitchBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false); // Minimized state vs Hidden
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Greeting
    useEffect(() => {
        // Delay initial appearance
        setTimeout(() => {
            setIsOpen(true);
            setMessages([{
                role: 'bot',
                content: "Hi! I'm Bhargav's AI agent. What are you building? I can tell you exactly how he can help."
            }]);
        }, 2000);
    }, []);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue('');

        // Add User Message
        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setIsTyping(true);

        // Simulate Network Delay
        setTimeout(() => {
            const response = generateResponse(userText, messages);
            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: 'bot',
                content: response.text,
                action: response.type === 'action' ? { label: response.actionLabel!, link: response.actionLink! } : undefined
            }]);
        }, 1000 + Math.random() * 500);
    };

    if (!isOpen) return null; // Or render nothing until triggered

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence mode="wait">
                {isMinimized ? (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsMinimized(false)}
                        className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-lg border border-indigo-400/50 flex items-center justify-center text-white group"
                    >
                        <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        {/* Notification dot */}
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
                    </motion.button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="w-[350px] md:w-[400px] h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="h-14 border-b border-white/10 bg-white/5 flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                                    <Bot className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Pitch Bot</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-white/50">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-colors">
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {/* We don't have a close permanently button to avoid losing the agent, minimize is better */}
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-sm'
                                        : 'bg-white/10 text-white/90 rounded-tl-sm border border-white/5'
                                        }`}>
                                        {msg.content}
                                        {msg.action && (
                                            <Link href={msg.action.link} className="mt-3 block w-full text-center py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-all hover:scale-[1.02]">
                                                {msg.action.label}
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start w-full">
                                    <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 rounded-lg text-white disabled:opacity-50 disabled:bg-transparent hover:bg-indigo-500 transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

