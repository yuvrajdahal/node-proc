import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "manager", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const UserModel = model("User", userSchema);
export default UserModel;
