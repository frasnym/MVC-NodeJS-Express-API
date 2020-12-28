const amqp = require("amqplib/callback_api");
const CONN_URL = process.env.RABBITMQ_URL;

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
	if (err) {
		return console.log("RabbitMQ: Error connection", err.message);
	}
	conn.createChannel(function (err, channel) {
		if (err) {
			return console.log("RabbitMQ: Error creating channel", err.message);
		}
		console.log("RabbitMQ: Connected successfully");
		ch = channel;

		ch.consume(
			"user-messages",
			function (msg) {
				console.log(".....");
				console.log("RabbitMQ", msg.content.toString());
			},
			{ noAck: true }
		);
	});
});

const publishToQueue = async (queueName, data) => {
	ch.sendToQueue(queueName, Buffer.from(data), { persistent: true });
};

process.on("exit", (code) => {
	ch.close;
	console.log("RabbitMQ: Closing channel", code);
});

module.exports = publishToQueue;
