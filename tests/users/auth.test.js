const request = require("supertest");

const app = require("../../src/app");
const UserModel = require("../../src/models/user.model");
const { setupDatabase } = require("../fixtures/mongodb");

beforeEach(setupDatabase);

test("Should register a new user", async () => {
	const userData = {
		full_name: "User Number One",
		email_address: "un1@example.com",
		password: "1234567",
	};
	await request(app).post("/users/auth/signup").send(userData).expect(201);

	// Assert that the database was changed correctly
	delete userData.password;
	const user = await UserModel.find(userData);
	expect(user.length).toBe(1);
});

test("Should fail register (data exist)", async () => {
	const userData = {
		full_name: "User Number Tow",
		email_address: "micao@example.com",
		password: "1234567",
	};
	await request(app).post("/users/auth/signup").send(userData).expect(409);
});
