import express from "express";
import UserController from "./controllers/userController";


const app = express();
const PORT: number = 8000;

app.set("views", "./views");
app.set("View engine", "ejs");

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Express + type script server!");
});

let userController = new UserController(
  "register",
  "Моментальная регистрация!"
);
const { renderAccessForm, userRegisterProcessing } = userController;

app.get("/register", renderAccessForm);
app.post("/register", userRegisterProcessing);

userController = new UserController("login", "Войти в приложение.");
const { userLoginProcessing } = userController;

app.get("/login", userController.renderAccessForm);

app.post("/login", userLoginProcessing);

app.get("/load-photos", (req: any, res: any) => {
  res.send("Hello from load photos");
});

app.post("/load-photos", (req: any, res: any) => {
  res.send("Hello from post load photos");
});

app.get("/get-photos", (req: any, res: any) => {
  res.send("Hello from get photos");
});

app.post("/get-photos", (req: any, res: any) => {
  res.send("Hello from post get photos");
});

app.get("/delete-photo", (req: any, res: any) => {
  res.send("Hello from delete photos");
});

app.post("/delete-photo", (req: any, res: any) => {
  res.send("Hello from post delete photos");
});

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
