const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Deck = require("./schemas/deck");

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    description: String,
    decks: [Deck],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
