import App from ".";

import UserRegistrationController from "./controllers/userRegisterController";
import UserAutorizationController from "./controllers/userAutorizeController";
import LoadPhotosController from "./controllers/loadPhotosController";
import GetPhotosController from "./controllers/getPhotosController";
import DeletePhotoController from "./controllers/deletePhotoController";
import DeleteAlbumIdController from "./controllers/deleteAlbumController";

const PORT: number = 8080;
const userRegister: UserRegistrationController =
  new UserRegistrationController(); // ! передать какие-то классы
const userAutorize: UserAutorizationController =
  new UserAutorizationController(); // ! передать какие-то классы
const loadPhotos: LoadPhotosController = new LoadPhotosController();
const getPhotos: GetPhotosController = new GetPhotosController();
const deletePhotos: DeletePhotoController = new DeletePhotoController();
const deleteAlbum: DeleteAlbumIdController = new DeleteAlbumIdController();

const controllers = [];
controllers.push(userRegister);
controllers.push(userAutorize);
controllers.push(loadPhotos);
controllers.push(getPhotos);
controllers.push(deletePhotos);
controllers.push(deleteAlbum);

const app: App = new App(controllers, "ejs", PORT);
const { launchApp } = app;

launchApp();
/*
import ServerError from "./libs/serverError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const notFoundErrorProcess: ServerError = new ServerError(
  ReasonPhrases.NOT_FOUND,
  StatusCodes.NOT_FOUND
);
const internalErrorProcess: ServerError = new ServerError(
  ReasonPhrases.INTERNAL_SERVER_ERROR,
  StatusCodes .INTERNAL_SERVER_ERROR
);

const actions: any[] = [];


actions.push(notFoundErrorProcess);
actions.push(internalErrorProcess);
*/
