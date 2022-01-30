import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import UserValidation from "./userValidation";
import User from "../models/users";

class SaveUserToDb {
  private readonly userValid: UserValidation;

  constructor() {
    this.userValid = new UserValidation();
  }

  public async saveUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.userValid;

    if (userValid(body)) {
      const { login, password } = body;
      const user = new User({
        login: login,
        password: password,
      });

      await user.save().then(() => {
        console.log("Пользователь сохранен в базу!");
      });
    } else {
      res.json({
        error: ReasonPhrases.UNAUTHORIZED,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  }
}

export default SaveUserToDb;
