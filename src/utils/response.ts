import { Response } from "express";
import { ErrorTui } from "./errors/error-tui.error";

export const responseSuccess = (res: Response, response: any) => {
    res.status(200);
    res.send(response);
}

export const responseError = (res: Response, err: unknown) => {
    const message: string = err instanceof Error ? err.message : JSON.stringify(err);
    const code: number = err instanceof ErrorTui ? err.code : 400;
    res.status(code);
    res.send(message);  
  }