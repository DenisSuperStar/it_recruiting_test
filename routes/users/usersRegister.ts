import express from "express";
import UserController from "../../controllers/userController";

const app = express();
const userController = new UserController(
  "register",
  "Моментальная регистрация!"
);
const { renderAccessForm, userRegisterProcessing } = userController;

app.get("/register", renderAccessForm);
app.post("/register", userRegisterProcessing);
