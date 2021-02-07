const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deckSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastStudied: {
      type: Date,
    },
    studyConfig: {
      sideOrder: [Number],
      default: [],
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
