"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* General Drive — anyone can upload */
const UPLOAD_DRIVE_URL =
  "https://drive.google.com/drive/u/3/folders/1otJ9moan1I0UKiGVfqOgfW5iKSo9E87N";

/* FEMNet tribute gallery — view only */
const FEMNET_DRIVE_URL =
  "https://drive.google.com/drive/folders/1-2dbd04gWS2DpCFUe4cy-syY0-IzEiXo";

const photos = [
  { src: "/images/aileen1.jpg", alt: "Aileen Owango" },
  { src: "/images/aileen2.jpg", alt: "Aileen Owango" },
  { src: "/images/aileen3.jpg", alt: "Aileen Owango" },
  { src: "/images/aileen4.jpeg", alt: "Aileen Owango" },
  { src: "/images/aileen5.jpeg", alt: "Aileen Owango" },
  { src: "/images/aileen6.jpeg", alt: "Aileen Owango" },
  { src: "/images/aileen7.jpeg", alt: "Aileen Owango" },
  { src: "/images/aileen8.jpeg", alt: "Aileen Owango" },
  { src: "/images/aileen9.jpeg", alt: "Aileen Owango" },
  { src: "/images/aileen10.jpeg", alt: "Aileen Owango" },
];

export default function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);

  const next = useCallback(
    () => setCurrent((c) => ((c ?? 0) + 1) % photos.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => ((c ?? 0) - 1 + photos.length) % photos.length),
    []
  );

  useEffect(() => {
    if (current === null || !playing) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [current, playing, next]);

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

      {/* Upload + FEMNet buttons — before the grid */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        <a
          href={UPLOAD_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-lavender-400 text-white
            rounded-lg font-body font-bold text-sm uppercase tracking-wider
            hover:bg-lavender-500 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Your Photos
        </a>
        <a
          href={FEMNET_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-lavender-400
            text-lavender-400 rounded-lg font-body font-bold text-sm uppercase tracking-wider
            hover:bg-lavender-100 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          FEMNet Gallery
        </a>
      </div>

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
            <div className="relative w-full aspect-[3/4] max-h-[75vh]">
              <Image
                src={photos[current].src}
                alt={photos[current].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

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