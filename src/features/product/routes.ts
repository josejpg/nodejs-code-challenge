import { Request, Response, Router } from 'express';
import { Product } from '../../models/types';
import { getAll, getById } from './controllers/product.controller';
import { Logger } from '../../services/logger.service';

const logger: Logger = new Logger('routes.products');
const router = Router();

  router.get('/:productId', async (req: Request, res: Response) => {
    try {
      const product: Product = await getById(req.params.productId);
      res.status(200);
      res.send(product);
    } catch (err: unknown) {
      let message: string = err instanceof Error ? err.message : JSON.stringify(err);
      res.status(400);
      res.send(message);  
    }
  });

  router.get('/', async (req: Request, res: Response) => {
    try {
      const products: Product[] = await getAll();
      res.status(200);
      res.send(products);
    } catch (err: unknown) {
      let message: string = err instanceof Error ? err.message : JSON.stringify(err);
      res.status(400);
      res.send(message);  
    }
  });

export default router;