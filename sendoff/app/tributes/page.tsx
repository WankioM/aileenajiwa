"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TributeForm from "@/components/TributeForm";
import TributeCard from "@/components/TributeCard";
import Footer from "@/components/Footer";
import type { Tribute } from "@/components/TributeCard";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TributesPage() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTributes = async () => {
    try {
      const res = await fetch(`${API}/api/tributes`);
      if (res.ok) {
        const data = await res.json();
        setTributes(data);
      }
    } catch {
      console.error("Failed to load tributes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTributes();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section className="max-w-3xl mx-auto px-4 py-16">
          {/* Heading */}
          <h2 className="font-display text-4xl sm:text-5xl text-center text-warm-900 mb-3">
            Tributes for Aileen
          </h2>
          <div className="w-16 h-[3px] bg-lavender-400 mx-auto mb-4 rounded-full" />
          <p className="text-center text-warm-300 max-w-md mx-auto mb-12 leading-relaxed">
            A space to share memories, kind words, and love for Aileen. Your words mean the world to the family.
          </p>

          {/* Form */}
          <div className="mb-16">
            <TributeForm onSubmitted={fetchTributes} />
          </div>

          {/* Tributes list */}
          <div>
            <h3 className="font-display text-2xl text-warm-900 mb-6 text-center">
              Words from Loved Ones
            </h3>

            {loading ? (
              <p className="text-center text-warm-300 text-sm">Loading tributes...</p>
            ) : tributes.length === 0 ? (
              <p className="text-center text-warm-300 text-sm italic">
                No tributes yet. Be the first to share your words.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {tributes.map((t) => (
                  <TributeCard key={t._id} tribute={t} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}