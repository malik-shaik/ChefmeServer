module.exports = (req, res, next) => {
  const response = {
    status: 404,
    message: 'Route Not Found',
  };
  return next(response);
};
