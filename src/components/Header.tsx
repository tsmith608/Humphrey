import { Heart, ShoppingBag, AudioLines } from "lucide-react";

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 z-50 w-full glass-nav transition-all duration-500">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl gradient-bg shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Heart className="h-5 w-5 text-white fill-white" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                        EchoHeart
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    <a href="#" className="hover:text-red-500 transition-colors">Gifts</a>
                    <a href="#" className="hover:text-red-500 transition-colors">How it Works</a>
                    <a href="#" className="hover:text-red-500 transition-colors">Occasions</a>
                </nav>

                <div className="flex items-center gap-6">
                    <button className="relative p-2 text-zinc-400 hover:text-red-500 transition-all duration-300 hover:scale-110">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -top-0 -right-0 flex h-4 w-4 items-center justify-center rounded-full gradient-bg text-[9px] font-black text-white animate-pulse">
                            0
                        </span>
                    </button>
                    <button className="hidden sm:block rounded-full bg-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-black hover:bg-zinc-200 transition-all hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                        Create Gift
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
