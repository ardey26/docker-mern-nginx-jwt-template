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
const kanbanDeckConfig = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "KanbanDeck",
};

const requiredDescription = {
  type: String,
  required: true,
  min: 1,
  max: 200,
};

const kanbanConfig = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Kanban",
};

const kanbanKardSchema = new Schema(
  {
    user: requiredUser,
    username: requiredUsername,
    kanbanDeckId: kanbanDeckConfig,
    kanbanId: kanbanConfig,
    description: requiredDescription,
  },
  { timestamps: true }
);

const KanbanKard = mongoose.model("KanbanKard", kanbanKardSchema);

module.exports = KanbanKard;
