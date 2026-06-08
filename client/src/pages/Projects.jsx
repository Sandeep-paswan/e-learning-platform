import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-800">
            Projects
          </p>
          <h1 className="mt-4 text-4xl font-black text-slate-900 lg:text-5xl">
            Practice with real frontend projects
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Is section me aap project-based learning dekh sakte ho. Har project
            ke saath preview image, tech stack, aur detail page diya gaya hai.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((card) => (
            <article
              key={card.slug}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#2f318f]">
                  {card.category}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-black text-slate-900">{card.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {card.description}
                </p>
                <Link
                  to={`/projects/${card.slug}`}
                  className="mt-6 inline-flex rounded-xl bg-[#2f318f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#23256f]"
                >
                View Project
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
