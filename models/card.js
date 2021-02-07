const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    deckId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    sides: [
      {
        name: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
