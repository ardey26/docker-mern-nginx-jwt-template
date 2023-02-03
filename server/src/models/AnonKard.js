const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requiredDescription = {
  type: String,
  required: true,
  min: 1,
  max: 355,
};

const AnonKardSchema = new Schema(
  {
    username: String,
    description: requiredDescription,
  },
  { timestamps: true }
);

const AnonKard = mongoose.model("AnonKard", AnonKardSchema);

module.exports = AnonKard;
