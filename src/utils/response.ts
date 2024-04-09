import type { NextFunction, Response } from "express";
import { ErrorTui } from "./errors/error-tui.error";
import { Logger } from "../services/logger.service";

const logger: Logger = new Logger("response");

export const responseSuccess = (
	res: Response,
	response: unknown,
	next?: NextFunction,
): void => {
	logger.info("Response: ", response);
	res.status(200);
	res.send(response);
	if (next) {
		next();
	}
};

export const responseError = (
	res: Response,
	err: unknown,
	next?: NextFunction,
): void => {
	const message: string =
		err instanceof Error ? err.message : JSON.stringify(err);
	const code: number = err instanceof ErrorTui ? err.code : 400;
	logger.error(`Code: ${code}. Message: ${message}`);
	res.status(code);
	res.send(message);
	if (next) {
		next();
	}
};
