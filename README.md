# Abraxas Frontend (Astro + WordPress/WooCommerce)

Frontend en Astro para consumir un backend de WordPress que maneja:

- autenticacion de usuarios
- catalogo de productos (WooCommerce)
- resenas de productos

## Requisitos

- Node.js 22+
- Backend WordPress con WooCommerce activo
- Endpoint de auth (por ejemplo JWT Auth plugin)

## Variables de entorno

Crea un archivo `.env` en la raiz:

```bash
PUBLIC_WP_URL="https://tu-wordpress.com"
PUBLIC_WP_AUTH_ENDPOINT="https://tu-wordpress.com/wp-json/jwt-auth/v1/token"

# Opcional para productos por API wc/v3
PUBLIC_WC_CONSUMER_KEY="ck_xxxxxxxxx"
PUBLIC_WC_CONSUMER_SECRET="cs_xxxxxxxxx"
```

Nota: todo valor `PUBLIC_` queda expuesto al cliente. Para produccion, se recomienda usar un backend intermedio/BFF o endpoints propios en WordPress para no exponer secretos.

## Scripts

- `npm run dev`: entorno local
- `npm run build`: build de produccion
- `npm run preview`: previsualizar build

## Estructura principal

- `src/lib/wp.ts`: cliente para auth/productos/resenas
- `src/lib/types.ts`: tipos TypeScript de WordPress/WooCommerce
- `src/pages/index.astro`: landing inicial
- `src/pages/productos.astro`: listado de productos
- `src/pages/login.astro`: formulario de login JWT

## Arranque rapido

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.
