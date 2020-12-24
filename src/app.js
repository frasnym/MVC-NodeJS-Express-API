const express = require("express");

// Databases
require("./db/mongoose");
require("./db/sequelize");

// Custom Middlewares
const { jsend } = require("./middlewares/api");
// Routers
const authRouter = require("./routers/users/auth.router");
const productRouter = require("./routers/products/products.router");

const app = express();
app.use(express.json()); // body raw JSON
app.use(express.static("uploads")); // expose upload image to public
app.use(jsend); // assign JSend response template

app.get("/getTimeStamp", (_req, res) => {
	const data = Date.now().toString();
	return res.success(200, data);
});
app.use("/users/auth", authRouter);
app.use("/products", productRouter);

module.exports = app;
