"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/agenda", label: "Agenda" },
  { href: "/tributes", label: "Tributes" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-warm-100/90 backdrop-blur-md border-b border-warm-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lavender-400 text-sm animate-sparkle">✦</span>
          <span className="font-display text-xl text-warm-900">
            Aileen Owango
          </span>
          <span className="text-lavender-400 text-sm animate-sparkle delay-500">
            ✦
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`px-4 py-2 rounded-md text-sm uppercase tracking-wider transition-colors
                  ${
                    pathname === l.href
                      ? "text-lavender-400 bg-lavender-100 font-bold"
                      : "text-warm-300 hover:text-lavender-400 hover:bg-lavender-100/50"
                  }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-warm-900 rounded transition-transform ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-warm-900 rounded transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-warm-900 rounded transition-transform ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden border-t border-warm-200 px-6 pb-4 flex flex-col gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base uppercase tracking-wider transition-colors
                  ${
                    pathname === l.href
                      ? "text-lavender-400 bg-lavender-100 font-bold"
                      : "text-warm-300 hover:bg-lavender-100/50"
                  }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
