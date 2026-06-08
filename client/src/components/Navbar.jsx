import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const primaryNav = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Buy Courses", to: "/courses?type=paid" },
  { label: "Free Courses", to: "/courses?type=free" },
  { label: "Projects", to: "/projects" },
  { label: "My Profile", to: "/profile" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/courses?q=${encodeURIComponent(query)}` : "/courses");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-blue-700 bg-white text-center shadow-sm">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-700">
                  Learn
                </p>
                <p className="text-xl font-black leading-none text-blue-700">LH</p>
              </div>
            </div>
            <div className="hidden md:block">
              <p className="text-lg font-extrabold text-blue-900">LearnHub Global</p>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                Smart Study Platform
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 xl:flex">
            <Link
              to="/courses"
              className="rounded-2xl border border-blue-300 px-5 py-3 text-sm font-semibold text-blue-900"
            >
              All Courses
            </Link>
            <form
              onSubmit={handleSearchSubmit}
              className="flex min-w-[380px] items-center rounded-2xl border border-slate-300 px-4 py-3"
            >
              <input
                type="text"
                placeholder="What do you want to learn"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </form>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-2xl bg-blue-900 px-6 py-3 text-sm font-semibold text-white"
              >
                Login / Register
              </Link>
            )}
          </div>

          <button
            type="button"
            className="rounded-xl border border-slate-300 p-3 text-slate-800 md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
              <span className="block h-0.5 w-5 bg-current"></span>
            </span>
          </button>
        </div>

        <div className="mt-4 hidden items-center justify-center gap-10 border-t border-slate-200 pt-4 md:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              className={({ isActive }) =>
                `border-b-4 pb-2 text-sm font-medium transition ${
                  isActive
                    ? "border-blue-800 text-blue-900"
                    : "border-transparent text-slate-800 hover:text-blue-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="space-y-3">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to + item.label}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Admin Panel
                  </NavLink>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block text-sm font-semibold text-slate-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-semibold text-slate-800"
              >
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
