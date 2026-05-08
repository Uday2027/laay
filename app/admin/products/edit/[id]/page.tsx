"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    featured: false,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch(`/api/admin/products/${id}`).then((r) => r.json()),
    ]).then(([cats, product]) => {
      setCategories(cats);
      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        price: String(product.price),
        stock: String(product.stock),
        categoryId: product.categoryId,
        featured: product.featured,
      });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    router.push("/admin/products");
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-8 transition-colors text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <h1 className="text-3xl font-serif font-medium text-charcoal mb-10">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 max-w-2xl space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 resize-none"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Price (৳)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              required
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="w-5 h-5 border-gray-300 text-gold focus:ring-gold/50"
          />
          <span className="text-sm text-charcoal">Featured Product</span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-3 bg-charcoal text-white px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all disabled:opacity-40"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
