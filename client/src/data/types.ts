export interface IProduct {
	productID: number;
	name: string;
	brand: string;
	ean: string;
	image: string;
	category?: string;
	description?: string;
	currentPrice?: number;
	weight?: number;
	weightUnit?: string;
	store: string;
}
