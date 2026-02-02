const dotenv = require("dotenv");

const envSelector = () => {
  const env = process.env.NODE_ENV || "development";
  let file;
  switch (env) {
    case "production":
      console.log("production")
      file = ".env.production";
    case "test":
      file = ".env";
    default:
      file = ".env.development";
  }

  dotenv.config({
    path: file,
  });
};

module.exports = envSelector