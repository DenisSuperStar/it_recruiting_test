import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import UserValidation from "./userValidation";
import User from "../models/users";
import jsonwebtoken from "jsonwebtoken";
import EmailValidation from "./emailValidation";

class initializedUser {
  private readonly userValid: UserValidation;
  private readonly validateEmail: EmailValidation;

  constructor() {
    this.userValid = new UserValidation();
    this.validateEmail = new EmailValidation();
  }

  public async findUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.userValid;

    if (userValid(body)) {
      const { email } = body;
      const { validEmail } = this.validateEmail;
      let user, token: string;

      if (validEmail(email)) {
        user = await User.findOne({ email });

        if (user) {
          token = jsonwebtoken.sign({ data: user.login }, "secret", {
            expiresIn: "1h",
          });
          
          res.cookie('authToken', token);
        } else {
          res.json({
            error: ReasonPhrases.UNAUTHORIZED,
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }
      } else {
        const { login } = body;
        user = await User.findOne({ login });

        if (user) {
          token = jsonwebtoken.sign({ data: user.login }, "secret", {
            expiresIn: "1h",
          });

          res.cookie('authToken', token);
        } else {
          res.json({
            error: ReasonPhrases.UNAUTHORIZED,
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }
      }
    } else {
      res.json({
        error: ReasonPhrases.BAD_REQUEST,
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
  }
}

export default initializedUser;
