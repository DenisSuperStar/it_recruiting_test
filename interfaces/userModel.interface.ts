import { Model } from "mongoose";
import IUser from "../interfaces/user.interface";

interface IUserModel extends Model<IUser> {
  login: string;
  email: string;
  password: string;
  token: string;
}

export default IUserModel;
