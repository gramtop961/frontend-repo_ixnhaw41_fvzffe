import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CourseCard from "./components/CourseCard";
import LectureCard from "./components/LectureCard";
import AISummaryModal from "./components/AISummaryModal";
import AIAssistantWidget from "./components/AIAssistantWidget";
import Spline from "@splinetool/react-spline";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function App() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [activeSummary, setActiveSummary] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/courses`).then((r) => r.json()).then(setCourses).catch(() => setCourses([]));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) =>
      [c.title, c.description, c.instructor].some((v) => (v || "").toLowerCase().includes(q))
    );
  }, [courses, query]);

  const openSummaryFor = async (lecture) => {
    try {
      const res = await fetch(`${baseUrl}/api/courses/demo/lectures`);
      const data = await res.json();
      setActiveSummary(data?.summaries?.[0]);
    } catch (e) {
      setActiveSummary({ content: "Demo summary for this lecture.", word_count: 120, model_name: "mock-gpt" });
    }
    setSummaryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#202124]">
      <Header onSearchChange={setQuery} query={query} />
      <Sidebar />

      {/* Hero with Spline on mobile/tablet */}
      <section className="pt-20 pb-6 sm:pb-10 lg:pl-[260px]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200">
            <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/60 via-transparent to-white/80" />
            <div className="absolute bottom-3 left-3 right-3 sm:left-6 sm:bottom-6">
              <h1 className="text-2xl sm:text-3xl font-semibold">Welcome back, Jordan</h1>
              <p className="text-[#5f6368] text-sm">Continue where you left off or explore AI-powered insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="lg:pl-[260px] pb-24">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Course grid */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold">Your courses</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c, i) => (
                  <CourseCard key={i} course={c} />
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-full bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-[#5f6368]">
                    No courses found. Try a different search.
                  </div>
                )}
              </div>
            </section>

            {/* Lectures preview */}
            <section>
              <h2 className="text-xl font-semibold mb-3">Upcoming lectures</h2>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <LectureCard key={idx} lecture={{ order: idx + 1, title: `Lecture ${idx + 1}`, duration_minutes: 15 + idx * 5, pdf_attached: idx % 2 === 0 }} onShowSummary={openSummaryFor} />
                ))}
              </div>
            </section>
          </div>

          {/* Insights and stats */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold mb-2">AI-generated insights</h3>
              <p className="text-sm text-[#5f6368]">You're most active on Tuesdays. Consider scheduling study sessions then.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-2xl font-semibold text-[#1a73e8]">4</p>
                <p className="text-xs text-[#5f6368]">Courses</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-2xl font-semibold text-[#34a853]">12</p>
                <p className="text-xs text-[#5f6368]">Lectures completed</p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <AISummaryModal open={summaryOpen} onClose={() => setSummaryOpen(false)} summary={activeSummary} />
      <AIAssistantWidget />
    </div>
  );
}
