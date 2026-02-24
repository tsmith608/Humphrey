"use client";

import React from "react";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcf9f5] text-[#4a3728] selection:bg-[#ece4d9]">
      {/* Decorative Floral Top (Simulated with div for now, or Image if generated) */}
      <div className="absolute top-0 left-0 w-full h-48 overflow-hidden pointer-events-none opacity-60">
        <div className="relative w-full h-full">
          {/* Fallback floral decoration if image is missing */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 flex flex-col items-center pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-8">
            <Heart className="h-4 w-4 text-[#8c7e6d] fill-[#8c7e6d]/20" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl mb-6 tracking-wide lowercase">
            michelle & kenneth
          </h1>

          <div className="flex flex-col items-center gap-2 mb-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#8c7e6d]">
              september 5, 2026 • new york, ny
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#b4a99d]">
              192 days to go!
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm soft-shadow mb-20 group">
            <Image
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop"
              alt="Michelle & Kenneth"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl mb-8 italic">Our Story</h2>
            <p className="text-[15px] leading-relaxed text-[#5c4a3c] mb-12 font-light">
              We can't wait to celebrate our special day with the people we love most.
              Turn your most precious voice recordings and memories into stunning soundwave art.
              A family-centered gift that speaks louder than words.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-[#4a3728] pb-1 hover:text-[#8c7e6d] hover:border-[#8c7e6d] transition-all">
                The Registry
              </button>
              <button className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-[#4a3728] pb-1 hover:text-[#8c7e6d] hover:border-[#8c7e6d] transition-all">
                The Wedding Party
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section for "Voice Gift Portals" */}
      <section className="px-6 lg:px-8 py-20 bg-[#f8f4f0]">
        <div className="mx-auto max-w-7xl text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8c7e6d] mb-4 block">
            Occasions
          </span>
          <h2 className="font-serif text-4xl mb-16">Voice Gift Portals</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/5] relative overflow-hidden mb-6 soft-shadow">
                  <Image
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1544126592-807daa215a75' : i === 2 ? '1484981138541-3d074aa97716' : '1519741497674-611481863552'}?auto=format&fit=crop&q=80&w=800`}
                    alt="Product"
                    fill
                    className="object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl mb-2 italic">Product {i}</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#8c7e6d] mb-4">Starting at $59.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 lg:px-8 border-t border-[#ece4d9]">
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-8">
          <span className="text-2xl font-serif italic text-[#4a3728]">humphrey</span>
          <div className="flex gap-8 text-[10px] font-medium uppercase tracking-[0.3em] text-[#b4a99d]">
            <a href="#" className="hover:text-[#4a3728]">Privacy</a>
            <a href="#" className="hover:text-[#4a3728]">Contact</a>
          </div>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#d1c8bd]">
            © 2026 EchoHeart Studios.
          </p>
        </div>
      </footer>
    </main>
  );
}
