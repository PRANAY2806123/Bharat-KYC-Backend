module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({error: 'server_error', message: err.message || 'Internal Server Error'});
};
