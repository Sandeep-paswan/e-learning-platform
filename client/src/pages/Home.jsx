import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import { getCourses } from "../lib/api";

const promoSlides = [
  {
    title: "Frontend UI Engineering",
    subtitle: "Modern Design Batch",
    meta: "Responsive UI | Components | Real Projects",
    stat: "48+ live design sessions",
    accent: "Portfolio-ready frontend projects",
    badge: "Top Rated UI Track",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    portrait:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Data Analytics with Python",
    subtitle: "Career Track Batch",
    meta: "Python | pandas | Dashboards | Projects",
    stat: "24+ guided analytics classes",
    accent: "Hands-on dashboard and reporting projects",
    badge: "Trending Data Track",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
    portrait:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [coursePage, setCoursePage] = useState(0);
  const coursesPerPage = 4;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (_err) {
        setError("Unable to load featured courses right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % promoSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = promoSlides[activeSlide];
  const totalCoursePages = Math.max(1, Math.ceil(courses.length / coursesPerPage));
  const visibleCourses = courses.slice(
    coursePage * coursesPerPage,
    coursePage * coursesPerPage + coursesPerPage
  );

  const showPreviousCourses = () => {
    setCoursePage((current) => (current === 0 ? totalCoursePages - 1 : current - 1));
  };

  const showNextCourses = () => {
    setCoursePage((current) => (current + 1) % totalCoursePages);
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <Navbar />

      <main className="pb-16">
        <section className="mx-auto max-w-[1600px] px-0 lg:px-0">
          <div className="relative overflow-hidden border-y border-slate-200 bg-[#7a050d]">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <img
              src={slide.backdrop}
              alt=""
              aria-hidden="true"
              className="absolute inset-y-0 left-[20%] hidden h-full w-[52%] rounded-[2.5rem] object-cover opacity-12 blur-[1px] lg:block"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(122,5,13,0.96),rgba(198,16,25,0.82),rgba(122,5,13,0.88))]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(255,215,0,0.12),transparent_18%)]"></div>
            <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

            <div className="relative mx-auto grid min-h-[450px] max-w-[1500px] items-center gap-10 px-6 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10">
              <div className="max-w-[680px]">
                <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white/90">
                  {slide.badge}
                </div>
                <p className="mt-3 text-4xl font-black uppercase tracking-tight text-amber-200 md:text-6xl">
                  {slide.title}
                </p>
                <p className="mt-4 inline-block rounded-2xl bg-white px-5 py-3 text-2xl font-black text-red-600 md:text-4xl">
                  {slide.subtitle}
                </p>
                <p className="mt-5 inline-block rounded-2xl bg-yellow-400 px-5 py-3 text-base font-extrabold text-red-700 md:text-xl">
                  {slide.meta}
                </p>

                <div className="mt-5 grid max-w-[680px] gap-4 md:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                      Batch Strength
                    </p>
                    <p className="mt-2 text-xl font-black text-white">{slide.stat}</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-yellow-300/25 bg-yellow-300/10 px-5 py-4 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-100">
                      Why Join
                    </p>
                    <p className="mt-2 text-base font-bold text-yellow-50">{slide.accent}</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/courses"
                    className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-7 py-3.5 text-base font-extrabold text-red-700"
                  >
                    Buy Course
                  </Link>
                  <Link
                    to="/courses"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-7 py-3.5 text-base font-bold text-white"
                  >
                    View Courses
                  </Link>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  {promoSlides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-3 rounded-full transition ${
                        activeSlide === index ? "w-10 bg-white" : "w-3 bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[420px] pt-3 lg:pt-0">
                  <div className="absolute right-5 top-5 h-20 w-20 rounded-full bg-yellow-300/15 blur-3xl"></div>
                  <div className="absolute -left-3 bottom-12 hidden h-24 w-24 rounded-full bg-white/10 blur-3xl md:block"></div>

                  <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.24)] backdrop-blur">
                    <div className="relative overflow-hidden rounded-[1.5rem]">
                      <img
                        src={slide.portrait}
                        alt="Students learning together"
                        className="h-[360px] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.02),rgba(15,23,42,0.38))]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-800">
                Popular Courses
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-900 lg:text-4xl">
                  Explore top categories and exam-focused batches
                </h2>
                <div className="mt-4 h-3 w-40 rounded-full bg-yellow-300"></div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 lg:text-base">
                  Left aur right arrows se different course sets browse karo aur jo batch pasand aaye usse open karo.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={showPreviousCourses}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-[#f8fbff] text-xl text-blue-900 transition hover:-translate-y-0.5 hover:bg-blue-900 hover:text-white"
                  aria-label="Show previous courses"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={showNextCourses}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-[#f8fbff] text-xl text-blue-900 transition hover:-translate-y-0.5 hover:bg-blue-900 hover:text-white"
                  aria-label="Show next courses"
                >
                  &rarr;
                </button>
              </div>
            </div>

            {loading ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[380px] animate-pulse rounded-[2rem] bg-slate-100"
                  ></div>
                ))}
              </div>
            ) : error ? (
              <div className="mt-10 rounded-3xl border border-rose-300 bg-rose-50 px-6 py-5 text-rose-700">
                {error}
              </div>
            ) : (
              <>
                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {visibleCourses.map((course) => (
                    <CourseCard key={course._id || course.slug} course={course} />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-2">
                  {Array.from({ length: totalCoursePages }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCoursePage(index)}
                      className={`h-2.5 rounded-full transition ${
                        coursePage === index ? "w-8 bg-blue-900" : "w-2.5 bg-slate-300"
                      }`}
                      aria-label={`Show course page ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
