import Link from "next/link";
import { LayoutDashboard, Package, Grid3X3, ShoppingCart, Users, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: Grid3X3 },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-charcoal min-h-screen sticky top-0">
          <div className="p-8">
            <Link href="/" className="text-gold text-xl font-serif font-medium tracking-wide">
              LAAE
            </Link>
            <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase mt-1">Admin Panel</p>
          </div>
          <nav className="px-4 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-5 py-3.5 text-gray-400 hover:text-gold hover:bg-white/5 rounded-sm transition-all text-sm"
              >
                <item.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="font-light tracking-wide">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="px-8 pt-8 mt-auto border-t border-gray-800">
            <Link href="/" className="text-gray-500 hover:text-gold text-sm transition-colors flex items-center gap-2">
              <span className="tracking-wide">View Store</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
