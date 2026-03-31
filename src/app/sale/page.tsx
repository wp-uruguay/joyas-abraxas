import type { Metadata } from "next";
import { fetchProducts } from "@/lib/wp";
import type { WPProduct } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sale | Abraxas",
  description: "Ofertas y descuentos en joyería Abraxas.",
};

export default async function SalePage() {
  let products: WPProduct[] = [];
  let error = "";

  try {
    const all = await fetchProducts({ perPage: 50 });
    products = all.filter(
      (p) => p.sale_price && p.regular_price && p.sale_price !== p.regular_price
    );
  } catch (e) {
    error = e instanceof Error ? e.message : "No se pudieron cargar los productos";
  }

  return (
    <main className="mx-auto max-w-[1080px] px-6 py-12">
      <h1 className="mb-1 text-3xl font-light tracking-[0.18em] uppercase text-[var(--color-ink)]">
        Sale
      </h1>
      <p className="mb-10 text-sm tracking-widest text-[var(--color-muted)] uppercase">
        Piezas seleccionadas con descuento
      </p>

      {error && (
        <p className="my-4 rounded-lg border border-red-900/40 bg-red-950/40 p-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {!error && products.length === 0 && (
        <p className="text-[var(--color-muted)]">No hay ofertas disponibles en este momento.</p>
      )}

      <section className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {products.map((product) => {
          const discount = product.regular_price && product.sale_price
            ? Math.round((1 - Number(product.sale_price) / Number(product.regular_price)) * 100)
            : 0;
          return (
            <Link
              key={product.id}
              href={`/productos/${product.slug}`}
              className="group overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            >
              <div className="relative h-[200px] w-full overflow-hidden bg-[#1c1a18]">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="260px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl text-[var(--color-muted)]">
                    {product.name.charAt(0)}
                  </div>
                )}
                {discount > 0 && (
                  <span className="absolute top-2 left-2 rounded-full bg-[var(--color-brand)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--color-panel)]">
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="mb-2 line-clamp-2 text-sm font-medium text-[var(--color-ink)]">
                  {product.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-[var(--color-brand-strong)]">
                    ${product.sale_price}
                  </span>
                  <span className="text-sm text-[var(--color-muted)] line-through">
                    ${product.regular_price}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
