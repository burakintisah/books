import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookBySlug, getAllBooks } from "@/lib/books";
import { ChapterSidebar } from "@/components/ChapterSidebar";
import { MobileChapterNav } from "@/components/MobileChapterNav";
import { KeyInsightCard, NoteCardItem, QuoteCard } from "@/components/NoteCard";
import { PoemDisplay } from "@/components/PoemDisplay";

export function generateStaticParams() {
  const books = getAllBooks();
  const paths: { slug: string; chapterNum: string }[] = [];
  for (const book of books) {
    if (book.type === "poetry" && book.poems) {
      for (const poem of book.poems) {
        paths.push({ slug: book.slug, chapterNum: String(poem.number) });
      }
    } else {
      for (const chapter of book.chapters) {
        paths.push({ slug: book.slug, chapterNum: String(chapter.number) });
      }
    }
  }
  return paths;
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapterNum: string }>;
}) {
  const { slug, chapterNum } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const chapterNumber = parseInt(chapterNum, 10);
  const isPoetry = book.type === "poetry" && book.poems;

  if (isPoetry) {
    const poem = book.poems!.find((p) => p.number === chapterNumber);
    if (!poem) notFound();

    const prevPoem = book.poems!.find((p) => p.number === chapterNumber - 1);
    const nextPoem = book.poems!.find((p) => p.number === chapterNumber + 1);

    return (
      <div className="flex min-h-[calc(100vh-4rem)]">
        <ChapterSidebar book={book} activeChapter={chapterNumber} />

        <main className="flex-1 px-6 py-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <MobileChapterNav book={book} activeChapter={chapterNumber} />
            </div>

            {/* Poem header */}
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-500">
                {poem.number} / {book.totalChapters}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {poem.title}
              </h1>
            </div>

            {/* Poem display */}
            <PoemDisplay poem={poem} />

            {/* Prev/Next navigation */}
            <nav className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
              {prevPoem ? (
                <Link
                  href={`/books/${book.slug}/${prevPoem.number}`}
                  className="group flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <svg
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">Önceki</p>
                    <p className="font-medium">{prevPoem.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPoem ? (
                <Link
                  href={`/books/${book.slug}/${nextPoem.number}`}
                  className="group flex items-center gap-2 text-right text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">Sonraki</p>
                    <p className="font-medium">{nextPoem.title}</p>
                  </div>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ) : (
                <Link
                  href={`/books/${book.slug}`}
                  className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
                >
                  Kitaba Dön
                </Link>
              )}
            </nav>
          </div>
        </main>
      </div>
    );
  }

  // Regular book chapter view
  const chapter = book.chapters.find((c) => c.number === chapterNumber);
  if (!chapter) notFound();

  const prevChapter = book.chapters.find((c) => c.number === chapterNumber - 1);
  const nextChapter = book.chapters.find((c) => c.number === chapterNumber + 1);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar - desktop */}
      <ChapterSidebar book={book} activeChapter={chapterNumber} />

      {/* Main content */}
      <main className="flex-1 px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {/* Mobile chapter nav */}
          <div className="mb-6">
            <MobileChapterNav book={book} activeChapter={chapterNumber} />
          </div>

          {/* Chapter header */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-500">
              Chapter {chapter.number} of {book.totalChapters}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {chapter.title}
            </h1>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              {chapter.summary}
            </p>
          </div>

          {/* Key Insights */}
          {chapter.keyInsights.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Key Insights
              </h2>
              <div className="flex flex-col gap-3">
                {chapter.keyInsights.map((insight, i) => (
                  <KeyInsightCard key={i} insight={insight} />
                ))}
              </div>
            </section>
          )}

          {/* Notes */}
          {chapter.notes.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Notes
              </h2>
              <div className="flex flex-col gap-4">
                {chapter.notes.map((note, i) => (
                  <NoteCardItem key={i} note={note} />
                ))}
              </div>
            </section>
          )}

          {/* Quotes */}
          {chapter.quotes.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Quotes
              </h2>
              <div className="flex flex-col gap-3">
                {chapter.quotes.map((quote, i) => (
                  <QuoteCard key={i} quote={quote} />
                ))}
              </div>
            </section>
          )}

          {/* Prev/Next navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
            {prevChapter ? (
              <Link
                href={`/books/${book.slug}/${prevChapter.number}`}
                className="group flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">Previous</p>
                  <p className="font-medium">{prevChapter.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link
                href={`/books/${book.slug}/${nextChapter.number}`}
                className="group flex items-center gap-2 text-right text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">Next</p>
                  <p className="font-medium">{nextChapter.title}</p>
                </div>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ) : (
              <Link
                href={`/books/${book.slug}`}
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
              >
                Back to Book Overview
              </Link>
            )}
          </nav>
        </div>
      </main>
    </div>
  );
}
