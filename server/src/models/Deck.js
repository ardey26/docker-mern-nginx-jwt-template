const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deckSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      max: 32,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // kards: Array,
  },
  {
    timestamps: true,
  }
);

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;
