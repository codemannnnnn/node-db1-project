const express = require("express");

const knex = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .where({ id: req.params.id })
    .first()
    .then((e) => {
      if (e) {
        res.status(200).json({ idData: e });
      } else {
        res.status(400).json({ message: "not an id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "not in db" });
    });
});

router.post("/", (req, res) => {
  knex("accounts")
    .insert(req.body, "id")
    .then(([id]) => {
      res.status(200).json({ data: id, info: req.body });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "issue with db" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  knex("accounts")
    .where({ id })
    .update(changes)
    .then((e) => {
      if (e > 0) {
        res.status(200).json({ message: "account updated" });
      } else {
        res.status(403).json({ errorMessage: "id not found" });
      }
    })
    .catch((e) => {
      res.status(500).json({ errorMessage: "issue with db" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  knex("accounts")
    .where({ id })
    .del()
    .then((e) => {
      if (e > 0) {
        res.status(200).json({ message: "account updated" });
      } else {
        res.status(403).json({ errorMessage: "id not found" });
      }
    })
    .catch((e) => {
      res.status(500).json({ errorMessage: "issue with db" });
    });
});

module.exports = router;
