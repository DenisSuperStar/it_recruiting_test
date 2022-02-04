import express from "express";
import { verify } from "jsonwebtoken";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const accessTokenVerify = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): any => {
  const { userAutorize } = req;

  if (!userAutorize) {
    return res.json({
      error: ReasonPhrases.FORBIDDEN,
      statusCode: StatusCodes.FORBIDDEN,
    });
  }

  const jwtPayload = verify(userAutorize, "secret");
  req.jwtToken = String(jwtPayload);

  next();
};

export default accessTokenVerify;
