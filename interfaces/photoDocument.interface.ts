import { Document } from "mongoose";

interface IPhotoDocument extends Document {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    owner: string;
}

export default IPhotoDocument;