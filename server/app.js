const express = require("express");
const useMiddlewares = require("./middlewares/middlwares");

const app = express();
useMiddlewares(app)

module.exports = app;
