import express from "express";
import VerifyUser from "./verifyUser";
import ComparePasswords from "./comparePasswords";
import GenerateAccessToken from "./generateAccessToken";
import IError from "../interfaces/error.interface";
import IUser from "../interfaces/user.interface";
import { Model } from "mongoose";

class SearchUser {
  private readonly verifyUser: VerifyUser;
  private readonly comparePassword: ComparePasswords;
  private readonly createToken: GenerateAccessToken;
  private readonly User: Model<IUser>;
  private readonly badRequest: IError;
  private readonly unAutorize: IError;

  constructor(notAutorize: IError, badReq: IError, UserModel: Model<IUser>) {
    this.verifyUser = new VerifyUser();
    this.comparePassword = new ComparePasswords();
    this.createToken = new GenerateAccessToken();
    this.User = UserModel;
    this.badRequest = badReq;
    this.unAutorize = notAutorize;
  }

  public async findUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.verifyUser;

    if (userValid(body)) {
      const { emailValid } = this.verifyUser;
      let user;

      if (emailValid(body)) {
        const { login, email, password } = body;
        user = await this.User.findOne({ email });

        if (user) {
          const { compareHashes } = this.comparePassword;
          const { generateToken } = this.createToken;

          if (compareHashes(password, user)) {
            const authToken = generateToken(login);
            req.userAutorize = authToken;

            res.cookie("authLogin", login);
          } else {
            res.json({
              error: this.unAutorize.name,
              statusCode: this.unAutorize.status,
            });
          }
        } else {
          res.json({
            error: this.unAutorize.name,
            statusCode: this.unAutorize.status,
          });
        }
      } else {
        const { login, password } = body;
        user = await this.User.findOne({ login });

        if (user) {
          const { compareHashes } = this.comparePassword;
          const { generateToken } = this.createToken;

          if (compareHashes(password, user)) {
            const authToken = generateToken(login);
            req.userAutorize = authToken;

            res.cookie("authLogin", login);
          } else {
            res.json({
              error: this.unAutorize.name,
              statusCode: this.unAutorize.status,
            });
          }
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
