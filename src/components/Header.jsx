import { Search, Bell, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ onSearchChange, query = "", onOpenAssistant }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur z-30 border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto h-full px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 min-w-[140px]">
          <div className="w-8 h-8 rounded-md bg-[#1a73e8] flex items-center justify-center text-white font-bold">S</div>
          <span className="font-semibold text-[#202124]">Slate LMS</span>
        </div>

        <div className="flex-1 hidden sm:flex">
          <div className="w-full relative">
            <input
              value={query}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search courses, lectures…"
              className="w-full h-10 pl-10 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#1a73e8]/20 focus:border-[#1a73e8] bg-white text-sm"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              onClick={onOpenAssistant}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#9c27b0] border border-[#9c27b0]/30 hover:bg-[#9c27b0]/5 transition-colors"
              aria-label="AI search"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition" aria-label="Notifications">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-[#ea4335] text-white text-[10px] leading-none">3</span>
          </button>

          <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition" aria-label="User menu">
            <img
              src="https://i.pravatar.cc/40?img=5"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
