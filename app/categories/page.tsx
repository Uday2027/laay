export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Sparkles, ArrowRight } from "lucide-react";

async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">Browse</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-charcoal mb-4">Our Collections</h1>
          <div className="divider-gold mx-auto" />
          <p className="text-gray-400 font-light mt-6 max-w-md mx-auto">
            Explore our curated jewelry collections, each piece crafted with meticulous attention to detail
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group bg-gray-50 p-10 hover:bg-white hover:shadow-medium transition-all duration-500"
            >
              <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mb-8 group-hover:border-gold/30 transition-colors">
                <Sparkles className="w-7 h-7 text-gold/40 group-hover:text-gold transition-colors" strokeWidth={1} />
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-3">
                Collection {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-2xl font-serif text-charcoal group-hover:text-gold transition-colors mb-3">
                {category.name}
              </h2>
              <p className="text-gray-400 font-light text-sm mb-6 leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center gap-2 text-charcoal group-hover:text-gold transition-colors">
                <span className="text-sm tracking-wide">{category._count.products} pieces</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
