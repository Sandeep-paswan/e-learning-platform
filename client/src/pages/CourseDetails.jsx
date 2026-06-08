import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getCourseBySlug } from "../lib/api";

const getYoutubeEmbedUrl = (videoUrl = "") => {
  const match = videoUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/i
  );

  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export default function CourseDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const videoSectionRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setCourse(await getCourseBySlug(slug));
        setError("");
      } catch (_err) {
        setError("Course details load nahi ho saki.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const isFreeCourse = Number(course?.price) === 0;
  const embedUrl = getYoutubeEmbedUrl(course?.videoUrl);

  const showEmbeddedVideo = () => {
    videoSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {loading ? (
          <div className="h-[420px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5"></div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 px-6 py-5 text-rose-100">
            {error}
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <section>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">
                {course.category} | {course.level}
              </p>
              <h1 className="mt-4 text-5xl font-extrabold">{course.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                {course.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  `${course.lessons} lessons`,
                  `${course.students}+ learners`,
                  `${course.rating} rating`,
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-bold">Course Highlights</h2>
                  <div className="mt-6 space-y-4 text-slate-300">
                    {course.highlights.map((highlight) => (
                      <p key={highlight}>{highlight}</p>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <h2 className="text-2xl font-bold">Modules</h2>
                  <div className="mt-6 space-y-4 text-slate-300">
                    {course.modules.map((module) => (
                      <p key={module}>{module}</p>
                    ))}
                  </div>
                </div>
              </div>

              {isFreeCourse && embedUrl ? (
                <div
                  ref={videoSectionRef}
                  className="mt-10 overflow-hidden rounded-[2rem] border border-emerald-400/30 bg-emerald-500/10 p-5"
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
                        Free Video
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-white">
                        {course.videoTitle || "Related Course Video"}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={showEmbeddedVideo}
                      className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                    >
                      Playing on This Page
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                    <iframe
                      src={embedUrl}
                      title={course.videoTitle || course.title}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : null}
            </section>

            <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-glow">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-64 w-full rounded-[1.5rem] object-cover"
              />
              <div className="space-y-5 p-4">
                <p className="text-3xl font-extrabold">
                  {isFreeCourse ? "Free Course" : `Rs. ${course.price}`}
                </p>
                <p className="text-slate-300">Instructor: {course.instructor}</p>
                <p className="text-slate-300">Duration: {course.duration}</p>

                {isFreeCourse && course.videoUrl ? (
                  <button
                    type="button"
                    onClick={showEmbeddedVideo}
                    className="block w-full rounded-full bg-emerald-400 px-6 py-4 text-center text-base font-bold text-slate-950 transition hover:bg-emerald-300"
                  >
                    Watch Free Lesson Here
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full rounded-full bg-brand-500 px-6 py-4 text-base font-bold text-white transition hover:bg-brand-600"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
