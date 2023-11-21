/**
 * Interface for the product object
 */
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
/**
 * Interface for the rating object
 */
export interface IRating {
	rating: number;
	productID: number;
	userID: string;
	_id: string;
}
