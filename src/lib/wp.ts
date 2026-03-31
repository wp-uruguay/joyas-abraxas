import type { AuthResult, WPCategory, WPPost, WPProduct, WPReview } from './types';

const wpBaseUrl = process.env.WP_URL ?? process.env.NEXT_PUBLIC_WP_URL;
const authEndpoint =
	process.env.WP_AUTH_ENDPOINT ??
	process.env.NEXT_PUBLIC_WP_AUTH_ENDPOINT ??
	`${wpBaseUrl}/wp-json/jwt-auth/v1/token`;
const wcKey = process.env.WC_CONSUMER_KEY ?? process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const wcSecret = process.env.WC_CONSUMER_SECRET ?? process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

function ensureWpUrl() {
	if (!wpBaseUrl) {
		throw new Error('Falta WP_URL en el archivo .env');
	}
}

function withWooAuth(url: URL) {
	if (wcKey && wcSecret) {
		url.searchParams.set('consumer_key', wcKey);
		url.searchParams.set('consumer_secret', wcSecret);
	}
}

async function wpGet<T>(path: string): Promise<T> {
	ensureWpUrl();

	const url = new URL(path, wpBaseUrl);
	withWooAuth(url);

	const response = await fetch(url.toString());
	if (!response.ok) {
		throw new Error(`Error ${response.status}: ${response.statusText}`);
	}

	return response.json() as Promise<T>;
}

export async function fetchProducts({ perPage = 12, category }: { perPage?: number; category?: number } = {}) {
	let path = `/wp-json/wc/v3/products?per_page=${perPage}`;
	if (category) path += `&category=${category}`;
	return wpGet<WPProduct[]>(path);
}

export async function fetchProduct(id: number) {
	return wpGet<WPProduct>(`/wp-json/wc/v3/products/${id}`);
}

export async function fetchProductBySlug(slug: string) {
	const results = await wpGet<WPProduct[]>(`/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}`);
	if (!results.length) throw new Error('Producto no encontrado');
	return results[0];
}

export async function fetchProductReviews(productId: number) {
	return wpGet<WPReview[]>(`/wp-json/wc/v3/products/reviews?product=${productId}`);
}

export async function fetchCategories({ perPage = 100 } = {}) {
	return wpGet<WPCategory[]>(`/wp-json/wc/v3/products/categories?per_page=${perPage}`);
}

export async function fetchCategory(id: number) {
	return wpGet<WPCategory>(`/wp-json/wc/v3/products/categories/${id}`);
}

export async function fetchPosts({ perPage = 12 } = {}) {
	ensureWpUrl();
	const url = new URL(`/wp-json/wp/v2/posts?per_page=${perPage}&_embed`, wpBaseUrl!);
	const response = await fetch(url.toString());
	if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
	return response.json() as Promise<WPPost[]>;
}

export async function fetchPost(slug: string) {
	ensureWpUrl();
	const url = new URL(`/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`, wpBaseUrl!);
	const response = await fetch(url.toString());
	if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
	const posts = (await response.json()) as WPPost[];
	return posts[0] ?? null;
}

export async function loginUser(username: string, password: string) {
	if (!authEndpoint || authEndpoint.includes('undefined')) {
		throw new Error('Falta WP_URL o WP_AUTH_ENDPOINT en el archivo .env');
	}

	const response = await fetch(authEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	});

	if (!response.ok) {
		let message = 'No fue posible iniciar sesion';
		try {
			const body = await response.json();
			if (body?.message) {
				message = body.message;
			}
		} catch {
			message = `Error ${response.status}`;
		}

		throw new Error(message);
	}

	return response.json() as Promise<AuthResult>;
}
