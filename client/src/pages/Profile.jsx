import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const profileNotes = [
  "Personal details ek clean card me visible hain.",
  "Profile image upload karne ka option available hai.",
  "Courses aur projects tak quick access diya gaya hai.",
];

const getAvatarStorageKey = (user) =>
  `learnhub-avatar-${user?.email || user?.id || "guest"}`;

export default function Profile() {
  const { isAuthenticated, user } = useAuth();
  const [avatar, setAvatar] = useState("");
  const inputId = useId();

  useEffect(() => {
    if (!user) {
      setAvatar("");
      return;
    }

    const savedAvatar = localStorage.getItem(getAvatarStorageKey(user)) || "";
    setAvatar(savedAvatar);
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : "";
      setAvatar(image);

      if (user && image) {
        localStorage.setItem(getAvatarStorageKey(user), image);
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setAvatar("");

    if (user) {
      localStorage.removeItem(getAvatarStorageKey(user));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f5f7ff] text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <div className="rounded-[2rem] border border-amber-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-3xl font-black text-slate-900">Profile Locked</h1>
            <p className="mt-4 text-base text-slate-600">
              Login karke aap apna profile, image aur personal details dekh sakte ho.
            </p>
            <Link
              to="/login"
              className="mt-8 inline-flex rounded-2xl bg-[#2f318f] px-6 py-3 text-sm font-semibold text-white"
            >
              Go to Login
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const enrolledCount = user.enrolledCourses?.length || 0;
  const initials = user.name
    ?.split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#c7d2fe_0%,#eef4ff_28%,#f8fafc_100%)] text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="relative rounded-t-[2rem] bg-[linear-gradient(180deg,#1e3a8a_0%,#312e81_100%)] p-8 text-white lg:rounded-l-[2rem] lg:rounded-tr-none lg:p-9">
              <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_70%)]" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.4em] text-blue-100/90">
                My Profile
              </p>

              <div className="relative mt-8 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] border-4 border-white/25 bg-white/10 shadow-2xl">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-black tracking-[0.18em]">
                        {initials || "U"}
                      </span>
                    )}
                  </div>
                  <label
                    htmlFor={inputId}
                    className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 cursor-pointer rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#2f318f] shadow-lg"
                  >
                    Change
                  </label>
                  <input
                    id={inputId}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <h1 className="mt-9 text-3xl font-black leading-tight">{user.name}</h1>
                <p className="mt-2 text-sm text-blue-100/90">{user.email}</p>
                <p className="mt-1 text-sm text-blue-100/90">
                  {user.phone || "+91 Not added yet"}
                </p>

                <div className="mt-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold capitalize text-white">
                  {user.role} Account
                </div>

                <div className="mt-8 grid w-full gap-3 text-left">
                  {profileNotes.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3.5 text-sm leading-6 text-blue-50"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="mt-6 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-8 lg:p-9">
              <div className="rounded-[1.75rem] border border-slate-200 bg-[#f8fbff] p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2f318f]">
                  User Details
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <DetailCard label="Full Name" value={user.name} />
                  <DetailCard label="Email Address" value={user.email} />
                  <DetailCard
                    label="Phone Number"
                    value={user.phone || "Not available"}
                  />
                  <DetailCard
                    label="Account Type"
                    value={user.role === "admin" ? "Administrator" : "Student"}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <StatCard label="Enrolled Courses" value={String(enrolledCount)} />
                <StatCard label="Status" value="Active" />
                <StatCard label="Projects Access" value="Enabled" />
              </div>

              <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2f318f]">
                  Quick Links
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <QuickLink to="/courses" label="All Courses" />
                  <QuickLink to="/courses?type=free" label="Free Courses" />
                  <QuickLink to="/projects" label="View Projects" />
                </div>
              </div>

              <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#eef4ff_0%,#ffffff_100%)] p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2f318f]">
                  About Your Profile
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Yeh section ab better contrast, cleaner cards aur compact layout ke
                  saath bana hai taaki user details turant samajh aaye aur page dekhne
                  me zyada premium lage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 break-all text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 text-center shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function QuickLink({ to, label }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900"
    >
      {label}
    </Link>
  );
}
