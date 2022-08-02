import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: { type: String, require: true },
  menus: {
    dashboard: { type: Boolean, default: false },
    employees: { type: Array, default: [false, "r"] },
    reports: { type: Array, default: [false, "r"] },
    settings: { type: Array, default: [false, "r"] },
  },
  kpiInfo: { type: Array, default: ["own", "r"] },
  salaryInfo: { type: Array, default: ["own", "r"] },
  ladderInfo: { type: Array, default: ["own", "r"] },
  profile: { type: Array, default: ["own", "r"] },
  createdAt: { type: Date, default: Date.now },
});

const Group = mongoose.model("groups", groupSchema);

export default Group;
