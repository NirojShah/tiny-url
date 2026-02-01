const express = require("express");
const { createUrl, redirectUrl } = require("../controller/tiny-url.controller");

const tinyUrlRotue = express.Router();

tinyUrlRotue.post("/", createUrl);
tinyUrlRotue.get("/:shortUrl", redirectUrl);

module.exports = tinyUrlRotue;