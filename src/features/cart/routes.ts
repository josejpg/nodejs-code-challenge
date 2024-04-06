import { Request, Response } from 'express';
import { Router } from 'express';
import { CartContent } from '../../models/types';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const cartContent: CartContent = { grandTotal: 0, productList: []};
  res.send(cartContent);
});


export default router;