import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IView from "../libs/view.interface";
import IError from "../libs/error.interface";
import Photo from "../models/photos";

class getPhotosController {
  private readonly path: string = "/get-photos/:ownerid/:page/:maxcount";
  private readonly app;
  private readonly view: IView;
  private readonly unAutorize: IError;

  constructor() {
    this.app = express();
    this.view = { name: "gallery", title: "Фотогалерея." };
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
  ): Promise<void> {
    const { jwtToken } = req;

    if (jwtToken) {
      const { ownerid, page, maxcount } = req.params;
      const ownerId = parseInt(ownerid);
      const currentPage = parseInt(page);
      const maxCount = parseInt(maxcount);

      const photos = await Photo.find({ id: ownerId })
        .limit(maxCount)
        .skip(maxCount * currentPage);

      res.render(this.view.name, {
        title: this.view.title,
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

export default getPhotosController;
