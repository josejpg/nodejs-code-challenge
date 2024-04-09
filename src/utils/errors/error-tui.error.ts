export class ErrorTui extends Error {
    constructor(readonly code: number, message?: string) {
        super(message);
    }
}
