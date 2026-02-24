"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Loader2, Download, CreditCard, ShieldCheck } from "lucide-react";
import { useCheckout } from "../context/CheckoutContext";

type CheckoutState = "info" | "processing" | "success";

export default function CheckoutModal() {
    const { isOpen, selectedProduct, closeCheckout } = useCheckout();
    const [state, setState] = useState<CheckoutState>("info");

    useEffect(() => {
        if (isOpen) {
            setState("info");
        }
    }, [isOpen]);

    const handleCheckout = () => {
        setState("processing");
        // Simulate payment processing
        setTimeout(() => {
            setState("success");
            triggerDownload();
        }, 2500);
    };

    const triggerDownload = () => {
        const link = document.createElement("a");
        link.href = "/sample.pdf";
        link.download = "humphrey-asset.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isOpen || !selectedProduct) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={state !== "processing" ? closeCheckout : undefined}
            />

            <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all">
                {/* Animated Background Glow */}
                <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-red-600/20 blur-[80px]" />
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-rose-600/20 blur-[80px]" />

                <div className="relative p-8">
                    <button
                        onClick={closeCheckout}
                        disabled={state === "processing"}
                        className="absolute right-6 top-6 rounded-full p-2 text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {state === "info" && (
                        <div className="mt-4">
                            <h2 className="text-3xl font-bold text-white mb-2">Checkout</h2>
                            <p className="text-zinc-400 mb-8">Secure your timeless memory.</p>

                            <div className="rounded-2xl bg-white/5 p-6 mb-8 border border-white/5">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-1">Moment</h4>
                                        <p className="text-lg font-medium text-white">{selectedProduct.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-1">Total</h4>
                                        <p className="text-2xl font-bold gradient-text">${selectedProduct.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <ShieldCheck className="h-5 w-5 text-red-500" />
                                    Secure SSL Encryption
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-400">
                                    <CreditCard className="h-5 w-5 text-red-500" />
                                    Instant PDF Gift Delivery
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full rounded-2xl gradient-bg py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:opacity-90 active:scale-[0.98]"
                            >
                                Complete Payment
                            </button>
                        </div>
                    )}

                    {state === "processing" && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl animate-pulse" />
                                <Loader2 className="h-16 w-16 text-red-500 animate-spin relative" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Processing Your Gift</h2>
                            <p className="text-zinc-400">Please do not refresh the page...</p>
                        </div>
                    )}

                    {state === "success" && (
                        <div className="mt-4 text-center">
                            <div className="flex justify-center mb-8">
                                <div className="rounded-full bg-green-500/20 p-4">
                                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">It's Ready!</h2>
                            <p className="text-zinc-400 mb-8">Your heart's echo has been captured. Your download has started automatically.</p>

                            <div className="rounded-2xl bg-green-500/5 p-6 mb-8 border border-green-500/10 flex items-center gap-4 text-left">
                                <Download className="h-8 w-8 text-green-500" />
                                <div>
                                    <p className="text-sm font-bold text-white">EchoHeart-Portrait.pdf</p>
                                    <p className="text-xs text-zinc-500 text-uppercase tracking-widest font-bold">Timeless Memory</p>
                                </div>
                            </div>

                            <button
                                onClick={closeCheckout}
                                className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition-all hover:bg-zinc-200"
                            >
                                Back to Store
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
