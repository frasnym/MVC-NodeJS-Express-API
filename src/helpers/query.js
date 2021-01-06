const generateUnSelect = (role, collection) => {
	const collections = {
		customer: {
			global: "-createdAt -updatedAt -__v",
			product: "-_id",
			category: "-_id -parentId",
			brand: "-_id",
			model: "-_id -__v",
		},
		admin: {
			global: "-__v",
			product: "",
			category: "-_id -parentId",
			brand: "-_id",
			model: "-_id -__v",
		},
	};

	return `${collections[role].global} ${collections[role][collection]}`;
};

module.exports = {
	generateUnSelect,
};
