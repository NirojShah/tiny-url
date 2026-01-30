const express = require("express");
const cors = require("cors");

const useMiddlewares = (app) => {
  app.use(express.json());
  app.use(cors());
};

module.exports = useMiddlewares;
