import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

class AccountUser {
  public verifiedUser(body: { login: string; password: string }): boolean {
    const { login, password } = body;
    const isNotEmptyUser: boolean = login && password ? true : false;

    return isNotEmptyUser;
  }
}

class UserDb {
  public saveUser(req: express.Request, res: express.Response): void {
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
  protected findUser(req: express.Request, res: express.Response): void {
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
