"use client";

import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

export function CartSummary() {
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalItems = useCartStore((state) => state.getTotalItems());

  const shippingThreshold = 100;
  const shippingCost = totalPrice >= shippingThreshold ? 0 : 15;
  const subtotal = totalPrice;
  const total = subtotal + shippingCost;

  const amountToFreeShipping = Math.max(0, shippingThreshold - totalPrice);

  return (
    <div className="bg-slate-50 rounded-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

      {/* Summary Details */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-slate-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping</span>
          <span className="font-medium text-slate-900">
            {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
          </span>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-slate-900">Total</span>
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(total)}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 text-right">
            Including taxes
          </p>
        </div>
      </div>

      {/* Checkout Button */}
      <Button size="lg" className="w-full group">
        Proceed to Checkout
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>

      {/* Free Shipping Notice */}
      {amountToFreeShipping > 0 ? (
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200">
          <Truck className="h-5 w-5 text-indigo-600" />
          <span>
            Add {formatPrice(amountToFreeShipping)} more for free shipping
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2 text-sm text-green-700 bg-green-50 p-4 rounded-lg border border-green-200">
          <Truck className="h-5 w-5" />
          <span>You qualify for free shipping</span>
        </div>
      )}

      {/* Continue Shopping */}
      <div className="text-center">
        <Link
          href="/#products"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
