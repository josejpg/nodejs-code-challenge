import { FetchRequestFilters } from "../../../models/fetch-request-filters.type";
import { FetchGetRequest } from "../../../models/fetch-request.type";
import { Product } from "../../../models/types";
import { Fetch } from "../../../services/fetch.service";
import { FetchProductsResponse } from "../models/fetch-product-response.interface";

export class ProductService {
    private base_url = 'https://dummyjson.com/products';

    constructor(
        private readonly fetch: Fetch = new Fetch()
    ){}

    /**
     * Get all products
     * 
     * @returns {FetchProductsResponse}
     */
    public async getAll(filters?: Map<FetchRequestFilters, string>): Promise<FetchProductsResponse> {
        const request: FetchGetRequest = {
            url: this.base_url,
            filters
        };
        return this.fetch.get<FetchProductsResponse>(request);
    }

    /**
     * Get a single product
     * 
     * @param {number} productId 
     * @returns {Product}
     */
    public async getById(productId: number): Promise<Product> {
        const request: FetchGetRequest = {
            url: `${this.base_url}/${productId}`
        };
        return this.fetch.get<Product>(request);
    }


    /**
     * Search products
     * 
     * @param {Map<string, string>} params 
     * @returns {Product}
     */
    public async search(params: Map<string, string>, filters?: Map<FetchRequestFilters, string>): Promise<FetchProductsResponse> {
        const request: FetchGetRequest = {
            url: `${this.base_url}/search`,
            params,
            filters
        };
        return this.fetch.get<FetchProductsResponse>(request);
    }
}
