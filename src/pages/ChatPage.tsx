import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  MessageCircle, 
  Sparkles, 
  User, 
  Bot, 
  BookOpen, 
  ChevronRight,
  History,
  Trash2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { chatAboutPoetry } from '@/src/services/poetryService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hello! I am your AI Poetry Counselor. I can help you understand metaphors, analyze historical contexts, or just discuss your favorite stanzas. What poem are we exploring today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Mock poem context for the chat - in a real app, this would come from the current analysis
      const poemContext = "Select a poem in your history or dashboard for deeper analysis.";
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      
      const responseText = await chatAboutPoetry(poemContext, history, input);

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Poetry Counselor</h1>
           <p className="text-sm text-slate-500 font-medium italic serif">Engage in high-fidelity exegesis with the AI critical engine.</p>
        </div>
        <button onClick={() => setMessages([messages[0]])} className="h-10 px-6 rounded-lg border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all flex items-center gap-2 shadow-sm">
           <Trash2 className="h-3.5 w-3.5" />
           Reset Discourse
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Sidebar: Context/History */}
        <div className="hidden lg:flex flex-col lg:col-span-1 gap-6 overflow-hidden">
           <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-6 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                 <History className="h-4 w-4" />
                 Analytic Archives
              </h3>
              <div className="space-y-1">
                 {['Metaphors in Frost', 'Shakespeare\'s 18th', 'Plath\'s Dark Imagery'].map((item, i) => (
                    <button key={i} className="w-full px-4 py-3 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 text-left text-xs font-bold text-slate-500 hover:text-indigo-600 transition-all flex items-center justify-between group uppercase tracking-tight">
                       <span className="truncate">{item}</span>
                       <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                 ))}
              </div>
           </div>
           <div className="rounded-2xl border-2 border-indigo-200 border-dashed bg-white p-8 flex flex-col items-center text-center gap-4 shadow-sm relative overflow-hidden group">
              <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">
                 <Sparkles className="h-5 w-5" />
              </div>
              <div className="relative z-10">
                 <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Active Exegesis Mode</h4>
                 <p className="text-[11px] text-slate-500 mt-2 font-medium italic serif leading-snug">The engine is currently operating in "General Literary Mode". Pair with a specific poem for maximum synthesis.</p>
              </div>
           </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white flex flex-col overflow-hidden relative shadow-sm">
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 scroll-smooth pb-32">
              <AnimatePresence mode="popLayout">
                 {messages.map((message) => (
                    <motion.div
                       key={message.id}
                       initial={{ opacity: 0, y: 10, scale: 0.98 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       layout
                       className={cn(
                          "flex w-full gap-5",
                          message.role === 'user' ? "flex-row-reverse" : "flex-row"
                       )}
                    >
                       <div className={cn(
                          "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center shadow-sm border",
                          message.role === 'user' ? "bg-slate-50 text-indigo-600 border-slate-200" : "bg-indigo-600 text-white border-indigo-700"
                       )}>
                          {message.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                       </div>
                       
                       <div className={cn(
                          "flex max-w-[85%] flex-col gap-2.5",
                          message.role === 'user' ? "items-end text-right" : "items-start"
                       )}>
                          <div className={cn(
                             "rounded-2xl px-6 py-4 text-[14px] leading-relaxed shadow-sm",
                             message.role === 'user' 
                                ? "bg-indigo-600 text-white rounded-tr-none" 
                                : "bg-slate-50 text-slate-700 rounded-tl-none border border-slate-200 italic serif font-medium"
                          )}>
                             {message.text}
                          </div>
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">{message.timestamp}</span>
                       </div>
                    </motion.div>
                 ))}
                 {isLoading && (
                    <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       className="flex items-center gap-5"
                    >
                       <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                          <Bot className="h-5 w-5" />
                       </div>
                       <div className="flex gap-2 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
                          <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <div className="h-1.5 w-1.5 bg-indigo-400 rounded-full animate-bounce" />
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>

           {/* Input Bar */}
           <div className="absolute bottom-8 left-8 right-8">
              <div className="relative group">
                 <div className="relative flex items-center">
                    <input
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                       placeholder="Inquire about meter, metaphor, or history..."
                       className="w-full h-16 py-5 pl-16 pr-44 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500/20 shadow-xl transition-all placeholder:text-slate-400"
                    />
                    <div className="absolute left-6 text-slate-300 group-focus-within:text-indigo-400 transition-colors">
                       <MessageCircle className="h-5 w-5" />
                    </div>
                    <button 
                       onClick={handleSend}
                       disabled={isLoading || !input.trim()}
                       className="absolute right-2 px-6 h-12 rounded-lg bg-indigo-600 text-white transition-all hover:bg-indigo-700 disabled:opacity-30 disabled:grayscale flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100"
                    >
                       <Send className="h-3.5 w-3.5" />
                       Assemble Reply
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
