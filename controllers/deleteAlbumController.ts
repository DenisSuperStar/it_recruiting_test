import express from "express";
import UrlStringParser from "../libs/urlStringParser";
import IError from "../interfaces/error.interface";
import Photo from "../models/photos";
import IPhotoDocument from "../interfaces/photoDocument.interface";

class DeleteAlbumIdController {
  private readonly path: string = "/delete-album/:albumid";
  private readonly app;
  private paramsParser: UrlStringParser;
  private readonly unAutorize: IError;

  constructor(urlParser: UrlStringParser, unAuth: IError) {
    this.app = express();
    this.paramsParser = urlParser; // paramsParser: UrlStringParser = new UrlStringParser();
    this.unAutorize = unAuth; // { name: ReasonPhrases.UNAUTHORIZED, status: StatusCodes.UNAUTHORIZED }
  }

  public initRoutes(): void {
    this.app.get(this.path, this.deleteAlbum);
  }

  private async deleteAlbum(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { params } = req;
    const { jwtToken } = req;

    if (jwtToken) {
      const { urlParser } = this.paramsParser;
      const albumIds: number[] = urlParser(params);

      for (const albumId of albumIds) {
        let albums: Array<IPhotoDocument> = await Photo.find({ albumId });

        await Photo.deleteMany(albums);
      }
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status,
      });
    }
  }
}

export default DeleteAlbumIdController;
