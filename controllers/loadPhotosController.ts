import express from "express";
import axios from "axios";
import { verify } from "jsonwebtoken";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IError from "../libs/error.interface";
import User from "../models/users";
import Photo from "../models/photos";

class LoadPhotosController {
  private readonly path: string = '/load-photos';
  private readonly app;
  private readonly ok: IError;
  private readonly unAutorize: IError;

  constructor() {
    this.app = express();
    this.ok = { name: ReasonPhrases.OK, status: StatusCodes.OK };
    this.unAutorize = { name: ReasonPhrases.UNAUTHORIZED, status: StatusCodes.UNAUTHORIZED };
  }

  public inittializeRoutes(): void {
    this.app.get(this.path, this.loadPhotos);
  }

  private async loadPhotos(req: express.Request, res: express.Response): Promise<void> {
    const { jwtToken } = req;
    
    if (jwtToken) {
      const photos = await axios.get('http://jsonplaceholder.typicode.com/photos');

      Photo.insertMany(photos)
        .then(() => {
          res.json({
            message: this.ok.name,
            statusCode: this.ok.status
          });
        });
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status
      });
    }
  }
}

export default LoadPhotosController;