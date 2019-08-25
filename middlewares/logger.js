module.exports = (req, res, next) => {
  console.log(req.params);
  console.log(req.body);
  next();
};
