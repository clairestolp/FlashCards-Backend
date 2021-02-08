const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deckSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      defualt: "",
    },
    lastStudied: {
      type: Date,
    },
    studyConfig: {
      sideOrder: [Number],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = deckSchema;
