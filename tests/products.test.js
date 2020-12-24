const request = require("supertest");

const app = require("../src/app");
const { product: ProductModel } = require("../src/db/sequelize");
const { setupPGSQL, productOne } = require("./fixtures/postgresql");

beforeAll(setupPGSQL);

test("Product: Create New Product (SUCCESS)", async () => {
	const productData = {
		title: "first product",
		price: 3500,
		description: "1st desc",
	};
	const response = await request(app)
		.post("/products")
		.send(productData)
		.expect(201);

	// Assert that the database was changed correctly
	const product = await ProductModel.findByPk(response.body.data.id);
	expect(product).not.toBeNull();

	// Assetions about the response
	expect(response.body.data).toMatchObject(productData);
});

test("Product: Read All Products (SUCCESS)", async () => {
	await request(app).get("/products").expect(200);
});

test("Product: Read Single Product by ID (SUCCESS)", async () => {
	const response = await request(app).get("/products/1").expect(200);

	for (const key in productOne) {
		expect(productOne[key]).toBe(response.body.data[key]);
	}
});

test("Product: Read Single Product by ID (FAIL: Not Found)", async () => {
	await request(app).get("/products/100").expect(404);
});

test("Product: Update Single Product by ID (SUCCESS)", async () => {
	const productData = {
		title: "update first product",
	};
	await request(app).patch("/products/1").send(productData).expect(200);

	// Assert that the database was changed correctly
	const product = await ProductModel.findByPk(1);
	expect(product.title).toBe(productData.title);
});

test("Product: Update Single Product by ID (FAIL: Not Found)", async () => {
	const productData = {
		title: "update first product",
	};
	await request(app).patch("/products/100").send(productData).expect(404);
});
