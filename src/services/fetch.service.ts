import fetch, { RequestInit, Response } from 'node-fetch';
import { Logger } from './logger.service';
import { FetchHeader } from '../models/featch-header.type';
import { Headers } from '../models/headers.type';
import { FetchRequest } from '../models/fetch-request.type';

/**
 * Class Fetch
 * Allow GET, POST, PUT and DELETE methods
 */
export class Fetch {
   /**
    * Allowed methods
    * @type {string[]}
    */
    private allowedMethods: string[] = ['GET', 'POST', 'PUT', 'DELET'];

    /**
     * Headers to use on calls
     * 
     * @type {Map<string, string>}
     */
    private headers: Map<string, string> = new Map([
        ['Content-Type', 'application/json']
    ]);

    constructor(private readonly logger: Logger = new Logger('fetch.service')){}

    /**
     * Set a new header
     * 
     * @param {FetchHeader} header 
     */
    public setHeader(header: FetchHeader): void {
        this.headers.set(header.key, header.value);
    }

    /**
     * 
     * @returns {Headers}
     */
    public getHeaders(): Headers {
        return Array.from(this.headers.entries())
        .reduce(
            (headers: Headers, entry: string[]) => {
            const key: string = entry[0];
            const value: string = entry[1];
            headers[key] = value
            return headers;
        },
    {}
);
    }


    /**
     * Get the url to make a call
     * 
     * @param {FetchRequest} request 
     * @returns {string}
     */
    private getUrl(request: FetchRequest): URL {
        // Set url
        const url = new URL(request.url);
        
        // Set filters
        if (request.filters) {
            for (const [key, value] of request.filters) {
                url.searchParams.set(key, `${value}`);
            }
        }

        // Set parameters
        if (request.params) {
            for (const [key, value] of request.params) {
                url.searchParams.set(key, `${value}`);
            }
        }

        return url;
    }


    /**
     * Generic request call
     * 
     * @param {FetchRequest} request 
     * @returns {T}
     */
    public async request<T>(request: FetchRequest): Promise<T> {
        // Retrieve config from request
        const config: RequestInit | undefined = request.config;

        // Check if method is allowed
        if(!this.allowedMethods.includes(config?.method ?? '')){
            throw new Error(`Method ${config?.method} not allowed`)
        }

        // Retrieve url with query string from request
        const url: URL = this.getUrl(request);

        this.logger.debug(`GET info from ${url} with config `, config);

        // Do request
        const response: unknown = await fetch(url, config).then((res: Response) => res.json());

        // Check if response exists or an error message
        if (!response || (response as any).message) {
            const message: string = `Error from ${url}: ${(response as any).message ?? 'Missing response'}`
            throw new Error(message);
        }

        return response as T;
    }

    /**
     * GET call
     * 
     * @param {FetchRequest} request  
     * @returns {T}
     */
    public async get<T>(request: FetchRequest): Promise<T> {
        request.config = {
            ...request.config,
            method: 'GET',
            headers: request.config?.headers ?? this.getHeaders()
        }
        return this.request(request);
    }

    /**
     * POST call
     * 
     * @param {FetchRequest} request 
     * @returns {T}
     */
    public async post<T>(request: FetchRequest): Promise<T> {
        request.config = {
            ...request.config,
            method: 'POST',
            headers: request.config?.headers ?? this.getHeaders()
        }
        return this.request(request);
    }
}