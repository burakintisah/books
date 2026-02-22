"use client";

import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";

interface ChapterSidebarProps {
  book: Book;
  activeChapter: number;
}

export function ChapterSidebar({ book, activeChapter }: ChapterSidebarProps) {
  const isPoetry = book.type === "poetry" && book.poems;
  const items = isPoetry
    ? book.poems!.map((p) => ({ number: p.number, title: p.title }))
    : book.chapters.map((c) => ({ number: c.number, title: c.title }));

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-72 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white p-6 lg:block dark:border-zinc-800 dark:bg-zinc-950">
      {/* Book info */}
      <Link href={`/books/${book.slug}`} className="mb-6 block">
        <div
          className="mb-4 flex h-24 w-full items-center justify-center rounded-lg"
          style={{ backgroundColor: book.coverColor + "20" }}
        >
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              width={48}
              height={64}
              className="h-16 w-auto rounded shadow-sm object-cover"
            />
          ) : (
            <div
              className="flex h-16 w-12 items-center justify-center rounded shadow-sm"
              style={{ backgroundColor: book.coverColor }}
            >
              <span className="px-1 text-center text-[8px] font-bold leading-tight text-white">
                {book.title}
              </span>
            </div>
          )}
        </div>
        <h2 className="font-bold text-zinc-900 dark:text-zinc-100">{book.title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{book.author}</p>
      </Link>

      {/* Chapter/Poem list */}
      <div className="mb-4">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {isPoetry ? "Şiirler" : "Chapters"}
        </h3>
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = item.number === activeChapter;
            return (
              <Link
                key={item.number}
                href={`/books/${book.slug}/${item.number}`}
                className={`rounded-lg px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? isPoetry
                      ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400"
                      : "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                      isActive
                        ? isPoetry
                          ? "bg-indigo-600 font-bold text-white"
                          : "bg-blue-600 font-bold text-white"
                        : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                    }`}
                  >
                    {item.number}
                  </span>
                  <span className="truncate">{item.title}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Download */}
      {book.downloadFile && (
        <a
          href={book.downloadFile}
          download
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download PDF
        </a>
      )}
    </aside>
  );
}
