import React from 'react';
import { Button } from './Button';

export interface ProductCardProps {
    title: string;
    price: number;
    imageUrl: string;
    category?: string;
    className?: string;
}

export const ProductCard = ({ title, price, imageUrl, category, className = '' }: ProductCardProps) => {
    return (
        <div className={`group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-lg transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] ${className}`}>
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden bg-white/5 relative">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                {/* Subtle gradient overlay for text readability if needed later */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
                {category && (
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        {category}
                    </span>
                )}

                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold text-lg text-white leading-tight line-clamp-2">
                        {title}
                    </h3>
                    <span className="font-bold text-white whitespace-nowrap">
                        ${price.toFixed(2)}
                    </span>
                </div>

                {/* CTA - Appears on hover for desktop, always visible on mobile */}
                <div className="mt-2 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                    <Button variant="glass" className="w-full font-semibold">
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    );
};
