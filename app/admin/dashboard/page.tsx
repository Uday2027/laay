import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Package, Users, ShoppingCart, DollarSign, ArrowUpRight } from "lucide-react";

async function getStats() {
  const [totalProducts, totalOrders, totalCustomers, totalRevenue] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  return {
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue: totalRevenue._sum.total || 0,
  };
}

async function getRecentOrders() {
  return prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { orderItems: true },
  });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentOrders = await getRecentOrders();

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-medium text-charcoal mb-2">Dashboard</h1>
        <p className="text-gray-400 font-light text-sm">Overview of your store performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={Package} label="Products" value={stats.totalProducts} href="/admin/products" />
        <StatCard icon={ShoppingCart} label="Orders" value={stats.totalOrders} href="/admin/orders" />
        <StatCard icon={Users} label="Customers" value={stats.totalCustomers} href="/admin/customers" />
        <StatCard icon={DollarSign} label="Revenue" value={`৳${stats.totalRevenue.toLocaleString()}`} href="/admin/orders" />
      </div>

      <div className="bg-white p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-serif font-medium text-charcoal">Recent Orders</h2>
            <p className="text-gray-400 text-sm font-light mt-1">Latest customer orders</p>
          </div>
          <Link href="/admin/orders" className="text-gold hover:text-gold-dark text-sm font-medium flex items-center gap-1 transition-colors">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Order</th>
                <th className="text-left py-4 px-4 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Customer</th>
                <th className="text-left py-4 px-4 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Total</th>
                <th className="text-left py-4 px-4 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-4 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-charcoal font-mono">{order.id.slice(0, 8)}</td>
                  <td className="py-4 px-4 text-sm text-charcoal">{order.name}</td>
                  <td className="py-4 px-4 text-sm text-gold font-medium">৳{order.total.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-400 font-light">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: any;
  label: string;
  value: string | number;
  href: string;
}) {
  return (
    <Link href={href} className="bg-white p-8 hover:shadow-medium transition-shadow group">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 border border-gray-200 flex items-center justify-center group-hover:border-gold/30 transition-colors">
          <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
        </div>
        <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors" />
      </div>
      <p className="text-gray-400 text-[11px] tracking-[0.1em] uppercase mb-2">{label}</p>
      <p className="text-3xl font-serif text-charcoal">{value}</p>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border border-amber-200",
    PROCESSING: "bg-blue-50 text-blue-700 border border-blue-200",
    SHIPPED: "bg-purple-50 text-purple-700 border border-purple-200",
    DELIVERED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    CANCELLED: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <span className={`px-3 py-1.5 text-[11px] tracking-wide font-medium ${colors[status] || "bg-gray-50 text-gray-700 border border-gray-200"}`}>
      {status}
    </span>
  );
}
