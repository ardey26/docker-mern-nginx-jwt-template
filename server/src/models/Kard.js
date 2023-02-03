const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requiredUser = {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "User",
};

const requiredUsername = {
  type: String,
  required: true,
};
const deckConfig = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Deck",
};

const requiredDescription = {
  type: String,
  required: true,
  min: 1,
  max: 355,
};

const KardSchema = new Schema(
  {
    user: requiredUser,
    username: requiredUsername,
    deckId: deckConfig,
    deckTitle: String,
    description: requiredDescription,
  },
  { timestamps: true }
);

const Kard = mongoose.model("Kard", KardSchema);

module.exports = Kard;
