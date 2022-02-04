import express from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import IError from "../interfaces/error.interface";
import Photo from "../models/photos";

class DeleteAlbumIdController {
  private readonly path: string = "/delete-album/:albumid";
  private readonly app;
  private readonly accepted: IError;
  private readonly unAutorize: IError;

  constructor() {
    this.app = express();
    this.accepted = {
        name: ReasonPhrases.ACCEPTED,
        status: StatusCodes.ACCEPTED
    };
    this.unAutorize = {
      name: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  public initializeRoutes(): void {
    this.app.get(this.path, this.deleteAlbum);
  }

  private async deleteAlbum(req: express.Request, res: express.Response): Promise<void> {
    const { albumid } = req.params;
    const { jwtToken } = req;

    if (jwtToken) {
        const albumId = parseInt(albumid);
        const albums = await Photo.find({ albumId });

          Photo.deleteMany(albums)
            .then(() => {
              res.json({
                error: this.accepted.name,
                statusCode: this.accepted.status
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

export default DeleteAlbumIdController;
