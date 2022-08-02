import mongoose from "mongoose";

const { Schema } = mongoose;
const policySchema = new Schema({
  roles: { type: Object },
  groups: { type: Array },
  permissionList: { type: Array },
});
const permissionSchema = new Schema({
  permissionName: { type: String, required: true },
  permissionList: { type: Array, default: [], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Permission = mongoose.model("policies", policySchema);

export default Permission;
