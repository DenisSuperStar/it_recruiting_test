import express from "express";
import md5 from "md5";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import GenerateAccessToken from "./generateAccessToken";
import IError from "../interfaces/error.interface";
import User from "../models/users";

class CreateUser {
  private readonly body: any;
  private user: any;
  private readonly created: IError;
  public encryptedPassword: string = '';
  private readonly accessToken: GenerateAccessToken;
  private authToken: string | undefined;
  
  constructor(body: any) {
    this.body = body;
    this.user = new Object();
    this.created = { name: ReasonPhrases.CREATED, status: StatusCodes.CREATED };
    this.encryptePassword();
    this.accessToken = new GenerateAccessToken(body);
    this.createUser();
  }

  private encryptePassword(): void {
    const { password } = this.body;
    this.encryptedPassword = md5(password);
  }

  private createUser(): void {
    const { login, email } = this.body;
    const { generateToken } = this.accessToken;

    this.authToken = generateToken();
    this.user = new User({
      login,
      email,
      password: this.encryptePassword,
      token: this.authToken,
    });
  }

  public async saveUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { login } = this.body;

    await this.user.save().then(() => {
      res.json({
        message: this.createUser.name,
        statusCode: this.created.status,
      });
    });

    res.cookie("authLogin", login);
  }
}

export default CreateUser;
