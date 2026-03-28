import Navbar from '@/components/Navbar';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Gallery — Celebrating Aileen Owango',
  description:
    'Photos and memories of Aileen Owango shared by family, friends, and FEMNet colleagues.',
};

const FEMNET_GALLERY =
  'https://drive.google.com/drive/folders/1-2dbd04gWS2DpCFUe4cy-syY0-IzEiXo';

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        {/* Existing photo grid + lightbox + Drive CTA */}
        <Gallery />

        {/* FEMNet tribute gallery */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="border border-lavender-200 rounded-2xl bg-white overflow-hidden">
            {/* Header band */}
            <div className="bg-lavender-400/10 px-8 py-6 border-b border-lavender-200">
              <p className="text-xs uppercase tracking-[0.2em] text-lavender-400 font-body font-bold mb-1">
                Tribute by
              </p>
              <h3 className="font-display text-2xl text-warm-900">
                FEMNet — The African Women&apos;s Development and
                Communication Network
              </h3>
            </div>

            {/* Body */}
            <div className="px-8 py-8">
              <p className="text-warm-600 text-sm leading-relaxed mb-6 max-w-xl">
                Aileen&apos;s colleagues at FEMNet put together a gallery
                celebrating her incredible contributions to women&apos;s rights
                and development across Africa. View their collection of photos
                from her time at FEMNet.
              </p>

              <a
                href={FEMNET_GALLERY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-lavender-400 text-white px-6 py-3 rounded-lg
                  text-sm font-bold font-body uppercase tracking-wider
                  hover:bg-lavender-500 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                View FEMNet Gallery
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}