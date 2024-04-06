import { Request, Response } from 'express';
import { Router } from 'express';
import { Product } from '../../types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const products: Product[] = [];
    // put your code here
    res.send(products);
  });


export default router;