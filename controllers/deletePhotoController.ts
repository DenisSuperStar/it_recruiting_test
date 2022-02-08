import express from "express";
import UrlStringParser from "../libs/urlStringParser";
import IError from "../interfaces/error.interface";
import Photo from "../models/photos";
import IPhotoDocument from "../interfaces/photoDocument.interface";

class DeletePhotoController {
  private readonly path: string = "/delete-photo/:id";
  private readonly app;
  private paramsParser: UrlStringParser;
  private readonly unAutorize: IError;

  constructor(urlParser: UrlStringParser, unAuth: IError) {
    this.app = express();
    this.paramsParser = urlParser;
    this.unAutorize = unAuth;
  }

  public initRoutes(): void {
    this.app.get(this.path, this.deletePhoto);
  }

  private async deletePhoto(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { params } = req;
    const { jwtToken } = req;

    if (jwtToken) {
      const { urlParser } = this.paramsParser;
      const ids: number[] = urlParser(params);

      for (const id of ids) {
        let photos: Array<IPhotoDocument> = await Photo.find({ id });

        await Photo.deleteMany(photos);
      }
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status,
      });
    }
  }
}

export default DeletePhotoController;
