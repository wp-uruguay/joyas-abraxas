import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1080px] px-4 py-8 pb-12">
      <header className="rounded-[20px] border border-[var(--color-line)] bg-[color-mix(in_oklab,white_86%,#f4d6a7)] p-8 shadow-[0_12px_40px_rgb(20_20_20/0.05)]">
        <p className="m-0 text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]">
          Next.js + WordPress Headless
        </p>
        <h1 className="mt-2 mb-4 text-[clamp(2rem,2.2vw+1rem,3.2rem)] leading-[1.05]">
          Frontend rapido para WooCommerce
        </h1>
        <p className="max-w-[70ch] text-[var(--color-muted)]">
          Esta base te permite consumir autenticacion de usuarios, catalogo de
          productos y resenas desde tu backend en WordPress.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/productos"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-5 py-2.5 font-bold text-[#f6fffb] transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-brand-strong)]"
          >
            Ver productos
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-transparent px-5 py-2.5 font-bold text-[var(--color-ink)]"
          >
            Iniciar sesion
          </Link>
        </div>
      </header>

      <section className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <article className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-panel)] p-4">
          <h2 className="mt-0 mb-1.5">Productos</h2>
          <p className="m-0 text-[var(--color-muted)]">
            Listado inicial conectado al endpoint REST de WooCommerce.
          </p>
        </article>
        <article className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-panel)] p-4">
          <h2 className="mt-0 mb-1.5">Auth</h2>
          <p className="m-0 text-[var(--color-muted)]">
            Formulario de login que almacena token JWT en el navegador.
          </p>
        </article>
        <article className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-panel)] p-4">
          <h2 className="mt-0 mb-1.5">Extensible</h2>
          <p className="m-0 text-[var(--color-muted)]">
            Estructura en capas con tipos y cliente API para seguir escalando.
          </p>
        </article>
      </section>
    </main>
  );
}
