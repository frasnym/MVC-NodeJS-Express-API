const express = require("express");

// Databases
require("./db/mongoose");
require("./models/custom_neckline.model");
require("./models/brand.model");
require("./db/sequelize");

// Custom Middlewares
const { jsend } = require("./middlewares/api");
// Routers
const authRouter = require("./routers/users/auth.router");
const productRouter = require("./routers/products/products.router");
const fashionRouter = require("./routers/products/fashions.router");
const categoryRouter = require("./routers/products/category.router");

// AMQP
// const publishToQueue = require("./services/MQService");

const app = express();
app.use(express.json()); // body raw JSON
app.use(express.static("uploads")); // expose upload image to public
app.use(jsend); // assign JSend response template

app.get("/getTimeStamp", (req, res) => {
	const data = Date.now().toString();
	return res.success(200, data);
});
app.post("/msg", async (req, res) => {
	const queueName = "user-messages";
	const payload = req.body.payload;

	// await publishToQueue(queueName, payload);
	for (let i = 0; i < 10; i++) {
		await publishToQueue(queueName, `Messagesee${i}`);
	}

	return res.success(200);
});
app.use("/users/auth", authRouter);
app.use("/products", productRouter);
app.use("/fashions", fashionRouter);
app.use("/categories", categoryRouter);

module.exports = app;
