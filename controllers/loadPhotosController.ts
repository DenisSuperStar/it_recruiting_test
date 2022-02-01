import express from "express";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IError from "../libs/error.interface";

class LoadPhotosController {
  private readonly path: string = "/load-photos";
  private readonly app;
  private readonly forbidden: IError;

  constructor() {
    this.app = express();
    this.forbidden = {
      name: ReasonPhrases.FORBIDDEN,
      status: StatusCodes.FORBIDDEN,
    };
  }

  public initializeRoutes() {
    this.app.get(this.path, this.loadPhotos);
  }

  private loadPhotos(req: express.Request, res: express.Response): void {
    const { token } = req.cookies;
    const jwtPayload = verify(token, "secret");

    if (jwtPayload) {
      axios.get("http://jsonplaceholder.typicode.com/photos").then((res) => {
        console.log(res);
      });
    } else {
      res.json({
        error: this.forbidden.name,
        statusCode: this.forbidden.status,
      });
    }
  }
}

export default LoadPhotosController;
