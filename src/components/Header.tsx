import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from './Button';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Mobile Menu & Logo */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="md:hidden !px-2">
                        <Menu className="w-5 h-5" />
                    </Button>
                    <a href="/" className="text-xl font-bold tracking-tighter text-white">
                        HUMPHREY
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Products</a>
                    <a href="/collections" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Collections</a>
                    <a href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</a>
                </nav>

                {/* Actions (Cart) */}
                <div className="flex items-center gap-2">
                    <Button variant="glass" size="sm" className="relative !px-3">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        <span className="text-sm">Cart</span>
                        {/* Mock cart badge */}
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black border border-black hover:scale-110 transition-transform">
                            2
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    );
};
