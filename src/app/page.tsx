"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCheckout } from "@/context/CheckoutContext";

const products = [
  {
    id: "wave-001",
    title: "The First Hello | Ultrasound Soundwave Portrait",
    price: "59.00",
    category: "Newborn",
    image: "https://images.unsplash.com/photo-1544126592-807daa215a75?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "wave-002",
    title: "Eternal Vows | Wedding Anniversary Waveform",
    price: "79.00",
    category: "Anniversary",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop",
  },
  {
    id: "wave-003",
    title: "Laughter of a Lifetime | Family Legacy Print",
    price: "99.00",
    category: "Family",
    image: "https://images.unsplash.com/photo-1484981138541-3d074aa97716?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function Home() {
  const { openCheckout } = useCheckout();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="glow-bg top-[10%] left-[-10%] w-[600px] h-[600px] bg-red-600/10" />
        <div className="glow-bg top-[40%] right-[-10%] w-[700px] h-[700px] bg-rose-600/5" />
        <div className="glow-bg bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-red-900/10" />
      </div>

      {/* Hero Section - Centered in Viewport */}
      <section className="relative px-6 lg:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] pt-20">
        <div className="mx-auto max-w-4xl w-full">
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 border border-white/10 glass animate-fade-in hover:border-red-500/20 transition-colors cursor-default">
              <Sparkles className="h-3.5 w-3.5 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Timeless Memories</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-6xl font-black tracking-tighter text-white sm:text-8xl mb-10 leading-[0.9] uppercase italic">
              Echoes of <br />
              <span className="gradient-text">the Heart</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed mb-14 max-w-2xl mx-auto font-medium">
              Turn your most precious voice recordings and memories into stunning soundwave art.
              A family-centered gift that speaks louder than words.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto rounded-[1.5rem] gradient-bg px-10 py-5 text-xs font-black uppercase tracking-widest text-white shadow-2xl shadow-red-500/30 hover:scale-105 active:scale-95 transition-all duration-300">
                Design Your Wave
              </button>
              <button className="w-full sm:w-auto rounded-[1.5rem] glass px-10 py-5 text-xs font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all duration-300">
                Gift Cards
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-red-500/50" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Bespoke Collection</span>
              </div>
              <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Voice Gift Portals</h2>
            </div>
            <button className="group text-[10px] font-black text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.3em] flex items-center gap-2">
              Browse Occasions <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onBuy={(id, title, price) => openCheckout({ id, name: title, price: parseFloat(price) })}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-40 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-white/5 pt-16 flex flex-col gap-10 sm:flex-row sm:justify-between items-center pb-20">
          <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            <a href="#" className="hover:text-red-500 transition-colors">Our Story</a>
            <a href="#" className="hover:text-red-500 transition-colors">Contact</a>
            <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">© 2026 EchoHeart Studios.</p>
        </div>
      </footer>
    </main>
  );
}
