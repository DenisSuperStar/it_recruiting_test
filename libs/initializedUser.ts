import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import UserValidation from "./userValidation";
import User from "../models/users";

class initializedUser {
  private readonly userValid: UserValidation;

  constructor() {
    this.userValid = new UserValidation();
  }

  public async findUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.userValid;

    if (userValid(body)) {
      const { email } = body;
      const emailRule: string =
        "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
      const isEmail: boolean = email.match(emailRule);

      if (isEmail) {
        const findByEmail: string = email;

        await User.findOne({ email: findByEmail }).then((res) => {
          console.log(res);
        });
      } else {
        const { login } = body;
        const findByLogin: string = login;

        await User.findOne({ login: findByLogin }).then((res) => {
          console.log(res);
        });
      }
    } else {
      res.json({
        error: ReasonPhrases.UNAUTHORIZED,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  }
}

export default initializedUser;
