import express from "express";
import { verify } from "jsonwebtoken";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import User from "../models/users";

const accessTokenVerify = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  const { login } = req.cookies;
  const userAutorize = <any>await User.findOne({ login });
  const { token } = userAutorize;

  if (!token) {
    return res.json({
      error: ReasonPhrases.FORBIDDEN,
      statusCode: StatusCodes.FORBIDDEN,
    });
  }

  const jwtPayload = verify(token, "secret");

  req.jwtToken = jwtPayload;
};

export default accessTokenVerify;
