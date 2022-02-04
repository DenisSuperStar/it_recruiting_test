import express from "express";
import axios from "axios";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IError from "../interfaces/error.interface";
import Photo from "../models/photos";
import IPhotoDocument from "../interfaces/photoDocument.interface";

class LoadPhotosController {
  private readonly path: string = "/load-photos";
  private readonly app;
  private readonly ok: IError;
  private readonly unAutorize: IError;

  constructor() {
    this.app = express();
    this.ok = { name: ReasonPhrases.OK, status: StatusCodes.OK };
    this.unAutorize = {
      name: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  public inittializeRoutes(): void {
    this.app.get(this.path, this.loadPhotos);
  }

  private async loadPhotos(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { jwtToken } = req;
    const { login } = req.cookies;

    if (jwtToken) {
      const photos: Array<IPhotoDocument> = await axios.get(
        "http://jsonplaceholder.typicode.com/photos"
      );
      
      await Photo.insertMany(photos);

      Photo.updateMany({ owner: login })
        .then(() => {
          res.json({
            error: ReasonPhrases.CREATED,
            statusCode: StatusCodes.CREATED
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

export default LoadPhotosController;
