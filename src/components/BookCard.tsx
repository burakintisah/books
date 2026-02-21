import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-zinc-950/50">
        {/* Cover area with gradient */}
        <div className="relative h-56 overflow-hidden">
          {/* Multi-layer gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${book.coverColor}15 0%, ${book.coverColor}30 50%, ${book.coverColor}10 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 120%, ${book.coverColor}40 0%, transparent 70%)`,
            }}
          />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style={{
            backgroundImage: `radial-gradient(${book.coverColor} 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }} />

          {/* Cover image or placeholder */}
          <div className="relative flex h-full items-center justify-center pt-4 pb-2">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={book.title}
                width={120}
                height={170}
                className="h-44 w-auto rounded-lg object-cover shadow-lg ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-105 dark:ring-white/10"
              />
            ) : (
              <div
                className="flex h-40 w-28 items-center justify-center rounded-lg shadow-lg ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: `linear-gradient(145deg, ${book.coverColor}, ${book.coverColor}cc)`,
                }}
              >
                <span className="px-3 text-center text-xs font-bold leading-tight text-white drop-shadow-sm">
                  {book.title}
                </span>
              </div>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm"
              style={{ backgroundColor: book.coverColor + "cc" }}
            >
              {book.category}
            </span>
          </div>
        </div>

        {/* Info section */}
        <div className="p-5">
          <h3 className="text-base font-bold leading-snug text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{book.author}</p>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={book.rating} />
            <span className="text-xs text-zinc-400 dark:text-zinc-500">·</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {book.totalChapters} chapters
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {book.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
