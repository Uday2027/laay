import { CartItem } from "@/store/cart-store";

export interface DiscountBreakdown {
  type: "BULK_CATEGORY" | "LOYALTY" | "BKASH_ADVANCE";
  label: string;
  discount: number;
}

export interface DiscountResult {
  subtotal: number;
  total: number;
  breakdown: DiscountBreakdown[];
}

export function calculateDiscounts(
  items: CartItem[],
  isLoggedIn: boolean,
  paymentMethod: "COD" | "BKASH"
): DiscountResult {
  let subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let total = subtotal;
  const breakdown: DiscountBreakdown[] = [];

  // 1. Same-category bulk discount (15%) - applied to category subtotal
  const categoryMap = new Map<string, { items: CartItem[]; subtotal: number }>();
  for (const item of items) {
    const existing = categoryMap.get(item.categoryId);
    if (existing) {
      existing.items.push(item);
      existing.subtotal += item.price * item.quantity;
    } else {
      categoryMap.set(item.categoryId, {
        items: [item],
        subtotal: item.price * item.quantity,
      });
    }
  }

  for (const [_, catData] of categoryMap) {
    const itemCount = catData.items.reduce((sum, i) => sum + i.quantity, 0);
    if (itemCount >= 3) {
      const discount = catData.subtotal * 0.15;
      total -= discount;
      breakdown.push({
        type: "BULK_CATEGORY",
        label: `15% Bulk Discount (${catData.items[0].categoryName})`,
        discount,
      });
    }
  }

  // 2. Logged-in discount (5%)
  if (isLoggedIn) {
    const discount = total * 0.05;
    total -= discount;
    breakdown.push({
      type: "LOYALTY",
      label: "5% Member Discount",
      discount,
    });
  }

  // 3. bKash advance payment (10%)
  if (paymentMethod === "BKASH") {
    const discount = total * 0.10;
    total -= discount;
    breakdown.push({
      type: "BKASH_ADVANCE",
      label: "10% bKash Advance Discount",
      discount,
    });
  }

  return { subtotal, total, breakdown };
}
