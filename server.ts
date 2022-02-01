import Setting from ".";
import UserAutorizationController from "./controllers/userAutorizeController";
import UserRegistrationController from "./controllers/userRegisterController";
import ServerError from "./libs/serverError";
import IView from "./libs/view.interface";
import IError from "./libs/error.interface";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const PORT: number = 8000;

const autorize: IView = { name: 'login', title: 'Войти в приложение.' };
const register: IView = { name: 'register', title: 'Моментальная регистрация!' };
const notFoundError: IError = { name: ReasonPhrases.NOT_FOUND, status: StatusCodes.NOT_FOUND };
const internalError: IError = { name: ReasonPhrases.INTERNAL_SERVER_ERROR, status: StatusCodes.INTERNAL_SERVER_ERROR };

const userAutorize: UserAutorizationController = new UserAutorizationController(autorize.name, autorize.title);
const userRegister: UserRegistrationController = new UserRegistrationController(register.name, register.title);

const noteFoundException: ServerError = new ServerError(notFoundError.name, notFoundError.status);
const internalException: ServerError = new ServerError(internalError.name, internalError.status);

const controllers: any[] = [];
const actions: any[] = [];

controllers.push(userAutorize);
controllers.push(userRegister);

actions.push(noteFoundException);
actions.push(internalException);

const app: Setting = new Setting(controllers, actions, PORT);
const { launcApp } = app;

launcApp();