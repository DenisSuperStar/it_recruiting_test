import express from "express";
import UserValidation from "./userValidation";
import User from "../models/users";
import EmailValidation from "./emailValidation";
import ComparePasswords from "./comparePasswords";
import GenerateAccessToken from "./generateAccessToken";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import IError from "./error.interface";

class InitializedUser {
  private readonly userValid: UserValidation;
  private readonly validateEmail: EmailValidation;
  private equalPasswords: ComparePasswords | undefined;
  private readonly accessToken: GenerateAccessToken;
  private readonly unAutorize: IError;
  private readonly badRequest: IError;

  constructor() {
    this.userValid = new UserValidation();
    this.validateEmail = new EmailValidation();
    this.accessToken = new GenerateAccessToken();
    this.unAutorize = {
      name: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    };
    this.badRequest = {
      name: ReasonPhrases.BAD_REQUEST,
      status: StatusCodes.BAD_REQUEST,
    };
  }

  public async findUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.userValid;

    if (userValid(body)) {
      const { email, password } = body;
      const { validEmail } = this.validateEmail;
      let user;

      if (validEmail(email)) {
        user = await User.findOne({ email });

        if (user) {
          this.equalPasswords = new ComparePasswords(
            user,
            password,
            user.password
          );
          const { giveAuthToken } = this.equalPasswords;

          giveAuthToken(req, res);
        } else {
          res.json({
            error: this.unAutorize.name,
            statusCode: this.unAutorize.status,
          });
        }
      } else {
        const { login } = body;
        user = await User.findOne({ login });

        if (user) {
          this.equalPasswords = new ComparePasswords(
            user,
            password,
            user.password
          );
          const { giveAuthToken } = this.equalPasswords;

          giveAuthToken(req, res);
        } else {
          res.json({
            error: this.unAutorize.name,
            statusCode: this.unAutorize.status,
          });
        }
      }
    } else {
      res.json({
        error: this.badRequest.name,
        statusCode: this.badRequest.status,
      });
    }
  }
}

export default InitializedUser;
