# Abraxas Frontend (Next.js + WordPress/WooCommerce)

Frontend en Next.js para consumir un backend de WordPress que maneja:

- autenticacion de usuarios
- catalogo de productos (WooCommerce)
- resenas de productos

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **shadcn/ui**
- **React Bits**
- **TypeScript**

## Requisitos

- Node.js 22+
- Backend WordPress con WooCommerce activo
- Endpoint de auth (por ejemplo JWT Auth plugin)

## Variables de entorno

Crea un archivo `.env` en la raiz:

```bash
NEXT_PUBLIC_WP_URL="https://tu-wordpress.com"
NEXT_PUBLIC_WP_AUTH_ENDPOINT="https://tu-wordpress.com/wp-json/jwt-auth/v1/token"

# Opcional para productos por API wc/v3
NEXT_PUBLIC_WC_CONSUMER_KEY="ck_xxxxxxxxx"
NEXT_PUBLIC_WC_CONSUMER_SECRET="cs_xxxxxxxxx"
```

Nota: todo valor `NEXT_PUBLIC_` queda expuesto al cliente. Para produccion, se recomienda usar un backend intermedio/BFF o endpoints propios en WordPress para no exponer secretos.

## Scripts

- `npm run dev`: entorno local
- `npm run build`: build de produccion
- `npm start`: iniciar servidor de produccion

## Estructura principal

- `src/lib/wp.ts`: cliente para auth/productos/resenas
- `src/lib/types.ts`: tipos TypeScript de WordPress/WooCommerce
- `src/app/page.tsx`: landing inicial
- `src/app/productos/page.tsx`: listado de productos
- `src/app/login/page.tsx`: formulario de login JWT

## Arranque rapido

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.
