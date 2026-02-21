import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}`}
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
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900">
        {/* Cover banner */}
        <div
          className="flex h-48 items-center justify-center"
          style={{ backgroundColor: book.coverColor + "20" }}
        >
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              width={90}
              height={130}
              className="h-36 w-auto rounded-md object-cover shadow-md"
            />
          ) : (
            <div
              className="flex h-28 w-20 items-center justify-center rounded-md shadow-md"
              style={{ backgroundColor: book.coverColor }}
            >
              <span className="px-2 text-center text-xs font-bold leading-tight text-white">
                {book.title}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{book.author}</p>

          <div className="mt-3 flex items-center justify-between">
            <StarRating rating={book.rating} />
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {book.totalChapters} chapters
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {book.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
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
