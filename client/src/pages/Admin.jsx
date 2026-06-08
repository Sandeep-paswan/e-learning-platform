import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getAdminOverview } from "../lib/api";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      return;
    }

    getAdminOverview()
      .then(setOverview)
      .catch((err) => {
        setError(err.response?.data?.message || "Admin data load nahi ho saki.");
      });
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        {!isAuthenticated ? (
          <div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-8 text-amber-100">
            Admin panel dekhne ke liye pehle login karo.
          </div>
        ) : user?.role !== "admin" ? (
          <div className="rounded-[2rem] border border-rose-400/20 bg-rose-500/10 p-8 text-rose-100">
            Yeh page sirf admin users ke liye hai.
          </div>
        ) : error ? (
          <div className="rounded-[2rem] border border-rose-400/20 bg-rose-500/10 p-8 text-rose-100">
            {error}
          </div>
        ) : (
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow backdrop-blur-xl">
            <div className="border-b border-white/10 bg-[linear-gradient(160deg,rgba(29,155,240,0.16),rgba(15,23,42,0.24))] p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-100">
                Admin Control
              </p>
              <h1 className="mt-4 text-4xl font-extrabold">Platform Overview</h1>
              <p className="mt-4 max-w-2xl text-slate-300">
                Admin panel ko cleaner analytics layout diya gaya hai taaki app
                zyada professional lage aur future CRUD modules ke liye achha base mile.
              </p>
            </div>

            <div className="grid gap-6 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
              <div className="grid gap-4 md:grid-cols-3">
                {overview?.stats?.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6"
                  >
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-3 text-4xl font-extrabold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-100">
                  Next Up
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    "Add course create and edit forms for admin.",
                    "Connect user and enrollment data to MongoDB.",
                    "Integrate payment and order management modules.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
