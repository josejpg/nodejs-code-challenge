import type { FetchResponse } from "../../../models/featch-response.type";
import type { Product } from "../../../models/types";

export interface FetchProductsResponse extends FetchResponse {
	products: Product[];
}
