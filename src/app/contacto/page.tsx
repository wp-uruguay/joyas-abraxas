import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Abraxas",
  description: "Ponte en contacto con Abraxas joyería.",
};

export default function ContactoPage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 py-16">
      <h1 className="mb-2 text-3xl font-light tracking-[0.18em] uppercase text-[var(--color-ink)]">
        Contacto
      </h1>
      <p className="mb-10 text-sm tracking-widest text-[var(--color-muted)] uppercase">
        Estamos aquí para ayudarte
      </p>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium uppercase tracking-widest text-[var(--color-muted)]">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-brand)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium uppercase tracking-widest text-[var(--color-muted)]">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            className="rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-brand)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium uppercase tracking-widest text-[var(--color-muted)]">
            Mensaje
          </label>
          <textarea
            name="mensaje"
            rows={5}
            placeholder="¿En qué podemos ayudarte?"
            className="resize-none rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-brand)] transition-colors"
          />
        </div>

        <button
          type="submit"
          className="mt-2 cursor-pointer rounded-lg border-0 bg-[var(--color-brand)] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--color-panel)] transition-colors hover:bg-[var(--color-brand-strong)]"
        >
          Enviar mensaje
        </button>
      </form>

      <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-muted)]">
        <p>📍 Buenos Aires, Argentina</p>
        <p>✉️ hola@abraxas.com</p>
        <p>📞 +54 11 0000-0000</p>
      </div>
    </main>
  );
}
