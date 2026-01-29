'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Send, Github, Linkedin, Ghost, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        // Simulate network request
        setTimeout(() => setFormState('sent'), 1500);
    };

    return (
        <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[30%] left-[20%] w-[60%] h-[60%] bg-indigo-500/5 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
                <header className="flex items-center justify-between mb-16">
                    <Link href="/" className="flex items-center gap-2 text-secondary hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-mono uppercase tracking-widest">Back to Core</span>
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Initialize<br />Connection.</h1>
                            <p className="text-secondary text-lg leading-relaxed">
                                Ready to build something gravity-defying? <br />
                                Drop a signal and let's discuss your next breakthrough.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <ContactLink icon={Mail} label="bhargavsuhagiya02@gmail.com" href="mailto:bhargavsuhagiya02@gmail.com" />
                            <ContactLink icon={Github} label="github.com/bhargavpatel" href="https://github.com/BHARGAVPATEL1244" />
                            <ContactLink icon={Ghost} label="@bhargavs_1244" href="https://www.snapchat.com/@bhargavs_1244" />
                            <ContactLink icon={Instagram} label="@bhargav.frames" href="https://www.instagram.com/bhargav.frames/" />
                            <ContactLink icon={Linkedin} label="linkedin.com/in/bhargav1244" href="https://www.linkedin.com/in/bhargav1244" />
                        </div>
                    </motion.div>

                    {/* Right: Holographic Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Form Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-secondary uppercase tracking-widest ml-1">Identity</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-secondary uppercase tracking-widest ml-1">Coordinates</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono text-secondary uppercase tracking-widest ml-1">Transmission</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formState !== 'idle'}
                                className="w-full group relative flex items-center justify-center gap-2 bg-white text-black font-medium py-4 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                                {formState === 'idle' && (
                                    <>
                                        <span>Send Message</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                                {formState === 'sending' && (
                                    <span>Transmitting...</span>
                                )}
                                {formState === 'sent' && (
                                    <span className="text-green-700 font-bold">Signal Received</span>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}

function ContactLink({ icon: Icon, label, href }: { icon: any, label: string, href: string }) {
    return (
        <a
            href={href}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group"
        >
            <div className="p-2 rounded-lg bg-black/20 text-secondary group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <span className="text-secondary group-hover:text-white transition-colors font-medium">{label}</span>
        </a>
    );
}
