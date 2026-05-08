"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  name: string;
  phone: string;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  orderItems: { name: string; quantity: number }[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-medium text-charcoal mb-1">Orders</h1>
        <p className="text-gray-400 text-sm font-light">Manage customer orders</p>
      </div>

      <div className="bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Order</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Customer</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Items</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Total</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Payment</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Status</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm font-mono text-charcoal">{order.id.slice(0, 8)}</td>
                <td className="py-4 px-6 text-sm text-charcoal">
                  <div className="font-medium">{order.name}</div>
                  <div className="text-gray-400 text-xs font-light">{order.phone}</div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-400 font-light">
                  {order.orderItems.map((item, i) => (
                    <div key={i}>{item.name} x{item.quantity}</div>
                  ))}
                </td>
                <td className="py-4 px-6 text-sm text-gold font-medium">৳{order.total.toLocaleString()}</td>
                <td className="py-4 px-6 text-sm text-gray-400 font-light">{order.paymentMethod}</td>
                <td className="py-4 px-6">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="px-3 py-2 bg-gray-50 border-0 text-xs focus:outline-none focus:ring-1 focus:ring-gold/50"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
                <td className="py-4 px-6 text-sm text-gray-400 font-light">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
