import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(form);
      navigate(data.user.role === "admin" ? "/admin" : "/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="hidden bg-[#eef4ff] lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-10">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
          alt="Student studying with digital screen"
          className="h-[300px] w-[300px] rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(59,91,219,0.14)] xl:h-[340px] xl:w-[340px]"
        />
        <h2 className="mt-8 max-w-lg text-center text-3xl font-black tracking-tight text-slate-900 xl:text-4xl">
          Login to access the courses and materials
        </h2>
        <p className="mt-3 max-w-lg text-center text-base text-slate-600 xl:text-lg">
          Continue your batches, tests, and study materials from one clean dashboard.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <span className="h-2.5 w-8 rounded-full bg-[#706fc8]"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-8 lg:px-12">
        <div className="w-full max-w-xl">
          <div className="mb-6 inline-flex rounded-2xl bg-slate-100 p-1">
            <Link
              to="/login"
              className="rounded-xl bg-[#2b2b86] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700"
            >
              New Registration
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-[#2e3192] bg-white text-center shadow-sm">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#2e3192]">
                  Learn
                </p>
                <p className="text-xl font-black leading-none text-[#2e3192]">LH</p>
              </div>
            </div>
          </div>

          <h1 className="mt-8 text-3xl font-black text-slate-900 xl:text-4xl">Welcome back!</h1>
          <p className="mt-3 text-lg text-slate-600 xl:text-xl">
            Please login to access your account.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-base font-medium text-slate-900">
                <span className="mr-1 text-red-500">*</span>Email Address
              </span>
              <input
                type="email"
                name="email"
                placeholder="Please enter your Email Address"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-xl border px-5 py-4 text-base text-slate-900 outline-none transition ${
                  error
                    ? "border-red-300 focus:border-red-400"
                    : "border-slate-300 focus:border-[#2e3192]"
                }`}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-base font-medium text-slate-900">
                <span className="mr-1 text-red-500">*</span>Password
              </span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#2e3192]"
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            ) : null}

            <div className="flex items-center justify-between text-sm xl:text-base">
              <label className="flex items-center gap-2.5 text-slate-700">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#2e3192]" />
                <span>Remember me</span>
              </label>
              <button type="button" className="font-medium text-[#2456f5]">
                Forget Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2b2b86] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#23236f] disabled:opacity-70 xl:text-xl"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">New user ho?</p>
            <Link
              to="/register"
              className="mt-2 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#2456f5] shadow-sm"
            >
              Create New Registration
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 xl:text-sm">
            Demo student: <span className="font-mono">student@learnhub.dev / student123</span>
            <br />
            Demo admin: <span className="font-mono">admin@learnhub.dev / admin123</span>
          </div>
        </div>
      </section>
    </div>
  );
}
