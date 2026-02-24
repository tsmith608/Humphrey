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
        <div className="group relative flex flex-col overflow-hidden bg-white/40 soft-shadow transition-all duration-500 hover:scale-[1.01]">
            <div className="aspect-[4/5] overflow-hidden relative">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3728]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#fcf9f5]/80 backdrop-blur-sm border border-[#ece4d9] text-[9px] font-black uppercase tracking-[0.2em] text-[#8c7e6d]">
                        {category}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-8 bg-[#fcf9f5]/50 backdrop-blur-sm border-x border-b border-[#ece4d9]">
                <h3 className="mb-4 font-serif text-2xl italic text-[#4a3728] line-clamp-2 leading-[1.2]">
                    {title}
                </h3>

                <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-[#ece4d9]/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#b4a99d] mb-1">Moment</span>
                        <span className="text-xl font-serif text-[#4a3728] tracking-tight">${price}</span>
                    </div>
                    <button
                        onClick={() => onBuy(id, title, price)}
                        className="p-3 border border-[#4a3728] text-[#4a3728] transition-all hover:bg-[#4a3728] hover:text-white group/btn"
                    >
                        <ArrowUpRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
