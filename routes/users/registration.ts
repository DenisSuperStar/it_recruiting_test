import View from "../../libs/view.interface";
import UserRegistrationController from "../../controllers/userRegisterController";

const view: View = { name: 'register', title: 'Моментальная регистрация!' }
const UserRegister: UserRegistrationController = new UserRegistrationController(view.name, view.title);

export default UserRegister;