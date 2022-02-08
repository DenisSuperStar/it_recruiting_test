import { ReasonPhrases, StatusCodes } from "http-status-codes";

const errorStatus = {
  badRequest: {
    name: ReasonPhrases.BAD_REQUEST,
    status: StatusCodes.BAD_REQUEST,
  },
  unautorized: {
    name: ReasonPhrases.UNAUTHORIZED,
    status: StatusCodes.UNAUTHORIZED,
  },
  conflict: {
    name: ReasonPhrases.CONFLICT,
    status: StatusCodes.CONFLICT,
  },
};

export default errorStatus;
