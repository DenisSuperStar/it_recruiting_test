import express from "express";
import md5 from "md5";
import GenerateAccessToken from "./generateAccessToken";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import IError from "./error.interface";

class ComparePasswords {
  private user;
  private readonly authPassword: string;
  private readonly encryptedPassword: string;
  private readonly accessToken: GenerateAccessToken;
  private authToken: string = "";
  private readonly unAutorize: IError;

  constructor(user: any, password: string, oldPassword: string) {
    this.user = user;
    this.authPassword = password;
    this.encryptedPassword = oldPassword;
    this.accessToken = new GenerateAccessToken();
    this.unAutorize = {
      name: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  public giveAuthToken(req: express.Request, res: express.Response): void {
    const { login } = this.user;
    const { name, status } = this.unAutorize;
    const convertPassword = md5(this.authPassword);

    if (convertPassword == this.encryptedPassword) {
      const { generateToken } = this.accessToken;

      this.authToken = generateToken(login);
      this.user.token = this.authToken;
      res.cookie("authToken", this.authToken);
    } else {
      res.json({
        error: name,
        statusCode: status,
      });
    }
  }
}

export default ComparePasswords;
