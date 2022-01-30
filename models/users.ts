import { Schema, model } from "mongoose";
import User from "../libs/user.interface";

const userSchema = new Schema<User>({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<User>("User", userSchema);

export default User;