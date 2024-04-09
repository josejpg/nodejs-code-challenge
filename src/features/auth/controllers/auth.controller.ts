import { Product, User } from "../../../models/types";
import { Logger } from "../../../services/logger.service";
import { Error400 } from "../../../utils/errors/error-400.error";
import { ErrorTui } from "../../../utils/errors/error-tui.error";
import { FetchLoginRequest } from "../models/fetch-login-request.type";
import { AuthService } from "../services/auth.service";

const authService: AuthService = new AuthService();
const logger: Logger = new Logger('auth.controller');

/**
 * Login user and get token
 * 
 * @returns {User}
 */
export const login = async (username: string, password: string): Promise<User> => {
    try {
        if (!username) throw new Error400('username is required');
        if (!password) throw new Error400('password is required');
        const credentials: FetchLoginRequest = {username,  password};
        const response: User = await authService.login(credentials);
        authService.setBearerToken(response.token);
        logger.debug('Response received: ', response);
        return response;
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
 * Get current auth user
 * 
 * @returns {User}
 */
export const getUser = async (bearerToken: string): Promise<User> => {
    try {
        if (!bearerToken) throw new Error400('auth token is required');
        const response: User = await authService.getUser(bearerToken);
        logger.debug('Response received: ', response);
        return response;
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
 * Validate the bearer token
 * 
 * @param {string} bearerToken 
 * @returns {boolean}
 */
export const validateBearerToken = async (bearerToken?: string): Promise<boolean> => {
    if (!bearerToken) {
        return false;
    }

    try {
        const user: User = await getUser(bearerToken);
        authService.setBearerToken(user.token);
        return true;
    } catch (err: unknown) {
        return false;
    }
}
