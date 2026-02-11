import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <ShoppingBag className="h-12 w-12 text-slate-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-slate-600 mb-8 max-w-md">
        Looks like you haven&apos;t added anything to your cart yet. Explore our collection and find something you&apos;ll love.
      </p>
      <Link href="/#products">
        <Button size="lg">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
