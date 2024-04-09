import { Router, NextFunction, Request, Response } from 'express';
import { responseError } from '../utils/response';
import { Error403 } from '../utils/errors/error-403.error';
import { getUser, validateBearerToken } from '../features/auth/controllers/auth.controller';

const router = Router();
const ROOT_PATH: string = '/';
const AVAILABLE_PATH_WITHOUT_AUTH: string[] = ['login', 'products'];

router.use(async (req: Request, res: Response, next: NextFunction) => {
    const isRootPath: boolean = req.originalUrl === ROOT_PATH;
    if (!isRootPath){
        const isNeededAuth: boolean = !AVAILABLE_PATH_WITHOUT_AUTH.some((path: string) => req.originalUrl.match(`/${path}`));
				if(isNeededAuth){
					try {
						const isValidToken: boolean = await validateBearerToken(req.headers.authorization);
						if (!isValidToken) {
							const error: Error403 = new Error403(`Access denied`);
							responseError(res, error);
							return;
						}
					} catch(err: unknown) {
						responseError(res, err);
						return;
					}
				}
    }
  next();
});

export default router;
