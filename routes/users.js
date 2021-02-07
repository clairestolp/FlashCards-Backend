const express = require("express");
const router = express.Router();
const User = require("../models/User");
const constants = require("../constants");

// user middleware to find a new user,
// takes req, and res object and uses
// next to pass the req and response to the api
async function getUser(req, res, next) {
  let user;
  try {
    console.log(req.body);
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else {
      console.log("in else");
      user = await User.findById(req.params.id);
    }

    if (user === null) {
      res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    res.status(500).json({ message: err.mesasge });
  }
  res.user = user;
  next();
}

//Get All Route
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ status: constants.FAILURE, message: err.message });
  }
});

//Get One Route
router.get("/:id", getUser, async (req, res) => {
  res.json(res.user);
});

//Get by email
router.post("/email", getUser, async (req, res) => {
  try {
    res.status(200).json(res.user);
  } catch (err) {
    console.log(err);
  }
});

//Create One Route
router.post("/", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ status: constants.SUCCESS, newUser });
  } catch (err) {
    res.status(400).json({ status: constants.FAILURE, mssage: err.message });
  }
});

//Edit One Route PATCH version
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.firstname !== null) {
    res.user.firstname = req.body.firstname;
  }
  if (req.body.lastname !== null) {
    res.user.lastname = req.body.lastname;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Edit One Route PUT version
router.put(":/id", getUser, async (req, res) => {
  try {
    const updatedUser = await res.user.set(req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete One Route
router.delete("/id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
