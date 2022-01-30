import { Schema, model } from "mongoose";
import Album from "../libs/album.interface";

const albumSchema = new Schema<Album>({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const Album = model<Album>("Album", albumSchema);

export default Album;
