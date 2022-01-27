import express from "express";
import UserController from "../../controllers/userController";

const app = express();
const userController = new UserController();
const { renderLogin, processLogin } = userController;

app.get("/login", renderLogin);
app.post("/login", processLogin);
