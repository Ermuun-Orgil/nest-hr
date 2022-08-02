import mongoose from "mongoose";
import { ROLE_TYPES } from "../utils/constants/types";
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: ROLE_TYPES[0],
  },
  userGroup: { type: Array, default: [] },
  // accessToken: {
  //   type: String,
  // },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

export default User;
