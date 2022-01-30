import View from "../../libs/view.interface";
import UserAutorizationController from "../../controllers/userAutorizeController";

const view: View = { name: 'login', title: 'Войти в приложение.' }
const UserAutorize: UserAutorizationController = new UserAutorizationController(view.name, view.title);

export default UserAutorize;
