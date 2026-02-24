"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
// import { useCheckout } from "@/context/CheckoutContext"; // Will implement checkout flow in Phase 4

const products = [
  {
    id: "asset-001",
    title: "Humphrey Genesis | Premium Business Operating System",
    price: "49.00",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: "asset-002",
    title: "Aura UI Kit | Glassmorphic Design System for Next.js",
    price: "29.00",
    category: "Design",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "asset-003",
    title: "Velocity Engine | High-Performance Marketing Framework",
    price: "79.00",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function Home() {
  // const { openCheckout } = useCheckout();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 pb-20">
      <Header />

      <main className="min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 mb-24 overflow-hidden">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 border border-white/10 glass mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Digital Excellence</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-8 leading-[1.1]">
              Elevate Your <span className="gradient-text">Workflow</span>
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed mb-10 max-w-xl mx-auto italic">
              "The future belongs to those who build it. Humphrey provides the tools you need to succeed in the digital frontier."
            </p>
            <div className="flex items-center justify-center gap-6">
              <button className="rounded-2xl gradient-bg px-8 py-4 text-sm font-bold text-white shadow-xl shadow-purple-500/20 hover:opacity-90 transition-all">
                Explore Marketplace
              </button>
              <button className="rounded-2xl glass px-8 py-4 text-sm font-bold text-white hover:bg-white/5 transition-all">
                View Roadmap
              </button>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 italic">Featured Assets</h2>
                <p className="text-zinc-500">Hand-crafted digital products for modern builders.</p>
              </div>
              <button className="text-sm font-bold text-purple-500 hover:text-purple-400 transition-colors uppercase tracking-widest">
                View All Products &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onBuy={(id, title, price) => console.log('Mock Buy:', { id, title, price })}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Background blobs */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-pink-600 blur-[120px]" />
        </div>

        <footer className="mt-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl border-t border-white/5 pt-12 flex flex-col gap-6 sm:flex-row sm:justify-between items-center text-sm text-zinc-500 pb-12">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Templates</a>
            </div>
            <p>© 2026 Humphrey Inc.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
