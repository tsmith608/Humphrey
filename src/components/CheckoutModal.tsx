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
                className="absolute inset-0 bg-[#4a3728]/10 backdrop-blur-sm"
                onClick={state !== "processing" ? closeCheckout : undefined}
            />

            <div className="relative w-full max-w-lg overflow-hidden bg-[#fcf9f5] soft-shadow border border-[#ece4d9] transition-all">
                <div className="relative p-8 sm:p-12">
                    <button
                        onClick={closeCheckout}
                        disabled={state === "processing"}
                        className="absolute right-6 top-6 p-2 text-[#8c7e6d] hover:text-[#4a3728] transition-colors"
                    >
                        <X className="h-5 w-5 stroke-1" />
                    </button>

                    {state === "info" && (
                        <div className="mt-4">
                            <h2 className="font-serif text-4xl text-[#4a3728] mb-2 lowercase">checkout</h2>
                            <p className="text-[#8c7e6d] text-[11px] font-medium uppercase tracking-[0.2em] mb-12">Secure your timeless memory</p>

                            <div className="bg-[#f8f4f0] p-8 mb-10 border border-[#ece4d9]">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-medium text-[#b4a99d] uppercase tracking-[0.2em] mb-2">Selected Moment</h4>
                                        <p className="font-serif text-xl italic text-[#4a3728]">{selectedProduct.name}</p>
                                    </div>
                                    <div className="pt-6 border-t border-[#ece4d9]">
                                        <h4 className="text-[10px] font-medium text-[#b4a99d] uppercase tracking-[0.2em] mb-2">Total Value</h4>
                                        <p className="font-serif text-3xl text-[#4a3728] tracking-tight">${selectedProduct.price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8c7e6d]">
                                    <ShieldCheck className="h-4 w-4 text-[#4a3728]" />
                                    Secure SSL Encryption
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8c7e6d]">
                                    <CreditCard className="h-4 w-4 text-[#4a3728]" />
                                    Instant PDF Gift Delivery
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-[#4a3728] text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#5c4a3c] active:scale-[0.98]"
                            >
                                Complete Payment
                            </button>
                        </div>
                    )}

                    {state === "processing" && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Loader2 className="h-12 w-12 text-[#4a3728] animate-spin mb-8 stroke-1" />
                            <h2 className="font-serif text-3xl text-[#4a3728] mb-4 lowercase italic">processing your gift</h2>
                            <p className="text-[#8c7e6d] text-[10px] font-medium uppercase tracking-[0.2em]">Please do not refresh the page</p>
                        </div>
                    )}

                    {state === "success" && (
                        <div className="mt-4 text-center">
                            <div className="flex justify-center mb-10">
                                <CheckCircle2 className="h-16 w-16 text-[#4a3728] stroke-1" />
                            </div>
                            <h2 className="font-serif text-4xl text-[#4a3728] mb-4 lowercase">it's ready</h2>
                            <p className="text-[#5c4a3c] text-sm leading-relaxed mb-12 font-light">Your heart's echo has been captured. Your download has started automatically.</p>

                            <div className="bg-[#f8f4f0] p-6 mb-12 border border-[#ece4d9] flex items-center gap-5 text-left">
                                <Download className="h-8 w-8 text-[#4a3728] stroke-1" />
                                <div>
                                    <p className="font-serif text-lg text-[#4a3728] italic">EchoHeart-Portrait.pdf</p>
                                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8c7e6d]">Timeless Memory</p>
                                </div>
                            </div>

                            <button
                                onClick={closeCheckout}
                                className="w-full border border-[#4a3728] py-5 text-[11px] font-black uppercase tracking-[0.3em] text-[#4a3728] transition-all hover:bg-[#4a3728] hover:text-white"
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
