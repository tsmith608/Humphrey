import { ArrowUpRight, Play } from "lucide-react";

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
        <div className="group relative flex flex-col overflow-hidden rounded-[2rem] glass glass-hover transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white">
                        {category}
                    </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150 group-hover:scale-100">
                    <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-8">
                <h3 className="mb-6 text-xl font-bold text-white line-clamp-2 leading-[1.2] group-hover:text-red-400 transition-colors duration-300">
                    {title}
                </h3>

                <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Moment</span>
                        <span className="text-2xl font-black text-white tracking-tighter">${price}</span>
                    </div>
                    <button
                        onClick={() => onBuy(id, title, price)}
                        className="rounded-2xl gradient-bg p-4 text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 group/btn"
                    >
                        <ArrowUpRight className="h-5 w-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};
