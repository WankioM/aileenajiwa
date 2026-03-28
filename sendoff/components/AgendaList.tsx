'use client';

import { useState } from 'react';

interface EventItem {
  id: string;
  date: string;
  day: string;
  title: string;
  venue: string;
  time: string;
  details?: string;
  link?: { url: string; label: string };
  dressCode?: string;
  orderOfService?: { time: string; item: string; by?: string }[];
}

const EVENTS: EventItem[] = [
  {
    id: 'fundraising',
    date: 'March 31, 2026',
    day: 'Tuesday',
    title: 'Fundraising',
    venue: 'All Saints Cathedral, Nairobi',
    time: '5:00 PM',
    details:
      'Join us as we come together to raise funds in support of Aileen\'s send-off. Every contribution counts — M-Pesa contributions can be sent to Yvonne Maya at +254 729 799 512.',
  },
  {
    id: 'vigil',
    date: 'March 31, 2026',
    day: 'Tuesday',
    title: 'Femnet Hybrid Vigil',
    venue: 'Femnet Office — Next to Forest Plaza, off Kolobot Road, Parklands',
    time: 'Evening',
    details:
      'A hybrid vigil hosted by Femnet to honour Aileen\'s life and legacy. Join in person or online.',
    link: { url: 'https://bit.ly/4uTg9dh', label: 'Join Online' },
  },
  {
    id: 'thanksgiving',
    date: 'April 1, 2026',
    day: 'Wednesday',
    title: 'Thanksgiving Service',
    venue: 'AIC Milimani, Nairobi',
    time: '10:00 AM',
    dressCode: 'Navy blue with a touch of purple',
    orderOfService: [
      { time: '10:00 AM', item: 'Opening Prayer', by: 'Brenda Onim' },
      { time: '10:30 AM', item: 'Scripture Reading — Psalm 27:1 & Proverbs 31:8–9', by: 'Keene Obie' },
      { time: '', item: 'Reading of Life', by: 'Ossi Karpetro (Brother)' },
      { time: '11:30 AM', item: 'Tributes', by: 'Cousins — Maya · Friends — Muthoki Nzioki & Gad Ojung\'a · Brother — Timmy · Father — Ted Owango' },
      { time: '11:30 AM', item: 'Message of Comfort', by: 'Pastor (TBA)' },
      { time: '12:00 PM', item: 'Vote of Thanks', by: 'Sally Owango' },
    ],
  },
  {
    id: 'burial',
    date: 'April 3, 2026',
    day: 'Thursday',
    title: 'Burial & Final Send-Off',
    venue: 'Nyakach',
    time: 'Morning',
    details:
      'Aileen will be laid to rest in Nyakach, her ancestral home. We invite family and friends to join us as we say our final goodbye.',
  },
];

export default function AgendaList() {
  const [expandedId, setExpandedId] = useState<string | null>('fundraising');

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      {/* Heading */}
      <h2 className="font-display text-4xl sm:text-5xl text-center text-warm-900 mb-3">
        Schedule of Events
      </h2>
      <div className="w-16 h-[3px] bg-lavender-400 mx-auto mb-4 rounded-full" />
      <p className="text-center text-warm-300 max-w-md mx-auto mb-12 leading-relaxed">
        A gathering to celebrate Aileen&rsquo;s life, give thanks, and support the family.
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-lavender-200" />

        <div className="space-y-8">
          {EVENTS.map((event) => {
            const isOpen = expandedId === event.id;

            return (
              <div key={event.id} className="relative pl-12 sm:pl-16">
                {/* Dot */}
                <div
                  className={`absolute left-2.5 sm:left-4.5 top-1 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                    isOpen
                      ? 'bg-lavender-400 border-lavender-400'
                      : 'bg-white border-lavender-200'
                  }`}
                />

                {/* Card */}
                <button
                  onClick={() => toggle(event.id)}
                  className="w-full text-left group"
                >
                  {/* Date badge */}
                  <span className="inline-block text-xs font-body font-bold tracking-wider uppercase text-lavender-600 mb-1">
                    {event.day}, {event.date}
                  </span>

                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? 'bg-white border-lavender-200 shadow-lg'
                        : 'bg-white/60 border-warm-200 hover:border-lavender-200 hover:shadow-md'
                    }`}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl text-warm-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-warm-300 mt-1">
                          {event.venue} · {event.time}
                        </p>
                      </div>

                      {/* Chevron */}
                      <svg
                        className={`w-5 h-5 text-lavender-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="px-5 pb-5 animate-fade-up">
                        <div className="border-t border-warm-100 pt-4">
                          {event.details && (
                            <p className="text-warm-900/80 leading-relaxed mb-4">
                              {event.details}
                            </p>
                          )}

                          {event.dressCode && (
                            <div className="flex items-start gap-2 mb-4 bg-lavender-100/50 rounded-lg px-4 py-3">
                              <span className="text-lavender-600 mt-0.5">👗</span>
                              <p className="text-sm text-warm-900">
                                <span className="font-bold">Dress Code:</span>{' '}
                                {event.dressCode}
                              </p>
                            </div>
                          )}

                          {event.link && (
                            <a
                              href={event.link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-lavender-400 hover:bg-lavender-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200 mb-4"
                            >
                              {event.link.label}
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          )}

                          {/* Order of Service */}
                          {event.orderOfService && (
                            <div className="mt-2">
                              <h4 className="font-display text-lg text-lavender-600 mb-3">
                                Order of Service
                              </h4>
                              <div className="space-y-3">
                                {event.orderOfService.map((item, idx) => (
                                  <div key={idx} className="flex gap-3">
                                    <span className="text-xs font-bold text-lavender-400 w-20 shrink-0 pt-0.5">
                                      {item.time || '—'}
                                    </span>
                                    <div>
                                      <p className="text-sm font-bold text-warm-900">{item.item}</p>
                                      {item.by && (
                                        <p className="text-xs text-warm-300 mt-0.5">{item.by}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <a
                                href="/service"
                                className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-lavender-400 hover:text-lavender-600 transition-colors"
                              >
                                View Full Order of Service &amp; Hymns
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}