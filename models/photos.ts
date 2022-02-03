import { Schema, model } from "mongoose";
import Photo from "../libs/photo.interface";

const photoSchema = new Schema<Photo>({
  title: {
    type: String,
    required: true,
  },
  albumId: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
  },
});

const Photo = model<Photo>("Photo", photoSchema);

export default Photo;
