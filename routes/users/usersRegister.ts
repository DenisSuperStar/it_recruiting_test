import express from "express";
import UserController from "../../controllers/userController";

const app = express();
const userController = new UserController();
const { renderRegister, processRegister } = userController;

app.get('/register', renderRegister);
app.post('/register', processRegister);
