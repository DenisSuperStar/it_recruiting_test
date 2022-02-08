import express from "express";
import IError from "../interfaces/error.interface";
import Album from "../models/albums";

class ChangeAlbumClassController {
  private readonly path: string =
    "/change-album-title/:albumid/:new_album_name";
  private readonly app;
  private readonly unAutorize: IError;

  constructor(unAuth: IError) {
    this.app = express();
    this.unAutorize = unAuth;
  }

  public initRoutes(): void {
    this.app.get(this.path, this.changeAlbumTitle);
  }

  private async changeAlbumTitle(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { albumid, new_album_name } = req.params;
    const { jwtToken } = req;

    if (jwtToken) {
      await Album.updateMany(
        { id: { $eq: albumid } },
        { title: new_album_name }
      );
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status,
      });
    }
  }
}

export default ChangeAlbumClassController;
