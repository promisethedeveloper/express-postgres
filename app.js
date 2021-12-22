const express = require("express");
const app = express();
const ExpressError = require("./expressError.js");

// Parse request bodies for JSON
app.use(express.json());

const uRoutes = require("./routes/users.js");
app.use("/users", uRoutes);

// 404 handler
app.use((req, res, next) => {
	const err = new ExpressError("Not Found.", 404);

	// Pass error to the next middleware
	return next(err);
});

// General Error handler
app.use((err, req, res, next) => {
	// The default status is 500 Internal Server Error
	let status = err.status || 500;

	// Set the status and alert the user
	let message = err.msg;

	// set the status and alert the user
	return res.status(status).json({
		error: { message, status },
	});
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
