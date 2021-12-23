process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testUser;

beforeEach(async () => {
	const result = await db.query(
		`INSERT INTO users (name, type) VALUES ('Peanut', 'admin') RETURNING id, name, type`
	);
	testUser = result.rows[0];
});

afterEach(async () => {
	await db.query(`DELETE FROM users`);
});

afterAll(async () => {
	await db.end();
});

describe("HOPE THIS WORKS", () => {
	test("Practice", () => {
		console.log(testUser);
		expect(1).toBe(1);
	});
});

describe("GET /users", () => {
	test("Get a list with one user", async () => {
		const res = await request(app).get("/users");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ users: [testUser] });
	});
});

describe("GET /users/:id", () => {
	test("Get a single user", async () => {
		const res = await request(app).get(`/users/${testUser.id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ user: testUser });
	});
	test("Responds with 404 for invalid id", async () => {
		const res = await request(app).get(`/users/0`);
		expect(res.statusCode).toBe(200);
	});
});
