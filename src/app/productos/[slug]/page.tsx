import { fetchProductBySlug, fetchProductReviews } from "@/lib/wp";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/add-to-cart-button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await fetchProductBySlug(slug);
    return { title: `${product.name} | Abraxas` };
  } catch {
    return { title: "Producto | Abraxas" };
  }
}

export default async function ProductoDetailPage({ params }: Props) {
  const { slug } = await params;
  let product;
  let reviews;
  let error = "";

  try {
    product = await fetchProductBySlug(slug);
    reviews = await fetchProductReviews(product.id);
  } catch (e) {
    error = e instanceof Error ? e.message : "No se pudo cargar el producto";
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-[1080px] px-4 py-8">
        <Link href="/productos" className="font-semibold text-[var(--color-brand-strong)]">
          Volver al catalogo
        </Link>
        <p className="my-4 rounded-lg border border-red-900/40 bg-red-950/40 p-3">
          {error || "Producto no encontrado"}
        </p>
      </main>
    );
  }

  const mainImage = product.images[0];
  const hasDiscount = product.sale_price && product.regular_price && product.sale_price !== product.regular_price;

  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8">
      <Link href="/productos" className="mb-6 inline-block font-semibold text-[var(--color-brand-strong)]">
        Volver al catalogo
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="flex flex-col gap-3">
          {mainImage && (
            <Image
              src={mainImage.src}
              alt={mainImage.alt || product.name}
              width={600}
              height={600}
              className="w-full rounded-2xl bg-[#1c1a18] object-cover"
              priority
            />
          )}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.slice(1).map((img) => (
                <Image
                  key={img.id}
                  src={img.src}
                  alt={img.alt || product.name}
                  width={100}
                  height={100}
                  className="size-20 rounded-lg bg-[#1c1a18] object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="mt-0 mb-2 text-2xl">{product.name}</h1>

          {product.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {product.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categorias/${cat.id}`}
                  className="rounded-full bg-[var(--color-line)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-muted)]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {product.price ? `$${product.price}` : "Sin precio"}
            </span>
            {hasDiscount && (
              <span className="text-base text-[var(--color-muted)] line-through">
                ${product.regular_price}
              </span>
            )}
          </div>

          {product.stock_status === "instock" ? (
            <p className="mb-4 text-sm font-medium text-green-700">En stock</p>
          ) : (
            <p className="mb-4 text-sm font-medium text-red-600">Agotado</p>
          )}

          {product.short_description && (
            <div
              className="mb-4 text-[var(--color-muted)] [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          <AddToCartButton product={product} />

          {product.sku && (
            <p className="mt-4 text-sm text-[var(--color-muted)]">SKU: {product.sku}</p>
          )}

          {product.attributes.length > 0 && (
            <div className="mt-4 space-y-2">
              {product.attributes.map((attr) => (
                <div key={attr.id} className="text-sm">
                  <span className="font-semibold">{attr.name}:</span>{" "}
                  {attr.options.join(", ")}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <section className="mt-10 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-6">
          <h2 className="mt-0 mb-4">Descripcion</h2>
          <div
            className="prose max-w-none text-[var(--color-muted)] [&_p]:mb-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}

      {/* Reviews */}
      {reviews && reviews.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4">
            Resenas ({reviews.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-panel)] p-4"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold">{review.reviewer}</span>
                  <span className="text-sm text-[var(--color-muted)]">
                    {"★".repeat(Math.max(0, Math.min(5, review.rating)))}{"☆".repeat(Math.max(0, 5 - Math.max(0, Math.min(5, review.rating))))}
                  </span>
                </div>
                <div
                  className="text-sm text-[var(--color-muted)] [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: review.review }}
                />
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
