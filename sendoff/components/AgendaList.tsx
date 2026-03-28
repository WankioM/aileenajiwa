"use client";

import ProgressBar from "./ProgressBar";

export interface ContributionItem {
  id: string;
  item: string;
  description: string;
  target: number;
  raised: number;
}

const DEFAULT_ITEMS: ContributionItem[] = [
  { id: "1", item: "Casket & Burial", description: "Casket, burial site, and cemetery fees", target: 350000, raised: 0 },
  { id: "2", item: "Venue & Ceremony", description: "All Saints Cathedral hire, decor, and setup", target: 150000, raised: 0 },
  { id: "3", item: "Transport & Logistics", description: "Hearse, family transport, coordination", target: 200000, raised: 0 },
  { id: "4", item: "Catering", description: "Food and refreshments for the reception", target: 250000, raised: 0 },
  { id: "5", item: "Flowers & Tributes", description: "Floral arrangements and memorial programs", target: 100000, raised: 0 },
  { id: "6", item: "Miscellaneous", description: "Photography, sound, printing, and other costs", target: 150000, raised: 0 },
];

interface AgendaListProps {
  items?: ContributionItem[];
}

export default function AgendaList({ items = DEFAULT_ITEMS }: AgendaListProps) {
  const totalTarget = items.reduce((s, i) => s + i.target, 0);
  const totalRaised = items.reduce((s, i) => s + i.raised, 0);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="font-display text-4xl text-center text-warm-900 mb-2">
        Contributions & Agenda
      </h2>
      <div className="w-14 h-[3px] bg-lavender-400 rounded mx-auto mb-4" />
      <p className="text-center text-warm-300 text-sm max-w-md mx-auto mb-10 leading-relaxed">
        Every contribution, big or small, helps us give Aileen the send-off she
        deserves.
      </p>

      {/* Overall progress */}
      <div className="mb-12">
        <ProgressBar raised={totalRaised} goal={totalTarget} />
      </div>

      {/* Contribution items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {items.map((item) => {
          const pct = item.target > 0 ? Math.min((item.raised / item.target) * 100, 100) : 0;
          return (
            <div
              key={item.id}
              className="bg-white border border-warm-200 rounded-xl p-5 flex flex-col gap-3
                hover:shadow-md hover:border-lavender-400 transition-all"
            >
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-display text-lg text-warm-900">
                  {item.item}
                </h3>
                <span className="text-xs font-bold text-lavender-400 bg-lavender-100 px-2 py-0.5 rounded whitespace-nowrap">
                  KES {item.target.toLocaleString("en-KE")}
                </span>
              </div>
              <p className="text-sm text-warm-300 leading-relaxed">
                {item.description}
              </p>

              {/* Mini progress */}
              <div className="mt-auto">
                <div className="w-full h-1.5 bg-warm-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-lavender-400 to-lavender-200 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-warm-300 mt-1 block">
                  KES {item.raised.toLocaleString("en-KE")} raised
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* M-Pesa CTA */}
      <div className="bg-white border-2 border-dashed border-mpesa rounded-xl p-8 text-center max-w-lg mx-auto">
        <div className="inline-block bg-mpesa text-white font-body font-bold text-sm px-4 py-1.5 rounded mb-4 tracking-wider">
          M-PESA
        </div>
        <h3 className="font-display text-xl text-warm-900 mb-2">
          Send Your Contribution
        </h3>
        <p className="text-sm text-warm-300 mb-4 leading-relaxed">
          Send any amount directly via M-Pesa to support Aileen&apos;s send-off.
        </p>
        <div className="bg-warm-50 rounded-lg p-4 mb-3">
          <p className="text-2xl font-bold text-mpesa font-body tracking-wide">
            +254 729 799 512
          </p>
          <p className="text-sm text-warm-900 font-bold mt-1">Yvonne Maya</p>
        </div>
        <p className="text-xs text-warm-300">
          After sending, you can share a screenshot or confirmation with the family.
        </p>
      </div>
    </section>
  );
}
