import { Home, BookOpen, Calendar, Settings, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const nav = [
  { label: "Dashboard", icon: Home },
  { label: "My Courses", icon: BookOpen },
  { label: "Calendar", icon: Calendar },
  { label: "AI Assistant", icon: Sparkles, ai: true },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <aside className="hidden lg:block fixed top-16 left-0 h-[calc(100vh-64px)] z-20">
      <motion.div
        animate={{ width: open ? 240 : 64 }}
        transition={{ duration: 0.25 }}
        className="h-full bg-white border-r border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="p-2 flex justify-end">
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            {open ? "Collapse" : "Expand"}
          </button>
        </div>
        <nav className="px-2 space-y-1">
          {nav.map(({ label, icon: Icon, ai }) => (
            <a
              key={label}
              href="#"
              className="group relative flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              <div className={`w-1.5 h-6 rounded-r ${label === "Dashboard" ? "bg-[#1a73e8]" : "bg-transparent"}`} />
              <Icon className={`w-5 h-5 ${ai ? "text-[#9c27b0]" : "text-gray-600"}`} />
              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.15 }}
                    className="truncate"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
              {ai && (
                <span className="absolute right-2 text-[10px] px-1.5 py-0.5 rounded bg-[#9c27b0]/10 text-[#9c27b0] border border-[#9c27b0]/20">AI</span>
              )}
            </a>
          ))}
        </nav>
      </motion.div>
    </aside>
  );
}
