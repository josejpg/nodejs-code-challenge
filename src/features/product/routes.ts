import { Request, Response, Router } from 'express';
import { Product } from '../../models/types';
import { getAll, getById } from './controllers/product.controller';
import { Logger } from '../../services/logger.service';
import { ErrorTui } from '../../utils/errors/error-tui.error';
import { responseError, responseSuccess } from '../../utils/response';

const logger: Logger = new Logger('routes.products');
const router = Router();

  router.get('/:productId', async (req: Request, res: Response) => {
    try {
      const product: Product = await getById(req.params.productId);
      responseSuccess(res, product);
  } catch (err: unknown) {
    responseError(res, err);
  }
    });

  router.get('/', async (req: Request, res: Response, next) => {
    try {
      const products: Product[] = await getAll();
      responseSuccess(res, products);
  } catch (err: unknown) {
    responseError(res, err);
  }
});

export default router;