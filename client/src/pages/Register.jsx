import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      await register(form);
      navigate("/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="flex items-center justify-center bg-[#eef4ff] px-6 py-8 lg:px-10">
        <div className="w-full max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
            alt="Students learning together"
            className="h-[260px] w-full rounded-[2rem] object-cover shadow-[0_20px_50px_rgba(59,91,219,0.14)] xl:h-[300px]"
          />
          <h2 className="mt-8 text-3xl font-black leading-tight text-slate-900 xl:text-4xl">
            Create account and access all courses, tests and study materials
          </h2>
          <p className="mt-3 text-base text-slate-600 xl:text-lg">
            Registration ke baad aap directly course section access kar paoge.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-5 py-8 lg:px-12">
        <div className="w-full max-w-xl">
          <div className="mb-6 inline-flex rounded-2xl bg-slate-100 p-1">
            <Link
              to="/login"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-[#2b2b86] px-5 py-2.5 text-sm font-semibold text-white"
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

          <h1 className="mt-8 text-3xl font-black text-slate-900 xl:text-4xl">Create your account</h1>
          <p className="mt-3 text-lg text-slate-600 xl:text-xl">
            Start your study journey with a fresh account.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-base font-medium text-slate-900">
                <span className="mr-1 text-red-500">*</span>Full Name
              </span>
              <input
                type="text"
                name="name"
                placeholder="Please enter your Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#2e3192]"
              />
            </label>

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
                className="w-full rounded-xl border border-slate-300 px-5 py-4 text-base text-slate-900 outline-none transition focus:border-[#2e3192]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-base font-medium text-slate-900">
                <span className="mr-1 text-red-500">*</span>Password
              </span>
              <input
                type="password"
                name="password"
                placeholder="Create your password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2b2b86] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#23236f] disabled:opacity-70 xl:text-xl"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">Already registered?</p>
            <Link
              to="/login"
              className="mt-2 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#2456f5] shadow-sm"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
