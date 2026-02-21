import { getAllBooks, getCategories } from "@/lib/books";
import { BookGridToggle } from "@/components/BookGridToggle";

export default function HomePage() {
  const books = getAllBooks();
  const categories = getCategories();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Book Notes
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          Visual, chapter-by-chapter notes for quick reference and memory refresh.
        </p>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
          All ({books.length})
        </span>
        {categories.map((cat) => (
          <span
            key={cat}
            className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Books */}
      <BookGridToggle books={books} />

      {/* Empty state */}
      {books.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-lg text-zinc-500 dark:text-zinc-500">
            No books yet. Add your first book JSON to <code>data/books/</code>
          </p>
        </div>
      )}
    </main>
  );
}
