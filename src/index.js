// const cluster = require("cluster");
// const os = require("os");
// // check if the process is the master process
// if (cluster.isMaster) {
// 	// get the number of available cpu cores
// 	const nCPUs = os.cpus().length;
// 	// fork worker processes for each available CPU core
// 	for (let i = 0; i < nCPUs; i++) {
// 		cluster.fork();
// 	}
// } else {
// 	// if the process is a worker process listen for requests
// 	const port = process.env.PORT;
// 	app.listen(port, () => {
// 		console.log(`Worker process ${process.pid} is up on port ${port}`);
// 	});
// }

const app = require("./app");

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Worker: process ${process.pid} is up on port ${port}`);
});
