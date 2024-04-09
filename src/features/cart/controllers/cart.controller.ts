import { CartContent, CartPayload } from "../../../models/types";
import { Logger } from "../../../services/logger.service";
import { Error400 } from "../../../utils/errors/error-400.error";
import { ErrorTui } from "../../../utils/errors/error-tui.error";
import { CartService } from "../services/cart.services";

const cartService: CartService = new CartService();
const logger: Logger = new Logger('cart.controller');


const isValidCartPayload = (data: unknown): data is CartPayload => {
    const cartPayload: any = data as any;
    return 'productId' in cartPayload && !Number.isNaN(cartPayload.productId);
}

/**
 * Add product to cart
 * 
 * @returns {CartContent}
 */
export const addProduct = async (params: { cartPayload: unknown, token: string }): Promise<CartContent> => {
    try {
        const { cartPayload, token } = params;
        if (!isValidCartPayload(cartPayload)) {
            throw new Error400(`Product ID must be a number`);
        }

        cartService.setCurrentUser(token);
        const response: CartContent =await cartService.addProduct(cartPayload.productId);
        logger.debug('Response received: ', response);
        return response
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
}

/**
 * Delete product to cart
 * 
 * @returns {CartContent}
 */
export const deleteProduct = async (params: { productId: number, token: string }): Promise<CartContent> => {
    try {
        const { productId, token } = params;
        cartService.setCurrentUser(token);
        await cartService.deleteProduct(productId);
        const response: CartContent = {
            productList: await cartService.getProducts(),
            grandTotal: await cartService.getTotalProducts()
        }
        logger.debug('Response received: ', response);
        return response
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
}
