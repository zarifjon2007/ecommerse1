"use client";

import { Container } from "@/components/layout/Container";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
              Shopping Cart
            </h1>
            <EmptyCart />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Container>
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
