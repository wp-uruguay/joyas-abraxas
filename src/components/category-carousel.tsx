"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { WPProduct } from "@/lib/types";

interface CategoryCarouselProps {
  products: WPProduct[];
}

export default function CategoryCarousel({ products }: CategoryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector("a")?.offsetWidth ?? 260;
    track.scrollBy({ left: dir === "right" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" });
  }

  if (!products.length) {
    return <p className="text-sm text-[var(--color-muted)]">Sin productos disponibles.</p>;
  }

  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productos/${product.slug}`}
            className="group flex w-[220px] shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div className="relative h-[200px] w-full overflow-hidden bg-[#1c1a18]">
              {product.images[0] ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="220px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl text-[var(--color-muted)]">
                  {product.name.charAt(0)}
                </div>
              )}
              {product.sale_price && product.sale_price !== product.regular_price && (
                <span className="absolute top-2 left-2 rounded-full bg-[var(--color-brand)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-panel)]">
                  Oferta
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-3">
              <p className="mb-1 line-clamp-2 text-[13px] font-medium leading-snug text-[var(--color-ink)]">
                {product.name}
              </p>
              <div className="mt-auto flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-[var(--color-brand-strong)]">
                  {product.price ? `$${product.price}` : "—"}
                </span>
                {product.sale_price && product.sale_price !== product.regular_price && (
                  <span className="text-xs text-[var(--color-muted)] line-through">
                    ${product.regular_price}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)]/90 text-[var(--color-ink)] shadow-md backdrop-blur-sm transition-colors hover:text-[var(--color-brand)]"
        aria-label="Anterior"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)]/90 text-[var(--color-ink)] shadow-md backdrop-blur-sm transition-colors hover:text-[var(--color-brand)]"
        aria-label="Siguiente"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
