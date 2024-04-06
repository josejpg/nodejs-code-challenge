import { Router, NextFunction, Request, Response } from 'express';
import productsRoutes from '../features/product/routes';
import loginRoutes from '../features/login/routes';
import cartRoutes from '../features/cart/routes';

const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

  router.use('/products',productsRoutes);
  router.use('/login', loginRoutes);
  router.use('/cart', cartRoutes);
  router.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send();
  });

  export default router;