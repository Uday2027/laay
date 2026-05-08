"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

interface SiteConfig {
  id: string;
  siteTitle: string;
  bkashNumber: string;
  deliveryCharge: number;
}

export default function AdminSettings() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-config")
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setSaving(true);

    await fetch("/api/admin/site-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });

    setMessage("Settings saved successfully");
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-medium text-charcoal mb-1">Settings</h1>
        <p className="text-gray-400 text-sm font-light">Manage store configuration</p>
      </div>

      {message && (
        <div className="mb-8 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 max-w-xl space-y-8">
        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Site Title</label>
          <input
            type="text"
            value={config?.siteTitle || ""}
            onChange={(e) => setConfig(config ? { ...config, siteTitle: e.target.value } : null)}
            className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">bKash Number</label>
          <input
            type="text"
            value={config?.bkashNumber || ""}
            onChange={(e) => setConfig(config ? { ...config, bkashNumber: e.target.value } : null)}
            className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
            placeholder="01XXXXXXXXX"
          />
          <p className="text-xs text-gray-400 font-light mt-2">Customers will send delivery charge to this number</p>
        </div>

        <div>
          <label className="block text-[11px] tracking-[0.1em] uppercase text-gray-400 mb-2">Delivery Charge (৳)</label>
          <input
            type="number"
            value={config?.deliveryCharge || 100}
            onChange={(e) => setConfig(config ? { ...config, deliveryCharge: Number(e.target.value) } : null)}
            className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-3 bg-charcoal text-white px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all disabled:opacity-40"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
