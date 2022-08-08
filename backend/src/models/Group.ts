import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: { type: String, require: true },
  permissions: {
    type: Object,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

const Group = mongoose.model("groups", groupSchema);

export default Group;
