import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IError from "../libs/error.interface";
import Photo from "../models/photos";

class DeleteAlbumIdController {
  private readonly path: string = "/delete-album/:albumid";
  private readonly app;
  private readonly unAutorize: IError;

  constructor() {
    this.app = express();
    this.unAutorize = {
      name: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  public initializeRoutes(): void {
    this.app.get(this.path, this.deleteAlbum);
  }

  private async deleteAlbum(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { jwtToken } = req;

    if (jwtToken) {
      const { albumid } = req.params;
      const albumId = parseInt(albumid);
      const albums = await Photo.find({ albumId });

      await Photo.deleteMany(albums);
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status,
      });
    }
  }
}

export default DeleteAlbumIdController;
