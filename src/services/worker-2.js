const amqp = require("amqplib/callback_api");
const CONN_URL = process.env.RABBITMQ_URL;

amqp.connect(CONN_URL, function (err, conn) {
	conn.createChannel(function (err, ch) {
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

process.on("exit", (code) => {
	ch.close;
	console.log("RabbitMQ: Closing channel", code);
});
