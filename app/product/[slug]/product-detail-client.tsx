"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Sparkles, Minus, Plus, ShoppingBag, ArrowLeft, Check, Star, Truck, Shield } from "lucide-react";

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const images = JSON.parse(product.images || "[]");

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: images[0] || "",
      categoryId: product.categoryId,
      categoryName: product.category?.name || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 pt-32">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 text-sm text-gray-400 mb-12">
        <Link href="/products" className="hover:text-charcoal transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to Collection
        </Link>
        <span>/</span>
        <Link href={`/products?category=${product.category?.slug}`} className="hover:text-charcoal transition-colors">
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-24">
        {/* Image */}
        <div className="relative">
          <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
            {images[0] ? (
              <Image
                src={images[0]}
                alt={product.name}
                width={600}
                height={800}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Sparkles className="w-20 h-20 text-gold/20" strokeWidth={1} />
              </div>
            )}
          </div>
          {/* Decorative corners */}
          <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-gold/20" />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-gold/20" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold font-medium mb-4">
            {product.category?.name}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-charcoal mb-6">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <p className="text-3xl font-serif text-charcoal">
              ৳{product.price.toLocaleString()}
            </p>
            {product.stock <= 3 && product.stock > 0 && (
              <span className="text-[11px] tracking-wide text-gold">Only {product.stock} left</span>
            )}
            {product.stock === 0 && (
              <span className="text-[11px] tracking-wide text-gray-400">Out of Stock</span>
            )}
          </div>

          <div className="w-12 h-px bg-gold mb-8" />

          <p className="text-gray-400 leading-relaxed font-light mb-10">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-6 mb-8">
            <span className="text-sm text-gray-600 tracking-wide uppercase">Quantity</span>
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" strokeWidth={1} />
              </button>
              <span className="w-12 text-center font-serif text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-4 hover:bg-gray-50 transition-colors"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" strokeWidth={1} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || added}
            className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-5 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all duration-300 disabled:opacity-40 mb-8"
          >
            {added ? (
              <>
                <Check className="w-5 h-5" strokeWidth={1.5} />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                Add to Cart — ৳{(product.price * quantity).toLocaleString()}
              </>
            )}
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 py-8 border-t border-gray-100">
            <div className="text-center">
              <Truck className="w-5 h-5 text-gold mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[11px] text-gray-400 tracking-wide">Free Delivery</p>
            </div>
            <div className="text-center">
              <Shield className="w-5 h-5 text-gold mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[11px] text-gray-400 tracking-wide">Authentic</p>
            </div>
            <div className="text-center">
              <Star className="w-5 h-5 text-gold mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-[11px] text-gray-400 tracking-wide">Member 5% Off</p>
            </div>
          </div>

          {/* Discount info */}
          <div className="mt-8 p-6 bg-gray-50 space-y-3">
            <p className="text-sm text-gray-600">
              <span className="text-gold font-medium">Member Discount:</span> Log in and save 5%
            </p>
            <p className="text-sm text-gray-600">
              <span className="text-gold font-medium">Bulk Discount:</span> Buy 3+ same category, save 15%
            </p>
            <p className="text-sm text-gray-600">
              <span className="text-gold font-medium">bKash Advance:</span> Pay delivery charge upfront, save 10%
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-20">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">You May Also Like</p>
            <h2 className="text-3xl font-serif font-medium text-charcoal">Complete the Look</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((p) => {
              const pImages = JSON.parse(p.images || "[]");
              return (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="aspect-[3/4] bg-gray-50 overflow-hidden mb-4">
                    {pImages[0] ? (
                      <Image
                        src={pImages[0]}
                        alt={p.name}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full img-zoom"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Sparkles className="w-8 h-8 text-gold/20" strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-sm text-charcoal group-hover:text-gold transition-colors mb-1">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-light">৳{p.price.toLocaleString()}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
