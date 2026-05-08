"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";
import { calculateDiscounts } from "@/lib/discount";
import Image from "next/image";
import { Sparkles, Check, Loader2, ChevronRight } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, clearCart, getSubtotal } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BKASH">("COD");
  const [bkashRef, setBkashRef] = useState("");
  const [name, setName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = getSubtotal();
  const discountResult = calculateDiscounts(items, !!session, paymentMethod);
  const deliveryCharge = 100;

  if (items.length === 0 && !orderPlaced) {
    router.push("/products");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          total: discountResult.total + deliveryCharge,
          discountBreakdown: discountResult.breakdown,
          paymentMethod,
          bkashRef: paymentMethod === "BKASH" ? bkashRef : null,
          deliveryCharge,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderId(data.id);
        setOrderPlaced(true);
        clearCart();
      }
    } catch (error) {
      console.error("Order error:", error);
    }

    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-32 text-center">
        <div className="w-16 h-16 border border-gold flex items-center justify-center mx-auto mb-8">
          <Check className="w-8 h-8 text-gold" strokeWidth={1.5} />
        </div>
        <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4 font-medium">Thank You</p>
        <h1 className="text-4xl font-serif font-medium text-charcoal mb-4">Order Confirmed</h1>
        <p className="text-gray-400 font-light mb-2">Your order has been received and is being processed.</p>
        <p className="text-charcoal font-medium mb-10 font-mono text-sm">Order ID: {orderId.slice(0, 8)}</p>
        <p className="text-sm text-gray-400 font-light mb-12 max-w-md mx-auto">
          {paymentMethod === "COD"
            ? "Your order will be delivered soon. Please keep cash ready for payment on delivery."
            : "We will verify your bKash payment and process your order shortly."}
        </p>
        <button
          onClick={() => router.push("/products")}
          className="btn-primary inline-flex items-center gap-3"
        >
          Continue Shopping
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 pt-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-medium text-charcoal mb-4">Checkout</h1>
        <div className="divider-gold mx-auto" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-sm tracking-[0.1em] uppercase text-charcoal font-medium mb-6">Delivery Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="01XXXXXXXXX"
                    className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.1em] uppercase text-gray-400 mb-2">Delivery Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-5 py-4 bg-gray-50 border-0 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm tracking-[0.1em] uppercase text-charcoal font-medium mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-200 cursor-pointer hover:border-gold/30 transition-colors">
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Cash on Delivery</p>
                    <p className="text-xs text-gray-400 font-light mt-1">Pay ৳{deliveryCharge} delivery charge + total on receipt</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-200 cursor-pointer hover:border-gold/30 transition-colors">
                  <input
                    type="radio"
                    value="BKASH"
                    checked={paymentMethod === "BKASH"}
                    onChange={() => setPaymentMethod("BKASH")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-charcoal">bKash Advance <span className="text-gold">— Save 10%</span></p>
                    <p className="text-xs text-gray-400 font-light mt-1">Pay delivery charge (৳{deliveryCharge}) via bKash now</p>
                  </div>
                </label>
              </div>

              {paymentMethod === "BKASH" && (
                <div className="mt-6 p-6 bg-gold/5 border border-gold/20 space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-28 h-28 bg-white flex items-center justify-center border border-gray-200">
                      <Sparkles className="w-8 h-8 text-gold/40" strokeWidth={1} />
                    </div>
                  </div>
                  <p className="text-center text-sm text-charcoal">
                    Send <span className="font-medium">৳{deliveryCharge}</span> to <span className="font-medium">01XXXXXXXXX</span>
                  </p>
                  <input
                    type="text"
                    value={bkashRef}
                    onChange={(e) => setBkashRef(e.target.value)}
                    placeholder="Enter Transaction Reference Number"
                    required
                    className="w-full px-5 py-4 bg-white border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-5 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all duration-300 disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Place Order — ৳{(discountResult.total + deliveryCharge).toLocaleString()}</>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 p-8 sticky top-32">
            <h2 className="text-sm tracking-[0.1em] uppercase text-charcoal font-medium mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="w-16 h-20 bg-white shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={64} height={80} className="object-cover w-full h-full" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Sparkles className="w-5 h-5 text-gold/20" strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-serif text-charcoal">{item.name}</p>
                    <p className="text-xs text-gray-400 font-light mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-charcoal">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-6 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-light">Subtotal</span>
                <span className="text-charcoal">৳{subtotal.toLocaleString()}</span>
              </div>
              {discountResult.breakdown.map((d, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gold">{d.label}</span>
                  <span className="text-gold">-৳{d.discount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-light">Delivery</span>
                <span className="text-charcoal">৳{deliveryCharge}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6 border-t border-gray-200">
              <span className="text-sm tracking-[0.1em] uppercase text-charcoal font-medium">Grand Total</span>
              <span className="text-3xl font-serif text-charcoal">
                ৳{(discountResult.total + deliveryCharge).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
