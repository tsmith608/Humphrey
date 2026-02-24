"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Loader2, Download, CreditCard, ShieldCheck, Upload, Music, FileImage, Printer } from "lucide-react";
import { useCheckout } from "../context/CheckoutContext";

type CheckoutState = "upload" | "options" | "payment" | "processing" | "success";

export default function CheckoutModal() {
    const { isOpen, selectedProduct, closeCheckout } = useCheckout();
    const [state, setState] = useState<CheckoutState>("upload");
    const [fileName, setFileName] = useState<string | null>(null);
    const [format, setFormat] = useState<"pdf" | "print">("pdf");
    const [cardNum, setCardNum] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [email, setEmail] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setState("upload");
            setFileName(null);
            setCardNum(""); setCardExp(""); setCardCvv(""); setEmail("");
        }
    }, [isOpen]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFileName(file.name);
    };

    const handleCheckout = () => {
        setState("processing");
        setTimeout(() => {
            setState("success");
            if (format === "pdf") triggerDownload();
        }, 2800);
    };

    const triggerDownload = () => {
        const link = document.createElement("a");
        link.href = "/sample.pdf";
        link.download = "humphrey-soundwave.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatCardNum = (v: string) =>
        v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

    const formatExp = (v: string) =>
        v.replace(/\D/g, "").slice(0, 4).replace(/^(.{2})(.+)/, "$1/$2");

    if (!isOpen || !selectedProduct) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={state !== "processing" ? closeCheckout : undefined}
            />

            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-card border border-[var(--border-subtle)] shadow-2xl shadow-black/60">
                {/* Header bar */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3">
                        {/* Mini waveform */}
                        <div className="flex items-end gap-[2px] h-5">
                            {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 1, 0.7, 0.3].map((h, i) => (
                                <span key={i} className="wave-bar" style={{ height: `${h * 16}px`, animationDelay: `${i * 0.1}s` }} />
                            ))}
                        </div>
                        <span className="font-serif italic text-lg text-[var(--text-primary)]">humphrey</span>
                    </div>
                    <button
                        onClick={closeCheckout}
                        disabled={state === "processing"}
                        className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-elevated)]"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Progress steps */}
                {state !== "processing" && state !== "success" && (
                    <div className="flex items-center gap-2 px-8 py-4 border-b border-[var(--border-subtle)]">
                        {(["upload", "options", "payment"] as CheckoutState[]).map((s, i) => (
                            <React.Fragment key={s}>
                                <div className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${state === s ? "text-[var(--accent-secondary)]" : ["upload", "options", "payment"].indexOf(state as string) > i ? "text-[var(--text-muted)]" : "text-[var(--text-muted)]"}`}>
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${state === s ? "bg-[var(--accent-primary)] text-white" : ["upload", "options", "payment"].indexOf(state as string) > i ? "bg-[var(--bg-elevated)] text-[var(--text-muted)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"}`}>{i + 1}</span>
                                    {s === "upload" ? "Audio" : s === "options" ? "Format" : "Payment"}
                                </div>
                                {i < 2 && <div className="flex-1 h-px bg-[var(--border-subtle)]" />}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                <div className="p-8">
                    {/* STEP 1 — Upload */}
                    {state === "upload" && (
                        <div>
                            <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-1">Upload Your Audio</h2>
                            <p className="text-[12px] text-[var(--text-secondary)] mb-8 tracking-wide">We accept MP3, WAV, M4A, OGG — up to 50MB</p>

                            <div
                                className="upload-zone flex flex-col items-center justify-center gap-4 py-14 px-6 text-center cursor-pointer mb-8"
                                onClick={() => fileRef.current?.click()}
                            >
                                <div className="p-4 rounded-full bg-[var(--accent-glow)] border border-[var(--border-medium)]">
                                    <Upload className="h-7 w-7 text-[var(--accent-secondary)]" />
                                </div>
                                {fileName ? (
                                    <>
                                        <Music className="h-4 w-4 text-[var(--accent-primary)]" />
                                        <p className="text-sm font-medium text-[var(--text-primary)]">{fileName}</p>
                                        <p className="text-[11px] text-[var(--text-secondary)]">Click to change file</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-medium text-[var(--text-primary)]">Drop your audio here</p>
                                        <p className="text-[11px] text-[var(--text-secondary)]">or click to browse</p>
                                    </>
                                )}
                                <input ref={fileRef} type="file" accept=".mp3,.wav,.m4a,.ogg,audio/*" className="hidden" onChange={handleFile} />
                            </div>

                            <div className="mb-6">
                                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                                    Your Message (optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Happy Birthday, Dad — Love always"
                                    className="form-input"
                                />
                            </div>

                            <button
                                onClick={() => setState("options")}
                                disabled={!fileName}
                                className="w-full btn-primary py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* STEP 2 — Format */}
                    {state === "options" && (
                        <div>
                            <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-1">Choose Your Format</h2>
                            <p className="text-[12px] text-[var(--text-secondary)] mb-8 tracking-wide">How should your soundwave portrait be delivered?</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {([
                                    { value: "pdf", label: "Digital PDF", desc: "Instant download, print at home", icon: FileImage, color: "var(--accent-secondary)" },
                                    { value: "print", label: "Print on Demand", desc: "Shipped to your door in 5–7 days", icon: Printer, color: "var(--accent-warm)" },
                                ] as const).map(({ value, label, desc, icon: Icon, color }) => (
                                    <button
                                        key={value}
                                        onClick={() => setFormat(value)}
                                        className={`relative flex flex-col items-start gap-3 p-5 rounded-xl border-2 transition-all duration-200 text-left ${format === value ? "border-[var(--accent-primary)] bg-[var(--accent-glow)]" : "border-[var(--border-subtle)] hover:border-[var(--border-medium)] bg-[var(--bg-elevated)]"}`}
                                    >
                                        {format === value && (
                                            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]" />
                                        )}
                                        <div className="p-2.5 rounded-lg" style={{ background: `${color}18` }}>
                                            <Icon className="h-5 w-5" style={{ color }} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[13px] text-[var(--text-primary)] mb-0.5">{label}</p>
                                            <p className="text-[11px] text-[var(--text-secondary)]">{desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Order summary */}
                            <div className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-5 mb-8">
                                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-3">Order Summary</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-serif text-base text-[var(--text-primary)] italic">{selectedProduct.name}</p>
                                    <p className="font-serif text-xl gradient-text-mono">${selectedProduct.price}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => setState("upload")} className="btn-ghost flex-1 py-3.5">Back</button>
                                <button onClick={() => setState("payment")} className="btn-primary flex-1 py-3.5">Continue</button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3 — Payment */}
                    {state === "payment" && (
                        <div>
                            <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-1">Payment</h2>
                            <p className="text-[12px] text-[var(--text-secondary)] mb-8 tracking-wide">Secured by 256-bit SSL encryption</p>

                            <div className="flex flex-col gap-4 mb-8">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardNum}
                                        onChange={e => setCardNum(formatCardNum(e.target.value))}
                                        className="form-input"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Expiry</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={cardExp}
                                            onChange={e => setCardExp(formatExp(e.target.value))}
                                            className="form-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="•••"
                                            value={cardCvv}
                                            onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-8 text-[11px] text-[var(--text-muted)]">
                                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-primary)]" />SSL Secured</span>
                                <span className="flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5 text-[var(--accent-primary)]" />Visa · MC · Amex</span>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => setState("options")} className="btn-ghost flex-1 py-3.5">Back</button>
                                <button
                                    onClick={handleCheckout}
                                    disabled={!email || cardNum.length < 19 || cardExp.length < 5 || cardCvv.length < 3}
                                    className="btn-primary flex-1 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Pay ${selectedProduct.price}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Processing */}
                    {state === "processing" && (
                        <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full border-2 border-[var(--border-subtle)] flex items-center justify-center">
                                    <Loader2 className="h-7 w-7 text-[var(--accent-primary)] animate-spin" />
                                </div>
                                <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 30px var(--accent-primary)", opacity: 0.3 }} />
                            </div>
                            <div>
                                <h2 className="font-serif text-3xl text-[var(--text-primary)] mb-2">Crafting your soundwave…</h2>
                                <p className="text-[12px] text-[var(--text-secondary)] tracking-wide">Please keep this window open</p>
                            </div>
                        </div>
                    )}

                    {/* Success */}
                    {state === "success" && (
                        <div className="flex flex-col items-center text-center gap-6 py-4">
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-[var(--accent-glow)]" />
                                <CheckCircle2 className="h-10 w-10 text-[var(--accent-secondary)] relative z-10" />
                            </div>
                            <div>
                                <h2 className="font-serif text-4xl text-[var(--text-primary)] mb-2">It's ready!</h2>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs mx-auto">
                                    Your soundwave portrait has been created. {format === "pdf" ? "Your download has started automatically." : "We'll ship your print within 5–7 business days."}
                                </p>
                            </div>

                            <div className="w-full rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] p-5 flex items-center gap-4 text-left">
                                <div className="p-3 rounded-lg bg-[var(--accent-glow)]">
                                    {format === "pdf" ? <Download className="h-5 w-5 text-[var(--accent-secondary)]" /> : <Printer className="h-5 w-5 text-[var(--accent-warm)]" />}
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-[var(--text-primary)]">
                                        {format === "pdf" ? "humphrey-soundwave.pdf" : "Print order confirmed"}
                                    </p>
                                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                                        {format === "pdf" ? "Delivered instantly" : "Arriving in 5–7 days"}
                                    </p>
                                </div>
                            </div>

                            <button onClick={closeCheckout} className="w-full btn-ghost py-4">
                                Back to Store
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
