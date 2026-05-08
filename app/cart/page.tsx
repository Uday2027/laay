"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { calculateDiscounts } from "@/lib/discount";
import { useSession } from "next-auth/react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { data: session } = useSession();
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BKASH">("COD");

  const subtotal = getSubtotal();
  const discountResult = calculateDiscounts(items, !!session, paymentMethod);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-8" strokeWidth={1} />
        <h2 className="text-3xl font-serif font-medium text-charcoal mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 font-light mb-10">Discover our beautiful jewelry collection</p>
        <Link
          href="/products"
          className="btn-primary inline-flex items-center gap-3"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 pt-32">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-medium text-charcoal mb-4">Shopping Cart</h1>
        <div className="divider-gold mx-auto" />
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-6 pb-8 border-b border-gray-100">
              <div className="w-28 h-36 bg-gray-50 shrink-0 overflow-hidden">
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={112} height={144} className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Sparkles className="w-6 h-6 text-gold/20" strokeWidth={1} />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-1">{item.categoryName}</p>
                  <h3 className="font-serif text-lg text-charcoal mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-400 font-light">৳{item.price.toLocaleString()} each</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3 h-3" strokeWidth={1} />
                    </button>
                    <span className="w-10 text-center font-serif text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3" strokeWidth={1} />
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-serif text-lg text-charcoal">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-8">
            <h2 className="text-sm tracking-[0.1em] uppercase text-charcoal font-medium mb-8">Order Summary</h2>

            {/* Payment Method */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.1em] uppercase text-gray-400 mb-4">Payment Method</p>
              <div className="space-y-3">
                <label className="flex items-start gap-4 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gold/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-charcoal">Cash on Delivery</p>
                    <p className="text-xs text-gray-400 font-light mt-1">Pay when you receive</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 p-4 bg-white border border-gray-200 cursor-pointer hover:border-gold/50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="BKASH"
                    checked={paymentMethod === "BKASH"}
                    onChange={() => setPaymentMethod("BKASH")}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-charcoal">bKash Advance <span className="text-gold">(Save 10%)</span></p>
                    <p className="text-xs text-gray-400 font-light mt-1">Pay delivery charge via bKash upfront</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Discounts */}
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
            </div>

            <div className="flex justify-between items-center py-6 border-t border-gray-200">
              <span className="text-sm tracking-[0.1em] uppercase text-charcoal font-medium">Total</span>
              <span className="text-3xl font-serif text-charcoal">৳{discountResult.total.toLocaleString()}</span>
            </div>

            {!session && (
              <div className="mb-6 p-4 bg-gold/5 border border-gold/20">
                <p className="text-sm text-charcoal">
                  <Link href="/login" className="text-gold font-medium hover:underline">
                    Sign in
                  </Link>{" "}
                  to save an extra 5% on this order
                </p>
              </div>
            )}

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-3 bg-charcoal text-white py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-gold transition-all duration-300"
            >
              Proceed to Checkout
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
