import express from "express";
import md5 from "md5";
import GenerateAccessToken from "./generateAccessToken";
import IError from "./error.interface";
import User from "../models/users";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

class AddNewUser {
  private readonly login: string;
  private readonly email: string;
  private readonly password: string;
  private encryptedPassword: string | undefined;
  private readonly accessToken: GenerateAccessToken;
  private user: any;
  private authToken: string | undefined;
  private readonly created: IError;

  constructor(login: string, email: string, password: string) {
    this.login = login;
    this.email = email;
    this.password = password;
    this.accessToken = new GenerateAccessToken();
    this.created = { name: ReasonPhrases.CREATED, status: StatusCodes.CREATED };
    this.encryptePassword();
    this.createUser();
  }

  private encryptePassword(): void {
    this.encryptedPassword = md5(this.password);
  }

  private createUser(): void {
    const { generateToken } = this.accessToken;

    this.authToken = generateToken(this.login);
    this.user = new User({
      login: this.login,
      email: this.email,
      password: this.encryptedPassword,
      token: this.authToken,
    });
  }

  public handOverToken(req: express.Request, res: express.Response): void {
    res.cookie("authToken", this.authToken);
  }

  public async addUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { name, status } = this.created;

    await this.user.save().then(() => {
      res.json({
        message: name,
        statusCode: status,
      });
    });
  }
}

export default AddNewUser;
