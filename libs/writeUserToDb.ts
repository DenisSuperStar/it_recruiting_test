import express from "express";
import VerifyUser from "./verifyUser";
import CreateUser from "./createUser";
import User from "../models/users";
import IError from "../interfaces/error.interface";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

class WriteUserToDb {
  private readonly verifyUser: VerifyUser;
  private createUser: CreateUser | undefined;
  private readonly badRequest: IError;
  private readonly conflict: IError;

  constructor(badReq: IError, conflict: IError) {
    this.verifyUser = new VerifyUser();
    this.badRequest = badReq; // { name: ReasonPhrases.BAD_REQUEST, status: StatusCodes.BAD_REQUEST }
    this.conflict = conflict; // { name: ReasonPhrases.CONFLICT, status: StatusCodes.CONFLICT }
  }

  public async writeUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { body } = req;
    const { userValid } = this.verifyUser;
    const created = {
      name: ReasonPhrases.CREATED,
      status: StatusCodes.CREATED,
    };

    if (userValid(body)) {
      const { emailValid } = this.verifyUser;
      let oldUser;

      if (emailValid(body)) {
        const { email } = body;
        oldUser = await User.findOne({ email });

        if (!oldUser) {
          this.createUser = new CreateUser(body, User, created);
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
          this.createUser = new CreateUser(body, User, created);
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
