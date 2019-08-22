const express = require("express");
const bp = require("body-parser");

const { buildResponse } = require("./util");
const routes = require("./router");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/', routes);

// 400 client error
// 500 server error
const errorHandler = (err, req, res, next) => {
  let status = 400;
  let response = {};
  let message = "Unknown client error";
  if (err) {
    // is 500
    status = 500;
    message = "Unknown server error";
    response = buildResponse(true, message, {});
  }

  if (req.xclient) {
    message = req.xclient.message;
    response = buildResponse(true, message, {});
  }

  res.status(status).json(response);
};

app.use(errorHandler);

module.exports = app;
