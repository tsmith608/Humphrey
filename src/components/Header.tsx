"use strict";
import React from "react";
import { Zap, ShoppingBag } from "lucide-react";

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 z-50 w-full glass">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
                        <Zap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase italic">
                        Humphrey
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                    <a href="#" className="hover:text-white transition-colors">Marketplace</a>
                    <a href="#" className="hover:text-white transition-colors">Templates</a>
                    <a href="#" className="hover:text-white transition-colors">Resources</a>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
                        <ShoppingBag className="h-6 w-6" />
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full gradient-bg text-[10px] font-bold text-white">
                            0
                        </span>
                    </button>
                    <button className="hidden sm:block rounded-full bg-white px-5 py-2 text-xs font-bold text-black hover:bg-zinc-200 transition-colors">
                        Connect Wallet
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
