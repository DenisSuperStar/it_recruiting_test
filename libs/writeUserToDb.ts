import express from "express";
import VerifyUser from "./verifyUser";
import CreateUser from "./createUser";
import User from "../models/users";
import IUserDocument from "../interfaces/userDocument.interface";
import IError from "../interfaces/error.interface";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

class WriteUserToDb {
  private readonly verifyUser: VerifyUser;
  private createUser: CreateUser | undefined;
  private created: IError;
  private readonly badRequest: IError;
  private readonly conflict: IError;

  constructor(badReq: IError, conflict: IError) {
    this.verifyUser = new VerifyUser();
    this.created = { name: ReasonPhrases.CREATED, status: StatusCodes.CREATED };
    this.badRequest = badReq;
    this.conflict = conflict;
  }

  public async writeUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.verifyUser;

    if (userValid(body)) {
      const { emailValid } = this.verifyUser;
      let oldUser: IUserDocument | null;

      if (emailValid(body)) {
        const { email } = body;
        oldUser = await User.findOne({ email });

        if (!oldUser) {
          this.createUser = new CreateUser(body, User, this.created);
          const { saveUser } = this.createUser;

          saveUser(req, res);
        } else {
          res.json({
            error: this.conflict.name,
            statusCode: this.conflict.status,
          });
        }
      } else {
        const { login } = body;
        oldUser = await User.findOne({ login });

        if (!oldUser) {
          this.createUser = new CreateUser(body, User, this.created);
          const { saveUser } = this.createUser;

          saveUser(req, res);
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

export default WriteUserToDb;
