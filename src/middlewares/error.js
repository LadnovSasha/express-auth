module.exports = (err, req, res) => {
  console.log(err);
  res
    .status(500)
    .send({ message: 'Internal server error' });
}
