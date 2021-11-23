const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { Server } = require("socket.io");

app.prepare().then(() => {
	const server = new createServer((req, res) => {
		// Be sure to pass `true` as the second argument to `url.parse`.
		// This tells it to parse the query portion of the URL.
		const parsedUrl = parse(req.url, true)
		const { pathname, query } = parsedUrl
		if (pathname === '/message') {
			if(query.vote) {
				io.emit("vote", query.q);
			}
			if(query.close) {
				io.emit("close","Voting is closed");
			}
			res.writeHead(200).end()
		} else if (pathname === '/b') {
			app.render(req, res, '/b', query)
		} else {
			handle(req, res, parsedUrl)
		}
	});
	const io = new Server(server);

	io.on("connection", (socket) => {
		socket.on("hello", (arg) => {
			console.log(arg); // world
		});
	});

	const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
	server.listen(PORT, LOCAL_ADDRESS, () => {
		const address = server.address();
		console.log('server listening at', address);
	});
}).catch((err) => {
	console.error("Next.js server failed to start", err);
})
