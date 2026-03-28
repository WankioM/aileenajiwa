"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const EVENT = new Date("2026-03-31T17:00:00+03:00");

function getTimeLeft() {
  const d = EVENT.getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export default function HeroSection() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isPast = EVENT.getTime() <= Date.now();
  const units = [
    { v: time.days, l: "Days" },
    { v: time.hours, l: "Hours" },
    { v: time.minutes, l: "Min" },
    { v: time.seconds, l: "Sec" },
  ];

  return (
    <section className="relative text-center max-w-3xl mx-auto px-6 py-16 overflow-hidden">
      {/* Sparkles */}
      <span className="absolute top-8 left-[8%] text-lavender-400 text-3xl animate-sparkle">✦</span>
      <span className="absolute top-12 right-[8%] text-lavender-200 text-2xl animate-sparkle delay-700">✦</span>
      <span className="absolute bottom-32 left-[5%] text-lavender-200 text-xl animate-sparkle delay-1000">✦</span>
      <span className="absolute bottom-40 right-[5%] text-lavender-400 text-lg animate-sparkle delay-300">✦</span>

      <p className="text-xs uppercase tracking-[0.2em] text-warm-300 mb-2 font-body">
        Forever In Our Hearts
      </p>

      <h1 className="font-display text-6xl md:text-7xl text-warm-900 mb-1 leading-tight">
        Aileen Owango
      </h1>

      <p className="font-body font-thin text-base text-warm-300 tracking-wider mb-10">
        November 25, 1995 — March 19, 2026
      </p>

      {/* Photo */}
      <div className="flex justify-center mb-10">
        <div className="border-2 border-warm-900 bg-white p-1">
          <Image
            src="/images/aileen1.jpg"
            alt="Aileen Owango"
            width={280}
            height={350}
            className="block w-[260px] h-[340px] md:w-[280px] md:h-[360px] object-cover object-top"
            priority
          />
        </div>
      </div>

      <p className="font-body text-warm-300 leading-relaxed max-w-lg mx-auto mb-8">
        We are fundraising to support the funeral and final send-off of our
        beloved Aileen Ajiwa. Please join us as we come together to honor and
        celebrate her life, remembering her warmth, her laughter, and the light
        she brought into all our lives.
      </p>

      <div className="w-full h-px bg-warm-900 mb-8" />

      {/* Event details */}
      <div className="flex justify-center gap-8 md:gap-12 flex-wrap mb-8">
        {[
          { label: "Venue", value: "All Saints Cathedral" },
          { label: "Date", value: "31st March, 2026" },
          { label: "Time", value: "5:00 P.M." },
        ].map((d) => (
          <div key={d.label} className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.15em] text-warm-300 font-body">
              {d.label}
            </span>
            <span className="font-display text-lg text-warm-900">{d.value}</span>
          </div>
        ))}
      </div>

      {/* Countdown */}
      {!isPast ? (
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-warm-300 font-body mb-4">
            Ceremony begins in
          </p>
          <div className="flex justify-center gap-4 md:gap-6">
            {units.map((u) => (
              <div key={u.l} className="flex flex-col items-center min-w-[60px]">
                <span className="font-display text-3xl md:text-4xl text-lavender-400 tabular-nums leading-none">
                  {String(u.v).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-wider text-warm-300 mt-1 font-body">
                  {u.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-warm-300 italic">
          The ceremony has taken place. Thank you for your love and support.
        </p>
      )}
    </section>
  );
}
