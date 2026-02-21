"use client";

import { useState, useMemo } from "react";
import { Book } from "@/types/book";
import { BookCard } from "./BookCard";
import { BookListCard } from "./BookListCard";

type ViewMode = "grid" | "list";

export function BookGridToggle({
  books,
  categories,
}: {
  books: Book[];
  categories: string[];
}) {
  const [view, setView] = useState<ViewMode>("grid");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredBooks = useMemo(() => {
    if (!activeCategory) return books;
    return books.filter((book) => book.category === activeCategory);
  }, [books, activeCategory]);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const book of books) {
      counts[book.category] = (counts[book.category] || 0) + 1;
    }
    return counts;
  }, [books]);

  return (
    <>
      {/* Category filters + view toggle */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          All ({books.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {cat} ({categoryCount[cat]})
          </button>
        ))}

        {/* Spacer */}
        <div className="ml-auto" />

        {/* View toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setView("grid")}
            className={`rounded-lg p-2 transition-colors ${
              view === "grid"
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
                : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            }`}
            aria-label="Grid view"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </button>
          <button
            onClick={() => setView("list")}
            className={`rounded-lg p-2 transition-colors ${
              view === "list"
                ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
                : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            }`}
            aria-label="List view"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Book views */}
      {view === "grid" ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredBooks.map((book) => (
            <BookListCard key={book.slug} book={book} />
          ))}
        </div>
      )}

      {/* Empty filtered state */}
      {filteredBooks.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            No books in this category yet.
          </p>
        </div>
      )}
    </>
  );
}
