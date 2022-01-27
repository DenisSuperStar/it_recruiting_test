import express from "express";
import UserController from "../../controllers/userController";

const app = express();
const userController = new UserController("login", "Войти в приложение.");
const { renderAccessForm, userLoginProcessing } = userController;

app.get("/login", renderAccessForm);
app.post("/login", userLoginProcessing);
