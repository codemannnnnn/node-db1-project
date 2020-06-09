const express = require("express");

const accRouter = require("../accounts/router.js");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", accRouter);

server.get("/", (req, res) => {
  res.status(200).json({ data: "api up" });
});

module.exports = server;
