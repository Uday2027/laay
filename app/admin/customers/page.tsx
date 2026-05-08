export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export default async function AdminCustomers() {
  const customers = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-medium text-charcoal mb-1">Customers</h1>
        <p className="text-gray-400 text-sm font-light">Registered members</p>
      </div>

      <div className="bg-white overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Name</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Email</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Orders</th>
              <th className="text-left py-4 px-6 text-[11px] tracking-[0.1em] uppercase text-gray-400 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-charcoal font-medium">{customer.name}</td>
                <td className="py-4 px-6 text-sm text-gray-400 font-light">{customer.email}</td>
                <td className="py-4 px-6 text-sm text-gold font-medium">{customer._count.orders}</td>
                <td className="py-4 px-6 text-sm text-gray-400 font-light">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
