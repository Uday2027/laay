"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, Sparkles, ShoppingBag, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (search) params.set("search", search);

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        let sorted = [...data];
        if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
        setProducts(sorted);
        setLoading(false);
      });
  }, [selectedCategory, search, sortBy]);

  const handleAddToCart = (product: any) => {
    const images = JSON.parse(product.images || "[]");
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: images[0] || "",
      categoryId: product.categoryId,
      categoryName: product.category?.name || "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 pt-32">
      {/* Page Header */}
      <div className="text-center mb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">
          {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : "All Pieces"}
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-charcoal mb-4">
          {selectedCategory ? categories.find(c => c.slug === selectedCategory)?.name : "The Collection"}
        </h1>
        <div className="divider-gold mx-auto" />
        <p className="text-gray-400 mt-6 font-light max-w-md mx-auto">
          Each piece is thoughtfully designed and meticulously crafted for the discerning individual
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12 pb-8 border-b border-gray-100">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" strokeWidth={1.5} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none px-5 pr-10 py-3 bg-gray-50 border-0 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gold/50 cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-5 pr-10 py-3 bg-gray-50 border-0 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gold/50 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-100 mb-5" />
              <div className="h-4 bg-gray-100 w-2/3 mx-auto mb-2" />
              <div className="h-3 bg-gray-100 w-1/3 mx-auto" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <SlidersHorizontal className="w-10 h-10 text-gray-200 mx-auto mb-6" strokeWidth={1} />
          <h3 className="text-xl font-serif text-charcoal mb-2">No products found</h3>
          <p className="text-gray-400 font-light">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const images = JSON.parse(product.images || "[]");
            return (
              <div key={product.id} className="group">
                <Link href={`/product/${product.slug}`}>
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-5">
                    {images[0] ? (
                      <Image
                        src={images[0]}
                        alt={product.name}
                        width={400}
                        height={533}
                        className="object-cover w-full h-full img-zoom"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Sparkles className="w-10 h-10 text-gold/20" strokeWidth={1} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] tracking-[0.2em] text-gray-300 font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2">{product.category?.name}</p>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-sm text-gray-400 font-light">৳{product.price.toLocaleString()}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                      className="p-2 text-gray-300 hover:text-gold transition-colors disabled:opacity-30"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                  {product.stock <= 3 && product.stock > 0 && (
                    <p className="text-[11px] text-gold mt-2 tracking-wide">Only {product.stock} remaining</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
