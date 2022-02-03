import express from "express";
import WriteUserToDb from "../libs/writeUserToDb";
import IView from "../interfaces/view.interface";

class UserRegistrationController {
  private readonly path: string = "/register";
  private readonly app;
  public register: IView;
  private writeUser: WriteUserToDb;

  constructor(view: IView, addUser: WriteUserToDb) {
    this.app = express();
    this.register = view; // {name: 'register', title: 'Моментальная регистрация!'}
    this.writeUser = addUser; //const writeUser: WriteUserToDb = new WriteUserToDb();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    const { name, title } = this.register;
    const { writeUser } = this.writeUser;

    this.app.get(
      this.path,
      (req: express.Request, res: express.Response): void => {
        res.render(name, {
          title,
        });
      }
    );
    this.app.post(this.path, writeUser);
  }
}

export default UserRegistrationController;
