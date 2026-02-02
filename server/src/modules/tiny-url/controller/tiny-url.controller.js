const asyncErrorHandler = require("../../../utils/asyncErrorHandler");
const CustomError = require("../../../utils/CustomError");
const {
  processRedirect,
  processCreateUrl,
} = require("../service/tiny-url.service");

const createUrl = asyncErrorHandler(async (req, res) => {
  const { url } = req.body;
  const resp = await processCreateUrl(url);
  if (resp.success) {
    return res.status(201).json({
      success: true,
      message: resp.message,
      url: resp.shortUrl,
    });
  }
});

const redirectUrl = asyncErrorHandler(async (req, res) => {
  const { shortUrl } = req.params;
  const resp = await processRedirect(shortUrl);
  if (resp.success) {
    return res.redirect(resp.url);
  }
  throw new CustomError(500, "Url not found.");
});

module.exports = {
  createUrl,
  redirectUrl,
};
