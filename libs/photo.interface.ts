interface IPhoto {
    readonly title: string,
    readonly albumId: number,
    readonly url: string,
    readonly thumbnailUrl: string,
    readonly owner: string
}

export default IPhoto;
