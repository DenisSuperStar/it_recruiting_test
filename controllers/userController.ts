import { StatusCodes, ReasonPhrases } from "http-status-codes";
import express from "express";

class AccessForm {
  readonly access: string = "";
  readonly title: string = "";

  constructor(viewAccessName: string, viewTitle: string) {
    this.access = viewAccessName;
    this.title = viewTitle;
  }

  renderAccessForm(req: express.Request, res: express.Response) {
    res.render(this.access, {
      title: this.title,
    });
  }
}

class AccountUser {
  verifiedUser(body: { login: string; password: string }) {
    const { login, password } = body;
    const isNotEmptyUser: boolean = login && password ? true : false;

    return isNotEmptyUser;
  }
}

class UserDb {
  saveUser(req: express.Request, res: express.Response) {
    const { body } = req;

    const accountUser: AccountUser = new AccountUser();
    const { verifiedUser } = accountUser;

    if (verifiedUser(body)) {
      const { login, password } = body;
      // Зашифровать пароль
      // Сохранить в базу данных
    } else {
      res.json({
        error: ReasonPhrases.UNAUTHORIZED,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  }
}

class FoundUser {
  findUser(req: express.Request, res: express.Response) {
    const { body } = req;

    const accountUser: AccountUser = new AccountUser();
    const { verifiedUser } = accountUser;

    if (verifiedUser(body)) {
      const { login } = body;
      const emailRule: string =
        "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
      const isEmail: boolean = login.match(emailRule);

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
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
  }
}

class UserController {
  renderRegister(req: express.Request, res: express.Response) {
    const inputForm: AccessForm = new AccessForm(
      "register",
      "Моментальная регистрация!"
    );
    const { renderAccessForm } = inputForm;

    renderAccessForm(req, res);
  }

  renderLogin(req: express.Request, res: express.Response) {
    const inputForm: AccessForm = new AccessForm(
      "login",
      "Войти в приложение."
    );
    const { renderAccessForm } = inputForm;

    renderAccessForm(req, res);
  }

  processRegister(req: express.Request, res: express.Response) {
    const userDb: UserDb = new UserDb();
    const { saveUser } = userDb;

    saveUser(req, res);
  }

  processLogin(req: express.Request, res: express.Response) {
    const foundUser: FoundUser = new FoundUser();
    const { findUser } = foundUser;

    findUser(req, res);
  }
}

export default UserController;
