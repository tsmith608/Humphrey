import React from "react";
import { ShoppingBag } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 z-50 w-full bg-[#fcf9f5]/80 backdrop-blur-md border-b border-[#ece4d9] transition-all duration-500">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <span className="text-3xl font-serif tracking-tight text-[#4a3728] lowercase italic">
                        humphrey
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-10 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8c7e6d]">
                    <a href="#" className="hover:text-[#4a3728] transition-colors">Story</a>
                    <a href="#" className="hover:text-[#4a3728] transition-colors">Details</a>
                    <a href="#" className="hover:text-[#4a3728] transition-colors">Registry</a>
                    <a href="#" className="hover:text-[#4a3728] transition-colors">RSVP</a>
                </nav>

                <div className="flex items-center gap-6">
                    <button className="relative p-2 text-[#8c7e6d] hover:text-[#4a3728] transition-all duration-300">
                        <ShoppingBag className="h-5 w-5 stroke-1" />
                    </button>
                </div>
            </div>
        </header>
    );
}
