import { Product } from "../../../models/types";
import { Logger } from "../../../services/logger.service";
import { FetchProductsResponse } from "../models/fetch-product-response.interface";
import { ProductService } from "../services/product.service";

const productService: ProductService = new ProductService();
const logger: Logger = new Logger('product.controller');

/**
 * Get all products sorted by title (A-Z)
 * 
 * @returns {Product[]}
 */
export const getAll = async (): Promise<Product[]> => {
    try {
        const response: FetchProductsResponse = await productService.getAll();
        logger.info('Response received: ', response);
        return response.products.sort((productA: Product, productB: Product) => (productA.title > productB.title) ? 1 : -1)
    } catch (err: unknown) {
        let message: string = JSON.stringify(err, null, 2);
        if (err instanceof Error) {
            message = err.message;
        }
        logger.error(message);
        throw new Error(message);
    }
}

/**
 * Get a single product
 * 
 * @param {string} productId 
 * @returns {Product}
 */
export const getById = async (productId: string): Promise<Product> => {
    try {
        return await productService.getById(productId);
    } catch (err: unknown) {
        let message: string = JSON.stringify(err, null, 2);
        if (err instanceof Error) {
            message = err.message;
        }
        logger.error(message);
        throw new Error(message);
    }
}