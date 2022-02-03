interface IPhoto {
  readonly albumId: number;
  readonly id: number;
  readonly title: string;
  readonly url: string;
  readonly thumbnailUrl: string;
  readonly owner: string;
}

export default IPhoto;
