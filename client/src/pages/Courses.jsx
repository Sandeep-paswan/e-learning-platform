import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getCourses } from "../lib/api";

export default function Courses() {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const type = searchParams.get("type") || "";

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setCourses(await getCourses());
      } catch (_err) {
        setError("Course list abhi load nahi ho pa rahi hai.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesQuery = !query
      ? true
      : [
      course.title,
      course.category,
      course.instructor,
      course.description,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);

    const matchesType =
      type === "free"
        ? Number(course.price) === 0
        : type === "paid"
          ? Number(course.price) > 0
          : true;

    return matchesQuery && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">
                Course Library
              </p>
              <h1 className="mt-4 text-5xl font-extrabold">All Courses</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Login ke baad aapko pehle course section par laya gaya hai taaki
                aap directly learning options explore kar sako.
              </p>
              {query ? (
                <p className="mt-4 text-sm font-medium text-brand-100">
                  Search results for: "{searchParams.get("q")}"
                </p>
              ) : null}
              {type ? (
                <p className="mt-2 text-sm font-medium text-emerald-300">
                  Showing: {type === "free" ? "Free Courses" : "Buy Courses"}
                </p>
              ) : null}

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Live Tracks", "24+"],
                  ["Mentors", "18"],
                  ["Projects", "40+"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 px-5 py-5"
                  >
                    <p className="text-2xl font-extrabold text-white">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                alt="Instructor teaching students in a digital classroom"
                className="h-full min-h-[300px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[390px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-12 rounded-3xl border border-rose-400/30 bg-rose-500/10 px-6 py-5 text-rose-100">
            {error}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-amber-400/30 bg-amber-500/10 px-6 py-5 text-amber-100">
            Koi matching course nahi mila. Dusra naam search karke dekho.
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id || course.slug} course={course} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
