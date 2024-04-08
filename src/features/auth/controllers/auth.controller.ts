import { Product, User } from "../../../models/types";
import { Logger } from "../../../services/logger.service";
import { Error400 } from "../../../utils/errors/error-400.error";
import { Error404 } from "../../../utils/errors/error-404.error";
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
        logger.info('Response received: ', response);
        return response;
    } catch (err: unknown) {
        // if is a custom error, throw it, in other case control it
        if (err instanceof Error400 || err instanceof Error404) {
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
