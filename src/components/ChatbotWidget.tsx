import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Sun,
  Heart,
  Users,
  BookOpen,
  HelpCircle,
  Phone,
  Minus,
} from 'lucide-react';
import { ChatMessage, ChatAction } from '../types';
import { generateChatbotReply } from '../lib/chatbotEngine';
import { useGoldenBurst } from './GoldenSparkles';

interface ChatbotWidgetProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  onOpenParentingDetails: () => void;
  onOpenPledge?: () => void;
  onNavigateSection?: (href: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: "Warm greetings! I am your Dawn Assistant powered by Grok AI. I'm here to share science-backed early childhood parenting strategies, parent-child harmony guidance, and Dawn Child Foundation community initiatives.",
    timestamp: new Date(),
    suggestedActions: [
      { label: '📜 "Not Yet" Parent Pledge', action: 'pledge' },
      { label: '🌱 Parenting Journey (7 Pillars)', action: 'parenting' },
      { label: '👶 Tantrums & Meltdowns', action: 'query', payload: 'How do I handle toddler tantrums?' },
      { label: '📱 Screen Time Limits', action: 'query', payload: 'How to manage screen time for kids?' },
      { label: '🧡 How to Donate (80G)', action: 'donate' },
      { label: '🤝 Become a Volunteer', action: 'volunteer' },
    ],
  },
];

export function ChatbotWidget({
  onOpenDonate,
  onOpenVolunteer,
  onOpenParentingDetails,
  onOpenPledge,
  onNavigateSection,
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnreadPrompt, setHasUnreadPrompt] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('dcf_chat_session_id');
    } catch {
      return null;
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { triggerGoldenBurst } = useGoldenBurst();

  // Restore stored session conversation history if available
  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/chat/sessions/${encodeURIComponent(sessionId)}/messages`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.messages) && data.messages.length > 0) {
          const restoredMessages: ChatMessage[] = data.messages.map((m: any) => ({
            id: String(m.id || `msg-${Date.now()}`),
            sender: m.sender === 'user' ? 'user' : 'bot',
            text: m.message,
            timestamp: new Date(m.created_at || Date.now()),
          }));
          setMessages([INITIAL_MESSAGES[0], ...restoredMessages]);
        }
      })
      .catch((err) => console.log('Chat history restore notice:', err));
  }, [sessionId]);

  // Scroll to latest message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, isMinimized]);

  const handleToggleOpen = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 20);
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsMinimized(false);
        setHasUnreadPrompt(false);
      }
      return next;
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? inputVal).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputVal('');
    setIsTyping(true);

    try {
      // Connect to full-stack Grok API proxy with persistent session ID
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId || undefined,
          history: newMessages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.sessionId && data.sessionId !== sessionId) {
          setSessionId(data.sessionId);
          try {
            sessionStorage.setItem('dcf_chat_session_id', data.sessionId);
          } catch {
            // ignore session storage error
          }
        }

        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.text,
          timestamp: new Date(),
          suggestedActions: data.suggestedActions,
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        return;
      }
    } catch (apiError) {
      console.warn('API chat endpoint error, using local fallback:', apiError);
    }

    // Client-side fallback if offline
    setTimeout(() => {
      const reply = generateChatbotReply(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        timestamp: new Date(),
        suggestedActions: reply.suggestedActions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleActionClick = (action: ChatAction, e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 15);

    switch (action.action) {
      case 'donate':
        onOpenDonate();
        break;
      case 'volunteer':
        onOpenVolunteer();
        break;
      case 'pledge':
        onOpenPledge?.();
        break;
      case 'parenting':
        onOpenParentingDetails();
        break;
      case 'faq':
        onNavigateSection ? onNavigateSection('#faq') : document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        window.open('tel:+919871234567', '_self');
        break;
      case 'query':
        if (action.payload === 'Take me to Documentation') {
          setIsOpen(false);
          if (onNavigateSection) {
            onNavigateSection('#documentation');
          } else {
            document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (action.payload) {
          handleSendMessage(action.payload);
        }
        break;
      default:
        break;
    }
  };

  const handleClearChat = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 15);
    setMessages(INITIAL_MESSAGES);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderActionIcon = (type: ChatAction['action']) => {
    switch (type) {
      case 'donate':
        return <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />;
      case 'volunteer':
        return <Users className="w-3.5 h-3.5 text-orange-500" />;
      case 'parenting':
        return <BookOpen className="w-3.5 h-3.5 text-amber-600" />;
      case 'faq':
        return <HelpCircle className="w-3.5 h-3.5 text-stone-500" />;
      case 'contact':
        return <Phone className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />;
    }
  };

  return (
    <aside aria-label="Dawn Assistant Chatbot" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* ================= CHAT WINDOW ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? 64 : 540,
            }}
            exit={{ opacity: 0, scale: 0.85, y: 25 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="mb-4 w-[92vw] sm:w-[390px] max-h-[82vh] bg-[#fbf8f3] dark:bg-stone-950 rounded-3xl shadow-2xl border border-[#e2d7c5] dark:border-stone-800 overflow-hidden flex flex-col transition-all duration-200"
          >
            {/* Top Bar Header */}
            <header className="p-4 bg-gradient-to-r from-[#c2410c] via-[#ea580c] via-[#f59e0b] via-[#ea580c] to-[#c2410c] text-white flex items-center justify-between relative shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md p-1 flex items-center justify-center text-white shadow-inner relative overflow-visible">
                  <img
                    src="/favicon.svg"
                    alt="Dawn Child Emblem"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  {/* Green Online Dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-bold tracking-tight text-white">
                      Dawn Assistant
                    </h2>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-amber-100 border border-white/30">
                      ⚡ Grok AI
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-100/90 font-medium">
                    Free AI Parenting & Community Guide
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                  aria-label="Reset chat history"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized((prev) => !prev)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                  aria-label={isMinimized ? 'Expand chat window' : 'Minimize chat window'}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close chat window"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {!isMinimized && (
              <>
                {/* Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm bg-[#fbf8f3] dark:bg-stone-950">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-2xs leading-relaxed whitespace-pre-wrap ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#ea580c] to-[#f25c27] text-white rounded-br-xs font-medium'
                            : 'bg-[#fdfbf7] dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-[#e2d7c5] dark:border-stone-800 rounded-bl-xs'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Bot Interactive Action Suggestions */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                          {msg.suggestedActions.map((action, idx) => (
                            <motion.button
                              key={`${action.label}-${idx}`}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={(e) => handleActionClick(action, e)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-[#f5efe4] dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 border border-[#e2d7c5] dark:border-stone-700 shadow-2xs transition-colors cursor-pointer"
                            >
                              {renderActionIcon(action.action)}
                              <span>{action.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      )}

                      <span className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 px-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-stone-400 dark:text-stone-500 text-xs px-2 py-1"
                    >
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-bounce [animation-delay:0.3s]" />
                      </div>
                      <span className="italic font-medium">Dawn Assistant is thinking...</span>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Suggestion Pills */}
                <div className="px-3 py-2 border-t border-[#ebdcc9] dark:border-stone-800 bg-[#f5efe4]/70 dark:bg-stone-900/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400 shrink-0">
                    Ask:
                  </span>
                  <button
                    onClick={() => handleSendMessage('How can a student get direct help from the NGO?')}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-orange-100/80 dark:bg-orange-950/80 hover:bg-orange-200 dark:hover:bg-orange-900 text-[#ea580c] dark:text-orange-300 font-semibold border border-orange-300 dark:border-orange-800 transition-colors cursor-pointer"
                  >
                    🎓 Student Help Desk
                  </button>
                  <button
                    onClick={() => handleSendMessage('How do I handle toddler tantrums?')}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-[#fdfbf7] dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-[#e2d7c5] dark:border-stone-700 transition-colors cursor-pointer"
                  >
                    👶 Tantrum Tips
                  </button>
                  <button
                    onClick={() => handleSendMessage('What are healthy screen time limits?')}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-[#fdfbf7] dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-[#e2d7c5] dark:border-stone-700 transition-colors cursor-pointer"
                  >
                    📱 Screen Time
                  </button>
                  <button
                    onClick={() => handleSendMessage('How do I volunteer with Dawn Child?')}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-[#fdfbf7] dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-[#e2d7c5] dark:border-stone-700 transition-colors cursor-pointer"
                  >
                    🤝 Volunteer Roles
                  </button>
                  <button
                    onClick={() => handleSendMessage('Is my donation 80G tax deductible?')}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-[#fdfbf7] dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-[#e2d7c5] dark:border-stone-700 transition-colors cursor-pointer"
                  >
                    🧡 80G Tax Benefit
                  </button>
                </div>

                {/* Input Bar */}
                <footer className="p-3 border-t border-[#ebdcc9] dark:border-stone-800 bg-[#fdfbf7] dark:bg-stone-900">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask parenting tips or about our foundation..."
                      className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fbf8f3] dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      disabled={!inputVal.trim() || isTyping}
                      onClick={() => handleSendMessage()}
                      className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ea580c] to-[#f25c27] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-md cursor-pointer transition-opacity shrink-0"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 dark:text-stone-500 mt-1.5 px-1">
                    <span>⚡ Powered by Grok AI Engine</span>
                    <span>Dawn Child Foundation</span>
                  </div>
                </footer>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING LAUNCHER BUTTON ================= */}
      <div className="relative flex items-center">
        {/* Subtle Welcome Tooltip Banner if not opened yet */}
        <AnimatePresence>
          {!isOpen && hasUnreadPrompt && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mr-3 hidden sm:flex items-center gap-2 bg-[#fdfbf7] dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg border border-[#e2d7c5] dark:border-stone-800"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Ask parenting advice or programs</span>
              <button
                type="button"
                onClick={() => setHasUnreadPrompt(false)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 ml-1 cursor-pointer"
                aria-label="Dismiss chat prompt"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Main Circular Floating Button */}
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 10px 30px -5px rgba(234, 88, 12, 0.5)' }}
          whileTap={{ scale: 0.92 }}
          onClick={handleToggleOpen}
          aria-label={isOpen ? 'Close chat' : 'Open Dawn Assistant chat'}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#c2410c] via-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white flex items-center justify-center shadow-2xl border-2 border-amber-200/60 ring-2 ring-amber-300/40 cursor-pointer overflow-hidden group"
        >
          {/* Radial Light Sheen */}
          <div className="absolute inset-0 bg-radial from-amber-200/30 to-transparent pointer-events-none" />

          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 transition-transform group-hover:scale-110 duration-200" />
              {/* Online Pulse Beacon */}
              <span className="absolute top-2.5 right-2.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
              </span>
            </>
          )}
        </motion.button>
      </div>
    </aside>
  );
}
