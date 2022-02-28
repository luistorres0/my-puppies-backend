const express = require("express");
const cors = require("cors");

const userRouter = require("./users/users.router");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
