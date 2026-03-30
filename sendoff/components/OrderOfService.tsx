'use client';

import { useState } from 'react';

/* ── Programme Items ─────────────────────────────────── */

interface ProgramItem {
  time: string;
  title: string;
  by?: string;
  detail?: string;
}

const PROGRAMME: ProgramItem[] = [
  { time: '10:00 AM', title: 'Opening Prayer', by: 'Brenda Onim' },
  {
    time: '10:30 AM',
    title: 'Scripture Reading',
    by: 'Keene Obie',
    detail: 'Psalm 27:1 & Proverbs 31:8–9',
  },
  { time: '', title: 'Reading of Life', by: 'Ossi Karpetro — Brother' },
  {
    time: '11:30 AM',
    title: 'Tributes',
    detail:
      'Cousins — Maya\nFriends — Muthoki Nzioki & Gad Ojung\'a\nBrother — Timmy\nFather — Ted Owango',
  },
  { time: '11:30 AM', title: 'Message of Comfort', by: 'Pastor (TBA)' },
  { time: '12:00 PM', title: 'Vote of Thanks', by: 'Sally Owango' },
];

/* ── Hymns ───────────────────────────────────────────── */

interface Hymn {
  id: string;
  title: string;
  artist: string;
  /** Users paste lyrics here — kept as a prop so Tracy can fill them in. */
  lyrics: string;
}

const HYMNS: Hymn[] = [
   {
    id: 'mchungaji',
    title: 'Bwana Ni Mchungaji Wangu',
    artist: 'Reuben Kigame',
    lyrics: `Bwana ni mchungaji wangu
Sitapungukiwa kitu
Hunilaza kwenye majani mabichi
Hunongoza kwa maji matulivu
Hunihuisha nafsi yangu
Huniongoza kwa njia za haki
Nipitapo bondeni mwa mauti
Sitaogopa wewe u nami
Hakika wema nazo fadhili
Zitanifuata mimi
Nitakaa nyumbani mwa bwana
Siku zote za maisha yangu
Hakika wema nazo fadhili
Zitanifuata mimi
Nitakaa nyumbani mwa bwana
Siku zote za maisha yangu
Gongo lako na fimbo yako
Vinanifariji mimi
Waandaa meza mbele yangu
Machoni pa watesi wangu
Hakika wema nazo fadhili
Zitanifuata mimi
Nitakaa nyumbani mwa bwana
Siku zote za maisha yangu
Hakika wema nazo fadhili
Zitanifuata mimi
Nitakaa nyumbani mwa bwana
Siku zote za maisha yangu
Hakika wema nazo fadhili
Zitanifuata mimi
Nitakaa nyumbani mwa bwana
Siku zote za maisha yangu
Nitakaa nyumbani mwa bwana
Siku zote za maisha yangu
Nitakaa nyumbani mwa bwana...`, 
  },
   {
    id: 'well',
    title: 'It Is Well (With My Soul)',
    artist: 'Horatio Spafford / Philip Bliss',
    lyrics: `When peace like a river, attendeth my way
When sorrows like sea billows roll
Whatever my lot, thou hast taught me to say
It is well, it is well, with my soul
It is well
With my soul
It is well, it is well with my soul
Though Satan should buffet, though trials should come
Let this blest assurance control
That Christ has regarded my helpless estate
And hath shed His own blood for my soul
It is well (it is well)
With my soul (with my soul)
It is well, it is well with my soul
My sin, oh, the bliss of this glorious thought!
My sin, not in part but the whole
Is nailed to the cross, and I bear it no more
Praise the Lord, praise the Lord, o my soul!
It is well (it is well)
With my soul (with my soul)
It is well, it is well with my soul
It is well (it is well)
With my soul (with my soul)
It is well, it is well with my soul.`
  },
   {
    id: 'wakuabudiwa',
    title: 'Wakuabudiwa',
    artist: 'Christina Shusho',
    lyrics: `Wakuabudiwa,
wakuheshimiwa ni wewe Mungu (You are worthy of worship and Honor)
Wakupewa sifa, na utukufu,
ni wewe Mungu (worthy to receive all praise and glory)
Mungu mwenye nguvu,
wastahili heshima zote (Mighty God, you deserve all honor)
Hakuna mwingine wa kulinganishwa na
wewe Mungu (There's no one like you God)
Wakuabudiwa,
wakuheshimiwa ni wewe Mungu (You are worthy of worship and Honor)
Wakupewa sifa, na utukufu,
ni wewe Mungu (worthy to receive all praise and glory)
Mungu mwenye nguvu,
wastahili heshima zote (Mighty God, you deserve all honor)
Hakuna mwingine wa kulinganishwa na
wewe Mungu (There's no one like you God)
Umesema wewe, jina lako liko liliko ni we Mungu (You're the I AM God)
Unafanya mambo yaliyo juu ya fahamu
zetu Mungu (You do amazing things God)
Ukisema ndiyo, nani awezaye kupinga?
Hakuna (If you say yes, no one can say no)
Wewe unatupa kushinda na zaidi ya
kushinda (You give us victory over victory)
Unatupandisha utukufu hadi utukufu;
Mungu (You lift us from glory to glory God)
Umesema wewe, jina lako liko liliko ni we Mungu (You're the I AM God)
Unafanya mambo yaliyo juu ya fahamu
zetu Mungu (You do amazing things God)
Ukisema ndiyo, nani awezaye kupinga?
Hakuna (If you say yes, no one can say no)
Wewe unatupa kushinda na zaidi ya
kushinda (You give us victory over victory)
Unatupandisha utukufu hadi utukufu;
Mungu (You lift us from glory to glory God)
Wakuabudiwa,
wakuheshimiwa ni wewe Mungu (You are worthy of worship and Honor)
Wakupewa sifa, na utukufu,
ni wewe Mungu (worthy to receive all praise and glory)
Mungu mwenye nguvu,
wastahili heshima zote (Mighty God, you deserve all honor)
Hakuna mwingine wa kulinganishwa na
wewe Mungu (There's no one like you God)
Wakuabudiwa,
wakuheshimiwa ni wewe Mungu (You are worthy of worship and Honor)
Wakupewa sifa, na utukufu,
ni wewe Mungu (worthy to receive all praise and glory)
Mungu mwenye nguvu,
wastahili heshima zote (Mighty God, you deserve all honor)
Hakuna mwingine wa kulinganishwa na
wewe Mungu (There's no one like you God)
Uzima wetu uko mikononi mwako Mungu (Our lives are in your hand God)
Unawapa nguvu,
wanyonge na wadhaifu Mungu (You give strength to the weak God)
Unawanyeshea mvua wema na waovu mungu
(You rain on the good and the evil God)
Wanadamu nani wa kulinganishwa na
wewe (Who is man to be compared to you?)
Nani mwenye nguvu wa kusimama mbele
yako Mungu (Who can stand before you?)
Uzima wetu uko mikononi mwako Mungu (Our lives are in your hand God)
Unawapa nguvu,
wanyonge na wadhaifu Mungu (You give strength to the weak God)
Unawanyeshea mvua wema na waovu mungu
(You rain on the good and the evil God)
Wanadamu nani wa kulinganishwa na
wewe (Who is man to be compared to you?)
Nani mwenye nguvu wa kusimama mbele
yako Mungu (Who can stand before you?)
Wakuabudiwa,
wakuheshimiwa ni wewe Mungu (You are worthy of worship and Honor)
Wakupewa sifa, na utukufu,
ni wewe Mungu (worthy to receive all praise and glory)
Mungu mwenye nguvu,
wastahili heshima zote (Mighty God, you deserve all honor)
Hakuna mwingine wa kulinganishwa na
wewe Mungu (There's no one like you God)
Wakuabudiwa,
wakuheshimiwa ni wewe Mungu (You are worthy of worship and Honor)
Wakupewa sifa, na utukufu,
ni wewe Mungu (worthy to receive all praise and glory)
Mungu mwenye nguvu,
wastahili heshima zote (Mighty God, you deserve all honor)
Hakuna mwingine wa kulinganishwa na
wewe Mungu (There's no one like you God)
Hakuna mwingine wa kulinganishwa na
wewe Mungu (There's no one like you God)
Bwana utukufu wako sigusi (Father I do not touch your glory)
Bali utukufu ukurudie wewe Mungu wangu
(But let the glory return to you my God)`, 
  },
  {
    id: 'storm',
    title: 'Praise You in This Storm',
    artist: 'Casting Crowns',
    lyrics: `I was sure by now
God, You would have reached down
And wiped our tears away
Stepped in and saved the day
And once again
I say, "A-men" and it's still rainin'
But as the thunder rolls
I barely hear Your whisper through the rain
"I'm with you"
And as Your mercy falls
I'll raise my hands and praise the God who gives
And takes away
And I'll praise You in this storm
And I will lift my hands
For You are who You are
No matter where I am
And every tear I've cried
You hold in Your hand
You never left my side
And though my heart is torn
I will praise You in this storm
I remember when I stumbled in the wind
You heard my cry, You raised me up again
But my strength is almost gone
How can I carry on
If I can't find You?
But as the thunder rolls
I barely hear Your whisper through the rain
"I'm with you"
And as Your mercy falls
I'll raise my hands and praise the God who gives
And takes away
And I'll praise You in this storm
And I will lift my hands
For You are who You are
No matter where I am
And every tear I've cried
You hold in Your hand
You never left my side
And though my heart is torn
I will praise You in this storm
I lift my eyes unto the hills
Where does my help come from?
My help comes from the Lord
The maker of heaven and earth
I lift my eyes unto the hills
Where does my help come from?
My help comes from the Lord
The maker of heaven and earth
(I lift my eyes unto the hills)
(Where does my help come from?)
And I'll praise You in this storm
And I will lift my hands
For You are who You are
No matter where I am
Every tear I've cried
You hold in Your hand
You never left my side
Though my heart is torn
I will praise You in this storm
And though my heart is torn
(Though my heart is torn)
I'll praise You in this storm
(Praise You in this storm)`
  },
  {
    id: 'hands',
    title: 'My Life Is in Your Hands',
    artist: 'Kirk Franklin',
    lyrics: `Verse 1 

You don't have to worry 
And don't you be afraid 
Joy comes in the morning 
Troubles they don't last always 
For there's a friend in Jesus 
Who will wipe your tears away 
And if your heart is broken 
Just lift your hands and say 
Chorus 
Oh 
I know that I can make it 
I know that I can stand 
No matter what may come my way 
My life is in your hands 
With Jesus I can take it 
With Him I know I can stand 
No matter what may come my way 
My life is in your hands 
Verse 2 
So when your tests and trials 
They seem to get you down 
And all your friends and loved ones 
Are nowhere to be found 
Remember there's a friend in Jesus 
Who will wipe your tears away 
And if you heart is broken 
Just lift your hands and say 
Chorus 
Oh 
I know that I can make it 
I know that I can stand 
No matter what may come my way 
My life is in your hands 
With Jesus I can take it 
With Him I know I can stand 
No matter what may come my way 
My life is in your hands`, 
  },
 
 
  
  {
    id: 'kuiko',
    title: 'Kuiko Jana',
    artist: 'Red Fourth Chorus',
    lyrics:  `Bwana ni mwokozi wangu
Tena ni kiongozi wangu
Ananipenda leo kuliko jana
Baraka zake hazikwishi
Si kama binadamu habadiliki
Ananipenda leo kuliko jana
Kuliko jana
Kuliko jana
Yesu nipende leo kuliko jana
Kuliko jana
Kuliko jana
Yesu nipende leo kuliko jana
Nakuomba Mungu uwasamehe
Wangalijua jinsi unavyonipenda mimi wasingenisema
Na maadui wangu nawaombea maisha marefu
Wazidi kuona ukinibariki
Ujue binadamu ni watu wa ajabu sana
Walimkana Yesu mara tatu kabla jogoo kuwika
Ujue binadamu ni watu wa ajabu sana
Walimsulubisha Yesu Messiah bila kusita
Ooh, na
Bwana ni mwokozi wangu
Tena ni kiongozi wangu
Ananipenda leo kuliko jana
Baraka zake hazikwishi
Si kama binadamu habadiliki
Ananipenda leo kuliko jana
Kuliko jana
Kuliko jana
Yesu nipende leo kuliko jana
Kuliko jana
Kuliko jana
Yesu nipende leo kuliko jana
Wewe ndio nategemea
Kufa kupona baba nakutegemea (Amen)
Chochote kitanikatsia
Kuingia mbinguni utaniondolea (Ooh-ooh, yeah)
Wewe ndio nategemea (Amen)
Kufa kupona baba nakutegemea (Oh-oh)
Chochote kitanikatsia
Kuingia mbinguni utaniondolea (Eh, wewe ndio nategemea)
Wewe ndio nategemea
Kufa kupona baba nakutegemea (Eh, bwana)
Chochote kitanikatsia
Kuingia mbinguni utaniondolea (Eh, maisha yangu yote)
Wewe ndio nategemea (Kwa nguvu zangu zote)
Kufa kupona baba nakutegemea (Nakutegemea)
Chochote kitanikatsia
Kuingia mbinguni utaniondolea (Oh-oh-oh-oh)
Na bwana ni mwokozi wangu
Na tena ni mkombozi wangu
Ananipenda leo kuliko jana
Baraka zake hazikwishi
Si kama binadamu habadiliki
Ananipenda leo kuliko jana
Kuliko jana (Kuliko jana)
Kuliko jana
Yesu nipende leo kuliko jana
Kuliko jana (Kuliko jana)
Kuliko jana (Kuliko jana)
Yesu nipende leo kuliko jana
Wewe ndio nategemea (Wewe)
Kufa kupona baba nakutegemea (Wewe)
Chochote kitanikatsia (Uh-huh)
Kuingia mbinguni utaniondolea
Wewe ndio nategemea (Ooh)
Kufa kupona baba nakutegemea (Nakutegemea)
Chochote kitanikatsia
Kuingia mbinguni utaniondolea
Na bwana ni mwokozi wangu (Amen)
Tena ni mkombozi wangu (Amen)
Ananipenda leo kuliko jana (Amen)
Baraka zake hazikwishi (Amen)
Si kama binadamu habadiliki (Amen)
Ananipenda leo kuliko jana (Amen)
Kuliko jana
Kuliko jana
Nipende leo kuliko jana`
  },
];

/* ── Sub-components ──────────────────────────────────── */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-lavender-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg className="w-4 h-4 text-lavender-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
    </svg>
  );
}

/* ── Main Component ──────────────────────────────────── */

export default function OrderOfService() {
  const [openHymn, setOpenHymn] = useState<string | null>(null);

  const toggleHymn = (id: string) =>
    setOpenHymn(openHymn === id ? null : id);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      {/* ── Heading ── */}
      <h2 className="font-display text-4xl sm:text-5xl text-center text-warm-900 mb-3">
        Order of Service
      </h2>
      <div className="w-16 h-[3px] bg-lavender-400 mx-auto mb-3 rounded-full" />
      <p className="text-center text-warm-300 mb-2">
        Thanksgiving Service · AIC Milimani
      </p>
      <p className="text-center text-warm-300 mb-12 text-sm">
        Wednesday, 1st April 2026 · 10:00 AM
      </p>

      {/* ── Programme ── */}
      <div className="relative mb-16">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-lavender-200" />

        <div className="space-y-6">
          {PROGRAMME.map((item, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-lavender-400 bg-white" />

              {/* Time badge */}
              {item.time && (
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-lavender-600 mb-0.5">
                  {item.time}
                </span>
              )}

              <h3 className="font-display text-xl text-warm-900">{item.title}</h3>

              {item.by && (
                <p className="text-sm text-warm-300 mt-0.5">{item.by}</p>
              )}

              {item.detail && (
                <div className="mt-1.5 text-sm text-warm-900/70 whitespace-pre-line leading-relaxed">
                  {item.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Hymns & Songs ── */}
      <div>
        <h3 className="font-display text-3xl text-center text-warm-900 mb-2">
          Hymns &amp; Songs
        </h3>
        <div className="w-12 h-[3px] bg-lavender-400 mx-auto mb-8 rounded-full" />

        <div className="space-y-3">
          {HYMNS.map((hymn) => {
            const isOpen = openHymn === hymn.id;
            const hasLyrics = hymn.lyrics.trim().length > 0;

            return (
              <div
                key={hymn.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-lavender-200 shadow-lg'
                    : 'bg-white/60 border-warm-200 hover:border-lavender-200 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleHymn(hymn.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <NoteIcon />
                    <div>
                      <p className="font-display text-lg text-warm-900">
                        {hymn.title}
                      </p>
                      <p className="text-xs text-warm-300 mt-0.5">
                        {hymn.artist}
                      </p>
                    </div>
                  </div>
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 animate-fade-up">
                    <div className="border-t border-warm-100 pt-4">
                      {hasLyrics ? (
                        <p className="text-sm text-warm-900/80 whitespace-pre-line leading-relaxed">
                          {hymn.lyrics}
                        </p>
                      ) : (
                        <p className="text-sm text-warm-300 italic">
                          Lyrics coming soon.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}