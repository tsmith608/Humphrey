"use client";

import React, { useState } from "react";
import { Upload, Wand2, Package, Star, ChevronDown, ArrowRight, Play } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCheckout } from "@/context/CheckoutContext";

// ─── Shared layout wrapper ─────────────────────────────────────────────────
const Container = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 32px", ...style }}>
    {children}
  </div>
);

const Section = ({
  children,
  id,
  bg = "transparent",
  style,
}: {
  children: React.ReactNode;
  id?: string;
  bg?: string;
  style?: React.CSSProperties;
}) => (
  <section
    id={id}
    style={{
      width: "100%",
      backgroundColor: bg,
      padding: "112px 0",
      ...style,
    }}
  >
    {children}
  </section>
);

const SectionHeader = ({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}) => (
  <div style={{ textAlign: "center", marginBottom: 64 }}>
    <p className="section-label" style={{ marginBottom: 16 }}>{label}</p>
    <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, color: "var(--text-primary)", marginBottom: subtitle ? 20 : 0 }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
        {subtitle}
      </p>
    )}
  </div>
);

// ─── Data ──────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "digital-pdf",
    title: "Digital Soundwave Portrait",
    subtitle: "Instant Download",
    price: 29,
    priceLabel: "Starting at",
    badge: "Popular",
    badgeColor: "linear-gradient(135deg,#7c6cf8,#6355e8)",
    deliveryType: "pdf" as const,
    features: ["High-res printable PDF (300dpi)", "Portrait or landscape layout", "Custom text & date overlay", "Delivered instantly via email"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "print-standard",
    title: 'Standard Print — 8×10"',
    subtitle: "Print on Demand",
    price: 59,
    priceLabel: "Free shipping",
    badge: "Bestseller",
    badgeColor: "linear-gradient(135deg,#f59e6b,#ef7c4e)",
    deliveryType: "print" as const,
    features: ["Museum-quality matte print", '8" × 10" archival paper', "Ships in 3–5 business days", "Custom color or monochrome"],
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "print-large",
    title: 'Large Format Print — 12×16"',
    subtitle: "Print on Demand",
    price: 89,
    priceLabel: "Free shipping",
    badge: "Premium",
    badgeColor: "linear-gradient(135deg,#a78bfa,#7c6cf8)",
    deliveryType: "print" as const,
    features: ['Gallery-worthy 12" × 16" print', "Ultra-HD waveform detail", "Ships in 5–7 business days", "Optional matte or gloss finish"],
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gift-set",
    title: "Gift Set — Print + Digital",
    subtitle: "Best Value",
    price: 109,
    priceLabel: "Bundle deal",
    badge: "Gift",
    badgeColor: "linear-gradient(135deg,#34d399,#059669)",
    deliveryType: "print" as const,
    features: ['12" × 16" premium print + PDF', "Gift-ready packaging included", "Personalised message card", "Ships in 5–7 business days"],
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
  },
];

const HOW_IT_WORKS = [
  { icon: Upload, step: "01", title: "Upload Your Audio", desc: "Share any voice recording, song clip, or sound memory — MP3, WAV, M4A all welcome." },
  { icon: Wand2, step: "02", title: "We Craft the Art", desc: "Our algorithm renders your unique soundwave into a stunning, personalised portrait." },
  { icon: Package, step: "03", title: "Receive Your Gift", desc: "Download instantly as a high-res PDF or choose premium print-on-demand delivery." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", role: "Gifted to her dad", text: "I uploaded a voicemail my late father left me. Having it as wall art is the most meaningful thing I own. Absolutely breathtaking.", rating: 5 },
  { name: "James K.", role: "Wedding anniversary gift", text: "Used our first dance song. My wife cried when she opened it. Worth every cent — the print quality is incredible.", rating: 5 },
  { name: "Priya L.", role: "Birthday present", text: "Ordered the digital PDF, had it printed locally. The turnaround was instant and the file was perfect. Will be ordering again!", rating: 5 },
];

const FAQS = [
  { q: "What audio formats do you accept?", a: "We accept MP3, WAV, M4A, OGG, and FLAC files up to 50MB. The clearer the audio, the more detailed your soundwave will be." },
  { q: "How long does it take to receive my order?", a: "Digital PDFs are delivered instantly to your email. Print orders ship within 3–5 business days (standard) or 5–7 business days (large/gift set)." },
  { q: "Can I customise the colours and text?", a: "Yes! During the order process you can choose your colour palette, add a custom caption, date, or message, and select portrait or landscape orientation." },
  { q: "What if I'm not happy with my order?", a: "We offer a 100% satisfaction guarantee. If you're not happy with the result, we'll re-render it or provide a full refund — no questions asked." },
];

const GALLERY_ITEMS = [
  { img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=500&auto=format&fit=crop", label: "Wedding Vows" },
  { img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=500&auto=format&fit=crop", label: "First Dance" },
  { img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop", label: "Birthday Message" },
  { img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=500&auto=format&fit=crop", label: "Baby's First Laugh" },
  { img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop", label: "Favourite Song" },
];

// ─── Mini waveform SVG ─────────────────────────────────────────────────────
const WaveformSVG = ({ bars = 70 }: { bars?: number }) => {
  const heights = [10, 18, 28, 38, 50, 42, 58, 48, 60, 52, 44, 56, 48, 36, 52, 60, 50, 40, 30, 20, 34, 48, 58, 52, 42, 60, 50, 38, 28, 18, 30, 42, 54, 60, 52, 46, 38, 30, 22, 16, 24, 36, 50, 58, 52, 44, 36, 26, 18, 12, 20, 32, 44, 56, 50, 42, 32, 24, 16, 10, 18, 28, 40, 52, 58, 50, 40, 30, 20, 12];
  const viewW = bars * 7;
  const viewH = 64;
  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ width: "100%", maxWidth: 680, display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#aa3a3a" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#a4b787" />
        </linearGradient>
        <style>{`
          @keyframes waveAnim {
            0%, 100% { transform: scaleY(0.3); }
            50%       { transform: scaleY(1); }
          }
          .wv-bar {
            transform-box: fill-box;
            transform-origin: 50% 50%;
            animation: waveAnim 1.2s ease-in-out infinite;
          }
        `}</style>
      </defs>
      {heights.slice(0, bars).map((h, i) => (
        <rect
          key={i}
          className="wv-bar"
          x={i * 7 + 2}
          y={(viewH - h) / 2}
          width={4}
          height={h}
          rx={2}
          fill="url(#waveGrad)"
          style={{ animationDelay: `${i * 0.04}s`, animationDuration: `${0.8 + (i % 5) * 0.15}s` }}
        />
      ))}
    </svg>
  );
};


// ─── FAQ accordion ─────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>{q}</span>
        <ChevronDown
          size={16}
          style={{
            color: "var(--text-secondary)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>
      {open && (
        <div style={{ padding: "0 24px 22px", borderTop: "1px solid var(--border-subtle)", paddingTop: 18, fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const { openCheckout } = useCheckout();

  const handleBuy = (id: string, title: string, price: string) => {
    openCheckout({ id, name: title, price: Number(price) });
  };

  return (
    <main style={{ background: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh", width: "100%" }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 32px 80px",
        overflow: "hidden",
      }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(124,108,248,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(245,158,107,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 860, width: "100%", margin: "0 auto" }}>
          <p className="section-label" style={{ marginBottom: 24 }}>Soundwave Portrait Studio</p>

          <h1 className="font-serif" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1.05, marginBottom: 28, color: "var(--accent-primary)" }}>
            Echoes of{" "}
            <span className="gradient-text" style={{ fontStyle: "italic" }}>the heart</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 40px" }}>
            Turn your most precious voice recordings and memories into stunning soundwave art. A family-centered gift that speaks louder than words.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 64 }}>
            <a href="#pricing" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", fontSize: 14 }}>
              Create Your Portrait <ArrowRight size={16} />
            </a>
            <a href="#how-it-works" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 36px", fontSize: 14 }}>
              <Play size={16} /> How It Works
            </a>
          </div>

          {/* Animated waveform */}
          <div style={{ width: "100%", maxWidth: 680, margin: "0 auto 12px" }}>
            <WaveformSVG bars={68} />
          </div>
          <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Your audio · visualised · preserved forever
          </p>

          {/* Trust bar */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 32, marginTop: 72, fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            {["10,000+ portraits created", "100% satisfaction guarantee", "Instant digital delivery", "Museum-quality prints"].map((t) => (
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent-primary)", flexShrink: 0 }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <Section id="how-it-works" bg="var(--bg-secondary)">
        <Container>
          <SectionHeader label="The Process" title="Simple as 1 – 2 – 3" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} style={{
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                padding: "40px 32px", borderRadius: 20,
                background: "var(--bg-card)", border: "1px solid var(--border-subtle)",
              }}>
                <div style={{ position: "relative", marginBottom: 24 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--accent-glow)", border: "1px solid var(--border-medium)" }}>
                    <Icon size={28} color="var(--accent-secondary)" />
                  </div>
                  <span style={{ position: "absolute", top: -10, right: -10, fontSize: 10, fontWeight: 900, color: "var(--accent-primary)", fontFamily: "monospace" }}>{step}</span>
                </div>
                <h3 className="font-serif" style={{ fontSize: 24, color: "var(--text-primary)", marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <Section id="gallery" bg="var(--bg-primary)">
        <Container>
          <SectionHeader label="Gallery" title="Every sound tells a story" />
        </Container>
        <div style={{ overflowX: "auto", width: "100%", paddingBottom: 16 }}>
          <div style={{ display: "flex", gap: 20, padding: "0 32px", width: "max-content" }}>
            {GALLERY_ITEMS.map(({ img, label }) => (
              <div key={label} style={{ position: "relative", width: 260, aspectRatio: "3/4", borderRadius: 20, overflow: "hidden", flexShrink: 0, cursor: "pointer" }}>
                <img src={img} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, transition: "transform 0.6s, opacity 0.3s" }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.05)"; (e.target as HTMLImageElement).style.opacity = "1"; }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; (e.target as HTMLImageElement).style.opacity = "0.75"; }}
                />
                {/* Waveform overlay */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                  <svg viewBox="0 0 200 48" style={{ width: "80%" }}>
                    {[6, 12, 20, 16, 28, 22, 34, 26, 40, 32, 46, 40, 34, 26, 18, 12, 8, 16, 26, 34, 42, 48, 42, 32, 22, 14, 22, 32, 42, 46, 38, 28, 18, 12, 22, 34, 42, 36, 26, 16].map((h, i) => (
                      <rect key={i} x={i * 5 + 1} y={(48 - h) / 2} width="3" height={h} rx="1.5" fill="#7c6cf8" fillOpacity={0.45 + (h / 48) * 0.5} />
                    ))}
                  </svg>
                </div>
                {/* Label */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 16px 16px", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", pointerEvents: "none" }}>
                  <p style={{ color: "white", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PRODUCTS ──────────────────────────────────────────────────── */}
      <Section id="pricing" bg="var(--bg-secondary)">
        <Container>
          <SectionHeader
            label="Pricing"
            title="Choose your format"
            subtitle="From an instant digital download to a framed gallery print — there's a portrait for every occasion and budget."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} onBuy={handleBuy} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <Section bg="var(--bg-primary)">
        <Container>
          <SectionHeader label="Reviews" title="Stories behind the waves" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map(({ name, role, text, rating }) => (
              <div key={name} style={{ display: "flex", flexDirection: "column", gap: 20, padding: 28, borderRadius: 20, background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: rating }).map((_, i) => <Star key={i} size={16} fill="var(--accent-warm)" color="var(--accent-warm)" />)}
                </div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, fontStyle: "italic", flex: 1 }}>"{text}"</p>
                <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{name}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <Section bg="var(--bg-secondary)">
        <Container>
          <div style={{
            borderRadius: 28, padding: "80px 48px", textAlign: "center", position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(124,108,248,0.15), rgba(167,139,250,0.08))",
            border: "1px solid var(--border-medium)",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "radial-gradient(ellipse at 50% 0%, rgba(124,108,248,0.18), transparent)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p className="section-label" style={{ marginBottom: 20 }}>Ready to create?</p>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: 24, color: "var(--text-primary)", lineHeight: 1.1 }}>
                Give a gift they'll <span className="gradient-text" style={{ fontStyle: "italic" }}>never forget</span>
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
                Weddings, birthdays, anniversaries, memorials — soundwave portraits turn any meaningful moment into permanent art.
              </p>
              <a href="#pricing" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", fontSize: 14 }}>
                Start Your Order <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <Section id="faq" bg="var(--bg-primary)">
        <Container style={{ maxWidth: 760 }}>
          <SectionHeader label="FAQ" title="Common questions" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq) => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </Container>
      </Section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ width: "100%", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", padding: "80px 0 40px" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, marginBottom: 64, alignItems: "start" }}>
            {/* Brand */}
            <div style={{ maxWidth: 320 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 20 }}>
                  {[0.5, 0.9, 1, 0.7, 0.8, 0.5, 0.95, 0.65, 0.4].map((h, i) => (
                    <span key={i} className="wave-bar" style={{ height: h * 18, animationDelay: `${i * 0.1}s`, background: i % 2 === 0 ? "var(--accent-primary)" : "var(--accent-secondary)" }} />
                  ))}
                </div>
                <span className="font-serif" style={{ fontSize: 22, fontStyle: "italic", color: "var(--accent-primary)" }}>EchoHeart</span>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Preserving the echoes of your heart, one waveform at a time. The most personal gift you'll ever give.
              </p>
            </div>

            {/* Link columns */}
            <div style={{ display: "flex", gap: 64 }}>
              {[
                { heading: "Product", links: ["How It Works", "Gallery", "Pricing", "FAQ"] },
                { heading: "Company", links: ["About", "Blog", "Contact"] },
                { heading: "Legal", links: ["Privacy Policy", "Terms", "Refund Policy"] },
              ].map(({ heading, links }) => (
                <div key={heading}>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-muted)", marginBottom: 20 }}>{heading}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {links.map((l) => (
                      <a key={l} href="#" style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-primary)"}
                        onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-secondary)"}
                      >{l}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, paddingTop: 32, borderTop: "1px solid var(--border-subtle)" }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>© 2026 Humphrey Studio. All rights reserved.</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Made with love for unforgettable moments.</p>
          </div>
        </Container>
      </footer>

    </main>
  );
}
