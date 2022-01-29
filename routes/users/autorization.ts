import AccessView from "../../controllers/access.interface";
import UserAutorization from "../../controllers/userAutorizeController";

const view: AccessView = { name: 'login', title: 'Войти в приложение' };
const UserAutorize: UserAutorization = new UserAutorization(view.name, view.title);

export default UserAutorize;
