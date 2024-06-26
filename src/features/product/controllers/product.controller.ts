import type { Product } from "../../../models/types";
import { Logger } from "../../../services/logger.service";
import { Error400 } from "../../../utils/errors/error-400.error";
import { ErrorTui } from "../../../utils/errors/error-tui.error";
import type { FetchProductsResponse } from "../models/fetch-product-response.interface";
import { ProductService } from "../services/product.service";

const productService: ProductService = new ProductService();
const logger: Logger = new Logger("product.controller");

/**
 * Get all products sorted by title (A-Z)
 *
 * @returns {Product[]}
 */
export const getAll = async (): Promise<Product[]> => {
	try {
		const response: FetchProductsResponse = await productService.getAll();
		logger.debug("Response received: ", response);
		return response.products.sort((productA: Product, productB: Product) =>
			productA.title > productB.title ? 1 : -1,
		);
	} catch (err: unknown) {
		// if is a custom error, throw it, in other case control it
		if (err instanceof ErrorTui) {
			throw err;
		}

		let message: string = JSON.stringify(err, null, 2);
		if (err instanceof Error) {
			message = err.message;
		}
		logger.error(message);
		throw new Error400(message);
	}
};

/**
 * Get a single product
 *
 * @param {number} productId
 * @returns {Product}
 */
export const getById = async (productId: number): Promise<Product> => {
	try {
		return await productService.getById(productId);
	} catch (err: unknown) {
		// if is a custom error, throw it, in other case control it
		if (err instanceof ErrorTui) {
			throw err;
		}

		let message: string = JSON.stringify(err, null, 2);
		if (err instanceof Error) {
			message = err.message;
		}
		logger.error(message);
		throw new Error400(message);
	}
};
