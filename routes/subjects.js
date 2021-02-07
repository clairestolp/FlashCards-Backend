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

module.exports = router;
