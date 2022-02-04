import { Model } from "mongoose";
import express from "express";
import md5 from "md5";
import GenerateAccessToken from "./generateAccessToken";
import IUserDocument from "../interfaces/userDocument.interface";
import IRequestBody from "../interfaces/requestBody.interface";
import IError from "../interfaces/error.interface";
import IUser from "../interfaces/user.interface";

class CreateUser {
  private readonly body: IRequestBody;
  private user: IUserDocument | undefined;
  private readonly User: Model<IUser>;
  private readonly created: IError;
  public encryptedPassword: string = "";
  private readonly accessToken: GenerateAccessToken;
  private authToken: string | undefined;

  constructor(body: IRequestBody, UserModel: Model<IUser>, create: IError) {
    this.body = body;
    this.User = UserModel;
    this.created = create;
    this.encryptePassword();
    this.accessToken = new GenerateAccessToken();
    this.createUser();
  }

  private encryptePassword(): void {
    const { password } = this.body;
    this.encryptedPassword = md5(password);
  }

  private createUser(): void {
    const { login, email } = this.body;
    const { generateToken } = this.accessToken;

    this.authToken = generateToken(login);
    this.user = new this.User({
      login,
      email,
      password: this.encryptePassword,
      token: this.authToken,
    });
  }

  public saveUser(req: express.Request, res: express.Response): void {
    const { login } = this.body;

    this.user?.save().then(() => {
      res.json({
        message: this.created.name,
        statusCode: this.created.status,
      });
    });

    res.cookie("authLogin", login);
  }
}

export default CreateUser;
