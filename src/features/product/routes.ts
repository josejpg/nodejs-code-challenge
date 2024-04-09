import { Request, Response, Router } from 'express';
import { Product } from '../../models/types';
import { getAll, getById } from './controllers/product.controller';
import { responseError, responseSuccess } from '../../utils/response';

const router = Router();

router.get('/:productId(\\d+)', async (req: Request, res: Response) => {
  try {
    const productId: number = Number(req.params.productId);
    const product: Product = await getById(productId);
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
