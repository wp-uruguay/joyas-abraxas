export interface WPImage {
	id: number;
	src: string;
	name: string;
	alt: string;
}

export interface WPProduct {
	id: number;
	name: string;
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
}

export interface WPReview {
	id: number;
	reviewer: string;
	review: string;
	rating: number;
	date_created: string;
	product_id: number;
}

export interface AuthResult {
	token: string;
	user_email: string;
	user_nicename: string;
	user_display_name: string;
}
