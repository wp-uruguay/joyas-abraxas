import { fetchProducts, fetchCategories } from "@/lib/wp";
import type { WPProduct, WPCategory } from "@/lib/types";
import HeroSlider, { type HeroSlide } from "@/components/hero-slider";
import CategoryCarousel from "@/components/category-carousel";
import Link from "next/link";

// Map de slugs de categoría → imagen local + copy persuasivo
const SLIDE_DATA: Record<string, { image: string; tagline: string; buttonLabel: string }> = {
  anillos: {
    image: "/ornament/slider/anillos2.jpg",
    tagline: "Cada anillo lleva consigo una promesa. Descubre piezas únicas que celebran los momentos más importantes de tu vida.",
    buttonLabel: "Ver Anillos",
  },
  caravanas: {
    image: "/ornament/slider/caravanas.jpg",
    tagline: "Pequeñas joyas, gran impacto. Caravanas que transforman cualquier look en una declaración de elegancia.",
    buttonLabel: "Ver Caravanas",
  },
  colgantes: {
    image: "/ornament/slider/colgantes2.jpg",
    tagline: "Lleva cerca lo que más valoras. Colgantes artesanales que expresan tu esencia con cada movimiento.",
    buttonLabel: "Ver Colgantes",
  },
};

const SLIDE_ORDER = ["anillos", "caravanas", "colgantes"];

function buildSlides(categories: WPCategory[]): HeroSlide[] {
  return SLIDE_ORDER.flatMap((slug) => {
    const data = SLIDE_DATA[slug];
    if (!data) return [];
    const cat = categories.find(
      (c) => c.slug === slug || c.name.toLowerCase() === slug
    );
    return [
      {
        image: data.image,
        title: cat?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1),
        tagline: data.tagline,
        href: cat ? `/categorias/${cat.id}` : "/categorias",
        buttonLabel: data.buttonLabel,
      },
    ];
  });
}

export default async function HomePage() {
  let categories: WPCategory[] = [];

  try {
    categories = await fetchCategories({ perPage: 100 });
    categories = categories.filter(
      (c) => c.parent === 0 && c.slug !== "uncategorized" && c.count > 0
    );
  } catch {
    // API no disponible — slides usan href de fallback
  }

  const slides = buildSlides(categories);

  // Fetch products for each category in parallel
  const categoryProducts = await Promise.all(
    categories.map((cat) =>
      fetchProducts({ perPage: 12, category: cat.id }).catch(() => [] as WPProduct[])
    )
  );

  return (
    <main className="-mt-24">
      <HeroSlider slides={slides} />

      {categories.map((cat, i) => {
        const products = categoryProducts[i] ?? [];
        if (!products.length) return null;
        return (
          <section key={cat.id} className="mx-auto max-w-[1200px] px-6 py-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="m-0 text-xl font-light tracking-[0.15em] uppercase text-[var(--color-ink)]">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="mt-1 mb-0 text-sm text-[var(--color-muted)]">{cat.description}</p>
                )}
              </div>
              <Link
                href={`/categorias/${cat.id}`}
                className="shrink-0 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-strong)]"
              >
                Ver todo →
              </Link>
            </div>
            <CategoryCarousel products={products} />
          </section>
        );
      })}
    </main>
  );
}
