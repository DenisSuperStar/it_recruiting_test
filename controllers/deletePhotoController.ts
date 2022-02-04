import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IError from "../interfaces/error.interface";
import Photo from "../models/photos";

class DeletePhotoController {
  private readonly path: string = "/delete-photo/:id";
  private readonly app;
  private readonly accepted: IError;
  private readonly unAutorize: IError;

  constructor() {
    this.app = express();
    this.accepted = {
      name: ReasonPhrases.ACCEPTED,
      status: StatusCodes.ACCEPTED,
    };
    this.unAutorize = {
      name: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  public initializeRoutes(): void {
    this.app.get(this.path, this.deletePhoto);
  }

  private deletePhoto(req: express.Request, res: express.Response): void {
    const { id } = req.params;
    const { jwtToken } = req;

    if (jwtToken) {
      Photo.findByIdAndRemove(id).then(() => {
        res.json({
          message: this.accepted.name,
          statusCode: this.accepted.status,
        });
      });
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status,
      });
    }
  }
}

export default DeletePhotoController;
