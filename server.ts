import Setting from ".";
import UserAutorizationController from "./controllers/userAutorizeController";
import UserRegistrationController from "./controllers/userRegisterController";
import LoadPhotosController from "./controllers/loadPhotosController";
import ServerError from "./libs/serverError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const PORT: number = 8000;

const userAutorize: UserAutorizationController =
  new UserAutorizationController();
const userRegister: UserRegistrationController =
  new UserRegistrationController();
const loadPhotos: LoadPhotosController = new LoadPhotosController();

const notFoundErrorProcess: ServerError = new ServerError(
  ReasonPhrases.NOT_FOUND,
  StatusCodes.NOT_FOUND
);
const internalErrorProcess: ServerError = new ServerError(
  ReasonPhrases.INTERNAL_SERVER_ERROR,
  StatusCodes.INTERNAL_SERVER_ERROR
);

const controllers: any[] = [];
const actions: any[] = [];

controllers.push(userAutorize);
controllers.push(userRegister);
controllers.push(loadPhotos);

actions.push(notFoundErrorProcess);
actions.push(internalErrorProcess);

const app: Setting = new Setting(controllers, actions, PORT);
const { launcApp } = app;

launcApp();
