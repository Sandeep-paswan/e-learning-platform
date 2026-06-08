const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Sandeep-paswan",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.59 2 12.24c0 4.51 2.87 8.34 6.84 9.69.5.1.66-.22.66-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .85-.28 2.78 1.05A9.35 9.35 0 0 1 12 6.84a9.3 9.3 0 0 1 2.53.35c1.93-1.33 2.78-1.05 2.78-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.67.49A10.28 10.28 0 0 0 22 12.24C22 6.59 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sandeep-paswan-4857a334a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM5.5 10h2.88v8.5H5.5V10Zm4.68 0h2.76v1.16h.04c.38-.73 1.32-1.5 2.73-1.5 2.92 0 3.46 1.93 3.46 4.43v4.4H16.3v-3.9c0-.93-.02-2.12-1.29-2.12-1.3 0-1.5 1.01-1.5 2.05v3.97h-2.88V10Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mr_sandeep_20_?igsh=MTlzaXQybGNpbTdxaQ==",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 text-sm text-slate-300 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-lg font-bold text-white">LearnHub</h3>
          <p className="mt-4 leading-7 text-slate-400">
            Learn programming, technology, and professional skills from expert
            instructors anywhere in the world.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white">About</h4>
          <p className="mt-4 leading-7 text-slate-400">
            Modern online education with flexible lessons, project-based
            learning, and mentor support.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white">Contact</h4>
          <div className="mt-4 space-y-3 text-slate-400">
            <p className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-300">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 6.5h16v11H4z" />
                  <path d="m5 7 7 6 7-6" />
                </svg>
              </span>
              <span>sandeeppaswan55380@gmail.com</span>
            </p>
            <p className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sky-300">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6.6 4h2.7l1.2 4.1-1.7 1.7a15.1 15.1 0 0 0 5.4 5.4l1.7-1.7L20 14.7v2.7c0 .7-.6 1.3-1.3 1.3A14.7 14.7 0 0 1 5.3 5.3 1.3 1.3 0 0 1 6.6 4Z" />
                </svg>
              </span>
              <span>+91 7822863061</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white">Social</h4>
          <div className="mt-4 flex flex-wrap gap-3 text-slate-400">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                title={link.name}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-500">
        Copyright (c) 2026 LearnHub. All rights reserved.
      </div>
    </footer>
  );
}
