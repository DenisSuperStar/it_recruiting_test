import { Schema, model } from "mongoose";
import IUser from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  login: {
    type: Schema.Types.String,
    ref: 'Photo',
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date
  }
});

const User = model<IUser>("User", userSchema);

export default User;
