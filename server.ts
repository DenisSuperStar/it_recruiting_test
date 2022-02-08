import App from ".";

import UserRegistrationController from "./controllers/userRegisterController";
import UserAutorizationController from "./controllers/userAutorizeController";
import LoadPhotosController from "./controllers/loadPhotosController";
import GetPhotosController from "./controllers/getPhotosController";
import DeletePhotoController from "./controllers/deletePhotoController";
import DeleteAlbumIdController from "./controllers/deleteAlbumController";
import WriteUserToDb from "./libs/writeUserToDb";
import SearchUser from "./libs/searchUser";
import User from "./models/users";
import viewList from "./support/views";
import errorStatus from "./support/servErrors";
import UrlStringParser from "./libs/urlStringParser";

const PORT: number = 8080;
const { register, autorize, photos } = viewList;
const { badRequest, unautorized, conflict } = errorStatus;

const writeUser: WriteUserToDb = new WriteUserToDb(badRequest, conflict);
const searchUser: SearchUser = new SearchUser(unautorized, badRequest, User);
const paramsParser: UrlStringParser = new UrlStringParser();

const userRegister: UserRegistrationController = new UserRegistrationController(
  register,
  writeUser
);
const userAutorize: UserAutorizationController = new UserAutorizationController(
  autorize,
  searchUser
);
const loadPhotos: LoadPhotosController = new LoadPhotosController(unautorized);
const getPhotos: GetPhotosController = new GetPhotosController(
  photos,
  badRequest,
  unautorized
);
const deletePhotos: DeletePhotoController = new DeletePhotoController(
  paramsParser,
  unautorized
);
const deleteAlbum: DeleteAlbumIdController = new DeleteAlbumIdController(
  paramsParser,
  unautorized
);

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
