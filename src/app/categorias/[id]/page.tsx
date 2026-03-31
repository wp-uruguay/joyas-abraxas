import { fetchCategory, fetchProducts } from "@/lib/wp";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const category = await fetchCategory(Number(id));
    return { title: `${category.name} | Abraxas` };
  } catch {
    return { title: "Categoria | Abraxas" };
  }
}

export default async function CategoriaDetailPage({ params }: Props) {
  const { id } = await params;
  let category;
  let products;
  let error = "";

  try {
    [category, products] = await Promise.all([
      fetchCategory(Number(id)),
      fetchProducts({ perPage: 50, category: Number(id) }),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : "No se pudo cargar la categoria";
  }

  if (error || !category) {
    return (
      <main className="mx-auto max-w-[1080px] px-4 py-8">
        <Link href="/categorias" className="font-semibold text-[var(--color-brand-strong)]">
          Volver a categorias
        </Link>
        <p className="my-4 rounded-lg border border-red-900/40 bg-red-950/40 p-3">
          {error || "Categoria no encontrada"}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8">
      <Link href="/categorias" className="mb-6 inline-block font-semibold text-[var(--color-brand-strong)]">
        Volver a categorias
      </Link>

      <h1 className="mb-1">{category.name}</h1>
      {category.description && (
        <p className="mb-6 text-[var(--color-muted)]">{category.description}</p>
      )}

      {products && products.length === 0 && (
        <p className="text-[var(--color-muted)]">No hay productos en esta categoria.</p>
      )}

      <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {products?.map((product) => (
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
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
