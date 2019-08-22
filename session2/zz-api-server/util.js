const buildResponse = (error, message, data = {}) => {
  return {
    error,
    message,
    data
  };
};

module.exports = {
  buildResponse
};
