import app from "../app";
import supertest from "supertest";
import userMock from "./mock/user.json";
import { Logger } from "../services/logger.service";
import type { FetchLoginRequest } from "../features/auth/models/fetch-login-request.type";

const request = supertest(app);
const LOGIN: string = "/login";
const CREDENTIALS: FetchLoginRequest = {
	username: "atuny0",
	password: "9uQFF1Lh",
};
const FAKE_CREDENTIALS: FetchLoginRequest = {
	username: "atuny0",
	password: "1234567890",
};

describe("Auth", () => {
	beforeEach(() => {
		jest.spyOn(Logger.prototype, "log").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "debug").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "info").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "warning").mockImplementation(jest.fn());
		jest.spyOn(Logger.prototype, "error").mockImplementation(jest.fn());
	});

	it("should return a user", async () => {
		const response = await request.post(LOGIN).send(CREDENTIALS);
		const userResponse: string = JSON.stringify({...JSON.parse(response.text), token: 'VALID'});
		const user: string = JSON.stringify({...userMock, token: 'VALID'});
		expect(response.status).toBe(200);
		expect(userResponse).toBe(user);
	});

	it("should return an error because wrong credentials", async () => {
		const response = await request.post(LOGIN).send(FAKE_CREDENTIALS);
		expect(response.status).toBe(404);
		expect(response.text).toBe("Invalid credentials");
	});
});
