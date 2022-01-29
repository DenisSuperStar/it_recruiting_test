import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import AccountUser from "../libs/accountUser";

class UserDb extends AccountUser {
  protected saveUser(req: express.Request, res: express.Response): void {
    const { body } = req;

    if (this.verifiedUser(body)) {
      const { login, password } = body;
      // Зашифровать пароль
      // Сохранить в базу данных
    } else {
      res.json({
        error: ReasonPhrases.UNAUTHORIZED,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  }
}

export default UserDb;