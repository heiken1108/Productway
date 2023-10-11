export interface IProduct {
	productID: number;
	name: string;
	brand: string;
	ean: string;
	image: string;
	category?: string;
	description?: String;
	currentPrice?: number;
	weight?: number;
	weightUnit?: string;
	store: string;
}
