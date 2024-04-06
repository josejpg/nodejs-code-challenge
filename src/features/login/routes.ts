import { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  res.send();
});


export default router;