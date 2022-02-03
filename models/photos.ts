import { Schema, model } from "mongoose";
import IPhoto from "../interfaces/photo.interface";

const photoSchema = new Schema<IPhoto>({
  albumId: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
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

const Photo = model<IPhoto>("Photo", photoSchema);

export default Photo;
