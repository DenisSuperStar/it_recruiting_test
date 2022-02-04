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
  const userAutorize = await User.findOne({ login });

  if (!userAutorize) {
    return res.json({
      error: ReasonPhrases.FORBIDDEN,
      statusCode: StatusCodes.FORBIDDEN,
    });
  }

  const { token } = userAutorize;
  const jwtPayload = verify(token, "secret");
  req.jwtToken = String(jwtPayload);

  next();
};

export default accessTokenVerify;
