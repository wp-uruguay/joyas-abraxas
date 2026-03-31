export interface WPImage {
	id: number;
	src: string;
	name: string;
	alt: string;
}

export interface WPProductCategory {
	id: number;
	name: string;
	slug: string;
}

export interface WPProductAttribute {
	id: number;
	name: string;
	options: string[];
}

export interface WPProduct {
	id: number;
	name: string;
	slug: string;
	permalink: string;
	price: string;
	regular_price: string;
	sale_price: string;
	short_description: string;
	description: string;
	average_rating: string;
	rating_count: number;
	images: WPImage[];
	stock_status: string;
	sku: string;
	categories: WPProductCategory[];
	attributes: WPProductAttribute[];
	related_ids: number[];
}

export interface WPCategory {
	id: number;
	name: string;
	slug: string;
	description: string;
	count: number;
	image: WPImage | null;
	parent: number;
}

export interface WPReview {
	id: number;
	reviewer: string;
	review: string;
	rating: number;
	date_created: string;
	product_id: number;
}

export interface WPPost {
	id: number;
	slug: string;
	title: { rendered: string };
	excerpt: { rendered: string };
	content: { rendered: string };
	date: string;
	featured_media: number;
	_embedded?: {
		"wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
		author?: Array<{ name: string }>;
	};
}

export interface AuthResult {
	token: string;
	user_email: string;
	user_nicename: string;
	user_display_name: string;
}

export interface CartItem {
	product: WPProduct;
	quantity: number;
}
