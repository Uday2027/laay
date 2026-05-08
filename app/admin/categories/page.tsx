"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editing ? `/api/admin/categories/${editing.id}` : "/api/admin/categories";
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", slug: "", description: "" });
    setEditing(null);
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-medium text-charcoal mb-1">Categories</h1>
        <p className="text-gray-400 text-sm font-light">Manage product collections</p>
      </div>

      <div className="bg-white p-8 mb-10">
        <h2 className="text-lg font-serif font-medium text-charcoal mb-6">
          {editing ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Name</label>
            <input
              type="text"
              placeholder="Category name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              required
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Slug</label>
            <input
              type="text"
              placeholder="category-slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Description</label>
            <input
              type="text"
              placeholder="Optional description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
            />
          </div>
          <div className="md:col-span-3 flex gap-4">
            <button
              type="submit"
              className="flex items-center gap-3 bg-charcoal text-white px-6 py-3 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all"
            >
              <Plus className="w-4 h-4" />
              {editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => { setEditing(null); setForm({ name: "", slug: "", description: "" }); }}
                className="px-6 py-3 border border-gray-200 text-sm tracking-[0.1em] uppercase text-gray-400 hover:text-charcoal hover:border-charcoal transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Name</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Slug</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Description</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-charcoal font-medium">{cat.name}</td>
                <td className="py-4 px-6 text-sm text-gray-400 font-light">{cat.slug}</td>
                <td className="py-4 px-6 text-sm text-gray-400 font-light">{cat.description || "—"}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setEditing(cat); setForm({ name: cat.name, slug: cat.slug, description: cat.description || "" }); }}
                      className="p-2 text-gray-300 hover:text-gold transition-colors"
                    >
                      <Pencil className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
