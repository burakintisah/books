# Book Notes — Project Guide

## Project Overview

A visual, memory-friendly website for book notes. Each book has its own page with chapter-by-chapter navigation. Notes are color-coded by type (key insights, concepts, examples, tips, warnings, quotes) for quick visual scanning and memory recall.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
**Data Format:** JSON files in `data/books/`
**Deploy:** Vercel (auto-deploy from GitHub)

## Project Structure

```
├── data/books/              # Book JSON files (one per book)
├── public/
│   ├── covers/              # Book cover images (optional)
│   └── downloads/           # Downloadable PDFs/files
├── src/
│   ├── app/
│   │   ├── page.tsx                        # Homepage — book grid
│   │   ├── layout.tsx                      # Root layout with Navbar
│   │   ├── globals.css                     # Global styles + dark mode
│   │   └── books/
│   │       ├── [slug]/page.tsx             # Book overview + chapter list
│   │       └── [slug]/[chapterNum]/page.tsx # Chapter detail view
│   ├── components/
│   │   ├── Navbar.tsx            # Top nav bar
│   │   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   │   ├── BookCard.tsx          # Book card for homepage grid
│   │   ├── ChapterSidebar.tsx    # Desktop sidebar with chapter list
│   │   ├── MobileChapterNav.tsx  # Mobile chapter dropdown
│   │   └── NoteCard.tsx          # Visual note cards (all types)
│   ├── lib/
│   │   └── books.ts              # Data reading utilities
│   └── types/
│       └── book.ts               # TypeScript interfaces
```

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Build for production
- `npm run lint` — Run ESLint

## How to Add a New Book

### Step 1: Create the JSON file

Create a new file in `data/books/` with the book's slug as filename:

```
data/books/your-book-slug.json
```

### Step 2: Use this template

```json
{
  "slug": "your-book-slug",
  "title": "Book Title",
  "author": "Author Name",
  "coverColor": "#HEX_COLOR",
  "category": "Category Name",
  "tags": ["tag1", "tag2", "tag3"],
  "rating": 5,
  "readDate": "YYYY-MM-DD",
  "summary": "A 1-3 sentence overview of what this book is about.",
  "totalChapters": 1,
  "downloadFile": "/downloads/your-book-slug.pdf",
  "chapters": []
}
```

**Field reference:**

| Field          | Required | Description                                                |
|----------------|----------|------------------------------------------------------------|
| `slug`         | Yes      | URL-friendly identifier. Must match filename (without .json) |
| `title`        | Yes      | Full book title                                            |
| `author`       | Yes      | Author name                                                |
| `coverColor`   | Yes      | Hex color for the book card (e.g., `#3B82F6`)             |
| `category`     | Yes      | Category for grouping (e.g., "Self-Improvement", "Tech")  |
| `tags`         | Yes      | Array of keyword tags                                      |
| `rating`       | Yes      | 1-5 star rating                                            |
| `readDate`     | Yes      | When you read it (YYYY-MM-DD)                              |
| `summary`      | Yes      | Book overview, 1-3 sentences                               |
| `totalChapters`| Yes      | Total number of chapters (must match chapters array length)|
| `downloadFile` | No       | Path to downloadable file in `public/downloads/`           |
| `chapters`     | Yes      | Array of chapter objects (see below)                       |

### Step 3: Add chapters

Each chapter has this structure:

```json
{
  "number": 1,
  "title": "Chapter Title",
  "summary": "One-line summary for quick scanning.",
  "keyInsights": [
    { "text": "The main takeaway in one clear sentence." }
  ],
  "notes": [
    {
      "type": "concept",
      "title": "Note Title",
      "content": "Detailed explanation of the concept..."
    }
  ],
  "quotes": [
    { "text": "A memorable quote from the book.", "page": 42 }
  ]
}
```

### Note Types

Use these note types for visual differentiation:

| Type        | Color   | Use For                                              |
|-------------|---------|------------------------------------------------------|
| `concept`   | Blue    | Core ideas, frameworks, mental models                |
| `example`   | Green   | Real-world examples, case studies, stories           |
| `warning`   | Red     | Common mistakes, pitfalls, things to avoid           |
| `tip`       | Teal    | Actionable advice, practical techniques              |

Additionally, `keyInsights` (amber/gold) and `quotes` (purple) are separate arrays with their own visual styling.

### Step 4: Add downloadable files (optional)

Place PDF or other files in `public/downloads/` and set the `downloadFile` field:

```json
"downloadFile": "/downloads/your-book-slug.pdf"
```

### Step 5: Verify

Run `npm run build` to make sure the new book compiles correctly. The build output will show your new book's routes.

## How to Add a New Chapter to an Existing Book

1. Open the book's JSON file in `data/books/`
2. Add a new chapter object to the `chapters` array
3. Update the `totalChapters` field to match
4. Run `npm run build` to verify

## Tips for Writing Good Notes

- **Key Insights**: Write them as standalone sentences that make sense without context. These are what you'll scan first when refreshing your memory.
- **Concepts**: Explain the core idea in your own words. Include the "why" not just the "what."
- **Examples**: Pick the most memorable example from each chapter. Concrete stories stick better than abstract ideas.
- **Warnings**: Note common mistakes or misconceptions the author warns about.
- **Tips**: Extract actionable, practical techniques you can apply immediately.
- **Quotes**: Pick quotes that crystallize the chapter's message in a memorable way.

## Color Palette for coverColor

Some suggested hex colors for book cards:

- Amber: `#F59E0B`
- Blue: `#3B82F6`
- Green: `#10B981`
- Red: `#EF4444`
- Purple: `#8B5CF6`
- Pink: `#EC4899`
- Teal: `#14B8A6`
- Orange: `#F97316`
- Indigo: `#6366F1`
- Slate: `#64748B`
