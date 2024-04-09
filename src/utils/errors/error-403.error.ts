import { ErrorTui } from "./error-tui.error";

export class Error403 extends ErrorTui {
	constructor(message?: string) {
		super(403, message);
	}
}
