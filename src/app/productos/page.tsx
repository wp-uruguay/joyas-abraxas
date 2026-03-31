import type { Metadata } from "next";
import { fetchProducts } from "@/lib/wp";
import type { WPProduct } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Productos | Abraxas",
};

export default async function ProductosPage() {
  let products: WPProduct[] = [];
  let errorMessage = "";

  try {
    products = await fetchProducts({ perPage: 16 });
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "No se pudieron cargar los productos";
  }

  return (
    <main className="mx-auto max-w-[1080px] px-4 py-6 pb-12">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-semibold text-[var(--color-brand-strong)]"
        >
          Volver
        </Link>
        <h1>Catalogo</h1>
      </div>

      {errorMessage && (
        <p className="my-4 rounded-lg border border-red-900/40 bg-red-950/40 p-3">
          {errorMessage}
        </p>
      )}

      {!errorMessage && products.length === 0 && (
        <p>No hay productos para mostrar.</p>
      )}

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productos/${product.slug}`}
            className="overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-[var(--color-panel)] transition-shadow hover:shadow-md"
          >
            <Image
              src={product.images[0]?.src ?? "/favicon.svg"}
              alt={product.images[0]?.alt || product.name}
              width={400}
              height={180}
              className="h-[180px] w-full bg-[#1c1a18] object-cover"
            />
            <div className="p-4">
              <h2 className="m-0 mb-1.5 text-base">{product.name}</h2>
              <p className="m-0 font-bold">
                {product.price ? `$${product.price}` : "Sin precio"}
              </p>
              <p className="mt-2 mb-0 text-sm text-[var(--color-muted)]">
                Rating: {product.average_rating || "0"} ({product.rating_count})
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
