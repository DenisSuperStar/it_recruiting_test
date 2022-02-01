import express from "express";
import UserValidation from "./userValidation";
import User from "../models/users";
import EmailValidation from "./emailValidation";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import IError from "./error.interface";
import AddNewUser from "./addNewUser";

class SaveUserToDb {
  private readonly userValid: UserValidation;
  private readonly validateEmail: EmailValidation;
  private addUser: AddNewUser | undefined;
  private readonly created: IError;
  private readonly badRequest: IError;
  private readonly conflict: IError;

  constructor() {
    this.userValid = new UserValidation();
    this.validateEmail = new EmailValidation();
    this.created = { name: ReasonPhrases.CREATED, status: StatusCodes.CREATED };
    this.badRequest = {
      name: ReasonPhrases.BAD_REQUEST,
      status: StatusCodes.BAD_REQUEST,
    };
    this.conflict = {
      name: ReasonPhrases.CONFLICT,
      status: StatusCodes.CONFLICT,
    };
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
      let oldUser;

      if (validEmail(email)) {
        oldUser = await User.findOne({ email });

        if (!oldUser) {
          this.addUser = new AddNewUser(login, email, password);
          const { handOverToken, addUser } = this.addUser;

          handOverToken(req, res);
          addUser(req, res);
        } else {
          res.json({
            error: this.conflict.name,
            statusCode: this.conflict.status,
          });
        }
      } else {
        oldUser = await User.findOne({ login });

        if (!oldUser) {
          this.addUser = new AddNewUser(login, email, password);
          const { handOverToken, addUser } = this.addUser;

          handOverToken(req, res);
          addUser(req, res);
        } else {
          res.json({
            error: this.conflict.name,
            statusCode: this.conflict.status,
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

export default SaveUserToDb;
