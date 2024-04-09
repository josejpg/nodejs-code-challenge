/**
 * Class Logger.
 *
 * Overrides the console class by adding additional useful information
 */
export class Logger {
	constructor(private readonly namespace?: string) {}

	private getMetadata(): string {
		let metadata = `[${new Date().toISOString()}]`;

		if (this.namespace) {
			metadata += ` [${this.namespace}]`;
		}

		return metadata;
	}

	/**
	 * Log message
	 *
	 * @param {any} message
	 * @param {any[]} optionalParams
	 */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public log(message?: any, ...optionalParams: any[]): void {
		const metadata: string = this.getMetadata();
		optionalParams.unshift(message);
		console.log(metadata, optionalParams);
	}

	/**
	 * Debug message
	 *
	 * @param {any} message
	 * @param {any[]} optionalParams
	 */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public debug(message?: any, ...optionalParams: any[]): void {
		const metadata: string = this.getMetadata();
		optionalParams.unshift(message);
		console.debug(metadata, optionalParams);
	}

	/**
	 * Info message
	 *
	 * @param {any} message
	 * @param {any[]} optionalParams
	 */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public info(message?: any, ...optionalParams: any[]): void {
		const metadata: string = this.getMetadata();
		optionalParams.unshift(message);
		console.info(metadata, optionalParams);
	}

	/**
	 * Warning message
	 *
	 * @param {any} message
	 * @param {any[]} optionalParams
	 */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public warning(message?: any, ...optionalParams: any[]): void {
		const metadata: string = this.getMetadata();
		optionalParams.unshift(message);
		console.warn(metadata, optionalParams);
	}

	/**
	 * Error message
	 *
	 * @param {any} message
	 * @param {any[]} optionalParams
	 */
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public error(message?: any, ...optionalParams: any[]): void {
		const metadata: string = this.getMetadata();
		optionalParams.unshift(message);
		console.error(metadata, optionalParams);
	}
}
