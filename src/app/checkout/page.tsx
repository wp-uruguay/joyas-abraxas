"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: Integrar con WooCommerce Orders API
    clearCart();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-[680px] px-4 py-8 text-center">
        <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-8">
          <h1 className="mt-0 mb-2">¡Gracias por tu pedido!</h1>
          <p className="text-[var(--color-muted)]">
            Hemos recibido tu orden. Te contactaremos pronto.
          </p>
          <Link
            href="/productos"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-5 py-2.5 font-bold text-[#f6fffb] hover:bg-[var(--color-brand-strong)]"
          >
            Seguir comprando
          </Link>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-[680px] px-4 py-8 text-center">
        <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-8">
          <h1 className="mt-0 mb-2">Checkout</h1>
          <p className="text-[var(--color-muted)]">Tu carrito esta vacio.</p>
          <Link
            href="/productos"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-5 py-2.5 font-bold text-[#f6fffb] hover:bg-[var(--color-brand-strong)]"
          >
            Ver productos
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[960px] px-4 py-8">
      <Link href="/carrito" className="mb-4 inline-block font-semibold text-[var(--color-brand-strong)]">
        Volver al carrito
      </Link>
      <h1 className="mb-6">Checkout</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <form onSubmit={handleSubmit} id="checkout-form" className="flex flex-col gap-4">
          <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-5">
            <h2 className="mt-0 mb-4 text-lg">Datos de contacto</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold">
                Nombre
                <input
                  type="text"
                  name="firstName"
                  required
                  className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit]"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                Apellido
                <input
                  type="text"
                  name="lastName"
                  required
                  className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit]"
                />
              </label>
            </div>
            <label className="mt-3 grid gap-1.5 text-sm font-semibold">
              Email
              <input
                type="email"
                name="email"
                required
                className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit]"
              />
            </label>
            <label className="mt-3 grid gap-1.5 text-sm font-semibold">
              Telefono
              <input
                type="tel"
                name="phone"
                className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit]"
              />
            </label>
          </section>

          <section className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-5">
            <h2 className="mt-0 mb-4 text-lg">Direccion de envio</h2>
            <label className="grid gap-1.5 text-sm font-semibold">
              Direccion
              <input
                type="text"
                name="address"
                required
                className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit]"
              />
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold">
                Ciudad
                <input
                  type="text"
                  name="city"
                  required
                  className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit]"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                Codigo postal
                <input
                  type="text"
                  name="postalCode"
                  className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit]"
                />
              </label>
            </div>
            <label className="mt-3 grid gap-1.5 text-sm font-semibold">
              Notas del pedido
              <textarea
                name="notes"
                rows={3}
                className="rounded-[9px] border border-[var(--color-line)] p-2.5 font-[inherit] resize-none"
              />
            </label>
          </section>
        </form>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-5">
          <h2 className="mt-0 mb-4 text-lg">Tu pedido</h2>
          <div className="flex flex-col gap-3 border-b border-[var(--color-line)] pb-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <Image
                  src={item.product.images[0]?.src ?? "/favicon.svg"}
                  alt={item.product.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-lg bg-[#1c1a18] object-cover"
                />
                <div className="flex-1">
                  <p className="m-0 text-sm font-semibold">{item.product.name}</p>
                  <p className="m-0 text-sm text-[var(--color-muted)]">
                    x{item.quantity} — ${(parseFloat(item.product.price || "0") * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-3 text-sm text-[var(--color-muted)]">
            <span>Productos ({totalItems})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            form="checkout-form"
            className="mt-4 w-full cursor-pointer rounded-[9px] border-0 bg-[var(--color-brand)] p-3 font-[inherit] font-bold text-[#f6fffb] transition-colors hover:bg-[var(--color-brand-strong)]"
          >
            Confirmar pedido
          </button>
        </aside>
      </div>
    </main>
  );
}
