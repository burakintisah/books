import { Poem } from "@/types/book";

export function PoemDisplay({ poem }: { poem: Poem }) {
  // Split poem content into stanzas (separated by blank lines)
  const stanzas = poem.content.split("\n\n");

  return (
    <div>
      {/* Poem */}
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50/50 px-8 py-10 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950/50 sm:px-12 sm:py-12">
          <div className="flex flex-col items-center">
            {stanzas.map((stanza, i) => (
              <div key={i} className={i > 0 ? "mt-6" : ""}>
                {stanza.split("\n").map((line, j) => (
                  <p
                    key={j}
                    className="text-center text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 sm:text-xl sm:leading-loose"
                    style={{ fontStyle: "italic" }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      {poem.story && (
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-6 dark:border-amber-500 dark:bg-amber-950/30">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              Hikaye
            </h3>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {poem.story}
            </p>
          </div>
        </div>
      )}

      {/* Commentary */}
      {poem.commentary && (
        <div className="mx-auto mt-6 max-w-2xl">
          <div className="rounded-xl border-l-4 border-indigo-400 bg-indigo-50/50 p-6 dark:border-indigo-500 dark:bg-indigo-950/30">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
              Yorum
            </h3>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {poem.commentary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
