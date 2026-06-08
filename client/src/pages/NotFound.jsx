import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-glow">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">
          404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold">Page not found</h1>
        <p className="mt-4 text-slate-300">
          Jo page aap dhoond rahe hain woh abhi available nahi hai.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-brand-500 px-6 py-3 font-bold text-white"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
