import { FetchResponse } from "../../../models/featch-response.type";
import { Product } from "../../../models/types";

export interface FetchProductsResponse extends FetchResponse {
    products: Product[];
}
