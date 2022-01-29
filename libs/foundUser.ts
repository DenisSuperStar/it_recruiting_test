import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import AccountUser from "./accountUser";

class FoundUser extends AccountUser {
  protected findUser(req: express.Request, res: express.Response): void {
    const { body } = req;

    if (this.verifiedUser(body)) {
      const { login } = body;
      const emailRule: string =
        "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
      const isEmail: boolean = login.match(emailRule);

      if (isEmail) {
        const findByEmail: string = login;
        // искать по email
      } else {
        const findByLogin: string = login;
        // искать по login
      }
    } else {
      res.json({
        error: ReasonPhrases.UNAUTHORIZED,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  }
}

export default FoundUser;