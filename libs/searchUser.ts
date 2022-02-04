import express from "express";
import VerifyUser from "./verifyUser";
import ComparePasswords from "./comparePasswords";
import GenerateAccessToken from "./generateAccessToken";
import IUserModel from "../interfaces/userModel.interface";
import IError from "../interfaces/error.interface";

class SearchUser {
  private readonly verifyUser: VerifyUser;
  private readonly comparePassword: ComparePasswords;
  private readonly createToken: GenerateAccessToken;
  private readonly User: IUserModel;
  private readonly badRequest: IError;
  private readonly unAutorize: IError;

  constructor(notAutorize: IError, badReq: IError, UserModel: IUserModel) {
    this.verifyUser = new VerifyUser();
    this.comparePassword = new ComparePasswords();
    this.createToken = new GenerateAccessToken();
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
            user.token = authToken;

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
            user.token = authToken;

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
