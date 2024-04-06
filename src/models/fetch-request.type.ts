import { RequestInit } from "node-fetch";
import { FetchRequestFilters } from "./fetch-request-filters.type";

export type FetchRequest = {
    url: string;
    filters?: Map<FetchRequestFilters, string | number>;
    params?: Map<string, string>;
    config?: RequestInit;
}