const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize("postgres://postgres:admin@127.0.0.1:5433/mvc"); // Example for postgres

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
//   });

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
	process.env.PG_TABLE_NAME,
	process.env.PG_USERNAME,
	process.env.PG_PASSWORD,
	{
		dialect: "postgres",
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		logging: false,
		// logging: console.log,
		// logging: function (str) {
		//     // ... do your own logging
		// }
	}
);

const db = {};
const models = path.join(__dirname, "../models/sequelize"); // path to a models' folder

fs.readdirSync(models)
	.filter(function (file) {
		return file.indexOf(".") !== 0 && file.slice(-3) === ".js";
	})
	.forEach(function (file) {
		const model = require(path.join(models, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// This creates the table if it doesn't exist (and does nothing if it already exists)
sequelize
	.sync()
	.then((_result) => {
		// console.log("Sequelize: All models were synchronized successfully.");
	})
	.catch((err) => {
		// console.log(err);
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
