import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";

const mockProducts = [
  {
    id: 1,
    title: "The Design System Handbook",
    price: 19.99,
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Advanced React Strategies",
    price: 24.99,
    category: "Engineering",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Next.js Performance Guide",
    price: 29.99,
    category: "Engineering",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Mastering Tailwind CSS",
    price: 14.99,
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Figma to Code: The Complete Guide",
    price: 39.99,
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Building Glassmorphism UIs",
    price: 19.99,
    category: "Engineering",
    imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2787&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30 pb-20">
      <Header />

      <main className="container mx-auto px-4 max-w-7xl pt-16 sm:pt-24">
        {/* Hero Section */}
        <section className="text-center space-y-8 mb-24 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">
            Elevate Your Edge
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover premium digital assets, guides, and tools crafted specifically
            for modern creators and developers building the future of the web.
          </p>
          <div className="flex justify-center flex-wrap gap-4 pt-4 relative z-10">
            <Button size="lg" className="font-semibold text-black bg-white hover:bg-gray-200">
              Explore Catalog
            </Button>
            <Button variant="glass" size="lg" className="font-semibold">
              Learn More
            </Button>
          </div>
        </section>

        {/* Product Grid */}
        <section id="products">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Latest Releases</h2>
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                category={product.category}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>
    </div>
  );
}
