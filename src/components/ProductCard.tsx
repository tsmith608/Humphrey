"use strict";
import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    category: string;
    image: string;
    onBuy: (id: string, title: string, price: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, category, image, onBuy }) => {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-3xl glass transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-white/20">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{category}</span>
                    <span className="text-sm font-bold text-white tracking-tight">{price}</span>
                </div>

                <h3 className="mb-6 text-xl font-medium text-white line-clamp-2 leading-tight">
                    {title}
                </h3>

                <div className="mt-auto pt-4 border-t border-white/5 flex gap-3">
                    <button
                        onClick={() => onBuy(id, title, price)}
                        className="flex-1 rounded-2xl gradient-bg py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        Buy Now
                        <ArrowUpRight className="h-4 w-4" />
                    </button>
                    <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                        <span className="sr-only">Details</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
