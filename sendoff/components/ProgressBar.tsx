"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  raised?: number;
  goal?: number;
}

export default function ProgressBar({
  raised = 0,
  goal = 1200000,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const pct = Math.min((raised / goal) * 100, 100);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);

  const fmt = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Amounts */}
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-display text-2xl text-lavender-400">
          {fmt(raised)}
        </span>
        <span className="text-sm text-warm-300">of {fmt(goal)}</span>
      </div>

      {/* Track */}
      <div className="w-full h-4 bg-warm-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-lavender-400 to-lavender-200 rounded-full transition-all duration-1000 ease-out flex items-center justify-end"
          style={{ width: `${width}%` }}
        >
          {width > 10 && (
            <span className="text-[10px] font-bold text-white pr-2">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-warm-300 uppercase tracking-wider">
          {Math.round(pct)}% reached
        </span>
        <span className="text-xs text-lavender-400 font-bold">
          {raised >= goal ? "🎉 Goal reached!" : `${fmt(goal - raised)} to go`}
        </span>
      </div>
    </div>
  );
}
