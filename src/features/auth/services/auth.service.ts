import { FetchGetRequest, FetchPostRequest } from "../../../models/fetch-request.type";
import { User } from "../../../models/types";
import { Fetch } from "../../../services/fetch.service";
import { FetchLoginRequest } from "../models/fetch-login-request.type";

export class AuthService {
    private base_url = 'https://dummyjson.com/auth';

    constructor(
        private readonly fetch: Fetch = new Fetch()
    ){}

    /**
     * Login user and get token
     * 
     * @returns {User}
     */
    public async login(credentials: FetchLoginRequest): Promise<User> {
        console.log(credentials);
        const request: FetchPostRequest = {
            url: `${this.base_url}/login`,
            body: JSON.stringify(credentials)
        };
        return this.fetch.post<User>(request);
    }
}