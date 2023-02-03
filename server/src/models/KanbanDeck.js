const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requiredUser = {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: "User",
};

const kanbanConfig = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Kanban",
};

const requiredTitle = {
  type: String,
  required: true,
  min: 1,
  max: 230,
};

const statusEnum = {
  type: String,
  enum: ["to do", "in progress", "done"],
};
severityEnum = {
  type: String,
  enum: ["dark", "danger", "warning", "info"],
};
const KanbanDeckSchema = new Schema(
  {
    user: requiredUser,
    username: {
      type: String,
      required: true,
    },
    kanbanId: kanbanConfig,
    title: requiredTitle,
    status: statusEnum,
    severity: severityEnum,
  },
  { timestamps: true }
);

const KanbanDeck = mongoose.model("KanbanDeck", KanbanDeckSchema);

module.exports = KanbanDeck;
