import type { FetchHeader } from "../../../models/featch-header.type";
import type { FetchPostRequest } from "../../../models/fetch-request.type";
import type { User } from "../../../models/types";
import { Fetch } from "../../../services/fetch.service";
import { Logger } from "../../../services/logger.service";
import type { AuthToken } from "../models/auth-token.type";
import type { FetchLoginRequest } from "../models/fetch-login-request.type";

export class AuthService {
	private base_url = "https://dummyjson.com/auth";
	private bearerToken = "";

	constructor(
		private readonly logger: Logger = new Logger("auth.service"),
		private readonly fetch: Fetch = new Fetch(),
	) {}

	/**
	 * Set a bearer token
	 *
	 * @param {string} bearerToken
	 */
	public setBearerToken(bearerToken: string): void {
		this.bearerToken = bearerToken;
	}

	/**
	 * Get the bearer token
	 *
	 * @returns {string}
	 */
	public getBearerToken(): string {
		return this.bearerToken;
	}

	/**
	 * Login user and get token
	 *
	 * @returns {User}
	 */
	public async login(credentials: FetchLoginRequest): Promise<User> {
		const request: FetchPostRequest = {
			url: `${this.base_url}/login`,
			body: JSON.stringify(credentials),
		};
		return this.fetch.post<User>(request);
	}

	/**
	 * Get current auth user
	 *
	 * @returns {User}
	 */
	public async getUser(bearerToken: string): Promise<User> {
		const base64Payload: string = bearerToken.split(".")[1];
		const tokenInfo: AuthToken = <AuthToken>JSON.parse(atob(base64Payload));
		let user: User = tokenInfo;
		const currentDatetime: Date = new Date();
		if (currentDatetime.getTime() - tokenInfo.exp < 0) {
			this.logger.warning("Token expired, trying to refresh");
			user = await this.refreshToken(this.bearerToken);
		}
		return user;
	}

	/**
	 * Refresh auth session
	 * Extend the session and create a new token without username and password
	 *
	 * @returns {User}
	 */
	public async refreshToken(bearerToken: string): Promise<User> {
		const authHeader: FetchHeader = {
			key: "Authorization",
			value: `Bearer ${bearerToken}`,
		};

		const request: FetchPostRequest = {
			url: `${this.base_url}/refresh`,
			body: "",
		};

		this.fetch.setHeader(authHeader);
		return this.fetch.post<User>(request);
	}
}
