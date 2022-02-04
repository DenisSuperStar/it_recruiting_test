import { Document } from "mongoose";

interface IUserDocument extends Document {
  login: string;
  email: string;
  password: string;
  token: string;
}

export default IUserDocument;
