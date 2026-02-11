"use client";

import { useState } from "react";
import { ShoppingBag, Check, Plus, Minus } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-slate-700">Quantity</span>
        <div className="flex items-center border border-slate-200 rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-4 w-4 text-slate-600" />
          </button>
          <span className="w-12 text-center font-medium text-slate-900">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="p-2 hover:bg-slate-100 transition-colors"
          >
            <Plus className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="w-full"
        disabled={added}
      >
        {added ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
