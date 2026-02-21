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

export function BookListCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.slug}`} className="group block">
      <div className="flex items-center gap-5 rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
        {/* Cover */}
        <div
          className="flex h-20 w-14 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: book.coverColor + "20" }}
        >
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              width={56}
              height={80}
              className="h-20 w-14 rounded-md object-cover shadow-sm"
            />
          ) : (
            <div
              className="flex h-20 w-14 items-center justify-center rounded-md shadow-sm"
              style={{ backgroundColor: book.coverColor }}
            >
              <span className="px-1 text-center text-[7px] font-bold leading-tight text-white">
                {book.title}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                {book.title}
              </h3>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{book.author}</p>
            </div>
            <div className="hidden shrink-0 sm:block">
              <StarRating rating={book.rating} />
            </div>
          </div>

          <p className="mt-1.5 line-clamp-1 text-sm text-zinc-600 dark:text-zinc-400">
            {book.summary}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {book.category}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {book.totalChapters} chapters
            </span>
            <div className="hidden items-center gap-1.5 sm:flex">
              {book.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <svg
          className="h-5 w-5 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500 dark:text-zinc-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}
