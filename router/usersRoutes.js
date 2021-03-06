const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../schema/user");

router.get("/", (req, res, next) => {
  let query = {};
  parseInt(req.query.id) ? (query.manager = parseInt(req.query.id)) : "";

  User.find(query)
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: "No entries found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const user = new User({ ...req.body, _id: new mongoose.Types.ObjectId() });
  // const user = new User(req.body);
  console.log(user, "----------------------------------------->");
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:empId", (req, res, next) => {
  console.log(req.params);
  const id = req.params.empId;
  User.find({ empId: id })
    .exec()
    .then((doc) => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
