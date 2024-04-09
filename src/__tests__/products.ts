import app from "../app";
import supertest from "supertest";
import productsMock from "./mock/products.json";
import singleProductMock from "./mock/product.json";
import { Logger } from "../services/logger.service";

const request = supertest(app);
const PRODUCTS: string = "/products";
const PRODUCT_ID: string = "/products/1";
const PRODUCT_STRING_ID: string = "/products/stringProduct";
const PRODUCT_ID_NOT_EXISTS: string = "/products/99999999";

describe("Products", () => {
	beforeEach(() => {
		jest.spyOn(Logger.prototype, "log").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "debug").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "info").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "warning").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "error").mockImplementation(jest.fn());
	});

	it("should return a product list", async () => {
		const response = await request.get(PRODUCTS);
		const products: string = JSON.stringify(productsMock);
		expect(response.status).toBe(200);
		expect(response.text).toBe(products);
	});

	it("should return a single product", async () => {
		const response = await request.get(PRODUCT_ID);
		const singleProduct: string = JSON.stringify(singleProductMock);
		expect(response.status).toBe(200);
		expect(response.text).toBe(singleProduct);
	});

	it("should return an error because productId is string", async () => {
		const response = await request.get(PRODUCT_STRING_ID);
		expect(response.status).toBe(404);
		expect(response.text).toBe("Page not found");
	});

	it("should return an error because productId does not exists", async () => {
		const response = await request.get(PRODUCT_ID_NOT_EXISTS);
		expect(response.status).toBe(404);
		expect(response.text).toBe("Product with id '99999999' not found");
	});
});
