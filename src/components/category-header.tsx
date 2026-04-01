"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WPCategory } from "@/lib/types";

interface Props {
  cat: WPCategory;
  index: number;
  href: string;
}

export default function CategoryHeader({ cat, index, href }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[280px] overflow-hidden rounded-2xl md:h-[320px]">
      {/* Background image */}
      {cat.image ? (
        <Image
          src={cat.image.src}
          alt={cat.name}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-panel)]" />
      )}

      {/* Gradient: alternating dark side */}
      <div
        className={`absolute inset-0 ${
          isEven
            ? "bg-gradient-to-r from-black/92 via-black/60 to-black/10"
            : "bg-gradient-to-l from-black/92 via-black/60 to-black/10"
        }`}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex h-full flex-col justify-end p-8 md:p-10 ${
          isEven ? "items-start" : "items-end text-right"
        }`}
      >
        <p
          className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/55 transition-all duration-700"
          style={{
            transitionDelay: "80ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
          }}
        >
          Colección
        </p>

        <h2
          className="m-0 mb-5 font-light leading-none tracking-tight text-white transition-all duration-700"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
            transitionDelay: "180ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(22px)",
          }}
        >
          {cat.name}
        </h2>

        {cat.description && (
          <p
            className="mb-5 max-w-[420px] text-[14px] leading-relaxed text-white/65 transition-all duration-700"
            style={{
              transitionDelay: "270ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(14px)",
            }}
          >
            {cat.description}
          </p>
        )}

        <Link
          href={href}
          className="inline-flex items-center gap-2 border-b border-white/35 pb-0.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-700 hover:border-white hover:gap-3"
          style={{
            transitionDelay: "350ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
          }}
        >
          Ver colección →
        </Link>
      </div>
    </div>
  );
}
