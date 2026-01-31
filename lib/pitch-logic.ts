
import { KNOWLEDGE_BASE } from './pitch-data';

export type ResponseType = 'text' | 'action';

export interface BotResponse {
    text: string;
    type: ResponseType;
    actionLabel?: string;
    actionLink?: string;
}

const GREETINGS = [
    "Hello there! I'm ready to help you navigate Bhargav's work.",
    "Hi! Great to meet you. Ask me about projects or skills.",
    "Hey! I'm online and listening. What's on your mind?"
];

const FALLBACKS = [
    "I'm tuning into your frequency, but I didn't quite catch that. Could you rephrase?",
    "My neural net is drawing a blank on that one. Try asking about 'React', 'Design', or specific projects.",
    "I'm primarily trained on Bhargav's portfolio data. Ask me about his tech stack or recent work!",
    "That's outside my current dataset. I can tell you about his frontend skills though."
];

const REAT_RESPONSES = [
    "As I mentioned earlier, ",
    "Just to reiterate, ",
    "In case you missed it, ",
    "Like I said before, "
];

export function generateResponse(input: string, history: any[] = []): BotResponse {
    const lowerInput = input.toLowerCase().trim();

    // 0. Handle Greetings specifically
    if (['hi', 'hello', 'hey', 'sup', 'yo'].includes(lowerInput)) {
        return {
            text: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
            type: 'text'
        };
    }

    // 1. Check Contact
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire') || lowerInput.includes('call')) {
        return {
            text: `You can reach Bhargav directly at ${KNOWLEDGE_BASE.contact.email}. check out his GitHub or LinkedIn below.`,
            type: 'action',
            actionLabel: 'View GitHub',
            actionLink: KNOWLEDGE_BASE.contact.github
        };
    }

    // 2. Check Skills
    for (const [skill, description] of Object.entries(KNOWLEDGE_BASE.skills)) {
        if (lowerInput.includes(skill) || (skill === 'three' && lowerInput.includes('3d'))) {
            // Check if we just talked about this
            const lastBotMsg = history.filter(m => m.role === 'bot').pop()?.content || '';
            const prefix = lastBotMsg.includes(description)
                ? REAT_RESPONSES[Math.floor(Math.random() * REAT_RESPONSES.length)]
                : '';

            return {
                text: prefix + description,
                type: 'text'
            };
        }
    }

    // 3. Check Projects
    const matchedProject = KNOWLEDGE_BASE.projects.find(p =>
        p.keywords.some(k => lowerInput.includes(k)) || lowerInput.includes(p.name.toLowerCase())
    );

    if (matchedProject) {
        // Check if we just talked about this
        const lastBotMsg = history.filter(m => m.role === 'bot').pop()?.content || '';
        const prefix = lastBotMsg.includes(matchedProject.name)
            ? "Here is that project again: "
            : "";

        return {
            text: `${prefix}You should see ${matchedProject.name}. ${matchedProject.description}`,
            type: 'action',
            actionLabel: 'View Project',
            actionLink: matchedProject.link
        };
    }

    // 4. Default / Bio
    if (lowerInput.includes('who') || lowerInput.includes('about') || lowerInput.includes('bhargav')) {
        return {
            text: KNOWLEDGE_BASE.bio,
            type: 'text'
        };
    }

    // 5. Fallback
    return {
        text: FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)],
        type: 'text'
    };
}
