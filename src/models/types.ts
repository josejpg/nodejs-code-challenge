export type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	thumbnail: string;
};

export type User = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	image: string;
	token: string;
};

export type CartPayload = {
	productId: number;
};

export type CartContent = {
	grandTotal: number;
	productList: Product[];
};
