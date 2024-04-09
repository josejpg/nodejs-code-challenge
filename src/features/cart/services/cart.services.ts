import { CartContent, Product, User } from "../../../models/types";
import { Error400 } from "../../../utils/errors/error-400.error";
import { Error404 } from "../../../utils/errors/error-404.error";
import { AuthService } from "../../auth/services/auth.service";
import { ProductService } from "../../product/services/product.service";
import { UserCart } from "../models/user-cart.type";

export class CartService {
    private userCarts: UserCart = new Map();

    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly authService: AuthService = new AuthService()
    ){}

    /**
     * Set the current user 
     * @param {string} token 
     */
    public setCurrentUser(token: string): void {
        this.authService.setBearerToken(token);
    }

    /**
     * Select the cart for current user
     */
    private async selectUserCart(): Promise<CartContent> {
        const token: string = this.authService.getBearerToken();
        const currentUser: User = await this.authService.getUser(token);
        const initialCart: CartContent = {
            grandTotal: 0,
            productList: []
        }

        return this.userCarts.get(currentUser.username) ?? initialCart;
    }

    /**
     * Updates user cart
     * @param {CartContent} cart 
     */
    private async updateUserCart(cart: CartContent) {
        const token: string = this.authService.getBearerToken();
        const currentUser: User = await this.authService.getUser(token);
        this.userCarts.set(currentUser.username, cart);
    }

    /**
     * Add a new product into the cart
     * 
     * @param {number} productId 
     */
    public async addProduct(productId: number): Promise<CartContent> {
        const cart: CartContent = await this.selectUserCart();
        const productInCart: boolean = cart.productList.some((product: Product) => product.id === productId);

        if (productInCart) {
            throw new Error400(`Product ${productId} is already in cart`);
        }

        const product: Product = await this.productService.getById(productId);
        cart.productList.push(product);
        cart.grandTotal += 1;
        await this.updateUserCart(cart);
        return cart;
    }

    /**
     * Remove a product into the cart
     * 
     * @param {number} productId 
     */
    public async deleteProduct(productId: number): Promise<CartContent> {
        const cart: CartContent = await this.selectUserCart();
        const productInCart: boolean = cart.productList.some((product: Product) => product.id === productId);

        if (!productInCart) {
            throw new Error404(`Product ${productId} is not in cart`);
        }

        cart.productList = cart.productList.filter((product: Product) => product.id !== productId);
        cart.grandTotal -= 1;
        await this.updateUserCart(cart);
        return cart;
    }
}
