const { Router } = require("express");
const tinyUrlRotue = require("../modules/tiny-url/route/tiny-url.route");

const appRoute = Router();

appRoute.use("/", tinyUrlRotue);

module.exports = appRoute;
