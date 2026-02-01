const { Schema, model } = require("mongoose");

const tinyUrlModel = new Schema({
  originalUrl: {
    type: String,
    required: [true, "original url is required."],
  },
  shortUrl: {
    type: String,
    required: [true, "short url is required."],
  },
});

const tinyUrl = model("tinyUrlModel", tinyUrlModel);

module.exports = tinyUrl;
