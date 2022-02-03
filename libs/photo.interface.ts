interface IPhoto {
  readonly title: string;
  readonly id: number;
  readonly albumId: number;
  readonly url: string;
  readonly thumbnailUrl: string;
  readonly owner: string;
}

export default IPhoto;
