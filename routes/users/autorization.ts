import AccessView from "../../controllers/access.interface";
import UserAutorization from "../../controllers/userAutorizeController";

const view: AccessView = { name: 'login', title: 'Войти в приложение' };
const userAutorize: UserAutorization = new UserAutorization(view.name, view.title);
const { initializeRoutes } = userAutorize;

initializeRoutes();
