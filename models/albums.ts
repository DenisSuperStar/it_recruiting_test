import { Schema, model } from "mongoose";
import IAlbum from "../libs/album.interface";

const albumSchema = new Schema<IAlbum>({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const Album = model<IAlbum>("Album", albumSchema);

export default Album;
