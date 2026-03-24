import type { AuthResult, WPProduct, WPReview } from './types';

const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL;
const authEndpoint =
	process.env.NEXT_PUBLIC_WP_AUTH_ENDPOINT ?? `${wpBaseUrl}/wp-json/jwt-auth/v1/token`;
const wcKey = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const wcSecret = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

function ensureWpUrl() {
	if (!wpBaseUrl) {
		throw new Error('Falta PUBLIC_WP_URL en el archivo .env');
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

export async function fetchProducts({ perPage = 12 } = {}) {
	return wpGet<WPProduct[]>(`/wp-json/wc/v3/products?per_page=${perPage}`);
}

export async function fetchProductReviews(productId: number) {
	return wpGet<WPReview[]>(`/wp-json/wc/v3/products/reviews?product=${productId}`);
}

export async function loginUser(username: string, password: string) {
	ensureWpUrl();

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
