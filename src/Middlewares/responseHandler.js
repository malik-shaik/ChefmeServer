module.exports = (response, req, res, next) => {
  response.status === 200
    ? res.status(response.status).send(response.data)
    : res
        .status(response.status || 500)
        .send({ error: response.message || 'Server Error' });
};

// todo: error log service
