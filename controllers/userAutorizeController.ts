import express from "express";
import SearchUser from "../libs/searchUser";
import IView from "../interfaces/view.interface";

class UserAutorizationController {
  private readonly path: string = "/login";
  private readonly app;
  public autorize: IView;
  private searchUser: SearchUser;

  constructor(view: IView, seekUser: SearchUser) {
    this.app = express();
    this.autorize = view;
    this.searchUser = seekUser;
  }

  public initRoutes(): void {
    const { name, title } = this.autorize;
    const { findUser } = this.searchUser;

    this.app.get(this.path, (req: express.Request, res: express.Response) => {
      res.render(name, {
        title,
      });
    });
    this.app.post(this.path, findUser);
  }
}

export default UserAutorizationController;
