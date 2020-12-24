module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		"product", // table name
		{
			// Model attributes are defined here
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			title: DataTypes.STRING,
			price: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			description: DataTypes.STRING,
		},
		{
			// Other model options go here
		}
	);

	return Product;
};
