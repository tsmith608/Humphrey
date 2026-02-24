"use client";

import React from "react";
import { FileImage, Printer, ArrowRight } from "lucide-react";

interface ProductCardProps {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    priceLabel: string;
    badge: string;
    badgeColor: string;
    deliveryType: "pdf" | "print";
    features: string[];
    image: string;
    onBuy: (id: string, title: string, price: string) => void;
}

// Waveform bar heights for card preview
const WAVE_HEIGHTS = [6, 12, 20, 16, 28, 22, 34, 26, 40, 32, 46, 40, 34, 26, 18, 12, 8, 16, 26, 34, 42, 50, 42, 32, 22, 14, 22, 32, 42, 48, 40, 30, 20, 14, 24, 36, 44, 38, 28, 18];

export const ProductCard: React.FC<ProductCardProps> = ({
    id, title, subtitle, price, priceLabel, badge, badgeColor,
    deliveryType, features, image, onBuy,
}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: 20,
                overflow: "hidden",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                transition: "border-color 0.4s, box-shadow 0.4s",
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-primary)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(124,108,248,0.1)";
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
        >
            {/* Image */}
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "var(--bg-secondary)" }}>
                <img
                    src={image}
                    alt={title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7, transition: "transform 0.6s, opacity 0.3s" }}
                    onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.06)"; (e.target as HTMLImageElement).style.opacity = "0.9"; }}
                    onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; (e.target as HTMLImageElement).style.opacity = "0.7"; }}
                />

                {/* Waveform overlay */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                    <svg viewBox="0 0 200 52" style={{ width: "80%" }}>
                        {WAVE_HEIGHTS.map((h, i) => (
                            <rect key={i} x={i * 5 + 1} y={(52 - h) / 2} width="3" height={h} rx="1.5"
                                fill="#7c6cf8" fillOpacity={0.4 + (h / 52) * 0.55} />
                        ))}
                    </svg>
                </div>

                {/* Badge */}
                <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{ padding: "5px 12px", borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "white", background: badgeColor }}>
                        {badge}
                    </span>
                </div>

                {/* Delivery icon */}
                <div style={{ position: "absolute", top: 14, right: 14, padding: 8, borderRadius: 10, background: "rgba(22,22,31,0.8)", backdropFilter: "blur(8px)" }}>
                    {deliveryType === "pdf"
                        ? <FileImage size={16} color="var(--accent-secondary)" />
                        : <Printer size={16} color="var(--accent-warm)" />}
                </div>
            </div>

            {/* Body */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "24px 24px 28px" }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--accent-secondary)", marginBottom: 8 }}>{subtitle}</p>
                <h3 className="font-serif" style={{ fontSize: 20, color: "var(--text-primary)", marginBottom: 16, lineHeight: 1.3 }}>{title}</h3>

                <ul style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    {features.map((f) => (
                        <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text-secondary)" }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent-primary)", flexShrink: 0 }} />
                            {f}
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div>
                        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: 4 }}>{priceLabel}</p>
                        <p className="font-serif gradient-text-mono" style={{ fontSize: 24 }}>${price}</p>
                    </div>
                    <button
                        onClick={() => onBuy(id, title, String(price))}
                        className="btn-primary"
                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", fontSize: 12 }}
                    >
                        Order <ArrowRight size={13} />
                    </button>
                </div>
            </div>
        </div>
    );
};
