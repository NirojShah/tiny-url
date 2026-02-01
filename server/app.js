const express = require("express");
const useMiddlewares = require("./middlewares/middlwares");
const appRoute = require("./src/routes/app.routes");

const app = express();
useMiddlewares(app);

app.use("/", appRoute);

module.exports = app;
