import express from "express";
import VerifyUser from "./verifyUser";
import ComparePasswords from "./comparePasswords";
import IError from "../interfaces/error.interface";

class SearchUser {
  private verifyUser: VerifyUser;
  private equalPasswords: ComparePasswords | undefined;
  private readonly User;
  private readonly badRequest: IError;
  private readonly unAutorize: IError;

  constructor(notAutorize: IError, badReq: IError, UserModel: any) {
    this.verifyUser = new VerifyUser();
    this.User = UserModel; // import User from "../models/users";
    this.badRequest = badReq; // { name: ReasonPhrases.BAD_REQUEST, status: StatusCodes.BAD_REQUEST }
    this.unAutorize = notAutorize; // { name: ReasonPhrases.UNAUTHORIZED, status: StatusCodes.UNAUTHORIZED }
  }

  public async findUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.verifyUser;

    if (userValid(body)) {
      const { email, password } = body;
      const { emailValid } = this.verifyUser;
      let user;

      if (emailValid(body)) {
        user = await this.User.findOne({ email });

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
        user = await this.User.findOne({ login });

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

export default SearchUser;
