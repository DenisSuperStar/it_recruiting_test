import { StatusCodes, ReasonPhrases } from "http-status-codes";
import express from "express";

class UserController {
  readonly access: string = "register";
  readonly title: string = "Моментальная регистрация!";

  constructor(viewAccessName: string, viewTitle: string) {
    this.access = viewAccessName;
    this.title = viewTitle;
  }

  renderAccessForm(req: express.Request, res: express.Response) {
    res.render(this.access, {
      title: this.title,
    });
  }
  userRegisterProcessing(req: express.Request, res: express.Response) {
    const { body } = req;
    const { login, password } = body;
    // зашифровать пароль
    // сохранить в базу данных
  }
  userLoginProcessing(req: express.Request, res: express.Response) {
    const { body } = req;
    const { login, password } = JSON.parse(JSON.stringify(body));
    const isNotEmptyUser: boolean = login && password ? true : false;

    if (isNotEmptyUser) {
      const emailRule: string =
        "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
      const isEmail: string = login.match(emailRule);

      if (isEmail) {
        const findByEmail: string = login;
        // искать по email
      } else {
        const findByLogin: string = login;
        // искать по login
      }
    } else {
      res.json({
        error: ReasonPhrases.UNAUTHORIZED,
        statusCodes: StatusCodes.UNAUTHORIZED,
      });
    }
  }
}


export default UserController;