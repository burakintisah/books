"use client";

import { useState } from "react";
import Link from "next/link";
import { Book } from "@/types/book";

interface MobileChapterNavProps {
  book: Book;
  activeChapter: number;
}

export function MobileChapterNav({ book, activeChapter }: MobileChapterNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const current = book.chapters.find((c) => c.number === activeChapter);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 text-left dark:border-zinc-700 dark:bg-zinc-900"
      >
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Chapter {activeChapter} of {book.totalChapters}
          </p>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">
            {current?.title}
          </p>
        </div>
        <svg
          className={`h-5 w-5 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-900">
          {book.chapters.map((chapter) => {
            const isActive = chapter.number === activeChapter;
            return (
              <Link
                key={chapter.number}
                href={`/books/${book.slug}/${chapter.number}`}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive
                    ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                    : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                    isActive
                      ? "bg-blue-600 font-bold text-white"
                      : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}
                >
                  {chapter.number}
                </span>
                {chapter.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
