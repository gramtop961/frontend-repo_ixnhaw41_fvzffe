import { Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your AI study buddy. Ask me anything about your courses." },
  ]);

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");

    try {
      const res = await fetch(`${baseUrl}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "ai", text: data.reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "ai", text: "Sorry, I hit a snag. Try again later." }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-[#9c27b0] to-[#1a73e8] shadow-lg text-white flex items-center justify-center hover:scale-[1.03] active:scale-95 transition"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute bottom-0 left-0 right-0 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[420px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 border-b flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#9c27b0]/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#9c27b0]" />
                </div>
                <p className="font-medium">AI Assistant</p>
              </div>

              <div className="h-72 overflow-y-auto p-3 space-y-2">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                      m.role === "ai"
                        ? "bg-[#9c27b0]/10 text-[#202124]"
                        : "bg-[#1a73e8] text-white ml-auto"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t flex items-center gap-2">
                <input
                  className="flex-1 h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#1a73e8]/20 focus:border-[#1a73e8]"
                  placeholder="Ask about your course…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                />
                <button
                  onClick={send}
                  className="h-10 px-3 rounded-lg bg-[#1a73e8] text-white hover:brightness-105 active:scale-95 transition inline-flex items-center gap-1"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
