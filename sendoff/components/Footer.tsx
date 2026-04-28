export default function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-50 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Top section */}
        <div className="text-center mb-8">
          <span className="text-lavender-400 text-sm animate-sparkle inline-block">✦</span>
          <h3 className="font-display text-2xl text-white mt-2 mb-1">
            Aileen Owango
          </h3>
          <p className="font-body font-thin text-sm text-warm-200 tracking-wider">
            November 25, 1995 — March 19, 2026
          </p>
        </div>

        <div className="w-full h-px bg-warm-300/20 mb-8" />

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center mb-8">
          {/* Event */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-warm-300 mb-2 font-body">
              Ceremony
            </p>
            <p className="text-sm text-warm-50 font-body">All Saints Cathedral</p>
            <p className="text-sm text-warm-50 font-body">31st March, 2026 · 5:00 PM</p>
          </div>

          {/* Goal (historical) */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-warm-300 mb-2 font-body">
              Fundraising Goal
            </p>
            <p className="text-lg font-bold text-lavender-400 font-body">
              KES 1,500,000
            </p>
            <p className="text-sm text-warm-300 font-body">Every shilling counts</p>
          </div>
        </div>

        <div className="w-full h-px bg-warm-300/20 mb-6" />

        {/* Dedication */}
        <div className="text-center">
          <p className="font-body text-sm text-warm-300 leading-relaxed max-w-md mx-auto mb-4 italic">
            &ldquo;Remembering her warmth, her laughter, and the light she
            brought into all our lives.&rdquo;
          </p>
          <p className="text-xs text-warm-300/60 font-body">
            Made with love by family & friends
          </p>
        </div>
      </div>
    </footer>
  );
}
