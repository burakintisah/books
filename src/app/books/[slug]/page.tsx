import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookBySlug, getAllSlugs } from "@/lib/books";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      {/* Back */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        All Books
      </Link>

      {/* Book Header */}
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div
          className="flex h-44 w-32 shrink-0 items-center justify-center rounded-xl shadow-lg"
          style={{ backgroundColor: book.coverColor }}
        >
          <span className="px-3 text-center text-sm font-bold leading-tight text-white">
            {book.title}
          </span>
        </div>

        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {book.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{book.title}</h1>
          <p className="mt-1 text-lg text-zinc-500 dark:text-zinc-400">by {book.author}</p>
          <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-300">{book.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chapter List */}
      <h2 className="mb-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
        Chapters ({book.chapters.length})
      </h2>

      <div className="flex flex-col gap-4">
        {book.chapters.map((chapter) => (
          <Link
            key={chapter.number}
            href={`/books/${book.slug}/${chapter.number}`}
            className="group rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-blue-950 dark:group-hover:text-blue-400"
              >
                {chapter.number}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                  {chapter.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {chapter.summary}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500">
                  <span>💡 {chapter.keyInsights.length} insights</span>
                  <span>📝 {chapter.notes.length} notes</span>
                  <span>💬 {chapter.quotes.length} quotes</span>
                </div>
              </div>
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
        ))}
      </div>

      {/* Download */}
      {book.downloadFile && (
        <div className="mt-8 text-center">
          <a
            href={book.downloadFile}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Book PDF
          </a>
        </div>
      )}
    </main>
  );
}
