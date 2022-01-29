import express from "express";
import FoundUser from "../libs/foundUser";

class UserAutorization extends FoundUser {
  private readonly access: string = '';
  private readonly title: string = '';
  private readonly path: string = '/login';
  private readonly app = express();

  constructor(view: string, viewTitle: string) {
    super();
    this.access = view;
    this.title = viewTitle;
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.app.get(this.path, this.accessByLogin);
    this.app.post(this.path, this.findUser);
  }

  private accessByLogin(req: express.Request, res: express.Response) {
    res.render(this.access, {
      title: this.title
    });
  }
}

export default UserAutorization;
