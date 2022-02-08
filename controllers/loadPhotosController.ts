import express from "express";
import axios from "axios";
import { merge } from "lodash";
import IError from "../interfaces/error.interface";
import Photo from "../models/photos";
import Album from "../models/albums";

class LoadPhotosController {
  private readonly path: string = "/load-photos";
  private readonly app;
  private readonly unAutorize: IError;

  constructor(unAuth: IError) {
    this.app = express();
    this.unAutorize = unAuth;
  }

  public initRoutes(): void {
    this.app.get(this.path, this.loadPhotos);
  }

  private async loadPhotos(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const { jwtToken } = req;
    const { login } = req.cookies;

    if (jwtToken) {
      const photos: Array<any> = await axios.get(
        "http://jsonplaceholder.typicode.com/photos"
      );
      const originAlbums: Array<any> = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const albums = merge(photos, originAlbums);

      albums.forEach((album) => {
        delete album.albumId;
        delete album.userId;
        delete album.url;
        delete album.thumbnailUrl;
      });

      await Photo.insertMany(photos);
      await Photo.updateMany({ owner: login });
      await Album.insertMany(albums);
      await Album.updateMany({ owner: login });
    } else {
      res.json({
        error: this.unAutorize.name,
        statusCode: this.unAutorize.status,
      });
    }
  }
}

export default LoadPhotosController;
