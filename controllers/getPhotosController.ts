import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IView from "../interfaces/view.interface";
import IError from "../interfaces/error.interface";
import Photo from "../models/photos";
import IPhotoDocument from "../interfaces/photoDocument.interface";

class GetPhotosController {
  private readonly path: string = "/get-photos/:ownerid/:page/:maxcount";
  private readonly app;
  private readonly photos: IView;
  private readonly unAutorize: IError;

  constructor() {
    this.app = express();
    this.photos = { name: "gallery", title: "Фотогалерея." };
    this.unAutorize = {
      name: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  public initializeRoutes(): void {
    this.app.get(this.path, this.getPhotos);
  }

  private async getPhotos(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    const { ownerid, page, maxcount } = req.params;
    const { jwtToken } = req;

    if (jwtToken) {
      const ownerId: number = parseInt(ownerid);
      const currentPage: number = parseInt(page);
      const maxCount: number = parseInt(maxcount);
      let photos: Array<IPhotoDocument>;

      if (!currentPage || !maxCount) {
        return res.json({
          error: ReasonPhrases.BAD_REQUEST,
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }

      if (ownerId) {
        photos = await Photo.find({ id: ownerId })
          .limit(maxCount)
          .skip(maxCount * currentPage);
      } else {
        photos = await Photo.find({})
          .limit(maxCount)
          .skip(maxCount * currentPage);
      }

      res.render(this.photos.name, {
        title: this.photos.title,
        photos,
      });
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status,
      });
    }
  }
}

export default GetPhotosController;
