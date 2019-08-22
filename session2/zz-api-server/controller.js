const { buildResponse } = require("./util");

const ping = (req, res, next) => {
  try {
    const result = buildResponse(false, "pong", {});
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  ping
};
