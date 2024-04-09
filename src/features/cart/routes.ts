import { Request, Response } from 'express';
import { Router } from 'express';
import { CartContent } from '../../models/types';
import { addProduct, deleteProduct } from './controllers/cart.controller';
import { responseError, responseSuccess } from '../../utils/response';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const cartContent: CartContent = await addProduct({ cartPayload: req.body, token: req.headers.authorization ?? ''});
    responseSuccess(res, cartContent);
  } catch (err: unknown) {
    responseError(res, err);
  }
});

router.delete('/:productId(\\d+)', async (req: Request, res: Response) => {
  try {
    const productId: number = Number(req.params.productId);
    const cartContent: CartContent = await deleteProduct({ productId, token: req.headers.authorization ?? ''});
    responseSuccess(res, cartContent);
  } catch (err: unknown) {
    responseError(res, err);
  }
});

export default router;
