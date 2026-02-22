export type NoteType = "concept" | "example" | "warning" | "tip";

export interface Note {
  type: NoteType;
  title: string;
  content: string;
}

export interface KeyInsight {
  text: string;
}

export interface Quote {
  text: string;
  page?: number;
}

export interface Chapter {
  number: number;
  title: string;
  summary: string;
  keyInsights: KeyInsight[];
  notes: Note[];
  quotes: Quote[];
}

export interface Poem {
  number: number;
  title: string;
  content: string;
  story?: string;
  commentary?: string;
}

export interface Book {
  slug: string;
  title: string;
  author: string;
  coverColor: string;
  coverImage?: string;
  category: string;
  tags: string[];
  rating: number;
  readDate: string;
  summary: string;
  totalChapters: number;
  downloadFile?: string;
  type?: "book" | "poetry";
  chapters: Chapter[];
  poems?: Poem[];
}
