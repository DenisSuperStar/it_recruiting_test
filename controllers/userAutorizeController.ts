import express from "express";
import initializedUser from "../libs/initializedUser";
import ShowView from "../libs/showView";

class UserAutorizationController {
  private readonly path: string = '/login';
  private readonly name: string;
  private readonly title: string;
  private readonly app;
  private renderView: ShowView;
  private initUser: initializedUser;

  constructor(viewName: string, viewTitle: string) {
    this.app = express();
    this.name = viewName;
    this.title = viewTitle;
    this.renderView = new ShowView(this.name, this.title);
    this.initUser = new initializedUser();
    this.initializedRoutes();
  }

  private initializedRoutes(): void {
    const { render } = this.renderView;
    const { findUser } = this.initUser;

    this.app.get(this.path, render);
    this.app.post(this.path, findUser);
  }
}

export default UserAutorizationController;