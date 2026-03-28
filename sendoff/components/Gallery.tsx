"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1-2dbd04gWS2DpCFUe4cy-syY0-IzEiXo";

const photos = [
  { src: "/images/aileen1.jpg", alt: "Aileen Owango" },
  { src: "/images/aileen2.jpg", alt: "Aileen Owango" },
  // add more as you get them
];

export default function Gallery() {
  const [current, setCurrent] = useState<number | null>(null); // null = grid view
  const [playing, setPlaying] = useState(true);

  const next = useCallback(
    () => setCurrent((c) => ((c ?? 0) + 1) % photos.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => ((c ?? 0) - 1 + photos.length) % photos.length),
    []
  );

  // Auto-advance slideshow
  useEffect(() => {
    if (current === null || !playing) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [current, playing, next]);

  // Keyboard nav
  useEffect(() => {
    if (current === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setCurrent(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, next, prev]);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="font-display text-4xl text-center text-warm-900 mb-2">
        Gallery
      </h2>
      <div className="w-14 h-[3px] bg-lavender-400 rounded mx-auto mb-4" />
      <p className="text-center text-warm-300 text-sm max-w-md mx-auto mb-10 leading-relaxed">
        Photos and memories of Aileen shared by family and friends.
      </p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setCurrent(i)}
            className="relative aspect-[3/4] overflow-hidden border border-warm-200 group cursor-pointer bg-warm-900"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 45vw, 30vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-warm-900/0 group-hover:bg-warm-900/20 transition-colors" />
          </button>
        ))}

        {/* "Add photos" card */}
        <a
          href={DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-[3/4] border-2 border-dashed border-lavender-400 rounded-lg
            flex flex-col items-center justify-center gap-3 text-lavender-400
            hover:bg-lavender-100/50 transition-colors cursor-pointer"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="text-sm font-bold uppercase tracking-wider font-body">
            Add Photos
          </span>
        </a>
      </div>

      {/* Google Drive CTA */}
      <div className="border border-warm-200 rounded-xl bg-white p-8 text-center max-w-lg mx-auto">
        <div className="text-lavender-400 mb-3">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mx-auto"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h3 className="font-display text-xl text-warm-900 mb-1">
          Aileen&apos;s Photo Collection
        </h3>
        <p className="text-sm text-warm-300 mb-5 leading-relaxed">
          View all shared photos or upload your own memories to be part of the
          ceremony slideshow.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-lavender-400 text-white rounded-lg font-body font-bold text-sm
              uppercase tracking-wider hover:bg-lavender-200 transition-colors"
          >
            Open Google Drive
          </a>
          <a
            href={DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-lavender-400 text-lavender-400 rounded-lg font-body
              font-bold text-sm uppercase tracking-wider hover:bg-lavender-100 transition-colors"
          >
            + Upload Photos
          </a>
        </div>
      </div>

      {/* Lightbox / Slideshow */}
      {current !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setCurrent(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full aspect-[3/4] max-h-[75vh]">
              <Image
                src={photos[current].src}
                alt={photos[current].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            {/* Controls */}
            <button
              onClick={() => setCurrent(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-lavender-200 transition-colors"
            >
              ✕
            </button>

            {photos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                    bg-warm-900/50 text-white text-xl flex items-center justify-center
                    hover:bg-lavender-400/70 transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                    bg-warm-900/50 text-white text-xl flex items-center justify-center
                    hover:bg-lavender-400/70 transition-colors"
                >
                  ›
                </button>
              </>
            )}

            {/* Dots + play/pause */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full border border-white/60 transition-all
                    ${i === current ? "bg-lavender-400 scale-125" : "bg-transparent hover:bg-white/30"}`}
                />
              ))}
              <button
                onClick={() => setPlaying(!playing)}
                className="ml-2 text-white/60 text-xs hover:text-white transition-colors"
              >
                {playing ? "⏸" : "▶"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}