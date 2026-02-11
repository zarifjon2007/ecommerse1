"use client";

import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex gap-4 py-6 border-b border-slate-200 last:border-b-0">
      {/* Product Image */}
      <Link href={`/product/${item.id}`} className="flex-shrink-0">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <Link
              href={`/product/${item.id}`}
              className="text-base font-medium text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-sm text-slate-500">{item.category}</p>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center border border-slate-200 rounded-lg">
            <button
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="h-4 w-4 text-slate-600" />
            </button>
            <span className="w-10 text-center font-medium text-slate-900">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2 hover:bg-slate-100 transition-colors"
            >
              <Plus className="h-4 w-4 text-slate-600" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-base font-semibold text-slate-900">
              {formatPrice(item.price * item.quantity)}
            </p>
            <p className="text-sm text-slate-500">
              {formatPrice(item.price)} each
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
