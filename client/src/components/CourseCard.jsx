import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]">
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
          {course.category}
        </div>
      </div>

      <div className="space-y-4 p-5 text-slate-900">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>{course.level}</span>
          <span>{course.duration}</span>
        </div>

        <div>
          <h3 className="text-2xl font-black leading-tight">{course.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {course.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>{course.instructor}</span>
          <span>{course.rating} rating</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <p className="text-2xl font-black text-red-600">
            {Number(course.price) === 0 ? "Free" : `Rs. ${course.price}`}
          </p>
          <Link
            to={`/courses/${course.slug}`}
            className="inline-flex items-center rounded-xl bg-blue-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-950"
          >
            {Number(course.price) === 0 ? "Start Free Learning" : "Buy Course"}
          </Link>
        </div>
      </div>
    </article>
  );
}
