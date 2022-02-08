import { Schema, model } from "mongoose";
import IAlbum from "../interfaces/album.interface";

const albumSchema = new Schema<IAlbum>({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
  },
});

const Album = model<IAlbum>("Album", albumSchema);

export default Album;
