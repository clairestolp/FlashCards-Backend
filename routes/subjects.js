const express = require("express");
const router = express.Router();
const Subjects = require("../models/subject");
const constants = require("../constants");

async function getSubjects(req, res, next) {
  let subjects;
  try {
    subjects = await Subjects.find({ createdBy: req.params.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subjects = subjects;
  next();
}

async function getSubject(req, res, next) {
  let subject;
  try {
    subject = await Subjects.findById(req.params.subject);
  } catch (err) {
    console.log(err);
  }
  res.subject = subject;
  next();
}

router.get("/:id", getSubjects, async (req, res) => {
  res.json(res.subjects);
});

router.post("/", async (req, res) => {
  const subject = new Subjects({
    name: req.body.name,
    createdBy: req.body.createdBy,
    description: req.body.description,
  });

  try {
    const newSubject = await subject.save();
    res.status(201).json({ status: constants.SUCCESS, ...newSubject });
  } catch (err) {
    res.status(500).json({ status: constants.FAILURE, message: err.message });
  }
});

router.post("/decks/:subject", getSubject, async (req, res) => {
  console.log(res.subject);
  const deck = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    res.subject.decks.push(deck);
    res.subject.save();
    res.json(res.subject);
  } catch (err) {
    res.status(500).json({
      status: constants.SUCCESS,
      message: "successfully created deck with id: " + res.subject._id,
    });
  }
});

router.delete("/deck/:subject", getSubject, async (req, res) => {
  try {
    console.log("removing deck:", req.body.deckId);
    res.subject.decks.pull(req.body.deckId);
    res
      .status(200)
      .json({ status: constants.SUCCESS, message: "successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: constants.FAILURE, message: error.message });
  }
});
module.exports = router;
