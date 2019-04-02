const ApiResponse = {
  success: (res, responseObject) => {
    res.status(200).json(responseObject);
  },

  error: (res, err) => {
    res.status(err.status || 500).json(err.message);
  },
};

module.exports = ApiResponse;
