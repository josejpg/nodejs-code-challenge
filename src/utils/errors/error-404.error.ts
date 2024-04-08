import { ErrorTui } from "./error-tui.error";

export class Error404 extends ErrorTui {
    constructor(message?: string) {
        super(404, message);
    }
}