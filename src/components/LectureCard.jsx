import { FileText, Timer, Sparkles } from "lucide-react";
import { useState } from "react";

export default function LectureCard({ lecture, onShowSummary }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
      <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center text-sm font-semibold">
        {lecture.order}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-[#202124] truncate">{lecture.title}</p>
          {lecture.pdf_attached && <FileText className="w-4 h-4 text-gray-500" />}
        </div>
        <p className="text-xs text-[#5f6368] flex items-center gap-1 mt-0.5">
          <Timer className="w-3.5 h-3.5" /> {lecture.duration_minutes} min
        </p>
      </div>
      <button
        onClick={() => onShowSummary?.(lecture)}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-[#9c27b0] border border-[#9c27b0]/30 hover:bg-[#9c27b0]/5 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5" /> AI Summary
      </button>
    </div>
  );
}
