import { Note, KeyInsight, Quote } from "@/types/book";

const noteStyles: Record<
  string,
  { bg: string; border: string; icon: string; label: string; iconColor: string }
> = {
  concept: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-400 dark:border-blue-500",
    icon: "📘",
    label: "CONCEPT",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  example: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-400 dark:border-emerald-500",
    icon: "✅",
    label: "EXAMPLE",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-400 dark:border-red-500",
    icon: "⚠️",
    label: "WARNING",
    iconColor: "text-red-600 dark:text-red-400",
  },
  tip: {
    bg: "bg-teal-50 dark:bg-teal-950/40",
    border: "border-teal-400 dark:border-teal-500",
    icon: "⭐",
    label: "TIP",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
};

export function NoteCardItem({ note }: { note: Note }) {
  const style = noteStyles[note.type];
  return (
    <div className={`rounded-lg border-l-4 ${style.border} ${style.bg} p-5`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">{style.icon}</span>
        <span className={`text-xs font-bold tracking-wider ${style.iconColor}`}>
          {style.label}
        </span>
      </div>
      <h4 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">{note.title}</h4>
      <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{note.content}</p>
    </div>
  );
}

export function KeyInsightCard({ insight }: { insight: KeyInsight }) {
  return (
    <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-5 dark:border-amber-500 dark:bg-amber-950/40">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">💡</span>
        <span className="text-xs font-bold tracking-wider text-amber-600 dark:text-amber-400">
          KEY INSIGHT
        </span>
      </div>
      <p className="font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
        {insight.text}
      </p>
    </div>
  );
}

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="rounded-lg border-l-4 border-purple-400 bg-purple-50 p-5 dark:border-purple-500 dark:bg-purple-950/40">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">💬</span>
        <span className="text-xs font-bold tracking-wider text-purple-600 dark:text-purple-400">
          QUOTE
        </span>
      </div>
      <blockquote className="text-lg font-medium italic leading-relaxed text-zinc-800 dark:text-zinc-200">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      {quote.page && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">— Page {quote.page}</p>
      )}
    </div>
  );
}
