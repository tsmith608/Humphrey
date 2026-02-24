"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

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
        { label: "Contact", href: "#faq" },
    ];

    const waveHeights = [0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 1, 0.7, 0.4];

    return (
        <>
            <style>{`
        .hb-nav {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 200;
          width: 260px;
          background: rgba(18, 18, 26, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid rgba(255,255,255,0.08);
          color: var(--text-primary);
          -webkit-clip-path: circle(30px at 35px 35px);
          clip-path: circle(30px at 35px 35px);
          transition: clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      -webkit-clip-path 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100vh;
        }

        .hb-nav:hover {
          -webkit-clip-path: circle(150vh at 35px 35px);
          clip-path: circle(150vh at 35px 35px);
          transition: clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1),
                      -webkit-clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hb-navicon {
          width: 70px;
          height: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .hb-navicon span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--accent-secondary);
          border-radius: 2px;
          transition: background 0.2s;
        }

        .hb-navicon:hover span {
          background: var(--accent-primary);
        }

        .hb-links {
          display: flex;
          flex-direction: column;
          padding: 8px 0 24px;
        }

        .hb-links a {
          display: block;
          padding: 14px 28px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s, background 0.2s, padding-left 0.2s;
          border-left: 2px solid transparent;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .hb-links a:hover {
          color: var(--text-primary);
          background: rgba(124, 108, 248, 0.08);
          border-left-color: var(--accent-primary);
          padding-left: 34px;
        }

        .hb-links a:active {
          background: rgba(124, 108, 248, 0.15);
        }

        .hb-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 12px 20px;
        }

        .hb-cta {
          margin: 8px 20px 0;
          display: block;
          padding: 12px 20px;
          border-radius: 8px;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, #7c6cf8, #6355e8);
          transition: opacity 0.2s, transform 0.2s;
          font-family: var(--font-sans);
          white-space: nowrap;
        }

        .hb-cta:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `}</style>

            {/* Clip-path hamburger nav */}
            <nav className="hb-nav">
                {/* Hamburger icon (always visible through the circle) */}
                <div className="hb-navicon">
                    <span />
                    <span />
                    <span />
                </div>

                {/* Links revealed on hover */}
                <div className="hb-links">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                    <div className="hb-divider" />
                    <a href="#pricing" className="hb-cta">Create Yours →</a>
                </div>
            </nav>

            {/* Main sticky header bar */}
            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: scrolled ? "rgba(10,10,15,0.92)" : "rgba(10,10,15,0.75)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    borderBottom: "1px solid var(--border-subtle)",
                    transition: "background 0.4s",
                }}
            >
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 0 80px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Logo (left-padded to clear the hamburger circle) */}
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
                        <span
                            className="font-serif"
                            style={{ fontSize: 22, fontStyle: "italic", color: "var(--text-primary)" }}
                        >
                            humphrey
                        </span>
                    </a>

                    {/* Right side — desktop only */}
                    <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                        {[
                            { label: "How It Works", href: "#how-it-works" },
                            { label: "Gallery", href: "#gallery" },
                            { label: "Pricing", href: "#pricing" },
                        ].map((link) => (
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
                        <a href="#pricing" className="btn-primary" style={{ padding: "10px 22px", fontSize: 12 }}>
                            Create Yours
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}
