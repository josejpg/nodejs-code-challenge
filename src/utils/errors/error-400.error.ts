import { ErrorTui } from "./error-tui.error";

export class Error400 extends ErrorTui {
    constructor(message?: string) {
        super(400, message);
    }
}