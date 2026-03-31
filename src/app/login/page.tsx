import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Login | Abraxas",
};

export default function LoginPage() {
  const authEndpoint =
    process.env.WP_AUTH_ENDPOINT ??
    `${process.env.WP_URL}/wp-json/jwt-auth/v1/token`;

  return (
    <main className="mx-auto max-w-[680px] px-4 py-8">
      <a
        href="/"
        className="mb-4 inline-block font-semibold text-[var(--color-brand-strong)]"
      >
        Volver
      </a>
      <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-5">
        <h1 className="mt-0">Iniciar sesion</h1>
        <p className="text-[var(--color-muted)]">
          Este formulario consulta tu endpoint de autenticacion en WordPress y
          guarda el JWT en localStorage.
        </p>
        <LoginForm endpoint={authEndpoint} />
      </section>
    </main>
  );
}
