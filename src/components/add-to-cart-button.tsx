"use client";

import { useCart } from "@/lib/cart-context";
import type { WPProduct } from "@/lib/types";

export default function AddToCartButton({ product }: { product: WPProduct }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full cursor-pointer rounded-[9px] border-0 bg-[var(--color-brand)] p-3 font-[inherit] font-bold text-[#f6fffb] transition-colors hover:bg-[var(--color-brand-strong)]"
    >
      Agregar al carrito
    </button>
  );
}
