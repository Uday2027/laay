"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Sparkles, ArrowUpRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  featured: boolean;
  images: string;
  category: { name: string };
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-serif font-medium text-charcoal mb-1">Products</h1>
          <p className="text-gray-400 text-sm font-light">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 bg-charcoal text-white px-6 py-3 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Product</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Category</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Price</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Stock</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Status</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const images = JSON.parse(product.images || "[]");
              return (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {images[0] ? (
                          <Image src={images[0]} alt={product.name} width={48} height={64} className="object-cover w-full h-full" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-gold/30" strokeWidth={1} />
                        )}
                      </div>
                      <span className="text-sm text-charcoal font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-400 font-light">{product.category?.name}</td>
                  <td className="py-4 px-6 text-sm text-gold font-medium">৳{product.price.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-charcoal">{product.stock}</td>
                  <td className="py-4 px-6">
                    {product.featured ? (
                      <span className="px-3 py-1.5 bg-gold/10 text-gold text-[11px] tracking-wide border border-gold/20">Featured</span>
                    ) : (
                      <span className="text-gray-400 text-sm font-light">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="p-2 text-gray-300 hover:text-gold transition-colors"
                      >
                        <Pencil className="w-4 h-4" strokeWidth={1.5} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
