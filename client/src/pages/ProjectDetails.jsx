import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getProjectBySlug } from "../data/projects";

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
          <h1 className="text-4xl font-black text-slate-900">Project not found</h1>
          <p className="mt-4 text-lg text-slate-600">
            Jo project aap dekhna chahte hain woh available nahi hai.
          </p>
          <Link
            to="/projects"
            className="mt-8 inline-flex rounded-xl bg-[#2f318f] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Projects
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[320px]">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2f318f]">
                {project.category}
              </p>
              <h1 className="mt-4 text-4xl font-black text-slate-900">
                {project.title}
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {project.overview}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#eef1ff] px-4 py-2 text-sm font-semibold text-[#2f318f]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Link
                to="/projects"
                className="mt-8 inline-flex rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Back to All Projects
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">Project Overview</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {project.description}
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Yeh project practical learning ke liye design kiya gaya hai taaki aap
              real-world layout, component structure, aur clean frontend flow samajh
              sako.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">What You Will Build</h2>
            <ul className="mt-5 space-y-4 text-base text-slate-600">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#2f318f]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
