const CustomError = require("../../../utils/CustomError");
const tinyUrl = require("../model/tiny-url.model");
const crypto = require("crypto");

const generateHashLInk = (url) => {
  const hash = crypto.createHash("sha256");
  hash.update(url);
  const fullLength = hash.digest("hex");
  return fullLength.substring(0, 8);
};

const processCreateUrl = async (url) => {
  try {
    const resp = generateHashLInk(url);
    const alreadyExists = await tinyUrl.findOne({
      originalUrl: url,
    });

    if (alreadyExists) {
      return {
        success: true,
        message: "already exists",
        shortUrl: alreadyExists.shortUrl,
      };
    }
    const createNew = await tinyUrl.create({
      originalUrl: url,
      shortUrl: resp,
    });

    if (createNew) {
      return {
        success: true,
        message: "successfully created new.",
        shortUrl: createNew.shortUrl,
      };
    }
    throw new CustomError(500, "something went wrong.");
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};

const processRedirect = async (shortUrl) => {
  try {
    const exists = await tinyUrl.findOne({
      shortUrl: shortUrl,
    });
    if (!exists) {
      throw new CustomError(404, "Url Not Found.");
    }
    return {
      success: true,
      url: exists.originalUrl,
    };
  } catch (err) {
    throw new CustomError(500, err.message);
  }
};

module.exports = {
  processCreateUrl,
  processRedirect,
};
