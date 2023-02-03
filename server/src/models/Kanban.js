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

const kanbanSchema = new Schema(
  {
    username: requiredUsername,
    title: {
      type: String,
      max: 128,
    },
    user: requiredUser,
  },
  {
    timestamps: true,
  }
);

const Kanban = mongoose.model("Kanban", kanbanSchema);

module.exports = Kanban;
