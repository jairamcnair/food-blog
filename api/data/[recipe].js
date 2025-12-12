

const express = require("express");
const serverlessExpress = require("@vendia/serverless-express");

const app = express();

app.get("/:recipe", (req, res) => {
  res.json({ recipe: req.params.recipe });
});

module.exports = serverlessExpress({ app });