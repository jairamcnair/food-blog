


module.exports = (req, res) => {
  const { recipe } = req.query;
  res.json({ recipe });
};