import express from "express";
import SaveUserToDb from "../libs/saveUserToDb";
import ShowView from "../libs/showView";
import IView from "../libs/view.interface";

class UserRegistrationController {
  private readonly path: string = "/register";
  private readonly app;
  private userSave: SaveUserToDb;
  private renderView: ShowView;
  private readonly register: IView;

  constructor() {
    this.app = express();
    this.register = { name: "register", title: "Моментальная регистрация!" };
    this.userSave = new SaveUserToDb();
    this.renderView = new ShowView(this.register.name, this.register.title);
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    const { render } = this.renderView;
    const { saveUser } = this.userSave;

    this.app.get(this.path, render);
    this.app.post(this.path, saveUser);
  }
}

export default UserRegistrationController;
