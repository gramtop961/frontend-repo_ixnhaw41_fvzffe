import { motion } from "framer-motion";

export default function CourseCard({ course }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.08)", scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group focus:outline-none focus:ring-4 focus:ring-[#1a73e8]/20"
      tabIndex={0}
      role="button"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#202124] truncate">{course.title}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9c27b0]/10 text-[#9c27b0] border border-[#9c27b0]/20">AI Summary</span>
        </div>
        <p className="text-sm text-[#5f6368] line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#5f6368]">{course.instructor}</span>
          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#34a853] rounded-full"
              style={{ width: `${course.progress_percent || 0}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
