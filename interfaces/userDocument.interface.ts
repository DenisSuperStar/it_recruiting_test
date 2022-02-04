import { Document } from "mongoose";

interface IUserDocument extends Document {
  login: string;
  email: string;
  password: string;
  registerDate: Date;
}

export default IUserDocument;
