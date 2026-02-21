import fs from "fs";
import path from "path";
import { Book } from "@/types/book";

const dataDirectory = path.join(process.cwd(), "data/books");

export function getAllBooks(): Book[] {
  const fileNames = fs.readdirSync(dataDirectory);
  const books = fileNames
    .filter((f) => f.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(dataDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as Book;
    });

  return books.sort(
    (a, b) => new Date(b.readDate).getTime() - new Date(a.readDate).getTime()
  );
}

export function getBookBySlug(slug: string): Book | undefined {
  const books = getAllBooks();
  return books.find((book) => book.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllBooks().map((book) => book.slug);
}

export function getCategories(): string[] {
  const books = getAllBooks();
  const categories = new Set(books.map((b) => b.category));
  return Array.from(categories).sort();
}
