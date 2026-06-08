export const projects = [
  {
    slug: "frontend-dashboard-ui",
    title: "Frontend Dashboard UI",
    category: "UI Engineering",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Build a responsive analytics dashboard using React cards, charts, clean sections, and modern layout patterns.",
    overview:
      "Is project me aap ek full dashboard interface build karoge jisme sidebar, overview cards, chart section, recent activity, aur responsive layout hoga.",
    stack: ["React", "Tailwind CSS", "Charts", "Responsive Design"],
    features: [
      "Responsive dashboard layout",
      "Metric cards and chart widgets",
      "Recent activity and notification blocks",
      "Professional admin panel styling",
    ],
  },
  {
    slug: "portfolio-landing-page",
    title: "Portfolio Landing Page",
    category: "Web Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    description:
      "Create a modern portfolio homepage with a strong hero section, project highlights, testimonials, and contact CTA.",
    overview:
      "Yeh project ek strong personal brand website ke liye hai jahan aap hero section, services, projects showcase, aur contact block design karoge.",
    stack: ["React", "CSS", "Animation", "UI Layout"],
    features: [
      "Hero section with strong CTA",
      "Project showcase blocks",
      "Testimonials and contact section",
      "Smooth modern visual hierarchy",
    ],
  },
  {
    slug: "course-purchase-flow",
    title: "Course Purchase Flow",
    category: "Product Design",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Design a buy-course page with pricing, checkout summary, purchase CTA, and enroll confirmation experience.",
    overview:
      "Isme aap buy course journey create karoge jahan user course details dekhkar pricing, benefits, summary aur enroll flow complete karega.",
    stack: ["React", "Tailwind CSS", "UX Flow", "Cards"],
    features: [
      "Pricing and benefits section",
      "Checkout summary card",
      "Enroll and confirmation flow",
      "Clean education platform experience",
    ],
  },
];

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
