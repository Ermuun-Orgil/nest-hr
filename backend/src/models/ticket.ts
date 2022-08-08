import mongoose from "mongoose";

const { Schema } = mongoose;

const historySchema = new Schema({
  note: String,
  changedBy: Object,
  changed: {
    type: String,
    enum: ["status", "assignee_id", "assignee_group"],
  },
  changedFrom: {
    type: String,
  },
  changedTo: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const ticketSchema = new Schema({
  reporter_id: { type: String, required: true },
  assignee_id: { type: String, required: true },
  assignee_group: { type: Array, default: [] },
  summary: { type: String, required: true },
  status: {
    type: ["open", "closed", "resolved", "rejected"],
    default: "open",
  },
  type: {
    type: String,
    enum: ["office", "dayoff", "other"],
    default: "office",
  },
  priority: {
    type: String,
    enum: ["low", "meddium", "high"],
    default: "low",
  },
  description: { type: String, required: true },
  history: [historySchema],
  createdAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("ticket", ticketSchema);

export default Ticket;
