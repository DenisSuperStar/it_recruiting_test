import express from "express";

class ShowView {
  private readonly name;
  private readonly title;

  constructor(viewName: string, viewTitle: string) {
    this.name = viewName;
    this.title = viewTitle;
  }

  public render(req: express.Request, res: express.Response) {
    res.render(this.name, {
      title: this.title,
    });
  }
}

export default ShowView;
