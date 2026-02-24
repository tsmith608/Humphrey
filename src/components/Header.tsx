"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { label: "How It Works", href: "#how-it-works" },
        { label: "Gallery", href: "#gallery" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
    ];

    const waveHeights = [0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1, 0.7, 0.4];

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                background: scrolled ? "rgba(244,244,244,0.92)" : "rgba(244,244,244,0.75)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid var(--border-subtle)",
                transition: "background 0.4s",
            }}
        >
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Logo */}
                <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 22 }}>
                        {waveHeights.map((h, i) => (
                            <span
                                key={i}
                                className="wave-bar"
                                style={{
                                    height: h * 20,
                                    minWidth: 3,
                                    borderRadius: 2,
                                    background: i % 2 === 0 ? "var(--accent-primary)" : "var(--accent-secondary)",
                                    animationDelay: `${i * 0.09}s`,
                                }}
                            />
                        ))}
                    </div>
                    <span className="font-serif" style={{ fontSize: 22, fontStyle: "italic", color: "var(--accent-primary)" }}>
                        EchoHeart
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
                            onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-primary)"}
                            onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-secondary)"}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <a href="#pricing" className="btn-primary" style={{ padding: "10px 22px", fontSize: 12 }}>
                        Create Yours
                    </a>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ display: "none", padding: 8, background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em" }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#pricing" className="btn-primary" style={{ textAlign: "center", textDecoration: "none", marginTop: 8 }} onClick={() => setMobileOpen(false)}>
                        Create Yours
                    </a>
                </div>
            )}
        </header>
    );
}
