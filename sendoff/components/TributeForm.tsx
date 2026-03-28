"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface TributeFormProps {
  onSubmitted?: () => void;
}

export default function TributeForm({ onSubmitted }: TributeFormProps) {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const maxChars = 1000;

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/tributes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          relationship: relationship.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setName("");
      setRelationship("");
      setMessage("");
      setDone(true);
      onSubmitted?.();
      setTimeout(() => setDone(false), 3000);
    } catch {
      setError("Could not submit. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white border border-warm-200 rounded-xl p-6 max-w-lg mx-auto">
      <h3 className="font-display text-xl text-warm-900 mb-1">
        Share Your Words for Aileen
      </h3>
      <p className="text-sm text-warm-300 mb-5 leading-relaxed">
        Leave a tribute, a memory, or words of comfort for the family.
      </p>

      <div className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest text-warm-300 font-bold font-body">
            Your Name
          </label>
          <input
            type="text"
            placeholder="e.g. Reuben Odhis"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="font-body text-base px-4 py-3 border border-warm-200 rounded-lg bg-warm-50 text-warm-900
              outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-400/30 transition-all
              placeholder:text-warm-300"
          />
        </div>

        {/* Relationship */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest text-warm-300 font-bold font-body">
            Relationship <span className="normal-case tracking-normal text-warm-200">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Cousin, Friend, Colleague"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            maxLength={50}
            className="font-body text-base px-4 py-3 border border-warm-200 rounded-lg bg-warm-50 text-warm-900
              outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-400/30 transition-all
              placeholder:text-warm-300"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-xs uppercase tracking-widest text-warm-300 font-bold font-body">
            Your Message
          </label>
          <textarea
            placeholder="Share a memory, a kind word, or a tribute for Aileen..."
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
            rows={5}
            className="font-body text-base px-4 py-3 border border-warm-200 rounded-lg bg-warm-50 text-warm-900
              outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-400/30 transition-all
              placeholder:text-warm-300 resize-y min-h-[120px] leading-relaxed"
          />
          <span className="text-xs text-warm-300 text-right">
            {message.length}/{maxChars}
          </span>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || !message.trim() || sending}
          className="bg-lavender-400 text-white py-3 rounded-lg font-body font-bold text-sm uppercase tracking-wider
            hover:bg-lavender-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Submitting..." : "Submit Tribute"}
        </button>

        {/* Success */}
        {done && (
          <p className="text-center text-sm text-lavender-400 font-bold animate-fade-up">
            ✦ Thank you. Your tribute has been added.
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}