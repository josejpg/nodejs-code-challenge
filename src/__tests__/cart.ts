import app from "../app";
import supertest from "supertest";
import userMock from "./mock/user.json";
import singleProductMock from "./mock/product.json";
import { Logger } from "../services/logger.service";
import type { CartContent, CartPayload } from "../models/types";
import * as authController from "../features/auth/controllers/auth.controller";
import { AuthService } from "../features/auth/services/auth.service";
import { Error403 } from "../utils/errors/error-403.error";

const request = supertest(app);
const CART: string = "/cart";
const CART_DELETE: string = "/cart/1";
const PAYLOAD: CartPayload = {
	productId: 1
};
const PAYLOAD_STRING_PRODUCT_ID = {
	productId: "asdf"
};
const CART_CONTENT_PRODUCT: CartContent = {
	grandTotal: 1,
	productList: [singleProductMock]
}
const CART_CONTENT_EMPTY: CartContent = {
	grandTotal: 0,
	productList: []
}
describe("Cart", () => {
	beforeEach(() => {
		jest.spyOn(Logger.prototype, "log").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "debug").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "info").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "warning").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "error").mockImplementation(jest.fn());
	});

	it("should added a product in cart", async () => {
		jest.spyOn(authController, "validateBearerToken").mockImplementation(() => Promise.resolve(true));
		jest.spyOn(AuthService.prototype, "getUser").mockImplementation(() => Promise.resolve(userMock));
		const response = await request.post(CART).send(PAYLOAD);
		const cartContent: string = JSON.stringify(CART_CONTENT_PRODUCT);
		expect(response.status).toBe(200);
		expect(response.text).toBe(cartContent);
	});

	it("should deleted the product", async () => {
		jest.spyOn(authController, "validateBearerToken").mockImplementation(() => Promise.resolve(true));
		jest.spyOn(AuthService.prototype, "getUser").mockImplementation(() => Promise.resolve(userMock));
		const response = await request.delete(CART_DELETE);
		const cartContent: string = JSON.stringify(CART_CONTENT_EMPTY);
		expect(response.status).toBe(200);
		expect(response.text).toBe(cartContent);
	});

	it("should return an access denied error", async () => {
		jest.spyOn(authController, "validateBearerToken").mockImplementation(() => Promise.resolve(false));
		const response = await request.post(CART).send(PAYLOAD);
		expect(response.status).toBe(403);
		expect(response.text).toBe("Access denied");
	});

	it("should return an inalid token error if refresh token throws an error", async () => {
		jest.spyOn(authController, "validateBearerToken").mockImplementation(() => Promise.resolve(true));
		jest.spyOn(AuthService.prototype, "getUser").mockImplementation(() => Promise.reject(new Error403("Invalid token")));
		const response = await request.post(CART).send(PAYLOAD);
		console.log("status: ", response.status);
		console.log("text: ", response.text);
		expect(response.status).toBe(403);
		expect(response.text).toBe("Invalid token");
	});
});
