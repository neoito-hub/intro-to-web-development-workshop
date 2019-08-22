const express = require("express");
const bp = require("body-parser");

const { buildResponse } = require("./util");
const routes = require("./router");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
