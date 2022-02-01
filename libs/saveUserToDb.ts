import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken";
import UserValidation from "./userValidation";
import User from "../models/users";
import EmailValidation from "./emailValidation";

class SaveUserToDb {
  private readonly userValid: UserValidation;
  private readonly validateEmail: EmailValidation;

  constructor() {
    this.userValid = new UserValidation();
    this.validateEmail = new EmailValidation();
  }

  public async saveUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.userValid;

    if (userValid(body)) {
      const { login, email, password } = body;
      const { validEmail } = this.validateEmail;
      let oldUser, user;

      if (validEmail(email)) {
        oldUser = await User.findOne({ email });

        if (!oldUser) {
          // encrypted password with md5 lib
          user = new User({
            login,
            email,
            password: password,
          });

          const token = jsonwebtoken.sign({ data: user.login }, "secret", {
            expiresIn: "1h",
          });
          
          res.cookie('authToken', token);

          await user.save().then(() => {
            res.json({
              message: ReasonPhrases.CREATED,
              statusCode: StatusCodes.CREATED,
            });
          });
        } else {
          res.json({
            error: ReasonPhrases.CONFLICT,
            statusCode: StatusCodes.CONFLICT,
          });
        }
      } else {
        oldUser = await User.findOne({ login });

        if (!oldUser) {
          // encrypted password with md5 lib
          user = new User({
            login,
            email: "",
            password: password,
          });

          const token = jsonwebtoken.sign({ data: user.login }, "secret", {
            expiresIn: "1h",
          });
          
          res.cookie('authToken', token);

          await user.save().then(() => {
            res.json({
              message: ReasonPhrases.CREATED,
              statusCode: StatusCodes.CREATED,
            });
          });
        } else {
          res.json({
            error: ReasonPhrases.CONFLICT,
            statusCode: StatusCodes.CONFLICT,
          });
        }
      }
    } else {
      res.json({
        error: ReasonPhrases.BAD_REQUEST,
        statusCode: StatusCodes.BAD_REQUEST
      });
    }
  }
}

export default SaveUserToDb;
