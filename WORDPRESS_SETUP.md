# Setup WordPress para Frontend Next.js (Paso a paso)

Este documento te deja el backend de WordPress/WooCommerce listo para ser consumido desde tu frontend Next.js.

## 1. Requisitos iniciales

1. Tener WordPress en HTTPS (produccion) o local con URL fija. hecho
2. Tener WooCommerce instalado y activado. hecho
3. Tener una cuenta admin para configuracion. hecho
4. Confirmar URL base, por ejemplo: `https://tu-wordpress.com`. hecho https://api.joyasabraxas.com 

## 2. Configurar enlaces permanentes

1. Ir a `Ajustes > Enlaces permanentes`.
2. Seleccionar `Nombre de la entrada`.
3. Guardar cambios. Hecho

Esto evita problemas con endpoints REST.

## 3. Verificar API REST de WordPress

1. Abrir en navegador:
   - `https://tu-wordpress.com/wp-json`
2. Debe responder JSON. Hecho

Si falla, revisar reglas de servidor (Apache/Nginx), plugins de seguridad o cache.

## 4. Configurar WooCommerce API (productos, reseñas, pedidos)

1. Ir a `WooCommerce > Ajustes > Avanzado > REST API`.
2. Crear una clave nueva:
   - Descripcion: `nextjs-frontend`
   - Usuario: uno tecnico (no tu admin personal si puedes evitarlo) hecho manuel@wpuruguay.com
   - Permisos: `Read` para catalogo. Usa `Read/Write` solo si realmente lo necesitas.
3. Guardar `Consumer key` y `Consumer secret`. hecho y agregado a env

Endpoints importantes:

- Productos: `GET /wp-json/wc/v3/products`
- Reseñas: `GET /wp-json/wc/v3/products/reviews`
- Producto puntual: `GET /wp-json/wc/v3/products/{id}`

## 5. Configurar autenticacion de usuarios (JWT)

Tu frontend actual usa este endpoint por defecto:

- `POST /wp-json/jwt-auth/v1/token`

### Opcion recomendada rapida: plugin JWT Auth

1. Instalar plugin compatible con JWT (por ejemplo "JWT Authentication for WP REST API"). hecho
2. Activarlo. hecho
3. Configurar clave secreta en `wp-config.php`:

```php
define('JWT_AUTH_SECRET_KEY', 'pon-aqui-una-clave-larga-y-segura');
define('JWT_AUTH_CORS_ENABLE', true);
``` hecho, pero no se donde tengo que agregar esta clave en el proyecto next

4. Probar login por API:

```bash
curl -X POST "https://tu-wordpress.com/wp-json/jwt-auth/v1/token" \
  -H "Content-Type: application/json" \
  -d '{"username":"usuario","password":"password"}'
```

Debe devolver JSON con `token`.

## 6. CORS (clave para frontend separado)

Si Next.js y WordPress estan en dominios distintos, habilita CORS correctamente.

1. Permitir origen de tu frontend (ejemplo `https://frontend.tudominio.com`).
2. Permitir metodos: `GET, POST, PUT, PATCH, DELETE, OPTIONS`.
3. Permitir headers: `Content-Type, Authorization`.

Si usas plugin JWT con `JWT_AUTH_CORS_ENABLE`, igual valida reglas en servidor/proxy (Cloudflare, Nginx, Apache).

## 7. Usuarios, roles y permisos

1. Crear usuarios de prueba con rol `Customer`.
2. Verificar que clientes no tengan permisos de admin.
3. Para endpoints sensibles, no usar credenciales admin en frontend.

## 8. Productos y reseñas de prueba

1. Crear 5 a 10 productos con:
   - imagen destacada
   - precio
   - stock
   - descripcion corta y larga
2. Crear reseñas reales de prueba para validar UI.

## 9. Seguridad minima recomendada

1. No exponer claves de WooCommerce en frontend de produccion.
2. Para produccion, crear un BFF/proxy (Next.js API Route o backend aparte) para ocultar secretos.
3. Limitar intentos de login y activar WAF si es posible.
4. Mantener WordPress, plugins y WooCommerce actualizados.

## 10. Variables que debes usar en Next.js

En tu frontend (`.env`):

```bash
NEXT_PUBLIC_WP_URL="https://tu-wordpress.com"
NEXT_PUBLIC_WP_AUTH_ENDPOINT="https://tu-wordpress.com/wp-json/jwt-auth/v1/token"
NEXT_PUBLIC_WC_CONSUMER_KEY="ck_xxxxxxxxx"
NEXT_PUBLIC_WC_CONSUMER_SECRET="cs_xxxxxxxxx"
```

Nota: cualquier variable `NEXT_PUBLIC_` queda expuesta en el navegador.

## 11. Checklist de validacion final

1. `https://tu-wordpress.com/wp-json` responde OK.
2. `GET /wp-json/wc/v3/products` devuelve productos.
3. `GET /wp-json/wc/v3/products/reviews` devuelve reseñas.
4. `POST /wp-json/jwt-auth/v1/token` devuelve token.
5. Desde Next.js:
   - `/productos` lista catalogo.
   - `/login` inicia sesion y guarda token.

## 12. Siguiente mejora recomendada

1. Mover consumo WooCommerce con secretos a un API Route de Next.js (BFF) para no exponer keys en cliente.
2. Implementar refresh/expiracion de token y logout robusto.
3. Proteger rutas de cuenta del usuario en frontend.
