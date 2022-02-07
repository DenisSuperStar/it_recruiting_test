class UrlStringParser {
  private ids: number[] = [];
  public urlParser(params: any): number[] {
    const idxs = params.replace(" ", "").split(",");

    idxs.forEach((idx: string) => {
      this.ids.push(+idx);
    });

    return this.ids;
  }
}

export default UrlStringParser;
