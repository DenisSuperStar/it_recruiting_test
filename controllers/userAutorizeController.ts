import express from "express";
import InitializedUser from "../libs/initializedUser";
import ShowView from "../libs/showView";
import IView from "../libs/view.interface";

class UserAutorizationController {
  private readonly path: string = "/login";
  private readonly app;
  private renderView: ShowView;
  private initUser: InitializedUser;
  private readonly autorize: IView;

  constructor() {
    this.app = express();
    this.autorize = { name: "login", title: "Войти в приложение." };
    this.renderView = new ShowView(this.autorize.name, this.autorize.title);
    this.initUser = new InitializedUser();
  }

  public initializedRoutes(): void {
    const { render } = this.renderView;
    const { findUser } = this.initUser;

    this.app.get(this.path, render);
    this.app.post(this.path, findUser);
  }
}

export default UserAutorizationController;
