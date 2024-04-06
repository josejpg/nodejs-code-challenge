import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import productsRoutes from '../features/products/routes';
import loginRoutes from '../features/login/routes';
import cartRoutes from '../features/cart/routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

router.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send();
  });

  router.use('/products', productsRoutes);
  router.use('/login', loginRoutes);
  router.use('/cart', cartRoutes);

  export default router;