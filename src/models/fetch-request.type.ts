import { RequestInit } from "node-fetch";
import { FetchRequestFilters } from "./fetch-request-filters.type";

type FetchBasic = {
    url: string;
    config?: RequestInit;
}

export type FetchGetRequest = FetchBasic & {
    filters?: Map<FetchRequestFilters, string | number>;
    params?: Map<string, string>;
}

export type FetchPostRequest = FetchBasic & {
    body: string;
}

export type FetchRequest = FetchGetRequest | FetchPostRequest;
