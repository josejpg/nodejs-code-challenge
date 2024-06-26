import type { Request, Response } from "express";
import { Router } from "express";
import { login } from "./controllers/auth.controller";
import type { User } from "../../models/types";
import { responseError, responseSuccess } from "../../utils/response";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		const user: User = await login(req.body.username, req.body.password);
		responseSuccess(res, user);
	} catch (err: unknown) {
		responseError(res, err);
	}
});

export default router;
