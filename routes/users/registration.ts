import AccessView from "../../libs/access.interface";
import UserRegistration from "../../controllers/userRegisterController";

const view: AccessView = { name: 'register', title: 'Моментальная регистрация!' };
const UserRegister: UserRegistration = new UserRegistration(view.name, view.title);

export default UserRegister;