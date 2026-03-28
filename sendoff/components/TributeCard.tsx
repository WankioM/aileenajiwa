export interface Tribute {
  _id: string;
  name: string;
  relationship?: string;
  message: string;
  createdAt: string;
}

export default function TributeCard({ tribute }: { tribute: Tribute }) {
  const initials = tribute.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const date = new Date(tribute.createdAt).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="bg-white border border-warm-200 rounded-xl p-5 relative hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-lavender-100 text-lavender-400 flex items-center justify-center font-body font-bold text-sm shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-body font-bold text-warm-900 text-sm">
            {tribute.name}
          </p>
          {tribute.relationship && (
            <p className="font-body text-xs text-lavender-400">{tribute.relationship}</p>
          )}
          <p className="font-body text-xs text-warm-300">{date}</p>
        </div>
      </div>
      <blockquote className="font-body text-warm-300 text-sm leading-relaxed italic">
        &ldquo;{tribute.message}&rdquo;
      </blockquote>
      <span className="absolute bottom-3 right-4 text-lavender-200 text-xs opacity-50">
        ✦
      </span>
    </article>
  );
}