import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardOverview } from "../lib/api";

const sidebarItems = [
  "Dashboard",
  "Live Classes",
  "My Courses",
  "My Test Series",
  "Answer Writing",
  "Courses",
  "Test Series",
  "Study Materials",
  "Practice",
];

const recentActivity = [
  "Pocket GK Batch 2025",
  "Lecture-04 | Current affairs",
  "72nd BPSC Foundation Batch",
  "Answer Writing",
  "BPSC Quiz",
];

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setOverview(await getDashboardOverview());
      } catch (_err) {
        setError("Dashboard data abhi available nahi hai.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="min-h-screen animate-pulse bg-[#eef3ff]"></div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef3ff] px-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef3ff] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="hidden bg-[#2f318f] text-white lg:block">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-[4px] border-white bg-[#2f318f] text-center">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white">
                    Learn
                  </p>
                  <p className="text-lg font-black leading-none text-white">LH</p>
                </div>
              </div>
              <p className="text-2xl font-black">KGS</p>
            </div>
          </div>

          <nav className="space-y-1.5 px-3 py-5">
            {sidebarItems.map((item, index) => (
              <div
                key={item}
                className={`rounded-r-xl px-4 py-3 text-base ${
                  index === 0 ? "bg-[#23256f] font-semibold" : "text-white/90"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 hidden w-[220px] px-4 pb-5 lg:block">
            <div className="rounded-xl bg-[#272977] px-4 py-3 text-center text-lg">
              Back
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 lg:px-6">
            <div>
              <p className="text-base text-slate-600">
                Hello {isAuthenticated ? user.name : overview.learner.name}, Welcome Back!
              </p>
              <h1 className="mt-1 text-3xl font-black text-slate-900 lg:text-4xl">
                Your Dashboard Today
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="rounded-xl border border-[#2f318f] px-4 py-3 text-sm font-semibold text-[#2f318f]">
                UPSC & State PSC
              </div>
              <div className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-400">
                Search
              </div>
              <div className="rounded-xl bg-[#eef1ff] px-4 py-3 text-sm font-bold text-[#2f318f]">
                KGS Store
              </div>
              <Link
                to="/profile"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef1ff] text-lg"
              >
                {isAuthenticated ? user.name.charAt(0).toUpperCase() : "U"}
              </Link>
            </div>
          </header>

          <div className="space-y-5 p-4 lg:p-5">
            <section className="overflow-hidden rounded-[1.5rem] bg-white p-3 shadow-sm">
              <div className="relative overflow-hidden rounded-[1.25rem] bg-[linear-gradient(90deg,#8733b7,#d470dc)] p-5 text-white">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                  alt="Instructor banner"
                  className="absolute right-0 top-0 h-full w-[34%] object-cover opacity-35"
                />
                <div className="relative">
                  <p className="text-3xl font-black md:text-5xl">70th BPSC</p>
                  <p className="mt-2 text-lg font-black md:text-2xl">
                    Mock Interview Guidance Programme
                  </p>
                  <div className="mt-4 inline-flex rounded-lg bg-red-500 px-4 py-2 text-sm font-bold">
                    Register Now
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 rounded-full ${
                      index === 2 ? "w-8 bg-[#8b8ce6]" : "w-2 bg-slate-300"
                    }`}
                  ></span>
                ))}
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))_1.25fr]">
              {[
                ["Enrolled Courses", overview.learner.enrolledCourses, "#eef0ff"],
                ["Lecture Watch", overview.learner.completedLessons, "#ecfbef"],
                ["My Submission", overview.learner.certificates, "#fff6e7"],
              ].map(([label, value, bg]) => (
                <div
                  key={label}
                  className="rounded-[1.25rem] p-4 shadow-sm"
                  style={{ backgroundColor: bg }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-[#2f318f]">
                    1
                  </div>
                  <p className="mt-4 text-lg font-medium">{label}</p>
                  <div className="mt-3 inline-flex rounded-lg bg-white px-3 py-2 text-lg font-bold text-[#2f318f]">
                    {value}
                  </div>
                </div>
              ))}

              <div className="rounded-[1.25rem] bg-white p-4 shadow-sm">
                <h2 className="text-2xl font-bold">Live Classes</h2>
                <div className="flex h-[180px] flex-col items-center justify-center text-center text-slate-500">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ff] text-2xl">
                    +
                  </div>
                  <p className="mt-4 text-base">There are currently no live classes scheduled.</p>
                </div>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[1.25rem] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Test Series</h2>
                  <span className="text-xl text-slate-400">...</span>
                </div>
                <div className="mt-6 flex h-[220px] items-end justify-around rounded-[1rem] border border-slate-100 bg-[#fcfcff] px-5 pb-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-24 w-7 rounded-full bg-[#3236a5]"></div>
                    <p className="text-sm text-[#3236a5]">19th Mar</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-40 w-7 rounded-full bg-[#b4b4ff]"></div>
                    <p className="text-sm text-[#3236a5]">21st Mar</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.25rem] bg-white p-4 shadow-sm">
                <h2 className="text-2xl font-bold">Activity</h2>
                <div className="mt-6 flex items-center justify-center">
                  <div className="relative h-48 w-48 rounded-full bg-[conic-gradient(#a8aaf2_0_72%,#6e72d9_72%_92%,#2f318f_92%_100%)]">
                    <div className="absolute inset-[30px] rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                  <span>Quiz</span>
                  <span>Submission</span>
                  <span>Courses</span>
                </div>
              </div>
            </section>
          </div>
        </main>

        <aside className="hidden border-l border-slate-200 bg-white p-4 xl:block">
          <h2 className="text-3xl font-black text-slate-900">Recent Activity</h2>
          <div className="mt-6 space-y-5">
            {recentActivity.map((item, index) => (
              <div key={item} className="flex gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef3ff] text-sm font-bold text-[#2f318f]">
                  {index % 2 === 0 ? "A" : "P"}
                </div>
                <div>
                  <p className="text-lg font-semibold leading-tight text-slate-900">
                    {item}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Recent update added</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
