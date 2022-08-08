import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  userGroup: [{ type: mongoose.SchemaTypes.ObjectId, ref: "groups", default: [] }],
  createdAt: { type: Date, default: Date.now, immutable: true },
});

const User = mongoose.model("users", userSchema);

export default User;
