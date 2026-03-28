"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProgressBar from "../components/ProgressBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Fundraising progress */}
        <section className="px-6 pb-16">
          <h2 className="font-display text-2xl text-center text-warm-900 mb-6">
            Fundraising Progress
          </h2>
          <ProgressBar raised={0} goal={1200000} />
          <div className="text-center mt-6">
            <p className="text-sm text-warm-300 mb-2">
              Send your contribution via M-Pesa to
            </p>
            <p className="text-xl font-bold text-mpesa font-body">
              +254 729 799 512
            </p>
            <p className="text-sm text-warm-900 font-bold">Yvonne Maya</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}